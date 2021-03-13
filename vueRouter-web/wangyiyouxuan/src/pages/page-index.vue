<template>
  <div>
      <cmpBanner/>
      <cmpIndex/>
  </div>
</template>

<script>
import cmpBanner from '@/components/index/cmp-banner'
import cmpIndex from '@/components/index/cmp-index'
export default {
  data() {
    return {

    }
  },
  components: {
        cmpBanner,
        cmpIndex
  }
}
</script>

<style scoped>

</style>
