<template>
  <div id="PersonalCenter" class="transactionDetails-content profile clearfix" v-TDK="TDK">
    <div class="container">
      <ol class="breadcrumb">
        <span>您現在的位置：</span>
        <li><router-link to="/accountOverview">我的帳戶</router-link></li>
        <li><router-link to="/transactionRecord">交易記錄</router-link></li>
        <li class="active">交易詳情</li>
      </ol>
      <leftMenu></leftMenu>
      <div class="pull-left right_content">
        <ul class="top-title-line list-inline">
          <li class="top-line1 top-orange">交易詳情</li>
        </ul>

        <div class="table-responsive">
          <table class="table table-striped">
            <tr class="tr-high" v-if="tradeInfo.prdName">
              <td width="300">產品</td>
              <td width="700" id="prdName">{{tradeInfo.prdName}}</td>
            </tr>
            <tr class="tr-high">
              <td>類型</td>
              <td id="trdType">{{getStatus($route.params.tradeType)}}</td>
            </tr>
            <tr class="tr-high">
              <td>交易號</td>
              <td id="tradeCode">{{tradeInfo.trdNum}}</td>
            </tr>
            <tr class="tr-high">
              <td>實際金額</td>
              <td id="trdAmount">{{$fmoney(tradeInfo.trdAmount)}}元</td>
            </tr>
            <tr class="tr-high" v-if="$route.params.tradeType == 'RP'">
              <td>加息券獎勵</td>
              <td id="pInterests">{{$fmoney(tradeInfo.pInterests)}}元</td>
            </tr>
            <tr class="tr-high">
              <td>交易結果</td>
              <td id="trdStatus">{{getTrdStatus(tradeInfo.trdStatus,$route.params.tradeType)}}</td>
            </tr>
            <tr class="tr-high" v-if="$route.params.tradeType == 'CO'">
              <td>匯款验证码</td>
              <td id="verifyCode">{{tradeInfo.verifyCode}}</td>
            </tr>
            <tr class="tr-high">
              <td>交易創建時間</td>
              <td id="preTime">{{tradeInfo.preTime}}</td>
            </tr>
            <tr class="tr-high">
              <td>交易完成時間</td>
              <td id="endTime">{{tradeInfo.endTime}}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import PersonalCenterMenu from '../components/PersonalCenterMenu'

  export default {
    name: 'TransactionDetails',
    data () {
      return {
        tradeInfo: {},
        TDK:{
          title:'交易詳情-聚寶盆',
          keyWords:'網絡理財，互聯網理財，理財，投資，投資理財，個人投資，網貸平臺，網貸投資，網貸，互金，互聯網金融，互金平臺，互聯網金融平臺，聚寶盆，聚寶計劃，分期投，月月盈，年年余，財富，P2P',
          description:'聚寶盆是壹家綜合性互聯網金融平臺，聚寶盆為廣大個人投資理財的用戶提供多元化的選擇與優質的服務。投資理財用戶可通過加入聚寶計劃、分期投、月月盈、年年余等產品進行投資獲得穩定收益。',
        }
      }
    },
    components: {
      'leftMenu': PersonalCenterMenu,
    },
    created(){
      var self = this;
      self.$http.post('/pbap-web/action/trade/query/tradeDetail', {
        tradeType: self.$route.params.tradeType,
        tradeCode: self.$route.params.tradeCode
      }).then((res) => {
        self.tradeInfo = res.body.respInfo.tradeInfo;
      });
    },
    mounted () {
    },
    methods: {
      getTrdStatus(trdStatus,tradeType){
        let tStatus;
        if(trdStatus==0){
          if(tradeType=="CO" || tradeType=='WD'){
            tStatus = '銀行處理中'
          }else{
            tStatus = '交易處理中'
          }
        }else if(trdStatus==1){
          tStatus = '交易處理中'
        }else{
          switch (trdStatus){
            case '7':
              tStatus = '交易處理中';
              break;
            case '8':
              tStatus = '交易成功';
              break;
            case '9':
              tStatus = '交易失敗';
              break;
            default:
              tStatus = '--';
              break;
          }
        }
        return tStatus;
      },
      getStatus(dType){
        let tType;
        if (dType == "CO") {
          tType = "匯款";
        } else if (dType == "WD") {
          tType = "提領"
        } else if (dType == "IV") {
          tType = "投資"
        } else if (dType == "RP") {
          tType = "還款"
        } else if (dType == "RF") {
          tType = "退款"
        } else if (dType == "BN") {
          tType = "紅包"
        }
        return tType;
      }
    }
  }
</script>

