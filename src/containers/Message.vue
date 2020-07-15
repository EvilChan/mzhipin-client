<template>
  <div>
    <van-cell
      v-for="msg in lastMsgs"
      :key="msg._id"
      center
      is-link
      :title="targetUser($store.state)(targetUserId(msg, user)).username"
      :label="msg.content"
      @click="handleClick(targetUserId(msg, user))"
    >
      <template #icon>
        <van-image
          width="25"
          height="25"
          class="message-img"
          :src="
            require(`../assets/images/${
              targetUser($store.state)(targetUserId(msg, user)).header
            }.png`)
          "
        />
      </template>
      <van-icon class="badge" :badge="msg.unReadCount" />
    </van-cell>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'Message',
  data() {
    return {
      lastMsgs: []
    }
  },
  methods: {
    ...mapGetters(['targetUser']),
    getLastMsgs(chatMsgs, userid) {
      const lastMsgObjs = {}
      chatMsgs.forEach(msg => {
        if (msg.to === userid && !msg.read) {
          msg.unReadCount = 1
        } else {
          msg.unReadCount = 0
        }

        const chatId = msg.chat_id
        const lastMsg = lastMsgObjs[chatId]
        if (!lastMsg) {
          lastMsgObjs[chatId] = msg
        } else {
          const unReadCount = lastMsg.unReadCount + msg.unReadCount
          if (msg.create_time > lastMsg.create_time) {
            lastMsgObjs[chatId] = msg
          }
          lastMsgObjs[chatId].unReadCount = unReadCount
        }
      })

      const lastMsgs = Object.values(lastMsgObjs)
      lastMsgs.sort((m1, m2) => {
        return m2.create_time - m1.create_time
      })
      return lastMsgs
    },
    targetUserId(msg, user) {
      return msg.to === user._id ? msg.from : msg.to
    },
    handleClick(targetUserId) {
      this.$router.history.push(`/chat/${targetUserId}`)
    }
  },
  created() {
    this.lastMsgs = this.getLastMsgs(this.chat.chatMsgs, this.user._id)
  },
  computed: {
    ...mapState(['user', 'chat', 'userList'])
  },
  watch: {
    chat(val) {
      this.lastMsgs = this.getLastMsgs(val.chatMsgs, this.user._id)
    }
  }
}
</script>

<style lang="less" scoped>
.badge .van-info {
  top: -5px;
  right: 10px;
}
.message-img {
  margin-right: 10px;
}
</style>
