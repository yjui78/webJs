/**
 * seajs 配置
 */
seajs.version = '20190719';

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
        "common": "js/common",
        "dev": "js/config/dev"
        // "menu": "js/config/menu",
    },
    map: [
        [/^(.*\.(?:css|js))\\?(.*)$/i, '$1?_v=' + seajs.version + '&$2']
    ],
};
//seajs.defualt
seajs.config(seajs.default);