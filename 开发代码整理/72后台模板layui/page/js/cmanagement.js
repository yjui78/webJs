define(function (require, exports, module) {
  require('../css/cmanagement.css')
  var common = require('common')
  var add = Vue.extend({
    template: require('../cmanagement.html'),
    data() {
      return {}
    },
    activated() { },
    methods: {},
    mounted() { }

  })
  module.exports = add
})