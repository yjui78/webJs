var userAgentInfo = navigator.userAgent.toLowerCase();
//ajax请求地址
var AJAXURL = "";
if (location.href.indexOf("localhost:") > -1 || location.href.indexOf("file:///") > -1 || location.href.indexOf("127.") > -1 || location.href.indexOf("192.") > -1) {
    AJAXURL = "https://faw-vw.ftms-wechat.com";
    AJAXURL ="https://mall.faw-vw.com/";
}

// alert(AJAXURL)
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

//单独页面微信分享功能
wxShare: function (shareImg, shareTitle, shareDesc, shareUrl, callBack, tipsCon) {
    // var url = window.location.href;
    var url ="mall.faw-vw.com/shop-m/page/activity/2020-0606/"
    var wcConfig;
    // alert(url)
    methods.ajax("/index.php/Wechat/GetJssdk/getJssdkConfig", {
        url: url
    }, function (res) {
        wcConfig = res;
        // console.log(wcConfig)
        setConfig();
    });
    function setConfig() {
        console.log(wx.config())
        wx.config({
            debug: false,
            appId: wcConfig.data.appId,
            timestamp: wcConfig.data.timestamp,
            nonceStr: wcConfig.data.nonceStr,
            signature: wcConfig.data.signature,
            jsApiList: [
                'onMenuShareQQ',
                'uploadImage',
                'chooseImage',
                'onMenuShareTimeline',
                'onMenuShareAppMessage',
                'startRecord',
                'stopRecord',
                'translateVoice',
                'chooseCard',
                'openCard',
                'addCard'
            ]
        });
        var wxData = {
            url: shareUrl ? location.protocol + "//" + location.host + shareUrl : url,
            imgurl: location.protocol + "//" + location.host + (shareImg ? shareImg : "/shop-m/public/images/share_icon.jpg"),
            title: shareTitle ? shareTitle : "一汽-大众商城 | 只为简单汽车生活",
            desc: shareDesc ? shareDesc : "一汽-大众商城，是一汽-大众公司精心为用户打造客户值得信赖的汽车生活服务平台。在这里您可以浏览购买一汽-大众全线车型、一汽-大众官方备件、一汽-大众服务等内容，体验一汽-大众精彩生活！"
        }
        var weixinShare = {
            title: wxData.title,
            desc: wxData.desc,
            link: wxData.url,
            imgUrl: wxData.imgurl,
            type: '',
            trigger: function (res) {
               alert('用户点击发送给朋友');
                localStorage.setItem("share_type", 2);

            },
            success: function (res) {
                if (callBack) {
                    if (tipsCon) {
                        methods.confirm(tipsCon);
                    } else {
                        methods.prompt("分享成功");
                        alert('分享成功')

                    }
                    callBack();
                };
            },
        };
        var qqShare = {
            title: wxData.title,
            desc: wxData.desc,
            link: url,
            imgUrl: wxData.imgurl,

            success: function () {
                if (callBack) {
                    if (tipsCon) {
                        methods.confirm(tipsCon);
                    } else {
                        methods.prompt("分享成功");
                    }
                    callBack();
                };
            },
        };
        var friendShare = {
            title: wxData.title,
            link: wxData.url,
            imgUrl: wxData.imgurl,
            trigger: function (res) {
                console.log('用户点击分享到朋友圈');
                localStorage.setItem("share_type", 1);
            },
            success: function (res) {
                if (callBack) {
                    if (tipsCon) {
                        methods.confirm(tipsCon);
                    } else {
                        methods.prompt("分享成功");
                    }
                    callBack();
                };
            },
        };
        wx.ready(function () {
            wx.onMenuShareTimeline(friendShare);
            wx.onMenuShareAppMessage(weixinShare);
            wx.onMenuShareQQ(qqShare);
        });
    }
},

}
//页面微信分享
if (userAgentInfo.match(/MicroMessenger/i) == 'micromessenger') {
    methods.wxShare();
}