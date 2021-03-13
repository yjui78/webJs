<template>
  <div class="container">
    <button class='color'><slot/></button>
    
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
}
</script>

<style scoped>
.color {background:red;width:100px;color:white;}
</style>
