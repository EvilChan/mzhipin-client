<template>
  <div>
    <van-nav-bar title="老板信息完善" />
    <HeaderSelector :setHeader="setHeader" />
    <van-cell-group>
      <van-cell class="error-msg" :value="msg" />
    </van-cell-group>
    <van-cell>
      <van-field
        v-model="post"
        label="招聘岗位："
        placeholder="请输入招聘岗位"
      />
      <van-field
        v-model="company"
        label="公司名称："
        placeholder="请输入公司名称"
      />
      <van-field
        v-model="salary"
        label="职位薪资："
        placeholder="请输入职位薪资"
      />
      <van-field
        v-model="info"
        type="textarea"
        label="职位要求："
        placeholder="请输入职位要求"
      />
    </van-cell>
    <van-button block type="primary" @click="updateUser1">保存</van-button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import HeaderSelector from '../components/HeaderSelector.vue'

export default {
  name: 'LaobanInfo',
  components: {
    HeaderSelector
  },
  data() {
    return {
      sheader: '',
      post: '',
      info: '',
      company: '',
      salary: '',
      msg: ''
    }
  },
  methods: {
    ...mapGetters(['getErrorMsg']),
    ...mapActions(['updateUser']),
    setHeader(text) {
      this.sheader = text
    },
    async updateUser1() {
      if (
        await this.updateUser({
          header: this.sheader,
          post: this.post,
          info: this.info,
          company: this.company,
          salary: this.salary
        })
      ) {
        this.$router.replace('/laoban')
      } else {
        this.msg = this.getErrorMsg()
      }
    }
  }
}
</script>

<style lang="less" scoped>
.error-msg .van-cell__value--alone {
  text-align: center;
  color: red;
}
</style>
