<template>
  <div>
    <el-card class="card">

      <div slot="header"
           class='header'>
        <span>简历介绍</span>
      </div>
      {{form}}
      <el-steps :active="step"
                simple>
        <el-step title="基本信息"></el-step>
        <el-step title="教育经历"></el-step>
        <el-step title="工作经验"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
      <!-- 1-->
      <el-form class="form"
               v-if="step==0"
               label-width='100px'>
        <el-form-item label='姓名'>
          <el-input v-model='form.name'></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model='form.gender'>
            <el-radio v-for="(val,key) in metas.genders"
                      :key='key'
                      :label='val'>{{val}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- <el-button @click="form.language=[]">全部取消</el-button> -->
        <el-form-item label="熟悉的语言">
          <el-checkbox-group v-model='form.language'>
            <el-button @click="form.language=[]">全部取消</el-button>
            <el-checkbox v-for="(val,key) in metas.languages"
                         :key='key'
                         :label="key">{{val}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>

        <el-form-item label="年龄">
          <el-input-number v-model="form.age"
                           :min="18"
                           :max="60"></el-input-number>
        </el-form-item>
        <el-form-item label='职位'>
          <el-select v-model="form.job">
            <el-option v-for="(val,key) in metas.jobs"
                       :key="key"
                       :label="val"
                       :value="key">{{val}}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label='是否接受调岗'>
          <el-switch v-model='form.accept'
                     active-color="#13ce66"
                     inactive-color="#ff4949">

          </el-switch>
        </el-form-item>
        <el-form-item label="期望薪资">
          <el-slider v-model="form.salary"
                     :step='1000'
                     :min="5000"
                     :max="30000"></el-slider>
        </el-form-item>
        <el-form-item label="预约时间">
          <el-time-select v-model="form.time"
                          :picker-options="{
              start:'08:30',
              step:'01:00',
              end:'18:30'
          }"></el-time-select>
        </el-form-item>
      </el-form>
      <el-form label-width='100px'
               v-if='step==1'>
        <el-button @click="educations++;form.educations.push({})">添加一项</el-button>
        <el-collapse v-model="actives">
          <!-- i值1和2 -->
          <el-collapse-item v-for="i in educations"
                            :key="i">
            <el-form-item label="学历">
              <el-select v-model='form.educations[i-1].edu'>
                <el-option v-for='(val,key) in metas.educations'
                           :key="key"
                           :label="val"
                           :value="key">{{val}}</el-option>
              </el-select>

            </el-form-item>
            <el-form-item label="学校">
              <el-input v-model="form.educations[i-1].school"> </el-input>
            </el-form-item>
            <!--  @click="educations--;form.educations.splice(i-1,1)" -->
            <el-button type="danger"
                       @click="delete_education(i-1)">删除</el-button>
          </el-collapse-item>
        </el-collapse>

      </el-form>
      <el-form v-if='step==2'>2</el-form>
      <el-form v-if='step==3'>3</el-form>
      <el-row>
        <el-col :span="12">
          <el-button :disabled='step==0'>
            <i class="el-icon-d-arrow-left"
               @click='step--'>返回</i>
          </el-button>
        </el-col>
        <el-col :span="12"
                style="text-align:right">
          <el-button type="primary"
                     v-if="step!=3"
                     @click="step++">下一页<i class="el-icon-d-arrow-right"></i></el-button>
          <el-button type="primary"
                     v-if='step==3'
                     @click="submit">提交</el-button>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>
<script>
/**
 * v-for 循环数字从1开始索引
 *form.educations.splice(i-1,1)与$delete(form.educations,i-1)等价
 */
// 工作经验和教育经历差不多所以没弄， 找不到接口找不到都是404，报多少看服务器抛多少
import * as metas from '@/libs/mates'
export default {
  data() {
    return {
      step: 1,
      actives: [],
      metas,
      educations: 2,
      // form.educations[i-1].edu 动态添加json
      form: {
        name: '',
        gender: '',
        language: [],
        age: '18',
        job: '',
        accept: false,
        salary: 0,
        time: '',
        educations: [{}, {}] //对应educations: 2的2装它
      }
    }
  },
  methods: {
    submit() {
      // 加headers给服务器看的不加解析不对
      fetch('api/submit', {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(this.form)
      })
    },
    async delete_education(index) {
      //   type表示确定的删除按钮是红色
      try {
        await this.$confirm('是否确定删除此教育经历', '删除确认', {
          confirmButtonText: '删除',
          cancelButtonText: '保留',
          type: 'danger'
        })
        this.$delete(this.form.educations, index)
        this.educations--
        console.log('删除')
      } catch (e) {
        console.log('取消')
      }
    }
  }
}
</script>
<style scoped>
.header {
  text-align: center;
}
.card {
  width: 700px;
  margin: 50px auto 0;
}
.form {
  margin-top: 40px;
}
</style>
