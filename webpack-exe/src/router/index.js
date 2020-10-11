import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router); 

import cmp1 from '@/components/cmp1';
import cmp2 from '@/components/cmp2';

export default new Router({
	routes:[ 
		{path:'/index/:id',name:'index',component:cmp1},
		{path:'/news',component:cmp2},
	]
});
