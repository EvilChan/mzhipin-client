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

// 获取当前用户的聊天消息列表
export const reqChatMsgList = () => ajax(`${BASE_URL}/msglist`)

// 修改指定消息为已读
export const reqReadMsg = from => ajax(`${BASE_URL}/readmsg`, { from }, 'POST')
