<template>
    <div class="pagenation-container">
        <div class="pagenation clearfix">
            <a href="javascript:;" class="fl large" :class="{disabled:curpage==1}" @click="prev">上一页</a>
            <!-- <a href="#" class="fl active">1</a> -->
            <a href="javascript:;" class="fl" v-for="(p,index) in total" :key="index" :class="{active:curpage==p}" @click="curpage=p">{{p}}</a>
            <a href="javascript:;" class="fl large" :class="{disabled:curpage==total}" @click='next'>>下一页</a>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        cur:{
            type:Number,
            default:1
        },
        total:{
            type:Number,
            required:true
        }
    },
  data() {
    return {
        curpage:this.cur
    }
  },
  watch:{
      //监听当前页点击事件
      'curpage'(){
          this.$emit('change',this.curpage)
      }
  },
  methods:{
      prev(){
          if(this.curpage>1){
              this.curpage--
          }
      },
      next(){
          if(this.curpage<this.total){
              this.curpage++;
          }
      }
  }
}
</script>

<style scoped>
/* 分页 */
.pagenation-container {text-align:center;}
.pagenation {
  display:inline-block;
  height:40px;padding-bottom:80px;
}
.pagenation a {
  padding:7px 12px;
  border:1px solid #e6e6e6;
  font-size:12px;line-height:24px;
  color:#333;
  margin-right:-1px;
}
.pagenation a.large {
  padding:8px 15px 6px 15px;
}
.pagenation a.active {
  background:#b4a078;
  border-color:#b4a078;
  color:#FFF;
}
.pagenation a.disabled,.pagenation a.disabled:hover {
  color:#CCC;
}
.pagenation a:hover {color:#b4a078}
</style>
