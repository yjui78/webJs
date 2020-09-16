// 判断是否小程序打开
window.IS_XCC = false;
var userAgentInfo = navigator.userAgent.toLowerCase();
var mpLoaded=false;
//判断是安卓还是ios
var isAndroid = userAgentInfo.indexOf('android') > -1 || userAgentInfo.indexOf('linux') > -1;
if (userAgentInfo.match(/MicroMessenger/i) == 'micromessenger') {
    wx.miniProgram.getEnv(function (res) {
        if (res.miniprogram) {
            //小程序中
            IS_XCC = true;
			mpLoaded="mp";
            $('#footer').hide();
            if (location.href.indexOf("dealer-list.html") > -1 || location.href.indexOf("cltcar.html") > -1 || location.href.indexOf("perinf.html") > -1) {
                $('#header .go-back,#header .go-home,#header .page-title').hide();
            } else {
                $('#header,#header1,.right-btn').hide();
                $("body").css("padding-top", "0");
            }
            //菜单调整
            $(".mesg-menu,.ordnav,.nav_box,.dealer-news,.custom-menu,.bg-color .sel-city,.car_con").css("top", "0");
            $(".deta-box").css("top", "0.9rem");
            //活动页面导航调整
            $(".header").hide();
            if (isAndroid) {
                // $("body").css("padding-bottom", "70px");
                // $(".fo_nav,.nav-bar-tab,.car-pu,.btn-box,.city-select,.confirm-btn,.custom-pop,.but-mor,.bottom").css("bottom", "70px");
            }

            //设置小程序cookie
            if (location.href.indexOf("/login.html") < 0 && location.href.indexOf("/actset.html") < 0) {
                if (localStorage.getItem('cookie')) {
                    wx.miniProgram.postMessage({
                        data: localStorage.getItem('cookie')
                    });
                }
            }

            // 判断是否是新车小程序
            if (methods.getQueryString("isNewCarMp")) {
                localStorage.setItem("isNewCarMp", "true");
            }

			// 隐藏720活动首页入口
			$(".right-btn .go-home").hide();
        } else {
			mpLoaded="wx";
            //微信浏览器中
            //解决移动端返回页面不刷新页面
            window.onpageshow = function (event) {
                if (event.persisted) {
                    window.location.reload()
                }
            };
        }
    })
} else {
	mpLoaded="web";
    //手机浏览器中
    //解决移动端返回页面不刷新页面
    window.onpageshow = function (event) {
        if (event.persisted) {
            window.location.reload()
        }
    };
}
//ajax请求地址
var AJAXURL = "";
if (location.href.indexOf("localhost:") > -1 || location.href.indexOf("file:///") > -1 || location.href.indexOf("127.") > -1) {
    AJAXURL = "https://faw-vw.ftms-wechat.com";
    AJAXURL ="https://mall.faw-vw.com/";
}
var loadTime;
//ajax请求前显示loading动画
$(document).on("ajaxStart", function () {
    $(".loading").show();
});
$(document).on("ajaxStop", function () {
    $(".loading").hide();
    clearTimeout(loadTime);
    loadTime = setTimeout(function () {
        if (userAgentInfo.match(/MicroMessenger/i) == 'micromessenger') {
            wx.miniProgram.getEnv(function (res) {
                $(".loading-box").hide();
            })
        } else {
            $(".loading-box").hide();
        }
    }, 300)
});

var timeOut;

// 当前页面进入时间记录，用于做用户轨迹数据
var pageStartTime=new Date().getTime();
var pageNameArr;


