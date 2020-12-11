define(function (require, exports, module) {
  require('../css/kanban.css');
  var add = Vue.extend({
    template: require('./kanban.html'),
    data() {
      return {}
    }
  })
  module.exports = add;
})