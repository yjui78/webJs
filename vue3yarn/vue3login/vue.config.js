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
			entry: './src/main.js',
			template: './public/index.html',
			filename: 'index.html' //打包后名
		}
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
		proxy: 'http://localhost:5000' //如出现找不到的数据就从5000下边找，当前访问端口3000，访问的数据在5000，这属于跨域的一种解决方案
	}
};
