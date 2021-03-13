<template lang="html">
  <div class="crumbs">
      <template v-for="path,index in pathArr">
          <a href="#">全部商品</a>
          <span class="spliter">&gt;</span>
          <a :href="path.url" :class="{cur:index==pathArr.length-1}">{{path.title}}</a>
      </template> 
   </div>
</template>

<script>
export default {
props: {
    pathArr: {
      type: Array,
      required: true
    }
  },
  data() {
    return {

    }
  },
  created(){
    //   console.log(this.pathArr[0].url)
  },
  components: {

  }
}
</script>

<style scoped>
/* 面包屑 */
.crumbs {
	padding: 24px 0;
	font-size: 12px;
}
.crumbs a {
	color: #333;
}
.crumbs a.cur {
	color: #999;
}

.crumbs .spliter {
	margin: 0 7px;
}

</style>
