<template>
  <div>
    <van-nav-bar v-if="currentNav" :title="currentNav.title" />
    <router-view />
    <NavFooter v-if="currentNav" :navList="navList" :unReadCount="count" />
  </div>
</template>

<script>
import Cookies from 'js-cookie'
import { mapState, mapActions } from 'vuex'
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
      currentNav: '',
      count: 0,
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
    ...mapActions(['getUser']),
    navBarFooter(user, path) {
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
    },
    async loading(user) {
      if (this.userid === undefined) {
        this.$router.replace('/login')
        this.$store.commit('reset_user', { data: '请先登陆' })
        return
      }
      if (!user._id && !(await this.getUser())) {
        this.$router.replace('/login')
        this.$store.commit('reset_user', { data: '请先登陆' })
        return
      } else {
        let path = this.$route.path
        if (path === '/') {
          path = setRedirectTo(user.type, user.header)
          return this.$router.replace(path)
        }
      }
    }
  },
  created() {
    this.loading(this.user)
    this.navBarFooter(this.user, this.$route.path)
  },
  computed: {
    ...mapState(['user', 'chat'])
  },
  watch: {
    user(val) {
      this.loading(val)
    },
    $route: {
      handler(val) {
        this.navBarFooter(this.user, val.path)
      }
    },
    chat(val) {
      this.count = val.unReadCount
    }
  }
}
</script>

<style lang="less" scoped></style>
