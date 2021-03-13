<template>
<div class="banner" @mouseover="endAutoPlay" @mouseout="startAutoPlay">{{cur}}
      <a href="javascript:;" class="btn prev" @click="prev">上一项</a>
      <a href="javascript:;" class="btn next" @click="next">下一项</a>
      <ul class="banner-list">
        <li class="banner-container" :class="{cur:cur==index}" v-for='(item,index) in banners' :key="index"  >
          <a href="javascript:;">
            <!-- <img :src="'http://api.zhinengshe.com/10001-you163/'+item.src+'?apikey=ebf6f58458de4b8fbad3afadd8c8a706'"> -->
            <img :src="item.src|imgPath">
          </a>
        </li>
      </ul>
      <ol class="number-list">
        <li v-for='(item,index) in banners' :key="index" :class="{active:cur==index}" @mouseover="cur=index"></li>
      </ol>
    </div>
</template>

<script>
export default {
  data() {
    return {
        banners:null,
        cur:0,
        timer:null,
    }
  },
  async created(){
      //this.$http
      let {data: {err, msg, data}}=await this.axios('/banners');
      if(err){
          alert(msg)
      }else {
          this.banners= data;
      }
      this.startAutoPlay();
  },
// setInterval是全局window的，banner组件有一天销毁时或不是index页跳其他时要清除timer，要不会报错影响性能，
// Destory所有数据都 销毁了没办法访问东西，所以在 beforeDestory中
  beforeDestory(){
      this.endAutoPlay();
  },
  methods:{
      startAutoPlay(){
        clearInterval(this.timer)
        this.timer = setInterval(this.next,1000);
      },
      endAutoPlay(){
          clearInterval(this.timer)
      },
      prev(){
        if(this.cur==0){
            this.cur = this.banners.length-1;
        }else {
            this.cur--;
        }
          
      },
      next(){
        if(this.cur==this.banners.length-1){
            this.cur = 0;
        }else{
            this.cur++;
        }
          
      }
  },
  components: {

  }
}
</script>

<style scoped>
/* banner */
@import url(../../assets/css/banner.css);


</style>
