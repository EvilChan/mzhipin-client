<template>
  <div>
    <van-nav-bar v-if="currentNav" :title="currentNav.title" />
    <router-view />
    <NavFooter v-if="currentNav" :navList="navList" />
  </div>
</template>

<script>
import Cookies from 'js-cookie'
import { mapGetters, mapActions } from 'vuex'
import NavFooter from '../components/NavFooter.vue'
import { setRedirectTo } from '../utils'

export default {
  name: 'Main',
  components: {
    NavFooter
  },
  data() {
    return {
      userid: Cookies.get('userid'),
      path: this.$route.path,
      currentNav: null,
      navList: [
        {
          path: '/laoban',
          title: '大神列表',
          icon: 'dashen',
          text: '大神'
        },
        {
          path: '/dashen',
          title: '老板列表',
          icon: 'laoban',
          text: '老板'
        },
        {
          path: '/message',
          title: '消息列表',
          icon: 'message',
          text: '消息'
        },
        {
          path: '/personal',
          title: '个人中心',
          icon: 'personal',
          text: '个人'
        }
      ]
    }
  },
  methods: {
    ...mapGetters(['getStateUser']),
    ...mapActions(['getUser']),
    navBarFooter(path) {
      if (path !== '/') {
        const user = this.getStateUser()
        const currentNav = this.navList.find(nav => nav.path === path)
        if (currentNav) {
          this.currentNav = currentNav
          if (user.type === 'laoban') {
            this.navList[1].hide = true
            this.navList[0].hide = false
          } else {
            this.navList[0].hide = true
            this.navList[1].hide = false
          }
        }
      }
    },
    async loading() {
      if (this.userid === undefined) {
        this.$router.replace('/login')
        this.$store.commit('reset_user', { data: '请先登陆' })
        return
      }
      const user = this.getStateUser()
      if (!user._id && !(await this.getUser())) {
        this.$router.replace('/login')
        this.$store.commit('reset_user', { data: '请先登陆' })
        return
      } else {
        const user = this.getStateUser()
        let path = this.path
        if (path === '/') {
          path = setRedirectTo(user.type, user.header)
          this.navBarFooter(path)
          return this.$router.replace(path)
        }
      }
    }
  },
  created() {
    this.loading()
    this.navBarFooter(this.path)
  }
}
</script>

<style lang="less" scoped></style>
