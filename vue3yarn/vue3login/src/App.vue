<template>
	<div id="app">
		<div class="container clearfix">
			<p>这是主页下边内容可变</p>
			<p>这是vuex--{{ $store.state }}</p>
			------------------------------------
			<router-view></router-view>
		</div>
	</div>
</template>
<script>
import index from '@/components/index';
export default {
	components: {
		index
	}
};
</script>
<style scoped="scoped"></style>
