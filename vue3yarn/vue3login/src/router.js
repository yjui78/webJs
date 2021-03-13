import Vue from 'vue';
import Router from 'vue-router';
import index from '@/components/index';
import login from '@/components/login';
import repository from '@/components/repository';
import details from '@/components/details';
Vue.use(Router);
export default new Router({
	mode: 'history',
	routes: [
		{
			path: '/',
			name: '',
			component: index
		},
		{
			path: '/details/:id/:name',
			name: 'details',
			meta: {
				requireAuth: true // 添加字段随意，表示进入这个路由是需要登录的，为true时不可切换路由进不去下页，false时可正常进入
			},
			component: details
		},
		{
			path: '/repository',
			name: 'repository',

			component: repository
		},

		{
			path: '/login',
			name: 'login',

			component: login
		}
	]
});
