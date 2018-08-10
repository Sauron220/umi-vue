<template>
  <div class="register" style="background: #fff;" v-TDK="TDK">
    <div class="top-cont">
      <a href="/">
        <img src="../assets/images/logo.png" class="logo">
      </a>
      <p>歡迎來到聚寶盆</p>
      <a href="/" class="go-form">返回<span class="log">首頁</span></a>

      <form action="" onsubmit="return false">
        <div class="form-content">
          <router-link class="login-res" to="/login" style="border-right:1px solid #e9e9e9;">登錄</router-link><router-link class="login-res" to="/register">註冊</router-link>
          <div class="form-bar input-group">
            <div class="input-group-addon bgColor-b">台灣 +886</div>
            <input v-model="phone" placeholder="請輸入手機號碼" class="form-control bgColor-b"
                   @focus="tips=true;clearError('phone')" @blur="tips=false;" autocomplete="off" maxlength="10"
                   v-validate="{rules:{required:true,digits:10,phoneNum:true}}" type="text" name="phone">
            <!--<i class="p-error tips" v-if="tips && !errors.first('phone')"><span class="icon icon-info-o"></span>中國大陸地區手機號碼</i>-->
            <i class="p-error" v-if="errors.first('phone')"><span class="icon icon-reject-o"></span>{{errors.first('phone')}}</i>
          </div>
          <div class="form-bar clearfix v-code">
            <div class="input-box">
              <input v-model="imgCode" autocomplete="off" class="form-control short-inp bgColor-b" type="text"
                     placeholder="驗證碼" maxlength="4" minlength="4" name="imgCode"
                     v-validate="{rules:{required:true,min:4,max:4}}">
              <div class="p-error" v-if="errors.first('imgCode')"><span class="icon icon-reject-o"></span>{{errors.first('imgCode')}}
              </div>
            </div>
            <div class="img-box">
              <img class="img-responsive" @click="loadImage()"
                   :src="'/pbap-web/action/randCode?'+imgUrl" alt="驗證碼">
            </div>
            <div class="refresh text-center">
              <i class="icon-refresh" @click="loadImage()"></i>
            </div>
          </div>
          <div class="form-bar clearfix">
            <input v-model="smsCode" type="text" placeholder="請輸入簡訊驗證碼"
                   @focus="codeTips=true;clearError('smsCode')" @blur="codeTips=false"
                   class="short-inp form-control pull-left bgColor-b"
                   autocomplete="off" minlength="6" maxlength="6" name="smsCode"
                   v-validate="{rules:{hasGetCode:hasGetCode,required:true,digits:6}}">
            <span class="btn btn-warning btn-code" @click="getCode()" v-if="!getCodeFlag">獲取驗證碼</span>
            <span class="btn btn-warning btn-code disabled" v-if="getCodeFlag">{{getCodeText}}</span>
            <i class="p-error tips" v-if="codeTips && !errors.first('smsCode')"><span class="icon icon-info-o"></span>短信驗證碼為6位數字</i>
            <i class="p-error" v-if="errors.first('smsCode')"><span class="icon icon-reject-o"></span>{{errors.first('smsCode')}}</i>
          </div>
          <div class="form-bar">
            <input type="password" v-if="!showPwd" v-model="pwd" minlength="6" maxlength="20"
                   autocomplete="new-password" placeholder="請輸入登錄密碼" class="form-control bgColor-b"
                   @focus="pwdTips=true;clearError('pwd')" @blur="pwdTips=false"
                   v-validate="{rules:{required:true,pwd:true}}" name="pwd">
            <input type="text" v-if="showPwd" v-model="pwd" minlength="6" maxlength="20"
                   autocomplete="new-password" placeholder="請輸入登錄密碼" class="form-control bgColor-b"
                   @focus="pwdTips=true;clearError('pwd')" @blur="pwdTips=false"
                   v-validate="{rules:{required:true,pwd:true}}" name="pwd">
            <span class="icon cipherText" :class="showPwd?'icon-eye-open':'icon-eye-close'"
                  @click="showPwd = !showPwd" style="left: 328px;"></span>
            <i class="p-error" v-if="errors.first('pwd')"><span class="icon icon-reject-o"></span>{{errors.first('pwd')}}</i>
            <i class="p-error tips" v-if="pwdTips && !errors.first('pwd')"><span class="icon icon-info-o"></span>登錄密碼由6-20位數字與字母的組合</i>
          </div>
          <!--<div class="recommend-box" @click="recommendCode = !recommendCode">我有推薦碼</div>-->
          <div class="form-bar" style="margin-bottom: 10px;" v-if="recommendCode">
            <input type="text" v-model="rcmCode" class="form-control recommend-inp"
                   placeholder="請輸入推薦碼" maxlength="20">
          </div>
          <div class="piaochecked clearfix" :class="{'piaochecked-high':hasAccept}">
            <input type="checkbox" v-model="hasAccept" class="input-clear" v-validate="'required'" name="hasAccept">
            <span style="width: 334px;">我已閱讀並同意
              <a target="_blank" href="/static/聚寶盆 P2P 平台服務條款.pdf">《聚寶盆 P2P 平台服務條款》</a>
              <a target="_blank" href="/static/聚寶盆 P2P 平台隱私權政策.pdf">《聚寶盆 P2P 平台隱私權政策》</a>
            </span>
          </div>
          <button class="btn btn-warning btn-register"
                  @click="registerSubmit();" id="registerBtn" :disabled="errors.any() || !isFormDirty">立即註冊
          </button>
        </div>
      </form>
    </div>
    <div class="slider slider2">
      <div class="background">
        <div class="bannerLoad">
          <img src="../assets/images/form_banner2.png">
        </div>
      </div>
    </div>
    <!--<div class="bottom-cont">版權所有 © 上海尤鹿金融資訊服務有限公司-->
    <!--<a href="http://www.miitbeian.gov.cn" target="_blank">滬ICP備16027065號-2</a>-->
    <!--</div>-->
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
        },
        imgCode: {
          required() {
            return '請輸入圖形驗證碼'
          },
          min() {
            return '請輸入正確的圖形驗證碼'
          },
          max() {
            return '請輸入正確的圖形驗證碼'
          }
        },
        smsCode: {
          required() {
            return '請輸入驗證碼'
          },
          digits() {
            return '驗證碼長度6位'
          },
          hasGetCode() {
            return '請先獲取驗證碼'
          }
        }
      }
    }
  };

  export default {
    name: 'Register',
    data() {
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
        tips: false,
        hasGetCode: 0,
        getCodeText: '',
        getCodeFlag: false,
        recommendCode: false,
        hasAccept: true,
        hasRequestSmsCode: false,
        TDK: {
          title: '會員註冊-聚寶盆',
          keyWords: '會員註冊,理財帳戶,個人投資理財,聚寶盆',
          description: '歡迎加入聚寶盆理財平臺，操作便捷，30s即可註冊！新手註冊即領998元紅包！6道風控審核保障，透明穩健的互聯網理財平臺，理財更安全！',
        }
      }
    },
    created() {
      var self = this;
      self.rcmCode = self.$route.query.rcmCode;
    },
    computed: {
      isFormDirty() {
        return Object.keys(this.fields).some(key => this.fields[key].dirty);
      },
      formInvalid() {
        return Object.keys(this.fields).some(key => this.fields[key].invalid || !this.fields[key].validated);
      }
    },
    mounted() {
      this.$validator.updateDictionary(dictionary);
    },
    watch: {
      phone() {
        this.phone = this.phone.replace(/\D/g, '');
      },
      smsCode() {
        this.smsCode = this.smsCode.replace(/\D/g, '');
      },
     /* pwd() {
        this.pwd = this.pwd.replace(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]*$/, '');
      },*/
      imgCode() {
        this.pwd = this.pwd.replace(/^[0-9a-zA-Z]*$/, '');
      }
    },
    methods: {
      loadImage() {
        this.imgUrl = Math.random();
      },
      clearError(name) {
        this.errors.remove(name);
      },
      getCode() {
        var self = this;
        self.$validator.validateAll({
          'phone': this.phone,
          'imgCode': this.imgCode
        }).then((result) => {
          if (result) {
            self.$http.post('/pbap-web/action/user/query/verifyUser', {
              "usrName": self.phone
            }).then(response => {
              if (response.body.respInfo.userCount == 1) {
                self.loadImage();
                self.$store.commit('setModal', {
                  show: false,
                  type: 'alert',
                  msg: '手機號已被占用'
                });
                self.$store.commit('showModal');
              } else {
                self.hasGetCode++;
                self.$http.post('/pbap-web/action/user/add/sendSmsCode', {
                  "cusMobile": self.phone,
                  "smsType": 3,
                  "randNum": self.imgCode
                }).then(response => {
                  if (response.body.errorInfo.errorCode == '0000') {
                    self.getCodeFlag = true;
                    var countDown = 60;
                    self.getCodeText = countDown + '秒後重新發送';
                    var countDownTime = setInterval(function () {
                      if (countDown > 0) {
                        self.getCodeText = countDown + '秒後重新發送';
                        countDown--;
                      } else {
                        clearInterval(countDownTime);
                        self.getCodeFlag = false;
                      }
                    }, 1000)
                  } else {
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
      registerSubmit() {
        var self = this;
        self.$validator.validateAll().then((result) => {
          if (result) {
            self.$http.post('/pbap-web/action/user/add/register', {
              "usrName": self.phone,
              "smsCode": self.smsCode,
              "usrPwd": self.pwd,
              "rcmCode": self.rcmCode
            }).then(response => {
              if (response.body.errorInfo.errorCode == '0000') {  // 註冊成功跳轉
                location.href = '/register-success';
              }
            });
          }
        }).catch(() => {
          self.loadImage();
        });
        return false;
      }
    }
  }
</script>
