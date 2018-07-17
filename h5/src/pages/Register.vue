<template>
    <div class="wrap register-content">
        <header class="top-nav log-reg-top">
            <div class="nav-box mui-bar mui-bar-nav">
                <a href="javascript:history.go(-1)" class="go-back mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
                <a class="top-link go-login" href="/login">登录</a>
                <h1 class="mui-title"></h1>
            </div>
        </header>
        <h1>注册</h1>
        <form class="mui-input-group" action="" onsubmit="return false">
            <div class="mui-input-row base-input-box">
                <input v-model="phone" placeholder="手机号" class="input-bar"
                       @focus="tips=true" @blur="tips=false" autocomplete="off" maxlength="11"
                       v-validate="{rules:{required:true,digits:11,phoneNum:true}}" type="text" name="phone">
                <i class="p-error tips" v-if="tips && !errors.first('phone')">
                    <span class="icon icon-info-o"></span>中国大陆地区手机号码
                </i>
                <i class="p-error">{{errors.first('phone')}}</i>
            </div>
            <div class="mui-input-row base-input-box">
                <input v-model="imgCode" autocomplete="off" class="input-bar mui-input-password" type="text"
                       placeholder="图形验证码" maxlength="4" minlength="4" name="imgCode"
                       v-validate="{rules:{required:true,min:4,max:4}}">
                <div class="p-error">{{errors.first('imgCode')}}</div>
                <div class="inp-other" id="imgCode">
                    <img id="randimg" class="img-responsive" @click="loadImage()" :src="'/pbap-web/action/randCode?'+imgUrl" alt="验证码">
                </div>
            </div>
            <div class="mui-input-row base-input-box">
                <input v-model="smsCode" type="text" placeholder="短信验证码"
                       @focus="codeTips=true" @blur="codeTips=false" class="input-bar"
                       autocomplete="off" minlength="6" maxlength="6" name="smsCode"
                       v-validate="{rules:{required:true,digits:6}}">
                <span class="inp-other btn-code" @click="getCode()" v-if="!getCodeFlag">获取验证码</span>
                <span class="inp-other btn-code disabled" v-if="getCodeFlag">{{getCodeText}}</span>
                <i class="p-error tips" v-if="codeTips && !errors.first('smsCode')">短信验证码为6位数字</i>
                <i class="p-error" v-if="errors.first('smsCode')">{{errors.first('smsCode')}}</i>
            </div>
            <div class="mui-input-row base-input-box">
                <input type="password" v-if="!showPwd" v-model="pwd" minlength="6" maxlength="20"
                       autocomplete="new-password" placeholder="登录密码" class="input-bar mui-input-password"
                       @focus="pwdTips=true" @blur="pwdTips=false"
                       v-validate="{rules:{required:true,pwd:true}}" name="pwd">
                <input type="text" v-if="showPwd" v-model="pwd" minlength="6" maxlength="20"
                       autocomplete="new-password" placeholder="登录密码" class="input-bar mui-input-password"
                       @focus="pwdTips=true" @blur="pwdTips=false"
                       v-validate="{rules:{required:true,pwd:true}}" name="pwd">
                <span class="cipherText" :class="showPwd?'icon-eye-open':'icon-eye-close'"
                      @click="showPwd = !showPwd"></span>
                <i class="p-error">{{errors.first('pwd')}}</i>
                <i class="p-error tips" v-if="pwdTips && !errors.first('pwd')">登录密码由6-20位数字与字母的组合</i>
            </div>
            <div class="recommend-box" :class="{'recommend-box-high':recommendCode}" @click="recommendCode = !recommendCode">我有推荐码</div>
            <div class="mui-input-row base-input-box" v-if="recommendCode">
                <input type="text" v-model="rcmCode" class="input-bar" placeholder="推荐码" maxlength="20">
            </div>
            <div class="piaochecked clearfix" :class="{'piaochecked-high':hasAccept}">
                <input type="checkbox" v-model="hasAccept" class="input-clear" v-validate="'required'" name="hasAccept">
                <span>我已阅读并同意<a href="/register-agreement">《用户注册协议》</a></span>
            </div>
            <button class="ui-btn base-btn mui-btn-block" @click="registerSubmit();"
                    id="registerBtn" :disabled="errors.any() || !isFormDirty">立即注册</button>
        </form>
        <div class="log-reg-bottom">
            <a href="/">
                <img src="../assets/images/icon_logo_black.png">
            </a>
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
        },
        imgCode:{
          required(){
            return '请输入图形验证码'
          },
          min(){
            return '请输入正确的图形验证码'
          },
          max(){
            return '请输入正确的图形验证码'
          }
        },
        smsCode:{
          required(){
            return '请输入验证码'
          },
          digits(){
            return '验证码长度6位'
          },
          hasGetCode(){
            return '请先获取验证码'
          }
        }
      }
    }
  };

  export default {
    name: 'Register',
    data () {
      return {
        showPwd: false,
        pwd: '',
        phone: '',
        imgCode: '',
        smsCode: '',
        rcmCode: '',
        imgUrl: Math.random(),
        codeTips: false,
        pwdTips: false,
        tips:false,
        hasGetCode:0,
        getCodeText:'',
        getCodeFlag:false,
        recommendCode:false,
        hasAccept:true
      }
    },
    created(){
      var self = this;
      self.rcmCode = self.$route.query.rcmCode;
    },
    computed: {
      isFormDirty() {
        return Object.keys(this.fields).some(key => this.fields[key].dirty);
      }
    },
    mounted () {
      this.$validator.updateDictionary(dictionary);
    },
    watch:{
      phone(){
        this.phone = this.phone.replace(/\D/g,'');
      },
      smsCode(){
        this.smsCode = this.smsCode.replace(/\D/g,'');
      },
        /*      pwd(){
         this.pwd = this.pwd.replace(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]*$/,'');
         },*/
      imgCode(){
        this.pwd = this.pwd.replace(/^[0-9a-zA-Z]*$/,'');
      }
    },
    methods: {
      loadImage(){
        this.imgUrl = Math.random();
      },
      getCode(){
        var self = this;
        self.$validator.validateAll({
          'phone':this.phone,
          'imgCode':this.imgCode
        }).then((result)=>{
          if(result){
            self.$http.post('/pbap-web/action/user/query/verifyUser', {
              "usrName" : self.phone
            }).then(response => {
              if(response.body.respInfo.userCount == 1){
                self.loadImage();
                self.$store.commit('setModal',{
                  show:false,
                  type:'alert',
                  msg:'手机号已被占用'
                });
                self.$store.commit('showModal');
              }else{
                self.hasGetCode++;
                self.$http.post('/pbap-web/action/user/add/sendSmsCode', {
                  "cusMobile" : self.phone,
                  "smsType" : 3,
                  "randNum" : self.imgCode
                }).then(response => {
                  if(response.body.errorInfo.errorCode == '0000'){
                    self.getCodeFlag = true;
                    var countDown = 60;
                    self.getCodeText = countDown+'秒后重新发送';
                    var countDownTime = setInterval(function () {
                      if(countDown>0){
                        self.getCodeText = countDown+'秒后重新发送';
                        countDown--;
                      }else{
                        clearInterval(countDownTime);
                        self.getCodeFlag = false;
                      }
                    },1000)
                  }else{
                    self.loadImage();
                  }
                }, response => {
                  self.loadImage();
                });
              }
            }, response => {
              self.loadImage();
            });
          }
        }).catch(() => {
          self.loadImage();
        });
      },
      registerSubmit(){
        var self = this;
        self.$validator.validateAll().then((result) => {
          if(result){
            self.$http.post('/pbap-web/action/user/add/register', {
              "usrName" : self.phone,
              "smsCode" : self.smsCode,
              "usrPwd" : self.pwd,
              "rcmCode" : self.rcmCode
            }).then(response => {
              if (response.body.errorInfo.errorCode == '0000') {  // 注册成功跳转
                location.href = '/register-success';
                self.$cookie.set('newUser', true, 1)
              }
            });
          }
        }).catch(()=>{
          self.loadImage();
        });
        return false;
      }
    }
  }
</script>
