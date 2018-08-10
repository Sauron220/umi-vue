<template>
  <div id="PersonalCenter" class="myBankcard-content profile clearfix" v-TDK="TDK">
    <div class="container">
      <!--<ol class="breadcrumb">
        <span>您現在的位置：</span>
        <li>
          &lt;!&ndash;<router-link to="/accountOverview">我的帳戶</router-link>&ndash;&gt;
          <router-link to="/accountNew">我的帳戶</router-link>
        </li>
        <li class="active">我的銀行資料</li>
      </ol>-->
      <!--<leftMenu></leftMenu>-->
      <div class="pull-left right_content">
        <ul class="top-title-line list-inline">
          <li class="top-line1 top-orange">
            <span class="active">我的銀行資料</span>
          </li>
        </ul>

        <div v-if="bankCardList.length>0">
          <div class="my-card clearfix" v-for="(item,index) in bankCardList" v-if="index == 0">
            <div class="my-cardImg">
              <img v-if="item.bankCode=='1001'" src="../assets/images/bank-icon/1001.png" class="img-bg">
              <img v-if="item.bankCode=='1002'" src="../assets/images/bank-icon/1002.png" class="img-bg">
              <img v-if="item.bankCode=='1003'" src="../assets/images/bank-icon/1003.png" class="img-bg">
              <img v-if="item.bankCode=='1004'" src="../assets/images/bank-icon/1004.png" class="img-bg">
              <img v-if="item.bankCode=='1005'" src="../assets/images/bank-icon/1005.png" class="img-bg">
              <img v-if="item.bankCode=='1006'" src="../assets/images/bank-icon/1006.png" class="img-bg">
              <img v-if="item.bankCode=='1007'" src="../assets/images/bank-icon/1007.png" class="img-bg">
              <img v-if="item.bankCode=='1008'" src="../assets/images/bank-icon/1008.png" class="img-bg">
              <img v-if="item.bankCode=='1009'" src="../assets/images/bank-icon/1009.png" class="img-bg">
              <img v-if="item.bankCode=='1010'" src="../assets/images/bank-icon/1010.png" class="img-bg">
              <img v-if="item.bankCode=='1011'" src="../assets/images/bank-icon/1011.png" class="img-bg">
              <img v-if="item.bankCode=='1012'" src="../assets/images/bank-icon/1012.png" class="img-bg">
              <img v-if="item.bankCode=='1013'" src="../assets/images/bank-icon/1013.png" class="img-bg">
              <img v-if="item.bankCode=='1014'" src="../assets/images/bank-icon/1014.png" class="img-bg">
              <img v-if="item.bankCode=='1015'" src="../assets/images/bank-icon/1015.png" class="img-bg">
              <img v-if="item.bankCode=='1017'" src="../assets/images/bank-icon/1017.png" class="img-bg">
              <img v-if="item.bankCode=='1019'" src="../assets/images/bank-icon/1019.png" class="img-bg">
              <img v-if="item.bankCode=='1021'" src="../assets/images/bank-icon/1021.png" class="img-bg">
            </div>
            <div>
              <h1 id="bankName">{{item.bankName}}</h1>
              <span>儲蓄卡</span>
            </div>
            <div class="clearfix"></div>
            <p class="xi-num">
              <span class="xi-s">****&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;****&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;****&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
              <span>{{item.lastCardNum}}</span>
            </p>
          </div>
          <a class="change_bank" @click="floatModal = true;" style="cursor: pointer">删除銀行資料 >></a>
         <!-- <div class="tip">
            <h1>溫馨提示：</h1>
            <div>
              <span>*提領銀行資料與快速支付銀行資料為同壹張銀行資料</span>
            </div>
          </div>-->
        </div>
        <!--<div class="not-card" v-if="bankCardList.length==0">您暫未綁定銀行資料，請在匯款時進行綁卡！</div>-->

      </div>
    </div>


    <div class="v-modal modal-warning" v-if="floatModal">
      <div class="modal-backdrop fade in" style="z-index: 1060;"></div>
      <div class="popup">
        <div class="content">是否删除银行卡</div>
        <div class="handle-btn modal-confirm">
          <a class="item" href="javascript:void (0);"
             @click="closeModal()">
            取消
          </a>
          <a class="item light" href="javascript:void (0);"
             @click="deleteCard()">
            刪除
          </a>
        </div>
      </div>
    </div>

    <vOpenFloat v-if="isOpen" :vOpenAccBl="vOpenAcc"></vOpenFloat>
  </div>
</template>
<script>
  import PersonalCenterMenu from '../components/PersonalCenterMenu'
  import vOpenFloat from '../components/vOpenFloat.vue'

  export default {
    name: 'MyBankcard',
    data() {
      return {
        msg: 'Welcome to Your Vue.js App',
        custInfo: {},
        bankCardList: [],
        isOpen: false,
        vOpenAcc: '',
        floatModal: false,
        TDK: {
          title: '我的銀行資料-聚寶盆',
          keyWords: '網絡理財，互聯網理財，理財，投資，投資理財，個人投資，網貸平臺，網貸投資，網貸，互金，互聯網金融，互金平臺，互聯網金融平臺，聚寶盆，聚寶計劃，分期投，月月盈，年年余，財富，P2P',
          description: '聚寶盆是壹家綜合性互聯網金融平臺，聚寶盆為廣大個人投資理財的用戶提供多元化的選擇與優質的服務。投資理財用戶可通過加入聚寶計劃、分期投、月月盈、年年余等產品進行投資獲得穩定收益。',
        }
      }
    },
    created() {
      var self = this;
      self.$http.get('/pbap-web/action/bankcard/query/bankcardList').then((res) => {
        self.bankCardList = res.body.respInfo.bankCardList || [];
    })
    },
    components: {
      'leftMenu': PersonalCenterMenu,
      'vOpenFloat': vOpenFloat,
    },
    mounted() {

    },
    methods: {
      closeModal() {
        this.floatModal = false;
      },
      deleteCard() {
        var self = this;
        self.floatModal = true;
        self.$http.post('/pbap-web/action/bankcard/delete').then((res) => {
          location.href = '/changeBankCard';
      })
        ;
      },
    }

  }
</script>

