<template>
	<div div id="app">
	{{$store.state}}
		<cmp1/>
	</div>
</template>
<script>
import cmp1 from '@/components/cmp1'
export default {
	components:{cmp1}
}
</script>