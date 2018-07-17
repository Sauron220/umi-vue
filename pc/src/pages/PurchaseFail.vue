<template>
  <div class="results-page result-bg" v-TDK="TDK">
    <div class="row width-2x">
      <div class="col-md-3 col-xs-3">
        <img  src="../assets/images/500.png"  style="max-width: 110px;">
      </div>
      <div class="col-md-9 col-xs-3">
        <h1>抱歉，購買失敗啦！</h1>
        <p id="errorInfo" v-if="$route.query.errorInfo" style="color: #ff0000;">{{$route.query.errorInfo}}</p>
        <a :href="productUrl($route.query.prdType)+$route.query.prdCode" type="button" class="btn btn-warning btn-recharge">重新購買</a>
        <a href="/product-list" type="button" class="btn btn-warning btn-withdrawals">瀏覽其它產品</a>
      </div>
    </div>
    <div class="bottom-info">
      <!--遇到問題？請撥打客服電話<span>400-600-9976</span>或關註微信公眾號<span>“上海聚寶盆”</span>留言提問-->
    </div>
  </div>
</template>

<script>
  export default {
    name: 'PurchaseFail',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App',
        TDK:{
          title:'購買失敗'
        }
      }
    },
    mounted () {
      var he = $(window).height();
      $("body").height(he);

    },
    methods: {

    }
  }
</script>
