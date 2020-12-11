/**
 * seajs 配置
 * seajs.config方法可以设置全局配置，接收一个表示全局配置的配置对象
 * debug表示是否工作在调试模式下。
 * alias可以对较长的常用路径设置缩写。
 * charset表示下载js时script标签的charset属性。
 * timeout表示下载文件的最大时长，以毫秒为单位。
 */
seajs.version = '20190719';
seajs.default = {
  // 变量配置
  vars: {
    "locale": "zh-cn",
    "env": "dev",
  },
  charset: "utf-8",
  debug: true,
  base: "./",//request路径起点
  alias: {
    "common": "js/common",
    "dev": "js/config/dev",
    "menu": "js/config/menu",
  },
  map: [
    [/^(.*\.(?:css|js))\\?(.*)$/i, '$1?_v=' + seajs.version + '&$2']
  ],
}
//seajs.default
seajs.config(seajs.default);