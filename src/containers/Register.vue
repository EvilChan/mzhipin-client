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
      <van-field
        v-model="password2"
        type="password"
        name="password2"
        label="确认密码"
        placeholder="请再次输入密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <van-field name="type" label="用户类型">
        <template #input>
          <van-radio-group v-model="type" direction="horizontal">
            <van-radio name="dashen">大神</van-radio>
            <van-radio name="laoban">老板</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <div style="margin: 16px;">
        <van-button block type="primary" native-type="submit">
          注册
        </van-button>
        <router-link to="/login">
          <van-button block type="default" native-type="submit">
            已有账户
          </van-button>
        </router-link>
      </div>
    </van-form>
  </div>
</template>

<script>
import Logo from '../components/Logo.vue'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Register',
  components: {
    Logo
  },
  data() {
    return {
      username: '',
      password: '',
      password2: '',
      type: 'dashen',
      msg: ''
    }
  },
  methods: {
    ...mapGetters(['getErrorMsg', 'getRedirectTo']),
    ...mapActions(['register']),
    async onSubmit(values) {
      if (await this.register(values)) {
        this.$router.replace(this.getRedirectTo())
      } else {
        this.msg = this.getErrorMsg()
      }
    }
  },
  mounted() {
    this.msg = this.getErrorMsg()
  },
  beforeDestroy() {
    if (this.getErrorMsg()) {
      this.$store.commit('reset_user', '')
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
