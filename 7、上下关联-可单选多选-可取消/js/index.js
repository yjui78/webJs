/**
 *实现需求：
 上下关联，选择区域zoneId对应找到机构zoneId相同的值，可返选操作

 * 
 * 
 * 
 */
var vm = new Vue({
    el:'#app',
    data:{
        saleZone:[],                // 按区域
        ZoneIds:[],                 // 按区域id
        organiz:[],                 // 按机构
        organizIds:[],              // 按机构id
    },
    created(){
        var self = this;
        /*
        common.ajax({
            url:'/factoryMsgAndNotice/selectPushObject',
            data:{
                userId:25,
                token:111
            },
            type:'post',
        }).then(function(res){
            self.saleZone = res.data.saleZone;
            self.organiz = res.data.organiz;
        })
       */
        //避免接口不通，模拟数据
        var data = {
                saleZone :[
                    {zoneId: "24", zoneName: "东区", type: "zone"},
                    {zoneId: "26", zoneName: "南区", type: "zone"},
                    {zoneId: "27", zoneName: "西区", type: "zone"},
                    {zoneId: "25", zoneName: "北区", type: "zone"},
                ],
                organiz:[
                    {dealerName: "阿尔法", dealerId: "1", zoneId: "24"},
                    {dealerName: "联调经销商1", dealerId: "394", zoneId: "24"},
                    {dealerName: "联调经销商2", dealerId: "395", zoneId: "24"},
                    {dealerName: "苏州意特", dealerId: "397", zoneId: "24"},
                    {dealerName: "长沙力天", dealerId: "409", zoneId: "25"},
                    {dealerName: "扬州天泰达", dealerId: "416", zoneId: "25"},
                    {dealerName: "贵阳通意", dealerId: "418", zoneId: "25"},
                    {dealerName: "佛山鸿粤", dealerId: "419", zoneId: "26"},
                    {dealerName: "泉州欧驰", dealerId: "420", zoneId: "26"},
                    {dealerName: "汕头合和", dealerId: "422", zoneId: "26"},
                    {dealerName: "上海亚欧", dealerId: "427", zoneId: "26"},
                    {dealerName: "北京海派", dealerId: "439", zoneId: "27"},
                    {dealerName: "陕西骏东", dealerId: "440", zoneId: "27"},
                    {dealerName: "深圳骏佳", dealerId: "441", zoneId: "27"},
                    {dealerName: "北京和谐", dealerId: "442", zoneId: "27"},
                    {dealerName: "北京豪骏行", dealerId: "488", zoneId: ""}

                ],
        };
        self.saleZone = data.saleZone;
        self.organiz = data.organiz;

    },
    methods:{
        //part1
        changeZone(item){
            var self = this;
            var indx = self.ZoneIds.indexOf(item.zoneId);
           if(indx>-1){
                self.flag =true;
                self.ZoneIds.splice(indx,1);
           }else {
                self.flag =false;
                self.ZoneIds.push(item.zoneId);
           }
           self.filterData(item.zoneId);
           console.log(self.ZoneIds,'ZoneIds',self.ZoneIds.length)
           console.log(self.organizIds,'organizIds',self.organizIds.length)
        },
        filterData(zoneIdVal){
            var self = this;
            self.organiz.filter(function(e){
                if(e.zoneId == zoneIdVal){
                    var oIndx = self.organizIds.indexOf(e.dealerId);
                    if(oIndx>-1 &&self.flag==true){// 与changeZone关联self.flag;区域id与机构id能对上时都删除;都没有时添加
                        self.organizIds.splice(oIndx,1)
                    }
                    if(oIndx==-1&&self.flag==false){
                        self.organizIds.push(e.dealerId)
                    }
                }
            })
        },
        //part2
        changeOrganiz(item){
            var self = this;
            var oIndx = self.organizIds.indexOf(item.dealerId);
            if(oIndx>-1){
                self.organizIds.splice(oIndx,1);
            }else {
                self.organizIds.push(item.dealerId)
            }
            console.log(self.ZoneIds,'ZoneIds',self.ZoneIds.length)
            console.log(self.organizIds,'organizIds',self.organizIds.length)
        },
        //part3
        changeFactory(){

        },
        //part4
        changeDept(){

        }
       
    },
    mounted(){

    }
    
})