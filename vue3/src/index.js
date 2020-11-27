import Vue from 'vue';
import App from './App.vue';

import axios from 'axios';
import vueAxios from 'vue-axios';
Vue.use(vueAxios, axios);

// 引入vuex
import Vuex from 'vuex';
Vue.use(Vuex);
let store = new Vuex.Store({
  state: { num: 0 },
  mutations: {
    setNum(state, arg) { //上边state
      state.num = arg;
    }
  },
  actions: {
    // setNum名可以和mutations里名一样
    aaa(context, arg) { //context对象有很多操作
      context.commit('setNum', arg)//调mutations里setNum,
    },
    // 等同于
    // aaa({ commit }, arg) {
    //   commit('setNum', arg)
    // }

  }
})
new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
