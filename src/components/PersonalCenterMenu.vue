<template>
  <div class="left-Menu pull-left">
    <div class="user">
      <img src="../assets/images/face.png">
      <div class="phone-num" id="cusMobile">{{userInfo.usrName}}</div>
      <!--<a class="special-flag" :class="{'active':accountInfo.isVip == 1}" href="/helpCenter#16" target="_blank">-->
      <!--<i class="icon-crown icon-location"></i>尊享用戶-->
      <!--</a>-->
      <div class="center-nav" id="center-nav">
        <router-link to="/accountOverview">賬戶總覽</router-link>
        <router-link to="/myAssets">我的資產</router-link>
        <router-link to="/transactionRecord">交易記錄</router-link>
        <router-link to="/set">賬戶安全</router-link>
        <a @click="toMyBankCard" v-if="custInfo.tpStatus != 1" style="cursor: pointer;">我的銀行資料</a>
        <router-link :to="hasBankCard"  v-if="custInfo.tpStatus == 1">我的銀行資料</router-link>
        <router-link to="/myCoupon">我的優惠券</router-link>
        <!--<router-link to="/ProfileExperience">體驗金</router-link>-->
        <!--<router-link to="/parent-child/plan-content">親子計劃</router-link>-->
        <!--<router-link to="/myRecommend" style="margin: 0;">我要推薦</router-link>-->
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'PersonalCenterMenu',
    data() {
      return {
        msg: '個人中心左側導航欄',
        hasBankCard: 'javascript:void(0)',
        bankCardList: '',
        custInfo: {},
      }
    },
    mounted() {

    },
    created() {
      let self = this;
      self.$http.post('/pbap-web/action/customer/query/custAuthInfo', {}).then((res) => {
        self.custInfo = res.body.respInfo.custInfo;
        self.tpStatus = self.custInfo.tpStatus;
      });
      self.$http.get('/pbap-web/action/bankcard/query/bankcardList').then((res) => {
        self.bankCardList = res.body.respInfo.bankCardList || [];
        if (self.bankCardList.length == 0) {
          self.hasBankCard = '/changeBankCard';
        } else {
          self.hasBankCard = '/myBankcard';
        }
      })
    },
    methods: {
      toMyBankCard() {
        let self = this;
        if (self.custInfo.tpStatus != 1) {
          this.$store.commit('setModal', {
            type: 'confirm',
            msg: '為了您的資金安全，請先完成實名認證',
            confirmUrl: '/openAccount',
            confirmText: "立即實名"
          })
          this.$store.commit('showModal')
        } else {

        }

      },
    },
    computed: {
      userInfo() {
        return this.$store.state.userInfo
      },
      accountInfo() {
        return this.$store.state.accountInfo
      }
    },
  }
</script>


