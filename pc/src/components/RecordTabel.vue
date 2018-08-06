<template>
  <div class="product-list table-p" style="background: #fff;padding-bottom: 10px;margin-bottom: 20px;">
    <div class="table">
      <table class="t-caption">
        <thead>
          <tr>
            <th class="rate regular-rate" style="width: 360px;">交易時間</th>
            <th class="name c-name" style="width: 360px;">交易類型</th>
            <th class="time c-time" style="width: 360px;">交易金額</th>
            <!--<th class="money r-money">結餘</th>-->
          </tr>
        </thead>
        <tbody class="data-list" v-if="tradeList.length">
          <tr class="history-list-data" v-for="(item, index) in tradeList" :key="index">
            <td class="rate">{{item.dateTime}}</td>
            <td class="name c-name">{{item.trdCode | getStatus}}</td>
            <td class="time c-time"><span>{{$fmoneyFormat(item.trdAmount)}}</span>元</td>
            <!--<td class="money c-money"></td>-->
          </tr>
        </tbody>
      </table>
    </div>
    <div class="pageInation" v-if="tradeList.length">
      <pagination :page-no="pageNo"></pagination>
    </div>
    <div class="media" v-if="tradeList.length == 0" style="width: 300px;margin: 100px auto;">
      <div class="media-left">
        <!--<img src="../assets/images/no_data.png"  style="width: 70px;">-->
      </div>
      <div class="media-body" style="line-height: 32px;padding-top: 30px;padding-left: 20px;">
        <p class="text-muted" style="font-size: 16px;">沒有數據</p>
      </div>
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
      prdType: String,
      prdNature: String,
      startTime: String,
      endTime: String,
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
        newV && this.getTradeList(this.tradeType, newV, this.prdType, this.prdNature, this.startTime);
      },
      tradeType(newV, oldV) {
        this.tradeType = newV;
        if(newV == 0) {
          this.getTradeList(null, 1, this.prdType, this.prdNature, this.startTime);
        }
        newV && this.getTradeList(newV, 1, this.prdType, this.prdNature, this.startTime);
      },
      prdType(newV, oldV){
        this.prdType = newV;
        newV && this.getTradeList(this.tradeType, 1, newV, this.prdNature, this.startTime);
      },
      prdNature(newV, oldV){
        this.prdNature = newV;
        newV && this.getTradeList(this.tradeType, 1, this.prdType, newV, this.startTime);
      },
      startTime(newV, oldV) {
        newV && this.getTradeList(this.tradeType, 1, this.prdType, this.prdNature, newV);
      }
    },
    computed:{
      current() {
        return this.$store.state.currentComPage;
      }
    },
    created(){
      this.getTradeList(this.tradeType, this.pageAt, this.prdType, this.prdNature, this.startTime)
    },
    methods: {
      getTradeList(tradeType, pageAt, prdType, prdNature, startTime){
        var self = this;
        self.$http.post('/pbap-web/action/trade/query/tradeMonthList', {
          pageIndex: pageAt,
          pageSize: 10,
          trdCode: tradeType,
          prdType: prdType,
          prdNature: prdNature,
          startTime: startTime,
          endTime: self.endTime,
        }).then((res) => {
          self.tradeListInfo = res.body.respInfo.tradeInfo;
          self.pageNo = self.tradeListInfo.totalPage || 1;
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
