const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin'); 
const HtmlWebpackPlugin=require('html-webpack-plugin'); 
const StyleLintPlugin = require('stylelint-webpack-plugin'); 
const ESLINT_ENABLE=false; 
const STYLELINT_ENABLE=false; 

module.exports=function (env, argv){
    let config=null;
    if(env.prod){
        config=require('./config/prod.conf');
    }else if(env.dev){
        config=require('./config/dev.conf');
    }
    return {
        entry:['@babel/polyfill','./src/index'],
        module:{
            rules:[
            
                {test:/\.css$/i,use:['style-loader','css-loader']},
                {test:/\.(jpg|png|gif|webp|ico)$/i,use:{
                    loader:'url-loader',
                    options:{
                        limit:8*1024,        
                        outputPath:'imgs/'
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
                {test:/\.less$/i,use:['style-loader','css-loader','less-loader']},
                {test:/\.vue$/,use:'vue-loader'},

                //js
                {test:/\.jsx?$/i,use:[
                    {
                        loader:'babel-loader',
                        options: {
                            presets:['@babel/preset-env'], 
                        }
                    },
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
            new VueLoaderPlugin(),
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, 'index.html'),
            }), 
            ...STYLELINT_ENABLE?[
                new StyleLintPlugin({
                    files:['**/*.css','**/*.less','**/*.vue','**/*s?(c|a)s']
                })
            ]:[]
        ],
        resolve:{
            extensions:['.js','.jsx','.vue'],
            alias:{
                'vue': 'vue/dist/vue.esm.js',
                '@': path.resolve('src'),  
            }
        },
        ...config
    }
}