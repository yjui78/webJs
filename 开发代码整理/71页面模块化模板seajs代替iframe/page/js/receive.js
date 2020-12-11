define(function (require, exports, module) {
  require('../css/receive.css')
  var common = require('common')
  var add = Vue.extend({
    template: require('../receive.html'),
    data() {
      return {}
    },
    activated() { },
    methods: {},
    mounted() { }

  })
  module.exports = add
})