//ajax请求地址
var AJAXURL = "";
if (location.href.indexOf("localhost:") > -1 || location.href.indexOf("file:///") > -1 || location.href.indexOf("127.") > -1) {
    AJAXURL = "https://faw-vw.ftms-wechat.com";
}
//整站功能方法库
var methods = {
    //全站ajax请求状态处理
    ajax: function (url, data, successCallback,errorCallBack) {
        $.ajax({
            "type": "post",
            "url": AJAXURL + url,
            "async": true,
            "data": data,
            "success": function (res) {
                //返回状态处理
                if (res.code == 200) {
                    if (successCallback) {
                        successCallback(res);
                    }
                } else if (res.code == 406) {
                    //跳转至登录
                    methods.toLogin();
                } else {
                    if (errorCallBack) {
                        errorCallBack(res)
                    } else {
                        methods.prompt(res.msg);
                    }
                }
            }
        });
    },
    //提示框
    prompt: function (con, back) {
        $(".prompt").html(con ? con : "").show();
        clearTimeout(timeOut);
        timeOut = setTimeout(function () {
            $(".prompt").hide();
            if (back) back();
        }, 2000);
    },
    //confirm弹框
    confirm: function (con, callback, confirmText) {
        $(".confirm-con").html(con ? con : "");
        $(".confirm-box").show();
        if (callback) {
            $(".confirm-box .cancel").show();
        } else {
            $(".confirm-box .cancel").hide();
        }
        $(".determine").html(confirmText ? confirmText : "确认");
        $(".determine").off("click").on("click", function () {
            $(".confirm-box").hide();
            if (callback) {
                callback();
            }
        })
    },
    //获取浏览器url参数
    getQueryString: function (name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
        var r = location.search.substr(1).match(reg);
        if (r != null) {
            return unescape(r[2]);
        }
        return null;
    },
    //验证手机号
    phoneVerify: function (phone) {
        if (/^1\d{10}$/.test(phone)) {
            return true;
        } else {
            return false;
        }
    },
    //密码验证
    pwdVerify: function (pwd) {
        if (/^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z0-9]{6,20}$/.test(pwd)) {
            return true;
        } else {
            return false;
        }
    },
    // 保存当前页面信息，确保跳转用
    savePage: function (pagename, pageinfo) {
        // 保存当前页面地址
        localStorage.setItem(pagename, JSON.stringify({
            "info": pageinfo
        }));
    },
}
