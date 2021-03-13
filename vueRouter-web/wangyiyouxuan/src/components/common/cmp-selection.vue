<template>
    <ul class="order-type-list fl">
        <li class="fl" v-for="(item,index) in data" :key="index" :class="{cur:index==cur}" @click="cur=index">
            <a href="javascript:;">{{item}}</a>
        </li>
    </ul>
</template>

<script>
export default {
    props:{
        data:{
            type:Array,
            required:true
        },
        // v-model都以value接收是索引值
        value:{
            type:Number,
            required: true
        }

    },
  data() {
    return {
        cur:this.value
    }
  },
//  监听选项$emit给父级
watch:{
    'cur'(){
        this.$emit('input',this.cur)
    }
},
  components: {

  }
}
</script>

<style scoped>
.order-type-list {}
.order-type-list li {
  padding:1px;
  border:1px solid #ddd;
  margin-right:10px;
  margin-bottom:15px;
}
.order-type-list li.cur {
  padding:0;
  border:2px solid #b4a078;
}
.order-type-list li a {
  display:block;
  padding:0 16px;
  height:26px;line-height:26px;
  font-size:12px;color:#333;
}
.order-type-list li.cur {}
</style>
