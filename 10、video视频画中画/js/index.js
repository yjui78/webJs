var vm = new Vue({
    el:'#app',
    data:{
       //1、VIEDO  2020/04/08视频
       tab_cur:0,
       tab_nav:[],
       videoPop:{
           countdown:10,
           timer:null,
           bofang:false,
           countShow:true,
           videoData:'',
           icos:[],
           winHeight:'',
           videoHeight:'',
           topup:'',
       },
       isShow:false,
    },
    created(){
        var self = this;
        //2、VIEDO ----start-----
        //调取暂时注释
        setTimeout(function(){
           self.isShow = true;
           self.videoFn();
        },1000)
    
        /*methods.ajax('/Dealer/Index/getHomeTopVideo',{
           type:1
        },function(res){
            self.videoPop.videoData = res.data;
            if(res.data.ico){
               self.videoPop.icos = res.data.ico;
            }
        })*/
        // 承接上边 临时数据
        var data = {
            "title": "【新迈腾家族】领创来袭",
            "url": "http://www.baidu.com/",
            "video": "/Public/Uploads/Picture/videos/2019/11/954163666459425985371278167774.mp4",
            "thumb": "/Public/Uploads/Picture/images/2020/04/385421296181156896975696176729.jpg",
            "ico": [
                {
                    "title": "融资租赁",
                    "img": "http://www.baidu.com/video/1.ico",
                    "url": "http://www.baidu.com/",
                },
                {
                    "title": "直销",
                    "img": "http://www.baidu.com/video/2.ico",
                    "url": "http://www.baidu.com/",
                }
            ]
        }
        self.videoPop.videoData = data;
        if(data.ico){
            self.videoPop.icos = data.ico;
        }
        //end
        

    },
    methods:{
       //4、VIEDO--start---
       getClientHeight(){
            var clientHeight=0;
            if(document.body.clientHeight&&document.documentElement.clientHeight){
                var clientHeight = (document.body.clientHeight<document.documentElement.clientHeight)?document.body.clientHeight:document.documentElement.clientHeight;
            }else{
                var clientHeight = (document.body.clientHeight>document.documentElement.clientHeight)?document.body.clientHeight:document.documentElement.clientHeight;
            }
            return clientHeight;
        },
        videoFn(){
            var self = this;
            clearInterval(self.videoPop.timer);
            self.videoPop.timer = setInterval(()=>{
                self.videoPop.countdown--;
                if(self.videoPop.countdown<0){
                    clearInterval(self.videoPop.timer);
                    self.videoPop.bofang = true;
                    self.videoPop.countdown = 0;
                    self.videoPop.countShow =  false;
                    var video = document.getElementById("video-bg");
                    var pipButton = document.getElementById('pipButton');
                    // video.play();
                    video.setAttribute('autoplay','autoplay')

        
                    //画中画
                    if ('pictureInPictureEnabled' in document) {
                        console.log(document)
                        console.log('pictureInPictureEnabled')
                        pipButton.classList.add('hzhIco')
                        pipButton.disabled = false;
                        pipButton.addEventListener('click', () => {
                            video.requestPictureInPicture();
                        })
                    }
                    video.addEventListener('enterpictureinpicture', () => {
                        self.isShow = false;
                    });
                    video.addEventListener('leavepictureinpicture', () => {
                        self.isShow = true;
                    });
                }
            },1000)
        },
        closeVideoFn(){
            var self = this;
            var video = document.getElementById("video-bg");
            video.pause();
            self.isShow = false;
        },
        tabFn(index){
            var self = this;
            self.tab_cur = index;
        },
    },
    watch: {
        isShow(newVal,oldval) {
            var self = this;
            var vpage  =  document.getElementById('vpage');
            if(newVal){
                self.videoPop.winHeight = self.getClientHeight();
                setTimeout(function(){
                    self.videoPop.videoHeight = vpage.offsetHeight;
                    self.videoPop.topup = (self.videoPop.winHeight-self.videoPop.videoHeight)/2-60
                },0)
            }
        }
    },
    //end
    mounted(){
        //3、VIEDO
        var self = this;
        $(window).resize(function () {
            var vpage  =  document.getElementById('vpage');
            setTimeout(function(){
                self.videoPop.winHeight = self.getClientHeight();
                self.videoPop.videoHeight = vpage.offsetHeight;
                self.videoPop.topup = (self.videoPop.winHeight-self.videoPop.videoHeight)/2-60
            },0)
        })
    }
})