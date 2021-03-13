import Vue from 'vue';
import {IMG_ROOT, API_KEY} from '@/config';

Vue.filter('imgPath', function (input){
  return IMG_ROOT+input+'?apikey='+API_KEY;
});

Vue.filter('duration', function (input){
  let m=Math.floor(input/60);
  let s=input%60;

  const dou=n=>n>=10?''+n:'0'+n;

  return dou(m)+':'+dou(s);
});
