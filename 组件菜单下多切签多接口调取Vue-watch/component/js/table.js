define(function(require,exports,module){
    var common = require('../../js/common');
    var temp = require('../table.html')
    var box =Vue.extend({
        template:temp,
        props:['key','list','tableTitle'],
        data:function(){
            return {
                tabHead:[],
            }
        },
        activated:function(){

        },
        mounted(){
            // 滚动除第一列效果
            common.tableInit();
        },
        methods:{

        },
        watch:{
            'key':function(){
            },
            'list':function(){
               this.tabHead = this.tableTitle[this.key];
            }
        }
    })
    Vue.table = box;
})