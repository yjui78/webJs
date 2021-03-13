<!-- 右测整体 -->
<template>
  <div class="index">
    <!-- <router-link @click="fn">登录 </router-link> -->
    <p><button @click="fn">点击进入详情</button></p>
    <!-- <router-link :to="{ name: 'login',query:{id:1,name:'yjui'}}">点击进入登录</router-link> -->
  </div>
</template>
<script>
import login from '@/components/login'
export default {
  data() {
    return {}
  },
  methods: {
    fn() {
      this.$store.dispatch('aaa', false)

      this.$router.push({
        path: 'details/11/yy',
        query: { id: 1, name: 'yjui' }
      })

      //   非vuex中取值用 this.$store.state，vuex中取值用store.state
      //   console.log(this.$store.state)
    }
  }
}
</script>

<style></style>
