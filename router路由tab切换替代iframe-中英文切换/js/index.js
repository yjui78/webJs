define(function(require, exports, module) {
    // sea.config.js中引入的dev
    var DEV = require('dev');
    // 引入一些公共的方法封装
    var common =  require('common');
    // 引入路由js
    var router = require("../config/route")

    var app =  new Vue({
        router: router,
        data() {
            return {
                path:'',
				routerData:[
					{path:'/overview',name:'概览',nameEN:'Overview'},
					{path:'/insight',name:'销售漏斗',nameEN:'Insight'},
					{path:'/statis',name:'分析',nameEN:'Statistics'},
					{path:'/ranklist',name:'榜单',nameEN:'Rank list'},
                ],
                language:localStorage.getItem('language')||'EN',
                token : common.getQueryString('token'),
                identity : common.getQueryString('identity'),

            }
        },
        created:function(){
            var self =this;
            // 中英文切换，默认中文本地存储EN
            if(!localStorage.getItem('language')){
                localStorage.setItem('language','EN');
            }
            // 便于带上数据参数
            if(self.token){
				localStorage.setItem('token',self.token)
			}
			if(self.identity){
				localStorage.setItem('identity',self.identity)
            }
        },
        mounted() {
			setTimeout(()=>{
				this.path = this.$route.path
			},300)
        },
        methods:{
            tabFn(path) {
                var self =this;
                self.path = path+'?token='+self.token+'&identity='+self.identity;
                // this.path = path;
				Vue.router.goPath(self.path)
            },
            languageFn:function(){
                var self = this;
				if(self.language == 'CN'){
					localStorage.setItem('language','EN')
				}else{
					localStorage.setItem('language','CN')
				}
				location.reload();
			}
        }

    }).$mount('#app');
    router.goPath = function(path){
        window.location.hash = '#' + path;
    }
    Vue.router = router;
  });