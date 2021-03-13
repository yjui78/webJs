<template>
	<div id="app">
        <cmpHeader/>
        <router-view/>
	</div>
</template>
<script>
import cmpHeader from '@/components/common/cmp-header.vue'

export default {
    components:{
        cmpHeader,
    }
}
</script>
<style scoped>
</style>