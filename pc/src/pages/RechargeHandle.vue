<template>
  <div>處理中...</div>
</template>
<script>
  export default {
    name: 'RechargeHandle',
    data() {
      return {
        postData: {}
      }
    },
    created() {
      var self = this;
      var payType = this.$route.query.payType;
      if (payType == '1') {
        self.postData = {
          trdAmount: this.$route.query.trdAmount,
          payType: 1,
//          validateCode: this.$route.query.smsCode
        }
      }else{
        self.postData={
          trdAmount: this.$route.query.trdAmount,
          payType:0,
          trdBank:this.$route.query.selectCode
        }
      }
      /* self.postData = {
         trdAmount: this.$route.query.trdAmount,
         remark:''
       }*/
      self.$http.post('/pbap-web/action/trade/add/recharge', self.postData).then((res) => {
        self.formInfo = res.body.respInfo;
        if (self.formInfo.form) {
          document.write(self.formInfo.form);
        }
      }, (res) => {
        this.$store.commit('setModal', {
          type: 'alert',
          msg: '請求失敗，請稍後重試！',
        })
        this.$store.commit('showModal')
      });
    },
    methods: {}
  }
</script>

