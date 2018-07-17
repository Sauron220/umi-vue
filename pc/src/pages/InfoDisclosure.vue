<template>
  <div class="hello">
    <div class="infoDis_nav">
      <div class="wrap">
        <span class="id1 id-high">股東資訊</span>
        <span class="id2">證照披露</span>
      </div>
    </div>

    <div class="wrap infoDis_content">
      <div class="infoDis_box infoDis_box1" style="display: block">
        <div class="clearfix">
          <img src="../assets/images/id_box_01.jpg" style="width: 142px;height: auto;">
          <p>
            中科光電是壹家專業從事電子資訊產業光通信產品制造和網絡系統集成業務，集技術研發、高端產品制造、銷售和服務為壹體的高科技民營企業，也是全球領先的光通信連接器產品制造商。產品廣泛應用於航空、航天、傳媒、電力、通信、交通、機電、醫療、教育等領域。8月29日上午澳大利亞時間10：30分，中科光電子集團股票（代碼：ZKP）在澳大利亞國家證券交易所（NSX）成功上市。</p>
        </div>
        <br><br><br><br><br>
      </div>

      <div class="infoDis_box infoDis_box2">
        <img src="../assets/images/id_box2.jpg">
        <div></div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'InfoDisclosure',
    data() {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    },
    mounted() {
      var code = window.location.search;
      if (code == "?code=1") {
        $(".infoDis_nav span").removeClass('id-high').eq(1).addClass('id-high');
        $(".infoDis_box").hide().eq(1).show();
      }
      $(".infoDis_nav span").click(function () {
        var index = $(".infoDis_nav span").index(this);
        $(".infoDis_nav span").removeClass('id-high').eq(
          index).addClass('id-high');
        $(".infoDis_box").hide().eq(index).show();
      })
    },
  }
</script>
<style>
  .infoDis_nav {
    width: 100%;
    height: 70px;
    line-height: 70px;
    background: #fff7eb;
    color: #8e8e8f;
    font-size: 20px;
  }

  .wrap {
    width: 1080px;
    margin: 0 auto;
  }

  .infoDis_nav span {
    width: 49.6%;
    float: left;
    display: inline-block;
    vertical-align: top;
    cursor: pointer;
  }

  .infoDis_nav .id2 {
    text-align: right;
  }

  .id-high {
    color: #f8b62b;
  }

  .infoDis_content .infoDis_box {
    display: none
  }

  .infoDis_box {
    padding: 94px 0;
  }

  .infoDis_box1 div {
    margin-bottom: 40px;
  }

  .infoDis_box1 div img {
    display: block;
    float: left;
    margin-right: 40px;
  }

  .infoDis_box1 div p {
    float: left;
    width: 888px;
    text-indent: 40px;
    font-size: 20px;
    line-height: 36px;
    color: #313131;
  }

  .infoDis_box1 div p span {
    color: #307bf2;
  }

  .infoDis_box2 img {
    display: block;
    margin: 0 auto;
  }

  .infoDis_box3 div {
    margin-bottom: 30px;
  }

  .infoDis_box3 div img {
    margin-left: 36%;
    margin-bottom: 40px;
    display: block;
  }

  .infoDis_box3 div span {
    float: left;
    display: block;
    text-align: center;
    color: #307bf2;
    font-size: 26px;
    line-height: 120px;
    width: 230px;
  }

  .infoDis_box3 div p {
    /* float: left; */
    text-indent: 40px;
    color: #666666;
    font-size: 17px;
    line-height: 40px;
    /* width: 688px; */
  }
</style>

