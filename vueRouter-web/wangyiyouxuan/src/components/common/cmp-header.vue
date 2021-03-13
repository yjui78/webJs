<template>
	<div class="container">
		<div class="header">
			<div class="header-container clearfix">
				<div class="logo-container fl">
					<!-- <a href="http://you.163.com/" class="logo">严选商城</a> -->
                    <router-link :to="{name:'index'}" class="logo"></router-link>
				</div>
				<a href="/cart" class="cart fr">
					<span>购物车</span>
					<i>0</i>
				</a>    {{this.search.keyword}}
				<div class="search-container fr">
					<input
						type="text" 
						class="search-txt fl"
                        ref="search-input"
						v-model="search.keyword"
						@focus="search.Placeholder = false,search.show=true"
                        @blur='hideAutoComplete'
                        @keydown.up="suggestActive--"
                        @keydown.down="suggestActive++"
                        @keydown.enter= "doSearch()" 
					/>
                    <!-- 联想词 -->
					<div class="suggest" >
						<ul v-if="search.list.length && search.show==true">
                            <li v-for="(item,index) in search.list"  :class="{active: index==suggestActive}" :key="index"   @mouseover="suggestActive=index" @click="doSearch()" >{{item}}</li>
						</ul>
					</div>
					<a href="javascript:;" class="search-btn fl" @click="doSearch">搜索</a>
					<i class="icon"></i>
					<i class="placeholder" v-if="search.Placeholder && !search.keyword"
						>{{search.default}}</i
					>
					<div class="keyword-list clearfix">
						<a href="javascript:;" class="fl">运动装备 7.5折起</a>
						<a href="javascript:;" class="fl">蚕丝被 431元起</a>
						<a href="javascript:;" class="fl">补水 保湿</a>
						<a href="javascript:;" class="nbr fl">抗皱家居服</a>
					</div>
				</div>
			</div>
			<nav>
				<ul class="catalog-href-list clearfix">
					<li class="catalog-href active fl">
						<a href="javascript:;" class="title">首页</a>
					</li>
                    <!-- @mouseover="getCatalog(index)" -->
					<!-- <li class="catalog-href fl" v-for='(item,index) in nav.list' :key="index"  @mouseover="nav.active=index" @mouseout="nav.active=-1" >
						<a href="javascript:;" class="title">{{item}}</a>
					</li> -->
                    <li class="catalog-href fl" v-for='(item,index) in nav.list' :key="index"  @mouseover="setNav(index)" @mouseout="setNav(-1)" >
						<a href="javascript:;" class="title">{{item}}</a>
					</li>
					<li class="catalog-href fl">
						<a href="javascript:;" class="title">为你严选</a>
					</li>
					<li class="catalog-href fl">
						<a href="javascript:;" class="title">众筹</a>
					</li>
				</ul>
				<div class="catalog-list" v-if="nav.active>-1" @mouseover="setNav(catalog_active)" @mouseout="setNav(-1)">
					<ul class="clearfix">
                        <!-- 获取条目对象数据加上当前索引 -->
						<li class="catalog-column fl" v-for ="(data,index) in $store.state.catalogs[nav.active]" :key="index">
							<div class="title">{{data.title}}</div>
							<div>
								<a href="#" class="catalog-item" v-for="(item,index) in data.children" :key="index">
                           
									<!-- <img :src="'http://api.zhinengshe.com/10001-you163/'+item.src+'?apikey=ebf6f58458de4b8fbad3afadd8c8a706'" alt="" /> -->

                                    <img :src="item.src|imgPath">
									<span>{{item.title}}</span>
								</a>
							</div>
						</li>
					</ul>
				</div>
			</nav>
		</div>
	</div>
</template>
<script>
export default {
	data() {
		return {
            search:{
                keyword: '',
                Placeholder: true,
                list: [], //搜索数据
                active:-1,//搜索上下选中
                show:false,
                timer:null,
                default:'张一山同款 开衫体恤'
            },
            nav:{
                list:['居家生活','服饰鞋包','美食酒水','个户清理','母婴亲子','运动旅行','数码家电'],
                active:-1,
                timer:null
            },
            catalog_active:-1,//同导航一起清除timer
			
		};
	},
	created() {
        this.search.keyword=this.$route.params.keyword;
    },
    // @input="getAutoComplete"改成watch
    // 一个数据很多地改watch适用
    watch:{
        async 'search.keyword'(){
            if (this.search.keyword) {
				try {
                    // this下有$http和axios都可
					let { data } = await this.axios({
                        // let { data } = await this.$http({
						url: '/searchautocomplete',
						method: 'GET',
						params: {
							kw: this.search.keyword,
						},
					});
                    this.search.list=data.data
				} catch (e) {
					console.log(e);
			    }
		    }else {
                // 监听没值时不显示列表
                this.search.list=[]
            }
        },
        // 一级类目监听二级类目
        'nav.active'(val){
            if(this.nav.active>-1){
                console.log(this.$store.getters.catalogs,'getters')
                this.$store.dispatch('getCatalog',this.nav.active)
            } 
        },
        // 跳路由时输入框清空
        '$route'(){
            if(this.$route.path.indexOf('/search')==-1){
            // if(this.$route.path!='/search'){
                this.search.keyword = ''
            }else {
                this.search.keyword=this.$route.params.keyword;
            }
        }
    },
	methods: {
        // 回车
        doSearch(){ 
            let keyword;
            if(this.search.active==-1){
                keyword = this.search.keyword;
            }else {
                keyword = this.search.list[this.search.active];
            }
            //输入值或默认值
            keyword=keyword||this.search.default;
            this.search.keyword = keyword;
            this.search.list=[];
            this.$refs['search-input'].blur()
            this.$router.push({name:'search',params:{keyword}})
        },
        // 导航鼠标短暂路过不显示子类导航，停留500在显示
        // 划过下边catalog-list时也清除定时器
        setNav(index){
            this.catalog_active=index;//临时存下效果上没什么用老师说要有这个思路
            clearTimeout(this.nav.timer) 
            this.nav.timer = setTimeout(()=>{
                this.nav.active=index;
            },500)

        },
        //请求vuex数据nav
        // getCatalog(index){
        //     this.nav.active =index;
        //     this.$store.dispatch('getCatalog',index)
        // }
        //input失去焦点列表点击
        hideAutoComplete(){
            setTimeout(()=>{
                this.search.Placeholder = true;
                this.search.show=false;
            },200)
        }
	},
	components: {},
    computed:{
        suggestActive:{
            get(){
                return this.search.active
            },
            set(val){
              if(val<0){
                 val = 0
              }else if(val>=this.search.list.length){
                    val= this.search.list.length-1;
              }
              this.search.active =val;
            }
        }
    }
};
</script>

<style scoped>
@import url(../../assets/css/base.css);
@import url(../../assets/css/header.css);
</style>
