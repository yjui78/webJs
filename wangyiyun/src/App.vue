<template>
  <div id="app">
    <list :list="datas"/>
    <router-view />
  </div>
</template>

<script>

import list from "@/components/list";
import datas from './datas.json'
// import './main.css'; 课上老师可以自行不通

export default {
  components: {
    list
  },
  data(){
    return {
      datas
    }
  },
  name: "App"
};
</script>

<style type="text/css">
  @import './main.css';
</style>
