<template>
  <div>
      <button @click="fn">button</button>
  </div>
</template>

<script>
export default {
    // props:['foo'],
  data() {
    return {
        good:'yes',
        a:2
    }
  },
  components: {

  },
   mounted(){
  
   },
   methods:{
       fn(){
           this.$emit('add',this.good,this.a)
       }
   }
}
</script>

<style scoped>

</style>
