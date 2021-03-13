<template>
  <div>
    <el-button type="primary"
               @click="$router.push({ name: 'add' })">添加</el-button>
    <el-table :data="$store.state">
      <el-table-column prop="name"
                       label="商品名称"></el-table-column>
      <el-table-column prop="price"
                       label="商品价格"></el-table-column>
      <el-table-column prop="count"
                       label="商品库存"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <!--scope.row.id是当前行数索引id从1开始 -->
          <el-button type="text"
                     size="small"
                     @click="
							$router.push({
								name: 'edit',
								params: { id: scope.row.id }
							})
						">修改</el-button>
          <el-button type="text"
                     class="del-btn"
                     size="small"
                     @click="del(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {}
  },
  methods: {
    async del(id) {
      try {
        await this.$confirm('确定删除吗', '删除', {
          confirmButtonText: '删除',
          cancelButtonText: '保留',
          type: 'danger'
        })
        console.log('删除')
        this.$store.dispatch('del', 1)
      } catch (e) {
        console.log('取消')
      }
    }
  },
  //   find该方法主要应用于查找第一个符合条件的数组元素
  created() {}
}
</script>
<style scoped>
.del-btn {
  color: red;
}
</style>
