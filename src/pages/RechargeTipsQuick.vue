<template>
  <div class="tips-warp">
    <h1 class="text-center">上海銀行儲值限額壹覽表</h1>
    <p class="text-right">*本表數據為非實時數據，僅供參考</p>
    <hr>
    <br>
    <table class="table table-bordered table-tips" id="bankTip">
      <thead>
      <tr>
        <th>
          <div class="bank-name">銀行</div>
        </th>
        <th>
          <div class="card-type">支持卡種</div>
        </th>
        <th>
          <div class="single-limit">單筆限額(元)</div>
        </th>
        <th>
          <div class="day-limit">每日限額(元)</div>
        </th>
        <th>
          <div class="intro">需要滿足條件</div>
        </th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in cardTipList">
        <td :class="'bank'+item.bankCode">
          <div class="bank-name">{{item.bankName}}</div>
        </td>
        <td :class="'type'+item.bankCode" :bankType="item.bankType">
          <div class="card-type">{{item.bankType}}</div>
        </td>
        <td>
          <div class="single-limit">{{item.singleLimit}}</div>
        </td>
        <td>
          <div class="day-limit">{{item.dailyLimit}}</div>
        </td>
        <td>
          <div class="intro">{{item.payMethod}}</div>
        </td>
      </tr>
      </tbody>
    </table>
    <br>
    <br>
    <br>
  </div>
</template>

<script>
  export default {
    name: 'RechargeTipsQuick',
    data() {
      return {
        cardTipList: [],
      }
    },
    created() {
      var self = this;
      self.$http.post('/pbap-web/action/customer/quickRechargeLimit?type=1', {}).then((res) => {
        self.cardTipList = res.body.respInfo.quickBank;
      });
    },
    mounted() {
    },
    methods: {
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1 {
    line-height: 3;
  }

  .tips-warp {
    width: 650px;
    margin: 0 auto;
  }
</style>
