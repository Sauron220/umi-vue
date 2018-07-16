<template>
  <div class="findPwd-content" v-TDK="TDK">
    <a href="/"><img src="../assets/images/logo.png" class="logo"></a>
    <div class="form-type" style="text-align: center;">
      <a class="cen" href="javascript:void(0);">找回登錄密碼</a>
    </div>
    <form action="" method="post" submit="emailSet" novalidate v-if="pageStatus == 1">
      <div class="form-content form-content-back">

        <div class="form-bar clearfix">
          <input v-model="userEmail" type="email" placeholder="請輸入郵箱地址"
                 @focus="codeTips=true;clearError('userEmail')" @blur="codeTips=false"
                 class="short-inp form-control pull-left"
                 autocomplete="off" name="userEmail"
                 v-validate="{rules:{required:true,emailPwd:true}}">
          <span class="btn btn-warning btn-code vCode" @click="getCode()" v-if="!getCodeFlag">獲取驗證碼</span>
          <span class="btn btn-warning btn-code vCode disabled" v-if="getCodeFlag">{{getCodeText}}</span>
          <i class="p-error" v-if="errors.first('userEmail')"><span class="icon icon-reject-o"></span>{{errors.first('userEmail')}}</i>
        </div>
        <!--<div class="form-bar clearfix v-code">
          <div class="input-box">
            <input v-model="imgCode" autocomplete="off" class="form-control long-inp" type="text"
                   placeholder="驗證碼"  name="imgCode"
                   v-validate="{rules:{required:true}}">
            <div class="p-error" v-if="errors.first('imgCode')"><span class="icon icon-reject-o"></span>{{errors.first('imgCode')}}
            </div>
          </div>
        </div>-->
        <span class="btn btn-warning btn-find" @click="emailSet();">立即重置</span>
      </div>
    </form>
    <form action="" method="post" submit="findPwd" novalidate v-if="pageStatus == 2"
          id="findForm">
      <div class="form-content form-content-back">
        <div class="form-bar">
           <input v-model="phone" placeholder="請輸入手機號碼" class="form-control"
                  @focus="tips=true;clearError('phone')" @blur="tips=false" autocomplete="off" maxlength="10"
                  v-validate="{rules:{required:true,digits:10,phoneNum:true}}" type="text" name="phone">
           <i class="p-error" v-if="errors.first('phone')"><span class="icon icon-reject-o"></span>{{errors.first('phone')}}</i>
           <!--<div class="p-error tips" v-if="tips && !errors.first('phone')"><span class="icon icon-info-o"></span>中國大陸地區手機號碼-->
           <!--</div>-->
         </div>
         <div class="form-bar clearfix v-code">
           <div class="input-box">
             <input v-model="imgCode" autocomplete="off" class="form-control short-inp" type="text"
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
          <input v-model="smsCode" type="text" placeholder="請輸入短信驗證碼"
                 @focus="codeTips=true;clearError('smsCode')" @blur="codeTips=false" class="short-inp form-control pull-left"
                 autocomplete="off" minlength="6" maxlength="6" name="smsCode"
                 v-validate="{rules:{hasGetCode:hasGetCode,required:true,digits:6}}">
          <span class="btn btn-warning btn-code vCode" @click="getCode()" v-if="!getCodeFlag">獲取驗證碼</span>
          <span class="btn btn-warning btn-code vCode disabled" v-if="getCodeFlag">{{getCodeText}}</span>
          <i class="p-error tips" v-if="codeTips && !errors.first('smsCode')"><span class="icon icon-info-o"></span>短信驗證碼為6位</i>
          <i class="p-error" v-if="errors.first('smsCode')"><span class="icon icon-reject-o"></span>{{errors.first('smsCode')}}</i>
        </div>
        <div class="form-bar">
          <input type="password" v-if="!showPwd" v-model="pwd" minlength="6" maxlength="20"
                 autocomplete="new-password" placeholder="請輸入登錄密碼" class="form-control"
                 @focus="pwdTips=true;clearError('pwd')" @blur="pwdTips=false"
                 v-validate="{rules:{required:true,pwd:true}}" name="pwd">
          <input type="text" v-if="showPwd" v-model="pwd" minlength="6" maxlength="20"
                 autocomplete="new-password" placeholder="請輸入登錄密碼" class="form-control"
                 @focus="pwdTips=true;clearError('pwd')" @blur="pwdTips=false"
                 v-validate="{rules:{required:true,pwd:true}}" name="pwd">
          <span class="icon cipherText" :class="showPwd?'icon-eye-open':'icon-eye-close'"
                @click="showPwd = !showPwd" style="left: 328px;"></span>
          <i class="p-error" v-if="errors.first('pwd')"><span class="icon icon-reject-o"></span>{{errors.first('pwd')}}</i>
          <i class="p-error tips" v-if="pwdTips && !errors.first('pwd')"><span class="icon icon-info-o"></span>登錄密碼由6-20位數字與字母的組合</i>
        </div>


        <span class="btn btn-warning btn-find" @click="findPwd();">立即找回</span>
      </div>
    </form>
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
        pwdNewAgain:{
          required() {
            return '請輸入登錄密碼'
          }
        },
        imgCode: {
          required() {
            return '請輸入圖形驗證碼'
          },
          digits() {
            return '請輸入正確的圖形驗證碼'
          },
          min() {
            return '請輸入正確的圖形驗證碼'
          },
          max() {
            return '請輸入正確的圖形驗證碼'
          }
        },
        smsCode:{
          isTrue(){
            return '請先獲取驗證碼'
          },
          required(){
            return '請輸入驗證碼'
          },
          digits(){
            return '驗證碼長度為6位'
          },
          hasGetCode(){
            return '請先獲取驗證碼'
          }
        },
        userEmail: {
          required() {
            return '請輸入郵箱地址'
          },

        }
      }
    }
  };
  export default {
    name: 'FindPwd',
    data() {
      return {
        pageStatus: 2,
        showPwd: false,
        showPwdNew: false,
        pwd: '',
        phone: '',
        imgCode: '',
        smsCode: '',
        userEmail: '',
        pwdNewAgain:'',
        imgUrl: Math.random(),
        codeTips: false,
        pwdTips: false,
        pwdNewTips: false,
        tips: false,
        hasGetCode: 0,
        getCodeText: '',
        getCodeFlag: false,
        recommendCode: false,
        hasRequestSmsCode: null,
        TDK: {
          title: '找回登錄密碼-聚寶盆',
          keyWords: '網絡理財，互聯網理財，理財，投資，投資理財，個人投資，網貸平臺，網貸投資，網貸，互金，互聯網金融，互金平臺，互聯網金融平臺，聚寶盆，聚寶計劃，分期投，月月盈，年年余，財富，P2P',
          description: '聚寶盆是壹家綜合性互聯網金融平臺，聚寶盆為廣大個人投資理財的用戶提供多元化的選擇與優質的服務。投資理財用戶可通過加入聚寶計劃、分期投、月月盈、年年余等產品進行投資獲得穩定收益。',
        }
      }
    },
    created() {
      self.hasRequestSmsCode = false;
    },
    mounted() {
      this.$validator.updateDictionary(dictionary);
    },
    watch: {
      phone() {
        this.phone = this.phone.replace(/\D/g, '');
      },
      smsCode(){
        this.smsCode = this.smsCode.replace(/\D/g,'');
      },
      imgCode(){
        this.pwd = this.pwd.replace(/^[0-9a-zA-Z]*$/,'');
      },
      // userEmail() {
      //   this.userEmail = this.userEmail.replace(/\D/g, '');
      // },
    },
    methods: {
      loadImage() {
        this.imgUrl = Math.random();
      },
      clearError(name) {
        this.errors.remove(name);
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
                  msg:'手機號不存在'
                });
                self.$store.commit('showModal');
              }else{
                self.hasGetCode++;  // 标记用户已经成功获取过验证码
                self.$http.post('/pbap-web/action/user/add/sendSmsCode', {
                  "cusMobile" : self.phone,
                  "smsType" : 4,
                  "randNum" : self.imgCode
                }).then(response => {
                  if(response.body.errorInfo.errorCode == '0000'){
                    self.getCodeFlag = true;
                    var countDown = 60;
                    self.getCodeText = countDown+'秒后重新發送';
                    var countDownTime = setInterval(function () {
                      if(countDown>0){
                        self.getCodeText = countDown+'秒后重新發送';
                        countDown--;
                      }else{
                        clearInterval(countDownTime);
                        self.getCodeFlag = false;
                      }
                    },1000)
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
      emailSet(){
        var self = this;
        this.$validator.validateAll().then((result)=>{
          if(result){
            self.$http.post('/pbap-web/action/mail/codeConfirm', {
              "userEmail": self.userEmail,
              "verifyCode": self.imgCode,
              "emailType": 1
            }).then(response => {
              if (response.body.errorInfo.errorCode == '0000') {
                self.pageStatus = 2;
              }
            });
          }
        })
      },
      findPwd() {
        var self = this;
        self.$validator.validateAll().then((result) => {
          if (result) {
            self.$http.post('/pbap-web/action/user/upt/findCusPwd', {
              "usrName" : self.phone,
              "smsCode" : self.smsCode,
              "newUsrPwd" : self.pwd
            }).then(response => {
              if (response.body.errorInfo.errorCode == '0000') {
                location.href = '/login';
              }
            });
          }
        }).catch(() => {
          self.loadImage();
        });
      }
    }
  }
</script>
