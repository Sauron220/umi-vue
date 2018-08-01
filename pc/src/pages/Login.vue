<template>
  <div class="login" style="background: #fff;" v-TDK="TDK">
    <div class="content-form">
      <div class="top-cont">
        <a href="/">
          <img src="../assets/images/logo.png" class="logo">
        </a>
        <p>歡迎來到聚寶盆</p>
        <a href="/" class="go-form">返回<span class="log">首頁</span></a>
        <form action="" onsubmit="return false">
          <div class="form-content">
            <router-link class="login-res" to="/login" style="border-right:1px solid #e9e9e9;">登錄</router-link><router-link class="login-res" to="/register">註冊</router-link>
            <div class="form-bar form-group">
              <input v-model="phone" placeholder="請輸入手機號碼" class="form-control"
                     autocomplete="off" maxlength="10"
                     v-validate="{rules:{required:true,digits:10,phoneNum:true}}" type="text"
                     name="phone">
              <i class="p-error" v-if="errors.first('phone')"><span class="icon icon-reject-o"></span>{{errors.first('phone')}}</i>
            </div>
            <div class="form-bar">
              <input type="password" v-if="!showPwd" v-model="pwd" minlength="6" maxlength="20"
                     placeholder="請輸入登錄密碼" class="form-control"
                     v-validate="{rules:{required:true,pwd:true}}" name="pwd">
              <input type="text" v-if="showPwd" v-model="pwd" minlength="6" maxlength="20"
                     placeholder="請輸入登錄密碼" class="form-control"
                     v-validate="{rules:{required:true,pwd:true}}" name="pwd">
              <span class="icon cipherText" :class="showPwd?'icon-eye-open':'icon-eye-close'"
                    @click="showPwd = !showPwd" style="left:328px;"></span>
              <i class="p-error" v-if="errors.first('pwd')"><span class="icon icon-reject-o"></span>{{errors.first('pwd')}}</i>
            </div>
            <div class="piaochecked clearfix" :class="{'piaochecked-high':remember}" id="isCheck">
              <input v-model="remember" type="checkbox" class="input-clear">
              <span>記住我</span> <a href="/findPwd" class="forget-pwd">忘記密碼?</a>
            </div>
            <button class="btn btn-warning btn-login" @click="loginSubmit()"
                    :disabled="errors.any()">立即登錄
            </button>
          </div>
        </form>
      </div>
      <div class="slider">
        <div class="background">
          <div class="bannerLoad">
            <img src="../assets/images/form_banner2.png">
          </div>
        </div>
      </div>
      <!--<div class="bottom-cont">版權所有 © 上海尤鹿金融資訊服務有限公司
        <a href="http://www.miitbeian.gov.cn" target="_blank">滬ICP備16027065號-2</a>
      </div>-->
    </div>
  </div>
</template>

<script>

  const dictionary = {
    en: {
      custom: {
        phone: {
          required() {
            return '請輸入手機號碼'
          },
          digits() {
            return "手機號碼為10位數字"
          }
        },
        pwd: {
          required() {
            return '請輸入登錄密碼'
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
        TDK:{
          title:'會員登錄-聚寶盆',
          keyWords:'會員登陸,理財賬戶,個人投資理財,聚寶盆',
          description:'歡迎登陸聚寶盆理財平臺！理財選聚寶盆，6道風控審核保障，理財更安全！',
        }
      }
    },
    created() {
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
    mounted() {
      this.$validator.updateDictionary(dictionary);
    },
    watch: {
      phone() {
        this.phone = this.phone.replace(/\D/g, '');
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
                let isLoginPage = toPage.indexOf('/login') == -1;  //是否是登錄
                let isRegisterPage = toPage.indexOf('/register') == -1;  //是否是註冊
                if(toPage && isLoginPage && isRegisterPage){
                  self.getCurrentInfoMes(location.origin + self.remark);
                }else{
                  self.getCurrentInfoMes('/');
                }
              }
            }, response => {
              // error callback
            });
          }
        });
        return false;
      },
      getCurrentInfoMes (uri) {
        const self = this;
        this.$http.post('/pbap-web/action/customer/query/custAuthInfo',{}).then((res) => {
          if (res.body.respInfo.custInfo) {
            sessionStorage.setItem('currentUser', JSON.stringify(res.body.respInfo.custInfo));
            location.href = uri;
          }
        })
      },
    }
  }
</script>
