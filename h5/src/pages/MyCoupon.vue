<template>
    <div class="wrap myCoupon-content">
        <PageNav message="/profile"></PageNav>
        <div class="coupon-instructions" v-show="couponIns">
            <div class="nav-box mui-bar mui-bar-nav">
                <span @click="closeIns" style="margin-top: 4px" class="go-back mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></span>
                <h1 class="mui-title">使用说明</h1>
                <Instructions style="margin-top: 60px"></Instructions>
            </div>
        </div>
        <span class="go-log" @click="openIns()">使用说明</span>

        <div class="coupon-nav">
            <span class="nav" :class="{'nav-high': couponTab==0}" @click="getCoupon(0)">
                <router-link to="/myCoupon/0/1">未使用</router-link>
            </span>
            <span class="nav" :class="{'nav-high': couponTab==1}" @click="getCoupon(1)">
                <router-link to="/myCoupon/1/1">已使用</router-link>
            </span>
            <span class="nav" :class="{'nav-high': couponTab==2}" @click="getCoupon(2)">
                <router-link to="/myCoupon/2/1">已失效</router-link>
            </span>
        </div>

        <v-scroll :on-refresh="onRefresh" :on-infinite="onInfinite" ref="hasBox">
            <div id="couponList">
                <div class="mui-card coupons" :class="{'coupons-high': couponTab == 0}" v-for="(item, index) in coupons">
                    <div class="mui-card-header coupons-top clearfix">
                        <span class="cou-used" v-show="couponTab==1"></span>
                        <span class="cou-expired" v-show="couponTab==2"></span>
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
                        <p>最低投资金额：
                            <span>{{$fmoneyFormat(item.cpnProps)}}</span>元
                        </p>
                        <p>来源：{{item.cpnOrigin}}</p>
                    </div>
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
  import PageNav from '@/components/PageNav'

  export default {
    name: 'MyCoupon',
    data() {
      return {
        pageTitle: '我的优惠券',
        couponIns: false,
        couponTab: 0,
        pageAt : 1,
        pageSize : 10,
        pageStart : 0,
        pageEnd : 0,
        status: 1,
        coupons: [],
      }
    },
    created(){
      var self = this;
      self.$store.commit('setPageTitle', self.pageTitle);

      self.getCoupon(0);
    },
    components : {
      'v-scroll' : Scroll,
      'Instructions' : Instructions,
      'PageNav': PageNav,
    },
    methods:{
      openIns(){
        var self = this;
        self.couponIns = true;
      },
      closeIns(){
        var self = this;
        self.couponIns = false
      },
      // get优惠券列表
      getCoupon(ind){
        var self = this;
        self.couponTab = ind;
        self.$http.post('/pbap-web/action/customer/query/myCoupon', {
          pageIndex: 1,
          pageSize: self.pageSize,
          status: self.couponTab,
        }).then((res) => {
          self.coupons = [];
          self.pageAt = 1;
          let couponInfo = res.body.respInfo.couponInfo;
          self.coupons = couponInfo.dataList;

          if(couponInfo.totalCount == 0){
            this.$refs.noBox.style.display = "block";
            this.$el.querySelector('.yo-scroll').style.display = 'none';
          }
          else {
            this.$refs.noBox.style.display = "none";
            this.$el.querySelector('.yo-scroll').style.display = 'block';
            self.pageAt++;
            self.$refs.hasBox.refreshScroll();
            this.$el.querySelector('.load-more').innerHTML = '加载中……';
            if(couponInfo.pageIndex == couponInfo.totalPage){
              this.$el.querySelector('.load-more').innerHTML = '没有更多数据了';
            }
          }

        }, (res) => {
          console.log('error' + res);
        });
      },
      onRefresh(done) {
        this.getCoupon(this.couponTab);
        done()
      },
      // 上拉加载
      onInfinite(done) {
        let self = this;
        self.$http.post('/pbap-web/action/customer/query/myCoupon',{
          pageIndex: self.pageAt,
          pageSize: self.pageSize,
          status: self.couponTab,
        }).then((res) => {
          self.pageAt++;
          self.pageEnd = self.pageSize * self.pageAt;
          self.pageStart = self.pageEnd - self.pageSize;
          let couponInfo = res.body.respInfo.couponInfo;
          let arr = couponInfo.dataList;
          self.coupons = self.coupons.concat(arr);

          if(couponInfo.pageIndex == couponInfo.totalPage){
            this.$el.querySelector('.load-more').innerHTML = '没有更多数据了';
          }
          done() // call done
        }, (response) => {
          console.log('error');
        });
      },

    }
  }
</script>
