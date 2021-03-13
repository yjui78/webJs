<template>
  <div>
    <el-card class="card">
      <div slot="header">
        {{ edit ? '修改' : '添加' }}
      </div>
      <el-form ref="form"
               :model='form'
               :rules="rules"
               label-width="100px">
        <el-form-item label="名称"
                      prop='name'>
          <el-input type="text"
                    v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="价格"
                      prop='price'>
          <el-input type="text"
                    v-model="form.price"></el-input>
        </el-form-item>
        <el-form-item label="库存"
                      prop='count'>
          <el-input type="text"
                    v-model="form.count"></el-input>
        </el-form-item>
        <el-row>
          <el-button type="primary"
                     @click="submit">{{
						edit ? '修改' : '添加'
					}}</el-button>
          <el-button @click="$router.back()">返回</el-button>
        </el-row>
      </el-form>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    // var a = this.$store.getters.getDataById
    // a(1)
    return {
      edit: this.$route.params.id != null,
      //  修改时带数据，二者相同用getters提取更好，把判断放getters中
      //   form:this.$store.state.find(item => item.id == this.$route.params.id) || {}
      form: this.$store.getters.getDataById(this.$route.params.id) || {},
      //   elementui  校验:rules="rules"是框架规定的，
      rules: {
        name: [
          {
            required: true,
            message: '请填写商品名称',
            trigger: ['change', 'blur']
          },
          { min: 3, message: '最少3字', trigger: 'change' },
          { max: 20, message: '最多20字', trigger: 'change' }
        ],
        price: [],
        count: []
      }
    }
  },
  methods: {
    submit() {
      console.log(this)
      //   在用了elementui时ref=form用this.$refs.form上有validate方法会检验表单是不是合法的会返回一个值让你知道能不能去提交，会有个是否ok，ok是true,要不是就false,是个回调函数
      //   this.$refs.form.validate(function(ok) {这样写时this要指定下vue实例
      this.$refs.form.validate(ok => {
        if (ok) {
          // 校验成功做事
          if (this.edit) {
            this.$store.dispatch('edit', {
              id: this.$route.params.id,
              form: this.form
            })
            this.$message('修改成功')
          } else {
            this.$store.dispatch('add', this.form)
            this.$message('添加成功')
          }
          this.$router.push({ name: 'list' })
        }
      })
    }
  }
}
</script>



<style scoped>
.card {
  width: 600px;
  margin: 50px auto 0;
}
</style>

