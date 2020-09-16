const  Mod = require('./mod');    //nodejs默认处理都是JS文件，所有后缀JS可以省去【】
// 既然是类首字母要大写
let obj = new Mod(11,22);
console.log(obj.sum())