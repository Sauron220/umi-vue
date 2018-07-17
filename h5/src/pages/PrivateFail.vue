<template>
    <div class="wrap privateSuccess-content">
        <div class="pos">
            <img src="../assets/images/giraffe_fail.png" class="fzz">
            <p id="errorInfo">抱歉，购买失败啦！
                <span v-if="errorCode == '10000071' ||
                              errorCode == '10000087' ||
                              errorCode == '10000088'">{{errorText[0]}}<br>
                    <span>{{errorText[1]}}</span>
                </span>
                <span v-else>{{errorInfo}}</span>
            </p>
        </div>

        <div class="fail-alert">遇到问题？您可以：<br>
            1、拨打客服电话 <a href="tel:400-600-9976" class="telto">400-600-9976</a><br>
            2、关注微信公众号 <i>“上海聚寶盆”</i> 留言提问
        </div>

        <div class="result-bottom clearfix">
            <a v-show="goBackBtn == true" @click="goBack()" class="mui-btn base-btn mui-btn-block backUrl">重新购买</a>
            <a v-show="goOtherBtn == true" @click="goOther()" class="mui-btn base-btn mui-btn-block backUrl">浏览其它产品</a>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'PrivateFail',
    data() {
      return {
        prdCode: this.$route.query.prdCode,
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
          'className' : '购买失败',
          'comFrom' : 'web'
        };
        try {
          window.WebViewJavascriptBridge.send(data);
        } catch (e) {

        }
        window.parent.location.href = "/private/" + this.prdCode;
      },
      goOther() {
        var data = {
          'className' : '重新购买',
          'comFrom' : 'web'
        };
        try {
          window.WebViewJavascriptBridge.send(data);
        } catch (e) {

        }
        window.parent.location.href = "/product-list/40/1";
      }

    },
  }
</script>
