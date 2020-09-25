<template>
  <div>
     <cmp1  @aaa="fn"></cmp1>

  </div>
</template>
<script>
import cmp1 from './components/cmp1';
import Vue from 'vue'
Vue.component('cmp1',cmp1)
export default {
	created(){
	},
  methods:{
   fn(){
     alert(1)
    }
  },
}

</script>
<style>
</style>