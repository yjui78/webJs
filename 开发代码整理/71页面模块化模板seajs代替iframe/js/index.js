define(function (require, exports, module) {
  // var menu = require("menu");
  // var util = require("./js/util")
  var DEV = require('dev')//sea.config.js有路径./config/dev
  var common = require("common")
  // 也是对应js
  var router = require("./config/route")
  var app = new Vue({
    router: router,
    data() {
      return {
        path: '',
        routerData: [
          { path: '/kanban', name: '数据看板', iconName: 'iconkanban' },
          { path: '/appointment', name: '预约记录', iconName: 'iconyyjl' },
          { path: '/receive', name: '接待记录', iconName: 'iconjiedaidengji' },
          { path: '/evaluate', name: '评价记录', iconName: 'iconpingjiajilu' },
          { path: '/blacklist', name: '黑名单记录', iconName: 'iconheimingdan' },
          { path: '/cmanagement', name: '顾问管理', iconName: 'iconweibiaoti-1' },
        ],
      }
    },
    created: function () {
    },
    mounted() {
      setTimeout(() => {
        this.path = this.$route.path
      }, 300)
    },
    methods: {
      tabFn(path) {
        this.path = path;
        Vue.router.goPath(this.path)
      },
    },
  }).$mount('#app');

  router.goPath = function (path) {
    window.location.hash = "#" + path;
  };

  Vue.router = router;
});