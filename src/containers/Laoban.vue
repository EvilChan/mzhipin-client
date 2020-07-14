<template>
  <UserList :userList="list" :loading="loading" :type="type" />
</template>

<script>
import { mapState, mapActions } from 'vuex'
import UserList from '../components/UserList.vue'

export default {
  name: 'Laoban',
  components: {
    UserList
  },
  data() {
    return {
      list: [],
      type: 'dashen'
    }
  },
  created() {
    this.loading(this.type)
  },
  methods: {
    ...mapActions(['getUserList']),
    async loading(type) {
      if (await this.getUserList(type)) {
        this.list = this.userList
        return true
      }
      return false
    }
  },
  computed: {
    ...mapState(['userList'])
  },
  watch: {
    userList(val) {
      this.list = val
    }
  }
}
</script>
