import {
  AUTH_SUCCESS,
  ERROR_MSG,
  RECEIVE_USER,
  RESET_USER,
  RECEIVE_USER_LIST,
  RECEIVE_MSG_LIST,
  RECEIVE_MSG
} from './mutation-types'
import { setRedirectTo } from '../utils'

export default {
  [AUTH_SUCCESS](state, action) {
    const { type, header } = action.data
    state.user = { ...action.data, redirectTo: setRedirectTo(type, header) }
  },
  [ERROR_MSG](state, action) {
    state.user = { ...state.user, msg: action.data }
  },
  [RECEIVE_USER](state, action) {
    state.user = action.data
  },
  [RESET_USER](state, action) {
    state.user = { username: '', type: '', msg: action.data, redirectTo: '' }
  },
  [RECEIVE_USER_LIST](state, action) {
    state.userList = action.data
  },
  [RECEIVE_MSG_LIST](state, action) {
    const { users, chatMsgs, userid } = action.data
    state.chat = {
      users,
      chatMsgs,
      unReadCount: chatMsgs.reduce(
        (preTotal, msg) => preTotal + (!msg.read && msg.to === userid ? 1 : 0),
        0
      )
    }
  },
  [RECEIVE_MSG](state, action) {
    const { users, chatMsg, userid } = action.data
    state.chat = {
      users: users,
      chatMsgs: [...state.chat.chatMsgs, chatMsg],
      unReadCount:
        state.chat.unReadCount +
        (!chatMsg.read && chatMsg.to === userid ? 1 : 0)
    }
  }
}
