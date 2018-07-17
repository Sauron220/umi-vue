<template>
    <div class="wrap login-content">
        <header class="top-nav log-reg-top">
            <div class="nav-box mui-bar mui-bar-nav">
                <a :href="goBackBtn()" class="go-back mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
                <a class="top-link go-reg" href="/register">立即注册</a>
                <h1 class="mui-title"></h1>
            </div>
        </header>
        <form action="" onsubmit="return false" class="mui-input-group">
            <div class="mui-input-row base-input-box">
                <input type="text" v-model="phone" class="input-bar" name="phone"
                       placeholder="手机号" autocomplete="off" maxlength="11"
                       v-validate="{rules:{required:true,digits:11,phoneNum:true}}">
                <i class="p-error">{{errors.first('phone')}}</i>
            </div>
            <div class="mui-input-row base-input-box">
                <input type="password" v-if="!showPwd" v-model="pwd" minlength="6" maxlength="20"
                       placeholder="登录密码" class="input-bar mui-input-password"
                       v-validate="{rules:{required:true,pwd:true}}" name="pwd">
                <input type="text" v-if="showPwd" v-model="pwd" minlength="6" maxlength="20"
                       placeholder="登录密码" class="input-bar mui-input-password"
                       v-validate="{rules:{required:true,pwd:true}}" name="pwd">
                <span class="cipherText" :class="showPwd?'icon-eye-open':'icon-eye-close'"
                      @click="showPwd = !showPwd"></span>
                <i class="p-error">{{errors.first('pwd')}}</i>
            </div>
            <button type="button" class="mui-btn base-btn mui-btn-block"
                    @click="loginSubmit()" :disabled="errors.any()">立即登录</button>
        </form>
        <div class="log-reg-bottom">
            <a href="/" class="forget-pwd">
                <img src="../assets/images/icon_logo_black.png">
            </a>
            <a href="/findPwd" class="forget-pwd">忘记密码</a>
        </div>
    </div>
</template>

<script>
  const dictionary = {
    en: {
      custom: {
        phone: {
          required(){
            return '请输入手机号码'
          },
          digits(){
            return "手机号码为11位数字"
          }
        },
        pwd: {
          required(){
            return '请输入登录密码'
          }
        }

      }
    }
  };

  export default {
    name: 'Login',
    data() {
      return {
        remember: true,
        showPwd: false,
        pwd: '',
        phone: '',
        userInfo: null,
        remark:'',
      }
    },
    created(){
      this.$validator.attach('pwd', 'pwd');
      this.$validator.attach('phoneNum', 'phoneNum');
      let username = this.getCookie(this.rememberKey.userNameKey);
      if (username) {
        this.phone = username;
      }
      if(this.$route.query.remark){
        this.remark = this.$route.query.remark;
      }
    },
    mounted () {
      this.$validator.updateDictionary(dictionary);
    },
    watch:{
      phone(){
        this.phone = this.phone.replace(/\D/g,'');
      }
    },
    methods: {
      loginSubmit() {
        var self = this;
        let loginData = {
          usrName: this.phone,
          usrPwd: this.pwd
        };
        self.$validator.validateAll().then((result) => {
          if (result) {
            self.$http.post('/pbap-web/action/user/query/login', loginData).then(response => {
              if (this.remember) {
                self.setCookie(this.rememberKey.userNameKey, this.phone);
              }
              if (response.body.errorInfo.errorCode == '0000') {
                var toPage = self.$route.query.remark || '';
                let isLoginPage = toPage.indexOf('/login') == -1;  //是否是登录
                let isRegisterPage = toPage.indexOf('/register') == -1;  //是否是注册
                if(toPage && isLoginPage && isRegisterPage){
                  location.href = self.remark
                }else{
                  location.href = '/'
                }
              }
            }, response => {
              // error callback
            });
          }

        });
        return false;
      },
      goBackBtn(){
        let self = this;
        if(document.referrer){
          let refLink = document.referrer.substring(document.referrer.lastIndexOf('/'))
          if(refLink == "/profile" ||
             refLink == "/myRecommend"){
            return "/"
          } else {
            return document.referrer
          }
        } else {
          return "/"
        }

      }
    }

  }
</script>
