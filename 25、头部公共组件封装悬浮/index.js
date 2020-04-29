var vm = new Vue({
    el:'#app',
    data:{
        curCar:'这是传来的数据'
    },
    components:{
        'vue-head':Vue.head,
    }
})