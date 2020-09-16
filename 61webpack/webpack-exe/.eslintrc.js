module.exports = {
    // env环境配置  
    "env": {
        "browser": true,   //用于浏览器，如false代码里就不能用window因为只有brower有window
        "es2020": true     //兼容es2020,如es6为false就不能用let
    },
    // 继承
    "extends": [
        "eslint:recommended",    //官方提供的推荐的配置
        "plugin:vue/essential"
    ],
    //解析器选项（parserOptions）
    "parserOptions": {
        "ecmaVersion": 12,    //ES的版本
        "sourceType": "module"    //指定源代码存在的位置，带模块化的。script | module，默认为script。
    }, 
    // 插件（plugins）
    "plugins": [
        "vue"
    ],
    // 校验规则（rules）
   "rules":{      //如在发布阶段利用这个方法把代码里所有console都删掉。遇到console就报错,写成如下；
        "no-console":'error'
    }
};
