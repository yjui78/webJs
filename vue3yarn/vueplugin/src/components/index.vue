<template>
  <div class="container">
 首页{{124433232|time}}
time-filter->{{new Date().getTime()|time('YYYY年MM月dd日HH时mm分ss秒')}}<br/>
time-filter->{{new Date().getTime()|time('H:m:s')}}<br/>
html-filter-> {{'abtimec'|firstUpperCase}}<br/>
html-filter-> {{15222112121|hidePhone}}
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
//   created(){
//       console.log('index')
//   },
//   components: {

//   }
}
</script>

<style scoped>

</style>
