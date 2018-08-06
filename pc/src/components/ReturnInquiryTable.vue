<template>
  <div class="product-list table-p myAssets-content">
    <!--<div class="table" v-if="invData.length">
      <table class="t-caption">
        <thead>
        <tr>
          <th class="rate regular-rate" style="width: 238px;">資産名稱</th>
          <th class="name c-name" style="width: 205px;">回款時間</th>
          <th class="time c-time" style="width: 225px;">預計本金（元）</th>
          <th class="money c-money">預期利息（元）</th>
          <th class="progress">實際本金（元）</th>
          <th class="progress">實際利息（元）</th>
          <th class="progress">加息券獎勵（元）</th>
        </tr>
        </thead>
        <tbody class="data-list">
        <tr class="history-list-data" v-for="(item, index) in invData" :key="index">
          <td class="rate">{{item.prdName}}</td>
          <td class="name c-name" style="width: 205px;">{{item.realName}}</td>
          <td class="time c-time"><span>{{$fmoney(item.trdAmount)}}</span>元</td>
          <td class="money c-money">{{item.remark}}</td>
          <td>{{item.preTime}}</td>
          <td>{{item.preTime}}</td>
          <td>{{item.preTime}}</td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="" style="text-align: center;line-height: 80px;" v-else>暫無記錄</div>
    <div class="pageInation" v-if="invData.length">
      <pagination :page-no="pageNo"></pagination>
    </div>-->
    <div class="assList-content">
      <div class="first-floor-title " v-if="investmentList.length">
        <span class="room1" style="width: 150px;">產品名稱</span>
        <span class="room2" style="width: 150px;">預期年化收益</span>
        <span class="room3" style="width: 150px;">投資金額(元)</span>
        <span class="room4" style="width: 140px;">預期收益(元)</span>
        <span class="room5" style="width: 150px;">到期日</span>
        <span class="room6" style="width: 100px;">狀態</span>
        <span class="room7" style="width: 90px;">還款計劃</span>
        <span class="room8" style="width: 120px;">操作</span>
      </div>
      <div id="assetsList">
        <div class="first-floor" :class="{'bg':index%2 == 1}" v-for="(item, index) in investmentList">
          <div class="upstairs">
                            <span class="room1" style="width: 150px;">
                                <a target="_blank" :href="productUrl(item.prdType)+item.prdCode">{{item.prdName}}</a>
                            </span>
            <span class="room2" style="width: 150px;">{{$fmoney(item.rate * 100)}}%
                                <i class="text-danger" v-if="item.cpnInfo">+{{$formatNum(item.cpnInfo || 0,100)}}%</i>
                            </span>
            <span class="room3" style="width: 150px;">{{$fmoney(item.trdAmount)}}</span>
            <span class="room4" style="width: 140px;">{{$fmoney(item.incomeAmount)}}
                                <i class="reward text-danger" v-if="item.couponIncome">+{{$fmoney(item.couponIncome)}}</i>
                            </span>
            <span class="room5" style="width: 150px;">{{item.dueDate}}</span>
            <span class="room6" style="width: 100px;">{{setStatus(item.status)}}</span>
            <span class="room7 go-downstairs" style="width: 90px;" @click="showToggle(index,item.trdNum)">查看詳情</span>
            <a target="_blank" class="room8" style="width: 120px;" :href="'/agreement/'+item.prdCode+'/'+item.trdNum">查看協議</a>
          </div>
          <div class="downstairs" v-if="detailNum == index">
            <img src="../assets/images/icon_arrow.png">
            <div class="downstairs-title">
              <span class="base1">還款時間</span>
              <span class="base2">預期本金(元)</span>
              <span class="base3">預期利息(元)</span>
              <span class="base4">實際本金(元)</span>
              <span class="base5">實際利息(元)</span>
              <span class="base6">加息券獎勵(元)</span>
              <span class="base7">剩余本金(元)</span>
              <span class="base8">還款狀態</span>
              <span class="base9">還款到賬日</span>
            </div>
            <div class="next-floor">
              <div class="cubicle" v-for="item in prdInfoList" v-if="prdInfoList.length!=0">
                <span class="base1">{{item.dueDate}}</span>
                <span class="base2">{{$fmoney(item.capital)}}</span>
                <span class="base3">{{$fmoney(item.interests)}}</span>
                <span class="base4">{{item.realCapital?$fmoney(item.realCapital):'--'}}</span>
                <span class="base5">{{item.realInterests?$fmoney(item.realInterests):'--'}}</span>
                <span class="base6">{{item.pInterests?$fmoney(item.pInterests):'--'}}</span>
                <span class="base7">{{item.remainingCapital?$fmoney(item.remainingCapital):'--'}}</span>
                <span class="base8">{{setReStatus(item.status)}}</span>
                <span class="base9">{{item.repDate}}</span>
              </div>
              <vPagination v-if="prdInfoList.length>0 && prdInfo.totalPage>1"
                           :totalPage="prdInfo.totalPage"
                           :currentPage="prdInfo.pageIndex"
                           :pageFor="getProductInfo" :pageForArg="{trdNum:item.trdNum}">
              </vPagination>
              <div class="no-data" style="margin-top: 0;" v-if="prdInfoList.length==0">
                <p>暫無詳情</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="pageInation" v-if="investmentList.length">
        <pagination :page-no="investmentListInfo.totalPage"></pagination>
      </div>
      <!--<vPagination v-if="investmentList.length>0 && investmentListInfo.totalPage>1"
                   :totalPage="investmentListInfo.totalPage"
                   :currentPage="$route.params.pageAt"
                   :withOutPageAtUrl="'/myAssets/'+$route.params.status+'/'">
      </vPagination>-->
      <div class="media" v-if="investmentList.length == 0 && $route.params.status==88" style="width: 300px;margin: 100px auto;">
        <div class="media-left">
          <img src="../assets/images/no_data.png"  style="width: 70px;">
        </div>
        <div class="media-body" style="line-height: 32px;padding-top: 20px;padding-left: 20px;">
          <p>您還沒有支持過任何項目，<br>去看看<a class="text-danger" href="/product-list/7/11/1" target="_blank">我們的項目</a>吧！</p>
        </div>
      </div>
      <div class="media" v-if="investmentList.length == 0 && $route.params.status!=88" style="width: 300px;margin: 20px auto;padding: 20px 0;">
        <!--<div class="media-left">
          <img src="../assets/images/no_data.png"  style="width: 70px;">
        </div>
        <div class="media-body" style="line-height: 32px;padding-top: 30px;padding-left: 20px;">
          <p class="text-muted" style="font-size: 16px;">暫無記錄</p>
        </div>-->
        <div class="" style="text-align: center;line-height: 80px;color: #999;">沒有數據</div>
      </div>
    </div>
  </div>
