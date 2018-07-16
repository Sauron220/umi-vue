<template>
  <div id="ChangeBankCard" class="changeBankCard-content profile clearfix" v-TDK="TDK">
    <div class="container">
      <ol class="breadcrumb">
        <span>您現在的位置：</span>
        <li>
          <router-link to="/accountOverview">我的賬戶</router-link>
        </li>
        <li class="active">添加銀行資料</li>
      </ol>
      <leftMenu></leftMenu>
      <div class="pull-left right_content">
        <ul class="top-title-line list-inline">
          <li class="top-line1 top-orange">添加銀行資料</li>
        </ul>
        <div class="account-content">
          <div class="account-form">
            <!-- <form action="" method="post" submit="account" novalidate
                   id="openForm" v-if="firstShow">
                 <img class="bank-line" src="../assets/images/bank-line-01.jpg">
                 <div class="bank-tip"><span style="color: #ff0000;">溫馨提示：</span>當前銀行資料必須七天內無快捷儲值交易方可換綁。</div>
                 <div class="form_bar clearfix">
                     <span class="input-label">當前銀行資料</span> <label class="form_lab"
                                                                   id="oldCardNum">{{bankCardInfo.cardNumShort}}</label>
                 </div>
                 <div class="form_bar clearfix" name="hasMobile" v-show="hasPhone">
                     <span class="input-label">銀行資料預留手機號</span>
                     <label class="form_lab old_bankMobile">{{bankCardInfo.bankMobileShort}}</label>
                 </div>
                 <div class="form_bar clearfix" name="noMobile" v-show="!hasPhone">
                     <span class="input-label">銀行資料預留手機號</span> <input type="text" placeholder="請輸入預留手機號"
                                                                      class="long_inp" @focus="tips=true"
                                                                      @blur="tips=false"
                                                                      minlength="11" maxlength="11"
                                                                      v-model="phone" name="phone"
                                                                      autocomplete="off"
                                                                      v-validate="{rules:{required:true,digits:10,phoneNum:true}}">
                     <i class="p-error">{{errors.first('phone')}}</i>
                 </div>
                 <div class="form_bar clearfix">
                     <span class="input-label">短信驗證碼</span><input type="text" placeholder="請輸入短信驗證碼"
                                                                  style="width: 260px;" v-model="oldSmsCode"
                                                                  name="oldSmsCode" autocomplete="off"
                                                                  minlength="6"
                                                                  v-validate="{rules:{required:true,digits:6}}"
                                                                  maxlength="6"> <span
                         class="bas_btn vCode" @click="getCode()" v-if="!getCodeFlag">獲取驗證碼</span>
                     <span class="btn btn-warning btn-code disabled" v-if="getCodeFlag" style="height: 40px;line-height: 30px;float: right;">{{getCodeText}}</span>
                     <i class="p-error" v-if="errors.first('oldSmsCode')">{{errors.first('oldSmsCode')}}</i>
                 </div>
                 <a class="bas_btn btn form_submit" href="javascript:void(0)" @click="account();">下壹步</a>

             </form>-->
            <form action="" method="post" submit="changeBank" novalidate
                  id="secondForm">
              <!-- <img class="bank-line" src="../assets/images/bank-line-02.jpg">
               <div class="bank-tip"><span style="color: #ff0000;">溫馨提示：</span>連續獲取銀行短信驗證碼時間間隔不可小於3分鐘。
               </div>-->
              <div class="form_bar clearfix">
                <span class="input-label">銀行資料號</span> <input v-model="newCardNum" type="text"
                                                             placeholder="請輸入銀行資料號"
                                                             class="long_inp" autocomplete="off"
                                                             name="newCardNum" maxlength="20"
                                                             v-validate="{rules:{required:true,bankCardNum:true}}">
                <i class="p-error">{{errors.first('newCardNum')}}</i>
                <!--<div class="pro-tip">僅支持借記卡，不支持信用卡和存折，此卡用於快捷儲值和提領</div>-->
              </div>
              <div class="form_bar clearfix">
                <span class="input-label">開戶銀行</span>
                <!--<v-distpicker v-on:selected="getProCity"></v-distpicker>
                <i class="p-error" v-if="proErroShow">請選擇省份</i>
                <i class="p-error" v-if="cityErroShow">請選擇城市</i>-->
                <select name="bankCode" v-model="bankCode" class="select-03"
                        v-validate="{rules:{required:true}}">
                  <option value>請選擇銀行資料開戶銀行</option>
                  <option v-if="bankList.length>0" v-for="item in bankList" :value="item.bankCode">
                    {{item.bankName}}
                  </option>
                </select>
                <i class="p-error">{{errors.first('bankCode')}}</i>
              </div>
              <!--<div class="form_bar clearfix">
                  <span class="input-label">銀行資料預留手機號</span> <input v-model="bankMobile" type="text"
                                                                   placeholder="請輸入預留手機號"
                                                                   class="long_inp"
                                                                   minlength="11" maxlength="11"
                                                                   autocomplete="off" name="bankMobile"
                                                                   v-validate="{rules:{required:true,digits:10,phoneNum:true}}"
              >
                  <i class="p-error">{{errors.first('bankMobile')}}</i>
              </div>-->
              <!--<div class="form_bar clearfix">
                  <span class="input-label">短信驗證碼</span><input type="text" placeholder="請輸入短信驗證碼"
                                                               style="width: 260px;" v-model="smsCode"
                                                               name="smsCode" autocomplete="off"
                                                               minlength="6"
                                                               v-validate="{rules:{required:true,digits:6}}"
                                                               maxlength="6">
                  <span class="bas_btn vCode" @click="getNewCode()" v-if="!getCodeFlagNew">獲取驗證碼</span>
                  <span class="btn btn-warning btn-code disabled" v-if="getCodeFlagNew" style="height: 40px;line-height: 30px;float: right;">{{getCodeTextNew}}</span>
                  <i class="p-error" v-if="errors.first('smsCode')">{{errors.first('smsCode')}}</i>

              </div>-->
              <!--<a class="bas_btn btn btn_pre" href="javascript:void(0)"
                 @click="preStep();">上壹步</a>-->
              <a class="bas_btn btn form_submit" href="javascript:void(0)"
                 @click="changeBank();">立即添加</a>
            </form>
            <!--<div class="bank-third" id="third" v-if="thirdShow">
                <img class="bank-line" src="../assets/images/bank-line-03.jpg">
                <div class="bank-success" v-show="successShow">
                    <img class="third-img" src="../assets/images/check-right.png">
                    <div class="third-text">綁定成功</div>
                </div>
                <div class="bank-fail" v-show="!successShow">
                    <img class="third-img" src="../assets/images/check-fail.png">
                    <div class="third-text">綁定失敗</div>
                    <div style="color:#595757;">原銀行資料7天內存在快捷交易記錄，不可換綁</div>
                </div>
                <a class="bas_btn btn chbk-btn" href="/myBankcard">返回我的銀行資料</a>
            </div>-->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import VDistpicker from '../components/Distpicker'
  import PersonalCenterMenu from '../components/PersonalCenterMenu'

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
        oldSmsCode: {
          required() {
            return '請輸入驗證碼'
          },
          digits() {
            return '驗證碼為6位數字'
          },
          hasGetCode() {
            return '請先獲取驗證碼'
          }
        },
        newCardNum: {
          required() {
            return '請輸入銀行資料號'
          }
        },
        bankCode: {
          required() {
            return '請選擇銀行資料開戶銀行'
          }
        },
        bankMobile: {
          required() {
            return '請輸入手機號碼'
          },
          digits() {
            return "手機號碼為10位數字"
          }
        },
        smsCode: {
          required() {
            return '請輸入驗證碼'
          },
          digits() {
            return '驗證碼為6位數字'
          },
          hasGetCode() {
            return '請先獲取驗證碼'
          }
        },
      }
    }
  }

  export default {
    name: 'ChangeBankCard',
    data() {
      return {
        hasPhone: false,
        bankCardInfo: {},
        bankList: {},
        cNum: '',
        bMobile: '',
        phone: '',
        oldSmsCode: '',
        smsCode: '',
        hasGetCode: 0,
        tips: false,
        getCodeText: '',
        getCodeFlag: false,
        firstShow: true,
        secondShow: false,
        thirdShow: false,
        allMobile: '',
        bankMobile: '',
        newCardNum: '',
        getCodeFlagNew: false,
        getCodeTextNew: '',
        provinceId: '',
        cityId: '',
        bankCode: '',
        successShow: false,
        proErroShow: false,
        cityErroShow: false,
        TDK:{
          title:'換綁銀行資料',
          keyWords:'網絡理財，互聯網理財，理財，投資，投資理財，個人投資，網貸平臺，網貸投資，網貸，互金，互聯網金融，互金平臺，互聯網金融平臺，聚寶盆，聚寶計劃，分期投，月月盈，年年余，財富，P2P',
          description:'聚寶盆是壹家綜合性互聯網金融平臺，聚寶盆為廣大個人投資理財的用戶提供多元化的選擇與優質的服務。投資理財用戶可通過加入聚寶計劃、分期投、月月盈、年年余等產品進行投資獲得穩定收益。',
        }
      }
    },
    components: {
      'VDistpicker': VDistpicker,
      'leftMenu': PersonalCenterMenu,
    },

    created() {
      let self = this;
      /* self.$http.post('/pbap-web/action/bankcard/query/bankcardList', {}).then((res) => {
         self.bankCardInfo = res.body.respInfo.bankCardList[0];
         self.cNum = self.bankCardInfo.cardNum;
         if (self.bankCardInfo.bankMobile && self.bankCardInfo.bankMobile != 'null') {
           self.bMobile = self.bankCardInfo.bankMobile;
           self.hasPhone = true;
         }
       });*/
      self.$http.post('/pbap-web/action/bankcard/query/bankList?trdCode=OP', {}).then((res) => {
        self.bankList = res.body.respInfo.bankList;
      });
    },
    mounted() {
      this.$validator.updateDictionary(dictionary);
    },
    watch: {
      phone() {
        this.phone = this.phone.replace(/\D/g, '');
      },
      bankMobile() {
        this.bankMobile = this.bankMobile.replace(/\D/g, '');
      },
      newCardNum() {
        this.newCardNum = this.newCardNum.replace(/\D/g, '');
      },
    },
    methods: {
      getProCity(data) {
        let self = this;
        self.provinceId = data.province.code;
        self.cityId = data.city.code;
        self.proErroShow = false;
        self.cityErroShow = false;
      },
      changeBank() {
        let self = this;
        self.$validator.validateAll().then((result) => {
          if (result) {
            self.$http.post('/pbap-web/action/bankcard/add', {
              'cardNum':this.newCardNum,
              bankCode:this.bankCode
            }).then((res) => {
              if (res.body.errorInfo.errorCode == "0000") {
                location.href = '/MyBankcard';
              }else {
                this.$store.commit('setModal',{
                  type:'alert',
                  msg:'添加銀行資料失敗，請稍後重試！',
                })
                this.$store.commit('showModal')
              }
            },(res) => {
              self.$store.commit('setModal', {
                show: false,
                type: 'alert',
                msg: res.body.errorInfo.errorMessage
              });
              self.$store.commit('showModal');
            });
          }
        });
      },
      getCode() {
        let self = this;
        let query = {};
        if (!self.hasPhone) {
          self.allMobile = self.phone;
        } else {
          self.allMobile = self.bMobile;
        }
        query.smsType = '5';
        query.cardNum = self.cNum;
        query.cusMobile = self.allMobile;
        self.$validator.validateAll({
          'phone': self.allMobile
        }).then((result) => {
          if (result) {
            self.hasGetCode++;
            self.$http.post('/pbap-web/action/customer/add/sendSmsCodeForPnr', query).then((res) => {
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
            }, (res) => {
              self.$store.commit('setModal', {
                show: false,
                type: 'alert',
                msg: res.body.errorInfo.errorMessage
              });
              self.$store.commit('showModal');
            });
          }
        });
      },
      getNewCode() {
        let self = this;
        let validateQuery = {};
        let query = {};
        validateQuery.newCardNum = self.newCardNum;
        validateQuery.bankMobile = self.bankMobile;
        query.smsType = '6';
        query.cardNum = self.newCardNum;
        query.cusMobile = self.bankMobile;
        self.$validator.validateAll(validateQuery).then((result) => {
          if (result) {
            self.hasGetCode++;
            self.$http.post('/pbap-web/action/customer/add/sendSmsCodeForPnr', query).then((res) => {
              self.getCodeFlagNew = true;
              var countDownNew = 60;
              self.getCodeTextNew = countDownNew + '秒後重新發送'

              var countDownTime = setInterval(function () {
                if (countDownNew > 0) {
                  self.getCodeTextNew = countDownNew + '秒後重新發送';
                  countDownNew--;
                } else {
                  clearInterval(countDownTime);
                  self.getCodeFlagNew = false;
                }
              }, 1000)
            }, (res) => {
              self.$store.commit('setModal', {
                show: false,
                type: 'alert',
                msg: res.body.errorInfo.errorMessage
              });
              self.$store.commit('showModal');
            });
          }
        });
      },
      account() {
        let self = this;
        let validate = {};
        if (!self.hasPhone) {
          validate.phone = self.phone;
        } else {
          validate.phone = self.bMobile;
        }
        validate.oldSmsCode = self.oldSmsCode;
        this.$validator.validateAll(validate).then((result) => {
          if (result) {
            self.firstShow = false;
            self.secondShow = true;
          }
        });
        return false;
      },
      preStep() {
        let self = this;
        self.firstShow = true;
        self.secondShow = false;
      },
    }
  }
</script>
