<template>
  <div>
    加載中...
  </div>
</template>

<script>
  export default {
    name: 'Buy',
    data() {
      return {
        formInfo: null,
        postData: {}
      }
    },
    created() {
      var self = this;
      self.postData = {
        bonusAmount: 0,  //紅包金額
        prdCode: this.$route.query.prdCode,  // 產品prd
        relAmount: this.$route.query.relAmount,
        payPwd: this.$route.query.payPwd,
      }
      self.ifPostData('cpnNum', self.postData);  // 加息券
      self.ifPostData('vipCode', self.postData);  // 尊享碼
      self.ifPostData('buyCode', self.postData);  // 驗證碼

      self.$http.post('/pbap-web/action/investment/add/prdPurchase', self.postData).then((res) => {
       /* self.formInfo = res.body.respInfo;
        if (self.formInfo.payForm) {
          document.write(self.formInfo.payForm);
        }
        self.invData = res.body.respInfo.invList;*/
        if (res.body.errorInfo.errorCode == '0000') {
          location.href = '/purchaseSuccess?prdCode='+ self.$route.query.prdCode;
        } else{
          console.log(res.body)
           location.href = '/purchaseFail?prdCode='+ self.$route.query.prdCode+'&errorInfo='+res.body.errorInfo.errorMessage;
        }
      });
    },
    mounted() {

    },
    methods: {
      ifPostData(name, postData) {
        var data = this.$route.query[name]
        if (data && data != 'undefined') {
          postData[name] = data;
        }
      }
    }
  }
</script>
