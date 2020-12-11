<template>
<div>
  <button @click="fn">登录</button>
</div>
</template>
<script>
  export default{
    data(){
      return {}
    },
    methods:{
      fn(){
       this.$store.dispatch('aaa','33')
      }
    }
  }
</script>
<style lang="css" scoped></style>