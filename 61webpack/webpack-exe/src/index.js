import cmp1 from './cmp1';  //引组件不带.vue 要配置resolve——>extensions
import Vue from 'vue';
import './assets/1.css';
// 这里的cmp1相当于局部cmp1=Vue.extend写法，要引入vm中index.html才能用
console.log(3333)
let vm = new Vue({
    el:'#root',
    components:{
        cmp1
    },
    template:'<cmp1></cmp1>'
     
})