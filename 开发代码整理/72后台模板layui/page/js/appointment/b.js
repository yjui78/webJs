define(function (require, exports, module) {
  require('../../css/appointment.css')
  var common = require('common')
  var add = Vue.extend({
    template: require('../../appointment/b.html'),
    data() {
      return {}
    },
    activated() { },
    methods: {},
    mounted() { }

  })
  module.exports = add
})