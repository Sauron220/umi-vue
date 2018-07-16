<template>
  <div>處理中...</div>
</template>
<script>
  export default {
    name: 'WithdrawHandle',
    data () {
      return {
        postData: {}
      }
    },
    created () {
      var self = this;
      self.postData = {
        trdAmount: this.$route.query.trdAmount,
        remark:''
      }
      self.$http.post('/pbap-web/action/trade/add/withdraw', self.postData).then((res) => {
        self.formInfo = res.body.respInfo;
        if (self.formInfo.form) {
          document.write(self.formInfo.form);
        }
      },(res)=>{
        this.$store.commit('setModal',{
          type:'alert',
          msg:'請求失敗，請稍後重試！',
        })
        this.$store.commit('showModal')
      });
    },
    methods: {
    }
  }
</script>
<style>
</style>

