<template>
  <div class="detail-bg">
      <div class="page">
        <!-- <div class="crumbs">
          <a href="#">首页</a>
          <span class="spliter">&gt;</span>
          <a href="#">全球特色</a>
          <span class="spliter">&gt;</span>
          <a href="#">文创周边</a>
          <span class="spliter">&gt;</span>
          <a href="#">大英博物馆 埃及神猫靠枕</a>
        </div> -->
        <cmpCrumbs :pathArr="[]"/>
        <cmpHeader/>
        <div class="detail-prompt"></div>
        <div class="detail-content clearfix">
            <cmContent/>
            <cmpHot/>
        </div>
      </div>
      </div>
</template>

<script>   
import cmpCrumbs from '@/components/common/cmp-crumbs' 
import cmpHot from '@/components/item/cmp-hot'
import cmpHeader from '@/components/item/cmp-header'
import cmContent from '@/components/item/cmp-content'
export default {
  data() {
    return {

    }
  },
  components: {
    cmpHot,cmpHeader,cmContent,cmpCrumbs
  }
}
</script>

<style scoped>

</style>
