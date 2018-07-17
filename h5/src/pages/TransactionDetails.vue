<template>
    <div class="wrap transactionDetails-content">
        <PageNav :message="goBackType()"></PageNav>
        <table>
            <tr class="name" v-if="tradeInfo.prdName">
                <td class="tit">产品</td>
                <td id="prdName">{{tradeInfo.prdName}}</td>
            </tr>
            <tr>
                <td class="tit">类型</td>
                <td id="trdType">{{getStatus($route.params.tradeType)}}</td>
            </tr>
            <tr>
                <td class="tit">交易编号</td>
                <td id="tradeCode">{{tradeInfo.trdNum}}</td>
            </tr>
            <tr>
                <td class="tit">交易金额</td>
                <td id="trdAmount">{{$fmoney(tradeInfo.trdAmount)}}元</td>
            </tr>
            <tr class="redType" v-if="$route.params.tradeType == 'BN'">
                <td class="tit">红包类型</td>
                <td v-show="tradeInfo.bonusType == 1">现金</td>
                <td v-show="tradeInfo.bonusType == 2">体验金</td>
            </tr>
            <tr class="jxq" v-if="$route.params.tradeType == 'RP'">
                <td class="tit">加息券奖励</td>
                <td v-if="tradeInfo.pInterests != 0">{{$fmoney(tradeInfo.pInterests)}}元</td>
                <td v-else>--</td>
            </tr>
            <tr>
                <td class="tit">交易结果</td>
                <td id="trdStatus">{{getTrdStatus(tradeInfo.trdStatus,$route.params.tradeType)}}</td>
            </tr>
            <tr>
                <td class="tit">创建时间</td>
                <td id="preTime">{{tradeInfo.preTime}}</td>
            </tr>
            <tr>
                <td class="tit">完成时间</td>
                <td id="endTime">{{tradeInfo.endTime}}</td>
            </tr>
        </table>
    </div>
</template>

<script>
  import PageNav from '@/components/PageNav'
  export default {
    name: 'TransactionDetails',
    data() {
      return {
        pageTitle: '交易详情',
        tradeInfo: {}
      }
    },
    created(){
      var self = this;
      self.$store.commit('setPageTitle', self.pageTitle);

      self.$http.post('/pbap-web/action/trade/query/tradeDetail', {
        tradeType: self.$route.params.tradeType,
        tradeCode: self.$route.params.tradeCode
      }).then((res) => {
        self.tradeInfo = res.body.respInfo.tradeInfo;
      });

      self.goBackType()

    },
    components: {
      'PageNav': PageNav,
    },
    methods: {
      getTrdStatus(trdStatus,tradeType){
        let tStatus;
        if(trdStatus == 0 || trdStatus == 1){
          if(tradeType == "WD" && trdStatus == 1){
            tStatus = '成功(实际时间以银行到账时间为准)'
          }else{
            tStatus = '交易处理中'
          }
        }
        else{
          switch (trdStatus){
            case '7':
              tStatus = '退款';
              break;
            case '8':
              if(tradeType == "WD"){
                tStatus = '成功(实际时间以银行到账时间为准)';
              } else {
                tStatus = '成功';
              }
              break;
            case '9':
              tStatus = '失败';
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
          tType = "儲值";
        } else if (dType == "WD") {
          tType = "提现"
        } else if (dType == "IV") {
          tType = "投资"
        } else if (dType == "RP") {
          tType = "還款"
        } else if (dType == "RF") {
          tType = "退款"
        } else if (dType == "BN") {
          tType = "红包"
        }
        return tType;
      },
      goBackType(){
        let type = this.$route.params.tradeType;
        return "/transactionRecord/"+type+"/1"
      }
    }
  }
</script>
