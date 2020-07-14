<template>
  <div class="refresh-div">
    <van-empty
      class="custom-image"
      :image="image(user.header)"
      :description="user.username"
    >
      {{ user.company }}
    </van-empty>
    <van-cell-group title="相关消息">
      <van-cell :title="post" />
      <van-cell :title="info" />
      <van-cell v-if="user.salary" :title="salary" />
    </van-cell-group>
    <van-button @click="logout" block type="danger">退出登陆</van-button>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { Dialog } from 'vant'
import Cookies from 'js-cookie'

export default {
  name: 'Personal',
  data() {
    return {
      post: '',
      info: '',
      salary: ''
    }
  },
  methods: {
    image(header) {
      if (header) return require(`../assets/images/${header}.png`)
      return ''
    },
    initData(user) {
      this.post = '职位：' + (user.post ? user.post : '')
      this.info = '简介：' + (user.info ? user.info : '')
      this.salary = '薪资：' + (user.salary ? user.salary : '')
    },
    logout() {
      Dialog.confirm({
        title: '退出',
        message: '确定退出登陆吗？'
      })
        .then(() => {
          Cookies.remove('userid')
          this.$store.commit('reset_user', '')
          this.$router.replace('/login')
        })
        .catch(() => {
          return null
        })
    }
  },
  created() {
    if (this.user._id) {
      this.initData(this.user)
    }
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {
    user(val) {
      if (val._id) {
        this.initData(val)
      }
    }
  }
}
</script>

<style lang="less">
.custom-image {
  .van-empty__image {
    width: 50px;
    height: 50px;
  }
  .van-empty__description {
    font-size: 21px;
    color: #000;
    padding-left: 15px;
    padding-right: 15px;
    margin-top: 15px;
    line-height: 1;
  }

  .van-empty__bottom {
    margin-top: 1px;
    color: gray;
  }
}
</style>
