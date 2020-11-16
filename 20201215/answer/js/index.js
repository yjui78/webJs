var app = new Vue({
  el: '#app',
  data: {
    isWap: false,
    isStart: true,
    rule: false,

    pop: {
      isShow: false,
      isRuleShow: false
    }
  },
  created: function() {
    var _this = this
    //活动状态
    // methods.ajax(
    //   '/Activity/NewCarTeam/getCondition',
    //   {},
    //   function(res) {
    //     _this.isStart = true
    //   },
    //   function(error) {
    //     if (error.code == '405') {
    //       console.log('没开始')
    //       _this.isStart = false
    //     }
    //   }
    // )
  },
  methods: {
    // 活动规则
    ruleFn() {},
    // 返回上页
    gobackFn() {
      location.href = 'https://baidu.com'
    },
    //进入互动
    enterFn() {
      var _this = this
      if (_this.isStart) {
        location.href = 'answer.html'
      }
    },
    //判断是否是移动设备打开
    Isweixin() {
      var _this = this
      var userAgentInfo = navigator.userAgent.toLowerCase()
      var returnUrl = _this.chineseTransfer(location.href)
      if (userAgentInfo.match(/MicroMessenger/i) == 'micromessenger') {
        _this.openid = methods.getQueryString('openid')
        if (!_this.openid) {
          location.href =
            '/Activity/NewCarTeam/wechatLogin?callbackurl=' + returnUrl
        } else {
          console.log(_this.openid, '有openid')
        }
      }
    },
    // 转义
    chineseTransfer(value) {
      return encodeURIComponent(encodeURIComponent(value))
    },
    //网页
    wap() {
      var _this = this
      _this.isWap = true
    }
  },
  mounted: function() {
    var _this = this
    //网页中判断登录状态
    var userAgentInfo = navigator.userAgent.toLowerCase()
    if (userAgentInfo.match(/MicroMessenger/i) != 'micromessenger') {
      // _this.wap()
    } else {
      _this.Isweixin()
    }
  }
})
