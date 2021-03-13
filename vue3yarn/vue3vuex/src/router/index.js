import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);
import list from '@/components/list';
import form from '@/components/form';
export default new Router({
	routes: [
		{ path: '/list', name: 'list', component: list },
		// 一个组件做两个事
		{ path: '/add', name: 'add', component: form },
		{ path: '/edit/:id', name: 'edit', component: form },
		// 访问http://localhost:3001/时找不到自动跳list路由下找redirect
		{ path: '*', redirect: 'list' }
	]
});
