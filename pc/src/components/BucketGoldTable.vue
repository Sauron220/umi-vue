<template>
  <div class="bucket-table product-list table-p" style="margin-bottom: 20px;padding-bottom: 20px;">
    <div class="bucket-status-warp">
      <div :class="{'active-select': status == '11'}" @click="changeType('11')">持有中({{totalCount ? totalCount : '0'}})</div>
      <div :class="{'active-select': status == '88'}" @click="changeType('88')">已退出({{totalCount1 ? totalCount1 : '0'}})</div>
    </div>
    <div class="table">
      <table class="t-caption" >
        <thead>
        <tr>
          <th class="rate c-rate regular-rate">{{prodName}}計畫名稱</th>
          <th class="name c-name">期待年會報率</th>
          <th class="time" style="width: 200px;">出借金額</th>
          <th class="money">已獲回報</th>
          <th class="progress c-progress"> 投標次數</th>
          <th class="handle-c">狀態</th>
          <th style="width: 200px;">操作</th>
        </tr>
        </thead>
        <tbody class="data-list" v-if="lists.length">
        <tr class="history-list-data" v-for="(item, index) in lists" :key="index">
          <td class="rate c-rate">{{item.prdName}}</td>
          <td class="name c-name">{{item.rate}}</td>
          <td class="time c-time"><span>{{$fmoneyFormat(item.trdAmount)}}</span>元</td>
          <td class="money c-money"><span>{{$fmoneyFormat(item.interests)}}</span>元</td>
          <td>{{item.invCount}}</td>
          <td><div class="c-pon">{{item.status | filterSatus}}</div></td>
          <td><span @click="toDeatil(item.prdCode)" style="cursor: pointer;">点击</span></td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="media" v-if="flag" style="width: 300px;margin: 100px auto;">

      <div class="media-body" style="line-height: 32px;padding-top: 30px;padding-left: 20px;">
        <p class="text-muted" style="font-size: 16px;">沒有{{status == 11 ? '持有中的' : '已退出的'}}{{prodName}}{{prodName == '壹桶金' || prodName == '聚寶' ? '計畫' : ''}}</p>
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
        prodName:'壹桶金',
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
          this.prodName = '壹桶金';
        } else if (_productType == '7') {
          this.prodName = '聚寶';
        } else if (_productType == '8') {
          this.prodName = '分期投';
        } else if (_productType == '9') {
          this.prodName = '月月盈';
        } else if (_productType == '-') {
          this.prodName = '散標';
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
          // prdNature: prdType == '-' ? 1 : null,
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
    },
    filters:{
      filterSatus(val) {
        switch (val) {
          case '11':
            return '募集中';
            break;
          case '12':
            return '放款审核中';
            break;
          case '13':
            return '流标审核中';
            break;
          case '14':
            return '放款处理中';
            break;
          case '15':
            return '流标处理中';
            break;
          case '20':
            return '还款中';
            break;
          case '21':
            return '结束审核中';
            break;
          case '30':
            return '已结束';
            break;
          case '40':
            return '已流标';
            break;
          default:
        }
      }
    }
  }
</script>
