<template>
    <div class="wrap myBankcard-content">
        <PageNav message="/profile"></PageNav>
        <div class="no-card" v-if="bankCardList.length==0">
            <img src="../assets/images/giraffe_fail.png" class="no-img">
            <div>您暂未绑定银行卡</br> 请在儲值时进行绑卡！</div>
        </div>
        <div v-if="bankCardList.length>0">
            <div class="mui-card my-card clearfix" v-for="(item,index) in bankCardList" v-if="index == 0">
                <div class="my-cardImg">
                    <img v-if="item.bankCode=='1001'" src="../assets/images/1001.png" class="img-bg">
                    <img v-if="item.bankCode=='1002'" src="../assets/images/1002.png" class="img-bg">
                    <img v-if="item.bankCode=='1003'" src="../assets/images/1003.png" class="img-bg">
                    <img v-if="item.bankCode=='1004'" src="../assets/images/1004.png" class="img-bg">
                    <img v-if="item.bankCode=='1005'" src="../assets/images/1005.png" class="img-bg">
                    <img v-if="item.bankCode=='1006'" src="../assets/images/1006.png" class="img-bg">
                    <img v-if="item.bankCode=='1007'" src="../assets/images/1007.png" class="img-bg">
                    <img v-if="item.bankCode=='1008'" src="../assets/images/1008.png" class="img-bg">
                    <img v-if="item.bankCode=='1009'" src="../assets/images/1009.png" class="img-bg">
                    <img v-if="item.bankCode=='1010'" src="../assets/images/1010.png" class="img-bg">
                    <img v-if="item.bankCode=='1011'" src="../assets/images/1011.png" class="img-bg">
                    <img v-if="item.bankCode=='1012'" src="../assets/images/1012.png" class="img-bg">
                    <img v-if="item.bankCode=='1013'" src="../assets/images/1013.png" class="img-bg">
                    <img v-if="item.bankCode=='1014'" src="../assets/images/1014.png" class="img-bg">
                    <img v-if="item.bankCode=='1015'" src="../assets/images/1015.png" class="img-bg">
                    <img v-if="item.bankCode=='1017'" src="../assets/images/1017.png" class="img-bg">
                    <img v-if="item.bankCode=='1019'" src="../assets/images/1019.png" class="img-bg">
                    <img v-if="item.bankCode=='1021'" src="../assets/images/1021.png" class="img-bg">

                </div>
                <div class="my-cardInfo">
                    <span id="bankName">{{item.bankName}}</span>
                    <span>储蓄卡</span>
                </div>
                <p id="idNum">尾号 {{item.lastCardNum}}</p>
            </div>
        </div>
        <a href="/changeBankCard" class="go-chargeCard">换绑银行卡>></a>
        <div class="consultation-bottom">
            <div class="canHelp">遇到问题？您可以：<br>
                1、请拨打客服电话<a href="javascript:phone('400-600-9976')">400-600-9976</a><br>
                2、关注微信公众号<a href="javascript:void(0);">“上海聚寶盆”</a>留言提问
            </div>
        </div>
    </div>
</template>

<script>
  import PageNav from '@/components/PageNav'
  export default {
    name: 'MyBankCard',
    data() {
      return {
        pageTitle: '我的银行卡',
        custInfo:{},
        bankCardList:[],
        isOpen: false,
        vOpenAcc: '',
      }
    },
    created () {
      var self = this;
      self.$store.commit('setPageTitle', self.pageTitle);

      self.$http.post('/pbap-web/action/customer/query/custAuthInfo').then((res)=>{
        self.custInfo = res.body.respInfo.custInfo || {};
        if (self.custInfo.tpStatus == 1) {
          if (self.custInfo.activateStatus != 1) {
            self.isOpen = true;
            self.vOpenAcc = false;
          }else{
            self.$http.get('/pbap-web/action/bankcard/query/bankcardList').then((res)=>{
              self.bankCardList = res.body.respInfo.bankCardList || [];
              console.log(self.bankCardList[0].bankCode)
            })
          }
        } else if (self.custInfo.tpStatus == 0) {
          self.isOpen = true;
          self.vOpenAcc = true;
        }
      })
    },
    components : {
      'PageNav': PageNav,
    },

  }
</script>
