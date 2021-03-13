<template>
  <div class="container">
      <div class="page">
      <cmpSlider/>
      <div class="manufacturer">
        <div class="common-header">
          <div class="fl">
            <h3 class="fl">品牌制造商</h3>
            <span class="fl small">工厂直达消费者，剔除品牌溢价</span>
          </div>
          <a href="#" class="fr more-btn">更多制造商 &gt;</a>
        </div>
        <div class="list clearfix">
          <a href="#" class="item fl large">
            <div class="content">
              <span class="title">海外制造商</span>
              <span class="price">9.9元起</span>
            </div>
            <!-- <img src="../assets/imgs/manufacturer1.png" alt=""> -->
          </a>
          <a href="#" class="item fl large" style="margin-left:9px;">
            <div class="content">
              <span class="title">海外制造商</span>
              <span class="price">9.9元起</span>
            </div>
            <!-- <img src="../assets/imgs/manufacturer2.png" alt=""> -->
          </a>
          <a href="#" class="item small fl" style="margin-left:10px;">
            <div class="content">
              <span class="title">海外制造商</span>
              <span class="price">9.9元起</span>
            </div>
            <!-- <img src="../assets/imgs/manufacturer3.png" alt=""> -->
          </a>
          <a href="#" class="item small fl" style="margin-left:10px;margin-top:10px;">
            <div class="content">
              <span class="title">海外制造商</span>
              <span class="price">9.9元起</span>
            </div>
            <!-- <img src="../assets/imgs/manufacturer4.png" alt=""> -->
          </a>
        </div>
      </div>
    </div>
 </div>
</template>

<script>
import cmpSlider from './cmp-slider'
export default {
  data() {
    return {

    }
  },
  components: {
    cmpSlider
  }
}
</script>

<style scoped>
@import url(../../assets/css/index.css);
</style>
