import Router from 'vue-router';
import Vue from 'vue';

import Home from '@/pages/home/index';
import List from '@/pages/list/index';

Vue.use(Router);

let router=new Router({
  routes: [
    {path: '/', name: 'home', component: Home},
    {path: '/search/:kw', name: 'search', component: List},
  ]
});

export default router;
