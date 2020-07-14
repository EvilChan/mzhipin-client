import ajax from './ajax'

const BASE_URL = '/api'

// 用户注册
export const reqRegister = user => ajax(`${BASE_URL}/register`, user, 'POST')

// 用户登陆
export const reqLogin = (username, password) =>
  ajax(`${BASE_URL}/login`, { username, password }, 'POST')

// 更新用户
export const reqUpdateUser = user => ajax(`${BASE_URL}/update`, user, 'POST')

// 获取用户信息
export const reqUser = () => ajax(`${BASE_URL}/user`)

// 获取用户列表
export const reqUserList = type => ajax(`${BASE_URL}/userlist`, { type })
