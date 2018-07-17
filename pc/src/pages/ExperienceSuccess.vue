<template>
  <div class="experience-result result-bg">
    <div class="container">
      <div class="row">
        <div class="col-xs-5 text-right">
          <img  src="../assets/images/luck.png">
        </div>
        <div class="col-xs-7">
          <br>
          <br>
          <br>
          <h4 class="text-warning">恭喜您購買成功！</h4>
        </div>
      </div>
    </div>
    <div class="bottom-info text-center">
      <!--遇到問題？請撥打客服電話<span class="text-primary">400-600-9976</span>或關註微信公眾號<span class="text-primary">“上海聚寶盆”</span>留言提問-->
    </div>
  </div>
</template>

<script>
  export default {
    name: 'PurchaseSuccess',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App',
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
