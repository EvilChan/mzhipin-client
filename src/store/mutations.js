import {
  AUTH_SUCCESS,
  ERROR_MSG,
  RECEIVE_USER,
  RESET_USER,
  RECEIVE_USER_LIST
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
  }
}
