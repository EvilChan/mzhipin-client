<template>
  <div>
    <van-nav-bar
      class="navbar-fixed"
      left-arrow
      :title="targetUsername"
      @click-left="goBack"
    />

    <div class="msg-list">
      <div v-for="msg in msgs" :key="msg._id">
        <Msg
          v-if="msg.to === user._id"
          :content="msg.content"
          :image="targetIcon"
        />
        <Msg
          v-else
          justify="end"
          :content="msg.content"
          :image="readImg(user.header)"
        />
      </div>
    </div>

    <van-cell-group class="msg-bottom">
      <van-row align="center">
        <van-col span="18">
          <van-field
            @focus="onFocusEmoji"
            v-model="content"
            placeholder="请输入"
          />
        </van-col>
        <van-col span="2">
          <van-button @click="changeToggleEmojis" block type="default">
            😀
          </van-button>
        </van-col>
        <van-col span="4">
          <van-button block type="primary" @click="handleSend">发送</van-button>
        </van-col>
      </van-row>

      <van-grid v-show="isToggleEmojis" square column-num="8">
        <van-grid-item
          v-for="count in 32"
          :key="count"
          @click="addContent(emojis[count])"
        >
          {{ emojis[count] }}
        </van-grid-item>
      </van-grid>
    </van-cell-group>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
import { mapState, mapGetters, mapActions } from 'vuex'
import { emojis } from '../utils'
import { sendMsg } from '../store/actions'
import Msg from '../components/Msg.vue'

export default {
  name: 'Chat',
  components: {
    Msg
  },
  data() {
    return {
      userid: Cookies.get('userid'),
      content: '',
      emojis,
      isToggleEmojis: false,
      msgs: [],
      targetId: this.$route.params.userid,
      targetUsername: '',
      targetHeader: '',
      targetIcon: ''
    }
  },
  methods: {
    ...mapGetters(['targetUser']),
    ...mapActions(['getUser']),
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
      }
    },
    loading2(user, chat) {
      const { users, chatMsgs } = chat
      const meid = user._id
      if (!users[meid]) return
      const targetId = this.targetId
      const chatId = [meid, targetId].sort().join('_')
      this.msgs = chatMsgs.filter(msg => msg.chat_id === chatId)
    },
    loading3() {
      const user = this.targetUser(this.$store.state)(this.targetId)
      if (user) {
        this.targetUsername = user.username
        this.targetHeader = user.header
        this.targetIcon = this.targetHeader
          ? require(`../assets/images/${this.targetHeader}.png`)
          : null
      }
    },
    goBack() {
      this.$router.history.go(-1)
    },
    readImg(header) {
      return header ? require(`../assets/images/${header}.png`) : null
    },
    changeToggleEmojis() {
      this.isToggleEmojis = !this.isToggleEmojis
    },
    onFocusEmoji() {
      this.isToggleEmojis = false
    },
    addContent(emoji) {
      this.content += emoji
    },
    handleSend() {
      const from = this.user._id
      const to = this.$route.params.userid
      sendMsg({ from, to, content: this.content })
      this.content = ''
      this.isToggleEmojis = false
    }
  },
  created() {
    this.loading(this.user)
    this.loading2(this.user, this.chat)
    this.loading3()
  },
  mounted() {
    window.scrollTo(0, window.document.body.scrollHeight)
  },
  updated() {
    window.scrollTo(0, window.document.body.scrollHeight)
  },
  computed: {
    ...mapState(['user', 'chat'])
  },
  watch: {
    user(val) {
      this.loading(val)
    },
    chat(val) {
      this.loading2(this.user, val)
      this.loading3()
    }
  }
}
</script>

<style lang="less" scoped>
.navbar-fixed {
  position: fixed;
  top: 0;
  width: 100%;
}
.msg-list {
  margin-top: 46px;
  margin-bottom: 44px;
}
.msg-bottom {
  position: fixed;
  bottom: 0;
  width: 100%;
}
</style>