//整站功能方法库
var methods = {
    //初始化页面功能
    init: (function () {
        var hrefCon = location.href.indexOf("?") > -1 ? location.href.substring(0, location.href.indexOf("?")) : location.href;
        $("#header").load("/shop-m/page/public/header.html", function () {
            $(".page-title").html(pageTitle);
			// 判断是否是oneApp环境
			if(localStorage.getItem("oneapp")){
				$("#header .go-home,#footer,div.chaxun").hide();
				$(".go-back").click(function(e){
					e.preventDefault();
					if(isAndroid){
						// 执行安卓方法
						if(location.href.indexOf("/diy-car/")>-1){
							oneAppJsObject.exit();
						}else{
							oneAppJsObject.goBack();
						}
					}else{
						// 执行ios方法
						if(location.href.indexOf("/diy-car/")>-1){
							window.webkit.messageHandlers.exit.postMessage({});
						}else{
							window.webkit.messageHandlers.goBack.postMessage({});
						}
						
					}
				})
			}
        });
        if (hrefCon.indexOf("index.html") > -1 || hrefCon.indexOf("car-type.html") > -1 || hrefCon.indexOf(".html") == -1 || hrefCon.indexOf("personal-center.html") > -1) {
            $("#footer").load("/shop-m/page/public/bottom-menu.html", function () {
                if (hrefCon.indexOf("index.html") > -1 || hrefCon.indexOf(".html") == -1) {
                    $(".nav-list li").eq(0).find("a").addClass("active")
                } else if (hrefCon.indexOf("car-type.html") > -1) {
                    $(".nav-list li").eq(1).find("a").addClass("active");
                    //动态设置main高度
                    $("#main").css("height", $(window).height() - $("#header").height() - $(".nav-list").height() + 1 + "px");
                } else if (hrefCon.indexOf("personal-center.html") > -1) {
                    $(".nav-list li").eq(4).find("a").addClass("active");
                }
            });
        }
        //向页面中添加loading,prompt提示框，.confirm弹出框
        $("body").append('<div class="loading"><div class="loading-img">加载中...</div></div><div class="prompt"></div><div class="confirm-box"><div class="confirm"><div class="confirm-title">温馨提示</div><div class="confirm-con"></div><span class="cancel">返回</span><span class="determine">确定</span></div></div>');
        //confirm弹框取消
        $(".cancel").on("click", function () {
            $(".confirm-box").hide();
        })
        //更新登录状态
        $.ajax({
            "type": "post",
            "url": AJAXURL + "/User/Public/verifyCredentials",
            "async": true,
            "success": function (res) {
                //返回状态处理
                if (res.code == 200) {
                    config.loginEnd = true;
                    if (res.data.is_login) {
                        config.loginStatus = true;
                    } else {
                        config.loginStatus = false;
                        //必须要登录的页面控制
                        var pageArr = ["recognition.html", "test-drive-one.html", "customcar-enter.html", "look-car.html", "ask-questions.html", "searchbreak.html", "np-credit-verify.html", "faw-credit-verify.html"];
                        for (var i = 0; i < pageArr.length; i++) {
                            if (hrefCon.indexOf(pageArr[i]) > -1) {
                                //跳转至登录
                                methods.toLogin();
                                break;
                            }
                        }
                    }
                }
            }
        });

        //注册协议关闭
        $(".agreement .close").click(function () {
            $(".service-agreement").hide();
        });
    })(),
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
    //车牌号验证
    carNumberVerify: function (carNumber) {
        var xreg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF]$)|([DF][A-HJ-NP-Z0-9][0-9]{4}$))/;
        var creg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1}$/;
        if (carNumber.length == 7) {
            return creg.test(carNumber);
        } else if (carNumber.length == 8) {
            return xreg.test(carNumber);
        } else {
            return false;
        }
    },
    //车架号验证
    carVinVerify: function (vinNumber) {
        if (/^[a-zA-Z]{1}[a-zA-Z0-9]{16}/.test(vinNumber)) {
            return true;
        } else {
            return false;
        }
    },
    //发动机号验证
    engineVerify: function (engineNumber) {
        if (/[a-zA-z0-9]/.test(engineNumber)) {
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
	// oneapp设置用户登录
	setUserInfo:function(userInfo){
		// 设置电商登录
		methods.ajax("/User/Login/oneAppLogin",userInfo,function(res){
			methods.ajax("/User/User/getUserInfo", {}, function (res) {
			    localStorage.setItem("userInfo", JSON.stringify(res.data));
				location.reload();
			});
		})
	},
	// 退出登录
	appLogout:function(userInfo){
		methods.ajax("/User/User/logout",{},function(res){});
	},
    //登录、注册成功后页面回跳
    loginCallback: function () {
        //获取用户信息
        methods.ajax("/User/User/getUserInfo", {}, function (res) {
            localStorage.setItem("userInfo", JSON.stringify(res.data));
            config.userInfo = res.data;

            if (methods.getQueryString("is-mp")) {
                wx.miniProgram.postMessage({
                    data: localStorage.getItem('cookie')
                });
                // 如果有小程序返回页面地址，跳转相应地址，如果没有返回地址，则返回上一个页面。 edit by xuchao 2019-07-15
                if (methods.getQueryString("login-callback")) {
					var callBackUrl=decodeURIComponent(methods.getQueryString("login-callback"))+"?cookie="+ encodeURIComponent(localStorage.getItem('cookie')); 
					if(methods.getQueryString("type")=="switch"){
						wx.miniProgram.switchTab({
						    url: callBackUrl
						});
					}else{
						wx.miniProgram.navigateTo({
						    url: callBackUrl
						});
					}
                } else {
                    wx.miniProgram.navigateBack();
                }
            } else {
                window.location.replace(methods.getQueryString("login-callback") ? decodeURIComponent(decodeURIComponent(methods.getQueryString("login-callback"))) : "index.html");
            }
        });
    },
    //获取当前城市定位,需要传一个获取成功后的回调函数
    getCity: function (callback) {
        var getCityTime = setInterval(function () {
            if (config.cityInfo.id) {
                //执行回调函数
                if (callback) {
                    callback(config.cityInfo.id);
                }
                clearInterval(getCityTime);
            }
        }, 500);
    },
    //检测用户登录状态
    getLoginState: function (callback) {
        var getLogin = setInterval(function () {
            if (config.loginEnd) {
                //执行回调函数
                if (callback) {
                    callback();
                }
                clearInterval(getLogin);
            }
        }, 500);
    },
    //更新用户信息
    updateUserInof: function () {
        methods.ajax("/User/User/getUserInfo", {}, function (res) {
            localStorage.setItem("userInfo", JSON.stringify(res.data));
        });
    },
    // 保存当前页面信息，确保跳转用
    savePage: function (pagename, pageinfo) {
        // 保存当前页面地址
        localStorage.setItem(pagename, JSON.stringify({
            "info": pageinfo
        }));
    },
    //单独页面微信分享功能
    wxShare: function (shareImg, shareTitle, shareDesc, shareUrl, callBack, tipsCon) {
        alert(shareImg)
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
	// uuid生成
	createUUID:(function(uuidRegEx, uuidReplacer) {
		return function() {
			return "xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(uuidRegEx, uuidReplacer).toUpperCase();
		};
	})(/[xy]/g, function(c) {
		var r = Math.random() * 16 | 0,
			v = c == "x" ? r : (r & 3 | 8);
		return v.toString(16);
	}),
	// 用户轨迹统计
	trajectoryStatistics:function(info) {
		// 判断是否存在uuid，并生成
		if (!localStorage.getItem("vwUuid")) {
			localStorage.setItem("vwUuid", methods.createUUID());
		}
		if (info.event) {
			info.event.time = new Date().getTime();
		};
		var pushInfo = {
			url: location.href, //页面地址
			uuid: localStorage.getItem("vwUuid"), //32位uuid
			cityName: config.cityInfo.name?config.cityInfo.name: "", //城市名称
			event: info.event ? info.event : "",
			userPhone: localStorage.getItem("userInfo")?JSON.parse(localStorage.getItem("userInfo")).r_tel:"", //用户手机号，用户登录后会有数据，未登录时为空
			terminal:"移动端"  //终端：PC端/移动端
		}
		// 添加百度检测-用户手机号
		_hmt.push(["_setUserProperty", {"userPhone": pushInfo.userPhone}]);
		// 传递数据
		$.ajax({
			url: "/datacollectlogs/",
			type: "post",
			data: JSON.stringify(pushInfo),
		})
	},
	// 访问页面判断
	getPageName:function(){
		var pageUrl=location.href;
		var pageName="";
		for(var i=0; i<pageNameArr.length; i++){
			if(pageUrl.indexOf(pageNameArr[i].sign)>-1){
				pageName=pageNameArr[i].name;
				break;
			}else{
				pageName="首页";
			}
		}
		return pageName;
	}
}
//整站配置项
var config = {
    //用户信息
    userInfo: localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null,
    //登录状态
    loginStatus: false,
    //城市定位信息
    cityInfo: {
        id: null,
        name: null,
        lat: null,
        lng: null
    },
    loginEnd:false,
}

//template模板过滤器
//保留两位小数
template.defaults.imports.toFixed = function (value) {
    return value.toFixed(2)
};
//中文转义
template.defaults.imports.chineseTransfer = function (value) {
    return encodeURIComponent(encodeURIComponent(value))
};

//百度地图控件获取定位
if (userAgentInfo.match(/MicroMessenger/i) == 'micromessenger') {
 
	// 判断是否是二手车公众号嵌入
	if(localStorage.getItem("isVwUsedCar") || methods.getQueryString("isVwUsedCar")){
		localStorage.setItem("isVwUsedCar","1");
		getBMap();
	}else{
		wx.miniProgram.getEnv(function (res) {
			if (res.miniprogram) {
				if (methods.getQueryString("lat") && methods.getQueryString("lat")!="undefined") {
					getLocate(methods.getQueryString("lng"), methods.getQueryString("lat"));
				} else if (localStorage.getItem("cityInfo")) {
					config.cityInfo = JSON.parse(localStorage.getItem("cityInfo"));
				}else{
					var localInfo = {
						"id": "110100",
						"name": "北京市",
						"lng": "116.40387397",
						"lat": "39.91488908"
					};
					localStorage.setItem("cityInfo", JSON.stringify(localInfo));
					config.cityInfo = localInfo;
				}
			} else {
				getBMap();
			}
		})
	}
} else {
    getBMap();
    // alert(3)
}

//百度地图获取定位
function getBMap() {
    if (localStorage.getItem("cityInfo")) {
        config.cityInfo = JSON.parse(localStorage.getItem("cityInfo"));
        // alert(1)
    } else {
        // alert(2)
        try{
            //获取经纬度
            var geolocation = new BMap.Geolocation();
            geolocation.getCurrentPosition(function (r) {
                if (this.getStatus() == BMAP_STATUS_SUCCESS) {
                    getLocate(r.point.lng, r.point.lat);
                }
            }, {
                enableHighAccuracy: true
            })
        }catch(err){
    
        }
    }
}

function getLocate(lng, lat) {

    //获取定位城市
    methods.ajax("/Dealer/Index/locateByGoord", {
        "lng": lng,
        "lat": lat
    }, function (res) {
        var localInfo = {
            "id": res.data.city.id,
            "name": res.data.city.name,
            "lng": lng,
            "lat": lat
        };
        localStorage.setItem("cityInfo", JSON.stringify(localInfo));
        config.cityInfo = localInfo;
    })
}

Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};

function number_format(number) {
    var decimals = 2;
    var dec_point = ".";
    var thousands_sep = ",";
    /*
     * 参数说明：
     * number：要格式化的数字
     * decimals：保留几位小数
     * dec_point：小数点符号
     * thousands_sep：千分位符号
     * */
    number = (number + '').replace(/[^0-9+-Ee.]/g, '');
    var n = !isFinite(+number) ? 0 : +number,
        prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
        sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
        dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
        s = '',
        toFixedFix = function (n, prec) {
            var k = Math.pow(10, prec);
            return '' + Math.ceil(n * k) / k;
        };

    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
    var re = /(-?\d+)(\d{3})/;
    while (re.test(s[0])) {
        s[0] = s[0].replace(re, "$1" + sep + "$2");
    }

    if ((s[1] || '').length < prec) {
        s[1] = s[1] || '';
        s[1] += new Array(prec - s[1].length + 1).join('0');
    }
    return s.join(dec);
};
//设置缩略图
//data 原图片数据base64
//maxw 最大图片宽度
//minh 最小图片高度
//isjc 是否剪裁
//back 回调返回图片数据
var setThumbnail = function (data, maxw, maxh, isjc, back) {
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext('2d');
    var image = new Image();
    image.src = data;
    image.onload = function () {
        var w = image.naturalWidth,
            h = image.naturalHeight;
        var bl = w > h ? w : h;
        if (w > h) {
            bl = w / maxw;
        } else {
            bl = h / maxh;
        }
        bl = bl > 1 ? bl : 1;
        if (isjc) {
            var new_w = w / bl;
            var new_h = h / bl;
            canvas.width = maxw;
            canvas.height = maxh;
            var bl = 1;
            if (w < h) {
                bl = w / maxw;
            } else {
                bl = h / maxh;
            }
            ctx.drawImage(image, 0, 0, w, h, (maxw - w / bl) / 2, (maxh - h / bl) / 2, w / bl, h / bl);
            //alert([w,h,maxw,maxh]);
            //ctx.drawImage(image, 0, 0,  w*2, h*2);
        } else {
            canvas.width = w / bl;
            canvas.height = h / bl;
            ctx.drawImage(image, 0, 0, w, h, 0, 0, canvas.width, canvas.height);
        }
        var data = canvas.toDataURL("image/jpeg", 1);
        back(data);
    };
};
//加入GA,百度统计代码
$("body").append('<script>var _hmt = _hmt || [];(function() {var hm = document.createElement("script");hm.src = "https://hm.baidu.com/hm.js?167d75281ba2408763a20c1f3e559af1";var s = document.getElementsByTagName("script")[0];s.parentNode.insertBefore(hm, s);})();</script><script async src="https://www.googletagmanager.com/gtag/js?id=UA-121362177-1"></script><script>window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag("js", new Date());gtag("config", "UA-121362177-1");</script><script type="text/javascript">var _paq = _paq || [];_paq.push(["trackPageView"]);_paq.push(["enableLinkTracking"]);(function(){var u=(("https:" == document.location.protocol) ? "https" : "http") + "://tracker.faw-vw.com/";_paq.push(["setTrackerUrl", u +"track/tracker/request"]); _paq.push(["setSiteId", "684dfe58e325577b"]);_paq.push(["setRequestMethod", "POST"]);var d=document, g=d.createElement("script"), s=d.getElementsByTagName("script")[0];g.type="text/javascript"; g.async=true; g.defer=true; g.src=u+"js/ubtp.min.js"; s.parentNode.insertBefore(g,s);})();</script>');

//统计监测代码参数
if (methods.getQueryString("utm_source")) {
    var code = {
        utm_source: methods.getQueryString("utm_source"),
        utm_medium: methods.getQueryString("utm_medium"),
        utm_term: methods.getQueryString("utm_term"),
        utm_content: methods.getQueryString("utm_content"),
        utm_campaign: methods.getQueryString("utm_campaign")
    };
    localStorage.setItem("statisticalCode", JSON.stringify(code));
    setCookie("utm_source", methods.getQueryString("utm_source"))
    setCookie("utm_medium", methods.getQueryString("utm_medium"))
    setCookie("utm_term", methods.getQueryString("utm_term"))
    setCookie("utm_content", methods.getQueryString("utm_content"))
    setCookie("utm_campaign", methods.getQueryString("utm_campaign"))
}

function setCookie(name, value) {
    var exp = new Date();
    exp.setTime(exp.getTime() + 1800000); //30分钟
    document.cookie = name + "=" + encodeURIComponent(value) + ";expires=" + exp.toGMTString() + ";path=/";
    return true;
};
//页面微信分享
if (userAgentInfo.match(/MicroMessenger/i) == 'micromessenger') {
    methods.wxShare();
}

// 解决微信输入后无法自动回复位置bug
$("input,textarea,select").blur(function () {
    $(window).scrollTop($(window).scrollTop())
});


// 判断是否是oneApp环境
if(methods.getQueryString("oneapp")==1){
	localStorage.setItem("oneapp","1");
}

// 传递当前页面用户轨迹进入信息
$.getJSON("/shop-m/pageName.json",function(res){
	pageNameArr=res.pageNameArr;
	methods.trajectoryStatistics({
		event: { //操作的事件合集
			name: "访问", //操作的事件名称：目前有4个：点击、留资、访问、离开
			content: methods.getPageName(), //事件操作说明内容：列如：点击了颜色切换、点击了内饰观看、定制车留资、进入页面、离开页面
		},
	});
});
// 监听页面离开,进行用户轨迹统计
window.onbeforeunload = function() {
	methods.trajectoryStatistics({
		event: { //操作的事件合集
			name: "离开", //操作的事件名称：目前有4个：点击、留资、进入、离开
			content: methods.getPageName(), //事件操作说明内容：列如：点击了颜色切换、点击了内饰观看、定制车留资、进入页面、离开页面
		},
	});
}