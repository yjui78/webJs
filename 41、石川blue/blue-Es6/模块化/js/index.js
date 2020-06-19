/*

    引入mod1.js中export的内容，引入用import
    *   引入所有 
    ./  用webpack就必须写，当前文件（按ES6本身标准可以不写）但现在用webpack编译，webpack是nodejs写的要遵循nodejs约定，也就是说./是nodejs的规定，
    as,把所有的成员都引过来取一个共同的名字叫mod1,从当前目录下mod1.js取
    ./mod1 默认./mod1.js 都是JS文件
*/
import * as mod1 from './mod1';
console.log(mod1.a,mod1.b)