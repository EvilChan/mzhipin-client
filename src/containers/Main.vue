<template>
  <div>
    <router-view />
  </div>
</template>

<script>
import Cookies from 'js-cookie'
import { mapGetters, mapActions } from 'vuex'
export default {
  data() {
    return {
      userid: Cookies.get('userid')
    }
  },
  methods: {
    ...mapGetters(['getStateUser']),
    ...mapActions(['getUser'])
  },
  async created() {
    if (this.userid === undefined) {
      this.$router.replace('/login')
      this.$store.commit('reset_user', { data: '请先登陆' })
      return
    }
    const user = this.getStateUser()
    if (!user._id) {
      if (!(await this.getUser())) {
        this.$router.replace('/login')
        this.$store.commit('reset_user', { data: '请先登陆' })
        return
      }
    }
  }
}
</script>

<style></style>
