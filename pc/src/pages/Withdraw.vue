<template>
  <div id="PersonalCenter" class="rw-content profile clearfix" v-TDK="TDK">
    <div class="container">
     <!-- <ol class="breadcrumb">
        <span>您現在的位置：</span>
        &lt;!&ndash;<li><router-link to="/accountOverview">我的帳戶</router-link></li>&ndash;&gt;
        <li><router-link to="/accountNew">我的帳戶</router-link></li>
        <li class="active">提領</li>
      </ol>-->
      <!--<leftMenu></leftMenu>-->
      <div class="pull-left right_content">
        <ul class="top-title-line list-inline">
          <li class="top-line1 top-orange"><span class="active">提領</span></li>
        </ul>

        <div class="tied-card" id="hasBalance" v-if="withdrawBefore">
          <div action="" method="post" submit="withdraw" novalidate class="form-horizontal" id="withdrawForm">
            <div class="personal-bar form-group">
              <h1>可提領金額</h1>
              <span>{{$fmoney(accountInfo.balanceAmount)}}元</span>
            </div>
            <div class="personal-bar form-group">
              <h1>提領金額</h1>
              <input type="text" name="trdAmount" v-model="trdAmount" placeholder="請輸入提領金額"
                     autocomplete="off" maxlength="10" v-validate="{rules:{required:true,lessThan:accountInfo.balanceAmount,moreThan2:0}}">
              <i class="yuan">元</i>
              <div class="sj-error" v-if="errors.first('trdAmount')">
                <span></span> <i class="set-normal">{{errors.first('trdAmount')}}</i>
              </div>
            </div>
            <div class="personal-bar form-group">
              <h1>支付密碼</h1>
              <input type="password" v-if="!showPwd" v-model="payPwd" minlength="6" maxlength="20"
                     autocomplete="new-password" placeholder="請輸入支付密碼" class="form-control"
                     @focus="pwdTips=true" @blur="pwdTips=false"
                     v-validate="{rules:{required:true,payPwd:true}}" name="payPwd">
              <input type="text" v-if="showPwd" v-model="payPwd" minlength="6" maxlength="20"
                     autocomplete="new-password" placeholder="請輸入支付密碼" class="form-control"
                     @focus="pwdTips=true" @blur="pwdTips=false"
                     v-validate="{rules:{required:true,payPwd:true}}" name="payPwd">
              <span class="icon cipherText" :class="showPwd?'icon-eye-open':'icon-eye-close'"
                    @click="showPwd = !showPwd"></span>
              <div class="sj-error" v-if="errors.first('payPwd')">
                <span></span> <i class="set-normal">{{errors.first('payPwd')}}</i>
              </div>
            </div>
            <a class="forget-pay-pwd-rech" href="/changePayPwd">忘記密碼</a>
          </div>

          <button type="button" class="btn btn-warning" @click="withdraw()">立即提領</button>
          <!--<div class="with-tip">
            <img src="../assets/images/wth-tip.png" style="margin-top: 2px;"><span class="tip-top">溫馨提示</span>
            <p>1、用戶提領暫全程免費</p>
            <p>2、提領需先開通上海銀行資金存管帳戶</p>
            <p>3、當天匯款資金24小時後才可提領<br>遇到問題？請撥打客服電話<span>400-600-9976</span>或關註微信公眾號<span>“上海聚寶盆”</span>留言提問</p>
          </div>-->
        </div>
        <div class="rechar-after" v-if="!withdrawBefore">
          <p class="rechar-remi">匯款單</p>
          <p class="rechar-amount">${{withdrawInfo.trdAmount}}</p>
          <p class="rechar-status">待支付</p>
          <div class="clearfix"><label>收款方戶名</label><span>{{withdrawInfo.bankAcctName}}</span></div>
          <div class="clearfix"><label>收款方開戶行</label><span>{{withdrawInfo.bankName}}</span></div>
          <div class="clearfix"><label>收款方帳號</label><span>{{withdrawInfo.bankAccount}}</span></div>
          <div class="clearfix"><label>匯款時備註內容</label><span><i class="set-color">{{withdrawInfo.rechargeCode}}</i>（請務必填寫）</span>
          </div>
          <button type="button" class="btn btn-warning" @click="returnBt();">返回</button>
        </div>
        <div class="not-card no-balance" id="noCard">您暫未綁定銀行資料，請在匯款時進行綁卡！</div>
        <div class="not-card no-balance" id="noBalance">沒有餘額，無法提領！</div>

      </div>
    </div>
  </div>
</template>
<script>
  import PersonalCenterMenu from '../components/PersonalCenterMenu'
  const dictionary = {
    en: {
      custom: {
        trdAmount: {
          required(){
            return '請輸入提領金額'
          },
          moreThan2(){
            return '請輸入提領金額'
          },
          lessThan(){
            return '餘額不足，無法提領'
          }
        },
        payPwd: {
          required() {
            return '請輸入支付密碼'
          },
        },
      }
    }
  };

  export default {
    name: 'Withdraw',
    data () {
      return {
        showPwd:false,
        trdAmount: '',
        tipList:[],
        bankTypeList:[],
        payPwd: '',
        withdrawInfo: {},
        withdrawBefore:true,
        pwdTips: false,
        TDK:{
          title:'提領-聚寶盆',
          keyWords:'網絡理財，互聯網理財，理財，投資，投資理財，個人投資，網貸平臺，網貸投資，網貸，互金，互聯網金融，互金平臺，互聯網金融平臺，聚寶盆，聚寶計劃，分期投，月月盈，年年余，財富，P2P',
          description:'聚寶盆是壹家綜合性互聯網金融平臺，聚寶盆為廣大個人投資理財的用戶提供多元化的選擇與優質的服務。投資理財用戶可通過加入聚寶計劃、分期投、月月盈、年年余等產品進行投資獲得穩定收益。',
        }
      }
    },
    components: {
      'leftMenu': PersonalCenterMenu,
    },
    created () {
      var self = this;

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
      withdraw(){
        var self = this;
        this.$validator.validateAll().then((result)=>{
          if(result){
            /* self.$store.commit('setModal',{
               show:false,
               type:'confirm',
               msg:'您的提領是否成功？',
               cancelUrl:'/helpCenter#6',
               cancelText:'遇到問題',
               confirmUrl:'/accountOverview',
               confirmText:'提領成功'
             });
             self.$store.commit('showModal');*/
            // window.open('/withdraw-handle?trdAmount='+this.trdAmount)
            let query = {};
            query.trdAmount = self.trdAmount;
            query.payPwd = self.payPwd;
            query.remark = '';
            self.$http.post('/pbap-web/action/trade/add/withdraw', query).then((res) => {
              location.href='/withdrawalsSuccess'
              /*self.withdrawBefore = false;
              self.withdrawInfo = res.body.respInfo;
              self.withdrawInfo.trdAmount = self.$fmoney(self.withdrawInfo.trdAmount);
              console.log(res.body.respInfo)*/
            },(res)=>{
              this.$store.commit('setModal',{
                type:'alert',
                msg:'請求失敗，請稍後重試！',
              })
              this.$store.commit('showModal')
            });
          }
        });
      },
      returnBt(){
        location.reload();
      },
    }
  }
</script>

