var vm = new Vue({
    el:'#app',
    data: {
        coupon:[],
        asslist:[],
        total_price:0,
        userNickname:"TA"
    }
});

$(function(){
    var  fromUserid =methods.getQueryString("fromUserid");

    //请求被助力用户信息,userid是首页邀请好友助力带来的
    getAssList(fromUserid);
    function Isweixin(){
        var userAgentInfo = navigator.userAgent.toLowerCase();
        // var demainUrl ='http://faw-vw.ftms-wechat.com';
        var returnUrl =chineseTransfer(window.location);
        if (userAgentInfo.match(/MicroMessenger/i) == "micromessenger") {
            var code = getUrlParam("code");
            if (!code) {
                window.location = "/Wechat/GetUserInfo/getCode?callbackurl="+returnUrl;
            }else{
                getOpenId(code);
            }
        }
    }

    //获取code
    function getUrlParam(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }
    //转义
    function chineseTransfer(value) {
        return encodeURIComponent(encodeURIComponent(value))
    };

    //获取openid
    function getOpenId(code) {
        var targetUrl="/Wechat/GetUserInfo/getUserInfo";
        methods.ajax(targetUrl,{
            code:code
        },function(res){
            //点帮他助力
            var data = res.data;
            console.log(data);
            var param = {
                userid:fromUserid,           //被助力人userid
                ass_openid :data.openid,
                ass_name :data.nickname,
                ass_head_img : data.headimgurl
            };
            // var user_openid = localStorage.getItem('user_openid');
            localStorage.setItem('ass_openid',param.ass_openid);
            // alert('被助力人openid:'+user_openid);
            // alert('助力人openid:'+param.ass_openid);
            $('.help-assi').on('touchstart',function(ev){
                if(vm.coupon.length==4){
                    methods.prompt('该用户已完成助力任务');
                }else {
                    // if(fromOpenid==param.ass_openid){
                    //     var e= ev||event;
                    //     window.event? window.event.cancelBubble = true : e.stopPropagation();
                    //     $('#tipImgFixed').show();
                    //     $('#entranceshade2').show();
                    // }else {
                        //非同一人可助力
                        getAssCoupon(param);

                    // }
                }
            });
        });
    }

    function assState(){
            // if(fromOpenid==curOpenid){
            //     setTimeout(function(){
            //         $('#myZJ').show();
            //         $('#heZJ').hide();$('.friendly.f-s').hide(); $('#hZ').hide(); $('.friendly.w-s').show();
            //         methods.prompt('本人可找朋友帮忙助力');
            //         vm.userNickname ="您";
            //         if(vm.coupon.length==0){
            //             $('#myZ').show();  $('.friendly.w-s').hide();
            //         }else if(vm.coupon.length==1){
            //             $('#myZ').show();
            //             $('.friendly.w-s').hide();
            //         }else if(2<=vm.coupon.length<=3){
            //             $('.friendly.w-s').show(); $('#myZ').hide();
            //         }
            //     },1000);
            // }else {
                setTimeout(function(){
                        vm.userNickname ="TA";
                        $('#heZJ').show();
                        $('#myZ').hide();$('.friendly.w-s').hide(); $('#myZJ').hide(); $('.friendly.f-s').show();
                        if(vm.coupon.length==0){
                            $('#hZ').show(); ;$('.friendly.f-s').hide();
                        }else if(vm.coupon.length==1){
                            // alert("vm.coupon.length:"+vm.coupon.length);
                            $('#hZ').show();
                            $('.friendly.f-s').hide();
                        }else if(2<=vm.coupon.length<=3){
                            $('.friendly.f-s').show();
                            $('#hZ').hide();
                        }
                },500);
    }

    //网页的帮忙助力列表
    function wapAssList(curOpenid){
        // setTimeout(function(){
            $('#myZJ').show();
            $('#heZJ').hide();$('.friendly.f-s').hide(); $('#hZ').hide(); $('.friendly.w-s').show();
            vm.userNickname ="您";
            if(vm.coupon.length==0){
                $('#myZ').show();  $('.friendly.w-s').hide();
            }else if(vm.coupon.length==1){
                $('#myZ').show();
                $('.friendly.w-s').hide();
            }else if(2<=vm.coupon.length<=3){
                $('.friendly.w-s').show(); $('#myZ').hide();
            }
        // },1000);
    }

    //非本区隐藏
    if($('.tipImgFixed').display!='none'){
        $(document.body).on("touchstart", function() {
            $('.tipImgFixed').hide();
            $('#entranceshade2').hide();
        })
    }

    //帮他助力人的信息
    function getAssCoupon(param){
        methods.ajax("/Activity/NewCarCoupon/getAssCoupon",{
            userid: param.userid,
            ass_openid :param.ass_openid,
            ass_name :param.ass_name,
            ass_head_img :param.ass_head_img
        },function(res){
            console.log(res);
            //获取最新助力列表
            getAssList(param.userid);
        })
    }

    //被助力人信息
    function getAssList(fromUserid){
        methods.ajax("/Activity/NewCarCoupon/getAssList",{
            userid:fromUserid
        },function(res){
            var data= res.data;
            console.log(res);
            vm.coupon=data.coupon;
            vm.total_price =data.total_price;
            vm.asslist =data.asslist;
            assState();
            if(vm.coupon.length>0){
                for(var i=0;i<vm.coupon.length;i++){
                    $('.ul-assistance li').eq(i).addClass('active');
                }
            }
        });
    }
    $('#buTry').on('touchstart',function(){
        window.location = "/shop-m/page/activity/2019-0720/buy-new-car/index.html";
    });

    //网页中判断登录状态
    var userAgentInfo = navigator.userAgent.toLowerCase();
    if (userAgentInfo.match(/MicroMessenger/i) != "micromessenger") {
        console.log('网页');
        methods.getLoginState(function(){
            if(config.loginStatus){
                //获取登录信息
                console.log(config.userInfo);
                var wapUserid = config.userInfo.id;
                wapAssList();
                // getAssList(fromUserid);
                $('.help-assi').on('click',function(ev){
                    if(fromUserid ==wapUserid ) {
                        var e= ev||event;
                        window.event? window.event.cancelBubble = true : e.stopPropagation();
                        $('#tipImgFixed').show();
                        $('#entranceshade2').show();
                    }
                })
            }
        });
    }else {
        Isweixin();
    }

    //微信分享
    if (userAgentInfo.match(/MicroMessenger/i) == 'micromessenger') {
        methods.wxShare("/shop-m/page/activity/2019-0720/buy-new-car/images/share_icon.jpg",
            "戳，你的小伙伴喊你来助力！",
            "更多花式撒钱尽在一汽-大众电商720周年庆",
            "/shop-m/page/activity/2019-0720/buy-new-car/helpAssistance.html?fromUserid="+fromUserid,
            function(res){
                var share_type = localStorage.getItem("share_type");
                var ass_openid =localStorage.getItem('ass_openid');
                if(share_type){
                    methods.ajax("/Activity/NewCarCoupon/getUserShareLog",{
                        userid:fromUserid,
                        openid:ass_openid,
                        share_type:share_type
                    },function(res){
                        var data= res;
                        // alert("1朋友圈，2好友："+share_type);
                        // alert("返回："+data);

                    });
                }
            })
    }
});
