<template>
    <div class="wrap rechargeSuccess-content">
        <div class="pos">
            <img src="../assets/images/giraffe_fail.png" class="fzz">
            <p>儲值失敗啦！
                <span v-if="errorInfo">{{errorInfo}}</span>
            </p>
        </div>
        <!--<div class="consultation-bottom" style="bottom:1.6rem !important;">
            <div class="canHelp">遇到问题？您可以：<br>
                1、请拨打客服电话<a href="javascript:phone('400-600-9976')">400-600-9976</a><br>
                2、关注微信公众号<a href="javascript:void(0);">“上海聚寶盆”</a>留言提问
            </div>
        </div>-->
        <div class="result-bottom">
            <button @click="goRecharge()" class="mui-btn base-btn mui-btn-block">重新儲值</button>
        </div>

    </div>
</template>

<script>
  export default {
    name: 'RechargeFail',
    data() {
      return {
        errorInfo: '',
      }
    },
    created() {
      let self = this;
      self.errorInfo = decodeURIComponent(decodeURIComponent(self.thisGetCookie("errorInfo")));
    },
    methods: {
      goRecharge() {
        var data = {
          'className' : '儲值失敗',
          'comFrom' : 'web'
        };
        try {
          window.WebViewJavascriptBridge.send(data);
        } catch (e) {

        }
        let bu = window.parent.location.search;
        bu = bu.substring(4);
        if(bu){
          window.parent.location.href = "/recharge?bu=" + decodeURIComponent(bu)
        } else {
          window.parent.location.href = "/recharge"
        }
      }

    },
  }
</script>
