<template>
  <div class="results-page result-bg" v-TDK="TDK">
    <div class="row width-2x">
      <div class="col-md-3 col-xs-3">
        <img  src="../assets/images/500.png">
      </div>
      <div class="col-md-9 col-xs-3">
        <h1>匯款處理中！</h1>
        <p>您可以在個人中心的交易記錄中查看匯款結果</p>
        <a :href="'/transactionDetails/'+ $route.query.tradeCode +'/CO'" type="button" class="btn btn-warning btn-recharge">查看匯款結果</a>
      </div>
    </div>
    <div class="bottom-info">
      <!--遇到問題？請撥打客服電話<span>400-600-9976</span>或關註微信公眾號<span>“上海聚寶盆”</span>留言提問-->
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Treatmentl',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App',
        TDK:{
          title:'匯款處理中',
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
