<!-- 左测整体 -->
<template lang="html">
  <div class="cm-list fl">
    <dl class="m-brand-list">
      <dt>云音乐特色榜</dt>
       <listItem :data="item" v-for ="item,index in list" />
    </dl>
  </div>
</template>
<script>
// listItem其他地可能会用就弄成组件
import listItem from '@/components/listitem'
export default {
  data(){
    return {
      list:[],
      cur:0
    }
  },

  // 因为都要获取参数this.$route.params.id封装
  async created(){
    // 调左测列表数据
    let {data} = await this.axios('http://localhost:4000/datas.json')
    this.list =data;
    if(!this.$route.params.id){
        if(this.list.length>0){
          this.setCur(this.list[0])
        }
    }
  },
  methods:{
    // 设默认路由显示
    setCur(){
      this.$router.push({name:'music',params:{
        id:this.list[0].id
      }})
    }
  },
  components:{listItem},
}
</script>