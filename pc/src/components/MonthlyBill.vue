<template>
  <div class="month-bill-warp">
    <div class="month-bill-hed">
      <div class="bill-hed-lf">
        <h4 class="bill-hed-lf-t">月度賬單</h4>
        <h4 class="bill-hed-lf-d">*所有數據截至{{dates}}</h4>
      </div>
      <div class="bill-hed-ri">
        <vue-datepicker-local inputClass="bill-rang" format="YYYY-MM" v-model="rang"/>
        <span class="arrow"></span>
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
              <span>{{$fmoney(totalIncomeAmount)}}</span>元
            </div>
            <ul class="bill-list">
              <li
                :class="{'bill-1': index+1 == 1,'bill-2': index+1 == 2,'bill-3': index+1 == 3,'bill-4': index+4 == 4}"
                v-for="(item, index) in proMonthList" :key="index">{{ item.prdType |
                proName}}{{$fmoney(item.incomeAmount)}}元
              </li>
              <li class="bill-1" v-if="!proMonthList.length">壹桶金--元</li>
              <li class="bill-2" v-if="!proMonthList.length">聚寶計畫--元</li>
              <li class="bill-3" v-if="!proMonthList.length">分期頭--元</li>
              <li class="bill-4" v-if="!proMonthList.length">月月盈--元</li>
            </ul>
          </div>
          <div class="bill-lf-bot-ri">
            <div class="pie-overview" id="pie-overview"></div>
          </div>
        </div>
      </div>
      <div class="bill-lf" style="border: none;">
        <div class="bill-lf-top">
          <div class="bill-lf-top-t">本月已出借金額</div>
          <div class="bill-lf-top-d">您在聚寶盆累計出借 <span>0.00</span> 元</div>
        </div>
        <div class="bill-lf-bot">
          <div class="bill-lf-bot-lf">
            <div class="top-m">
              <span>{{$fmoney(totalTrdAmount)}}</span>元
            </div>
            <ul class="bill-list">
              <li
                :class="{'bill-1': index+1 == 1,'bill-2': index+1 == 2,'bill-3': index+1 == 3,'bill-4': index+4 == 4}"
                v-for="(item, index) in proMonthList" :key="index">{{ item.prdType |
                proName}}{{$fmoney(item.trdAmount)}}元
              </li>
              <li class="bill-1" v-if="!proMonthList.length">壹桶金--元</li>
              <li class="bill-2" v-if="!proMonthList.length">聚寶計畫--元</li>
              <li class="bill-3" v-if="!proMonthList.length">分期頭--元</li>
              <li class="bill-4" v-if="!proMonthList.length">月月盈--元</li>
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
        <p>{{$fmoney(totalRechargeAmount)}} <span>元</span></p>
        <p>本月儲值金額</p>
      </div>
      <div class="bill-fot-t">
        <p>{{$fmoney(totalWithdrawAmount)}}<span>元</span></p>
        <p>本月提現金額</p>
      </div>
      <div class="bill-desc-info">您在人人貸累計充值{{$fmoney(totalTrdAmount)}} 元，累計提現{{$fmoney(totalIncomeAmount)}} 元 <a
        href="javascript:;" @click="toDetail">查看交易明細></a></div>
    </div>
    <div class="bill-list-info">
      <ul>
        <li>
          <div class="bill-list-1">項目名稱</div>
          <div class="bill-list-2">纍計已賺取金額</div>
          <div class="bill-list-3">本月已賺取金額</div>
          <div class="bill-list-4">出借金額</div>
          <div class="bill-list-5">當前持有數量</div>
        </li>
        <li v-for="(item, index) in proList" :key="index">
          <div class="bill-list-1">{{item.prdType | proName}}</div>
          <div class="bill-list-2">{{$fmoney(item.totalIncome)}}元</div>
          <div class="bill-list-3">{{$fmoney(item.monthIncome)}}元</div>
          <div class="bill-list-4">{{$fmoney(item.totalTrade)}}元</div>
          <div class="bill-list-5">{{item.holdingCount}}</div>
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
    components: {
      VueDatepickerLocal
    },
    data() {
      return {
        rang: new Date(),
        proMonthList: [],
        totalIncomeAmount: '',
        totalTrdAmount: '',
        totalRechargeAmount: '',
        totalWithdrawAmount: '',
        rateOne: 0,
        oRateOne: 0,
        rateTwo: 0,
        oRateTwo: 0,
        rateThree: 0,
        oRateThree: 0,
        rateFoure: 0,
        oRateFoure: 0,
        proList: [],
      }
    },
    computed: {
      dates() {
        const _year = new Date(this.rang).getFullYear();
        const _mon = new Date(this.rang).getMonth() + 1 > 9 ? new Date(this.rang).getMonth() + 1 : '0' + (new Date(this.rang).getMonth() + 1);
        this.currentMoth(_year + _mon);
        return _year + _mon;
      }
    },
    created() {
      const self = this;
      const cusCode = JSON.parse(sessionStorage.getItem("currentUser"))['cusCode'];
      self.$http.post('/pbap-web/action/customer/query/cusProMonth', {
        cusCode: cusCode,
      }).then((res) => {
        console.log(res)
      });
      this.currentMoth();
      this.getTotalInfo();
    },
    methods: {
      currentMoth(dates) {
        const self = this;
        const cusCode = JSON.parse(sessionStorage.getItem("currentUser"))['cusCode'];
        self.$http.post('/pbap-web/action/customer/query/cusProMonth', {
          cusCode: cusCode,
          trdMonth: dates || self.dates,
        }).then((res) => {
          const _proMonthList = res.data.respInfo.proMonthList;
          self.proMonthList = res.data.respInfo.proMonthList;
          self.totalIncomeAmount = res.data.respInfo.totalIncomeAmount;
          self.totalTrdAmount = res.data.respInfo.totalTrdAmount;
          self.totalRechargeAmount = res.data.respInfo.totalRechargeAmount;
          self.totalWithdrawAmount = res.data.respInfo.totalRechargeAmount;
          if (_proMonthList.length == 0) {
            self.rateOne = 0;
            self.oRateOne = 0;
            self.rateTwo = 0;
            self.oRateTwo = 0;
            self.rateThree = 0;
            self.oRateThree = 0;
            self.rateFoure = 0;
            self.oRateFoure = 0;
          }

          _proMonthList.map((val, index, arr) => {
            switch (val.prdType) {
              case '70':
                self.rateOne = Math.floor(val.incomeRate * 1000) / 100;
                self.oRateOne = Math.floor(val.trdRate * 1000) / 100;
                break;
              case '7':
                self.rateTwo = Math.floor(val.incomeRate * 1000) / 100;
                self.oRateTwo = Math.floor(val.trdRate * 1000) / 100;
                break;
              case '8':
                self.rateThree = Math.floor(val.incomeRate * 1000) / 100;
                self.oRateThree = Math.floor(val.trdRate * 1000) / 100;
                break;
              case '9':
                self.rateFoure = Math.floor(val.incomeRate * 1000) / 100;
                self.oRateFoure = Math.floor(val.trdRate * 1000) / 100;
                break;
              default:
            }
          })
          this.darw('pie-overview');
          this.darw('pie-overview-1');
        });
      },
      darw(id) {
        const self = this;
        self.myChart = Highcharts.chart(id, {
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
              innerSize: '100',
              colors: ["#f4ae3d", "#428aed", "#f7c748", '#1e5bc9'],
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
              ['壹桶金', id == 'pie-overview' ? self.rateOne : self.oRateOne],
              ['聚寶計畫', id == 'pie-overview' ? self.rateTwo : self.oRateTwo],
              ['分期投', id == 'pie-overview' ? self.rateThree : self.oRateThree],
              ['月月盈', id == 'pie-overview' ? self.rateFoure : self.oRateFoure],
            ]
          }]
        });
      },
      toDetail() {
        this.$router.push('/transactionRecordNews');
      },
      getTotalInfo() {
        const self = this;
        const cusCode = JSON.parse(sessionStorage.getItem("currentUser"))['cusCode'];
        self.$http.post('/pbap-web/action/customer/query/cusProReport', {
          cusCode: cusCode,
        }).then((res) => {
          self.proList = res.body.respInfo.proList;
        })
      }
    },
    filters: {
      proName(val) {
        switch (val) {
          case '70':
            return '壹桶金';
            break;
          case '7':
            return '聚寶計畫';
            break;
          case '8':
            return '分期投';
            break;
          case '9':
            return '月月盈';
            break;
          default:
        }
      }
    }
  }
</script>
