
//没分开之前配置
const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');   //vue-loader 运行需要plugin引入方可
const HtmlWebpackPlugin = require('html-webpack-plugin');   //引入html的plugin
const StyleLintPlugin = require('stylelint-webpack-plugin'); // css校验用的plugin

const ESLINT_ENABLE=false;           //是否启用   eslint —— true/false 后在三目来做判断
const STYLELINT_ENABLE=false;        //是否启用stylelint —— true/false 后在三目来做判断

module.exports ={
    mode:'development',
    // entry:'./src/index1',
    entry:['@babel/polyfill','./src/index1'],   //多个用数组表示，为浏览器JS兼容装babel、装polyfill，这样两个打成一个大包bundle.js，
    output:{
        path:path.resolve(__dirname,'build'),
        // filename:'bundle.js',
        filename:'bundle.[hash].js', //名字复杂可以加hash,会生成一个带数字的bundle(bundle.ca1e9ead86f0fb85b19a.js),HtmlWebpackPlugin会给生成长成名的bundle自动注入到index.html当中
        publicPath:'',   //开发用build/但加了html-webpack-plugin后index.html在build里生成且与bundle同级且路径要改即或生产要改这样能对应上publicPath:'./'或publicPath:''
    },
    //放各种模块用
    module:{
        // 规则，
        rules:[
            // {test:条件,use:干啥}
            //只要碰着css结尾文件就给css-loader处理： .表示任意字符转义 $结尾 i忽略大小写
            {test:/\.css$/i,use:['style-loader','css-loader']},
            // 图片文件，或这些后缀用file-loader,file-loader不会打包到bundle.js,只是读取原样输出
            // {test:/\.(jpg|png|gif|webp|ico)$/i,use:{
            //     loader:'file-loader',
            //     options:{
            //         outputPath:'imgs/'      //所有图片都放imgs里，不直接暴漏在外边
            //     }
            // }}
            {test:/\.(jpg|png|gif|webp|ico)$/i,use:{
                loader:'url-loader',
                options:{
                    limit:8*1024,        //图片21k，limit>原图打包到bundle，limit<原图就会存imgs/下
                    outputPath:'imgs/'   //所有图片都放imgs里，不直接暴漏在外边
                }
            }},
            // 音频
            {test:/\.(mp3|ogg|wav)$/i,use:{
                loader:'url-loader',
                options:{
                    limit:4*1024,
                    outputPath:'audios',
                }
            }},
            // 小视频
            {test:/\.(mp4|ogv|avi)$/i,use:{
                loader:'url-loader',
                options:{
                    limit:4*1024,
                    outputPath:'videos',      
                }
            }},

            // 字
            {test:/\.(eot|svg|ttf|wof2?)$/i,use:{
                loader:'url-loader',
                options:{
                    limit:4*1024,
                    outputPath:'fonts',
                }
            }},
            // less
            // less-loader只能编译less部分的循环、变量
            // less-loader编译完的css的交给css-loader处理
            // css-loader编译完的交给style-loader输出,执行从后向前
            {test:/\.less$/i,use:['style-loader','css-loader','less-loader']},

            // vue,要安装npm i vue-loader webpack webpack-cli vue-style-loader vue-html-loader vue-template-compiler -D
            // vue-plugin
            {test:/\.vue$/,use:'vue-loader'},

            //js
            // babel-loader配置的是js，用来降级js 向下兼容, 
            // js分为js或jsx,在正则中?（问号）是可有可无的意思 ,jsx？相当于 js或jsx(js的扩展) 统一这种文件都用babel-loader
            {test:/\.jsx?$/i,use:[
                {
                    loader:'babel-loader',
                    options: {// 告诉它采取哪套预设
                        presets:['@babel/preset-env'],  //默认：能兼容主流浏览器的预设，推荐
                        //自设： 指定预设版本
                        // presets:[
                        //     ['@babel/preset-env',{  //以@babel/preset-env作基础给参数
                        //         targets:{ //目标版本
                        //            chrome:58,
                        //            ie:7 
                        //         }   
                        //     }]
                        // ]
                    }
                },
                // const ESLINT_ENABLE=true;           //是否启用   eslint —— true/false
                // const STYLELINT_ENABLE=true; 

                //有.eslintrc的同时必须加上eslint-loader声明eslint才会起作用
                // ESLINT_ENABLE前三个点加上true时启动eslint，
                // 加上... true时展开eslint-loader数组,false时展开空数组,'[]'就不显示了，这样可以避免报错 ，所以要加上...
                ...ESLINT_ENABLE?[
                    {
                        loader: 'eslint-loader',
                        options: {

                        }
                    }
                ]:[]
            ]}
        ]
    },
    plugins:[
        //所有plugin都是new出来的，都放plugins里
        new VueLoaderPlugin(),
        //new HtmlWebpackPlugin(),这种写法webpack运行后会生成一个空白的index.html在build里,在body内没有内容的直接删掉了
        // new HtmlWebpackPlugin(), //不推荐
        //推荐
        new HtmlWebpackPlugin({
            //涉及路径的都加resolve要不容易出问题。__dirname当前路径webpack.config.js
            template:path.resolve(__dirname,'index.html'),  //加template模板，按当前路径webpack.config.js提供的index.html参照生成。
        }),
        //放参数。  *任意，**任意级目录
        // new StyleLintPlugin({//需要校验的目录，自行配置
        //     files:['**/*.css','**/*.less','**/*.vue','**/*s?(c|a)s']   //所以目录下的所有.css文件
        // })
        //STYLELINT_ENABLE 为true才会起作用
        // 加上...展开数组内容是否成立,
        ...STYLELINT_ENABLE?[
            new StyleLintPlugin({//需要校验的目录，自行配置
                files:['**/*.css','**/*.less','**/*.vue','**/*s?(c|a)s']   //所以目录下的所有.css文件
            })
        ]:[]
    ]

}