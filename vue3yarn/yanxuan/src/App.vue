<template>
  <div>
    <span class="loading" v-if="loading">loading</span>
    <router-view />
  </div>
</template>

<script>
import ev from '@/libs/event';

export default {
  data(){
    return {
      loading: false
    };
  },
  created(){
    ev.on('axios_start_load', ()=>this.loading=true);
    ev.on('axios_end_load', ()=>this.loading=false);
  },
}
</script>

<style scoped>
.loading {position:fixed;width:100%;height:100%;background:rgba(0,0,0,.3); left:0;top:0;color:#FFF; text-align: center;line-height:400px;z-index:9999;}
</style>
