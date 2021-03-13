import Vue from 'vue';
import App from './App.vue';

import vueAxios from 'vue-axios';
import axios from '@/axios';
import store from '@/store';
import router from './router';

Vue.use(vueAxios, axios);
Vue.config.productionTip = false;

Vue.filter('imgPath', (val) => {
	return (
		'http://api.zhinengshe.com/10001-you163/' +
		val +
		'?apikey=ebf6f58458de4b8fbad3afadd8c8a706'
	);
});
new Vue({
	router,
	store,
	render: (h) => h(App),
}).$mount('#app');
