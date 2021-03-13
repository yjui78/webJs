<template>
<div>
   
{{name}}
</div>
</template>
<script>

  export default{
    //   inject:['name'],
    inject:{
        name:{
            type:String,
            default:22,
            required:true
        }
    },
    data(){
     return {
       
     }
    },
   mounted(){
       
    }
  }
</script>
<style lang="css" scoped></style>