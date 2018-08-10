<template>
    <div class="wrap profile">
        <div class="top-info">
            <div class="info-user">
                <div class="div pull-left">
                    <span class="pull-left">{{ personalInfo.cusMobile }}</span>
                    <a href="/helpCenter" class="enjoy-user" :class="{'enjoy-user-high':personalInfo.isVip == 1}"></a>
                </div>
                <router-link to="/accountOverview" class="pull-right">账户总览</router-link>
            </div>
            <div class="assets text-center">
                <div>资产总额(元)</div>
                <span id="myAssets">{{ personalInfo.totalProperties }}</span>
            </div>
            <div class="mui-row text-center account-info">
                <div class="mui-col-xs-6">
                    <div>可用金额</div>
                    <span>{{ personalInfo.totalBalance }}元</span>
                </div>
                <div class="mui-col-xs-6" id="alert" @click="alertInfo()">
                    <div>累计收益</div>
                    <span>{{ personalInfo.totalBenifit }}元</span>
                </div>
            </div>
        </div>
        <div class="mui-row text-center tool-bar">
            <div class="mui-col-xs-6">
                <a @click="isOpenAccount('withdraw')" class="btn1">提现</a>
            </div>
            <div class="mui-col-xs-6">
                <a @click="isOpenAccount('recharge')" class="btn2">匯款</a>
            </div>
        </div>
        <ul class="profile-bar mui-table-view mui-grid-view mui-grid-9">
            <li class="mui-table-view-cell mui-media mui-col-xs-4">
                <router-link to="/myAssets">
                    <span class="mui-icon icon-myAsset"></span>
                    <div class="mui-media-body">我的资产</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4">
                <router-link to="/transactionRecord">
                    <span class="mui-icon icon-transactionRecord"></span>
                    <div class="mui-media-body">交易记录</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4">
                <router-link to="/set">
                    <span class="mui-icon icon-set"></span>
                    <div class="mui-media-body">账户安全</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4">
                <router-link to="/myRecommend">
                    <span class="mui-icon icon-myRecommend"></span>
                    <div class="mui-media-body">我的推荐</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4">
                <a @click="isOpenAccount('myBankcard')">
                    <span class="mui-icon icon-bankCard"></span>
                    <div class="mui-media-body">我的银行卡</div>
                </a>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4">
                <router-link to="/myCoupon">
                    <span class="mui-icon icon-myCoupon"></span>
                    <div class="mui-media-body">我的优惠券</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4">
                <router-link to="/profileExperience">
                    <span class="mui-icon icon-experience"></span>
                    <div class="mui-media-body">体验金</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4">
                <router-link to="/calc">
                    <span class="mui-icon icon-calc"></span>
                    <div class="mui-media-body">收益计算器</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4">
                <router-link to="/notice-list">
                <span class="mui-icon icon-notice"></span>
                    <div class="mui-media-body">平台公告</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4">
                <router-link to="/contact-service">
                    <span class="mui-icon icon-contactService"></span>
                    <div class="mui-media-body">联系客服</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4">
                <router-link to="/helpCenter">
                <span class="mui-icon icon-helpCenter"></span>
                    <div class="mui-media-body">帮助中心</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4">
                <router-link to="/about">
                    <span class="mui-icon icon-aboutZkp"></span>
                    <div class="mui-media-body">关于聚寶盆</div>
                </router-link>
            </li>
            <!--<li class="mui-table-view-cell mui-media mui-col-xs-4">
                <a href="#">
                    <span class="mui-icon" style="line-height: 1">…</span>
                    <div class="mui-media-body">&nbsp;</div>
                </a>
            </li>-->
        </ul>
        <br>
        <br>
        <br>
        <div class="pageFooter mui-bar mui-bar-tab">
            <div class="nav">
                <router-link class="nav-item" to="/">
                    <i class="mui-icon icon-homepage"></i>首页
                </router-link>
                <router-link class="nav-item" :to="{ name: 'ProductList', params: { prdType: $route.params.prdType,pageAt:1 }}"
                             v-if="$route.params.prdType" >
                    <i class="mui-icon icon-invest"></i>理财
                </router-link>
                <router-link class="nav-item" to="/product-list/0/1" v-else>
                    <i class="mui-icon icon-invest"></i>理财
                </router-link>
                <a class="nav-item" :href="discoverUrl">
                    <i class="mui-icon icon-discover"></i>发现
                </a>
                <router-link class="nav-item" style="color: #FFBF00" to="/profile">
                    <i class="mui-icon icon-profile-active"></i>我的
                </router-link>
            </div>
        </div>
        <div class="mask0" v-if="isOpen"></div>
        <vOpenFloat v-if="isOpen" :vOpenAccBl="vOpenAcc"></vOpenFloat>
    </div>
</template>
<script>
  import vOpenFloat from '@/components/vOpenFloat'
  import Tool from '../util/ProductTool.js'

  export default {
    name: 'Profile',
    data() {
      return {
        personalInfo: {},
        custInfo: {},
        isOpen: false,
        vOpenAcc: '',
        discoverUrl: '',
        isGoUrl: null
      }
    },
    created() {
      var self = this
      // get用户基本資訊
      self.$http.get('/pbap-web/action/customer/query/personalInfo').then((res) => {
        self.personalInfo = res.body.respInfo.personalInfoView;
        self.personalInfo.totalProperties = self.$fmoney(self.personalInfo.totalProperties);   //总金额
        self.personalInfo.totalBalance = self.$fmoney(self.personalInfo.totalBalance);   //可用金额
        self.personalInfo.totalBenifit = self.$fmoney(self.personalInfo.totalBenifit);   //累计收益
      });

      self.$http.post('/pbap-web/action/resource/query/domainUrlList?header', {}).then((res) => {
        let mevsUrl = res.body.respInfo.mevs;
        if (mevsUrl) {
          self.discoverUrl = mevsUrl + "h5/discover.html"
        }
      });

      self.isOpenAccount();

    },
    components : {
      'vOpenFloat': vOpenFloat
    },
    methods: {
      isOpenAccount: Tool.isOpenAccount,
      alertInfo() {
        this.$store.commit('setModal', {
          type: 'alert',
          msg: '只有当您购买的产品還款后才会计入累计收益',
        });
        this.$store.commit('showModal');
      },
    }
  }
</script>
