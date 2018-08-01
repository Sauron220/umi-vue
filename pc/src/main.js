// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vueresource from 'vue-resource'
import VeeValidate from 'vee-validate'
import VueClipboard from 'vue-clipboard2'
import commonTool from './plugins/commonTool'
import customValidate from './plugins/customValidate'
// import vModal from './plugins/vModal'
import directive from './plugins/directive'
import store from './store/index'

Vue.use(VeeValidate,{
  events:'blur|input'
});
Vue.use(Vueresource);
Vue.use(VueClipboard);
Vue.use(commonTool);
Vue.use(customValidate);
// Vue.use(vModal);
Vue.use(directive);

Vue.config.productionTip = false

// 設置請求頭
var timer;  // 通過setTImeout來標識並記錄錯誤處理  在進行壹個新的錯誤處理的時候幹掉上壹個錯誤處理  避免多個錯誤出現
Vue.http.interceptors.push((request, next) => {
  next((response) => {
  if(response.body.errorInfo && response.body.errorInfo.errorCode){ // 請求正常
    if(response.body.errorInfo.errorCode == '9998'){                //if 登錄失效,
      clearTimeout(timer);
      timer = setTimeout(function () {
        location.href = '/login?remark=' + location.pathname;
      })
    }else if(response.body.errorInfo.errorCode != '0000'){          // 拋出後臺錯誤
      clearTimeout(timer);
      timer = setTimeout(function () {
        store.commit('setModal',{
          show:false,
          type:'alert',
          msg:response.body.errorInfo.errorMessage
        });
        store.commit('showModal');
      },500)
    }
  }else{
    if(request.url.indexOf('exportTradeMonthList') == -1) {
      clearTimeout(timer);
      timer = setTimeout(function () {
        store.commit('setModal',{
          show:false,
          type:'alert',
          msg:'未知異常，請稍後重試。'
        });
        store.commit('showModal');
      },500)
    }
  }
})
})




/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
