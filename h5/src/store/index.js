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
        msg:'',              // 消息内容
        type:'',             // 弹窗类型    alert 和  confirm
        confirmUrl:'',       // 确认链接
        confirmText:'',      // 确认文本
        confirmDo:null,      // 确认回调事件  type  function
        cancelUrl:'',        // 取消链接
        cancelText:'',       // 取消文本
        cancelDo:null,       // 取消回调事件  type  function
      },
    },
    vError:{
      show:false,
      option:{
        msg:''
      }
    },
    userInfo:{},             // 用户基本資訊  是否登录 等
    accountInfo:{},          // 账户基本資訊 资产資訊等
    childInfo:{},            // 亲子计划中的基本資訊
    lastVipPrd:'',
    pageTitle:'',            // 页面title
  },
  mutations,
  getters(){
    getUserInfo:(state)=>{
      return state.userInfo;
    }
  }
});

export default store
