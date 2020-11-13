<template>
  <div>
  <div class="n-minelst n-minelst-2">
          <h2 class="f-ff1"> 云音乐特色榜</h2>
          <ul class="f-cb">
          <listItem  v-for="(item,key) in list"  :data="item" :key="key"/>
           </ul>
  </div>
  </div>
</template>

<script>
import listItem from '@/components/listItem';
  export default {
    props:['list'],
    components:{listItem}
    
  }
</script>>
<style scoped>

</style>