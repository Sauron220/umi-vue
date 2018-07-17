<template>
    <div class="wrap confirm-content" :class="{'private-confirm': vipCode && vipCode !=0}">
        <PageNav :message="backUrl"></PageNav>
        <div id="sand-box" v-if="!formInfo">
            <div class="product-top">
                <div class="headName">{{productDetail.prdName}}</div>
                <div class="info">
                    <div class="info1">
                        <h2>预期年化收益</h2>
                        <span>{{$fmoney(productDetail.defaultRate*100, 1)}}%</span>
                        <i v-if="productDetail.rewardRate && parseFloat(productDetail.rewardRate) != 0">+ {{$fmoney(productDetail.rewardRate*100, 1)}}%</i>
                    </div>
                    <div class="info2">
                        <h2>还款方式</h2>
                        <span>{{repType(productDetail.repType)}}</span>
                    </div>
                    <div class="info3">
                        <h2>借款期限</h2>
                        <span>{{productDetail.prdPeriod}}天</span>
                    </div>
                </div>
            </div>
            <div class="product-form">
                <div class="product-bar">
                    <h2>投资金额</h2>
                    <p class="text-black">{{relAmount}}元</p>
                </div>
                <div class="product-bar">
                    <h2>预期收益</h2>
                    <p class="text-black">{{calcPreEarn(relAmount, productDetail.rate, productDetail.prdPeriod)}}元</p>
                </div>
                <div class="product-bar mark">
                    <h2>使用优惠券</h2>
                    <p class="cpntext" v-if="couponList.length == 0">无可用优惠券</p>
                    <a :href="'/useCoupon/'+prdCode+'/'+relAmount+'/0/'+$route.params.vipCode" class="cpntext" v-if="couponList.length > 0 && cpnNum == 0">有{{couponList.length}}张优惠券可用</a>
                    <a :href="'/useCoupon/'+prdCode+'/'+relAmount+'/'+cpnNum+'/'+$route.params.vipCode" class="cpntext text-blue" v-if="cpnNum && cpnNum != 0">{{$fmoney(couponText, 1)}}%加息</a>
                </div>
                <div class="product-bar text-black reward" v-show="cpnNum && cpnNum != 0">
                    <h2>加息券奖励</h2>
                    <p class="text-black">{{$fmoney(totalInterests)}}元</p>
                </div>
            </div>
            <div class="paybtn" @click="purchaseGo"><span>立即加入</span></div>
        </div>

        <div id="app-form" :style="{ height: screenHeight.height + 'px'}"></div>
    </div>
</template>

<script>
  import Tool from '../util/ProductTool.js'
  import PageNav from '@/components/PageNav'

  export default {
    name: 'PurchaseConfirm',
    data() {
      return {
        pageTitle: '投资',
        prdType: this.$route.query.prdType,
        prdCode: this.$route.params.prdCode,
        relAmount: this.$route.params.relAmount,
        productDetail: {},
        vipCode: "",
        cpnNum : "",
        productDetail: {},
        coupon: 0,
        couponList: [],
        couponText: '',
        totalInterests: 0,
        myCode: '',
        backUrl: '',
        formInfo: '',
        screenHeight: {
          height : 0
        }
      }
    },
    created(){
      var self = this;
      self.$store.commit('setPageTitle', self.pageTitle);
      self.getProductDetail(this.$route.params.prdCode, function () {
        if(self.$route.params.cpnNum != 0){
          self.cpnNum = self.$route.params.cpnNum;
        }
        if(self.$route.params.vipCode != 0){
          self.vipCode = self.$route.params.vipCode;
          document.querySelector('.mui-bar-nav').style.background = 'black';
          document.querySelector('#app').style.background = '#141517';
        }

        self.$http.post('/pbap-web/action/product/query/productDetail', {
          'prdCode': self.prdCode
        }).then((res) => {
          self.productDetail = res.body.respInfo.productDetail;
          let prdType = self.productDetail.prdType;
          if(prdType == '40'){
            self.backUrl = '/private/' + self.prdCode;
            return false
          } else if(prdType == '50'){
            self.backUrl = '/parent-child-detail/' + self.prdCode;
            return false
          } else {
            self.backUrl = '/product/' + self.prdCode;
          }
        });

        self.getCooper();
        self.couponAmount();

      });
      self.$http.post('/pbap-web/action/customer/query/custAuthInfo', {}).then((res) => {
        self.myCode = res.body.respInfo.custInfo.cusCode;
      });
    },
    components: {
      'PageNav': PageNav,
    },
    computed: {
      userInfo() {
        return this.$store.state.userInfo
      },
      accountInfo() {
        return this.$store.state.accountInfo
      }
    },
    methods: {
      getProductDetail: Tool.getProductDetail,
      getTimeLeft: Tool.getTimeLeft,
      repType: Tool.repType,
      calcPreEarn: Tool.calcPreEarn,
      getCooper: Tool.getCooper,
      // 确认完毕前去购买
      purchaseGo(){
        let self = this;
        self.$http.post('/pbap-web/action/investment/add/prdPurchase', {
          bonusAmount: 0,
          prdCode: self.prdCode,
          relAmount: self.relAmount,
          cpnNum: self.cpnNum,
          cusCode: self.myCode,
          vipCode: self.vipCode
        }).then((res) => {
          self.formInfo = res.body.respInfo.payForm;
        if(self.formInfo){
          self.screenHeight.height = document.body.clientHeight - 50;
          $("#app-form").append(self.formInfo)
        }
        console.log(res.body.respInfo);

      }, (res) => {
          console.log(res.body.respInfo);
        });
      },
      // get优惠券資訊
      couponAmount(){
        let self = this;
        if (self.cpnNum != 0) {
          self.$http.post('/pbap-web/action/investment/query/useCoupon', {
            cpnNum: self.cpnNum,
          }).then((res) => {
            self.couponText = self.$formatNum(res.body.respInfo.cpnInfo.cpnInfo * 100, 1);

          self.$http.post('/pbap-web/action/product/query/calculator', {
            prdAmount: self.relAmount,
            rate: self.couponText,
            prdPeriod: self.productDetail.prdPeriod,
            repType: self.productDetail.repType,
            pageIndex : 1,
            pageSize : 10
          }).then((res) => {
            self.totalInterests = res.body.respInfo.incomeResult.totalInterests;
        }, (res) => {
            console.log(res.body.respInfo);
          });

        }, (res) => {
            console.log(res.body.respInfo);
          });
        }

      },
      closeFormInfo(){
        window.history.go(-1);
      }
    },

  }
</script>
