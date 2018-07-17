export default {
  showLoginConfirm(){
    var self = this;
    console.log(self.$route.fullPath)
    self.$store.commit('setModal', {
      show: false,
      type: 'confirm',
      msg: '您还未登录，请先登录',
      confirmUrl: '/login?remark='+self.$route.fullPath,
      confirmText: '去登录'
    });
    self.$store.commit('showModal');
  }
}