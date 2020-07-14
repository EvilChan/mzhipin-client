import ajax from './ajax'

const BASE_URL = '/api'

// 用户注册
export const reqRegister = user => ajax(`${BASE_URL}/register`, user, 'POST')

// 用户登陆
export const reqLogin = (username, password) =>
  ajax(`${BASE_URL}/login`, { username, password }, 'POST')
