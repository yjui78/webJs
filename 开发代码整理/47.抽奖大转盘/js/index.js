/*
    大转盘抽奖总结：
    后台需提供接口如下：
    1、当前系统时间,判断活动开始结束
    res  = { code: 200, data: "2020-06-22", msg: "成功"}
    2、需要登录情况下判断是否有抽奖资格，luckDraw2判断是否触发抽奖函数
    var res =  {
            "code": 200,
            "msg": "",
            "data": 3                // 1可以抽奖 2不能抽奖 3已经抽过
    }

    3、请求奖品接口，是否中奖，中什么奖都由后台决定返回，
    前台要渲染奖品名展示页面上，后台索引与前端奖品名对应，
    turnplate.restaraunts = ["定制 kindle","谢谢参与","大疆无人机","jmgo坚果投影仪","大疆无人机"];
    prize_type = [0,1,2,3,4]
    res ={
        "code": 200,
        "msg": "成功",
        data: {
            "code": 200,
            "prize_name": "大疆无人机", //  对应game.js中奖品名
            "prize_type": 2,            //  对应game.js中奖品索引
        }
    }

    转盘大小：outsideRadius调整
*/


var app = new Vue({
    el: '#app',
    data: {
        currentTime: "2020-6-4", 	//当前服务器返回的时间，用来判断活动时间
        isLogin: true,     			//用户是否登录
        luckDraw2: "", 		        //买券抽奖，判断用户是否已参与过，1可以抽奖 2不能抽奖 3已经抽过
        luckDrawClick: true,  	    //抽奖按钮是否可以点击，避免重复请求点击
        popup: {  						//弹窗显示及显示的类型
            show: false,
            type: "mqzj"  				//wgq-未购券，wzj-未中奖，zj-留资中奖，rule-活动规则，form-表单，mqzj-买券中奖，ycy-已参与过活动,ycw-已抽完
        },
        prizeName: "",  		//奖品名称
    },
    created: function () {
        var _this = this;
        // 获取当前时间接口
        // methods.ajax("/Activity/SystemDate/getSysDate", {}, function(res) {
        _this.currentTime = '2020-06-10';
        _this.getLuckDraw2Info();
        $("body").append('<script src="js/awardRotate.js"></script><script src="js/game.js"></script>');
        // 绘制转盘数据
        setTimeout(function () {
            drawRouletteWheel();
        }, 300)
        // })
    },
    methods: {
        // 获取买券抽奖数据
        getLuckDraw2Info: function () {
            var _this = this;
            if (_this.isLogin) {
                // 判断用户是否有抽奖资格,需登录406,
                // methods.ajax("/Activity/User/IsLottery", {}, function(res) { 
                var res = {
                    "code": 200,
                    "msg": "",
                    "data": 3                // 1可以抽奖 2不能抽奖 3已经抽过
                }
                _this.luckDraw2 = res.data;    //1可，2不可，3已抽奖，改变它值可控制能不能抽奖
                // })
            }
        },
        luckDraw: function () {
            var _this = this;
            // 判断是否可以点击，避免重复请求点击
            if (_this.luckDrawClick) {
                /*
                    //判断是否登录
                   if (!_this.isLogin) {
                        if (flag == 2) {
                            //移动端
                            methods.toLogin();
                        } else {
                            // PC
                            location.href = '/views/personal-center/login/index.html?u=' + encodeURIComponent(window.location.href);
                        }
                   } else {
                 */
                // 活动开始，结束
                _this.luckDraw2 = 1;   //由接口返回是否能抽奖
                // methods.ajax("/Activity/User/getCondition", {}, function(res) {
                // 判断用户是否已参与，模拟
                if (_this.luckDraw2 == 3) {          //3参与过
                    _this.popup.type = "ycy";
                    _this.popup.show = true;
                    _this.iscj = "您已参与过抽奖";
                } else if (_this.luckDraw2 == 2) {    //2未购券
                    _this.popup.type = "wgq";
                    _this.popup.show = true;
                    _this.nowgq = "亲亲，您还未购券，无法参与抽奖。";

                } else { 						    //1可以抽奖
                    _this.getPrize();
                }
                // })
                // }
            }
        },
        //请求抽奖接口，奖口由后台决定，prize_type对应前端game.js中索引值turnplate.restaraunts
        getPrize: function () {
            var _this = this;
            _this.luckDrawClick = false;
            //接奖接口，改变它值可控制有没有中奖，奖品名
            // methods.ajax(prizeUrl, {}, function(res) {
            res = {
                "code": 200,
                "msg": "成功",
                data: {
                    "code": 200,
                    "prize_name": "jmgo坚果投影仪", //  对应game.js中奖品名
                    "prize_type": 3,                //  对应game.js中奖品索引，1没奖，其他中奖
                }
            }
            //302该用户已经参与过抽奖
            if (res.data.code == "302") {
                _this.popup.show = true;
                _this.popup.type = "ycy";
                _this.luckDrawClick = true;
            } else {
                prizeId = res.data.prize_type;
                _this.prizeName = res.data.prize_name;
                //动态添加大转盘的奖品与奖品区域背景颜色
                turnplate.randomRate = ["0%", "0%", "0%", "0%", "0%"];
                _this.luckDraw2 = 3;  //定为抽过奖
                // 奖品
                turnplate.randomRate.splice(prizeId, 1, "100%");
                drawRouletteWheel();
                // 开始抽奖
                start();
            }
            // })
        },
    },
    mounted: function () {

    },
})