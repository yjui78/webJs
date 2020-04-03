define(function(require,exports,module){
    var common = require('../../js/common');
    var temp = require('../statisTotal.html');
    var box =  Vue.extend({
        template:temp,
        props:['list','key'],
        data:function(){
            return {
                listData:[], //data中自定义
                //展示标题的都在这里定义声明，对应key里有数组中取值
                configData:{
                    'keliu':[
                        {name:'客流量',key:'customerFlowCount',val:'',style:'width:25%',unit:''},
                        {name:'无效客流',key:'notValidCount',val:'',style:'width:25%',unit:''},
                        {name:'有效客流',key:'validCount',val:'',style:'width:24%',unit:''},
                        {name:'有效客流占比',key:'validToCustomerFlow',val:'',style:'width:26%',unit:'%'},
                        {name:'首次到店留联系方式',key:'firstCustomer',val:'',style:'width:40%',unit:''},
                        {name:'客流线索转化',key:'customerToClue',val:'',style:'width:30%',unit:'%'},
                        {name:'客流订单转化',key:'customerToOrder',val:'',style:'width:30%',unit:'%'},
                    ],
                    'xiansuo':[
                        {name:'线索量',key:'cluesTotal',val:'',unit:''},
                        {name:'有效线索',key:'clues_yx_Total',val:'',unit:''},
                        {name:'有效线索转化',key:'yxzhl',val:'',unit:'%'},
                        {name:'线索潜客转化',key:'qkzhl',val:'',unit:'%'},
                        {name:'线索订单转化',key:'ddzhl',val:'',unit:'%'},
                        {name:'线索成交转化',key:'cjzhl',val:'',unit:'%'},
                    ],
                    'qianke':[
                        {name:'潜客量',key:'potentialCount',val:''},
                        {name:'潜客订单转化',key:'potentialToOrder',val:'',unit:'%'},
                        {name:'潜客成交转化',key:'potentialToDeal',val:'',unit:'%'},
                        {name:'首次线上邀约到店',key:'firstOnlin',val:''},
                        {name:'再次展厅邀约到店',key:'secondArrive',val:''},
                        {name:'再次线上邀约到店',key:'secondOnlin',val:''},
                    ],
                    'dingdan':[
                        {name:'订单量',key:'orderNum',val:''},
                        {name:'订单成交转化',key:'order_cj',val:'',unit:'%'},
                    ],
                    'kehu':[
                        {name:'潜客量',key:'potentialCount',val:''},
                        {name:'车主量',key:'ownerCount',val:'',unit:'%'},
                    ],
                    'genjin':[],
                },
                listCatch:'',   //存储props中list
            }
        },
        activated:function(){
          
        },
        mounted() {
            var self =  this;
            // 第一次默认第一个
            self.listData = self.configData[self.key]
        },
        methods:{
            tapFn(){
                var self = this;
                //props中list里的val赋值给自定义仅需展示listData中字段
                //for..in不没length时不会报错，普通for循环会报错
                for(var el in this.listData){
                    self.listData[el].val = self.listCatch[self.listData[el].key];
                    // console.log(this.listData[el].key)
                }
            }
        },
        watch:{
            'list':function(){
                var self = this;
               //父组件传来接口数据,接口传来数据字段》=本页用到的字段 
               if(Object.values(self.listCatch).length>0){
                 
               }
               self.listCatch = self.list;
               //每次调取一次数据同步
               self.tapFn()
            },
            'key':function(){
                var self = this;
                self.listData = self.configData[self.key];
                self.tapFn();


            }
        }
    });
    Vue.statisTotal = box;
})