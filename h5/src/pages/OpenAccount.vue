<template>
    <div class="wrap changeBankCard-content openAccount-content">
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
        <div id="zkp-box" v-if="!formInfo">
            <div class="top-banner" :class="{'banner-open': tpStatus == true, 'banner-activation': isActivateStatus == true}"></div>
            <div id="openForm" v-show="tpStatus == true">
                <form action="" method="post" novalidate id="tpAuthForm" class="mui-input-group red-form">
                    <div class="mui-input-row label-input-box">
                        <label>真实姓名</label>
                        <input type="text" placeholder="请输入本人姓名，核实后不可修改" class="input-bar mui-input-clear"
                               v-model="realName" autocomplete="off" name="realName" maxlength="10"
                               v-validate="{rules:{required:true,chinese:true}}">
                        <i class="p-error">{{errors.first('realName')}}</i>
                    </div>
                    <div class="mui-input-row label-input-box">
                        <label>身份证号</label>
                        <input type="text" placeholder="请输入本人身份证号，核实后不可修改" class="input-bar mui-input-clear"
                               v-model="idNum" maxlength="18" autocomplete="off" name="idNum"
                               v-validate="{rules:{required:true,idNumber:true}}">
                        <i class="p-error">{{errors.first('idNum')}}</i>
                    </div>
                    <div class="mui-input-row label-input-box">
                        <label>银行卡号</label>
                        <input type="text" placeholder="绑定前请查看支持银行和其限额" class="input-bar mui-input-clear"
                               v-model="cardNum" maxlength="20" autocomplete="off" name="cardNum"
                               v-validate="{rules:{required:true,bankCardNum:true}}">
                        <i class="p-error" style="top: 58px;">{{errors.first('cardNum')}}</i>
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
                        <span class="inp-other" @click="getCode()" v-if="!getCodeFlag">获取验证码</span>
                        <span class="inp-other btn-code disabled" v-if="getCodeFlag">{{getCodeText}}</span>
                        <i class="p-error" v-if="errors.first('smsCode')">{{errors.first('smsCode')}}</i>
                    </div>
                    <span class="mui-btn base-btn mui-btn-block" @click="openSubmit()">立即开通</span>
                </form>
            </div>

            <div id="activationForm" v-show="isActivateStatus == true">
                <form class="mui-input-group red-form" action="" method="post" novalidate id="actForm">
                    <div class="mui-input-row label-input-box">
                        <label>真实姓名</label>
                        <div class="input-bar"><p>{{userName}}</p></div>
                    </div>
                    <div class="mui-input-row label-input-box">
                        <label>身份证号</label>
                        <div class="input-bar"><p>{{userId}}</p></div>
                    </div>
                    <span type="button" class="mui-btn base-btn mui-btn-block" @click="actAuth()">立即激活</span>
                </form>
            </div>

            <div class="canHelp">遇到问题？您可以：<br>
                1、请拨打客服电话<a href="javascript:phone('400-600-9976')">400-600-9976</a></br>
                2、关注微信公众号<a href="javascript:void(0);">“上海聚寶盆”</a>留言提问
            </div>
        </div>
        <div id="app-form" :style="{ height: screenHeight.height + 'px' }"></div>
    </div>
</template>
<script>
  import VDistpicker from '../components/Distpicker'

  const dictionary = {
    en: {
      custom: {
        realName: {
          required() {
            return '请输入真实姓名'
          },
        },
        idNum: {
          required() {
            return '请输入身份证号码'
          },
        },
        currentProvince: {
          required() {
            return '请选择开户行'
          },
        },
        cardNum: {
          required() {
            return '请输入银行卡号'
          },
        },
        bankMobile: {
          required() {
            return '请输入手机号码'
          },
          digits() {
            return '手机号码为11位数字'
          },
        },
        bankCode: {
          required() {
            return '请选择银行卡开户银行'
          },
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
    name: 'OpenAccount',
    data() {
      return {
        pageTitle: '上海银行开户',
        custInfo: null,
        isActivateStatus: false,
        tpStatus: false,
        userId: "",
        userName: "",
        realName: '',
        idNum: '',
        cardNum: '',
        bankMobile: '',
        smsCode: '',
        bankCode: '',
        provinceId: '',
        cityId: '',
        proErroShow: '',
        cityErroShow: '',
        getCodeText: '',
        getCodeFlag: false,
        bankList: {},
        quickBank: {},
        checkBankCont: false,
        formInfo: '',
        screenHeight: {
          height : 0
        }
      }
    },
    created(){
      var self = this;
      self.$store.commit('setPageTitle', self.pageTitle);

      // get开户行列表
      self.$http.post('/pbap-web/action/bankcard/query/bankList?trdCode=OP', {}).then((res) => {
        self.bankList = res.body.respInfo.bankList;
      });
      self.$http.post('/pbap-web/action/customer/quickRechargeLimit?type=1', {}).then((res) => {
        self.quickBank = res.body.respInfo.quickBank;
      });
      // get用户激活状态
      self.$http.post('/pbap-web/action/customer/query/custAuthInfo').then((res)=>{
        self.custInfo = res.body.respInfo.custInfo || {};
        self.userId = self.custInfo.idNum;
        self.userName = self.custInfo.realName;

        if(self.custInfo.tpStatus == 0){   //开户
          self.tpStatus = true;
          self.isActivateStatus = false;
        }
        else if(self.custInfo.activateStatus == 0){  //激活
          self.tpStatus = false;
          self.isActivateStatus = true;
        }
      })
    },
    components: {
      'VDistpicker': VDistpicker,
    },
    mounted() {
      this.$validator.updateDictionary(dictionary);
    },
    watch: {
      bankMobile() {
        this.bankMobile = this.bankMobile.replace(/\D/g, '');
      },
      cardNum() {
        this.cardNum = this.cardNum.replace(/\D/g, '');
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
      // 进行激活
      actAuth() {
        let self = this;
        self.$http.post('/pbap-web/action/customer/upt/activateAccount').then((res)=>{
          self.formInfo = res.body.respInfo.form;
          if (self.formInfo) {
            self.screenHeight.height = document.body.clientHeight - 50;
            $("#app-form").append(self.formInfo)
          }
        })
      },
      // 进行开户
      openSubmit() {
        let self = this;
        let openInfo = {
          'realName': self.realName,
          'idNum': self.idNum,
          'cardNum': self.cardNum,
          'bankCode': self.bankCode,
          'provCode': self.provinceId,
          'cityCode': self.cityId,
          'bankMobile': self.bankMobile,
          'smsCode': self.smsCode,
        };

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
            self.$http.post('/pbap-web/action/customer/upt/realNameAuth', openInfo).then((response) => {
              if (response.body.errorInfo.errorCode == "0000") {
                self.formInfo = response.body.respInfo.form;
                if (self.formInfo) {
                  self.screenHeight.height = document.body.clientHeight - 50;
                  $("#app-form").append(self.formInfo)
                }
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
        })
      },
      getCode() {
        let self = this;
        let query = {};
        query.smsType = '7';
        query.cardNum = self.cardNum;
        query.cusMobile = self.bankMobile;
        self.$validator.validateAll({
          'bankMobile': self.bankMobile,
          'cardNum': self.cardNum
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
