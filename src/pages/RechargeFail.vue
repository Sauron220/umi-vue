<template>
  <div class="results-page result-bg" v-TDK="TDK">
    <div class="row width-2x" style="margin-left: 32%;">
      <div class="col-md-3 col-xs-3">
        <img  src="../assets/images/500.png"  style="max-width: 120px;">
      </div>
      <div class="col-md-9 col-xs-3">
        <h1>儲值失敗啦！</h1>
        <button type="button" class="btn btn-warning btn-recharge">重新儲值</button>
      </div>
    </div>
    <div class="bottom-info">
      <!--遇到問題？請撥打客服電話<span>400-600-9976</span>或關註微信公眾號<span>“上海聚寶盆”</span>留言提問-->
    </div>
  </div>
</template>

<script>
  export default {
    name: 'RechargeFail',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App',
        TDK:{
          title:'儲值失敗',
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
