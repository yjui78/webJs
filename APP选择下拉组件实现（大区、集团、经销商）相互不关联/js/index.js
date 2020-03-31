var vm = new Vue({
    el:'#app',
    data:{
        popbox:{
            show:false,
            title:['选择大区','选择集团','选择经销商'],
            index:1	// 大区、集团、经销商；1、2、3
        },
        pos:{
            show:false,
        },
        // 车型
        searchData:{             //筛选项数据，textAlign是<mt-picker>中的语法
            sales:[{values: [],textAlign: 'center',visibleItemCount:10}],
            group:[{values: [],textAlign: 'center'}],
            dealer:[{values: [],textAlign: 'center'}],
        },
        searchCacheData:{       //确定前临时存储
            sales:{},
            group:{},
            dealer:{},
        },
        searchSureData:{        //确定后存储
            sales:{},
            group:{},
            dealer:{},
        },
        //选中的id
        searchId:{
            selZoneId:'',     	//soleZoneId,大区ID
            selGroupId:'',    	//groupId,集团ID
            selDealerId:'',   	//dealerId,经销商ID
        },
        //选中的值
        search:{
            sales:'',
            group:'',
            dealer:'',
        },
    },
    created(){
        var self = this;
        /*
        common.ajax({
            url:'/api/board/statistics/getSaleZone?token=1',
            type:'get',
            data:{
                type:2
            },
        }).then(res => {
            self.searchData.carList[0].values = res.data; 
        })
        */
        //临时数据模拟,大区
        var zoneData = [
            {"id": 24,"zonename": "东区"},
            {"id": 25,"zonename": "南区"},
            {"id": 26,"zonename": "西区"},
            {"id": 27,"zonename": "北区"},
        ];
        // 集团
        var groupData = [
            {id: 12, groupName: "POLY"},
            {id: 11, groupName: "Rundong"},
            {id: 10, groupName: "Sanjianglian"},
            {id: 9, groupName: "Senfeng"},
            {id: 8, groupName: "Shuncheng"},
            {id: 7, groupName: "Sinomach"},
            {id: 6, groupName: "Tianlihe"},
            {id: 5, groupName: "Tianzi"},
            {id: 4, groupName: "Toro"},
            {id: 3, groupName: "Weijie"},
            {id: 2, groupName: "Xuanyu"},
            {id: 1, groupName: "Yishun"},
        ];
        // 经销商
        var dealerData = [
            {id: 1, dealerName: "阿尔法罗密欧"},
            {id: 394, dealerName: "北京保利"},
            {id: 395, dealerName: "20191225联调经销商2"},
            {id: 397, dealerName: "意特汽车销售服务（苏州）有限公司"},
            {id: 400, dealerName: "广西恒骅达汽车销售服务有限公司"},
            {id: 402, dealerName: "尊荣亿方集团沈阳汽车销售有限公司"},
            {id: 403, dealerName: "苏州华瑞德汽车销售服务有限公司"},
            {id: 404, dealerName: "重庆骏庆汽车销售服务有限公司"},
            {id: 409, dealerName: "长沙力天城中汽车销售服务有限公司"},
            {id: 410, dealerName: "南京意特汽车销售服务有限公司"},
            {id: 413, dealerName: "天津凯骐金悦汽车销售服务有限公司"},
            {id: 416, dealerName: "扬州天泰达汽车贸易有限公司"},
            {id: 418, dealerName: "贵阳通意汽车销售服务有限公司"},
            {id: 419, dealerName: "佛山鸿粤晨丰汽车销售服务有限公司"},
            {id: 420, dealerName: "泉州欧驰汽车有限公司"},
            {id: 422, dealerName: "汕头合和定制汽车销售服务有限公司"},
        ];
        // 三个值放slots中,所有列表展示
        self.searchData.sales[0].values = zoneData;
        self.searchData.group[0].values = groupData;
        self.searchData.dealer[0].values = dealerData;
        // 接口没有返回全部，前端加
        var obj1 = { 'id':'', 'zonename':'全部'}
        var obj2 = { 'id':'', 'groupName': "全部"}
        var obj3 = { 'id':'', 'dealerName':'全部'}
        self.searchData.sales[0].values.unshift(obj1);
        self.searchData.group[0].values.unshift(obj2);
        self.searchData.dealer[0].values.unshift(obj3);
    },
    methods:{
        //确定
        popSureFn(){
            var self =  this;
            //判断点击哪个确定按钮self.popbox.index为1、2、3
             //根据索引值对应当前确定的值
             var plan = {
                '1':'sales',
                '2':'group',
                '3':'dealer',
            }
            var plan2 = {
                'sales':'zonename',
                'group':'groupName',
                'dealer':'dealerName'
            }
            var searchId = {
                '1':'selZoneId',
                '2':'selGroupId',
                '3':'selDealerId',
            }
            var name = plan[self.popbox.index];   //sales
            /*
                self.searchSureData[name]是sales当前选择的里边id与name对象
                [plan2[name]]是当前对应的zonename
                是sales['zonename']相当于sales.zonename
            */
            self.searchSureData[name]  = self.searchCacheData[name];    //把临时存储的数据放到确定存储数据里
            
            var idName = searchId[self.popbox.index];                   //页面中当前的id对应name,selZoneId
            console.log( self.searchCacheData[name])
            //每次只存一个值
            for(var item in self.search){
                 self.search[item] = '';
            }
            self.search[name] = self.searchSureData[name][plan2[name]] ;//页面中当前的name
            for(var item in self.searchId){
                self.searchId[item] = '';
            }
            self.searchId[idName] =self.searchCacheData[name].id;
            self.popbox.show = false;
            console.log('当前id:'+self.searchId[idName] )
            console.log('当前name :'+self.search[name] )

        },
         /**
          * 选中筛选区域, @change两个参数picker实例和各slot被选中的值组成的数组
          * valueKey ：传入的对应展示的属性值
          * plan中的zonename对应picker.valueKey
          * plan中的sales对应searchCacheData中的sales
          */
         ValuesChangeFn:function(picker,values){
            var self = this;                                                   //values[0]当前滚动到的对象
            // console.log(picker.valueKey)
            var plan = {
                'zonename':'sales',
                'groupName':'group',
				'dealerName':'dealer', 
            }
            self.searchCacheData[plan[picker.valueKey]] = values[0]           //放到searchCacheData对应的属性值里存储
        },
    },
    mounted(){

    }
    
})