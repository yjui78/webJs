<!-- 右测整体 -->
<template>
	<!-- <div class="cm-detail clearfix"> -->
	<!-- <ztable :zdata="item" v-for ="item,index in details"/> -->
	<!-- </div> -->
	<div class="cm-detail fr" v-if="details">
		<div class="m-banner clearfix">
			<div class="img fl">
				<img
					:src="'http://localhost:4000/imgs/' + details.big_img"
					alt=""
				/>
			</div>
			<div class="desc fl">
				<h2>{{ details.name }}</h2>
				<div class="info">
					<i class="time"></i>
					最近更新：03月10日
					<span>（{{ details.frequnce }}）</span>
				</div>
				<div class="btns">
					<a href="#" class="play-btn">播放</a>
					<a href="#" class="fav-btn">({{ details.fav }})</a>
					<a href="#" class="share-btn">({{ details.share }})</a>
					<a href="#" class="comment-btn">({{ details.comment }})</a>
				</div>
			</div>
		</div>
		<div class="m-title clearfix">
			<h3 class="fl">歌曲列表</h3>
			<div class="count fl">
				100首歌
			</div>
			<div class="plays fr">
				播放：<span>1702708352</span>次
			</div>
		</div>
		<div class="s-table">
			<div class="heading clearfix">
				<div class="th col-1 fl"></div>
				<div class="th col-2 fl">标题</div>
				<div class="th col-3 fl">时长</div>
				<div class="th col-3 fl">歌手</div>
			</div>
			<div class="body">
				<!-- <div
          class="tr clearfix"
          v-for="item,index in data.list" :key="index"
        >
           v-for="item2,index in details.list" :key="index" 
        </div> -->
				<zTable
					class="tr clearfix"
					:list="item"
					v-for="(item, index) in tableData"
					:key="index"
					:zindex="index"
				></zTable>
			</div>
		</div>
	</div>
</template>
<script>
// 路由id变了读对应detail数据
import zTable from '@/components/ztable';
export default {
	data() {
		return {
			tableData: [],
			details: null //刚加载时数据没读出来就加载img报错解决由[]改成null
		};
	},
	components: { zTable },
	// 因为都要获取参数this.$route.params.id封装，
	// 根据路由id找右测内容
	// this.$router.currentRoute.query==this.$route.query
	// params  ->/id,query->id=11
	async created() {
		await this.loadData(this.$route.params.id);
	},
	props: ['data'],
	watch: {
		async $route() {
			await this.loadData(this.$route.params.id);
			console.log(this.$route.params.id);
		}
	},
	methods: {
		// 用服务器的imgs封装，服务器datas.json,c:/server/datas.json
		getServerImg(img) {
			return 'http://localhost:4000/imgs/' + img;
		},
		async loadData(id) {
			let { data } = await this.axios('http://localhost:4000/datas.json');
			this.list = data;
			// 切路由右测变取datas.json中list对象内容
			for (var i in data) {
				var obj = [];
				if (data[i].id == id) {
					this.tableData = data[i].list;
					this.details = data[i];
				}
			}
			console.log(this.details);
		}
	}
};
</script>

<style></style>
