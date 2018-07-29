<template>
  <div class="add-bank-card myBankcard-content">
    <div class="bank-item" v-if="bankCardList.length == 0" @click="toAddBank">
      <img src="/static/img/add.png" alt="">
    </div>
    <div v-if="bankCardList.length > 0">
      <div class="my-card clearfix" v-for="(item,index) in bankCardList" :key="index" v-if="index == 0">
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
          <img v-if="item.bankCode=='1021'" src="../assets/images/bank-icon/1021.png" class="img-bg">        </div>
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
  import vOpenFloat from './vOpenFloat.vue'
  export default {
    name: "AddBankCard",
    components: {
      'vOpenFloat': vOpenFloat,
    },
    data() {
      return {
        custInfo: {},
        bankCardList: [],
        isOpen: false,
        vOpenAcc: '',
        floatModal: false,
      }
    },
    created() {
      var self = this;
      self.$http.get('/pbap-web/action/bankcard/query/bankcardList').then((res) => {
        self.bankCardList = res.body.respInfo.bankCardList || [];
      })
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
      },
      toAddBank() {
        this.$router.push({path:'/addBankCards'});
      },
    }
  }
</script>
