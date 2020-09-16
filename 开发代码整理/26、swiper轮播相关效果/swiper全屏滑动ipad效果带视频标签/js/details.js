// public.js
AJAXURL = 'https://faw-vw.t.ftms-weixin.com/';
location.origin = 'https://faw-vw.t.ftms-weixin.com/';
var methods = {
	init: (function () {
		$("body").append('<div class="loading"><div class="loading-img"><div><span></span><span></span><span></span></span></div></div></div></div>');
    })(),
	//ajax
    ajax: function (url, params, callback, errorCallBack, offLoading) {
        if (offLoading != 'off') {
            $(".loading").show()
        }
     
        $.ajax({
            url: AJAXURL + url,
            type: "post",
            dateType: 'json',
            data: params,
            success: function (res) {
                $(".loading").hide();
                //返回状态处理
                if (res.code == 200) {
                    if (callback) {
                        callback(res)
                    }
                }
                else {
                    if (errorCallBack) {
                        errorCallBack(res)
                    } else {
                        methods.prompt(res.msg);
                    }
                }
            },
            error: function (err) {

            }
        })
    },
}

Vue.component('template-swiper',{
    props:['fromfather'],
    data(){
        return {
            lightdata1:this.fromfather
        }
    },
    template:`#tabs-list-t`,
    methods:{
        closeHandle(){
            this.$emit('close-click');
        }
    }
})

