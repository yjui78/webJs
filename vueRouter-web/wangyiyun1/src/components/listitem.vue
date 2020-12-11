<!-- 每个小列表 -->
<template>
    <router-link tag="a" class="ddc" :to="{name:'music',params:{id:data.id}}" :data-res-id="data.id"
    :class="{'active':data.id==$route.params.id}"
    >
        <img :src="getServerImg(data.big_img)" class="s-img fl" alt="">
        <div class="s-title fl">
          <a href="javascript:;" class="title">{{data.name}}</a>
          <span>{{data.frequnce}}</span>
        </div>
      </router-link>
</template>
<script>
export default {
  props:['data'],
  // 初次加载没路由取默认的
  // props:{
  //   data:{
  //     required:true,
  //   }
  // },
  methods:{
    // 用服务器的imgs封装，服务器datas.json,c:/server/datas.json
    getServerImg(img){
      return 'http://localhost:4000/imgs/'+img;
    },
  },
}
</script>