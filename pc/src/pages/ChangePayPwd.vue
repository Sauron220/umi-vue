<template>
  <div id="PersonalCenter" class="rw-content changePwd-content profile clearfix">
    <div class="container">
      <!--<ol class="breadcrumb">
        <span>您現在的位置：</span>
        <li>
          <router-link to="/accountOverview">我的帳戶</router-link>
        </li>
        <li>
          <router-link to="/set">帳戶安全</router-link>
        </li>
        <li class="active">修改支付密碼</li>
      </ol>
      <leftMenu></leftMenu>-->
      <div class="pull-left right_content">
        <ul class="top-title-line list-inline">
          <li class="top-line1 top-orange">修改支付密碼</li>
        </ul>
        <form action="" method="post" submit="emailPwd" novalidate v-if="pageStatus == 1">


          <div class="personal-bar form-bar form-group clearfix">
            <h1>手機號碼</h1>
            <input v-model="phone" readonly
                   class="form-control">
           <!-- <span class="btn btn-warning btn-code vCode" @click="getCode()" v-if="!getCodeFlag">獲取驗證碼</span>
            <span class="btn btn-warning btn-code vCode disabled" v-if="getCodeFlag">{{getCodeText}}</span>-->
            <!--<i class="p-error" v-if="errors.first('userEmail')"><span class="icon icon-reject-o"></span>{{errors.first('userEmail')}}</i>-->
          </div>

          <div class="personal-bar form-group">
            <h1>圖形驗證碼</h1>
              <input v-model="imgCode" autocomplete="off" class="short-inp form-control" type="text"
                     placeholder="驗證碼" maxlength="4" minlength="4" name="imgCode"
                     v-validate="{rules:{required:true,min:4,max:4}}">
              <div class="p-error" v-if="errors.first('imgCode')"><span class="icon icon-reject-o"></span>{{errors.first('imgCode')}}
              </div>
            <div class="img-box">
              <img class="img-responsive" @click="loadImage()"
                   :src="'/pbap-web/action/randCode?'+imgUrl" alt="驗證碼">
            </div>
            <div class="refresh text-center">
              <i class="icon-refresh" @click="loadImage()"></i>
            </div>
          </div>

          <div class="personal-bar form-group">
            <h1>驗證碼</h1>
            <input v-model="smsCode" type="text" placeholder="請輸入簡訊驗證碼"
                   @focus="codeTips=true;clearError('smsCode')" @blur="codeTips=false" class="short-inp form-control"
                   autocomplete="off" minlength="6" maxlength="6" name="smsCode"
                   v-validate="{rules:{hasGetCode:hasGetCode,required:true,digits:6}}">
            <span class="btn btn-warning btn-code vCode" @click="getCode()" v-if="!getCodeFlag">獲取驗證碼</span>
            <span class="btn btn-warning btn-code vCode disabled" v-if="getCodeFlag">{{getCodeText}}</span>
            <i class="p-error" v-if="errors.first('smsCode')"><span class="icon icon-reject-o"></span>{{errors.first('smsCode')}}

            </i>
          </div>
          <div class="personal-bar form-group">
            <h1>新支付密碼</h1>
            <input type="password" v-if="!showPwd" v-model="pwdNew" minlength="6" maxlength="20"
                   autocomplete="new-password" placeholder="請輸入新支付密碼" class="form-control"
                   @focus="pwdNewTips=true" @blur="pwdNewTips=false"
                   v-validate="{rules:{required:true,pwd:true}}" name="pwdNew">
            <input type="text" v-if="showPwd" v-model="pwdNew" minlength="6" maxlength="20"
                   autocomplete="new-password" placeholder="請輸入新支付密碼" class="form-control"
                   @focus="pwdNewTips=true" @blur="pwdNewTips=false"
                   v-validate="{rules:{required:true,pwd:true}}" name="pwdNew">
            <span class="icon cipherText" :class="showPwd?'icon-eye-open':'icon-eye-close'"
                  @click="showPwd = !showPwd"></span>
            <i class="p-error" v-if="errors.first('pwdNew')"><span class="icon icon-reject-o"></span>{{errors.first('pwdNew')}}

            </i>
           <!-- <div class="sj-error" v-if="errors.first('pwdNew')">
              <span></span> <i class="p-error" style="top:-12px;left:8px;">{{errors.first('pwdNew')}}</i>
            </div>-->
          </div>
          <span class="btn btn-warning btn-find" @click="emailSet();" style="margin-left:110px;">立即重置</span>
        </form>
        <form action="" method="post" submit="changePwd" novalidate id="changePwdForm" v-if="pageStatus == 2">
          <!--<div class="personal-bar form-group">
              <h1>當前支付密碼</h1>
              <input type="password" v-if="!showOldPwd" v-model="oldPwd" minlength="6" maxlength="20"
                     autocomplete="new-password" placeholder="請輸入當前支付密碼" class="form-control"
                     @focus="pwdOldTips=true" @blur="pwdOldTips=false"
                     v-validate="{rules:{required:true,pwd:true}}" name="oldPwd">
              <input type="text" v-if="showOldPwd" v-model="oldPwd" minlength="6" maxlength="20"
                     autocomplete="new-password" placeholder="請輸入當前支付密碼" class="form-control"
                     @focus="pwdOldTips=true" @blur="pwdOldTips=false"
                     v-validate="{rules:{required:true,pwd:true}}" name="oldPwd">
              <span class="icon cipherText" :class="showOldPwd?'icon-eye-open':'icon-eye-close'"
                    @click="showOldPwd = !showOldPwd"></span>
              <div class="sj-error" v-if="pwdOldTips && !errors.first('oldPwd')">
                  <span></span> <i>請輸入當前支付密碼</i>
              </div>
              <div class="sj-error" v-if="errors.first('oldPwd')">
                  <span></span> <i class="p-error">{{errors.first('oldPwd')}}</i>
              </div>
          </div>-->


          <div class="personal-bar form-group">
            <h1>確認支付密碼</h1>
            <input type="password" v-if="!showPwdNew" v-model="pwdNewAgain" minlength="6" maxlength="20"
                   autocomplete="new-password" placeholder="請輸入新支付密碼" class="form-control"
                   @focus="pwdTips=true" @blur="pwdTips=false"
                   v-validate="{rules:{required:true,pwd:true}}" name="pwdNewAgain">
            <input type="text" v-if="showPwdNew" v-model="pwdNewAgain" minlength="6" maxlength="20"
                   autocomplete="new-password" placeholder="請輸入新支付密碼" class="form-control"
                   @focus="pwdTips=true" @blur="pwdTips=false"
                   v-validate="{rules:{required:true,pwd:true}}" name="pwdNewAgain">
            <span class="icon cipherText" :class="showPwdNew?'icon-eye-open':'icon-eye-close'"
                  @click="showPwdNew = !showPwdNew"></span>
            <!-- <div class="sj-error" v-if="pwdTips && !errors.first('pwdNewAgain')">
               <span></span> <i>請輸入新支付密碼</i>
             </div>-->
            <div class="sj-error" v-if="errors.first('pwdNewAgain')">
              <span></span> <i class="p-error" style="top:-12px;left:8px;">{{errors.first('pwdNewAgain')}}</i>
            </div>
          </div>

          <button type="button" class="btn btn-warning" @click="changePwd">立即修改</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  import PersonalCenterMenu from '../components/PersonalCenterMenu'

  const dictionary = {
    en: {
      custom: {
        oldPwd: {
          required() {
            return '請輸入當前支付密碼'
          }
        },
        pwdNew: {
          required() {
            return '請輸入支付密碼'
          }
        },
        pwdNewAgain: {
          required() {
            return '請輸入支付密碼'
          }
        },
        userEmail: {
          required() {
            return '請輸入郵箱地址'
          },

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
      }
    }
  };
  export default {
    name: 'changePayPwd',
    data() {
      return {
        pageStatus: 1,
        showPwd: false,
        showOldPwd: false,
        showPwdNew: false,
        oldPwd: '',
        phone: '',
        pwdNew: '',
        pwdNewAgain: '',
        pwdOldTips: false,
        pwdNewTips: false,
        pwdTips: false,
        userEmail: '',
        codeTips: false,
        getCodeFlag: false,
        imgCode: '',
        hasGetCode: 0,
        getCodeText: '',
        smsCode: '',
        imgUrl: Math.random(),
        TDK: {
          title: '修改支付密碼-聚寶盆',
          keyWords: '網絡理財，互聯網理財，理財，投資，投資理財，個人投資，網貸平臺，網貸投資，網貸，互金，互聯網金融，互金平臺，互聯網金融平臺，聚寶盆，聚寶計劃，分期投，月月盈，年年余，財富，P2P',
          description: '聚寶盆是壹家綜合性互聯網金融平臺，聚寶盆為廣大個人投資理財的用戶提供多元化的選擇與優質的服務。投資理財用戶可通過加入聚寶計劃、分期投、月月盈、年年余等產品進行投資獲得穩定收益。',
        }
      }
    },
    components: {
      'leftMenu': PersonalCenterMenu,
    },
    created() {
      let self = this;
      self.$http.post('/pbap-web/action/customer/query/custAuthInfo', {}).then((res) => {
        self.phone = res.body.respInfo.custInfo.cusMobile;
      });
    },
    computed: {
      userInfo() {
        return this.$store.state.userInfo
      },
    },
    watch: {
      smsCode() {
        this.smsCode = this.smsCode.replace(/\D/g, '');
      },
      /*imgCode(){
        this.pwd = this.pwd.replace(/^[0-9a-zA-Z]*$/,'');
      },*/
    },
    mounted() {
      this.$validator.updateDictionary(dictionary);
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
          'phone': this.phone
        }).then((result) => {
          if (result) {
            self.$http.post('/pbap-web/action/user/query/verifyUser', {
              "usrName": self.phone
            }).then(response => {
              if (response.body.respInfo.userCount == 0) {
                self.loadImage();
                self.$store.commit('setModal', {
                  show: false,
                  type: 'alert',
                  msg: '手機號不存在'
                });
                self.$store.commit('showModal');
              } else {
                self.hasGetCode++;  // 标记用户已经成功获取过验证码
                self.$http.post('/pbap-web/action/user/add/sendSmsCode', {
                  "cusMobile": self.phone,
                  "randNum" : self.imgCode,
                  "smsType": 5,
                }).then(response => {
                  if (response.body.errorInfo.errorCode == '0000') {
                    self.getCodeFlag = true;
                    var countDown = 60;
                    self.getCodeText = countDown + '秒后重新發送';
                    var countDownTime = setInterval(function () {
                      if (countDown > 0) {
                        self.getCodeText = countDown + '秒后重新發送';
                        countDown--;
                      } else {
                        clearInterval(countDownTime);
                        self.getCodeFlag = false;
                      }
                    }, 1000)
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
      emailSet() {
        var self = this;
        this.$validator.validateAll().then((result) => {
          if (result) {
            self.$http.post('/pbap-web/action/user/upt/findPayPwd', {
              "usrName" : self.phone,
              "smsCode" : self.smsCode,
              "newPayPwd" : self.pwdNew
            }).then(response => {
              if (response.body.errorInfo.errorCode == '0000') {
                self.$store.commit('setModal', {
                  show: false,
                  type: 'alert',
                  msg: '支付密碼修改成功',
                  confirmUrl: '/mineAccount'
                });
                self.$store.commit('showModal');
              }
            });
          }
        })
      },
      changePwd() {
        var self = this;
        this.$validator.validateAll({
          'pwdNew': self.pwdNew,
          "pwdNewAgain": self.pwdNewAgain
        }).then((result) => {
          if (result) {
            self.$http.post('/pbap-web/action/user/savePayPwd', {
              "payPwd": self.pwdNew,
              "newUsrPwd": self.pwdNewAgain
            }).then(response => {
              self.$store.commit('setModal', {
                show: false,
                type: 'alert',
                msg: '支付密碼修改成功',
                confirmUrl: '/mineAccount'
              });
              self.$store.commit('showModal');
            });
          }
        });
      }
    }
  }
</script>
