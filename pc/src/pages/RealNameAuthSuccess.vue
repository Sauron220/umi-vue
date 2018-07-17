<template>
  <div class="results-page result-bg" v-TDK="TDK">
    <div class="row width-2x">
      <div class="col-md-3 col-xs-3">
        <img  src="../assets/images/luck.png">
      </div>
      <div class="col-md-9 col-xs-3">
        <br><br>
        <h1>恭喜您認證成功！</h1>
      </div>
    </div>
   <div class="bottom-info">
      <!--遇到問題？請撥打客服電話<span>400-600-9976</span>或關註微信公眾號<span>“上海聚寶盆”</span>留言提問-->
    </div>
  </div>
</template>

<script>
  export default {
    name: 'RealNameAuthSuccess',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App',
        TDK:{
          title:'實名成功',
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
