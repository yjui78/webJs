import Vue from 'vue'
import App from './App.vue'

import './assets/css/main.css';


import axios from 'axios'
import vueAxios from 'vue-axios'
import router from './router'


//axios是给vueAxios的参数
Vue.use(vueAxios, axios)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
