module.export = {
  //编译后的跟目录：项目发布后工作的地址加/是没什么变化的。也可以是http://www.zhimengshe.com/
  publicpath: '/',
  //编译输出文件夹：默认输出到dist/，习惯叫build/
  outputDir: 'build/',
  // 开发阶段是否用lint 
  lintOnSave: false,
  // vue2是单页应用，想改成多页的改起来很麻烦。
  // vue3中自带多页面 还想用单页面别写
  // 以下page中是双页面的配置
  page: {
    index: {
      // 页面js对应的入口，默认是main.js自动生成的与App.vue同级那个，可以把main.js改成index.js 或直接用main.js .js可省
      entry: './src/index.js',
      template: "./public/index.html",   //多页面只js不行要有模板页
      filename: "index.html"//template模板将来会打包，filename 是打包后的名,如不写默认按 template的名编
    },
    shop: {
      entry: './src/shop.js',
      template: "./public/shop.html"
    }
  }

}