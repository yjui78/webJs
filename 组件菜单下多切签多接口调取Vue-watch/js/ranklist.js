define(function(require,exports,module){
    require('css/ranklist.css')
    // require('js/这页需要的JS')
    var common = require('common')
    var add = Vue.extend({
        // js对应的页面
        template:require('ranklist.html'),
        data(){
            return {
                language:'',
            }
        },
        activated(){
            var self = this;
            self.language = localStorage.getItem("language"); 
        },
        methods(){

        }
    })
    module.exports = add
})