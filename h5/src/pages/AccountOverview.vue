<template>
    <div class="wrap account-Overview">
        <PageNav message="/profile"></PageNav>
        <div class="chart">
            <p id="totalProperties">总资产(元)<br /><span>{{ personalAcc.totalProperties }}</span></p>
            <div class="pie-overview" id="pie-overview"></div>
        </div>

        <div class="detail-bottom">
            <div class="detailed">
                <i class="high-1"></i>
                <span class="de1">可用余额</span>
                <span class="de2" id="balanceAmount">{{ personalAcc.balanceAmount }}元</span>
                <span class="de3" id="balanceRate">{{ personalAcc.balanceRate }}%</span>
            </div>

            <div class="detailed">
                <i class="high-2"></i>
                <span class="de1">冻结金额</span>
                <span class="de2" id="frozenAmount">{{ personalAcc.frozenAmount }}元</span>
                <span class="de3" id="frozenRate">{{ personalAcc.frozenRate }}%</span>
            </div>

            <div class="detailed">
                <i class="high-3"></i>
                <span class="de1">待收益金额</span>
                <span class="de2" id="benifitAmount">{{ personalAcc.benifitAmount }}元</span>
                <span class="de3" id="benifitRate">{{ personalAcc.benifitRate }}%</span>
            </div>
        </div>

        <div class="bottom">
            <button type="button" class="mui-btn tx-btn" @click="isOpenAccount('withdraw')">提现</button>
            <button type="button" class="mui-btn cz-btn" @click="isOpenAccount('recharge')">儲值</button>
        </div>

        <div class="mask0" v-if="isOpen"></div>
        <vOpenFloat v-if="isOpen" :vOpenAccBl="vOpenAcc"></vOpenFloat>
    </div>
</template>

<script>
  import Highcharts from 'highcharts'
  import Tool from '../util/ProductTool.js'
  import vOpenFloat from '@/components/vOpenFloat'
  import PageNav from '@/components/PageNav'

  export default {
    name: 'AccountOverview',
    data() {
      return {
        pageTitle: '账户总览',
        personalAcc: {},
        isOpen: false,
        vOpenAcc: '',
        isGoUrl: null
      }
    },
    created(){
      var self = this;
      self.$store.commit('setPageTitle', self.pageTitle);
      self.isOpenAccount();
      // get用户资产資訊
      self.$http.get('/pbap-web/action/customer/query/personalAccount').then((res) => {
        self.personalAcc = res.body.respInfo.personalAccView;
        self.personalAcc.balanceRate = Math.floor(self.personalAcc.balanceRate * 10000) / 100;
        self.personalAcc.frozenRate = Math.floor(self.personalAcc.frozenRate * 10000) / 100;
        self.personalAcc.benifitRate = Math.floor(self.personalAcc.benifitRate * 10000) / 100;
        self.personalAcc.balanceAmount = self.$fmoney(self.personalAcc.balanceAmount);   // 可用金额
        self.personalAcc.frozenAmount = self.$fmoney(self.personalAcc.frozenAmount);   // 冻结金额
        self.personalAcc.benifitAmount = self.$fmoney(self.personalAcc.benifitAmount);   // 待收益金额
        self.personalAcc.bonusAmount = self.$fmoney(self.personalAcc.bonusAmount);   // 体验金
        self.personalAcc.totalProperties = self.$fmoney(self.personalAcc.totalProperties);   // 总资产

        if (self.personalAcc.totalProperties == 0) {
          self.myChart = Highcharts.chart('pie-overview', {
            chart: {
              plotBackgroundColor: null,
              plotBorderWidth: null,
              plotShadow: false,
              width: 210,
              height: 210,
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
                size: 190,
                innerSize: '170',
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
              data: [['无', 100]]
            }]
          });
        }
        else {
          self.myChart = Highcharts.chart('pie-overview', {
            chart: {
              plotBackgroundColor: null,
              plotBorderWidth: null,
              plotShadow: false,
              width: 210,
              height: 210,
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
                size: 190,
                innerSize: '170',
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
                ['可用余额', self.personalAcc.balanceRate],
                ['冻结余额', self.personalAcc.frozenRate],
                ['待收益金额', self.personalAcc.benifitRate],

              ]
            }]
          });
        }

      });

    },
    components : {
      'vOpenFloat': vOpenFloat,
      'PageNav': PageNav,
    },
    methods: {
      isOpenAccount: Tool.isOpenAccount,
    }

  }
</script>
<style>
    body {
        background-color: #fff !important;
    }
</style>
