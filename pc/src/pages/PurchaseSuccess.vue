<template>
  <div class="results-page result-bg" v-TDK="TDK">
    <div class="row width-2x">
      <div class="col-md-3 col-xs-3">
        <img  src="../assets/images/luck.png" style="max-width: 110px;">
      </div>
      <div class="col-md-9 col-xs-3">
        <h1>恭喜您購買成功！</h1>
        <a :href="productUrl($route.query.prdType)+$route.query.prdCode" type="button" class="btn btn-warning btn-recharge">繼續投資</a>
        <a href="/myAssets/" type="button" class="btn btn-warning btn-withdrawals">查看已投項目</a>
      </div>
    </div>
   <div class="bottom-info">
      <!--遇到問題？請撥打客服電話<span>400-600-9976</span>或關註微信公眾號<span>“上海聚寶盆”</span>留言提問-->
    </div>
  </div>
</template>

<script>
  export default {
    name: 'PurchaseSuccess',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App',
        TDK:{
          title:'購買成功',
        }
      }
    },
    created () {
      console.log('fdfd',this.$route,this.$route.query.prdType,this.$route.query.prdCode,)
      console.log(this.productUrl(this.$route.query.prdType)+this.$route.query.prdCode)
    },
    mounted () {
      var he = $(window).height();
      $("body").height(he);

    },
    methods: {

    }
  }
</script>
