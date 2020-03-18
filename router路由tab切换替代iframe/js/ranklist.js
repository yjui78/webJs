define(function(require,exports,module){
    require('css/ranklist.css')
    // require('js/这页需要的JS')
    var common = require('common')
    var add = Vue.extend({
        // js对应的页面
        template:require('ranklist.html'),
        data(){
            return {
                tab:1
            }
        },
        activated(){

        },
        methods(){

        }
    })
    module.exports = add
})