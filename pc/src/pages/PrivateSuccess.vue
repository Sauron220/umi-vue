<template>
  <div class="private-result results-page private-page result-bg" v-TDK="TDK">
    <div class="row width-2x">
      <div class="col-md-3 col-xs-3">
        <img  src="../assets/images/luck.png">
      </div>
      <div class="col-md-9 col-xs-3">
        <h1>恭喜您購買成功！</h1>
        <a href="/product-list/0/11/1" type="button" class="btn btn-private">瀏覽其它產品</a>
        <a href="/myAssets/" type="button" class="btn btn-private2">查看已投項目</a>
      </div>
    </div>
  <div class="bottom-info">
      <!--遇到問題？請撥打客服電話<span>400-600-9976</span>或關註微信公眾號<span>“上海聚寶盆”</span>留言提問-->
    </div>
  </div>
</template>

<script>
  export default {
    name: 'PrivateSuccess',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App',
        TDK:{
          title:'購買成功',
          keyWords:'',
          description:'',
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
