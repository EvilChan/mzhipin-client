<template>
  <div>
    <van-nav-bar title="大神信息完善" />
    <HeaderSelector :setHeader="setHeader" />
    <van-cell-group>
      <van-cell class="error-msg" :value="msg" />
    </van-cell-group>
    <van-cell>
      <van-field
        v-model="post"
        label="求职岗位："
        placeholder="请输入求职岗位"
      />
      <van-field
        v-model="info"
        type="textarea"
        label="个人介绍："
        placeholder="请输入个人介绍"
      />
    </van-cell>
    <van-button block type="primary" @click="updateUser1">保存</van-button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import HeaderSelector from '../components/HeaderSelector.vue'

export default {
  name: 'DashenInfo',
  components: {
    HeaderSelector
  },
  data() {
    return {
      sheader: '',
      post: '',
      info: '',
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
          info: this.info
        })
      ) {
        this.$router.replace('/dashen')
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
