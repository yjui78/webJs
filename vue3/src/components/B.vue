<template>
<div>
 {{name}}
</div>
</template>
<script>
import Public from '../public'
  export default{
     data() {
      return {
        name: '默认值'
      };
    },
     mounted(){
      Public.$on('givedata', (info) => {
        this.name = info ;
      });
    }
  }
</script>
<style lang="css" scoped></style>