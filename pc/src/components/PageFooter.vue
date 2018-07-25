<template>
  <div class="footer">
    <div class="container link-info">
      <div class="row" style="margin-left:0px">
        <div class="friend-link" style="padding-top:14px;">
          <div class="pull-left" style="color: #da7825;">友情連結：</div>
          <div id="pull-left">
            <!-- <a target="_blank">百度</a>
             <a target="_blank">百度</a>
             <a target="_blank">百度</a>
             <a target="_blank">百度</a>-->
            <a v-for="item in friendLink" :href="item.coopUrl" style="border:none;color: #b3b3b3;" target="_blank">{{item.coopName}}</a>
          </div>
        </div>
        <div class="link-info">
          <ul class="list-inline pull-left bottom-links">
            <li style="color:#da7825 ">
              客戶服務：
            </li>
            <li>
              <a href="/aboutUs" target="_blank" style="color: #b3b3b3;">關於聚寶盆</a>
            </li>
            <li>
              <a href="/helpCenter" target="_blank" style="color: #b3b3b3;">幫助中心</a>
            </li>
          </ul>
          <!--<div class="clearfix"></div>-->

        </div>
          <div class="clearfix"></div>
        <div style="border-top:1px solid #e6e6e6;padding-top:40px;">
          <div class="service" style="margin-left:0;">
            <h4>客服熱線</h4><span>02-8780-6767</span>
            <div class="service-time">服務時間:9:00-18:00節假日除外</div>

          </div>
        <div class="service">
          <h4>客服信箱</h4><span>service@fundbowl.tw</span>
        </div>


        <div class="service" style="margin-left:360px;">
          <h4>官方客服line</h4><a href="line://ti/p/@zda2293i"><img src="../assets/images/foot-line.png"  style="margin-top: 16px;"></a>
        </div>
        <div class="service">
          <h4>官方Facebook</h4><a href="https://www.facebook.com/fundbowl.tw/" target="_blank"><img src="../assets/images/foot-fas.png"  style="margin-top: 16px;"></a>
        </div>
        <div class="service">
          <h4>聚寶盆公眾號</h4><img src="../assets/images/wechat.png" style="margin-top: 16px;">
        </div>
        <div class="service" style="margin-left:0;">
          <h4>客服傳真</h4><span>02-2722-0283</span>
        </div>

          <div class="service" style="margin-left:136px;">
            <h4>辦公地址</h4><span>台北市信義區忠孝東路五段68號21樓</span>
            <div class="service-time">21F.,No.68,Sec.5,Zhongxiao E.Rd.,Xinyi Dist.,Taipei City 110,Taiwan(R.O.C)</div>

          </div>
        </div>
          <!--<div class="clearfix"></div>
         <div class="address" style="line-height: 34px;"><span style="color: #fff;">辦公地址</span><br>台北市信義區忠孝東路五段68號21樓A2<br>
         21F.,No.68,Sec.5,Zhongxiao E.Rd.,Xinyi Dist.,Taipei City 110,Taiwan(R.O.C)
         </div>-->

        <!--<div class="col-xs-5 qrcode">
          <div class="row text-center">
            <div class="col-xs-6">
              <div class="qrcode">
                <p><img src="../assets/images/wechat.png"></p>
                <p>微信公眾號</p>
              </div>
            </div>
            <div class="col-xs-6">
              <div class="qrcode">
                <p><img src="../assets/images/qq.png"></p>
                <p>QQ二維碼</p>
              </div>
            </div>
          </div>
        </div>-->
      </div>
    </div>
    <div class="container text-center" style="margin: 10px auto;">
      <p class="foot_ba">

      </p>
      <p class="foot_ba" style="border-top:1px solid #e6e6e6;margin-top:20px;padding-top:20px;">理財有風險，投資需謹慎</p>

    </div>

  </div>
</template>

<script>
  export default {
    name: 'PageFooter',
    data() {
      return {
        friendLink: [
          {
            coopName:'壹桶金',
            coopUrl:'/bucketGold'
          },
          {
            coopName:'聚寶計畫',
            coopUrl:'/jubaoPlan'
          },
          {
            coopName:'分期投',
            coopUrl:'/product-list/8/11/1'
          },
          {
            coopName:'月月盈',
            coopUrl:'/product-list/9/11/1'
          },
          {
            coopName:'債權/散標',
            coopUrl:'/product-list/10/11/1'
          },
          {
            coopName:'我要借款/還款',
            coopUrl:'/borrowing'
          },
        ]
      }
    },
    created() {
      var self = this;
      // 友情連結
      self.$http.post('/pbap-web/action/cooperators/query/cooperators/2', {}).then((res) => {
        // self.friendLink = res.body.respInfo.coopList;
      })
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
