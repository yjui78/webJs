define(function (require, exports, module) {
  require('./config/menu.js');
  var DEV = require('dev')//sea.config.js有路径./config/dev
  var common = require("common")
  // 也是对应js
  var router = require("./config/route")
  var app = new Vue({
    router: router,
    components: {
      'el-menu': Vue.menu,
    },
    data() {
      return {
        path: '',
        tableData: [{ name: 1, sex: '男' }, { name: 2, sex: '女' }],
        routerData: [
          { path: '/kanban', name: '数据看板', iconName: 'iconkanban' },
          {
            path: '/appointment', name: '预约记录', iconName: 'iconyyjl',
            children: [
              {
                path: 'a',
                name: '记录a',
              },
              {
                path: 'b',
                name: '记录b',

              }
            ]
          },
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
        // console.log(this.path)
        Vue.router.goPath(this.path)
      },
    },
    watch: {
      // 时刻监听路由
      $route() {
        console.log(this.$route.path, ',这是$route')
      }
    }
  }).$mount('#app');

  router.goPath = function (path) {
    window.location.hash = "#" + path;
  };

  Vue.router = router;
});