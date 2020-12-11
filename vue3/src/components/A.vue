<template>
<div>
<input type="button" value='A发出' @click="givedata"/>
<B/>
</div>
</template>
<script>
import Public  from '../public'
import B from '@/components/B'
  export default{
    data(){
      return{
        str:'这是数据给你'
      }
    },
  components:{B},
   methods:{
     givedata(){
         Public.$emit('givedata',this.str);
     }
   }
  }
</script>
<style lang="css" scoped></style>