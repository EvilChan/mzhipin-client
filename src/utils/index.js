/**
 * 工具函数
 */

/**
 * 用户主界面
 *  dashen: /dashen
 *  laoban: /laoban
 *
 * 用户信息完善界面路由
 *  dashen: /dasheninfo
 *  laoban: /laobaninfo
 *
 * 判断是否已经完善信息
 *  user.header是否有值
 *
 * 判断用户类型
 *  user.type
 */
export const setRedirectTo = (type, header) => {
  let path = type === 'laoban' ? '/laoban' : '/dashen'
  path = !header ? path + 'info' : path
  return path
}
