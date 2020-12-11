define(function (require, exports, module) {
  require('../css/evaluate.css')
  var common = require('common')
  var add = Vue.extend({
    template: require('../evaluate.html'),
    data() {
      return {}
    },
    activated() { },
    methods: {},
    mounted() { }

  })
  module.exports = add
})