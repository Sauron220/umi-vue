<template>
    <div class="wrap PurchargeSuccess-content">
        <div class="pos">
            <img src="../assets/images/giraffe_fail.png" class="fzz">
            <p id="errorInfo">抱歉，購買失敗啦！
                <span v-if="errorCode == '10000071' ||
                              errorCode == '10000087' ||
                              errorCode == '10000088'">{{errorText[0]}}<br>
                    <span>{{errorText[1]}}</span>
                </span>
                <span v-else>{{errorInfo}}</span>
            </p>
        </div>

        <div class="result-bottom clearfix">
            <a v-show="goBackBtn == true" @click="goBack()" style="width: 100%" class="mui-btn base-btn mui-btn-block">重新購買</a>
            <a v-show="goOtherBtn == true" @click="goOther()" style="width: 100%" class="mui-btn base-btn mui-btn-block">瀏覽其他產品</a>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'PurchargeFail',
    data() {
      return {
        prdCode: this.$route.query.prdCode,
        prdType: this.$route.query.prdType,
        errorInfo: '',
        errorCode: '',
        errorText: {},
        goBackBtn: false,
        goOtherBtn: false,
      }
    },
    created(){
      let self = this;
      self.errorInfo = decodeURIComponent(decodeURIComponent(self.thisGetCookie("errorInfo")));
      self.errorCode = self.thisGetCookie("errorCode");
      self.errorText = self.errorInfo.split("，");
      self.buyFail();
      //console.log(this.$route)
    },
    methods: {
      buyFail(){
        let self = this;
        if(self.errorCode == "10000049"){
          self.goBackBtn = true;
        } else {
          self.goOtherBtn = true;
        }
      },
      goBack() {
        var data = {
          'className' : '購買失敗',
          'comFrom' : 'web'
        };
        try {
          window.WebViewJavascriptBridge.send(data);
        } catch (e) {

        }

        if(this.prdType == "50") {
          window.parent.location.href = "/parent-child-detail/" + this.prdCode;
        }
        else {
          window.parent.location.href = "/product/" + this.prdCode;
        }

      },
      goOther() {
        var data = {
          'className' : '重新購買',
          'comFrom' : 'web'
        };
        try {
          window.WebViewJavascriptBridge.send(data);
        } catch (e) {

        }
        if(this.prdType == "50"){
          window.parent.location.href = "/product-list/0/1";
        }
        else {
          window.parent.location.href = "/product-list/"+ this.prdType +"/1";
        }
      }

    },
  }
</script>
