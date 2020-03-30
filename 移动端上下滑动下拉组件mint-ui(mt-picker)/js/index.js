var vm = new Vue({
    el:'#app',
    data:{
        popbox:{
            show:false,
        },
        // 车型
        searchData:{//筛选项数据
            carList:[[{values: [],textAlign: 'left'}]],
        },
        searchCacheData:{},
        searchId:{
            configid:'',  
        },
        searchName:'',
    },
    created(){
        var self = this;
        /*
        common.ajax({
            url:'/factoryMsgAndNotice/carTypeList',
            type:'post',
            data:{
                token:1
            },
        }).then(res => {
            self.searchData.carList[0].values = res.data; 
        })
        */
        //无数据请求临时数据
        var data = [
            {configName: "2017款 Giulia 2.0T 280HP", cartypeid: "620-DR1-0-01"},
            {configName: "2017款 Giulia 2.0T 280HP 豪华运动版", cartypeid: "620-DR1-0-02"},
            {configName: "2017款 Giulia 2.0T 280HP 豪华版", cartypeid: "620-PR1-0-03"},
            {configName: "2017款 Giulia 2.0T 280HP Milano限量版", cartypeid: "620-PR1-0-MLN"},
            {configName: "2018款 Stelvio 2.0T 200HP 豪华版", cartypeid: "630-PA9-0-04"},
            {configName: "2018款 Stelvio 2.0T 200HP 精英版", cartypeid: "630-GA9-0-05"},
            {configName: "2017款 Stelvio 2.0T 200HP Base", cartypeid: "630-GA0-0-06"},
            {configName: "2017款 Stelvio 2.0T 200HP Super", cartypeid: "630-PA0-0-07"},
            {configName: "2017款 Stelvio 2.0T 280HP Super+", cartypeid: "630-TA1-0-08"},
            {configName: "2017款 Giulia 2.0T 200HP 精英版", cartypeid: "620-GR9-0-09"},
            {configName: "2017款 Giulia 2.0T 200HP 豪华版", cartypeid: "620-PR9-0-10"},
            {configName: "2017款 全新Stelvio 2.9T V6 510HP 四叶草版", cartypeid: "630-QAV-0-11"},
            {configName: "2019款 Giulia 2.9T 510HP NRING纽博格林限量版", cartypeid: "620-MRZ-0-12"}, 
        ];
        self.searchData.carList[0].values =  data;


    },
    methods:{
        // 确定
        popSureFn(){
            var self =  this;
            console.log(self.searchCacheData)
            self.popbox.show = false;
            self.searchName = self.searchCacheData.configName;
            console.log(self.searchCacheData.configName)
            console.log(self.searchCacheData.cartypeid)
        },
         //选中筛选区域
         ValuesChangeFn:function(index,value){
            var self = this;
            console.log(value[0])    //当前滚动到的对象值
            // self.searchData  = value[0];
            self.searchCacheData =  value[0]
        },
    },
    mounted(){

    }
    
})