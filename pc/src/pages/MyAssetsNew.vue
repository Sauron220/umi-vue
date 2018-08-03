<template>
  <div class="myassets-new">
    <div class="myassets-new-info">
      <div class="desc-txt">開通銀行卡資金存管賬戶，保障您的資金安全。 </div>
      <div class="btn" @click="toRealAuth">立即開啟銀行資金管理</div>
    </div>
    <div class="total-money-warp">
      <div class="total-money-con">
        <div class="num">
          <span>{{personalAcc.totalProperties}}</span>元
        </div>
        <div class="txt">
          聚寶盆總資產
        </div>
      </div>
      <div class="divider-myass"></div>
      <div class="total-money-con">
        <div class="num">
          <span>{{ personalAcc.balanceAmount }}</span>元
        </div>
        <div class="txt">
          賬戶餘額
        </div>
      </div>
      <div class="divider-myass"></div>
      <div class="total-money-con final">
        <div class="num" @click="linkToRealName(1)">
          儲值
        </div>
        <div class="txt" @click="linkToRealName(2)">
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
          <div class="tit" @click="toPage({name: 'ReturnInquirys'})">回帳查詢</div>
          <div class="tit" @click="toPage({name: 'MonthlyBills'})">月賬單</div>
          <div class="tit" @click="toPage({name: 'TransactionRecordNews'})">交易紀錄</div>
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
          <div class="tit-hed" v-for="(item, index) in proMonthList" :key="index">
            <div class="tit-desc"
                 :class="{'tit-he-tit':item.prdType == 70, 'tit-he-tis': item.prdType == 7,
                 'tit-he-tic': item.prdType == 8, 'tit-he-tif': item.prdType == 9}">{{ item.prdType| proName}}</div>
            <div class="tit-desc">{{$fmoney(item.holdingTrade)}}元</div>
            <div class="tit-desc-c">{{$fmoney(item.totalIncome)}}元</div>
          </div>
          <!--<div class="tit-hed">
            <div class="tit-desc tit-he-tis">聚寶計畫</div>
            <div class="tit-desc">0.00元</div>
            <div class="tit-desc-c">0.00元</div>
          </div>
          <div class="tit-hed">
            <div class="tit-desc tit-he-tic">分期投 </div>
            <div class="tit-desc">0.00元</div>
            <div class="tit-desc-c">0.00元</div>
          </div>
          <div class="tit-hed">
            <div class="tit-desc tit-he-tif">月月盈</div>
            <div class="tit-desc">0.00元</div>
            <div class="tit-desc-c">0.00元</div>
          </div>-->
        </div>
      </div>
    </div>
    <div class="total-product">
      <div class="product-list-nav">
        <div class="nav-item" @click="toNextPage(1, '70')" :class="{'active-item': flag == 1}">一桶金</div>
        <div class="nav-item" @click="toNextPage(2, '7')" :class="{'active-item': flag == 2}">聚寶計畫</div>
        <div class="nav-item" @click="toNextPage(3, '8')" :class="{'active-item': flag == 3}">分期投</div>
        <div class="nav-item" @click="toNextPage(4, '9')" :class="{'active-item': flag == 4}">月月盈</div>
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
        rateOne:0,
        rateTwo:0,
        rateThree:0,
        rateFoure:0,
        custInfo: {},
        bankCardList:[],
        proMonthList:[],
      }
    },
    created() {
      const self = this;
      const cusCode = JSON.parse(sessionStorage.getItem("currentUser"))['cusCode'];

      self.$http.post('/pbap-web/action/customer/query/tradeReport', {
        cusCode: cusCode,
      }).then((res) => {
        const _proMonthList = res.data.respInfo.tradeList;
        self.proMonthList = res.data.respInfo.tradeList;

        _proMonthList.map((val, index, arr) => {
          switch (val.prdType){
            case '70':
              self.rateOne = Math.floor(val.holdingRate * 1000) / 100;
              break;
            case '7':
              self.rateTwo = Math.floor(val.holdingRate * 1000) / 100;
              break;
            case '8':
              self.rateThree = Math.floor(val.holdingRate * 1000) / 100;
              break;
            case '9':
              self.rateFoure = Math.floor(val.holdingRate * 1000) / 100;
              break;
            default:
          }
        })
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
              innerSize: '180',
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
              ['壹桶金', self.rateOne],
              ['聚寶計畫', self.rateTwo],
              ['分期投', self.rateThree],
              ['月月盈', self.rateFoure],
            ]
          }]
        });
      });

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
      });
      this.isRealUser();
      this.fetchBankList();
    },
    methods:{
      toNextPage(v, code) {
        this.flag = v;
        this.$store.commit('changeprdTypeCode', code);
      },
      toPage(v) {
        this.$router.push(v)
      },
      isRealUser() {
        // 判斷用戶是否實名&儲值提領按鈕
        const self = this;
        self.$http.post('/pbap-web/action/customer/query/custAuthInfo', {}).then((res) => {
          self.custInfo = res.body.respInfo.custInfo;
          self.tpStatus = self.custInfo.tpStatus;
          self.activateStatus = self.custInfo.activateStatus;
          self.mobileStatus = self.custInfo.mobileStatus;
        });
      },
      linkToRealName(type) {
        let self = this;
        if (self.custInfo.tpStatus == 1) {
          if (!self.custInfo.payPwdOK) {
            this.$store.commit('setModal', {
              type: 'confirm',
              msg: '為了您的資金安全，請先設置支付密碼',
              confirmUrl: '/setPayPwds',
              confirmText: "立即設置"
            })
            this.$store.commit('showModal')
          } else if (self.bankCardList.length == 0) {
            this.$store.commit('setModal', {
              type: 'confirm',
              msg: '為了您的資金安全，請先綁定銀行資料',
              confirmUrl: '/addBankCards',
              confirmText: "綁定銀行資料"
            })
            this.$store.commit('showModal')
          } else if (type == 1) {
            self.$router.push({path:'/recharges'});
          } else if (type == 2) {
            self.$router.push({path:'/withdraws'});
          }
        } else {
          this.$store.commit('setModal', {
            type: 'confirm',
            msg: '為了您的資金安全，請先完成實名認證',
            confirmUrl: '/openAccount',
            confirmText: "立即實名"
          })
          this.$store.commit('showModal')
        }
      },
      fetchBankList () {
        // get用戶資產資訊
        const self = this;
        self.$http.get('/pbap-web/action/bankcard/query/bankcardList').then((res) => {
          self.bankCardList = res.body.respInfo.bankCardList || [];
        })
      },
      toRealAuth() {
        this.$router.push({name: 'RealNameAuths'});
      },
    },
    filters:{
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
