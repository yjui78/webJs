<template lang="html">
  <div class="sliderbar">
    <div class="title">热销榜</div>
    <ul class="list">
      <li
        class="list-item clearfix"
        v-for="item,index in data" :key="index"
      >
        <img class="icon" :src="item.src|imgPath" :alt="item.text">
        <span class="name" v-html="item.text" />
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data(){
    return {
      data: null
    };
  },
  async created(){
    this.data=await this.models.home.sidebar();
  }
}
</script>

<style lang="css" scoped>
</style>
