<template>
  <div id="app">
    {{ form }}
    <mt-header title="header标题">
      <mt-button slot="left"
                 icon="back">返回</mt-button>
      <mt-button slot="right">分享</mt-button>
    </mt-header>
    <mt-field v-model="form.username"
              label="用户名"
              placeholder="请输入用户名"></mt-field>
    <mt-field v-model="form.password"
              label="密码"
              type="password"
              placeholder="请输入密码"></mt-field>
    <mt-radio title="请选择性别"
              v-model="form.gender"
              :options="[
				{ value: 'male', label: '男' },
				{ value: 'falmale', label: '女' },
				{ value: 'other', label: '其他' }
			]"></mt-radio>
    <!-- <mt-radio
			title="请选择性别"
			v-model="form.gender"
			:options="metas.genders"
		></mt-radio> -->
    <mt-checklist title="列表"
                  v-model="form.languages"
                  :options="[
				{ value: 'js', label: 'javascript开发' },
				{ value: 'php', label: 'PHP开发' }
			]">
    </mt-checklist>

    <mt-cell title="用户名">YJUI</mt-cell>
    <mt-cell title="用户等级">高级用户</mt-cell>
    <!-- 可点击下页 -->
    <mt-cell title="点击页自行处理"
             is-link>15条</mt-cell>
    <!-- 有两条新的消息 -->
    <mt-cell title="私信">
      15条
      <mt-badge size="small">2</mt-badge>
    </mt-cell>
    <mt-cell title="提醒">
      <mt-switch v-model="form.b"> </mt-switch>
    </mt-cell>
    <!-- 读数据前用相当loading加载完替换，4种type -->
    <mt-cell title="消费记录">
      <mt-spinner type="fading-circle"></mt-spinner>
    </mt-cell>
    <!-- 像qq拖动出删除 -->
    <mt-cell-swipe title="张三"
                   v-if='show'
                   :right="[
                        {
                            content:'删除',
                            style:{background:'red',color:'white'},
                            handler:()=>{
                                this.show=false;
                            }
                        }
                    ]">
      15234322111
    </mt-cell-swipe>
    <mt-button type="primary"
               @click="sumbit"
               size="large">按钮</mt-button>
  </div>
</template>
<script>
// 就Toast需要单引
import { Toast } from 'mint-ui'
import * as metas from '@/libs/mates'

export default {
  data() {
    return {
      metas,
      show: true,
      form: {
        username: '',
        password: '',
        gender: '',
        languages: [],
        b: true
      }
    }
  },
  methods: {
    sumbit() {
      Toast({
        message: '短信验证已发送',
        position: 'center',
        duration: 5000
      })
    }
  }
}
</script>
