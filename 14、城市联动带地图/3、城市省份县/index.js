var vm = new Vue({
	el:'#app',
	data:{
        pop:{
            show:false,
            tab:1,
            province:[],    // 省份列表
			city:[],        // 城市列表
			provinceId:'',  //选中省份
			cityId:'',      //选中城市
        },
        datainfo:{},                     // 所有数据
        dealerInfo:[],
        lng:config.cityInfo.lng,
        lat:config.cityInfo.lat,
        cityid:config.cityInfo.id,      // 当前城市id
        cityName:config.cityInfo.name,  // 当前城市id
        dealerId:[],
        youhui:0,//优惠or默认
        //表单提交
        form:{
			name:'',
			phone:'',
		},
    },
	created: function () {
        var self = this;
        // 定位
		methods.ajax("Dealer/Index/locate",{},function(res){
			self.cityid = res.data.city.id;
			self.cityName = res.data.city.name;
			self.lng = res.data.lng;
			self.lat = res.data.lat;
            self.pop.provinceId = res.data.province.id;
            // self.pop.provinceId = 110000;
		})
		methods.ajax("Energy/dealer/getEnergyDealerList",{
			id: '152',
			cid: '22',
			lng: '112.73851440',
			lat: '37.69336153',
		},function(res){
            self.datainfo = res.data;
            self.pop.province = res.data.region;
            self.pop.cityId = config.cityInfo.id;
            console.log(self.pop.provinceId)
            var data = res.data.dealer[self.pop.provinceId][config.cityInfo.id];
            self.dealerInfo = [];
            // 多个数组数据放一个里
            for(var item in data){
                for(var el in data[item]){
                    self.dealerInfo.push(data[item][el])
                }
            }
		})
	},
	methods:{
		proviceFn(cid,index){
            var self = this;
            var data = self.datainfo.region.filter(function(item){
                return item.cid;
            })
            self.pop.city = data[index].children;
            self.pop.provinceId = cid;
            self.pop.tab = 2;
        },
        cityFn(cid,name){
            var self = this;
            self.pop.cityId = cid;
            self.pop.show = false;
            self.cityName = name;
            var data = self.datainfo.dealer[self.pop.provinceId][self.pop.cityId];
            self.dealerInfo = [];
            //多个数组数据放一个里
            for(var item in data){
                for(var el in data[item]){
                    self.dealerInfo.push(data[item][el])
                }
            }
        },
        dealerCheckFn(id){
            var self = this;
            // 数组self.dealerId进行赋值，引用类型,同dealer一同变
            var dealer = self.dealerId;
            if(dealer.indexOf(id)>-1){
                dealer.splice(dealer.indexOf(id),1);
            }else if(dealer.length<3){
                dealer.push(id);
            }else {
                methods.prompt("最多只能选择3家经销商");
            }
            console.log(dealer)
            console.log(dealer.length)
        },
        subFn(){
            var self = this;
            if(!self.form.name){
                methods.prompt("请输入您的姓名");
                return false;
            }
            if(!methods.phoneVerify(self.form.phone)){
                methods.prompt("请检查您的手机号输入是否正确")
				return false;
            }
            if(this.dealerId.length==0){
				methods.prompt("请至少选择一家经销商");
				return false;
            };
            if(!$('.mor-box2 input').is(':checked')){
				methods.prompt("请先阅读并同意《个人信息保护声明》");
				return false;
			};
            alert('提交成功！')
        },
        sortFn(type){
            var self = this;
            var data = self.dealerInfo;
            //根据价钱排序
            if(type==1){ //优惠
                var newlist = data.sort(function(a1,a2){
                   var n1 = a1.dealer_price;
                   var n2 = a2.dealer_price;
                   return n1-n2;
                })
                self.dealerInfo = newlist;
            }else {
                var data = self.datainfo.dealer[self.pop.provinceId][self.pop.cityId];
                self.dealerInfo = [];
                //多个数组数据放一个里
                for(var item in data){
                    for(var el in data[item]){
                        self.dealerInfo.push(data[item][el])
                    }
                }
            }
        }
    },
    filters: {
		//保留2位小数点 不四舍五入
		toFixed(value) {
			var toFixedNum = Number(value).toFixed(3);
			var realVal = toFixedNum.substring(0, toFixedNum.toString().length - 1);
			return realVal;
		}
	}
})