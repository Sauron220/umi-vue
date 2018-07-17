<template>
    <div class="wrap rechargeSuccess-content">
        <div class="pos">
            <img src="../assets/images/giraffe_success.png" class="fzz">
            <p>恭喜您提領申請成功！</p>
            <font>實際到賬時間以銀行到賬時間為準</font>
        </div>
        <!--<div class="consultation-bottom">
            <div class="canHelp">遇到问题？您可以：<br>
                1、请拨打客服电话<a href="javascript:phone('400-600-9976')">400-600-9976</a><br>
                2、关注微信公众号<a href="javascript:void(0);">“上海聚寶盆”</a>留言提问
            </div>
        </div>-->
      <div class="result-bottom">
        <a @click="goWithdraw()" class="mui-btn base-btn mui-btn-block">返回個人中心</a>
      </div>
    </div>
</template>

<script>
  let wait = 3;
  export default {
    name: 'WithdrawalsSuccess',
    data() {
      return {
      }
    },
    created() {
      // this.timeOut();
    },
    methods: {
      goWithdraw() {
        var data = {
          'className' : '返回個人中心',
          'comFrom' : 'web'
        };
        try {
          window.WebViewJavascriptBridge.send(data);
        } catch (e) {

        }
          window.parent.location.href = "/profile"
      }
     /* timeOut() {
        var countDownTime = setInterval(function () {
          if(wait > 0){
            wait--;

          } else {
            clearInterval(countDownTime);
            var data = {
              'className' : 'TestViewController',
              'comFrom' : 'web'
            };
            try {
              window.WebViewJavascriptBridge.send(data);
            } catch (e) {}

            let bu = window.parent.location.search;
            bu = bu.substring(4);
            console.log('bu',bu)
            if(bu) {
              window.parent.location.href = "/" + decodeURIComponent(bu)
            } else {
              window.parent.location.href = "/withdraw"
            }
          }
        }, 1000)
      },*/

    },
  }
</script>
