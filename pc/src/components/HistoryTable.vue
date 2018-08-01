<template>
  <div class="product-list table-p">
    <div class="table">
      <table class="t-caption">
        <thead>
          <tr>
            <th class="rate c-rate regular-rate">年利率</th>
            <th class="name c-name">借款標題</th>
            <th class="time c-time">期限</th>
            <th class="money c-money d-money">金額</th>
            <th class="progress c-progress">進度</th>
            <th class="handle-c"><img src="/static/img/reset-list.png" style="margin-right:10px;">重置</th>
          </tr>
        </thead>
        <tbody class="data-list">
          <tr class="history-list-data" v-for="(item, index) in productList">
            <td class="rate c-rate">{{productRate(item.defaultRate, item.rewardRate)}}</td>
            <td class="name c-name">{{item.prdName}}</td>
            <td class="time c-time">{{item.prdPeriod}}天</td>
            <td><span>{{$fmoneyFormat(item.prdAmount)}}</span>元</td>
            <td class="money c-money progress" data-percent="100">
              <div class="percentage-text">{{item.colPercent}}%</div>
              <div class="outer"><span class="inner" :style="{'width':item.colPercent+'%'}"></span></div>
            </td>
            <td class="action">
              <!--:href="productUrl(item.prdType) + item.prdCode"-->
              <a href="javascript:;" target="_blank" @click="toDetail(item.prdCode)"
                 class="btn"
                 :class="{'btn-gray':!productActive(item.status),
                          'btn-warning':productActive(item.status),
                          'gray':item.status=='12'}">
                {{buttonText(item.status)}}
              </a>
            </td>
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
  import Tool from '../util/ProductTool.js'
  export default {
    name: "CustTable",
    components: {
      Pagination
    },
    data() {
      return {
        productList: [],
        currentPage: 1,
        pageNo: 1
      }
    },
    watch: {
      current(newV, oldV) {
        this.requestData(newV)
      }
    },
    computed: {
      current() {
        return this.$store.state.currentComPage;
      }
    },
    created() {
      this.requestData(1);
    },
    methods: {
      productRate: Tool.productRate,
      requestData(v) {
        // 在这里使用ajax或者fetch将对应页传过去获取数据即可
        this.getProductList("7", 0, v);
      },
      productActive(status) {
        if (status == '14' || status == '16' || status == '20' || status == '30') {
          return false
        } else {
          return true
        }
      },
      getProductList(prdType, prdStatus, pageAt, callback) {
        if (prdType == 0) {
          prdType = ''
        }
        if (prdStatus == 0) {
          prdStatus = ''
        }
        var self = this;
        self.$http.post('/pbap-web/action/product/query/prdList', {
          pageSize: 10,
          prdType: prdType,
          status: prdStatus,
          pageIndex: pageAt
        }).then((res) => {
            self.pageNo = res.body.respInfo.prdList.totalPage;
            self.productList = res.body.respInfo.prdList.dataList;
            callback && callback();
          })
      },
      buttonText(status) {
        switch (status) {
          case '11':
            return '立即加入';
            break;
          case '12':
            return '預熱中';
            break;
          case '14':
            return '已滿額';
            break;
          case '16':
            return '已過期';
            break;
          case '20':
            return '還款中';
            break;
          case '30':
            return '已還款';
            break;
          default:
            return '立即加入'
        }
      },
      toDetail(proCode) {
        sessionStorage.setItem('proCode', proCode);
        this.$router.push('/bucketGold');
      }
    }
  }
</script>
