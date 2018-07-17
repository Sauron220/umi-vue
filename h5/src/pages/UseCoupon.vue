<template>
    <div class="wrap myCoupon-content useCoupon-content"><!--private-coupon-->
        <div class="coupon-instructions" v-show="couponIns">
            <div class="nav-box mui-bar mui-bar-nav">
                <span @click="closeIns" style="margin-top: 4px" class="go-back mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></span>
                <h1 class="mui-title">使用说明</h1>
                <Instructions style="margin-top: 60px"></Instructions>
            </div>
        </div>
        <span class="go-log" @click="openIns()">使用说明</span>
        <a :href="'/purchaseConfirm/'+prdCode+'/'+relAmount+'/0/'+vipCode" class="dont-coupon">不使用优惠券</a>

        <v-scroll :on-refresh="onRefresh" :on-infinite="onInfinite" ref="hasBox">
            <div id="couponList">
                <div class="mui-card coupons" :class="{'coupons-high': item.status == 0}" v-for="(item, index) in coupons">
                    <div class="coupon-mask" v-show="item.status != 0"></div>
                    <a :href="'/purchaseConfirm/'+prdCode+'/'+relAmount+'/'+item.cpnNum+'/'+vipCode">
                        <div class="mui-card-header coupons-top clearfix">
                            <div class="coupons-left">
                                <p class="p1">加息券</p>
                                <p class="p2">有效日期：{{item.beginTime}}-{{item.endTime}}</p>
                            </div>
                            <div class="coupons-right">
                                <span>{{$formatNum(item.cpnInfo, 100)}}%</span>
                                <span class="big-size">加息</span>
                            </div>
                        </div>
                        <div class="mui-card-content coupons-bottom">
                            <p>适用产品：<span>{{item.cpnProName}}</span></p>
                            <p class="clearfix">最低投资金额：
                                <span>{{$fmoneyFormat(item.cpnProps)}}</span>元
                            </p>
                            <p>来源：{{item.cpnOrigin}}</p>
                        </div>
                    </a>
                </div>
            </div>
        </v-scroll>

        <div class="no-content" ref="noBox">
            <img src="../assets/images/giraffe_none.png" class="center-img">
            <p class="center-text">暂无优惠券</p>
        </div>
    </div>
</template>

<script>
  import Scroll from '@/components/vPullupLoading'
  import Instructions from '@/components/CouponInstructions'

  export default {
    name: 'UseCoupon',
    data() {
      return {
        pageTitle: '使用优惠券',
        prdCode: this.$route.params.prdCode,
        relAmount: this.$route.params.relAmount,
        cpnNum : this.$route.params.cpnNum,
        vipCode : this.$route.params.vipCode,
        pageAt : 1,
        pageSize : 10,
        pageStart : 0,
        pageEnd : 0,
        nowPage: 0,
        couponList: {},
        coupons: [],
        couponIns: false
      }
    },
    created(){
      var self = this;
      self.$store.commit('setPageTitle', self.pageTitle);

      if(self.$route.params.vipCode != 0){
        document.querySelector('.mui-bar-nav').style.background = 'black';
      }

      self.getCoupon();
    },
    components : {
      'v-scroll' : Scroll,
      'Instructions' : Instructions,
    },
    methods:{
      alertInfo() {
        this.$store.commit('setModal', {
          type: 'alert',
          msg: '只有当您购买的产品還款后才会计入累计收益',
        });
        this.$store.commit('showModal');
      },
      // get优惠券列表
      getCoupon(){
        var self = this;
        self.$http.post('/pbap-web/action/investment/query/coupon', {
          pageIndex: 1,
          pageSize: self.pageSize,
          cpnProps: self.relAmount,
          prdCode: self.prdCode
        }).then((res) => {
          self.couponList = {};
          self.coupons = [];
          self.pageAt = 1;
          self.pageAt++;
          self.couponList = res.body.respInfo.cpnInfo;
          self.coupons = res.body.respInfo.cpnInfo.dataList;

          if(self.couponList.totalPage == 0){
            this.$refs.noBox.style.display = "block";
            this.$el.querySelector('.yo-scroll').style.display = 'none';
          }
          else {
            self.nowPage = self.couponList.pageIndex;
            this.$el.querySelector('.load-more').innerHTML = '加载中……';
            if(self.nowPage == self.couponList.totalPage){
              this.$el.querySelector('.load-more').innerHTML = '没有更多数据了';
            }
          }

        }, (res) => {
          console.log('error' + res);
        });
      },
      onRefresh(done) {
        this.getCoupon();
        done()
      },
      // 上拉加载
      onInfinite(done) {
        let self = this;
        self.$http.post('/pbap-web/action/investment/query/coupon',{
          pageIndex: self.pageAt,
          pageSize: self.pageSize,
          cpnProps: self.relAmount,
          prdCode: self.prdCode
        }).then((res) => {
          self.pageAt++;
          self.pageEnd = self.pageSize * self.pageAt;
          self.pageStart = self.pageEnd - self.pageSize;
          self.couponList = res.body.respInfo.cpnInfo;
          self.nowPage = self.couponList.pageIndex;
          let arr = res.body.respInfo.cpnInfo.dataList;
          self.coupons = self.coupons.concat(arr);

          if(self.nowPage == self.couponList.totalPage){
            this.$el.querySelector('.load-more').innerHTML = '没有更多数据了';
          }
          done() // call done
        }, (response) => {
          console.log('error');
        });
      },
      openIns(){
        var self = this;
        self.couponIns = true;
      },
      closeIns(){
        var self = this;
        self.couponIns = false
      }
    }
  }
</script>
