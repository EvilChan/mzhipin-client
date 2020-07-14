<template>
  <div>
    <van-nav-bar title="码 者 直 聘" />
    <Logo />
    <br />
    <van-cell-group>
      <van-cell class="error-msg" :value="msg" />
    </van-cell-group>
    <van-form @submit="onSubmit">
      <van-field
        v-model="username"
        name="username"
        label="用户名"
        placeholder="请输入用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="password"
        label="密码"
        placeholder="请输入密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px;">
        <van-button block type="primary" native-type="submit">
          登录
        </van-button>
        <router-link to="/register">
          <van-button block type="default" native-type="submit">
            未注册账户
          </van-button>
        </router-link>
      </div>
    </van-form>
  </div>
</template>

<script>
import Logo from '../components/Logo.vue'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Login',
  components: {
    Logo
  },
  data() {
    return {
      username: '',
      password: '',
      msg: ''
    }
  },
  methods: {
    ...mapGetters(['getErrorMsg', 'getRedirectTo']),
    ...mapActions(['login']),
    async onSubmit(values) {
      if (await this.login(values)) {
        this.$router.replace(this.getRedirectTo())
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
