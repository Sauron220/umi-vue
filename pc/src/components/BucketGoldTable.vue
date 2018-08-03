<template>
  <div class="bucket-table product-list table-p" style="margin-bottom: 20px;padding-bottom: 20px;">
    <div class="bucket-status-warp">
      <div :class="{'active-select': status == '11'}" @click="changeType('11')">持有中({{totalCount ? totalCount : '--'}})</div>
      <div :class="{'active-select': status == '88'}" @click="changeType('88')">已退出({{totalCount1 ? totalCount1 : '--'}})</div>
    </div>
    <div class="table">
      <table class="t-caption" v-if="lists.length">
        <thead>
        <tr>
          <th class="rate c-rate regular-rate">{{prodName}}計畫名稱</th>
          <th class="name c-name">期待年會報率</th>
          <th class="time">出借金額</th>
          <th class="money">已獲回報</th>
          <th class="progress c-progress"> 投標次數</th>
          <th class="handle-c">狀態</th>
          <th style="width: 200px;">操作</th>
        </tr>
        </thead>
        <tbody class="data-list" >
        <tr class="history-list-data" v-for="(item, index) in lists" :key="index">
          <td class="rate c-rate">{{item.prdName}}</td>
          <td class="name c-name">{{item.rate}}</td>
          <td class="time c-time"><span>{{$fmoneyFormat(item.trdAmount)}}</span>元</td>
          <td class="money c-money"><span>{{$fmoneyFormat(item.interest)}}</span>元</td>
          <td>{{item.invCount}}</td>
          <td><div class="c-pon">{{item.status}}</div></td>
          <td><span @click="toDeatil(item.prdCode)" style="cursor: pointer;">点击</span></td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="media" v-if="flag" style="width: 300px;margin: 100px auto;">
      <div class="media-left">
        <img src="../assets/images/no_data.png"  style="width: 70px;">
      </div>
      <div class="media-body" style="line-height: 32px;padding-top: 30px;padding-left: 20px;">
        <p class="text-muted" style="font-size: 16px;">暫無交易記錄</p>
      </div>
    </div>
    <div class="pagiation" v-if="lists.length">
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
        prdType: '70',
        status: '11',
        lists: [],
        totalCount:'',
        totalCount1:'',
        pageNo:1,
        pageIndex: 1,
        prodName:'一桶金',
        flag: false,
      }
    },
    watch: {
      status(newV, oldV) {
        this.status = newV;
        newV && this.getProductLists(this.prdType, newV, this.currentComPage);
      },
      currentComPage(newV, oldV) {
        newV && this.getProductLists(this.prdType, this.status, newV)
      },
      productType(newV, oldV){
        this.prdType = newV;
        if (newV) {
          this.totalCount = 0;
          this.totalCount1 = 0;
        }
        newV && this.getProductLists(newV, this.status, this.currentComPage)
      }
    },
    computed: {
      currentComPage() {
        return this.$store.state.currentComPage;
      },
      productType() {
        const _productType = this.$store.state.productType;
        if (_productType == '70') {
          this.prodName = '一桶金';
        } else if (_productType == '7') {
          this.prodName = '聚寶';
        } else if (_productType == '8') {
          this.prodName = '分期投';
        } else if (_productType == '9') {
          this.prodName = '月月盈';
        }
        return this.$store.state.productType;
      }
    },
    created() {
      const self = this;
      this.$http.post('/pbap-web/action/customer/query/custAuthInfo', {}).then((res) => {
        self.myCode = res.body.respInfo.custInfo.cusCode;
      }).then(() => {
        self.getProductLists();
      });
    },
    methods: {
      getProductLists(prdType, status, currentComPage) {
        const self = this;
        this.$http.post('/pbap-web/action/investment/query/investmentPrdList', {
          cusCode: self.myCode,
          proType: prdType || self.prdType,
          status: status || self.status,
          pageIndex: currentComPage || 1,
          pageSize: 10,
        }).then((res) => {
          self.lists = res.data.respInfo.investmentList.dataList;
          self.flag = res.data.respInfo.investmentList.dataList.length > 0 ? false : true;
          self.pageNo = res.data.respInfo.investmentList.totalPage;
          if (self.status == '11') {
            self.totalCount = res.data.respInfo.investmentList.totalCount;
          } else {
            self.totalCount1 = res.data.respInfo.investmentList.totalCount;
          }
        })
      },
      changeType(val) {
        this.status = val;
      },
      toDeatil(proCode){
        sessionStorage.setItem('proCode', proCode);
        this.$router.push('/bucketGold');
      }
    }
  }
</script>
