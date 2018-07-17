<template>
    <div class="wrap changeBankCard-content">
        <PageNav message="/myBankcard"></PageNav>
        <div id="checkBankCont" :class="{'checkBankCont-high': checkBankCont}">
            <div class="nav-box mui-bar mui-bar-nav" v-show="checkBankCont">
                <span @click="closeCheckBank" class="go-back mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></span>
                <h1 class="mui-title">支持银行</h1>
            </div>
            <div id="checkBankList">
                <div class="tit">
                    <span class="b1">银行名称</span>
                    <span class="b2">单笔限额</span>
                    <span class="b3">每日限额</span>
                </div>
                <div class="banktxt" v-for="(item,index) in quickBank">
                    <span class="b1">{{ item.bankName }}</span>
                    <span class="b2">{{ $fmoney(item.singleLimit) }}元</span>
                    <span class="b3">{{ $fmoney(item.dailyLimit) }}元</span>
                </div>
            </div>
        </div>
        <div id="zkp-bank">
            <div class="step2-head nav-box mui-bar mui-bar-nav" v-if="secondShow">
                <span @click="preStep" class="go-back mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></span>
                <h1 class="mui-title">换绑银行卡</h1>
            </div>

            <div class="current-progress">
                <div class="step step1 step-high">
                    <span class="cir">1</span>
                    <span class="txt">解绑原银行卡</span>
                    <hr>
                </div>
                <div class="step step2" :class="{'step-high': secondShow || thirdShow}">
                    <span class="cir">2</span>
                    <span class="txt">绑定新银行卡</span>
                    <hr>
                </div>
                <div class="step step3" :class="{'step-high': thirdShow}">
                    <span class="cir">3</span>
                    <span class="txt">换绑完成</span>
                </div>
            </div>

            <form class="mui-input-group red-form" action="" method="post" submit="account" novalidate id="openForm" v-if="firstShow">
                <div class="first-step" v-if="firstShow">
                    <div class="mui-input-row label-input-box">
                        <label>当前银行卡</label>
                        <div class="input-bar">
                            <div class="info" id="oldCardNum">{{bankCardInfo.cardNumShort}}</div>
                        </div>
                    </div>
                    <div class="mui-input-row label-input-box">
                        <label>预留手机号</label>
                        <div class="input-bar">
                            <div class="info" id="oldBankMobile">{{bankCardInfo.bankMobileShort}}</div>
                        </div>
                    </div>
                    <div class="mui-input-row label-input-box">
                        <label>短信验证码</label>
                        <input type="text" class="input-bar" placeholder="请输入短信验证码" autocomplete="off"
                               v-model="oldSmsCode" name="oldSmsCode" minlength="6" maxlength="6"
                               v-validate="{rules:{required:true,digits:6}}">
                        <i class="p-error" v-if="errors.first('oldSmsCode')">{{errors.first('oldSmsCode')}}</i>
                        <span class="inp-other" @click="getCode()" v-if="!getCodeFlag">获取验证码</span>
                        <span class="inp-other btn-code disabled" v-if="getCodeFlag">{{getCodeText}}</span>
                    </div>
                    <button type="button" class="mui-btn base-btn mui-btn-block" @click="account();">下一步</button>
                    <div class="exp">
                        <h1>温馨提示</h1>
                        <p>当前银行卡必须七天内无快速儲值交易方可换绑</p>
                    </div>
                </div>
            </form>
            <form class="mui-input-group red-form" action="" method="post" submit="changeBank" novalidate id="secondForm" v-show="secondShow">
                <div class="next-step">
                    <div class="mui-input-row label-input-box">
                        <label>银行卡号</label>
                        <input type="tel" placeholder="绑定前请查看支持银行和其限额" class="input-bar mui-input-clear"
                               v-model="newCardNum" name="newCardNum" autocomplete="off" maxlength="20"
                               v-validate="{rules:{required:true}}">
                        <i class="p-error" >{{errors.first('newCardNum')}}</i>
                    </div>

                    <div class="mui-input-row label-input-box">
                        <div class="go-support" @click="checkBank">查看支持银行>></div>
                    </div>
                    <div class="mui-input-row label-input-box">
                        <label>开户行</label>
                        <div class="choiceCity">
                            <v-distpicker v-on:selected="getProCity"></v-distpicker>
                        </div>
                        <i class="p-error" v-if="proErroShow">请选择省份</i>
                        <i class="p-error" v-if="cityErroShow">请选择城市</i>
                        <div class="openBank">
                            <select name="bankCode" v-model="bankCode" class="select-long" v-validate="{rules:{required:true}}">
                                <option value>请选择银行卡开户银行</option>
                                <option v-if="bankList.length>0" v-for="item in bankList" :value="item.bankCode">
                                    {{item.bankName}}
                                </option>
                            </select>
                            <i class="p-error">{{errors.first('bankCode')}}</i>
                        </div>
                    </div>
                    <div class="mui-input-row label-input-box">
                        <label>预留手机号</label>
                        <input v-model="bankMobile" type="text" placeholder="请输入银行卡对应的预留手机号" class="input-bar"
                               minlength="11" maxlength="11" autocomplete="off" name="bankMobile"
                               v-validate="{rules:{required:true,digits:11,phoneNum:true}}">
                        <i class="p-error">{{errors.first('bankMobile')}}</i>
                    </div>
                    <div class="mui-input-row label-input-box">
                        <label>短信验证码</label>
                        <input type="text" placeholder="请输入短信验证码"  v-model="smsCode" name="smsCode" autocomplete="off"
                               minlength="6" maxlength="6" v-validate="{rules:{required:true,digits:6}}" class="input-bar">
                        <span class="inp-other" @click="getNewCode()" v-if="!getCodeFlagNew">获取验证码</span>
                        <span class="inp-other btn-code disabled" v-if="getCodeFlagNew">{{getCodeTextNew}}</span>
                        <i class="p-error" v-if="errors.first('smsCode')">{{errors.first('smsCode')}}</i>
                    </div>
                    <button type="button" class="mui-btn base-btn mui-btn-block" @click="changeBank();">立即开通</button>
                    <div class="exp">
                        <h1>温馨提示</h1>
                        <p>连续获取银行短信验证码时间间隔不可小于3分钟</p>
                    </div>
                </div>
            </form>

            <div class="last-step" v-if="thirdShow">
                <div class="bank-success" v-show="successShow">
                    <img src="../assets/images/giraffe_success.png" class="changeSucc">
                    <p class="changeSucc">恭喜您换绑成功！</p>
                </div>
                <div class="bank-fail" v-show="!successShow">
                    <img src="../assets/images/giraffe_fail.png" class="changeFail">
                    <p class="changeFail" id="errorInfo">换绑失败啦！
                        <span>{{ errorMessage }}</span>
                    </p>
                </div>

                <a href="/myBankcard" class="back-my-card mui-btn mui-btn-block">返回我的银行卡</a>
            </div>

            <div class="noposition-bottom" :class="{'consultation-bottom': thirdShow, 'thirdShow-bottom': thirdShow}">
                <div class="canHelp">遇到问题？您可以：<br>
                    1、请拨打客服电话<a href="javascript:phone('400-600-9976')">400-600-9976</a><br>
                    2、关注微信公众号<a href="javascript:void(0);">“上海聚寶盆”</a>留言提问
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import VDistpicker from '../components/Distpicker'
  import PageNav from '@/components/PageNav'

  const dictionary = {
    en: {
      custom: {
        phone: {
          required() {
            return '请输入手机号码'
          },
          digits() {
            return "手机号码为11位数字"
          }
        },
        oldSmsCode: {
          required() {
            return '请输入验证码'
          },
          digits() {
            return '验证码为6位数字'
          },
          hasGetCode() {
            return '请先获取验证码'
          }
        },
        newCardNum: {
          required() {
            return '请输入银行卡号'
          }
        },
        bankCode: {
          required() {
            return '请选择银行卡开户银行'
          }
        },
        bankMobile: {
          required() {
            return '请输入手机号码'
          },
          digits() {
            return "手机号码为11位数字"
          }
        },
        smsCode: {
          required() {
            return '请输入验证码'
          },
          digits() {
            return '验证码为6位数字'
          },
          hasGetCode() {
            return '请先获取验证码'
          }
        },
      }
    }
  }

  export default {
    name: 'ChangeBankCard',
    data() {
      return {
        pageTitle: '换绑银行卡',
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
        quickBank: {},
        checkBankCont: false,
        errorMessage: '原银行卡7天内存在快速交易记录，不可换绑'
      }
    },
    created(){
      var self = this;
      self.$store.commit('setPageTitle', self.pageTitle);

      self.$http.post('/pbap-web/action/bankcard/query/bankcardList', {}).then((res) => {
        self.bankCardInfo = res.body.respInfo.bankCardList[0];
        self.cNum = self.bankCardInfo.cardNum;
        if (self.bankCardInfo.bankMobile && self.bankCardInfo.bankMobile != 'null') {
          self.bMobile = self.bankCardInfo.bankMobile;
          self.hasPhone = true;
        }
      });

      self.$http.post('/pbap-web/action/bankcard/query/bankList?trdCode=OP', {}).then((res) => {
        self.bankList = res.body.respInfo.bankList;
      });

      self.$http.post('/pbap-web/action/customer/quickRechargeLimit?type=1', {}).then((res) => {
        self.quickBank = res.body.respInfo.quickBank;
      });
    },
    components: {
      'VDistpicker': VDistpicker,
      'PageNav': PageNav,
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
            if (!self.provinceId) {
              self.cityErroShow = false;
              self.proErroShow = true;
              return false;
            } else if (!self.cityId) {
              self.proErroShow = false;
              self.cityErroShow = true;
              return false;
            }
            let query = {
              "oldCardNum": self.cNum,
              "oldBankMobile": self.allMobile,
              "oldSmsCode": self.oldSmsCode,
              "cardNum": self.newCardNum,
              "bankMobile": self.bankMobile,
              "smsCode": self.smsCode,
              "bankCode": self.bankCode,
              "provinceId": self.provinceId,
              "areaId": self.cityId,
            }
            self.$http.post('/pbap-web/action/customer/upt/changeBindingCard', query).then((res) => {
              if (res.body.errorInfo.errorCode == "0000") {
                self.secondShow = false;
                self.thirdShow = true;
                self.successShow = true;
              }
              else {
                if (res.body.errorInfo.errorCode == "10005097") {
                  self.secondShow = false;
                  self.thirdShow = true;
                  self.successShow = false;
                  self.errorMessage = res.body.errorInfo.errorMessage;
                }
                self.getCodeFlag = false;
                self.getCodeFlagNew = false;
              }
            });
          }
          else{
            console.log(result)
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
              self.getCodeText = countDown + '秒后重新发送';

              var countDownTime = setInterval(function () {
                if (countDown > 0) {
                  self.getCodeText = countDown + '秒后重新发送';
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
              self.getCodeTextNew = countDownNew + '秒后重新发送'

              var countDownTime = setInterval(function () {
                if (countDownNew > 0) {
                  self.getCodeTextNew = countDownNew + '秒后重新发送';
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
        //this.$el.querySelector('.step2').setAttribute("class", "step-high");
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
      checkBank () {
        let self = this;
        self.checkBankCont = true;

      },
      closeCheckBank() {
        let self = this;
        self.checkBankCont = false;
      }
    }
  }
</script>
