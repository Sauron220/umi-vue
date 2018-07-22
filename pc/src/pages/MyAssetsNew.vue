<template>
  <div class="myassets-new">
    <div class="myassets-new-info">
      <div class="desc-txt">開通銀行卡資金存管賬戶，保障您的資金安全。 </div>
      <div class="btn">立即開啟銀行資金管理</div>
    </div>
    <div class="total-money-warp">
      <div class="total-money-con">
        <div class="num">
          <span>0.00</span>元
        </div>
        <div class="txt">
          聚寶盆總資產
        </div>
      </div>
      <div class="divider-myass"></div>
      <div class="total-money-con">
        <div class="num">
          <span>0.00</span>元
        </div>
        <div class="txt">
          聚寶盆總資產
        </div>
      </div>
      <div class="divider-myass"></div>
      <div class="total-money-con final">
        <div class="num">
          儲值
        </div>
        <div class="txt">
          提款
        </div>
      </div>
    </div>
    <div class="draw-warp">
      <div class="draw-hed">
        <div class="draw-hed-tit">
          聚寶盆資產
        </div>
        <div class="draw-hed-fin">
          <div class="tit" @click="toPage({name: 'MineAccount',query:{comp:'AddBankCard'}})">銀行卡</div>
          <div class="tit" @click="toPage({name: 'ReturnInquiry'})">囘帳查詢</div>
          <div class="tit" @click="toPage({name: 'MonthlyBill'})">月賬單</div>
          <div class="tit" @click="toPage({name: 'TransactionRecordNew'})">交易紀錄</div>
        </div>
      </div>
      <div class="draw-con">
        <div class="draw-fl">
          <div class="all">
            <!--總資產(元)<br/><span>{{ personalAcc.totalProperties }}</span>-->
            <p id="totalProperties">資產占比</p>
            <div class="pie-overview" id="pie-overview"></div>
          </div>
        </div>
        <div class="draw-ri">
          <div class="tit-hed c-tit">
            <div class="tit-desc">資產</div>
            <div class="tit-desc">持有資產</div>
            <div class="tit-desc">纍計回報</div>
          </div>
          <div class="tit-hed">
            <div class="tit-desc">壹桶金</div>
            <div class="tit-desc">0.00元</div>
            <div class="tit-desc-c">0.00元</div>
          </div>
          <div class="tit-hed">
            <div class="tit-desc">聚寶計畫</div>
            <div class="tit-desc">0.00元</div>
            <div class="tit-desc-c">0.00元</div>
          </div>
          <div class="tit-hed">
            <div class="tit-desc">分期投 </div>
            <div class="tit-desc">0.00元</div>
            <div class="tit-desc-c">0.00元</div>
          </div>
          <div class="tit-hed">
            <div class="tit-desc">月月盈</div>
            <div class="tit-desc">0.00元</div>
            <div class="tit-desc-c">0.00元</div>
          </div>
        </div>
      </div>
    </div>
    <div class="total-product">
      <div class="product-list-nav">
        <div class="nav-item" @click="toNextPage(1)" :class="{'active-item': flag == 1}">一桶金</div>
        <div class="nav-item" @click="toNextPage(2)" :class="{'active-item': flag == 2}">聚寶計畫</div>
        <div class="nav-item" @click="toNextPage(3)" :class="{'active-item': flag == 3}">分期投</div>
        <div class="nav-item" @click="toNextPage(4)" :class="{'active-item': flag == 4}">月月盈</div>
      </div>
    </div>
    <div class="product-con-view">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import Highcharts from 'highcharts'
  export default {
    name: "MyAssetsNew",
    data() {
      return {
        personalAcc:{},
        flag:1,
      }
    },
    created() {
      const self = this;
      self.$http.get('/pbap-web/action/customer/query/personalAccount').then((res) => {
        self.personalAcc = res.body.respInfo.personalAccView;
        self.personalAcc.balanceRate = Math.floor(self.personalAcc.balanceRate * 10000) / 100;
        self.personalAcc.frozenRate = Math.floor(self.personalAcc.frozenRate * 10000) / 100;
        self.personalAcc.benifitRate = Math.floor(self.personalAcc.benifitRate * 10000) / 100;
        self.personalAcc.balanceAmount = self.$fmoney(self.personalAcc.balanceAmount);   // 可用金額
        self.personalAcc.frozenAmount = self.$fmoney(self.personalAcc.frozenAmount);   // 凍結金額
        self.personalAcc.benifitAmount = self.$fmoney(self.personalAcc.benifitAmount);   // 待收益金額
        self.personalAcc.bonusAmount = self.$fmoney(self.personalAcc.bonusAmount);   // 體驗金
        self.personalAcc.totalProperties = self.$fmoney(self.personalAcc.totalProperties);   // 總資產

        if (self.personalAcc.totalProperties == 0) {
          self.myChart = Highcharts.chart('pie-overview', {
            chart: {
              plotBackgroundColor: null,
              plotBorderWidth: null,
              plotShadow: false,
              width: 280,
              height: 280,
            },
            title: {
              text: ''
            },
            tooltip: {
              pointFormat: ''
            },
            exporting: {
              enabled: false
            },
            credits: {
              enabled: false
            },
            plotOptions: {
              pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                size: 240,
                innerSize: '220',
                colors: ["#d9d9d9"],
                dataLabels: {
                  enabled: false
                },
              }
            },
            noData: {},
            series: [{
              type: 'pie',
              name: 'Account overview',
              data: [['無', 100]]
            }]
          });
        }
        else {
          self.myChart = Highcharts.chart('pie-overview', {
            chart: {
              plotBackgroundColor: null,
              plotBorderWidth: null,
              plotShadow: false,
              width: 280,
              height: 280,
            },
            title: {
              text: ''
            },
            tooltip: {
              pointFormat: ''
            },
            exporting: {
              enabled: false
            },
            credits: {
              enabled: false
            },
            plotOptions: {
              pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                size: 240,
                innerSize: '220',
                colors: ["#307bf2", "#f28379", "#f2ba49"],
                dataLabels: {
                  enabled: false
                },
              }
            },
            noData: {},
            series: [{
              type: 'pie',
              name: 'Account overview',
              data: [
                ['可用餘額', self.personalAcc.balanceRate],
                ['凍結餘額', self.personalAcc.frozenRate],
                ['待收益金額', self.personalAcc.benifitRate],

              ]
            }]
          });
        }

      });
    },
    methods:{
      toNextPage(v) {
        this.flag = v;
      },
      toPage(v) {
        this.$router.push(v)
      }
    }
  }
</script>
