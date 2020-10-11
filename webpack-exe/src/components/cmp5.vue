<template>
  <div>
    
  CMP1
  </div>
</template>

<script>
export default {
 	beforeRouteEnter(to,from,next){
     if(confirm('你确定要直来吗？')){
        console.log('Enter cmp1')
        next();
    }
  },
  beforeRouteUpdate(to,from,next){
     next();
    console.log('updated')
  },
  beforeRouteLeave (to,from,next){
    if(confirm('你确定要离开吗？')){
      console.log('leave cmp1')
      next();
    }
    
  }
}
</script>