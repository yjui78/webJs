var data = {a:1}
var vm = new Vue({
    el:'#app',
    data:{
        timeData:[
            {name:'本周',	id:1},
            {name:'本月',	id:2},
            {name:'本季度',	id:3},
            {name:'本年度',	id:4},
        ],
        time:1,//1本周，2本月，3本季度，4本年度
        startTime:'',
        endTime:'',
    },
    created() {
      
      
    },
    methods:{
        tabFn(item,index){
            var self = this;
            self.time=item.id;
            // 周
            if(self.time == 1){
                self.startTime =  dateRangeUtil.getCurrentWeek()[0];
                self.endTime = dateRangeUtil.getCurrentWeek()[1]; 
            }
            // 月
            if(self.time == 2){
                self.startTime = dateRangeUtil.getCurrentMonth()[0];
                self.endTime = dateRangeUtil.getCurrentMonth()[1];
            }
            // 季度
            if(self.time == 3){
                //dateRangeUtil.getCurrentSeason() =>["2020-01-01","2020-03-31"]
                self.startTime = dateRangeUtil.getCurrentSeason()[0];
                self.endTime = dateRangeUtil.getCurrentSeason()[1];
            }
            // 年
            if(self.time == 4){
                self.startTime = dateRangeUtil.getCurrentYear()[0];
                self.endTime = dateRangeUtil.getCurrentYear()[1];
            }
            console.log('startTime:'+self.startTime)
            console.log('endTime:'+self.endTime)
        }
    },
    mounted(){

    }
})