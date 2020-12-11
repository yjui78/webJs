define(function (require, exports, module) {
  var router = new VueRouter({
    // SeaJS会在html页面打开时通过静态分析一次性记载所有需要的js文件，如果想要某个js文件在用到时才下载，可以使用require.async
    routes: [
      {
        pageTitle: '数据看板',
        path: '/kanban',
        component(resolve) {
          require.async(['../../page/js/kanban.js'], resolve)
        }
      },
      {
        pageTitle: '预约记录',
        path: '/appointment',
        component(resolve) {
          require.async(['../../page/js/appointment.js'], resolve)
        },
        children: [
          {
            pageTitle: '记录a',
            path: 'a',
            name: 'itema',
            component(resolve) {
              require.async(['../../page/js/appointment/a.js'], resolve)
            }
          },
          {
            pageTitle: '记录b',
            path: 'b',
            name: 'itemb',
            component(resolve) {
              require.async(['../../page/js/appointment/b.js'], resolve)
            }
          }
        ]
      },
      {
        pageTitle: '接待记录',
        path: '/receive',
        component(resolve) {
          require.async(['../../page/js/receive.js'], resolve)
        }
      },
      {
        pageTitle: '评价记录',
        path: '/evaluate',
        component(resolve) {
          require.async(['../../page/js/evaluate.js'], resolve)
        }
      },
      {
        pageTitle: '黑名单记录',
        path: '/blacklist',
        component(resolve) {
          require.async(['../../page/js/blacklist.js'], resolve)
        }
      },
      {
        pageTitle: '顾问管理',
        path: '/cmanagement',
        component(resolve) {
          require.async(['../../page/js/cmanagement.js'], resolve)
        }
      }]
  })
  module.exports = router
})