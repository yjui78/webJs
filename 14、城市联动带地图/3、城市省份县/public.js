
var AJAXURL = 'https://mall.faw-vw.com/';
var methods = {
    //初始化页面功能
    init: (function (){
        //向页面中添加loading,prompt提示框，.confirm弹出框
        $("body").append('<div class="loading"><div class="loading-img">加载中...</div></div><div class="prompt"></div><div class="confirm-box"><div class="confirm"><div class="confirm-title">温馨提示</div><div class="confirm-con"></div><span class="cancel">返回</span><span class="determine">确定</span></div></div>');

    })(),
    ajax:function(url,params,callback,errorCallBack,offLoading){
        $.ajax({
            url:AJAXURL+url,
            type:"post",
            dateType:"json",
            data:params,
            success:function(res){
                if(res.code==200){
                    if(callback){
                        callback(res)
                    }
                }else if(res.code == 406){
                    //没登录操作
                }else {
                    if(errorCallBack){
                        errorCallBack(res)
                    }else {
                        methods.prompt(res.msg)
                    }
                }
            },
            error: function (err) {
            }
        })
    },
     //提示框
     prompt: function (con, back) {
        $(".prompt").html(con ? con : "").show();
        clearTimeout(timeOut);
        var timeOut = setTimeout(function () {
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
    //密码验证
    pwdVerify: function (pwd) {
        if (/^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z0-9]{6,20}$/.test(pwd)) {
            return true;
        } else {
            return false;
        }
    },
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
}

var userAgentInfo = navigator.userAgent.toLowerCase();
//百度地图控件获取定位
if (userAgentInfo.match(/MicroMessenger/i) == 'micromessenger') {
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
} else {
    getBMap();
}


//百度地图获取定位
function getBMap() {
    if (localStorage.getItem("cityInfo")) {
        config.cityInfo = JSON.parse(localStorage.getItem("cityInfo"));
    } else {
        //获取经纬度
        var geolocation = new BMap.Geolocation();
        geolocation.getCurrentPosition(function (r) {
            if (this.getStatus() == BMAP_STATUS_SUCCESS) {
                getLocate(r.point.lng, r.point.lat);
            }
        }, {
            enableHighAccuracy: true
        })
    }
}