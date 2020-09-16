/*
    requir()里放模块的名字，fs本身是系统模块不需要安装，即没有写一个fs，也没有下载fs,因为是系统模块，
    放变量里等着用，一般情况下习惯模块都是常量
*/
const fs = require('fs') ; 
/*
    比方说fs是fileSystem文件系统的简称可以做很多文件操作，可以来写一个文件
  这里写一个文件a.txt,内容abc  ,回调函数err=>{}看有错没有
*/
fs.writeFile('a.txt','abc',err=>{
    if(err){
        console.log('有错');
    }else {
        console.log('成功')
    }
})

/*
    运行：进入当前目录，输入node 1.js 结果：成功
*/


