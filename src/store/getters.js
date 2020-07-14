export default {
  getStateUser: state => state.user,
  getErrorMsg: state => state.user.msg,
  getRedirectTo: state => state.user.redirectTo
}
