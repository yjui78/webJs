import Vue from 'vue';
import axios from '@/axios';

import {get, set} from '@/libs/cache';

async function search(keyword, page=1){
  return await axios('/search', {
    params: {
      keyword, page
    }
  })
}


Vue.prototype.models=Vue.prototype.models||{};
Vue.prototype.models.list={search};
