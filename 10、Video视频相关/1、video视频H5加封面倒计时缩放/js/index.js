/**
 * jQuery对象:[video#video, selector: ""] 
 * 
 * DOM对象:  
 * 指： html代码元素<video id="video" src="./images/video.mp4"></video> 
 * 如：$("#video").get(0);$("#video")[0];  document.getElementById("video")
 * 
 * DOM对象转成jQuery对象:只需要用$()把DOM对象包装起来,就可以获得一个jQuery对象了。$(DOM对象)
 * 如：var v=document.getElementById("video");   //DOM对象,html代码元素
    var $v=$(v); //jQuery对象
    转换后，就可以任意使用jQuery的方法了。
    通过以上方法，可以任意的相互转换jQuery对象和DOM对象。需要再强调注意的是：DOM对象才能使用DOM中的方法，jQuery对象是不可以用DOM中的方法。
*/

var vm = new Vue({
    el:'#app',
    data:{
        cout:2,                 //倒计时
        vCover:true,            //视频封面
        vplay:true,             //视频播放ico
        vShade :false,          //视频播放遮罩
        timer:null,
        zoomx:false,            //视频缩放&x显隐
        scale:true,             //缩放比例,1放大，0缩小
        isShow :true
    },
    methods:{
        // 视频播放
        playVideo(){
            var _this = this;
            $('#video').get(0).play();
            _this.timer = setInterval(()=> {
                _this.cout--;
                if(_this.cout<0){
                    clearInterval(_this.timer);
                    _this.cout = 0;
                    _this.zoomx = true;
                    _this.scale = true;

                }
               console.log(_this.cout,'cout')
            },1000)
            _this.vCover = false;
            _this.vplay = false;
            _this.vShade = true;
        },
        //控制缩放
        zoomFn(){
            var _this = this;
            //缩小
            if(_this.scale){    
                _this.scale = false;
            //放大
            }else {             
                _this.scale = true;
            }
        },
        closeFn(){
            var _this = this;
            _this.isShow = false;
            $('#video')[0].pause();
        }
    },
    created(){
        var _this = this;
    },
    watch:{
        'scale':function(){
            console.log(this.scale,'变了')
        }
    },
    mounted(){
        var _this = this;
    }
})