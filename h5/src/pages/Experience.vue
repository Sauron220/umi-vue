<template>
    <div class="wrap product-content experience-content">
        <PageNav></PageNav>
        <div class="contScroll mui-content">
            <div class="product-top">
                <div>
                    <img src="../assets/images/pro_img.png" class="top-bar">
                    <div class="return-rate">
                        <span>{{$fmoney(productDetail.defaultRate*100, 1)}}</span>
                        <i v-if="productDetail.rewardRate && parseFloat(productDetail.rewardRate) != 0">+{{$fmoney(productDetail.rewardRate*100, 1)}}%</i>
                        <i v-else>%</i>
                    </div>
                </div>
                <div class="info">体验金 体验投资乐趣</div>
            </div>
            <div class="about">
                <div>
                    <h3>借款期限</h3>
                    <span class="bid-range">{{productDetail.prdPeriod}}天</span>
                </div>
                <div>
                    <h3>投资条件</h3>
                    <span class="bid-range">使用体验金</span>
                </div>
                <div>
                    <h3>起息日期</h3>
                    <span class="bid-range">投资成功后即起息</span>
                </div>
                <div>
                    <h3>还款方式</h3>
                    <span class="bid-range">到期付息</span>
                </div>
                <div>
                    <h3>还款提示</h3>
                    <span class="bid-range">到期后收益归至账户余额</span>
                </div>
                <div>
                    <h3>项目简介</h3>
                    <span class="bid-range" v-html="productDetail.remark"></span>
                </div>
                <div>
                    <h3>投资说明</h3>
                    <span @click="openDetail" class="more bid-range text-orange">查看详情</span>
                </div>
            </div>
        </div>
        <div class="bottom-btn">
            <a v-if="productDetail.status == 11" class="product-btn product-btn-high"
               :href="userInfo.loginResult ? 'javascript:;':loginUrl" @click="investComfirm()">立即加入</a>
            <div v-if="productDetail.status == 20" class="product-btn">還款中</div>
            <div v-if="productDetail.status == 30" class="product-btn">已還款</div>
            <div v-if="productDetail.status == 16" class="product-btn">停止加入</div>
            <a v-if="productDetail.status == 12" class="product-btn product-btn-high"
               :href="userInfo.loginResult ? 'javascript:;':loginUrl">即将开始</a>
            <div v-if="productDetail.status == 0" class="product-btn">已下架</div>
            <div v-if="productDetail.status == 14" class="product-btn">已满额</div>
        </div>
        <div class="look-details" :class="{'look-details-high': watchDetail == true}">
            <div class="nav-box mui-bar mui-bar-nav" v-show="watchDetail == true">
                <span @click="closeDetails" class="go-back mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></span>
                <h1 class="mui-title">投资说明</h1>
            </div>
            <div class="pull-box">
                <div class="details" v-html="productDetail.introduction"></div>
            </div>
        </div>
        <div class="mask0" v-show="buyConfirm" @click="closeInvestComfirm()"></div>
        <div class="pay-box tyj-paybox" :class="{'pay-box-high': buyConfirm}">
            <div class="pos">
                <h2>确认投资</h2>
                <i class="tyj-pop-close" @click="closeInvestComfirm()"></i>
                <div class="bar">
                    <div class="six-box six-line clearfix">
                        <h1>体验金</h1>
                        <span class="text-blue">{{$fmoneyFormat($route.params.cpnInfo)}}元</span>
                    </div>
                </div>
                <div class="bar">
                    <div class="six-box six-line clearfix">
                        <h1>预期收益</h1>
                        <span style="text-align: left" class="expected-revenue">{{calcPreEarn($route.params.cpnInfo, productDetail.rate, productDetail.prdPeriod)}}元</span>
                    </div>
                </div>
                <div class="bar alert">遇到问题？您可以：<br>
                    1、拨打客服电话 <a href="tel:400-600-9976" class="telto">400-600-9976</a><br>
                    2、关注微信公众号 <i>“上海聚寶盆”</i> 留言提问
                </div>
            </div>
            <a class="paybtn" @click="testBuyUrl()">立即加入</a>
        </div>
        <vOpenFloat v-if="isOpen" :vOpenAccBl="vOpenAcc"></vOpenFloat>
    </div>
</template>

<script>
  import Tool from '../util/ProductTool.js'
  import Scroll from '@/components/vPullupLoading'
  import PageNav from '@/components/PageNav'
  import vOpenFloat from '@/components/vOpenFloat'

  export default {
    name: 'Experience',
    data() {
      return {
        pageTitle: '',
        buyConfirm: false,
        productDetail: {},
        tabAt: 1,
        invDataList:{},
        invData: {},
        coupon: 0,
        couponText: '',
        showLeftTime: null,
        showBeginTime: null,
        inputPlaceholder: '',
        welfareList: '',
        couponList: [],
        isOpen: false,
        vOpenAcc: '',
        loginUrl: '',
        showHelpText: false,
        watchDetail: false,
      }
    },
    created(){
      var self = this;
      self.loginUrl = '/login?remark=' + location.pathname; // 设置登录成功后的跳转链接
      self.getProductDetail(this.$route.params.prdCode, function () {
        self.pageTitle = self.productDetail.prdName;
        self.$store.commit('setPageTitle', self.pageTitle);
      })
    },
    components : {
      'v-scroll' : Scroll,
      'PageNav': PageNav,
      'vOpenFloat': vOpenFloat,
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
      let hei = document.documentElement.clientHeight - 50;
      document.querySelector('.product-content').setAttribute('style', 'height:'+hei+'px');
    },
    methods: {
      getProductDetail: Tool.getProductDetail,
      showImgDetail: Tool.showImgDetail,
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
      allIn: Tool.allIn,
      goAgreement: Tool.goAgreement,
      getWelfareReminder: Tool.getWelfareReminder,
      inTheArray: Tool.inTheArray,
      getTypeName: Tool.getTypeName,
      buyHandle: Tool.buyHandle,
      helpTextToggle: Tool.helpTextToggle,
      investComfirm() {
        var self = this;
        self.buyConfirm = true;
        self.getWelfareReminder(self.productDetail.prdType);
      },
      testBuyUrl(){
        var self = this;
        self.postData = {
          prdCode: self.$route.params.prdCode,
          cpnNum: self.$route.params.cpnNum,
          expNum: self.$route.params.cpnInfo
        }
        self.$http.post('/pbap-web/action/investment/add/prdPurchase', self.postData).then((res) => {
          if (res.body.errorInfo.errorCode == '0000') {
            location.href = '/purchaseSuccess?expResult=expResult';
          }
        });

      },
      // open产品详情
      openDetail(){
        let self = this;
        self.watchDetail = true;
        let hei = document.documentElement.clientHeight - 100;
        document.querySelector('.look-details').setAttribute('style', 'height:'+hei+'px');
      },
      closeDetails(){
        let self = this;
        self.watchDetail = false;
      },
      closeInvestComfirm(){
        this.buyConfirm = false;
      }
    }
  }
</script>
