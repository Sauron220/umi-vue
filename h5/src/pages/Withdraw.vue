<template>
    <div class="wrap rw-content">
        <PageNav :message="goBackBtn()"></PageNav>
        <div id="sand-box" v-if="!formInfo">
            <form class="mui-input-group red-form" method="post" submit="withdraw" novalidate id="withdrawForm">
                <div class="mui-input-row label-input-box">
                    <label>可提现余额</label>
                    <p class="reserve-txt text-orange" id="balance">{{ $fmoney(accountInfo.balanceAmount) }} 元</p>
                    <span class="inp-other all-in" @click="allIn">全额提现</span>
                    <div class="withdraw-alert">*儲值金额在24小时内无法提现</div>
                </div>
                <div class="mui-input-row label-input-box">
                    <label>提现金额</label>
                    <input type="text" name="trdAmount" v-model="trdAmount" class="input-bar mui-input-clear"
                           autocomplete="off" maxlength="10" placeholder="请输入金额"
                           v-validate="{rules:{required:true,lessThan:accountInfo.balanceAmount,moreThan2:0}}">
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
                <button type="button" class="mui-btn base-btn mui-btn-block" @click="withdraw()"
                :disabled="accountInfo.balanceAmount == 0">提现</button>
            </form>

            <div class="exp">
                <h1>温馨提示</h1>
                <p>1、用户提现暂全程免费<br>2、提现需先开通上海银行资金存管账户</p>
            </div>

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
                <h1 class="mui-title">提现</h1>
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
          required(){
            return '请输入提现金额'
          },
          moreThan2(){
            return '请输入提现金额'
          },
          lessThan(){
            return '余额不足，无法提现'
          }
        }
      }
    }
  };
  export default {
    name: 'Withdraw',
    data () {
      return {
        pageTitle: '提现',
        trdAmount: '',
        bankCardList: [{}],
        tipList:[],
        bankTypeList:[],
        formInfo: '',
        screenHeight: {
          height : 0
        },
      }
    },
    created(){
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
    computed: {
      accountInfo(){
        return this.$store.state.accountInfo
      }
    },
    mounted(){
      this.$validator.updateDictionary(dictionary);
    },
    watch:{
      trdAmount(){
        this.trdAmount = this.$typingFormatAmountSimple(this.trdAmount);
      }
    },
    methods: {
      allIn(){
        var self = this;
        self.trdAmount = Math.min(self.accountInfo.balanceAmount);
      },
      withdraw(){
        var self = this;
        self.$validator.validateAll().then((result)=>{
          if(result){
           // let box = self.$el.querySelector('#app-form');
            self.$http.post('/pbap-web/action/trade/add/withdraw', {
              "trdAmount" : self.trdAmount,
            }).then((res) => {
              self.formInfo = res.body.respInfo.form;
              if(self.formInfo){
                self.screenHeight.height = document.body.clientHeight - 50;
               // console.log(box)
                $("#app-form").append(self.formInfo)
              }
            })
          }
        })
      },
      closeFormInfo(){
        location.reload()
      },
      goBackBtn(){
        let prevUrl = window.location.search.substring(4);
        if(prevUrl){
          return '/' + prevUrl
        } else {
          return '/profile'
        }
      }
    }

  }
</script>
