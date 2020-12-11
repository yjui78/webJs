<!-- 右测每个数据表 -->
<template>
  <div>
  <div class="td col-1 center fl">
            {{zindex+1}}
          </div>
          <div class="td col-2 fl">
            {{list.title}}
          </div>
          <div class="td col-3 fl">
            <!-- <a href="javascript:;" class="add-btn" @click="addToitem(item)">添加到播放列表</a> -->
            <span>{{time(list.duration)}}</span>
          </div>
          <div class="td col-3 fl">
            {{list.artist}}
          </div>
  </div>
  
</template>
<script >

export default {
 props:['list','zindex'],
//  duration时间200分钟转能看懂的格式02:10,调用：{{time(list.duration)}}
 methods:{
   time(t){
     function toDou(n){//补0
       return n<10?`0${n}`:n;
     }//200->3:20
     return toDou((Math.floor(t/60))+':'+toDou(t%60));
   }
 },
}
</script>>