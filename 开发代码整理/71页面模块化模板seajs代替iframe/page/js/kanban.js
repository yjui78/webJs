define(function (require, exports, module) {
  require('../css/kanban.css')
  var common = require('common')
  var add = Vue.extend({
    template: require('../kanban.html'),
    data() {
      return {}
    },
    activated() { },
    methods: {},
    mounted() { }

  })
  module.exports = add
})