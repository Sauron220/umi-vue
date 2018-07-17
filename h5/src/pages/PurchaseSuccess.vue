<template>
    <div class="wrap PurchargeSuccess-content">
        <div class="pos">
            <img src="../assets/images/giraffe_success.png" class="fzz">
            <p>恭喜您購買成功！</p>
        </div>
        <div class="result-bottom expResult-bottom clearfix" v-if="expResult == 'expResult'">
            <a href="/profileExperience?tab=2" class="mui-btn base-btn mui-btn-block">查看已投項目</a>
        </div>
        <div class="result-bottom clearfix" v-else>
            <a @click="goMyAssest()" class="mui-btn base-btn mui-btn-block left">查看已投項目</a>
            <a @click="goBack()" class="mui-btn base-btn mui-btn-block right">繼續投資</a>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'PurchargeSuccess',
    data() {
      return {
        prdType: this.$route.query.prdType,
        prdCode: this.$route.query.prdCode,
        expResult: this.$route.query.expResult,
        dataList: {}
      }
    },
    created(){
      //console.log(this.$route)
    },
    methods: {
      goMyAssest() {
        var data = {
          'className' : '查看已投項目',
          'comFrom' : 'web'
        };
        try{
          window.WebViewJavascriptBridge.send(data);
        }catch(e){

        }
        window.parent.location.href = "/myAssets"
      },
      goBack() {
        var data = {
          'className' : '繼續投資',
          'comFrom' : 'web'
        };
        try{
          window.WebViewJavascriptBridge.send(data);
        }catch(e){

        }

        let self = this;
        if(self.prdType == "50") {
          window.parent.location.href = "/parent-child-detail/" + self.prdCode;
        }
        else {
          window.parent.location.href = "/product/" + self.prdCode;
        }

      }
    },
  }
</script>
