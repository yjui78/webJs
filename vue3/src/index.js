import Vue from 'vue';
import App from './App.vue';

import axios from 'axios';
import vueAxios from 'vue-axios';
Vue.use(vueAxios, axios);

// 引入vuex
import Vuex from 'vuex';
Vue.use(Vuex);
let store = new Vuex.Store({
  state: { userID: 0 },
  mutations: {
    setUserid(state, id) {
      state.userID = id;
    }
  },
  actions: {
    // login方法涉及数据交互用async异步
    // 因为只能传一个参数，用json解构方式
    async login({ commit }, { user, password }) {
      // let { data } = await axios('/users.txt');
      let data = [{ id: 1, 'username': 'YJUI', 'password': 123456 }, { id: 2, 'username': 'zhangsan', 'password': 111111 }, { id: 3, 'username': 'lisi', 'password': 222222 }]
      // console.log(data)
      data.forEach(item => {
        if (item.username == user && item.password == password)
          commit('setUserid', item.id)
      })
    },
  }
})
new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
