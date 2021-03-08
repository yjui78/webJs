import Vue from 'vue';
import App from './App.vue';
import axios from 'axios';
import vueAxios from 'vue-axios';
Vue.use(vueAxios, axios);
// 引入vuex
import Vuex from 'vuex';
Vue.use(Vuex);
var store = new Vuex.Store({
	state: { num: 0 },
	mutations: {
		setNum(state, arg) {
			state.num = arg;
		},
	},
	actions: {
		aaa(context, arg) {
			context.commit('setNum', arg);
		},
	},
});

new Vue({
	store,
	render: (h) => h(App),
}).$mount('#app');
