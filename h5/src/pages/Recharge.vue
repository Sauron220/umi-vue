<template>
    <div class="wrap rw-content">
        <PageNav :message="goBackBtn()"></PageNav>
        <div id="sand-box" v-if="!formInfo" >
            <form class="mui-input-group red-form">
                <div class="mui-input-row label-input-box">
                    <label>儲值金额</label>
                    <input type="text" name="trdAmount" v-model="trdAmount"
                           class="input-bar mui-input-clear" placeholder="请输入金额"
                           autocomplete="off" maxlength="10" v-validate="{rules:{required:true}}">
                    <i class="p-error">{{errors.first('trdAmount')}}</i>
                    <i class="right-txt">元</i>
                </div>
                <div class="mui-input-row label-input-box">
                    <label>银行卡</label>
                    <div id="showCard">
                        <img id="bankIcon" :src="bankCardList.bankIconUri">
                        <span id="bankName">{{ bankCardList.bankName }} 储蓄卡</span>
                    </div>
                    <span class="bank-num">尾号 {{ bankCardList.lastCardNum }}</span>
                </div>
                <div id="quotaAmount" class="kj-span">
                    {{ bankCardList.quotaAmount }}<div>更高额度请使用电脑至网站选择网银儲值</div>
                </div>
                <div class="mui-input-row label-input-box">
                    <label>预留手机号</label>
                    <p class="reserve-txt" id="bankMobile">{{ bankCardList.bankMobileShort }}</p>
                </div>
                <div class="mui-input-row label-input-box">
                    <label>短信验证码</label>
                    <input type="text" v-model="smsCode" name="smsCode" placeholder="请输入短信验证码"
                           @focus="codeTips=true" @blur="codeTips=false" class="input-bar mui-input-clear"
                           v-validate="{rules:{required:true,digits:6}}" minlength="6" maxlength="6">
                    <i class="p-error" v-if="errors.first('smsCode')">{{errors.first('smsCode')}}</i>
                    <span class="inp-other" @click="getCode()" v-if="!getCodeFlag">获取验证码</span>
                    <span class="inp-other btn-code disabled" v-if="getCodeFlag">{{getCodeText}}</span>
                </div>
                <button type="button" class="mui-btn base-btn mui-btn-block" @click="recharge()">立即儲值</button>
            </form>

            <div style="margin-top: 12%">
                <div class="canHelp">遇到问题？您可以：<br>
                    1、请拨打客服电话<a href="javascript:phone('400-600-9976')">400-600-9976</a><br>
                    2、关注微信公众号<a href="javascript:void(0);">“上海聚寶盆”</a>留言提问
                </div>
            </div>
        </div>
        <div id="app-form" :style="{ height: screenHeight.height + 'px'}">
            <div class="nav-box mui-bar mui-bar-nav" v-show="formInfo">
                <span @click="closeFormInfo" class="go-back mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></span>
                <h1 class="mui-title">儲值</h1>
            </div>
        </div>
    </div>
</template>

<script>
  import PageNav from '@/components/PageNav'
  const dictionary = {
    en: {
      custom: {
        trdAmount: {
          required() {
            return '请输入儲值金额'
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
        }
      }
    }
  };

  export default {
    name: 'Recharge',
    data() {
      return {
        pageTitle: '儲值',
        trdAmount: '',
        bankCardList: [{}],
        bankMobile: '',
        getCodeFlag: false,
        smsCode: '',
        payType: '',
        codeTips: false,
        getCodeText: '',
        hasGetCode: 0,
        formInfo: '',
        screenHeight: {
          height : 0
        }
      }
    },
    created() {
      var self = this;
      self.$store.commit('setPageTitle', self.pageTitle);
      // get银行卡資訊
      self.$http.post('/pbap-web/action/bankcard/query/bankcardList', {}).then((res) => {
        self.bankCardList = res.body.respInfo.bankCardList[0];
        self.bankMobile = self.bankCardList.bankMobile;
        self.cardNum = self.bankCardList.cardNum;
      });

    },
    components : {
      'PageNav': PageNav,
    },
    mounted() {
      this.$validator.updateDictionary(dictionary);
    },
    watch: {
      trdAmount() {
        this.trdAmount = this.$typingFormatAmountSimple(this.trdAmount);
      }
    },
    methods: {
      recharge() {
        var self = this;
        this.$validator.validateAll().then((result) => {
          if(result){
            self.$http.post('/pbap-web/action/trade/add/recharge', {
              "trdAmount" : self.trdAmount,
              "payType" : 1,
              "validateCode" : self.smsCode
            }).then((res) => {
              self.formInfo = res.body.respInfo.form;
              if (self.formInfo) {
                self.screenHeight.height = document.body.clientHeight - 50;
                $("#app-form").append(self.formInfo)
              }
            })
          }
        })
        return false;
      },
      getCode() {
        var self = this;
        if (self.bankMobile) {
          self.hasGetCode++;
          self.$http.post('/pbap-web/action/customer/add/sendSmsCodeForPnr', {
            "cusMobile": self.bankMobile,
            "smsType": 8,
            "cardNum" : self.cardNum
          }).then((res) => {
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
      },
      closeFormInfo(){
        location.reload()
      },
      goBackBtn(){
        let prevUrl = decodeURIComponent(window.location.search.substring(4));
        if(prevUrl){
          return '/' + prevUrl
        }
        else {
          return '/profile'
        }

      }
    }
  }
</script>

