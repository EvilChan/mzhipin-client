import io from 'socket.io-client'
import {
  reqRegister,
  reqLogin,
  reqUpdateUser,
  reqUser,
  reqUserList,
  reqChatMsgList
} from '../api'
import {
  AUTH_SUCCESS,
  ERROR_MSG,
  RECEIVE_USER,
  RESET_USER,
  RECEIVE_USER_LIST,
  RECEIVE_MSG_LIST,
  RECEIVE_MSG
} from './mutation-types'

// 授权成功的同步action
const authSuccess = user => ({ type: AUTH_SUCCESS, data: user })

// 错误提示信息的同步action
const errorMsg = msg => ({ type: ERROR_MSG, data: msg })

// 接收用户的同步action
const receiveUser = user => ({ type: RECEIVE_USER, data: user })

// 重置用户的同步action
const resetUser = msg => ({ type: RESET_USER, data: msg })

// 获取用户列表的同步action
const receiveUserList = userList => ({
  type: RECEIVE_USER_LIST,
  data: userList
})

// 接收消息列表的同步action
const receiveMsgList = ({ users, chatMsgs, userid }) => ({
  type: RECEIVE_MSG_LIST,
  data: { users, chatMsgs, userid }
})

const initIO = (commit, userid) => {
  if (!io.socket) {
    io.socket = io('ws://localhost:4000')
    io.socket.on('receiveMsg', chatMsg => {
      console.log('客户端接收服务器消息：', chatMsg)
      if (userid === chatMsg.from || userid === chatMsg.to) {
        commit(receiveMsg(chatMsg, userid))
      }
    })
  }
}

// 接收一个消息的同步action
const receiveMsg = (chatMsg, user_id) => ({
  type: RECEIVE_MSG,
  data: { chatMsg, user_id }
})

// 异步获取消息列表数据
const getMsgList = async (commit, userid) => {
  initIO(commit, userid)
  const res = await reqChatMsgList()
  if (res.code === 0) {
    const { users, chatMsgs } = res.data
    commit(receiveMsgList({ users, chatMsgs, userid }))
  }
}

// 发送消息的异步action
export const sendMsg = ({ from, to, content }) => {
  console.log('客户端向服务器发消息', from, to, content)
  io.socket.emit('sendMsg', { from, to, content })
}

export default {
  // 注册异步 action
  async register({ commit }, user) {
    const { username, password, password2, type } = user
    if (!username) {
      return commit(errorMsg('用户名必须指定'))
    } else if (password !== password2) {
      return commit(errorMsg('2次密码要一致'))
    }
    const res = await reqRegister({ username, password, password2, type })
    if (res.code === 0) {
      getMsgList(commit, res.data._id)
      commit(authSuccess(res.data))
      return true
    } else {
      commit(errorMsg(res.msg))
      return false
    }
  },
  // 登陆异步 action
  async login({ commit }, user) {
    const { username, password } = user
    if (!username) return commit(errorMsg('用户名必须指定'))
    else if (!password) return commit(errorMsg('密码必须指定'))
    const res = await reqLogin(username, password)
    if (res.code === 0) {
      getMsgList(commit, res.data._id)
      commit(authSuccess(res.data))
      return true
    } else {
      commit(errorMsg(res.msg))
      return false
    }
  },
  // 更新用户异步 action
  async updateUser({ commit }, user) {
    const res = await reqUpdateUser(user)
    if (res.code === 0) {
      commit(receiveUser(res.data))
      return true
    } else {
      commit(resetUser(res.msg))
      return false
    }
  },
  // 获取用户异步action
  async getUser({ commit }) {
    const res = await reqUser()
    if (res.code === 0) {
      getMsgList(commit, res.data._id)
      commit(receiveUser(res.data))
      return true
    } else {
      commit(resetUser(res.msg))
      return false
    }
  },
  // 获取用户列表的异步action
  async getUserList({ commit }, type) {
    const res = await reqUserList(type)
    if (res.code === 0) {
      commit(receiveUserList(res.data))
      return true
    }
  }
}
