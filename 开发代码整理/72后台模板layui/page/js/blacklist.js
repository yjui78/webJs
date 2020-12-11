define(function (require, exports, module) {
  require('../css/blacklist.css')
  var common = require('common')
  var add = Vue.extend({
    template: require('../blacklist.html'),
    data() {
      return {}
    },
    activated() { },
    methods: {},
    mounted() { }

  })
  module.exports = add
})