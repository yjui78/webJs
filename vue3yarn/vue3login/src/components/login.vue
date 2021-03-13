<!-- 右测整体 -->
<template>
  <div class="cm-detail fr">
    login页<br />
    用户名:<input type="text"
           v-model='name'><br />
    密码:<input type="text"
           v-model="pwd"><br />
    <button @click="fn">登录</button>
  </div>
</template>
<script>
import Vue from 'vue'
export default {
  data() {
    return {
      name: '',
      pwd: ''
    }
  },

  methods: {
    fn() {
      console.log(this.$store.state.token, 'store值')
      localStorage.setItem('antToken', this.$store.state.token)
      if (!this.name && !this.pwd) {
        alert('请登录')
      } else {
        //   这样也能取值
        // let { data } = await this.axios('http://localhost:3000/datas.json')
        // console.log(data, 'data')
        this.$store.state.token = 1

        this.$axios({
          url: 'http://localhost:3000/datas.json'
        }).then(res => {
          console.log(res, 5555555555)
          var url = Vue.prototype.$verification.getQueryString('redirect')
          this.$router.push({
            path: url
          })
        })
      }
    }
  }
}
</script>

<style></style>