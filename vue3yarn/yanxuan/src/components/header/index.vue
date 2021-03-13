<template lang="html">
  <div class="header">
    <div class="header-container clearfix">
      <div class="logo-container fl">
        <a href="http://you.163.com/" class="logo">严选商城</a>
      </div>
      <a href="/cart" class="cart fr">
        <span>购物车</span>
        <i>0</i>
      </a>
      <net-search />
    </div>
    <net-nav />
  </div>
</template>

<script>
import netSearch from './search';
import netNav from './nav';

import '@/asset/css/header.css';

export default {
  components: {
    netSearch, netNav
  }
}
</script>

<style lang="css" scoped>
</style>
