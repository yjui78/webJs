import Vue from 'vue';
import axios from '@/axios';

import {get, set} from '@/libs/cache';

async function catalog(index){
  if(typeof index!='number' || index<0){
    throw new Error('index invaild');
  }

  const name=`catalog_`+index;

  let data=get(name);

  if(data)return data;

  data=await axios('/catalog', {
    params: {
      index
    }
  });

  set(name, data, {session: true, maxage: 86400});

  return data;
}

async function searchautocomplete(kw){
  return await axios('/searchautocomplete', {
    params: {kw}
  });
}

Vue.prototype.models=Vue.prototype.models||{};
Vue.prototype.models.header={catalog, searchautocomplete};
