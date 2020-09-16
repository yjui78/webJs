var app = new Vue({
	el: "#app",
	data: {
		 isShow:false,  //弹窗
		 province: {
			index: 0,
			data: []
		},
		city: {
			index: 0,
			data: []
		},
		form:{
			userName:'',
			mobile:'',
			dealerCode:'',
			dealerName:'',
			vehicleSeriesCode:'',
			verificationCode:''
		},
		dealer:[],
		curTop:'',
		pageHeight:'',
		appointmentTime:''
	},
	created:function(){

	},
	methods:{
		// 预约试驾，弹窗不滚动
		bookFn(vehicleSeries){
			var _this = this;
			_this.form.vehicleSeriesCode = vehicleSeries;
			_this.isShow=true;
			if(_this.isShow){
				$('body').css({
					'overflow':'hidden',
					'position':'fixed',
					'top':-_this.getScrollTop()+'px',
				})
				$(document).scrollTop(_this.curTop); 
			}
		},
		// 滚动高
		getScrollTop() {
			var scroll_top = 0;
			if (document.documentElement && document.documentElement.scrollTop) {
				scroll_top = document.documentElement.scrollTop;
			}
			else if (document.body) {
				scroll_top = document.body.scrollTop;
			}
			return scroll_top;
		},
		//窗口高
		getClientHeight: function () {
            var clientHeight = 0;
            if (document.body.clientHeight && document.documentElement.clientHeight) {
                var clientHeight = (document.body.clientHeight < document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
            } else {
                var clientHeight = (document.body.clientHeight > document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
            }
            return clientHeight;
        },
		// 获取参与经销商省市
		getProvince() {
			$.ajax({
				url: window.AJAXURL + "/jetta/index.php?act=dealerservice&op=selectProvinceCity",
				type: 'post',
				contentType: 'application/x-www-form-urlencoded',
				data:JSON.stringify({
					"tenantId":"3",
					"provinceCode":"",
					"cityCode":""
				}),
				success: function(res) {
					var data =JSON.parse(res);
					app.province.data = data.list;
					app.province.index =data.list[0].provinceCode
					app.getCity(app.province.index)
				}
			});
		},
		// 获取城市
		getCity(provinceId) {
			$.ajax({
				url: window.AJAXURL + "jetta/index.php?act=dealerservice&op=selectProvinceCity",
				type: 'post',
				contentType: 'application/x-www-form-urlencoded',
				data:JSON.stringify({
					"tenantId":"3",
					"provinceCode":provinceId,
					"cityCode":""
				}),
				success: function(res) {
					var data =JSON.parse(res);
					app.city.data = data.list;
					app.city.index =data.list[0].cityCode;
					app.getDealer();
				}
			});
		},
		// 获取经销商
		getDealer() {
			var self = this;
			$.ajax({
				url: window.AJAXURL + "/jetta/index.php?act=dealerservice&op=querydealerinfo",
				type: 'post',
				contentType: 'application/x-www-form-urlencoded',
				data:JSON.stringify({
					"tenantId":"3",
					"provinceCode":app.province.index,
					"cityCode":app.city.index
				}),
				success: function(res) {
					var data =JSON.parse(res);
					app.dealer = data.list;
					if( data.list.length>0){
						console.log(data.list[0],1)
						app.form.dealerCode  =  data.list[0].dealerCode;
						app.form.dealerName  =  data.list[0].dealerName;
					}
				}
			});
		},
		changeProvince(){
			this.getCity(this.province.index)
		},
		changeCity(){
			this.getDealer()
		},
		changeDealer(e){
			var hh = app.dealer.filter(function(c,i,a){
				if(c.dealerCode==app.form.dealerCode){
					return c
				}
			})
			this.form.dealerCode = hh[0].dealerCode; 	//获取当前option的id值
			this.form.dealerName  =   hh[0].dealerName;
			console.log('当前id:'+this.form.dealerCode)
			console.log('当前name:'+this.form.dealerName)
		},
		closeFn(){
			this.isShow=false;
			$('body').css({
				'overflow':'auto',
				'position':'static',
				'top':-this.getScrollTop()+'px',
			})
			$(document).scrollTop(this.cacheTop); 
		},
		
		// 提交
		submitFn(){
			var _this = this ;
			if(_this.form.userName==""){
				methods.prompt("请输入您的姓名");
				return false;
			}else if(!methods.phoneVerify(_this.form.mobile)){
				methods.prompt("请输入正确手机号")
				return false;
			}else if(_this.form.verificationCode==""){
				methods.prompt("请输入获取的手机验证码");
				return false;
			}else{
				$.ajax({
					url: window.AJAXURL + "/jetta/index.php?act=testdrive&op=createOrder",
					type: 'post',
					contentType: 'application/x-www-form-urlencoded',
					data:JSON.stringify({
						"token": "",
						"userName": _this.form.userName,
						"mobile": _this.form.mobile,
						"verificationCode": _this.form.verificationCode,  		// 短信验证码
						"vehicleSeriesCode": _this.form.vehicleSeriesCode, 		//车系code
						"appointmentTime": _this.appointmentTime,        		//试乘试驾预约时间(时间戳毫秒)
						"plannedTime": 0, 			   							//计划购车时间(时间戳毫秒)，固定为0
						"source": "08",				   							//媒体渠道-固定值
						"dealerCode": _this.form.dealerCode,					//经销商code
						"dealerName": _this.form.dealerName, 					//经销商中文名称
						"sourceType": "03",  									//渠道类型固定值
					}),
					success: function(res) {
						var data =JSON.parse(res);
						if(data.status=="FAILED"){
							methods.prompt(data.errorMessage)
						}else {
							methods.prompt('提交成功！')
						}
						setTimeout(function(){
							_this.isShow = false;
							_this.form.userName='';
							_this.form.mobile='';
							_this.form.verificationCode='';
							$(".but-sms").prop("disabled", false).html("获取验证码");
							_this.closeFn();
						},2000)
					}
				});
			}
		},
		//获取手机验证码
		butSms(){
			var _this = this;
			var timeOut;
			var timeNum = 60;
			if (!methods.phoneVerify(_this.form.mobile)) {
				methods.prompt("请输入正确手机号");
				return false;
			}
			//请求验证码接口
			$.ajax({
				url: window.AJAXURL + "/jetta/index.php?act=testdrive&op=getVerificationCodeWithLimit",
				type: 'post',
				contentType: 'application/x-www-form-urlencoded',
				data:JSON.stringify({
					"mobile":_this.form.mobile,		//手机号
					"group":"EBO", 					//固定值EBO
					"deviceType":"WEB", 			//固定值WEB
					"deviceId":"1" 					//固定值1
				}),
				success: function(res) {
					var data =JSON.parse(res);
					if(data.status=="FAILED"){
						methods.prompt(data.errorMessage)
					}else {
						$(".but-sms").prop("disabled", true).html(timeNum + "秒后重试");
						timeOut = setInterval(function () {
							timeNum--;
							$(".but-sms").html(timeNum + "秒后重试");
							if (timeNum == 0) {
								clearInterval(timeOut);
								$(".but-sms").prop("disabled", false).html("获取验证码");
								timeNum = 60;
							}
						}, 1000)
					}
				}
			});
		}
	},
	mounted:function(){
		var _this=this;
		_this.getProvince();
		// 弹性位置
		window.onscroll = function(){
			_this.curTop = _this.getScrollTop();
			if(_this.curTop){
				_this.cacheTop = _this.curTop;
			}
		}
		_this.pageHeight = _this.getClientHeight();
		$(window).resize(function () {
            setTimeout(function () {
				_this.pageHeight = _this.getClientHeight();
				console.log(_this.pageHeight)
				$('.popBox .pb').css({
					'top':(_this.pageHeight-612)/2+'px'
				})
			}, 0)
		})
		_this.appointmentTime = new Date().getTime();
	}
})