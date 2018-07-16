<template>
  <div class="product-detail product-normal product-experience">
    <!--<div>產品id：{{$route.params.id}}</div>-->
    <div class="product-info">
      <div class="container product-intro-box product-intro">
        <div class="left-info">
          <ol class="breadcrumb">
            <span>您現在的位置：</span>
            <li>
              <router-link to="/">首頁</router-link>
            </li>
            <li>
              <router-link :to="{ name: 'ProductList', params: { prdType:0,prdStatus:0,pageAt:1 }}">定期理財
              </router-link>
            </li>
            <li v-if="productDetail.prdType">
              {{getTypeName(productDetail.prdType)}}
            </li>
          </ol>
          <h1 class="product-name">
            <span class="title">{{productDetail.prdName}}</span>
          </h1>
          <div class="clearfix"></div>
          <div class="top">
            <div class="item profit">
              <div class="num">
                <span>{{productRate(productDetail.defaultRate, productDetail.rewardRate)}}</span>
              </div>
              <i>預期年化收益</i>
            </div>
            <div class="item term">
              <div class="num">
                <span>{{productDetail.prdPeriod}}</span>天
              </div>
              <i>借款期限</i>
            </div>
            <div class="item all" style="visibility: hidden">
              <div class="num">
                <span>{{productDetail.prdAmount}}</span>元
              </div>
              <i>投資金額</i>
            </div>
          </div>
          <div class="bottom clearfix">
            <div class="intro-group">
              <div class="intro-text">投資條件</div>
              <span>使用體驗金</span>
            </div>
            <div class="intro-group">
              <div class="intro-text">起息日期</div>
              <div class="intro-content">
                投資成功後即起息
              </div>
            </div>
            <div class="intro-group intro-group-time" id="countdown">
              <div>
                <div class="intro-text">還款方式</div>
                <div class="intro-content">
                  <span class="ell">到期付息</span>
                </div>
              </div>
            </div>
            <div class="intro-group" style="width: 300px;">
              <div class="intro-text">還款提示</div>
              <div class="intro-content">
                到期後收益歸至賬戶餘額
              </div>
            </div>
          </div>
        </div>
        <div class="pay-status">
          <div class="pay-info" v-if="productDetail.status == 11">
            <form action="" method="post" id="payForm" submit="investRule" novalidate="">
              <div class="balance clearfix">
                <i class="pull-left">賬戶餘額</i>
                <div class="account-info" v-if="userInfo.loginResult">
                  <span class="pull-left">{{$fmoney(accountInfo.balanceAmount)}}元</span>
                  <a class="charge pull-right" href="/recharge" target="_blank">儲值</a>
                </div>
                <div class="account-info" v-if="!userInfo.loginResult">
                  <span class="pull-left"><a :href="loginUrl">登錄</a>後可見</span>
                </div>
              </div>
              <div class="amount-money">
                <input class="form-control" type="text" name="invest"
                       maxlength="10"
                       v-model="invest"
                       :placeholder="inputPlaceholder"
                       v-validate="{rules:{required:true}}" readonly>
                <i class="p-error" v-if="errors.first('invest')">{{errors.first('invest')}}</i>
              </div>
              <div class="excepted-earn">
                預期收益<span>{{calcPreEarn($route.query.invest, productDetail.rate, productDetail.prdPeriod)}}</span>元
              </div>
              <a :href="userInfo.loginResult ? 'javascript:;':loginUrl" class="btn btn-warning btn-block"
                 v-if="productDetail.status == 11"
                 @click="investComfirm()">立即加入</a>
              <a :href="userInfo.loginResult ? 'javascript:;':loginUrl"
                 class="btn btn-warning btn-block disabled"
                 v-if="productDetail.status != 11">即將開始</a>
            </form>
          </div>
          <div class="other-status text-center" v-if="productDetail.status == 20">  <!-- 還款中 -->
            <img src="../assets/images/private_status_1.png">
            <p>退出時間 <span data-prd="dueDate">{{productDetail.dueDate}}</span></p>
          </div>
          <div class="other-status text-center" v-if="productDetail.status == 16">  <!-- 停止 -->
            <img src="../assets/images/private_status_2.png">
          </div>
          <div class="other-status text-center" v-if="productDetail.status == 30">  <!-- 已還款 -->
            <img src="../assets/images/private_status_3.png">
            <p>退出時間 <span data-prd="dueDate">{{productDetail.dueDate}}</span></p>
          </div>
          <div class="other-status text-center" v-if="productDetail.status == 14">  <!-- 已滿額 -->
            <img src="../assets/images/private_status_4.png">
          </div>
          <div class="other-status text-center" v-if="productDetail.status == 0">  <!-- 已下架 -->
            <img src="../assets/images/private_status_5.png">
          </div>
        </div>
      </div>
    </div>
    <div class="section-space"></div>
    <div class="container intro">
      <div class="title">項目簡介</div>
      <div v-html="productDetail.remark"></div>
      <br>
      <div class="title">投資說明</div>
      <div v-html="productDetail.introduction"></div>
      <br>
      <br>
      <br>
    </div>
  </div>
</template>

<script>
  import Tool from '../util/ProductTool.js'
  import vPagination from '../components/vPagination'
  import {Validator} from 'vee-validate';

  export default {
    name: 'Experience',
    data() {
      return {
        buyConfirm: false,
        productDetail: {},
        checkDetailSlider: {},
        tabAt: 1,
        imageList: [],
        imgDetailSwipe: {
          isShow: false,
          hasPre: true,
          hasNext: true
        },
        invest: null,
        coupon: 0,
        couponText: '',
        showLeftTime: null,
        showBeginTime: null,
        inputPlaceholder: '',
        couponList: [],
        loginUrl: '',
      }
    },
    components: {
      vPagination: vPagination
    },
    created() {
      var self = this;
      self.loginUrl = '/login?remark='+location.pathname;
      self.getProductDetail(this.$route.params.prdCode, function () {
        self.invest = self.$fmoneyFormat(self.$route.query.invest) + '元';
      })
    },
    computed: {
      userInfo() {
        return this.$store.state.userInfo
      },
      accountInfo() {
        return this.$store.state.accountInfo
      }
    },
    mounted() {
    },
    methods: {
      getProductDetail: Tool.getProductDetail,
      showImgDetail: Tool.showImgDetail,
      setTabValue: Tool.setTabValue,
      setDwipe: Tool.setDwipe,
      setImgDetailSwipePreNext: Tool.setImgDetailSwipePreNext,
      setImgDetailSwipe: Tool.setImgDetailSwipe,
      imgDetailSwipeToggle: Tool.imgDetailSwipeToggle,
      productRate: Tool.productRate,
      productRateSimple: Tool.productRateSimple,
      repType: Tool.repType,
      valDelayTypeDays: Tool.valDelayTypeDays,
      repDelayTypeDays: Tool.repDelayTypeDays,
      getTimeLeft: Tool.getTimeLeft,
      calcPreEarn: Tool.calcPreEarn,
      getInvestRecord: Tool.getInvestRecord,
      goAgreement: Tool.goAgreement,
      inTheArray: Tool.inTheArray,
      getTypeName: Tool.getTypeName,
      investComfirm() {
        var self = this;
        self.postData = {
          prdCode: this.$route.params.prdCode,
          cpnNum: this.$route.query.cpnNum,
        }
        self.$http.post('/pbap-web/action/investment/add/prdPurchase', self.postData).then((res) => {
          if (res.body.errorInfo.errorCode == '0000') {
            location.href = '/experienceSuccess';
          }
        });
      }
    }
  }
</script>
