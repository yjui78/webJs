var vm = new Vue({
    el:'#main',
    data:{
        carDatainfo:[],       //对应车系数据
        emption_info:[],      //购买首付款详情数据
        emption_type:[],      //租赁购买切签
        leasing_company:[],   //租赁公司
        currIndex:0,  
        clickFlag:'',          //点击标记 
        tabType:'',             //tab标签
        payment:'',             //首付列表
        timeLimit:'',           //租期
        popindex0:'',
        popindex1:'',
        popindex2:'',
        val1:'',
        val2:'',
        val3:'',
        finProduct:'',

    },
    created: function () {
        var self = this;
        this.init();
    },
    methods:{
        init: function () {
            var AJAXURL = 'http://faw-vw.ftms-wechat.com/';
            $.ajax({
                url:AJAXURL+"/Energy/Car/getCarDetails",
                type:"get",
                data:{
                id: 146,
                cid: 23,
                favoured_policy:1,  
                on_sale_vehicle :1, 
                pin:1 , 
                EmptionInfo :1, 
                },
                success: function (res) {
                   //先享后买
                    vm.emption_info = res.data.emption_info;            //先享后买区域
                    vm.emption_type = res.data.emption_info.emption_type;  //租赁切签类型
                    vm.leasing_company = res.data.emption_info.leasing_company;  //租赁公司 
                    //首付
                    var typeid = $('#tabSelect').attr('typeid');
                    vm.payment = res.data.emption_info.programme[typeid].down_payment_ratio;
                    // moneys = res.data.emption_info.programme[typeid].moneys; 
                    vm.timeLimit = res.data.emption_info.programme[typeid].timeLimit; //租期 
                    
                    
                    var moneysList = res.data.emption_info.programme[typeid].moneys;
                    vm.moneys(moneysList)
                },
                error: function(err){
                    console.log(err)
                }
            })
        },
        clousx(){
            $('.first-pop').hide();
        },
        moneys(data){
            setTimeout(function(){
                var payment = $('#tab1').attr('payment');
                var timeLimit = $('#tab1').attr('timeLimit');
                var compeny = $('#tab1').attr('compeny');
                var rentInfo =(data[timeLimit])[payment];
                vm.finProduct = rentInfo.finProduct;
            },200)
        },
        showList(index){
            $('#one-pop').show();
            vm.clickFlag = index;
        },
        tab(index,curid){
            vm.currIndex = index;
            $('#tabSelect').attr('typeid',curid);
            this.init();
            vm.val1 = vm.payment[0];
            vm.val2= vm.timeLimit[0];
            vm.val3 = '';
            vm.popindex0=0;
            vm.popindex1=0;
            vm.popindex2 = '';
            $('#tab1').attr({
                'payment':vm.val1,
                "timeLimit":vm.val2,
                "compeny":vm.val3
            });
        },
        selitem1(e,index,popindx){
            console.log(e.target.innerHTML)
            if(popindx===0){
                vm.popindex0 = index;
                vm.val1 = e.target.innerHTML;
                $('#tab1').attr('payment',e.target.innerHTML);
            }else if(popindx===1){
                vm.popindex1 = index;
                vm.val2 = e.target.innerHTML;
                $('#tab1').attr('timeLimit',e.target.innerHTML)
            }else {
                vm.popindex2 = index;
                vm.val3 = e.target.innerHTML;
                $('#tab1').attr('compeny',e.target.innerHTML)
            }
            $('#one-pop').hide();
            // $('#fShare li').eq(popindx)
            this.init();
        }
    },
    computed:{
        priceVal(){
          return parseFloat(this.carDatainfo.price/10000).toFixed(2)
        }
    },
    mounted: function() {
        setTimeout(function(){
            vm.val1 = vm.payment[0];
            vm.val2= vm.timeLimit[0];
            vm.val3 = '';
            vm.popindex0=vm.popindex1=0;
            vm.popindex2='';
            $('#tab1').attr({
                'payment':vm.val1,
                "timeLimit":vm.val2,
                "compeny":vm.val3
            });
        },100)
        
    }
})