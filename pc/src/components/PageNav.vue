<template>
  <div>
    <div class="top-bar">
      <div class="container">
        <ul class="list-inline pull-left top-links">
          <li>
            <a href="/aboutUs" target="_blank">
              <img src="/static/img/index-phone.png" style="position: relative;left: -2px;top: -2px;">客服電話：021-8780-6767
              <!--<i class="icon-num-phone icon-location"></i>客服電話：021-8780-6767-->
            </a>
          </li>

          <!--<li>
            <a href="/aboutUs" target="_blank">
              <i class="icon-info icon-location"></i>關於聚寶盆
            </a>
          </li>
          <li>
            <a href="/helpCenter" target="_blank">
              <i class="icon-help icon-location"></i>幫助中心
            </a>
          </li>-->
         <!-- <li>
            <a href="/securityGuarantee" target="_blank">
              <i class="icon-protect icon-location"></i>安全保障
            </a>
          </li>
          <li>
            <a href="/infoDisclosure" target="_blank">
              <i class="icon-publish icon-location"></i>資訊披露
            </a>
          </li>-->
        </ul>
        <ul class="pull-right list-inline top-links">
          <li>
            <a href="/aboutUs" target="_blank">
              <!--<i class="icon-info icon-location"></i>-->關於聚寶盆
            </a>
          </li>
          <li>
            <a href="/helpCenter" target="_blank">
              <!--<i class="icon-help icon-location"></i>-->幫助中心
            </a>
          </li>
          <li v-if="userInfo.loginResult">
            <a href="javascript:;" @click="logOut">[安全退出]</a>
          </li>
          <!--<li v-if="!userInfo.loginResult">
            <a class="resister-link" href="/register">立即註冊</a>
          </li>
          <li v-if="!userInfo.loginResult">
            <a :href="loginUrl">立即登錄</a>
          </li>
          <li v-if="userInfo.loginResult">
            <span class="text-warning">{{userInfo.usrName}}</span>
          </li>-->
        </ul>
      </div>
    </div>
    <div class="header-nav">
      <div class="container">
        <div class="clearfix"></div>
        <div class="pull-left" style="overflow: hidden">
          <a class="logo pull-left" href="/">
            <img class="img-responsive" src="../assets/images/logo.png">
          </a>
          <!--<<a :href="mevsUrl+'anniversary.html'" class="logo-tip" target="_blank">-->
              <!--<img src="../assets/images/logo-tip.png" class="logo-tip.png">-->
          <!--</a>-->
        </div>
        <ul class="list-inline pull-right page-nav">
          <li>
            <a href="/" :class="{'active':$route.fullPath == '/'}">首頁</a>
          </li>
         <!-- <li>
            <a href="/product-list" :class="{'active':$route.fullPath == '/product-list'}">定期理財</a>
          </li>-->
          <li>
            <!--<a href="/product-list/30/11/1" :class="{'active':$route.fullPath == '/product-list/30/11/1'}">壹桶金</a>-->
            <a href="/bucketGold" :class="{'active':$route.fullPath == '/bucketGold'}">壹桶金</a>
          </li>
          <li>
            <!--<a href="/product-list/7/11/1" :class="{'active':$route.fullPath == '/product-list/7/11/1'}">聚寶計劃</a>-->
            <a href="/jubaoPlan" :class="{'active':$route.fullPath == '/jubaoPlan'}">聚寶計劃</a>
          </li>
          <li>
            <a href="/product-list/8/11/1" :class="{'active':$route.fullPath == '/product-list/8/11/1'}">分期投</a>
          </li>
          <li>
            <a href="/product-list/9/11/1" :class="{'active':$route.fullPath == '/product-list/9/11/1'}">月月盈</a>
          </li>
          <li>
            <a href="/product-list/10/11/1" :class="{'active':$route.fullPath == '/product-list/10/11/1'}">債權/散標</a>
          </li>
          <li>
            <a href="/borrowing" :class="{'active':$route.fullPath == '/borrowing'}">我要借款/還款</a>
          </li>
         <!-- <li class="relative product-link">
            <router-link to="/product-list">定期理財<i class="icon icon-angle-down"></i></router-link>
            <ul class="list-unstyled product-link-dropdown">
              <li><a href="/product-list">定期理財<i class="icon icon-angle-down"></i></a></li>
              <li><a href="/product-list/30/11/1">壹桶金</a></li>
              <li><a href="/product-list/7/11/1">聚寶計劃</a></li>
              <li><a href="/product-list/8/11/1">分期投</a></li>
              <li><a href="/product-list/9/11/1">月月盈</a></li>
              &lt;!&ndash;<li><a href="/product-list/10/11/1">年年余</a></li>&ndash;&gt;
            </ul>
          </li>-->
          <!--
            <li>
                <a href="/parent-child/plan-content" :class="{'active':$route.fullPath.indexOf('parent-child') > -1}">親子計劃</a>
            </li>
            <li class="relative">
                <router-link :to="{ name: 'Private', params: { prdCode:lastVipPrd}}" target="_blank">尊享計劃<span
                        class="special-crown"></span></router-link>
            </li>-->
          <li v-if="userInfo.loginResult">
            <img src="/static/img/tou.png" alt="" style="width: 40px;">
            <router-link
              to="/accountNew"
              :class="{'active':/(\/myAssets\/)|(\/transactionRecord\/)|(\/set)|(\/myBankcard)|(\/myCoupon)|(\/ProfileExperience)|(\/myRecommend)|(\/transactionDetails)|(\/changePwd)|(\/recharge)|(\/withdraw)/g.test($route.fullPath)}"
            >我的賬戶
            </router-link>
          </li>
          <li v-if="!userInfo.loginResult">
            <a  class="nav-color resister-link" href="/register">註冊/</a>
            <a  class="nav-color login-page" :href="loginUrl">登錄</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>

  // import jQuery from 'jquery'

  export default {
    name: 'PageNav',
    data() {
      return {
        prdId: parseInt(Math.random()),
        userInfo: {},
        accountInfo: {},
        lastVipPrd: '0',
        mevsUrl: '',
        loginUrl: '',
      }
    },
    created: function () {
      var self = this;
      self.loginUrl = '/login?remark=' + location.pathname;  // 設置帶有跳轉資訊的登錄url
      self.$http.post('/pbap-web/action/user/query/whetherLogin', {}).then((res) => {
        self.userInfo = res.body.respInfo;
        self.$store.commit('setUserInfo', self.userInfo);
        if (self.userInfo.loginResult) {
          self.$http.post('/pbap-web/action/customer/query/personalAccount', {}).then((res) => {
            self.accountInfo = res.body.respInfo.personalAccView;
            self.$store.commit('setAccountInfo', self.accountInfo);
          })
        }
      });
      self.$http.post('/pbap-web/action/product/query/lastVipPrd', {prdType: '40'}).then((res) => {
        if (res.body.respInfo.product) {
          self.lastVipPrd = res.body.respInfo.product.prdCode;
          self.$store.commit('setLastVipPrd', self.lastVipPrd);
        }
      });
      self.$http.post('/pbap-web/action/resource/query/domainUrlList?header', {}).then((res) => {
        self.mevsUrl = res.body.respInfo.mevs;
        self.$store.commit('setMEVSUrl', self.mevsUrl);
      });

    },
    methods: {
      logOut() {
        var self = this;
        self.$http.post('/pbap-web/action/user/query/logout', {}).then((res) => {
          location.href = '/'
        })
      }
    }
  }
</script>
