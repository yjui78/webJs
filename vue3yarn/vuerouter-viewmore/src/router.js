import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);
import header from '@/components/header';
import index from '@/components/index';
import footer from '@/components/footer';
import login from '@/components/login';
import news from '@/components/news';
import web from '@/components/web';
export default new Router({
	routes: [
		{ path: '/login', component: login },
		{
			path: '/',
			components: {
				default: web,
				header: header,
				footer: footer
			},
			children: [
				{ path: '/', name: 'index', component: index },
				{ path: 'news', name: 'news', component: news }
			]
		}
	]
});
