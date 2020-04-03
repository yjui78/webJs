var data = {a:1}
var vm = new Vue({
    el:'#app',
    data:{
         popbox:{
            show:false,
            title:['开始时间','截止时间'],
            index:-1		// 开始时间、结束时间1、2
        },
        timeObj:{
            current:'',
            startTime:'',
            endTime:'',
            isClicked1:false,
            isClicked2:false,
            pickerVisible1:'',
            pickerVisible2:'',
            showTime:false,
        }
    },
    created() {
        var self = this;
      
    },
    methods:{
        timeFn(){
            var self = this;
            self.popbox.show=true;
            self.popbox.index=1;
            self.timeObj.current=0;
            self.tabTime(0);
        },
        //时间tab
        tabTime(index){
            var self = this;
            self.timeObj.current = index;
            self.popbox.index = (index == 0)?1:2;
        },
        // 确认start
        startConfirmFn(value){
            var self = this;
            self.popbox.index = 2;
            self.timeObj.current = 1;
            self.timeObj.startTime = self.getNowFormatDate(value);
            console.log("startTime："+self.timeObj.startTime)
        },
        // 确认end
        endConfirmFn(value){
            var self = this;
            self.timeObj.endTime = self.getNowFormatDate(value);
            if(!self.timeObj.startTime){
                common.prompt('请选择开始时间',1000);
            }else {
                console.log("endTime:"+self.timeObj.endTime)
                var compareTime = self.dateCompare(self.timeObj.startTime,self.timeObj.endTime)
                console.log(compareTime)
                if(compareTime == -1){
                    common.prompt('开始时间不可大于结束时间,请重新选择！');
				    return false;
                }else if(compareTime == 0){
                    common.prompt('时间相同，请重新选择！');
                    return false;
                }else {
                    self.timeObj.showTime = true;
                    self.popbox.show=false;
                }
            }
            
            // console.log(comp)
        },
        // 取消start
        cancel1Fn(){

        },
        // 取消end
        cancel2Fn(){

        },
        getNowFormatDate(value){
            //value:Mon May 06 2019 04:05:00 GMT+0800 (中国标准时间)
            var CurrentDate = "";
            var Year  = value.getFullYear();
            var Month = value.getMonth()+1;
            var Day = value.getDate();
            var Hours = value.getHours();
            var Minutes = value.getMinutes();
            var MonthVal = (Month >= 10)?Month:'0'+Month;
            var DayVal = (Day >= 10)?Day:'0'+Day;
            var HoursVal = (Hours >= 10)?Hours:'0'+Hours;
            var MinutesVal = (Minutes >= 10)?Minutes:'0'+Minutes;
            CurrentDate = Year +'-'+MonthVal+'-'+DayVal+' '+HoursVal+':'+MinutesVal+':00';
            return CurrentDate;
        },
        /*
            比较两个字符串，比较的是转换之后的:
            self.dateCompare("2019-03-01 05:23","2019-03-01 02:34")
        */
        dateCompare(startString, endString){
            var startTimeString = new Date(startString); 
            var endTimeString = new Date(endString); 
            var startTime = startTimeString.getTime();
            var endTime = endTimeString.getTime();
            if(endTime > startTime){
                // return '开始 < 结束';
                return 1;
            }else if(startTime == endTime){
                // return '相等';
                return 0;
            }else{
                // return '开始 > 结束';
                return  -1
            }
        },
    },
    mounted(){

    }
})