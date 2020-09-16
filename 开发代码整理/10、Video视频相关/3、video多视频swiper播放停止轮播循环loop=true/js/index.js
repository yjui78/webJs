/**
 *  1、在实际工作中经常会遇到swiper轮播多个视频，视频停止播放时2s自动轮播autoplay并且循环轮播loop
 *  2、loop:true下问题：
 *      (1)slides前后会复制若干个slide，成一个环路，不会复制绑定在dom上@click事件,
 *          解决方法：不要在html绑定@click事件监听不到 使用swiper的onclick回调函数即：$(".video").on("click",function(){...})，
 *      (2)loop:true下能监听到slideChangeTransitionEnd：只是this.activeIndex值不在是数据的index值，
 *      on: {
 *          slideChangeTransitionEnd: function(){
 *              console.log(this.activeIndex)
 *          },
 *      },
 *      (3)loop:true下当前选中slide带有class：.swiper-slide-active 做相关操作在这个class下处理
 *      (4)监听视频播放状态
 *          $(".swiper-slide-active video").on('play',function(){
                //播放状态
			});  
			$(".swiper-slide-active video").on('pause',function(){
                //暂停状态
            }); 

        (5)控制轮播状态
            停止自动轮播：_this.swiper1.autoplay.stop();
            启动自动轮播：_this.swiper1.autoplay.start();
 *      
 * 3、loop:false下问题：
 *      可以在html上绑定@click事件，但避免出问题最好在JS里onclick回调方法
 *      on: {
 *          slideChangeTransitionEnd: function(){
 *              console.log(this.activeIndex)
 *          },
 *      },
 */
var vm = new Vue({
    el:'#app',
    data:{
        // 视频data
        videoData:[
			{
				image_cover: "http://mall.faw-vw.com/shop-m/page/activity/2020-0606/images/playImg1.png",
				videoPlay: "http://mall.faw-vw.com/shop-m/page/activity/2020-0606/images/video1.mp4",
			},
			{
				image_cover: "http://mall.faw-vw.com/shop-m/page/activity/2020-0606/images/playImg2.jpg",
				videoPlay: "http://mall.faw-vw.com/shop-m/page/activity/2020-0606/images/video2.mp4",
			}
        ],
		swiper1:''
    },
    created(){
    },
    mounted: function () {
		var _this = this;
		_this.swiper1 = new Swiper('.swiper-container',{
			observer: true,                 //解决刷新不能滑动问题
			observeParents: true,           //解决刷新不能滑动问题
			observeSlideChildren:true,
			slidesPerView: 'auto',
			autoHeight: true,
			initialSlide: 0,
			loop: true,
			autoplay: true,
			on: {
				// 监听轮播：loop: true时this.activeIndex不在是数据索引，而是复制多个的slide个数值，
				// loop去掉时 this.activeIndex是数据索引,slide个数是数据length
				slideChangeTransitionEnd: function(){
					console.log(this.activeIndex)
					// 轮播时所有视频停止播放， 封面图显示，视频隐藏
					var videoLength=$(".videos").length;
					for(var i=0; i<videoLength; i++){
						$(".videos").eq(i)[0].pause();
					}
					$(".video-cover,.videoImg").show();
					$(".video-box").hide();
				},  
			},
			pagination: {
				el: '.swiper-pagination',
				clickable: true,
			},
        });
        // 视频播放事件创建 loop为true时会复制多个slide,无法监听元素索引值，不要在html上@click，要绑定class用js实现
        $(".video-cover").on("click",function(){
            _this.playVideo();
        })
    },
    methods:{
        playVideo: function () {
			var _this = this;
            _this.swiper1.autoplay.stop();
			$(".swiper-slide-active .video-cover,.swiper-slide-active .videoImg").hide();
			$(".swiper-slide-active .video-box").show();
			// 点击哪个视频哪个播放
            $(".swiper-slide-active .video-box .videos")[0].play();
            //监听当前视频播放状态
			$(".swiper-slide-active .video-box .videos").on('play',function(){
				_this.swiper1.autoplay.stop()
			});  
			$(".swiper-slide-active .video-box .videos").on('pause',function(){
				_this.swiper1.autoplay.start()
			});
		},
    },
})

