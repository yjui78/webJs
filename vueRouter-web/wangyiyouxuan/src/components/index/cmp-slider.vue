<template>
    <div class="sliderbar">
        <div class="title">热销榜</div>
        <ul class="list">
        <li class="list-item clearfix" v-for="(item,index) in sliderData" :key="index">
            <img class="icon" :src="item.src|imgPath" alt="">
            <span class="name" v-html="item.text"></span>
        </li>
        </ul>
    </div>
</template>

<script>
export default {
  data() {
    return {
        sliderData:null
    }
  },
  async created(){
     let {data: {err, msg, data}}=await this.axios('/sidebar');
     this.sliderData = data;
     console.log(data)
  },
  components: {

  }
}
</script>

<style scoped>
@import url(../../assets/css/slider.css);
</style>
