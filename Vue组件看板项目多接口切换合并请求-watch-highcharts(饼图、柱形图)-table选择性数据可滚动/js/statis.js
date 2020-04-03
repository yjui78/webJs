define(function(require,exports,module){
    require('css/statis.css')
    require('../component/js/statisTotal');
    require('../component/js/table');
    // require('js/这页需要的JS')
    var common = require('common')
    var add = Vue.extend({
        // js对应的页面
        template:require('statis.html'),
        components:{
            'vue-table':Vue.table,
            'vue-statisTotal': Vue.statisTotal,
        },
        data(){
            return {
                tab:{
					data:[
						{key:'keliu',name:'客流分析'},
						{key:'xiansuo',name:'线索分析'},
						{key:'qianke',name:'潜客分析'},
						{key:'genjin',name:'跟进分析'},
						{key:'dingdan',name:'订单分析'},
					],
					now:'keliu',
                },
                totalData:{},
                tableData:[],
                //表格中展示的标题，父组件
                tableTitle:{
                    'keliu':['时间','无效客流','有效客流'],
					'xiansuo':['时间','线索量','有效线索','有效线索转化','线索潜客转化','线索订单转化','线索成交转化'],
                    'qianke':['时间','潜客量','潜客订单转化率','潜客成交转化率'],
                    'genjin':['时间','2小时跟进量','2小时跟进率'],
                    'dingdan':['时间','订单数量','订单成交转化率'],
                },
                pieData:[],// 饼图

            }
        },
        activated(){
            var self = this;
            self.datainfoFn();
        },
        methods: {
            classTabFn(item){
                var self = this;
                self.tab.now =  item.key;
                self.datainfoFn();
            },
            datainfoFn(){
                var self = this;
                // 多数据接口合并,不同接口传不同参数，单独判断放data中,这样可以减少代码冗余
				var urlData = {
					'keliu':'/board/statistical/selectStatisticalData?token=1',
					'xiansuo':'/board/statistics/clues/selectClues?token=1',        //不传时间
					'qianke':'/board/statistics/selectPotentialByParams?token=1',
					'genjin':'/board/statistics/selectFollowByParams?token=1',
					'dingdan':'/board/statistics/order/selectOrder?token=1',
                }
                var data = {}
                if(self.tab.now !='xiansuo'){ //xiansuo、chengjiao不传时间，其他都传
                    data.startTime = '2020-03-30';
                    data.endTime = '2020-04-05';
                }
                if(self.tab.now == 'xiansuo'){
                    data.type=1;
                    data.userId = 732;
                }
                if(self.tab.now == 'dingdan'||self.tab.now == 'chengjiao' || self.tab.now == 'tousu'){
                    data.userId = 732;
                }
                //调研分析 加检索条件
				if(this.tab.now == 'diaoyan'){
					data.surveyType = 0;
				}
                /*
                //调取接口数据，以防接口无法使用，用下边临时数据,
                common.ajax({
					url:urlData[self.tab.now],
					data:data,
					type:'get',
				}).then(function(res){
                    self.totalData = res.data.basicsData||{};
                })
               */
                /*
                    调取临时数据,这是后台返回数据的正确格式
                    column是表格，
                    basicsData是上边基本数据
                    pieChart是饼图
                */
                basic = {
                    'keliu':{
                       column:[
                            {notValidCount: 1, time: "2020-03-30", validCount: 1},
                            {notValidCount: 4, time: "2020-03-31", validCount: 1},
                            {notValidCount: 7, time: "2020-04-01", validCount: 2},
                            {notValidCount: 6, time: "2020-04-02", validCount: 2},
                            {notValidCount: 2, time: "2020-04-03", validCount: 2},
                            {notValidCount: 6, time: "2020-04-04", validCount: 2},
                            {notValidCount: 5, time: "2020-04-05", validCount: 3},
                       ] ,
                       basicsData:{
                            notValidCount: 0,
                            customerToClue: "40.0",
                            customerFlowCount: 5,
                            validToCustomerFlow: "100.0",
                            firstCustomer: 4,
                            validCount: 5,
                            customerToOrder: "0.0",
                       },
                       pieChart:[
                            {name: "品牌合作1", y: 1},
                            {name: "银行渠道2", y: 1},
                            {name: "其他3", y: 1},
                            {name: "路过展厅4", y: 1},
                            {name: "汽车之家5", y: 1},
                       ]
                    },
                    'xiansuo':{
                        column:[
                            {cjzhl: "0", time: "2020-03-30", clues_yx_Total: 3, yxzhl: "0", qkzhl: 5, ddzhl: "0", cluesTotal: 0},
                            {cjzhl: "0", time: "2020-03-31", clues_yx_Total: 0, yxzhl: "0", qkzhl: 6, ddzhl: "0", cluesTotal: 4},
                            {cjzhl: "0", time: "2020-04-01", clues_yx_Total: 6, yxzhl: "0", qkzhl: 5, ddzhl: "0", cluesTotal: 8},
                       ] ,
                       basicsData:{
                            cjzhl: "0",
                            clues_yx_Total: 25,
                            yxzhl: "96.2",
                            qkzhl: "38.5",
                            ddzhl: "23.1",
                            cluesTotal: 26,
                       },
                       pieChart:[
                            {name: "官网-爱卡", y: 1},
                            {name: "银行渠道", y: 1},
                            {name: "经销商展厅电话", y: 2},
                            {name: "路过展厅", y: 6},
                            {name: "朋友推荐", y: 2},
                            {name: "户外广告", y: 2},
                       ]
                    },
                    'qianke':{
                        column:[
                            {time: "2020-03-31", potentialCount: 1, potentialToOrder: 0, potentialToDeal: 0, firstOnlin: 0,secondArrive: 0,secondOnlin: 0, channelName: "",channelCount: 0},
                            {time: "2020-04-01", potentialCount: 6, potentialToOrder: 0, potentialToDeal: 0, firstOnlin: 0,secondArrive: 0,secondOnlin: 0, channelName: "",channelCount: 0},
                            {time: "2020-04-02", potentialCount: 33, potentialToOrder: 0, potentialToDeal: 0, firstOnlin: 0,secondArrive: 0,secondOnlin: 0, channelName: "",channelCount: 0}
                       ] ,
                       basicsData:{
                            time: "",
                            potentialCount: 1,
                            potentialToOrder: 0,
                            potentialToDeal: 0,
                            firstOnlin: 0,
                            secondArrive: 1,
                            secondOnlin: 0,
                            channelName: "",
                            channelCount: 0,
                       },
                       pieChart:[
                            {name: "经销商-经销商市场活动-品牌合作", y: 1}
                       ]
                    },
                    'genjin':{
                        column:[
                            {time: "2020-03-30",validCount: 0,notValidCount: 0,sixHourFollow: 2, sixHourFollowRatio: 6,cluesCount: 0,newCluesCount: 0,
                            validCluesCount: 0,dealCluesCount: 0,failCluesCount: 0,firstArriveCount: 0,secondArriveCount: 0,orderAllCount: 0,dealOrderCount: 0,
                            surveyCount: 0,customerCount: 0,potentialCount: 0,ownerCount: 0,csicount: 0,ssicount: 0},
                            {time: "2020-04-01",validCount: 0,notValidCount: 0,sixHourFollow: 4, sixHourFollowRatio: 55,cluesCount: 0,newCluesCount: 0,
                            validCluesCount: 0,dealCluesCount: 0,failCluesCount: 0,firstArriveCount: 0,secondArriveCount: 0,orderAllCount: 0,dealOrderCount: 0,
                            surveyCount: 0,customerCount: 0,potentialCount: 0,ownerCount: 0,csicount: 0,ssicount: 0}
                        ],
                        basicsData:null,
                        pieChart: [
                            {name: "name1", y: 1000},
                            {name: "name2", y: 50}
                        ]
                    },
                    'dingdan':{
                        column:[
                            {orderNum: 2, order_cj: 2, time: "2020-03-30"},
                            {orderNum: 33, order_cj: 3, time: "2020-03-31"},
                            {orderNum: 0, order_cj: 0, time: "2020-04-01"},
                            {orderNum: 54, order_cj: 4, time: "2020-04-02"},
                            {orderNum: 3, order_cj: 0, time: "2020-04-03"},
                            {orderNum: 4, order_cj: 22, time: "2020-04-04"},
                        ] ,
                        basicsData:{
                            orderNum: 11,
                            order_cj: 22
                        },
                        pieChart: [
                            {name: "name3", y: 100},
                            {name: "name4", y: 50}
                        ]   
                    },
                }
                self.totalData = basic[self.tab.now].basicsData||{};//上边基本信息
                self.tableData = basic[self.tab.now].column||[];    //柱状图与表格
                //饼图值name,y
                if(basic[self.tab.now].pieChart){
                    if(basic[self.tab.now].pieChart.length>0){
                        self.pieData = basic[self.tab.now].pieChart;
                        basic[self.tab.now].pieChart[0].sliced = true;
                        basic[self.tab.now].pieChart[0].selected = true;
                        self.pieChartFn(basic[self.tab.now].pieChart);
                    }else {
                        self.pieData=[];
                    }
                }
                // 柱状图
                if(self.tableData.length>0){
                     self.chartDataFilter(self.tableData)
                }
            },
            // 柱状图
            /**
             * 基本柱状图： type: 'column'
             * 一个日期上多个柱状数据series
             *  xAxis: {
                    categories: ['一月','二月'],
                },
                series: [
                    {name: '东京',data: [49, 71]}, 
                    {name: '纽约',data: [39, 71]}, 
                    {name: '伦敦',data: [65, 59]}, 
                    {name: '柏林',data: [60, 47]}
                ]
             */
            // chart图标数据整理
            chartDataFilter(data){
                var self = this;
                // console.log(data,'实际数据')
                var self = this;
                var xAxis = []
                var series = []
                var dataNew = {};
                // 拆分data,data[0]第一个对象中的notValidCount,time,validCount
                //el是每个对象字段名,因为data[0] keliu三个字段所有length为3
                for(var el in data[0]){
                    dataNew[el]=[]
                    //el每个分类字段名
                    data.forEach(function(item,index){
                        dataNew[el].push(item[el]);
                        // item[el] 第个列里值都提出来
                    })
                }
                xAxis = dataNew.time;
                // dataNew值格式
                /**
                 * {
                 *      notValidCount: (7) [1, 4, 7, 6, 0, 6, 5],
                 *      time:["2020-03-30", "2020-03-31", "2020-04-01", "2020-04-02", "2020-04-03", "2020-04-04", "2020-04-05"]
                        validCount:[0, 0, 0, 0, 0, 0, 0]
                 * }
                 */
                console.log(dataNew,'希望的数据')
                // console.log(xAxis)//最终的数据
                //柱状图上name与key值在此定义,key值与接口数据对应上,name是柱形图name
                var tableinfo = {
                    'keliu':[
						{key:'notValidCount',name:'无效客流'},
						{key:'validCount',name:'有效客流'},
                    ],
                    'xiansuo':[
						{key:'cluesTotal',name:'线索量'},
						{key:'clues_yx_Total',name:'有效线索'},
						{key:'yxzhl',name:'有效线索转化'},
						{key:'qkzhl',name:'线索潜客转化'},
						{key:'ddzhl',name:'线索订单转化'},
						{key:'cjzhl',name:'线索成交转化'},
                    ],
                    'qianke':[
						{key:'potentialCount',name:'潜客量'},
						{key:'potentialToOrder',name:'潜客订单转化率'},
						{key:'potentialToDeal',name:'潜客到成交转化'},
                    ],
                    'genjin':[
						{key:'sixHourFollow',name:'2小时跟进量'},
						{key:'sixHourFollowRatio',name:'2小时跟进率'},
                    ],
                    'dingdan':[
						{key:'orderNum',name:'订单数量'},
						{key:'order_cj',name:'订单成交转化率'},
                    ],
                }
                //当前对应标签展示的字段整理成这样的
                var series = [];
                var originData = tableinfo[self.tab.now];
                // console.log(self.tableData,'之前的数据')
                /**dataNew已经把所需要的了 h
                 * series: [
                    {name: '东京',data: [49, 71]}, 
                    {name: '纽约',data: [39, 71]}, 
                    {name: '伦敦',data: [65, 59]}, 
                    {name: '柏林',data: [60, 47]}
                ]
                 */
                var colors = ['#A10D30','#E98353','#F2C65C','#EC808D','#53B3E9'];
                // for...in最后多出个函数，所有这里用forEach
                originData.forEach(function(item,index){
                    var type = 'column';
                    series.push({
                        type:type,
                        name:item.name,
                        color:colors[index],
                        data:dataNew[item.key]
                    })
                })
                console.log(xAxis,series,1)
                self.chartFn(xAxis,series)
            },
            chartFn(xAxis,series){
                Highcharts.chart('statis__chart', {
					chart: {
						type: 'column'
					},
					title: {
						text: '标题 ',
						style: {
							color: '#fff',      //字体颜色
							"fontSize": "34px",   //字体大小
							fontWeight: 'bold'
						}
					},
					xAxis: {
						// categories: ['9-1', '9-2', '9-3', '9-4', '9-5', '9-6', '9-7'],
						categories:xAxis,
					},
					yAxis: {
						title: {
							text: '',
						}
					},
					plotOptions: {
						series: {
							label: {
									connectorAllowed: false
							},
							// pointStart: 2010
						}
					},
					credits: {
						enabled: false//不显示LOGO
					},
					legend: {
						align: 'right',
						verticalAlign: 'top',
						y: 10,
						floating: true,
						borderWidth: 0
					},
					// 去除右下角highchart.com
					credits: {
						enabled:false
					},
					// 去除右上角图标
					exporting: {
						enabled:false
					},
					series:series,
				});
            },
            // 饼图
			pieChartFn:function(data){
				var chart = {
					plotBackgroundColor: null,
					plotBorderWidth: null,
					plotShadow: false
				};
				var title = {
				   text: ''   
				};      
				var tooltip = {
				   pointFormat: '<b>{point.percentage:.1f}%</b>'
				};
				var plotOptions = {
				   pie: {
					  allowPointSelect: true,
                      cursor: 'pointer',
                      //颜色以定义的优先
					  colors :['#A3072D','#F3C752','#EE7F8C','#4EB2EB','#434348','#90ed7d','#8085e9','#434348','#434348'], 
					  dataLabels: {
						 enabled: false           
					  },
					  showInLegend: true
				   }
				};
				var series= [{
				   type: 'pie',
				   name: '',
				   data:data
				}];     
				   
				var json = {};   
				json.chart = chart; 
				json.title = title;     
				json.tooltip = tooltip;  
				json.series = series;
				json.plotOptions = plotOptions;
				$('#source__chart').highcharts(json); 
			}
           
        }
    })
    module.exports = add
})