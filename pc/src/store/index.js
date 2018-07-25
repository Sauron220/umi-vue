import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'

Vue.use(Vuex);
/**/
const store = new Vuex.Store({
  state: {
    vModal:{
      show:false,
      option:{
        msg:'',              // 消息內容
        type:'',             // 彈窗類型    alert 和  confirm
        confirmUrl:'',       // 確認連結
        confirmText:'',      // 確認文本
        confirmDo:null,      // 確認回調事件  type  function
        cancelUrl:'',        // 取消連結
        cancelText:'',       // 取消文本
        cancelDo:null,       // 取消回調事件  type  function
      },
    },
    userInfo:{},             // 用戶基本資訊  是否登錄 等
    accountInfo:{},          // 賬戶基本資訊 資產資訊等
    childInfo:{},            // 親子計劃中的基本資訊
    lastVipPrd:'',
    mevsUrl:'',
    nameUrl1:'',
    nameUrl2:'',
    nameUrl3:'',
    urlIndex:'',
    currentPage:'',
    currentPageTwo:'',
    currentComPage:'',
    currentUserInfo:{},
  },
  mutations,
  getters(){
    getUserInfo:(state)=>{
      return state.userInfo;
    }
  }
});

export default store
