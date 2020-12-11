import Vue from 'vue';
import Router from 'vue-router';

import detail from '@/components/detail';
Vue.use(Router)
export default new Router({
  routes: [
    // 最好不在根目录下直接折腾，name和层级没关方便直接调名
    { path: '/music/:id',name:'music', component: detail }
  ]
});