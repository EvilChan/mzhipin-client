<template>
  <van-pull-refresh
    class="refresh-div"
    v-model="isLoading"
    @refresh="onRefresh"
    success-text="刷新成功"
  >
    <van-cell-group
      class="cell-group-module"
      v-for="user in userList"
      :key="user._id"
      @click="onChat(user._id)"
    >
      <van-cell class="cell-reset">
        <van-row type="flex" justify="space-between" align="center">
          <van-col span="4">
            <van-image width="50" height="50" :src="formatImg(user.header)" />
          </van-col>
          <van-col span="4">
            {{ user.username }}
          </van-col>
        </van-row>
      </van-cell>
      <van-cell class="cell-reset">
        <van-row type="flex" align="center">
          <van-col>职位：{{ user.post }}</van-col>
        </van-row>
      </van-cell>
      <van-cell v-if="user.company" class="cell-reset">
        <van-row type="flex" align="center">
          <van-col>公司：{{ user.company }}</van-col>
        </van-row>
      </van-cell>
      <van-cell class="cell-reset">
        <van-row type="flex" align="center">
          <van-col>月薪：{{ user.salary }}</van-col>
        </van-row>
      </van-cell>
      <van-cell class="cell-reset">
        <van-row type="flex" align="center">
          <van-col>描述：{{ user.info }}</van-col>
        </van-row>
      </van-cell>
    </van-cell-group>
  </van-pull-refresh>
</template>

<script>
export default {
  name: 'UserList',
  props: {
    userList: Array,
    loading: Function,
    type: String
  },
  data() {
    return {
      isLoading: false
    }
  },
  methods: {
    formatImg(header) {
      if (header) {
        return require(`../assets/images/${header}.png`)
      }
      return null
    },
    onRefresh() {
      setTimeout(async () => {
        if (await this.loading(this.type)) {
          this.isLoading = false
        }
      }, 1000)
    },
    onChat(userid) {
      this.$router.history.push(`/chat/${userid}`)
    }
  }
}
</script>

<style lang="less" scoped>
.cell-group-module {
  margin: 15px;

  .cell-reset {
    padding-left: 16px;
    padding-top: 5px;
    padding-bottom: 5px;
  }
}
.cell-reset .van-cell__value {
  color: #000;
}
</style>
