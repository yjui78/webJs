module.exports = {
    //跟目录 
    publicPath: '/',
    // 编译输出文件夹
    outputDir: 'build',
    lintOnSave: false,
    // 多页面：每个页完全分开没关系，单页不加访问：http://localhost:3000/shop#/ 。默认hash有#，history没#
    //  .html可省去 
    pages: {
        // 单页面默认找main.js，可指定
        index: {
            entry: './src/index.js',
            template: './public/index.html',
            filename: 'index.html'//打包后名
        },
        // 多页面放开
        // shop:{
        //     entry:'./src/shop.js',
        //     template:'./public/shop.html',
        //     filename:'shop.html'
        // }
    },
    // 不要必须的但没有干不了活
    devServer: {
        port: 3000,
        proxy: 'http://localhost:5000',//如出现找不到的数据就从5000下边找，当前访问端口3000，访问的数据在5000，这属于跨域的一种解决方案
    }
}

/**
 * 数据交互通信？
 * ajax读数据交互，正常情况下数据通信会遇到跨域问题。即同源策略：浏览器会限制js只能读是同一源下的数据。
 * 这是一种保护，有个词叫xss指跨域脚本攻击。假如a跨域去读b的网站，如b发现之前掺杂恶意数据到a网站上就会出现安全问题,
 * 或更恶意点弄个假的登录框过来把我网站上所有信息都拿走了。为了安全因此浏览器出现同源策略不可跨域请求。
 * 因此读取其它域——干掉
 * 开发下怎么解决跨域：
 * 1、CORS：可以用服务器，服务器可以发送一个头header来告诉可以跨域。这时浏览器就知道是一伙的
 * CORS：由被读取的另一个域的服务器，返回一个允许跨域标志。浏览器看到就懂了允许跨域
 * 在开发期间因为用的都是假的接口不是最终接口。所以读某些其它东西就很麻烦这里就用到了proxy
 * vue.config.js的proxy配置和原来的不一样
 * devServer下配置proxy的几种配置方法如下：
 *
 * devServer:{
 *  proxy:'http:/localhost:8080'  //当读取数据失败从本地找不到，自动尝试8080。还可以尝试配置一下，如这个接口在90那个接口在80
 * }
 *
 *
 *
 */