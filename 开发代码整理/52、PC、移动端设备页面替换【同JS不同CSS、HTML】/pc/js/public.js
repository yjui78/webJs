//ajax请求地址
var AJAXURL = "";
if (location.href.indexOf("localhost:") > -1 || location.href.indexOf("file:///") > -1 || location.href.indexOf("127.") > -1) {
    // AJAXURL = "http://119.3.193.244";  //测试
    AJAXURL ="https://jetta.faw-vw.com/";  //正式
}
var timeOut;
//整站功能方法库
var methods = {
    init: (function () {
        $("body").append('<div class="prompt"></div>');     
    })(),
   //提示框
   prompt: function (con, back) {
        $(".prompt").html(con ? con : "").show();
        clearTimeout(timeOut);
        timeOut = setTimeout(function () {
            $(".prompt").hide();
            if (back) back();
        }, 2000);
    },
    //验证手机号
    phoneVerify: function (phone) {
        if (/^1\d{10}$/.test(phone)) {
            return true;
        } else {
            return false;
        }
    },
   
}