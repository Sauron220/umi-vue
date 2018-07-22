<template>
  <div class="month-bill-warp">
    <div class="month-bill-hed">
      <div class="bill-hed-lf">
        <h4 class="bill-hed-lf-t">月度賬單</h4>
        <h4 class="bill-hed-lf-d">*所有數據截至6月30日</h4>
      </div>
      <div class="bill-hed-ri">
        <vue-datepicker-local inputClass="bill-rang" v-model="rang" /><span class="arrow"></span>
      </div>
    </div>
    <div class="bill-month-warp-con">
      <div class="bill-lf">
        <div class="bill-lf-top">
          <div class="bill-lf-top-t">本月已賺取金額</div>
          <div class="bill-lf-top-d">您在聚寶盆累計利息回報 <span>0.00</span> 元</div>
        </div>
        <div class="bill-lf-bot">
          <div class="bill-lf-bot-lf">
            <div class="top-m">
              <span>0.00</span>元
            </div>
            <ul class="bill-list">
              <li class="bill-1">壹桶金0.00 元</li>
              <li class="bill-2">聚寶計畫0.00 元</li>
              <li class="bill-3">分期頭0.00 元</li>
              <li class="bill-4">月月盈0.00 元</li>
            </ul>
          </div>
          <div class="bill-lf-bot-ri">
            <div class="pie-overview" id="pie-overview"></div>
          </div>
        </div>
      </div>
      <div class="bill-lf">
        <div class="bill-lf-top">
          <div class="bill-lf-top-t">本月已出借金額</div>
          <div class="bill-lf-top-d">您在聚寶盆累計出借 <span>0.00</span> 元</div>
        </div>
        <div class="bill-lf-bot">
          <div class="bill-lf-bot-lf">
            <div class="top-m">
              <span>0.00</span>元
            </div>
            <ul class="bill-list">
              <li class="bill-1">壹桶金0.00 元</li>
              <li class="bill-2">聚寶計畫0.00 元</li>
              <li class="bill-3">分期頭0.00 元</li>
              <li class="bill-4">月月盈0.00 元</li>
            </ul>
          </div>
          <div class="bill-lf-bot-ri">
            <div class="pie-overview" id="pie-overview-1"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="bill-fot">
      <div class="bill-fot-c">
        <p>0.00 <span>元</span></p>
        <p>本月儲值金額</p>
      </div>
      <div class="bill-fot-t">
        <p>0.00 <span>元</span></p>
        <p>本月提現金額</p>
      </div>
      <div class="bill-desc-info">您在人人貸累計充值0.00 元，累計提現0.00 元 <a href="">查看交易明細></a></div>
    </div>
    <div class="bill-list-info">
      <ul>
        <li>
          <div class="bill-list-1">項目名稱 </div>
          <div class="bill-list-2">纍計已賺取金額</div>
          <div class="bill-list-3">本月已賺取金額</div>
          <div class="bill-list-4">出借金額</div>
          <div class="bill-list-5">當前持有數量</div>
        </li>
        <li>
          <div class="bill-list-1">聚寶計劃 </div>
          <div class="bill-list-2">0.00元</div>
          <div class="bill-list-3">0.00元</div>
          <div class="bill-list-4">0.00元</div>
          <div class="bill-list-5">0</div>
        </li>
        <li>
          <div class="bill-list-1">一桶金 </div>
          <div class="bill-list-2">0.00元</div>
          <div class="bill-list-3">0.00元</div>
          <div class="bill-list-4">0.00元</div>
          <div class="bill-list-5">0</div>
        </li>
        <li>
          <div class="bill-list-1">月月盈 </div>
          <div class="bill-list-2">0.00元</div>
          <div class="bill-list-3">0.00元</div>
          <div class="bill-list-4">0.00元</div>
          <div class="bill-list-5">0</div>
        </li>
        <li>
          <div class="bill-list-1">分期投 </div>
          <div class="bill-list-2">0.00元</div>
          <div class="bill-list-3">0.00元</div>
          <div class="bill-list-4">0.00元</div>
          <div class="bill-list-5">0</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import VueDatepickerLocal from 'vue-datepicker-local'
  import Highcharts from 'highcharts'
  export default {
    name: "MonthlyBill",
    components:{
      VueDatepickerLocal
    },
    data() {
      return {
        rang:[new Date(), new Date()]
      }
    },
    created() {
      this.currentMoth('pie-overview')
      this.currentMoth('pie-overview-1')
    },
    methods:{
      currentMoth(sel) {
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
            self.myChart = Highcharts.chart(sel, {
              chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                width: 200,
                height: 200,
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
                  size: 180,
                  innerSize: '160',
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
            self.myChart = Highcharts.chart(sel, {
              chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                width: 200,
                height: 200,
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
                  size: 180,
                  innerSize: '120',
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
      }
    }
  }
</script>
