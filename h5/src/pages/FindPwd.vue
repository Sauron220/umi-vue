<template>
    <div class="wrap findPwd-content">
        <form class="mui-input-group red-form" action="" method="post" submit="findPwd" novalidate id="findForm">
            <div class="mui-input-row base-input-box">
                <input type="text"  v-model="phone" class="input-bar" name="phone"
                       placeholder="手机号" autocomplete="off" maxlength="11"
                       v-validate="{rules:{required:true,digits:11,phoneNum:true}}">
                <i class="p-error">{{errors.first('phone')}}</i>
            </div>
            <div class="mui-input-row base-input-box">
                <input v-model="imgCode" autocomplete="off" class="input-bar" type="text"
                       placeholder="图形验证码" maxlength="4" minlength="4" name="imgCode"
                       v-validate="{rules:{required:true,min:4,max:4}}">
                <div class="p-error">{{errors.first('imgCode')}}</div>
                <div class="inp-other" id="imgCode" @click="loadImage()">
                    <img :src="'/pbap-web/action/randCode?'+imgUrl" id="randimg">
                </div>
            </div>
            <div class="mui-input-row base-input-box">
                <input v-model="smsCode" type="text" placeholder="短信验证码"
                       @focus="codeTips=true" @blur="codeTips=false" class="input-bar"
                       autocomplete="off" minlength="6" maxlength="6" name="smsCode"
                       v-validate="{rules:{required:true,digits:6}}">
                <span class="inp-other" id="asendcode" @click="getCode()" v-if="!getCodeFlag">获取验证码</span>
                <span class="inp-other" v-if="getCodeFlag">{{getCodeText}}</span>
                <i class="p-error tips" v-if="codeTips && !errors.first('smsCode')">请输入正确的短信证码</i>
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
            <button type="button" class="mui-btn base-btn mui-btn-block" @click="findPwd();">确认</button>
        </form>
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
    name: 'FindPwd',
    data () {
      return {
        pageTitle: '找回密码',
        showPwd: false,
        pwd: '',
        phone: '',
        imgCode: '',
        smsCode: '',
        imgUrl: Math.random(),
        codeTips: false,
        pwdTips: false,
        tips:false,
        hasGetCode:0,
        getCodeText:'',
        getCodeFlag:false,
        recommendCode:false
      }
    },
    created(){
      var self = this;
      self.$store.commit('setPageTitle', self.pageTitle);
    },
    mounted () {
      this.$validator.updateDictionary(dictionary);
    },
    watch:{
      phone(){
        this.phone = this.phone.replace(/\D/g,'');
      },
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
              if(response.body.respInfo.userCount == 0){
                self.loadImage();
                self.$store.commit('setModal',{
                  show:false,
                  type:'alert',
                  msg:'手机号不存在'
                });
                self.$store.commit('showModal');
              }else{
                self.hasGetCode++;
                self.$http.post('/pbap-web/action/user/add/sendSmsCode', {
                  "cusMobile" : self.phone,
                  "smsType" : 3,
                  "randNum" : self.imgCode
                }).then(response => {
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
      findPwd(){
        var self = this;
        self.$validator.validateAll().then((result) => {
          if(result){
            self.$http.post('/pbap-web/action/user/upt/findCusPwd', {
              "usrName" : self.phone,
              "smsCode" : self.smsCode,
              "newUsrPwd" : self.pwd
            }).then(response => {
              if (response.body.errorInfo.errorCode == '0000') {  // 成功跳转
                location.href = '/login';
              }
            });
          }
        }).catch(()=>{
          self.loadImage();
        });
      }
    }
  }
</script>
