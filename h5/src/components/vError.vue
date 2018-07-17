<template>
    <div v-if="isShow">
        <div class="v-error">
            <span id="error-content">
                <i class="animated" :class="{'bounceInUp':isShow}">{{option.msg}}</i>
            </span>
        </div>
    </div>
</template>

<script>
  /**
   * 组件使用方法
   * 参数设置 this.$store.commit('setMsg', {
                  type: 'alert',
                  msg: '！',
                });
   * 显示：this.$store.commit('showMsg');
   * */

  export default {
    name: 'vError',
    data() {
      return {
        userInfo: {},
        accountInfo: {},
        loginUrl: '',
      }
    },
    created() {
      var self = this;
      self.loginUrl = '/login?remark=' + location.pathname;  // 设置带有跳转資訊的登录url
      self.$http.post('/pbap-web/action/user/query/whetherLogin', {}).then((res) => {
        self.userInfo = res.body.respInfo;
        self.$store.commit('setUserInfo', self.userInfo);
        if (self.userInfo.loginResult) {
          self.$http.post('/pbap-web/action/customer/query/personalAccount', {}).then((res) => {
            self.accountInfo = res.body.respInfo.personalAccView;
            self.$store.commit('setAccountInfo', self.accountInfo);
          })
        }
      });
      self.$http.post('/pbap-web/action/child/cusChildInfo', {}).then((res) => {
        if (res.body.respInfo.loginType != 0) {
          self.$store.commit('setChildInfo', res.body.respInfo.childInfo);
        }
      });
    },
    computed: {
      isShow() {
        return this.$store.state.vError.show
      },
      option() {
        return this.$store.state.vError.option
      },
    },
  }
</script>
