<template>
    <div class="list-bg">
      <div class="page">
        <cmpCrumbs :pathArr="[{
            url:`/search/+$route.params.keyword`,title:keyword
        }]"/>
        <div class="item-list-container">
          <div class="filter clearfix">
            <span class="name fl">分类：</span>
            <a href="#" class="fl">居家生活</a>
            <a href="#" class="fl">母婴亲子</a>
            <a href="#" class="fl">全球特色</a>
            <a href="#" class="fl">数码家电</a>
            <a href="#" class="fl">运动旅行</a>
          </div>
          <cmpList :list = 'searchResult' v-if="searchResult"/>
          <div v-else>loading...</div>
         <cmpPagination :cur='page.cur' :total ="page.total" @change="pageChange"/>
        </div>
      </div> 
    </div>
</template>

<script>
import cmpCrumbs from '@/components/common/cmp-crumbs.vue'
import cmpPagination from '@/components/common/cmp-pagination.vue'
import cmpList from '@/components/search/cmp-list.vue'
export default {
  data() {
    return {
        keyword: this.$route.params.keyword,
        page: {
            cur: 1,
            total: 0
        },
        searchResult: null,
    }
  },
  components: {
    cmpCrumbs,cmpPagination,cmpList
  },
  async created(){
      await this.getData();
  },
  watch:{
    //   '$route'(){
    //       console.log(this.$route)
    //   }
  },
  methods:{

    // 子组件$emit过来的值直接接收
    async pageChange(page){
        this.page.cur= page
        await this.getData()
        
    },
    async getData(){
        let {data:{err,msg,data}}= await this.axios('/search',{
            method: 'GET',
            params: {
                keyword: this.keyword,
                page: this.page.cur,
            }
        })
        if(err){
            alert(msg)
        }else {
            console.log(data) ; 
            this.searchResult = data.list;
            this.page.total = data.pagecount;
        }
    }
  },
}
</script>

<style scoped>
/* 搜索 */
.list-bg {
	background: #f5f5f5;
	border-top: 1px solid #e2e2e2;
}

.item-list-container {
	width: 1010px;
	padding: 0 40px;
	background: #fff;
}
.item-list-container .filter {
	margin-top: 10px;
	padding-top: 30px;
	border-bottom: 1px solid #eaeaea;
}
.item-list-container .filter .name {
	color: #999;
	font-size: 14px;
	margin-right: 28px;
}
.item-list-container .filter a {
	margin-right: 30px;
	margin-bottom: 16px;
	font-size: 14px;
	color: #333;
}
.item-list-container .filter a:hover {
	color: #b4a078;
}

.order-type-list li {
	padding: 1px;
	border: 1px solid #ddd;
	margin-right: 10px;
	margin-bottom: 15px;
}
.order-type-list li.cur {
	padding: 0;
	border: 2px solid #b4a078;
}
.order-type-list li a {
	display: block;
	padding: 0 16px;
	height: 26px;
	line-height: 26px;
	font-size: 12px;
	color: #333;
}

</style>
