<template>
  <div id="root">
    <router-link :to="{name:'index'}">首页</router-link>&nbsp;&nbsp;
    <router-link :to="{name:'news'}">新闻</router-link>
    <router-view name="header" />
    <router-view />
    <router-view name="footer" />
  </div>
</template>
<style scoped>
.router-link-active {
  color: #000;
}
.router-link-exact-active.router-link-active {
  color: red;
}
</style>