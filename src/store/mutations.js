import { AUTH_SUCCESS, ERROR_MSG } from './mutation-types'
import { setRedirectTo } from '../utils'

export default {
  [AUTH_SUCCESS](state, action) {
    const { type, header } = action.data
    state.user = { ...action.data, redirectTo: setRedirectTo(type, header) }
  },
  [ERROR_MSG](state, action) {
    state.user = { ...state.user, msg: action.data }
  }
}
