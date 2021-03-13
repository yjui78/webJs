import Vue from 'vue'
import App from './App.vue'

import '@/asset/css/base.css';

import axios from './axios';
import './filters';
import './components';
import './models';
import router from './router';
// import store from './store';



Vue.config.productionTip = false

// axios('/searchautocomplete', {
//   params: {
//     kw: 'chuang',
//   },
// }).then(res=>{
//   console.log(res);
// }, err=>{
//   console.log(err);
// });


new Vue({
  router,
  // store,
  render: h => h(App),
}).$mount('#app')
