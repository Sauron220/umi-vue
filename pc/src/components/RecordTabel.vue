<template>
  <div class="product-list table-p">
    <div class="table">
      <table class="t-caption">
        <thead>
          <tr>
            <th class="rate regular-rate" style="width: 240px;">交易時間</th>
            <th class="name c-name">交易類型</th>
            <th class="time c-time">交易金額</th>
            <th class="money r-money">結餘</th>
          </tr>
        </thead>
        <tbody class="data-list">
          <tr class="history-list-data" v-for="(item, index) in tradeList" :key="index">
            <td class="rate">{{item.dateTime}}</td>
            <td class="name c-name">{{item.trdCode | getStatus}}</td>
            <td class="time c-time"><span>{{$fmoneyFormat(item.trdAmount)}}</span>元</td>
            <td class="money c-money"></td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="pageInation">
      <pagination :page-no="pageNo"></pagination>
    </div>
  </div>
</template>

<script>
  import Pagination from './Pagination'
  export default {
    name: "CustTable",
    props:{
      tradeType: String,
      pageAt: String,
    },
    components:{
      Pagination
    },
    data() {
      return {
        productList: [],
        tradeList:[],
        tradeListInfo:{},
        pageNo:0
      }
    },
    watch:{
      current(newV, oldV) {
        this.getTradeList(this.tradeType, newV);
      }
    },
    computed:{
      current() {
        return this.$store.state.currentComPage;
      }
    },
    created(){
      this.getTradeList(this.tradeType, this.pageAt)
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
          self.pageNo = self.tradeListInfo.totalPage;
          self.tradeList = self.tradeListInfo.dataList || self.tradeList;
        });
      },
    },
    filters:{
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
    },
  }
</script>
