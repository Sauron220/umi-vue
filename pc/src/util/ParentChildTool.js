export default {
  showLoginConfirm(){
    var self = this;
    // console.log(self.$route.fullPath)
    self.$store.commit('setModal', {
      show: false,
      type: 'confirm',
      msg: '您還未登錄，請先登錄',
      confirmUrl: '/login?remark='+self.$route.fullPath,
      confirmText: '去登錄'
    });
    self.$store.commit('showModal');
  }
}
