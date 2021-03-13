// vuex不是组件不能直接用this.$http这个功能，直接引axios封装好的用

import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
import axios from '@/axios';
export default new Vuex.Store({
	state: {
		catalogs: {},
	},
	mutations: {
		setCatelogs(state, { index, data }) {
			// mutations中取actions中请求的异步数据请求成功没无法输出到页面中只能用Vue.set
			Vue.set(state.catalogs, index, data);
		},
	},
	actions: {
		async getCatalog({ state, commit }, index) {
			// state.catalogs[index]是当前请求值是否请求过，数据缓存
			if (!state.catalogs[index]) {
				let { data } = await axios('/catalog', {
					method: 'get',
					// {index:index}={index}
					params: { index },
				});
				console.log();
				if (data.err) {
					console.log(data.msg);
				} else {
					console.log(data, 'vuex');
					commit('setCatelogs', {
						index,
						data: data.data,
					});
				}
			}
		},
	},
	getters: {
		catalogs(state) {
			return state.catalogs;
		},
	},
});
