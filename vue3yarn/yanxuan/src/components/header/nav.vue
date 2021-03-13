<template lang="html">
  <nav>
    <ul class="catalog-href-list clearfix">
      <li
        :class="['catalog-href', 'fl', {active: cur==index}]"
        v-for="txt,index in catalog" :key="index"
        @mouseover="cur=index"
        @mouseout="cur=-1"
      >
        <a href="javascript:;" class="title">{{txt}}</a>
      </li>
      <li class="catalog-href fl">
        <a href="javascript:;" class="title">为你严选</a>
      </li>
      <li class="catalog-href fl">
        <a href="javascript:;" class="title">众筹</a>
      </li>
    </ul>
    <div class="catalog-list" v-if="data">
      <ul class="clearfix">
        <li
          class="catalog-column fl"
          v-for="item,index in data" :key="index"
        >
          <div class="title">{{item.title}}</div>
          <div>
            <a
              class="catalog-item"
              v-for="child,index2 in item.children"
              :href="child.href"
            >
              <img :src="child.src|imgPath" alt="">
              <span>{{child.title}}</span>
            </a>
          </div>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  data(){
    return {
      data: null,
      cur: 0,
      catalog: ['首页', '居家生活', '服饰鞋包', '个户清理', '母婴亲子', '运动旅行', '数码家电', '礼品特色']
    };
  },
  async created(){
    // this.data=await this.models.header.catalog();
  },
  watch: {
    async cur(){
      if(this.cur==-1){
        this.data=null;
      }else{
        this.data=await this.models.header.catalog(this.cur);

        console.log(this.data);
      }
    }
  }
}
</script>

<style lang="css" scoped>
</style>
