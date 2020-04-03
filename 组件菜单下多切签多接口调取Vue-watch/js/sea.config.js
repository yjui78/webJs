/**
 * seajs 配置
 */
seajs.version = '20200402';

seajs.default = {
    //变量配置
    vars: {
        "locale": "zh-cn",
        "env": "dev"
    },
    charset: "utf-8",
    debug: true,
    base: "./", //request的路径起点
    alias: {
        // 
        "common": "./common",
        // 配置ajax,默认是dev.js
        "dev": "config/dev"
    },
    map: [
        [/^(.*\.(?:css|js))\\?(.*)$/i, '$1?_v=' + seajs.version + '&$2']
    ],
};
//seajs.defualt
seajs.config(seajs.default);