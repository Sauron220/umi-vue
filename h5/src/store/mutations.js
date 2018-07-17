let mutations = {
  // 全局弹窗相关方法
  showModal(state){
    state.vModal.show = true
  },
  hideModal(state){
    state.vModal.show = false
  },
  setModal(state,option){
    state.vModal.option = {};
    state.vModal.option = option;
  },
  // 设置提示消息
  setMsg(state,option){
    state.vError.option = {};
    state.vError.option = option;
  },
  showMsg(state){
    state.vError.show = true
  },
  hideMsg(state){
    state.vError.show = false
  },
  // 用户資訊设置等
  setUserInfo(state,userInfo){
    state.userInfo = userInfo
  },
  setAccountInfo(state,accountInfo){
    state.accountInfo = accountInfo
  },
  setChildInfo(state,childInfo){
    state.childInfo = childInfo
  },
  setLastVipPrd(state,lastVipPrd){
    state.lastVipPrd = lastVipPrd
  },
  // 页面title设置
  setPageTitle(state,pageTitle){
    state.pageTitle = pageTitle
  },
}

export default mutations
