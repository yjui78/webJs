/**
    定义变量是不会自己出去的，要导出去,export，module
 */
/*
    exports.a = 12;  
    exports.b =  function(){
        return 5;
    }
    module.exports = {
    a:12,
    b(){
        return 5;
    }
    // module.exports 是方便整体批量去输出东西
    module.exports = function (){
        console.log('aaa')
    }
}
*/

module.exports = class {
    constructor(a,b){
        this.a = a;
        this.b = b;
    }
    sum(){
        return this.a+this.b
    }
}
