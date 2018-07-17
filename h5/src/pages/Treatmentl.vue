<template>
    <div class="wrap rechargeSuccess-content">
        <div class="pos">
            <img src="../assets/images/giraffe_fail.png" class="fzz">
            <p>儲值出问题了!</p>
            <div class="treatment_text">
                银行反馈如下：<font id="errorInfo"></font><br>
                <span v-if="errorInfo">{{errorInfo}}</span>
                <span v-else>请您稍后再看看</span>
            </div>
        </div>
        <div class="consultation-bottom" style="bottom:1.6rem !important;">
        <div class="canHelp">遇到问题？您可以：<br>
            1、请拨打客服电话<a href="javascript:phone('400-600-9976')">400-600-9976</a><br>
            2、关注微信公众号<a href="javascript:void(0);">“上海聚寶盆”</a>留言提问
        </div>
        </div>
        <div class="result-bottom">
            <a @click="goRecord()" class="mui-btn base-btn mui-btn-block">查看儲值结果</a>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'Treatmentl',
    data() {
      return {
        errorInfo: '',
        tradeCode: '',
      }
    },
    created() {
      let self = this;
      self.errorInfo = decodeURIComponent(decodeURIComponent(self.thisGetCookie("errorInfo")));
      self.tradeCode = self.thisGetCookie("tradeCode");
    },
    methods: {
      goRecord() {
        var data = {
          'className' : '查看儲值结果',
          'comFrom' : 'web'
        };
        try {
          window.WebViewJavascriptBridge.send(data);
        } catch (e) {

        }
        window.parent.location.href = "/transactionDetails/" + this.tradeCode + "/CO/"
      }

    },
  }
</script>
