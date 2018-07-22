let mutations = {
  // 全局彈窗相關方法
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
  // 用戶資訊設置等
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
  setMEVSUrl(state,mevsUrl){
    state.mevsUrl = mevsUrl
  },
  setnameUrl1(state,nameUrl1){
    state.nameUrl1 = nameUrl1
  },
  setnameUrl2(state,nameUrl2){
    state.nameUrl2 = nameUrl2
  },
  setnameUrl3(state,nameUrl3){
    state.nameUrl3 = nameUrl3
  },
  seturlIndex(state,urlIndex){
    state.urlIndex = urlIndex
  },
  setCurrentPage(state, current) {
    state.currentPage = current;
  },
  setCurrentTwoPage(state, current) {
    state.currentPageTwo = current;
  },
  setCurrentComPage(state, current) {
    state.currentComPage = current;
  }
}

export default mutations
