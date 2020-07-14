import { reqRegister, reqLogin } from '../api'
import { AUTH_SUCCESS, ERROR_MSG } from './mutation-types'

// 授权成功的同步action
const authSuccess = user => ({ type: AUTH_SUCCESS, data: user })

// 错误提示信息的同步action
const errorMsg = msg => ({ type: ERROR_MSG, data: msg })

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
      commit(authSuccess(res.data))
      return true
    } else {
      commit(errorMsg(res.msg))
      return false
    }
  },
  async login({ commit }, user) {
    const { username, password } = user
    if (!username) return commit(errorMsg('用户名必须指定'))
    else if (!password) return commit(errorMsg('密码必须指定'))
    const res = await reqLogin(username, password)
    if (res.code === 0) {
      commit(authSuccess(res.data))
      return true
    } else {
      commit(errorMsg(res.msg))
      return false
    }
  }
}
