<template>
  <div id="PersonalCenter" class="profile accountOverview-content clearfix" v-TDK="TDK">
    <div class="container">
      <ol class="breadcrumb">
        <span>您現在的位置：</span>
        <li>
          <router-link to="/">首頁</router-link>
        </li>
        <li class="active">我的帳戶</li>
      </ol>
      <leftMenu></leftMenu>
      <div class="pull-left right_content">
        <div class="row top-info ">
          <div class="col-md-4 top1">
            <div id="cusMobile">您好！<span>{{custInfo.cusMobile}}</span></div>
            <a class="icon icon-phone active" title="已綁定手機"></a>
            <a class="icon icon-e-account" :class="{active:isActive}" :title="titleStr"
               :href="openLink"></a>
          </div>
          <div class="col-md-4 top2">
            <h4 style="font-size: 14px;">可用餘額(元)</h4>
            <span class="totalBalance">{{ personalAcc.balanceAmount }}</span>
          </div>
          <div class="col-md-4 top3">
            <a href="javascript:;" @click="linkToRealName()" v-if="custInfo.tpStatus!=1 || !custInfo.payPwdOK"
               class="btn btn-warning btn-recharge">匯款</a>
            <a href="/recharge" v-if="custInfo.tpStatus==1 && custInfo.payPwdOK"
               class="btn btn-warning btn-recharge">匯款</a>
            <a :href="linkTo" @click="linkToRealName()"
               v-if="custInfo.tpStatus!=1 || !custInfo.payPwdOK || bankCardList.length==0"
               class="btn btn-warning btn-withdrawals">提領</a>
            <a href="/withdraw" v-if="custInfo.tpStatus==1 && custInfo.payPwdOK && bankCardList.length!=0"
               class="btn btn-warning btn-withdrawals">提領</a>
          </div>
        </div>

        <div class="all">
          <p id="totalProperties">總資產(元)<br/><span>{{ personalAcc.totalProperties }}</span></p>
          <div class="pie-overview" id="pie-overview"></div>
        </div>

        <div class="table-responsive asset-overview">
          <table class="table table-hover">
            <tr>
              <th class="b1">可用餘額</th>
              <td id="balanceAmount">
                <div style="width:200px">{{ personalAcc.balanceAmount }}元</div>
              </td>
              <td id="balanceRate">
                <div style="width:160px">{{ personalAcc.balanceRate }}%</div>
              </td>
            </tr>
            <tr>
              <th class="b2">凍結金額</th>
              <td id="frozenAmount">
                <div style="width:200px">{{ personalAcc.frozenAmount }}元</div>
              </td>
              <td id="frozenRate">
                <div style="width:160px">{{ personalAcc.frozenRate }}%</div>
              </td>
            </tr>
            <tr>
              <th class="b3">待收益金額</th>
              <td id="benifitAmount">
                <div style="width:200px">{{ personalAcc.benifitAmount }}元</div>
              </td>
              <td id="benifitRate">
                <div style="width:160px">{{ personalAcc.benifitRate }}%</div>
              </td>
            </tr>
            <!--<tr>
                <th class="b4">投資體驗金</th>
                <td id="bonusAmount">{{ personalAcc.bonusAmount }}元</td>
                <td>不包含在總資產內</td>
            </tr>-->
          </table>
        </div>
      </div>
    </div>
    <vOpenFloat v-if="isOpen" :vOpenAccBl="vOpenAcc"></vOpenFloat>
  </div>
</template>
<script>
  import PersonalCenterMenu from '../components/PersonalCenterMenu'
  import Highcharts from 'highcharts'
  import vOpenFloat from '../components/vOpenFloat.vue'

  export default {
    name: 'PersonalCenter',
    data() {
      return {
        personalAcc: {},
        custInfo: {},
        isOpen: false,
        vOpenAcc: '',
        isActive: false,
        titleStr: '',
        openLink: 'javascript:void(0)',
        linkTo: 'javascript:void(0)',
        bankCardList: [],
        TDK: {
          title: '帳戶總覽-聚寶盆',
          keyWords: '帳戶總覽,理財帳戶,聚寶盆',
          description: '歡迎進入聚寶盆會員中心,在這裏您可以制定個人理財規劃，投資聚寶計劃、分期投、月月盈、尊享計劃等，可以進行匯款、體現等操作。',
        }
      }
    },
    components: {
      'leftMenu': PersonalCenterMenu,
      'vOpenFloat': vOpenFloat,
    },
    created() {
      var self = this
      // get用戶資產資訊
      self.$http.get('/pbap-web/action/bankcard/query/bankcardList').then((res) => {
        self.bankCardList = res.body.respInfo.bankCardList || [];
      })

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
      // 判斷用戶是否實名&匯款提領按鈕
      self.$http.post('/pbap-web/action/customer/query/custAuthInfo', {}).then((res) => {
        self.custInfo = res.body.respInfo.custInfo;
        self.tpStatus = self.custInfo.tpStatus;
        self.activateStatus = self.custInfo.activateStatus;
        self.mobileStatus = self.custInfo.mobileStatus;
        if (self.mobileStatus == 1) {
//          $(".quan .icon-phone").addClass("active");
        } else if (self.mobileStatus == 0) {
//          $(".quan .icon-phone").removeClass("active");
        }
        setTimeout(function () {
          if (self.tpStatus == 1) {
            if (self.activateStatus != 1) {
              /* self.isOpen = true;
               self.vOpenAcc = false;
               self.isActive = false;
               self.titleStr = '點擊激活上海銀行存管帳戶';
               self.openLink = '/tpAccount';*/
            } else {
              /*self.isActive = true;
              self.titleStr = '已開通上海銀行存管帳戶';*/
            }
//          } else if (self.tpStatus == 0) {
//            self.isOpen = true;
//            self.vOpenAcc = true;
//            self.isActive = false;
//            self.titleStr = '點擊開通上海銀行存管帳戶';
//            self.openLink = '/openAccount';

          }
        }, 100)
      });

    },
    mounted() {

    },
    methods: {
      linkToRealName() {
        let self = this;
        if (self.custInfo.tpStatus == 1) {
          if (!self.custInfo.payPwdOK) {
            this.$store.commit('setModal', {
              type: 'confirm',
              msg: '為了您的資金安全，請先設置支付密碼',
              confirmUrl: '/setPayPwd',
              confirmText: "立即設置"
            })
            this.$store.commit('showModal')
          } else if (self.bankCardList.length == 0) {
            this.$store.commit('setModal', {
              type: 'confirm',
              msg: '為了您的資金安全，請先綁定銀行資料',
              confirmUrl: '/changeBankCard',
              confirmText: "綁定銀行資料"
            })
            this.$store.commit('showModal')
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
      }
    }
  }
</script>

