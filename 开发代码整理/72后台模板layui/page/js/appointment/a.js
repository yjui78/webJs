define(function (require, exports, module) {
  require('../../css/appointment.css')
  var common = require('common')
  var add = Vue.extend({
    template: require('../../appointment/a.html'),
    data() {
      return {}
    },
    activated() {
      alert('a')
    },
    methods: {},
    mounted() { alert('a') }

  })
  module.exports = add
})