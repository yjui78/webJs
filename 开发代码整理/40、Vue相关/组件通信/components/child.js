(function(vue){
  var template = `<div><p>{{message}}</p><input type='button' value='子组件按钮' @click='handler'/></div>`,
  // 构建子组件
    child = vue.extend({
    template:template,
    props:['message'],
    created:function(){},
    methods:{
      handler(){
        var self = this;
        alert(self.message)
      }
    }
  })
  vue.childTem  = child;
})(Vue)