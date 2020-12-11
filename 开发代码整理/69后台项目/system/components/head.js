(function (vue) {
  var template = `<div class="header">
                    <h1 class="logo"><span class="text">后台管理系统</span>
                    <div class="left_open"><i title="展开左侧栏" class="iconfont">&#xe699;</i>
                    </div>
                    </h1>
                    <div class="setting">
                      <div class="user">
                          <img src="images/uimg.png"><span class="f-username">admin	</span>
                      </div>
                      <a href="javascript:;" class="user-out"><i class="fa fa-power-off"></i>退出</a>
                    </div>
                  </div>`;
  var head = vue.extend({
    template: template,
    data: function () {
      return {}
    },
    props: [],
    created: function () { },
    methods: {

    }
  })
  vue.headIndex = head;
})(Vue)