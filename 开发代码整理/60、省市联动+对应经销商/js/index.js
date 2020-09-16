var AJAXURL = 'http://mall.faw-vw.com/';
var app = new Vue({
	el: "#app",
	data: {
		province: {
			index: 0,     //省id ，默认第一个  
			data: [] 	  //数据
		},
		city: {
			index: 0,    //城市id ，默认第一个  
			data: []     //数据
		},
		dealer:[],
		curDealer_id:'',
	},
	
	mounted: function () {
		var _this = this;
		_this.getProvince();
	},
	methods:{
		// 获取参与经销商省市，默认展示第一条数据
		getProvince() {
			var _this = this;
			var data = [
				{id: "110000", name: "北京市"},
				{id: "120000", name: "天津市"},
				{id: "130000", name: "河北省"},
				{id: "140000", name: "山西省"},
				{id: "150000", name: "内蒙古自治区"},
				{id: "210000", name: "辽宁省"},
				{id: "220000", name: "吉林省"},
				{id: "230000", name: "黑龙江省"},
				{id: "310000", name: "上海市"},
				{id: "320000", name: "江苏省"},
				{id: "330000", name: "浙江省"},
				{id: "340000", name: "安徽省"},
				{id: "350000", name: "福建省"},
				{id: "360000", name: "江西省"},
				{id: "370000", name: "山东省"},
				{id: "410000", name: "河南省"},
				{id: "420000", name: "湖北省"},
				{id: "430000", name: "湖南省"},
				{id: "440000", name: "广东省"},
				{id: "450000", name: "广西壮族自治区"},
				{id: "460000", name: "海南省"},
				{id: "500000", name: "重庆市"},
				{id: "510000", name: "四川省"},
				{id: "520000", name: "贵州省"},
				{id: "530000", name: "云南省"},
				{id: "540000", name: "西藏自治区"},
				{id: "610000", name: "陕西省"},
				{id: "620000", name: "甘肃省"},
				{id: "630000", name: "青海省"},
				{id: "640000", name: "宁夏回族自治区"},
				{id: "650000", name: "新疆维吾尔自治区"},
			];
			_this.province.data =data;
			_this.province.index = data[0].id;
			_this.getCity(_this.province.index);
		},
		getCity(provinceId) {
			var _this = this;
			// 返回数据格式
			var data = {
				children:[
					{id: "230100", name: "哈尔滨市"},
					{id: "230200", name: "齐齐哈尔市"},
					{id: "230300", name: "鸡西市"},
					{id: "230400", name: "鹤岗市"},
					{id: "230500", name: "双鸭山市"},
					{id: "230600", name: "大庆市"},
					{id: "230700", name: "伊春市"},
					{id: "230800", name: "佳木斯市"},
					{id: "230900", name: "七台河市"},
					{id: "231000", name: "牡丹江市"},
					{id: "231100", name: "黑河市"},
					{id: "231200", name: "绥化市"},
					{id: "232700", name: "大兴安岭地区"},
				]
			}
			$.ajax({
				url: window.AJAXURL + "/Dealer/Index/getChildRegions",
				type: 'post',
				contentType: 'application/x-www-form-urlencoded',
				data: {
					id: provinceId,
				},
				success: function(res) {
					_this.city.data = res.data.children;
					_this.city.index = res.data.children[0].id   //默认展示
					_this.getDealer();
				}
			});
		},
		getDealer() {
			var _this = this;
			// 返回数据格式
			var data = {
				vehicles:[
					{name: "山西志国星赛车发展有限公司",dealer_id: "224"},
					{name: "山西志国星赛车发展有限公司",dealer_id: "224"},
				]
			}
			$.ajax({
				url: window.AJAXURL + "/Dealer/NewCar/oneOfNewCarList",
				type: 'post',
				contentType: 'application/x-www-form-urlencoded',
				data: {
					vehicle_id:184,
					city_id: _this.city.index,
					sort_field:1,
					no_page:1,
				},
				success: function(res) {
					var vehicles = res.data.vehicles;
					_this.dealer = vehicles;
					if(vehicles.length>0){
						_this.curDealer_id  = vehicles[0].dealer_id;
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
			var _this = this;
			var hh = app.dealer.filter(function(c,i,a){
				if(c.dealer_id==_this.curDealer_id){
					return c
				}
			})
			console.log(_this.curDealer_id,1)
			console.log(hh,2)
			_this.curDealer_id = hh[0].dealer_id //获取当前option的id值
			console.log('当前id:'+_this.curDealer_id)
		},
		
	},

})