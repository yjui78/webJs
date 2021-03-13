import Axios from 'axios';
import Vue from 'vue';
import ev from '@/libs/event';

import {ROOT, API_KEY} from '@/config';

const axios=Axios.create({
  baseURL: ROOT,
  headers: {
    apikey: API_KEY
  }
});

let loading=0;

axios.interceptors.request.use(config=>{
  loading++;

  if(loading==1){
    ev.emit('axios_start_load');
  }

  return config;
});

axios.interceptors.response.use(res=>{
  loading--;

  if(loading==0){
    ev.emit('axios_end_load');
  }

  if(res.data.err){
    alert(res.data.msg);

    throw res;
  }else{
    return res.data.data;
  }
}, err=>{
  alert('数据请求失败，请稍后重试');

  console.error(err.response);

  throw err;
});

// Vue.prototype.axios=axios;

axios.getLoading=function (){
  return loading;
};

export default axios;
