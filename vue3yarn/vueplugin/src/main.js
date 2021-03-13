import Vue from 'vue';
import App from './App.vue';
import router from './router';
//引入过滤器
import './plugins/filters'


Vue.config.productionTip = false;

// 自定义指令
// Vue.directive('link', {
// 	bind(el, binding, vNode) {
// 		el.addEventListener('click', function() {
// 			vNode.context.$router.push(binding.value);
// 		});
// 	},
// });
// Vue.mixin({
//     created(){
//         console.log('a')
//     }
// })

import myVueAxios from './plugins/myVueAxios'
import axios from 'axios'
// 自己写的插件正常放node_module中这里放plugins中为了不被删除
import VLink from './plugins/v-link'
Vue.use(VLink)
Vue.use(myVueAxios,axios)
import VAni from './plugins/v-ani'
Vue.use(VAni)
import  myElement from './plugins/my-element'
Vue.use(myElement)
new Vue({
	router,
	render: (h) => h(App),
}).$mount('#app');
