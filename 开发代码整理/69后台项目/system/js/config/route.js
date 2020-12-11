define(function (require, exports, module) {
  var router = new VueRouter({
    routes: [{
      pageTitle: '概览',
      path: '/overview',
      component(resolve) {
        require.async(['../../page/js/overview.js'], resolve)
      }
    },
    {
      pageTitle: '洞察',
      path: '/insight',
      component(resolve) {
        require.async(['../../page/js/insight.js'], resolve)
      }
    }, {
      pageTitle: '统计',
      path: '/statis',
      component(resolve) {
        require.async(['../../page/js/statis.js'], resolve)
      }
    }, {
      pageTitle: '榜单',
      path: '/ranklist',
      component(resolve) {
        require.async(['../../page/js/ranklist.js'], resolve)
      }
    }]
  })
  module.exports = router
});