//当前页内容
var vm = new Vue({
	el:'#app',
	data:{
        navList: [{name: "头图", isShow: true, index: 0}],
        showIndex: false,
        isBlue: false,
        navIndex: 0,
        s360img:'',
        AJAXURL:'',
        ligitdata:'',
        isPop:false,
        imgList:[],
        headImg:'',
        ipda_title:'',
        videoDataList:'',
        currentIndex:'',
    },
    created:function(){
        $(".floor").height($(window).height());
    },
	mounted:function(){
        var self = this;
        self.getCartInfo();
	},
	methods:{
		getCartInfo(){
			var self = this;
			var obj = {
                id: 120,
                cid: 16,
                city_id: 110100,
                need: 1,
                show_source:3,
            };
            methods.ajax('ipda/index/ipdaSimpleCar',obj,function(res){
                var res = {
                    data:{
                        thumb_360:[
                            {
                                ipad_image_url: "https://mall.faw-vw.com/Public/Uploads/Picture/images/2019/10/198826552859469766629691335675.png",
                                ipda_title: "360°看车",
                            }
                        ],
                        thumb_void:[
                            {
                                image_url: "https://mall.faw-vw.com//Public/Uploads/Picture/images/2019/10/174165122253472811435189238371.png",
                                ipad_image_url: "https://mall.faw-vw.com//Public/Uploads/Picture/images/2019/10/557663762688982611768578675376.png",
                                video_url: "https://mall.faw-vw.com//Public/Uploads/Picture/videos/2019/10/159781741511914374994848522618.mp4",
                            },
                            {
                                image_url: "https://mall.faw-vw.com//Public/Uploads/Picture/images/2019/10/174165122253472811435189238371.png",
                                ipad_image_url: "https://mall.faw-vw.com//Public/Uploads/Picture/images/2019/10/527868111362415623638318516346.png",
                                video_url: "https://mall.faw-vw.com/Public/Uploads/Picture/videos/2019/10/197294888588399864924753312677.mp4",
                            }
                        ],
                        light:[
                            {
                                id:"240",
                                cid:"29",
                                name:"外观",
                                title:"以灵光，让先锋再进化",
                                sub_name:"",
                                description:"先锋之驱，源自灵光乍现",
                                img:[
                                   {
                                        thumb: "https://mall.faw-vw.com//Public/Uploads/Picture/images/2020/04/688332128549363191746328526222.jpg",
                                        title: "外观11",
                                   },
                                   {
                                        thumb: "https://mall.faw-vw.com//Public/Uploads/Picture/images/2020/04/529984765656798272638328771577.jpg",
                                        title: "外观22",
                                        
                                   },
                                   {
                                        thumb: "https://mall.faw-vw.com//Public/Uploads/Picture/images/2020/04/366272242631247517493644548369.jpg",
                                        title: "外观333",
                                   }
                                ]
                            },
                            {
                                description: "目之所及的格调，匹配宏大的格局",
                                name: "内饰",
                                thumb: "https://mall.faw-vw.com//Public/Uploads/Picture/images/2020/04/786166263797699835625182989485.jpg",
                                title: "以精致，为格局添格调",
                                img:[
                                   {
                                        thumb: "https://mall.faw-vw.com//Public/Uploads/Picture/images/2020/04/688332128549363191746328526222.jpg",
                                        title: "内饰11",
                                   },
                                   {
                                        thumb: "https://mall.faw-vw.com//Public/Uploads/Picture/images/2020/04/529984765656798272638328771577.jpg",
                                        title: "内饰222",
                                   },
                                   {
                                        thumb: "https://mall.faw-vw.com//Public/Uploads/Picture/images/2020/04/366272242631247517493644548369.jpg",
                                        title: "内饰33",
                                   }
                                ]
                            },
                            {
                                cid: "29",
                                description: "目之所及的格调，匹配宏大的格局",
                                id: "241",
                                name: "动力",
                                thumb: "https://mall.faw-vw.com//Public/Uploads/Picture/images/2020/04/786166263797699835625182989485.jpg",
                                title: "动力t",
                                img:[
                                   {
                                        thumb: "https://mall.faw-vw.com//Public/Uploads/Picture/images/2020/04/688332128549363191746328526222.jpg",
                                        title: "动力11", 
                                   },
                                   {
                                        thumb: "https://mall.faw-vw.com//Public/Uploads/Picture/images/2020/04/529984765656798272638328771577.jpg",
                                        title: "动力2",
                                   },
                                   {
                                        thumb: "https://mall.faw-vw.com//Public/Uploads/Picture/images/2020/04/366272242631247517493644548369.jpg",
                                        title: "动力3",
                                   }
                                ]
                            },
                            {
                                description: "让不可逾越 止于探岳",
                                name: "头图",
                                thumb: "https://mall.faw-vw.com/Public/Uploads/Picture/images/2019/10/437286361136716546692879721931.png",
                                title: "",
                                video_url: "https://mall.faw-vw.com//Public/Uploads/Picture/videos/2019/10/791194279382183513199642775374.mp4",
                            }
                        ]
                    }
                }
                self.simpleInfo = res.data;
              

                for(var j=0;j<self.simpleInfo.light.length;j++){
                    var itemLight = self.simpleInfo.light[j];
                    // 如果有某条数据放在前端设定好的指定index位置，与后台返回顺序无关
                  
                    if(itemLight.name=='头图'){
                        self.headImg = itemLight.thumb;
                    }else if(itemLight.name=='外观'){
                        if(itemLight.img){
                            // 了解更多所有可展示的数据放一个大的数组中imgList
                            self.hasSwiper(itemLight.name,itemLight.img);//标题，与图列表
                        }
                        self.navList.push({name:'外观',description:itemLight.description,isShow:true,index:2})
                    }else if (itemLight.name == "内饰") {
                        if(itemLight.img){
                            self.hasSwiper(itemLight.name,itemLight.img);
                        }
                        self.navList.push({name: "内饰", isShow: true, index: 3});
                    }
                    else if (itemLight.name == "动力") {
                        if(itemLight.img){
                            self.hasSwiper(itemLight.name,itemLight.img);
                        }
                        self.navList.push({name: "动力", isShow: true, index: 4});
                    }
                    else if (itemLight.name == "安全") {
                        if(itemLight.img){
                            self.hasSwiper(itemLight.name,itemLight.img);
                        }
                        self.navList.push({name: "安全", isShow: true, index: 5});
                    }
                    else if (itemLight.name == "科技") {
                        if(itemLight.img){
                            self.hasSwiper(itemLight.name,itemLight.img);
                        }
                        self.navList.push({name: "科技", isShow: true, index: 6});
                    }
                 
                 }
                //固定的
                 self.navList.push({name: "车型配置", isShow: true, index: 7});
                
                //2
                if(res.data.thumb_360.length>0){
                    self.navList.splice(1,0,{name:'360看车',isShow:true,index:1});
                    var item = res.data.thumb_360[0];
                    self.s360img = item.ipad_image_url;
                    self.ipda_title = item.ipda_title;
                }
                if (res.data.thumb_void.length> 0) {
                    var videoData = res.data.thumb_void;
                    console.log(videoData.length)
                    self.videoDataList = videoData
                    for (var j = 0; j < videoData.length; j++) {
                        var item = videoData[j];
                        self.videoUrl = item.video_url;
                        self.videoImg = item.ipad_image_url;
                    }
                    self.navList.push({name: "视频鉴赏", isShow: true, index: 8});
                }
                var swiper1;
                var direction ='vertical';
                if(document.getElementsByTagName('html')[0].getAttribute('class')=='landscape'){
                    direction ='vertical';
                }else {
                    direction ='horizontal';
                }
                setTimeout(function(){
                    var swiperIndex = sessionStorage.getItem('swiperIndex') ? sessionStorage.getItem('swiperIndex') : 0,
                    initSwiper = {
                        observer: true,                 //解决刷新不能滑动问题
                        observeParents: true,           //解决刷新不能滑动问题
                        observeSlideChildren:true,
                        slidesPerView: 'auto',
                        direction: 'vertical',
                        autoHeight: true,
                        initialSlide: 0,
                        on: {
                            slideChangeTransitionEnd: function () {
                                console.log(this.activeIndex)
                                if (this.activeIndex == 0) {
                                    self.showIndex = false;
                                    $('.component__transparent').addClass('scroll')
                                }
                                else {
                                    self.showIndex = true;
                                    $('.component__transparent').removeClass('scroll')
                                }
                                var item = self.navList[this.activeIndex].index;
                                self.navIndex = this.activeIndex;
                                if (item == 1 ) {
                                    self.isBlue = true;
                                }
                                else {
                                    self.isBlue = false;
                                }
                            },  
                        },
                    }; 
                    swiper1 = new Swiper('.swiper-container', initSwiper);
                    swiper1.slideToLoop(0, 1000, false);                        //切换到第一个slide，速度为1秒
                    var swiperSon = new Swiper('.swiper-container-video',{
                        pagination: {
                            el: '.video-pagination',
                            clickable: true,
                        },
                    });
                },10)
                var timer = setInterval(function () {
                    var o = document.getElementsByClassName('swiper-wrapper')[0];
                    var h = o.clientHeight || o.offsetHeight;
                    if (h > 3) {
                        var slideIndex = 0;
                        // 返回定位屏幕
                        if(document.querySelector('#details').getAttribute('returnToPage')){
                            slideIndex = localStorage.getItem('returnIndex');
                            swiper1.slideToLoop(slideIndex, 0, false);
                        }
                        if(slideIndex>0){
                            self.isCur = false;
                            self.isCur2 = true;
                            $('.component__transparent').addClass('scroll')
                        }
                        var nameVal;
                        if($('#details').attr('nameVal')){
                                nameVal = $('#details').attr('nameVal');
                        }else {
                            nameVal ='头图';
                        }
                        swiper1.slideToLoop(slideIndex, 0, false);
                        clearInterval(timer);
                    }
                }, 100)
           })
        },
        more(name,index){
            var self = this;
            self.isPop = true;
            console.log(self.imgList)
            self.ligitdata = self.imgList.filter(function(item){
                return (item.name==name)
            })
            console.log(self.ligitdata)
            var tabSwiper = {};
            setTimeout(function(){
                for(var i=0;i<self.ligitdata[0].img.length;i++){
                    tabSwiper['s'+1] = new Swiper('.tabs-swiper'+i,{
                        width: window.innerWidth,
                        pagination:{
                            el: '.tabs-swiper' + i+ '-pagination',
                        },
                        autoplay: false,
                        loop: true,	 		//为 true循环
                        autoplay: false,  	//为 true自动播放到下一张
                        init: true,  		//为true自动执行，不用调用
                        disableOnInteraction: false,
                    })
                }
            },100)
        },
        // 切屏名,了解更多swiper图img列表，
        hasSwiper(swiperName,imgs){
            var self =this;
            var obj = {};
            obj.name = swiperName;
            obj.img = imgs; 
            self.imgList.push(obj);
        },
        playVideo: function (index) {
            var self = this;
            console.log(index)
            self.currentIndex = index;
            var video = document.getElementById("video"+index);
            video.play();
            // 调出全屏展示
            // vm.launchFullscreen(document.getElementById('video'+index)); 
            $('.dialog'+index).show();
            // document.getElementById("dialog"+index).style.display='block';
            this.isDialog = true;
        },
        closeDialog: function (index) {
            var self = this;
            self.currentIndex =index;
            var video = document.getElementById("video"+index);
            $('.dialog'+index).hide();
            video.pause();
            this.isDialog = false;
        }, 

	}
})