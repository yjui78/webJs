module.exports = {
  publicPath: './',  //跟目录
  outputDir: 'buld', // 编译输出文件夹
  lintOnSave: false,
  pages: {
    // 单页面默认找main.js，可指定
    index: {
      entry: './src/main.js',
      template: './public/index.html',
      filename: 'index.html' //打包后名
    }
  },
  // 不是必须的但没有干不了活
  devServer: {
    port: 4000,
    proxy: 'http://localhost:5000',//本地服务器c://server/...
  }



}