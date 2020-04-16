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

            }
        },
        created:function(){
            var self =this
        },
        mounted() {
			setTimeout(()=>{
				this.path = this.$route.path
			},300)
        },
        methods:{
            tabFn(path) {
                var self =this;
                self.path = path;
				Vue.router.goPath(self.path)
            },
        }

    }).$mount('#app');
    router.goPath = function(path){
        window.location.hash = '#' + path;
    }
    Vue.router = router;
  });