var vm = new Vue({
    el:'#app',
    data:{
        city_hots:[],
        city_all:[],
    },
    created(){
        var self = this;
        /*
        methods.ajax('/index.php/usedcar/city/ProvincialCity',{},function(res){
            console.log(res)
            self.city_hots = res.data.city_hots;
            self.city_all = res.data.city_all;
        }) 
        */
        // 临时数据模拟
        var data = {
            city_hots:[
                {cid: "110100", name: "北京市", initial: "B"},
                {cid: "310100", name: "上海市", initial: "S"},
                {cid: "440100", name: "广州市", initial: "G"},
                {cid: "210100", name: "沈阳市", initial: "S"},
                {cid: "330100", name: "杭州市", initial: "H"},
                {cid: "440300", name: "深圳市", initial: "S"},
                {cid: "120100", name: "天津市", initial: "T"},
                {cid: "320100", name: "南京市", initial: "N"},
            ],
            city_all:{
                A:[
                    {cid: "340800", name: "安庆市",initial: "A"},
                    {cid: "610900", name: "安康市",initial: "A"},
                    {cid: "410500", name: "安阳市",initial: "A"},
                    {cid: "520400", name: "安顺市",initial: "A"},
                    {cid: "652900", name: "阿克苏地区",initial: "A"},
                    {cid: "654300", name: "阿勒泰地区",initial: "A"},
                    {cid: "513200", name: "阿坝藏族羌族自治州",initial: "A"},
                    {cid: "152900", name: "阿拉善盟",initial: "A"},
                    {cid: "659002", name: "阿拉尔市",initial: "A"},
                    {cid: "542500", name: "阿里地区",initial: "A"},
                ],
                B:[
                    {cid: "341600", name: "亳州市",initial: "B"},
                    {cid: "130600", name: "保定市",initial: "B"},
                    {cid: "530500", name: "保山市",initial: "B"},
                    {cid: "150200", name: "包头市",initial: "B"},
                    {cid: "110100", name: "北京市",initial: "B"},
                    {cid: "450500", name: "北海市",initial: "B"},
                    {cid: "652700", name: "博尔塔拉蒙古自治州",initial: "B"},
                    {cid: "610300", name: "宝鸡市",initial: "B"},
                    {cid: "511900", name: "巴中市",initial: "B"},
                    {cid: "150800", name: "巴彦淖尔市",initial: "B"},
                    {cid: "652800", name: "巴音郭楞蒙古自治州",initial: "B"},
                    {cid: "210500", name: "本溪市",initial: "B"},
                    {cid: "520500", name: "毕节市",initial: "B"},
                    {cid: "371600", name: "滨州市",initial: "B"},
                ],
                C:[
                    {cid: "451400", name: "崇左市",initial: "C"},
                    {cid: "320400", name: "常州市",initial: "C"},
                    {cid: "430700", name: "常德市",initial: "C"},
                    {cid: "510100", name: "成都市",initial: "C"},
                    {cid: "130800", name: "承德市",initial: "C"},
                ],
                D:[
                    {cid: "441900", name: "东莞市",initial: "D"},
                    {cid: "370500", name: "东营市",initial: "D"},
                    {cid: "210600", name: "丹东市",initial: "D"},
                    {cid: "232700", name: "大兴安岭地区",initial: "D"},
                    {cid: "140200", name: "大同市",initial: "D"},
                    {cid: "230600", name: "大庆市",initial: "D"},
                    {cid: "532900", name: "大理白族自治州",initial: "D"},
                ],
                E:[
                    {cid: "422800", name: "恩施土家族苗族自治州",initial: "E"},
                    {cid: "150600", name: "鄂尔多斯市",initial: "E"},
                    {cid: "420700", name: "鄂州市",initial: "E"},
                ],
                F:[
                    {cid: "210400", name: "抚顺市",initial: "F"},
                    {cid: "350100", name: "福州市",initial: "F"},
                    {cid: "210900", name: "阜新市",initial: "F"},
                    {cid: "341200", name: "阜阳市",initial: "F"},
                ],
                G:[
                    {cid: "640400", name: "固原市",initial: "G"},
                    {cid: "510800", name: "广元市",initial: "G"},
                    {cid: "511600", name: "广安市",initial: "G"},
                    {cid: "440100", name: "广州市",initial: "G"},
                ],
                
            }
        };

        self.city_hots = data.city_hots;
        self.city_all = data.city_all;

    },
    methods:{
        scrollTop(e){
            var self = this;
            var s = e.target.innerHTML;
            $("html,body").scrollTop($('#' + s).offset().top-$("#header").height());
        }
    }

})