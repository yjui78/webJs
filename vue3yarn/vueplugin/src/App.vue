<template>
  <div id="app">
   <!-- <button type='button'  v-link="{name:'index'}">首页</button>
   <button type='button'  v-link="{name:'news',params:{id:1}}">新闻1</button>
   <button type='button' v-link="{name:'news',params:{id:2}}">新闻2</button>

   <router-view></router-view> -->
  <button type='button' @click='fn'>按钮</button>
  {{color}}
  <div class='box' v-ani="{duration:3000}" :style="{background:color,width:width+'px'}"></div>
  <br/>
  <div class='box' v-ani="2000" :style="{background:color}"></div>
  <z-button>aaa</z-button>
  </div>
</template>
<script>


export default {
name:'app',
data(){
    return {
        color:'yellow',
        width:200
    }
},
//  async created(){
//    let  {data}= await this.$axios('index.html')
//    console.log(data)
// }
methods:{
    fn(){
        this.color='red';
        this.width=500;
    }
}

}
</script>
<style lang='css' scoped>
.box {
    width:200px;height:200px;
}
  
</style>