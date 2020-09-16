<template lang="html">
    <div>
      dddd
        <button type="button" @click="fn()">按钮</button>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                a:12,b:5
            }
        },
        created(){
            var b=false;
            console.log(...b?[1,2,3]:[])
            console.log([1,2,3])
        },
        methods:{
            async fn(){
                alert(1)
            }
        }
    }
</script>
<style lang="css" scoped>
body {
  background: #f00000;
}
</style>