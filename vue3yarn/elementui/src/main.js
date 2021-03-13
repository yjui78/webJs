import Vue from 'vue';
import App from './App.vue';
// 全部引入
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

// 部分引入
// import { Button, Select } from 'element-ui';
// import 'element-ui/lib/theme-chalk/button.css';
// import 'element-ui/lib/theme-chalk/select.css';
// Vue.use(Button);
// Vue.use(Select);
Vue.config.productionTip = false;

new Vue({
	render: h => h(App)
}).$mount('#app');
