<template>
  <div id="PersonalCenter" class="rw-content recharge-content profile clearfix" v-TDK="TDK">
    <div class="container">
      <ol class="breadcrumb">
        <span>您現在的位置：</span>
        <li>
          <!--<router-link to="/accountOverview">我的賬戶</router-link>-->
          <router-link to="/accountNew">我的賬戶</router-link>
        </li>
        <li class="active">儲值</li>
      </ol>
      <!--<leftMenu></leftMenu>-->
      <div class="pull-left right_content">
        <ul class="top-title-line list-inline">
          <li class="top-line1 top-orange"><span class="active">儲值</span></li>
        </ul>

        <form v-if="rechargeBefore">
          <div class="tied-card">
            <div class="personal-bar form-group">
              <h1>儲值金額</h1>
              <input type="text" name="trdAmount" v-model="trdAmount" placeholder="請輸入儲值金額"
                     autocomplete="off" maxlength="10" v-validate="{rules:{required:true,moreThan2:0}}">
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
                    @click="showPwd = !showPwd" style="width:30px;"></span>
              <div class="sj-error" v-if="errors.first('payPwd')">
                <span></span><i class="set-normal">{{errors.first('payPwd')}}</i>
              </div>
            </div>
            <a class="forget-pay-pwd-rech" href="/changePayPwd">忘記密碼</a>
            <!-- <div class="rechar-tab clearfix">
               <div class="tab tab-kj" :class="{'tab-hover':isTabHover}" @click="isTabHover = true">快捷儲值
               </div>
               <div class="tab tab-wy" :class="{'tab-hover':!isTabHover}" @click="isTabHover = false">
                 網銀儲值
               </div>
               <a href="javascript:;" @click="allTips" class="rechar-tab-tips">查看儲值限額表 >></a>
               <div class="kj-content clearfix" v-show="isTabHover">
                 <div class="bar clearfix">
                   <h1>預留手機號</h1>
                   <label name="bankMobile">{{bankMobile}}</label>
                 </div>
               </div>
               <div class="kj-sj" :class="{'wy-sj':!isTabHover}"></div>
               <div class="wy-content clearfix" v-show="!isTabHover" style="display: none;">
                 <h1>儲值銀行</h1>
                 <ul class="bank-list clearfix" id="bankList">
                   <li class="bank-li" @click="selectCode=item.bankCode" v-for="item in bankList">
                     <img v-if="selectCode!=item.bankCode" class="select" src="../assets/images/rech-01.jpg">
                     <img v-if="selectCode==item.bankCode" class="select" src="../assets/images/rech-02.jpg">
                     <img class="bank-img" :src="'/static/img/'+item.bankCode+'.jpg'">
                   </li>
                 </ul>
               </div>
             </div>-->
            <button type="button" class="btn btn-warning" @click="recharge()">立即儲值</button>
            <!--  <p>
                遇到問題？請撥打客服電話<span>400-600-9976</span>或關註微信公眾號<span>“上海聚寶盆”</span>留言提問
              </p>-->
          </div>
        </form>
        <div class="rechar-after" v-if="!rechargeBefore">
          <p class="rechar-remi">匯款單</p>
          <p class="rechar-amount">${{rechargeInfo.trdAmount}}</p>
          <p class="rechar-status">待支付</p>
          <div class="clearfix"><label>收款方戶名</label><span>{{rechargeInfo.bankAcctName}}</span></div>
          <div class="clearfix"><label>收款方開戶行</label><span>{{rechargeInfo.bankName}}</span></div>
          <div class="clearfix"><label>收款方賬號</label><span>{{rechargeInfo.bankAccount}}</span></div>
          <div class="clearfix"><label>匯款時備註內容</label><span><i class="set-color">{{rechargeInfo.rechargeCode}}</i>（請務必填寫）</span>
          </div>
          <button type="button" class="btn btn-warning" @click="returnBt();">返回</button>
        </div>
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
          required() {
            return '請輸入儲值金額'
          },
          moreThan2() {
            return '請輸入儲值金額'
          },
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
        payPwd: {
          required() {
            return '請輸入支付密碼'
          },
        }
      }
    }
  };
  export default {
    name: 'Recharge',
    data() {
      return {
        showPwd:false,
        pwdTips: false,
        rechargeBefore: true,
        trdAmount: '',
        payPwd: '',
        bankCardList: {},
        tipList: [],
        bankTypeList: [],
        allMobile: '',
        bankMobile: '',
        getCodeFlag: false,
        smsCode: '',
        payType: '',
        codeTips: false,
        getCodeText: '',
        hasGetCode: 0,
        isTabHover: true,
        bankList: {},
        selectCode: '',
        rechargeInfo: {},

        TDK: {
          title: '儲值-聚寶盆',
          keyWords: '網絡理財，互聯網理財，理財，投資，投資理財，個人投資，網貸平臺，網貸投資，網貸，互金，互聯網金融，互金平臺，互聯網金融平臺，聚寶盆，聚寶計劃，分期投，月月盈，年年余，財富，P2P',
          description: '聚寶盆是壹家綜合性互聯網金融平臺，聚寶盆為廣大個人投資理財的用戶提供多元化的選擇與優質的服務。投資理財用戶可通過加入聚寶計劃、分期投、月月盈、年年余等產品進行投資獲得穩定收益。',
        }
      }
    },
    components: {
      'leftMenu': PersonalCenterMenu,
    },
    created() {
      var self = this;
      /* self.$http.post('/pbap-web/action/bankcard/query/bankcardList', {}).then((res) => {
         self.bankCardList = res.body.respInfo.bankCardList;
         self.tipList = self.bankCardList[0].list;
         self.bankTypeList = self.bankCardList[0].bankTypeList;
       });*/
      self.$http.post('/pbap-web/action/bankcard/query/bankList?trdCode=B2C', {}).then((res) => {
        self.bankList = res.body.respInfo.bankList;
        for (var i = 0; i < self.bankList.length; i++) {
//          self.bankList[i].imgUrl = "../assets/images/" + self.bankList[i].bankCode + ".jpg";
//          console.log(self.bankList[i].bankIconUri)
//          self.bankList[i].imgUrl = self.bankList[i].bankIconUri.replace("h5/","").replace("png","jpg");
        }
      });
      /*self.$http.post('/pbap-web/action/bankcard/query/activeBankCardInfo', {}).then((res) => {
        self.bankMobile = res.body.respInfo.bankCard.bankMobileShort;
        self.allMobile = res.body.respInfo.bankCard.bankMobile;
      });*/
    },
    mounted() {
      this.$validator.updateDictionary(dictionary);
      var self = this;
      /*setTimeout(function () {
        (function(){
          var rows = $('#bankTip tr');
          var large = rows.length;
          rows.eq(0).children('td').eq(0).attr('rowspan',large);
          var rowsLittle = rows.slice(1);
          rowsLittle.each(function(){
            $(this).children('td').eq(0).remove();
          });

          var bankType = self.bankTypeList;
          for(var j=0;j< bankType.length;j++){
            var arrBankType = [];
            var bList = $('.bank-type');
            for(var y =0;y<bList.length;y++){
              if(bList.eq(y).attr('banktype').trim() === bankType[j].bankType.trim()){
                arrBankType.push(bList.eq(y));
              }
            };
            arrBankType[0].attr('rowspan',arrBankType.length);
            for(var x = 0;x<arrBankType.length;x++){
              if(x!=0){
                arrBankType[x].remove();
              }
            }
          }
        })()
      })*/
    },
    watch: {
      trdAmount() {
        this.trdAmount = this.$typingFormatAmountSimple(this.trdAmount);
      }
    },
    methods: {
      allTips() {
        window.open(
          '/recharge-tips-quick',
          '_blank',
          'height=768, width=1100,toolbar=no,scrollbars=yes,menubar=no,status=no'
        )
      },
      recharge() {
        var self = this;
        if (!self.isTabHover && !self.selectCode) {
          self.$store.commit('setModal', {
            show: false,
            type: 'alert',
            msg: '請選擇儲值銀行'
          });
          self.$store.commit('showModal');
          return false;
        }
        this.$validator.validateAll().then((result) => {
          if (result) {
            /*self.$store.commit('setModal', {
              show: false,
              type: 'confirm',
              msg: '您的儲值是否成功？',
              cancelUrl: '/helpCenter#5',
              cancelText: '遇到問題',
              confirmUrl: '/accountOverview',
              confirmText: '儲值成功'
            });
            self.$store.commit('showModal');*/
            let query = {};
            query.trdAmount = self.trdAmount;
            query.payPwd = self.payPwd;
            if (self.isTabHover) {
              query.payType = 1;
              // window.open('/recharge-handle?trdAmount=' + this.trdAmount + '&payType=' + this.payType);
            } else {
              query.payType = 0;
              query.trdBank = self.selectCode;
              // window.open('/recharge-handle?trdAmount=' + this.trdAmount + '&payType=' + this.payType + '&selectCode=' + this.selectCode);
            }
            self.$http.post('/pbap-web/action/trade/add/recharge', query).then((res) => {
              self.rechargeBefore = false;
              self.rechargeInfo = res.body.respInfo;
              self.rechargeInfo.trdAmount = self.$fmoney(self.rechargeInfo.trdAmount);
            }, (res) => {
              this.$store.commit('setModal', {
                type: 'alert',
                msg: '請求失敗，請稍後重試！',
              })
              this.$store.commit('showModal')
            });
          }
        });
        return false;
      },
      getCode() {
        var self = this;
        if (self.allMobile) {
          self.hasGetCode++;
          self.$http.post('/pbap-web/action/customer/add/sendSmsCodeForPnr', {
            "cusMobile": self.allMobile,
            "smsType": 8
          }).then((res) => {
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
      },
      returnBt(){
        location.reload();
      }
    }
  }
</script>

