// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'lib-flexible'
import Vueresource from 'vue-resource'
import VeeValidate from 'vee-validate'
import commonTool from './plugins/commonTool'
import customValidate from './plugins/customValidate'
import store from './store/index'
import vCookie from 'vue-cookie'
import VueSee from 'vue-see'
import VueScroller from 'vue-scroller'

var options={}
Vue.use(VueSee,options)

Vue.use(VueScroller)
Vue.use(Vueresource);
Vue.use(commonTool);
Vue.use(customValidate);
Vue.use(vCookie);
Vue.use(VeeValidate,{
  events:'blur|input'
});

Vue.config.productionTip = false

// 设置请求头
Vue.http.interceptors.push((request, next) => {
  next((response) => {
    if(response.body.errorInfo && response.body.errorInfo.errorCode){
      if(response.body.errorInfo.errorCode == '9998'){         //if 登录失效,
        location.href = '/login?remark=' + location.pathname;
      }else if(response.body.errorInfo.errorCode != '0000'){   // 抛出后台错误
        store.commit('setModal',{
          show:false,
          type:'alert',
          msg:response.body.errorInfo.errorMessage
        });
        store.commit('showModal');
      }
    }else{
      store.commit('setModal',{
        show:false,
        type:'alert',
        msg:'未知异常，请稍后重试。'
      });
      store.commit('showModal');
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
