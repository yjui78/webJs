import Vue from 'vue';
import App from './App.vue';

import axios from 'axios';
import './plugins/common';
import './plugins/ajaxs';
import vueAxios from 'vue-axios';
import router from './router';
Vue.use(vueAxios, axios);
Vue.config.productionTip = false;
import Vuex from 'vuex';
Vue.use(Vuex);
var store = new Vuex.Store({
	state: { token: 0 },
	mutations: {
		setToken(state, arg) {
			state.token = arg;
		}
	},
	actions: {
		aaa(context, arg) {
			context.commit('setToken', arg);
		}
	}
});
console.log(Vue.prototype, 'js');
router.beforeEach((to, from, next) => {
	if (to.meta.requireAuth) {
		// 判断该路由是否需要登录权限
		console.log(store.state.token);
		if (store.state.token) {
			// 通过vuex state获取当前的token是否存在
			next(); //进入下个页
		} else {
			next({
				path: '/login',
				query: { redirect: to.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
			});
		}
	} else {
		next(); //进入下个页
	}
});

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app');
