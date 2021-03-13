import Vue from 'vue';
import axios from 'axios';
import { Store } from 'vuex';
import router from '../router';
// http request 拦截器
//请求开始前
axios.interceptors.request.use(
	config => {
		console.log('成功--ajax请求拦截前1...');
		var token = localStorage.getItem('antToken'); //检查是否有token,有的话说明是已登录，没有就说明未登录， 存在的话，则每个http header都加上token
		if (token) {
			//如果登录了就在每个接口的headers里面增加token
			config.headers.token = token;
		}
		console.log(config, 'config值');
		return config;
	},
	err => {
		return Promise.reject(err);
	}
);
// http response 拦截器请求结束后
axios.interceptors.response.use(
	response => {
		console.log('成功--ajax请求结束后2...');
		return response;
	},
	error => {
		if (error.response) {
			switch (error.response.status) {
				case 401:
					// 返回 401 清除token信息并跳转到登录页面
					store.commit(types.LOGOUT);
					router.replace({
						path: 'login',
						query: { redirect: router.currentRoute.fullPath }
					});
			}
		}
		return Promise.reject(error); // 返回接口返回的错误信息
	}
);

Vue.prototype.bb = 'bbb';
// axios全局封装
Vue.prototype.$axios = config => {
	return new Promise((resolve, reject) => {
		axios({
			method: config.method ? config.method : 'get',
			url: config.url ? config.url : '',
			data: config.data ? config.data : ''
		}).then(
			res => {
				console.log('ajax请求成功3...');
				resolve(res.data);
			},
			err => {
				reject(err);
			}
		);
	});
};
