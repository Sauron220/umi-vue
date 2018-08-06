<template>
  <div class="product-list table-p">
    <!--<div class="desc-info">加入總人次277 人，加入總金額2,380,000 元</div>-->
    <div class="table" v-if="invData.length">
      <table class="t-caption">
        <thead>
        <tr>
          <th class="rate regular-rate">序號</th>
          <th class="name c-name">出借人</th>
          <th class="time c-time">加入金额</th>
          <th class="money c-money">来源</th>
          <th class="progress c-progress">加入时间</th>
        </tr>
        </thead>
        <tbody class="data-list">
        <tr class="history-list-data" v-for="(item, index) in invData" :key="index">
          <td class="rate" style="color: #000;">{{index + 1}}</td>
          <td class="name c-name">{{item.realName}}</td>
          <td class="time c-time"><span>{{$fmoney(item.trdAmount)}}</span>元</td>
          <td class="money c-money">{{item.remark}}</td>
          <td>{{item.preTime}}</td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="" style="text-align: center;line-height: 80px;" v-else>暫無記錄</div>
    <div class="pageInation" v-if="invData.length">
      <pagination :page-no="pageNo"></pagination>
    </div>
  </div>
</template>

<script>
  import Pagination from './Pagination'

  export default {
    name: "CustTable",
    components: {
      Pagination
    },
    watch: {
      current(newV, oldV) {
        this.currentPage = newV;
        this.getInvestRecord(newV);
      }
    },
    computed: {
      current() {
        return this.$store.state.currentPage;
      }
    },
    created() {
      this.getInvestRecord(this.currentPage);
    },
    data() {
      return {
        currentPage: 1,
        pageNo: 1,
        invData:[],
      }
    },
    methods: {
      getInvestRecord(currentPage, prdCode) {
        var self = this;
        self.$http.post('/pbap-web/action/investment/query/invList', {
          pageIndex: currentPage,
          pageSize: 10,
          prdCode: self.$route.params.id || prdCode
        }).then((res) => {
          self.invData = res.body.respInfo.invList.dataList;
          self.pageNo = res.body.respInfo.invList.totalPage || 1;
        });
      },
    }
  }
</script>
