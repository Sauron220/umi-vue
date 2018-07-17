<template>
    <div class="wrap set-content">
        <PageNav message="/profile"></PageNav>
        <div class="mui-content">
            <ul class="mui-table-view">
                <li class="mui-table-view-cell">银行存管账户
                    <span class="mui-navigate-right text-red" v-if="custInfo.activateStatus != 1"
                          @click="goChange" style="padding-right: 12px;">未开通</span>
                    <span v-if="custInfo.activateStatus == 1">已开通</span>
                </li>
                <li class="mui-table-view-cell">
                    <a class="mui-navigate-right" href="/changePwd">登录密码
                        <span class="show-it" style="padding-right: 12px;">已设置</span>
                    </a>
                </li>
                <li class="mui-table-view-cell">手机号码
                    <p id="cusMobile">{{custInfo.cusMobile}}</p>
                </li>
            </ul>
            <button type="button" class="mui-btn base-btn mui-btn-block" @click="logOut">安全退出</button>
        </div>

    </div>
</template>

<script>
  import PageNav from '@/components/PageNav'
  export default {
    name: 'Set',
    data () {
      return {
        pageTitle: '账户安全',
        custInfo: {},
        isOpen:'',
      }
    },
    created () {
      var self = this;
      self.$store.commit('setPageTitle', self.pageTitle);
      self.$http.post('/pbap-web/action/customer/query/custAuthInfo', {}).then((res) => {
        self.custInfo = res.body.respInfo.custInfo;
        if (self.custInfo.tpStatus == 0) {
          self.isOpen = '/openAccount';
        } else if (self.custInfo.tpStatus == 1) {
          if(self.custInfo.activateStatus != 1){
            self.isOpen = '/activateAccount';
          }
        }
      });
    },
    components : {
      'PageNav': PageNav,
    },
    methods: {
      logOut() {
        var self = this;
        self.$http.post('/pbap-web/action/user/query/logout', {}).then((res) => {
          location.href = '/'
        })
      },
      goChange() {
        location.href = '/openAccount'
      }
    }
  }
</script>
