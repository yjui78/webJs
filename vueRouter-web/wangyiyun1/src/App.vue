<template>
  <div id="app">
      <div class="container clearfix">
        <list/>
      
       <router-view/></div>
  </div>
</template>
<script>
import list from '@/components/list'
export default{
  components:{
    list
  }
}
</script>
<style scoped="scoped">

</style>
