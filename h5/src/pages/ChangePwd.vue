<template>
    <div class="wrap changePwd-content">
        <PageNav message="/set"></PageNav>
        <form class="mui-input-group red-form" action="" method="post" submit="changePwd" novalidate id="changePwdForm">
            <div class="mui-input-row base-input-box">
                <input type="password" v-if="!showPwd" v-model="pwd" minlength="6" maxlength="20"
                 autocomplete="new-password" placeholder="当前登录密码" class="input-bar mui-input-password"
                @focus="pwdTips=true" @blur="pwdTips=false"
                v-validate="{rules:{required:true,pwd:true}}" name="pwd">
                <input type="text" v-if="showPwd" v-model="pwd" minlength="6" maxlength="20"
                       autocomplete="new-password" placeholder="当前登录密码" class="input-bar mui-input-password"
                       @focus="pwdTips=true" @blur="pwdTips=false"
                       v-validate="{rules:{required:true,pwd:true}}" name="pwd">
                <span class="icon cipherText" :class="showPwd?'icon-eye-open':'icon-eye-close'"
                      @click="showPwd = !showPwd"></span>
                <i class="p-error">{{errors.first('pwd')}}</i>
            </div>
            <div class="mui-input-row base-input-box">
                <input type="password" v-if="!showPwdNew" v-model="pwdNew" minlength="6" maxlength="20"
                       autocomplete="new-password" placeholder="新的登录密码" class="input-bar mui-input-password"
                       @focus="pwdNewTips=true" @blur="pwdNewTips=false"
                       v-validate="{rules:{required:true,pwd:true}}" name="pwdNew">
                <input type="text" v-if="showPwdNew" v-model="pwdNew" minlength="6" maxlength="20"
                       autocomplete="new-password" placeholder="新的登录密码" class="input-bar mui-input-password"
                       @focus="pwdNewTips=true" @blur="pwdNewTips=false"
                       v-validate="{rules:{required:true,pwd:true}}" name="pwdNew">
                <span class="icon cipherText" :class="showPwdNew?'icon-eye-open':'icon-eye-close'"
                      @click="showPwdNew = !showPwdNew"></span>
                <i class="p-error">{{errors.first('pwdNew')}}</i>
            </div>
            <button type="button" class="mui-btn base-btn mui-btn-block" @click="changePwd">确认</button>
        </form>

    </div>
</template>

<script>
  import PageNav from '@/components/PageNav'
  const dictionary = {
    en: {
      custom: {
        pwd: {
          required(){
            return '请输入当前登录密码'
          }
        },
        pwdNew: {
          required(){
            return '请输入新登录密码'
          }
        },
      }
    }
  };
  export default {
    name: 'ChangePwd',
    data () {
      return {
        pageTitle: '修改登录密码',
        showPwd: false,
        showPwdNew: false,
        pwd: '',
        pwdNew: '',
        pwdTips: false,
        pwdNewTips: false,
      }
    },
    created(){
      var self = this;
      self.$store.commit('setPageTitle', self.pageTitle);
    },
    components: {
      'PageNav': PageNav,
    },
    mounted () {
      this.$validator.updateDictionary(dictionary);
    },
    methods: {
      changePwd(){
        var self = this;
        self.$http.post('/pbap-web/action/user/upt/changePassword', {
          "usrPwd" : self.pwd,
          "newUsrPwd" : self.pwdNew
        }).then(response => {
          if (response.body.errorInfo.errorCode == '0000') {  // 成功跳转
            self.$store.commit('setModal',{
              show:false,
              type:'alert',
              msg:'登录密码修改成功',
              confirmUrl:'/set'
            });
            self.$store.commit('showModal');
          }
        });
      }
    }
  }
</script>
