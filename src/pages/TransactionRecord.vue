<template>
  <div id="PersonalCenter" class="transactionRecord-content profile clearfix" v-TDK="TDK">
    <div class="container">
      <ol class="breadcrumb">
        <span>您現在的位置：</span>
        <li><router-link to="/accountOverview">我的賬戶</router-link></li>
        <li class="active">交易記錄</li>
      </ol>
      <leftMenu></leftMenu>
      <div class="pull-left right_content">
        <ul class="top-title-line list-inline">
          <li class="top-line1 top-orange">
            <span class="active">交易記錄</span>
          </li>
        </ul>
        <div class="screen" id="tradeType">
          <h1>交易類型:</h1>
          <router-link  :to="{ name: 'TransactionRecord', params: { tradeType:'IV',pageAt:1 }}"
                        :class="{'active':$route.params.tradeType =='IV'}">
            投資
          </router-link>
          <router-link  :to="{ name: 'TransactionRecord', params: { tradeType:'CO',pageAt:1 }}"
                        :class="{'active':$route.params.tradeType =='CO'}">
            儲值
          </router-link>
          <router-link  :to="{ name: 'TransactionRecord', params: { tradeType:'WD',pageAt:1 }}"
                        :class="{'active':$route.params.tradeType =='WD'}">
            提領
          </router-link>
          <router-link  :to="{ name: 'TransactionRecord', params: { tradeType:'RP',pageAt:1 }}"
                        :class="{'active':$route.params.tradeType =='RP'}">
            還款
          </router-link>
          <router-link  :to="{ name: 'TransactionRecord', params: { tradeType:'RF',pageAt:1 }}"
                        :class="{'active':$route.params.tradeType =='RF'}">
            退款
          </router-link>
          <router-link  :to="{ name: 'TransactionRecord', params: { tradeType:'BN',pageAt:1 }}"
                        :class="{'active':$route.params.tradeType =='BN'}">
            紅包
          </router-link>
        </div>

        <div class="recordList-content">
          <div class="roof-title">
            <span class="roof1">時間</span>
            <span class="roof2">類型</span>
            <span class="roof3">交易號</span>
            <span class="roof4">金額（元）</span>
            <span class="roof5">狀態</span>
            <span class="roof6">操作</span>
          </div>
          <div id="recordList">
            <div class="base" v-for="(item, index) in tradeList">
              <span class="roof1">{{item.dateTime}}</span>
              <span class="roof2">{{getStatus($route.params.tradeType)}}</span>
              <span class="roof3">{{item.trdNum}}</span>
              <span class="roof4">{{$fmoney(item.trdAmount)}}</span>
              <span class="roof5">{{getTrdStatus(item.trdStatus,$route.params.tradeType)}}</span>
              <span class="roof6">
               <a class="time_box" :href="'/transactionDetails/'+item.trdNum+'/'+$route.params.tradeType" target="_blank">查看詳情</a>
            </span>
            </div>
          </div>
          <vPagination v-if="tradeList.length>0 && tradeListInfo.totalPage>1"
                       :totalPage="tradeListInfo.totalPage"
                       :currentPage="$route.params.pageAt"
                       :withOutPageAtUrl="'/transactionRecord/'+$route.params.tradeType+'/'">
          </vPagination>
          <div class="media" v-if="tradeList.length == 0" style="width: 300px;margin: 100px auto;">
            <div class="media-left">
              <img src="../assets/images/no_data.png"  style="width: 70px;">
            </div>
            <div class="media-body" style="line-height: 32px;padding-top: 30px;padding-left: 20px;">
              <p class="text-muted" style="font-size: 16px;">暫無交易記錄</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import PersonalCenterMenu from '../components/PersonalCenterMenu'
  import vPagination from '../components/vPagination'

  export default {
    name: 'TransactionRecord',
    data () {
      return {
        tradeListInfo: {},
        tradeList:[],
        TDK:{
          title:'交易記錄-聚寶盆',
          keyWords:'網絡理財，互聯網理財，理財，投資，投資理財，個人投資，網貸平臺，網貸投資，網貸，互金，互聯網金融，互金平臺，互聯網金融平臺，聚寶盆，聚寶計劃，分期投，月月盈，年年余，財富，P2P',
          description:'聚寶盆是壹家綜合性互聯網金融平臺，聚寶盆為廣大個人投資理財的用戶提供多元化的選擇與優質的服務。投資理財用戶可通過加入聚寶計劃、分期投、月月盈、年年余等產品進行投資獲得穩定收益。',
        }
      }
    },
    created(){
      var self = this;
      self.getTradeList(self.$route.params.tradeType,self.$route.params.pageAt);
    },
    beforeRouteUpdate (to, from, next){
      let params = to.params;
      this.tradeListInfo.totalPage = 0;
      this.getTradeList(params.tradeType, params.pageAt);
      next();
    },
    components: {
      'leftMenu': PersonalCenterMenu,
      'vPagination': vPagination,
    },
    mounted () {
      /*      $(".base:odd").addClass('base-high');
            // 交易類型url
            document.querySelectorAll('#tradeType a').forEach(function (el) {
              var statuUrl = '/transactionRecord/' + el.getAttribute('sta');
              el.setAttribute('href', statuUrl);
            })*/
    },
    methods: {
      getTradeList(tradeType,pageAt){
        var self = this;
        self.$http.post('/pbap-web/action/trade/query/tradeRecordList', {
          pageIndex: pageAt,
          pageSize: 10,
          trdCode: tradeType
        }).then((res) => {
          self.tradeListInfo = res.body.respInfo.tradeInfo;
          self.tradeList = self.tradeListInfo.dataList || self.tradeList;
        });
      },
      getTrdStatus(trdStatus,tradeType){
        let tStatus;
        if(trdStatus==0){
          if(tradeType="WD" || tradeType=='WD'){
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
          tType = "儲值";
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

