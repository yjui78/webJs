<template>
  <div>
     <!--<router-link :to="{path:'/index/12',query:{a:1,b:2}}">首页</router-link>-->
     <router-link :to="{name:'index',params:{id:12},query:{a:1,b:2}}">首页</router-link>
     <router-link :to="{path:'/news',query:{a:3,b:4}}">新闻</router-link>
    <router-view/>  
  </div>
</template>
<script>

export default {
	created(){
	},
  methods:{
  
  },
}

</script>
<style>
</style>