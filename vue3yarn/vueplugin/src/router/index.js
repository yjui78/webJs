import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);
import index from '@/components/index';
import news from '@/components/news';
export default new Router({
	routes: [
		{ path: '/', name: 'index', component: index },
		{ path: 'news/:id', name: 'news', component: news },
	],
});
