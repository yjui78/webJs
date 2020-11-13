//这是大众cc定制车项目中单独为微信分享提出的文件，使用wxMouted.wxShare('图片地址','标题','描述')
wxMounted = {
    //单独页面微信分享功能
    wxShare: function (shareImg, shareTitle, shareDesc, shareUrl, callBack, tipsCon) {
        var url = window.location.href;
        var wcConfig;
        methods.ajax("/index.php/Wechat/GetJssdk/getJssdkConfig", {
            url: url
        }, function (res) {
            wcConfig = res;
            setConfig();
        });

        function setConfig() {
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
                    // console.log('用户点击发送给朋友');
                    localStorage.setItem("share_type", 2);

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