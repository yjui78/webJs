const path = require('path');
// 需要对外输出json ——>{},CMD写法主要给nodejs看nodejs遵循CMD，
module.exports = {
    // 编译模式,生产模式(production),调试模式(development)
    mode:'development',
    //入口(entry)，并不是目录下上千个JS文件全部编译，需指定一个或多个入口，以这个作为起点来编译，用到谁编译谁，用不到的不编译；
    // 此处需要编译的文件index.js [有export(导出可编译),用webpack加./ nodejs要求]
    entry:'./js/index.js',
    /*
     * 1、输出(output) ,必须是{},并且至少要包含两个项目
     *    path:放到哪去。可以是当前目录的buiid下(path:'./build');
     *          一般情况下(90%)使用绝对路径更容易一些不会被坑，这里需要引入nodejs里的包叫path(帮助做路径上的操作)
     *          就是 :const path = resolve(_dirname，'build');(可以把路径解析成绝对路径)
     * (2)filename:文件名叫什么,bundle翻译'捆'打包之后的名随意,
     */
    output:{
        path:path.resolve(__dirname,'buld'),
        filename:'bundle.js'
    }
};