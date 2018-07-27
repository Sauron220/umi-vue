<template>
  <div class="bucket-table product-list table-p">
    <div class="bucket-status-warp">
      <div :class="{'active-select': status == '11'}" @click="changeType('11')">持有中({{totalCount}})</div>
      <div :class="{'active-select': status == '88'}" @click="changeType('88')">已退出({{totalCount}})</div>
    </div>
    <div class="table">
      <table class="t-caption">
        <thead>
        <tr>
          <th class="rate c-rate regular-rate">一桶金計畫名稱</th>
          <th class="name c-name">期待年會報率</th>
          <th class="time">出借金額</th>
          <th class="money">已獲回報</th>
          <th class="progress c-progress"> 投標次數</th>
          <th class="handle-c">狀態</th>
          <th style="width: 200px;">操作</th>
        </tr>
        </thead>
        <tbody class="data-list">
        <tr class="history-list-data" v-for="(item, index) in lists" :key="index">
          <td class="rate c-rate">{{item.prdName}}</td>
          <td class="name c-name">{{item.rate}}</td>
          <td class="time c-time"><span>{{$fmoneyFormat(item.trdAmount)}}</span>元</td>
          <td class="money c-money"><span>{{$fmoneyFormat(item.interest)}}</span>元</td>
          <td>{{item.invCount}}</td>
          <td><div class="c-pon">{{item.status}}</div></td>
          <td @click="toDeatil('0')">点击</td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="pagiation">
      <pagination :page-no="pageNo"></pagination>
    </div>
  </div>
</template>

<script>
  import pagination from './Pagination'
  export default {
    name: "BucketGoldTable",
    components: {
      pagination
    },
    data() {
      return {
        myCode:'',
        prdType: '7',
        status: '11',
        lists: [],
        totalCount:'',
        pageNo:1,
        pageIndex: 1,
        currentComPage: '',
      }
    },
    watch: {
      status(newV, oldV) {
        this.getProductLists();
      },
      $store(newV, oldV) {
        console.log('----',newV)
      }
    },
    created() {
      console.log(this)
      const self = this;
      this.$http.post('/pbap-web/action/customer/query/custAuthInfo', {}).then((res) => {
        self.myCode = res.body.respInfo.custInfo.cusCode;
      }).then(() => {
        self.getProductLists();
      });
    },
    methods: {
      getProductLists() {
        const self = this;
        this.$http.post('/pbap-web/action/investment/query/investmentPrdList', {
          cusCode: self.myCode,
          prdType: self.prdType,
          status: self.status,
          pageIndex: self.currentComPage || 1,
          pageSize: 2,
        }).then((res) => {
          self.lists = res.data.respInfo.investmentList.dataList;
          self.totalCount = res.data.respInfo.investmentList.totalCount;
          self.pageNo = res.data.respInfo.investmentList.totalPage;
        })
      },
      changeType(val) {
        this.status = val;
      }
    }
  }
</script>