</template>

<script>
  import Pagination from './Pagination'
  import vPagination from './vPagination'
  import moment from 'moment'

  export default {
    name: "CustTable",
    props:{
      status: String,
      timeStart: String,
      timeEnd: String,
    },
    components: {
      Pagination,
      'vPagination': vPagination,
    },
    watch: {
      current(newV, oldV) {
        this.currentPage = newV;
        newV && this.getInvestment(this.status, newV, this.timeStart, this.timeEnd);
      },
      status (newV, oldV) {
        newV && this.getInvestment(newV, this.currentPage, this.timeStart, this.timeEnd);
      },
      timeStart (newV, oldV) {
        const _newV = moment(newV).format('YYYY-MM-DD').toString();
        newV && this.getInvestment(this.status, this.currentPage, _newV, this.timeEnd);
      },
      timeEnd (newV, oldV) {
        const _newV = moment(newV).format('YYYY-MM-DD').toString();
        newV && this.getInvestment(this.status, this.currentPage, this.timeStart, _newV);
      },
    },
    computed: {
      current() {
        return this.$store.state.currentComPage;
      }
    },
    created() {
      // this.getInvestRecord(this.currentPage);
      var self = this
      // get資產總匯資訊
      self.$http.post('/pbap-web/action/statistics/query/personalProperties', {}).then((res) => {
        self.statisticsView = res.body.respInfo.statisticsView;
      })
      const _timeStart = moment(this.timeStart).format('YYYY-MM-DD');
      const _timeEnd = moment(this.timeEnd).format('YYYY-MM-DD');
      self.getInvestment(self.status, 1, _timeStart, _timeEnd);
    },
    data() {
      return {
        currentPage: 1,
        pageNo: 1,
        invData:[],
        prdInfoList: [],
        statisticsView: [],
        investmentListInfo: {},
        investmentList: [],
        prdInfo: {},
        prdInfoList: [],
        detailNum: -1,
      }
    },
    methods: {
      getInvestRecord(currentPage, status, startTime, endTime) {
        var self = this;
        self.$http.post('/pbap-web/action/investment/query/investmentList', {
          pageIndex: currentPage,
          pageSize: 10,
          status: status || self.status,
          startTime:startTime,
          endTime:endTime,
        }).then((res) => {
          self.invData = res.body.respInfo.investmentList.dataList;
          self.pageNo = res.body.respInfo.investmentList.totalPage || 1;
        });
      },
      showToggle: function (index,trdNum) {
        var self = this
        if(self.detailNum != index){
          self.detailNum = index;
          self.getProductInfo({
            index:1,
            trdNum:trdNum
          });
        }else{
          self.detailNum = -1;
        }
      },
      getInvestment(status,pageAt,startTime,endTime){
        var self = this;
        self.$http.post('/pbap-web/action/investment/query/investmentList', {
          pageIndex: pageAt,
          pageSize: 10,
          status: status,
          startTime:startTime,
          endTime:endTime,
        }).then((res) => {
          self.investmentListInfo = res.body.respInfo.investmentList;
          self.investmentList = self.investmentListInfo.dataList;
        })
      },
      getProductInfo(obj){
        var self = this;
        self.prdInfo.totalPage = 0;
        self.$http.post('/pbap-web/action/product/query/productInfo', {
          pageIndex: obj.index,
          pageSize: 10,
          trdNum: obj.trdNum
        }).then((res) => {
          self.prdInfo = res.body.respInfo.prdInfo.repList;
          self.prdInfoList = self.prdInfo.dataList;
        })
      },
      setStatus(status){
        switch (status) {
          case '11':
            return '進行中';
            break;
          case '14':
            return '已滿額';
            break;
          case '16':
            return '已過期';
            break;
            break;
          case '20':
            return '還款中';
            break;
          case '30':
            return '已還款';
            break;
          default:
            return ''
        }
      },
      setReStatus(status){
        switch (status) {
          case '0':
            return '未收';
            break;
          case '1':
            return '已收';
            break;
          case '2':
            return '已轉讓';
            break;
            break;
          case '9':
            return '作廢';
            break;
          default:
            return ''
        }
      }
    }
  }
</script>
