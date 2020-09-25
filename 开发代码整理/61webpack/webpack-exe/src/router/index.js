import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router); 

import cmp1 from '@/components/cmp1';
import cmp2 from '@/components/cmp2';
let router = new Router({
	routes:[ 
		{path:'/cmp1/:id',component:cmp1},
		{path:'/cmp2',component:cmp2},
	]
})
export default router;