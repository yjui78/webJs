var vm = new Vue({
    el:'#app',
    data:{

    },
    created: function () {
        var self = this;
        self.init();
    },
    mounted: function () {
        var self = this;
    },
    methods: {
        init(){
            var self = this;
            var adv = {
                step:5, //步长，
                interval:10,  //时间间隔
                init1:function(){
                    self.div = document.querySelector('#msg');
                    self.moveUpStep();
                }
            }
            console.log(adv.init1);
        },
        moveUpStep(){
            
        }
    },
    components: {
    },
    filters: {}

})