//ajax请求地址
var AJAXURL = "";
if (location.href.indexOf("localhost:") > -1 || location.href.indexOf("file:///") > -1 || location.href.indexOf("127.") > -1) {
    // AJAXURL = "https://faw-vw.ftms-wechat.com";
    AJAXURL ="https://faw-vw.ysc.bjscfl.com/";
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
                    // methods.toLogin();
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
    //身份证号验证
    idCardVerify: function (idCard) {
        if (/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(idCard)) {
            return true;
        } else {
            return false;
        }
    },
    //跳转至登录
    toLogin: function () {
		// 判断是否是oneApp
		if(localStorage.getItem("oneapp")){
			// 调用oneApp获取用户信息方法
			var userInfo;
			if(isAndroid){
				// 执行安卓方法
				userInfo=oneAppJsObject.getUserInfo();
				// 设置电商登录
				methods.setUserInfo(userInfo);
			}else{
				// 执行ios方法
				window.webkit.messageHandlers.getUserInfo.postMessage({});
			}
		}else{
			location.replace("/shop-m/page/index/login.html?login-callback=" + encodeURIComponent(encodeURIComponent(location.href))); 
		}
    },
}

