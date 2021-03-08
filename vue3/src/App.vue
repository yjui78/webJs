<template>
	<div div id="app">
        <A/>
	</div>
</template>
<script>
import A from '@/components/A';
export default {
    provide(){
        return {
            name:'我是父组件来的'
        }
    },
	components: { A},
};
</script>
