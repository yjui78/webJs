<template lang="html">
    <router-link tag="a" class="mine" :to="'/'+data.id">
      <div class="item f-cb">
          <div class="left">
              <a class="avatar" href="javascript:;">
                <img :src="'/static/imgs/'+data.img"
              ></a>
          </div>
          <p class="name"><a href="javascript:;" class="s-fc0">{{data.name}}</a></p>
          <p class="s-fc4">{{data.frequnce}}</p>
      </div>
    </router-link>
</template>
<script>
export default {
  props:['data'],

}
</script>>
<style scoped>

</style>