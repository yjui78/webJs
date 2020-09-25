import Vue from 'vue'
import App from './App'
import * as mod1 from '@/assets/mod1';

console.log(mod1)
new Vue({
  el:'#root', 
  components:{
  	App
  },
  template:`<App/>`
})


// new Vue({
//   router, 
//   render: h => h(App),
// }).$mount('#root')
