<template lang="html">
  <div>
    <site-header />
    <net-banner />

    <div class="page">
      <net-sliderbar />
      <net-manufacturer />
    </div>
  </div>
</template>

<script>
import '@/asset/css/index.css';

import netBanner from './banner';
import netSliderbar from './sliderbar';
import netManufacturer from './manufacturer';

export default {
  components: {
    netBanner,
    netSliderbar,
    netManufacturer
  }
}
</script>

<style lang="css" scoped>
</style>
