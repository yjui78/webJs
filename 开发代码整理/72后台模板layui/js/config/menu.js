define(function (require, exports, module) {
  var common = require('common')
  var box = Vue.extend({
    template: require('./menu.html'),
    data() {
      return {}
    },
    // props值不能是menuList大写报错
    props: ['menulist'],
    activated() {

    },
    methods: {
      tab(path) {
        this.$emit('tab', path)
      }
    },
    mounted() {
      console.log(this.menulist, 333)
    }

  })
  Vue.menu = box;
})