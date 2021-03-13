import Vue from 'vue';
// 需要登录的页面
let isLoginPage = ['details'];
let verification = {
	// 前往登录
	toLogin() {
		$methodsFn.signOut();
		isLoginPage.forEach(item => {
			if (app.router.history.current.name == item) {
				app.router.replace('/sign-in/?type=signIn');
			}
		});
	},
	// 清空用户信息及登录信息
	signOut() {
		store.commit('setUserToken', {});
		store.commit('setUserInfo', {});
	},

	//获取浏览器url参数
	getQueryString: function(name) {
		var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
		var r = location.search.substr(1).match(reg);
		if (r != null) {
			return unescape(r[2]);
		}
		return null;
	}
};
let $methodsFn = {
	// 获取用户信息
	getUserInfo() {},
	// 判断登录状态routerName
	checkLoginStatus() {},
	// 前往登录
	toLogin() {},
	// 清空用户信息及登录信息
	signOut() {},
	// des加密
	encryptDes(unencryptedInfo) {}
};
Vue.prototype.$verification = verification;
Vue.prototype.$methodsFn = $methodsFn;
