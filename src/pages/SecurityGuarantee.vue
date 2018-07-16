<template>
  <div class="hello" v-TDK="TDK">
    <div class="segu segu1">
      <div>
        <img src="../assets/images/sg_01.jpg">
      </div>
    </div>
    <div class="segu segu2">
      <div>
        <img src="../assets/images/sg_02.jpg">
      </div>
    </div>
    <div class="segu segu3">
      <div>
        <img src="../assets/images/sg_03.jpg">
      </div>
    </div>
    <div class="segu segu4">
      <div>
        <img src="../assets/images/sg_04.jpg">
      </div>
    </div>
    <div class="segu segu5">
      <div>
        <img src="../assets/images/sg_05.jpg">
      </div>
    </div>
    <div class="segu segu6">
      <div>
        <img src="../assets/images/sg_06.jpg">
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'SecurityGuarantee',
    data () {
      return {
        TDK:{
          title:'聚寶盆安全嗎？上海銀行監管',
          keyWords:'聚寶盆靠譜嗎,聚寶盆安全嗎,上海銀行,風控',
          description:'聚寶盆是銀行級別交易系統，系統加密保護技術，6道風控審核保障，透明穩健的互聯網理財平臺，理財更安全！',
        }
      }
    }
  }
</script>
<style>
  .segu{
    overflow: hidden;
    width: 100%;
    z-index: 10;
    position: relative;
    background-attachment: fixed;
    background-repeat: no-repeat;
    background-size: auto 100%;
  }

  .segu div{
    overflow: hidden;
    position: absolute;
    left: 50%;
    width: 1920px;
    margin-left: -960px;
    top: 0;
    bottom: 0;
    right: 0;
  }

  .segu1{
    height:300px;
  }
  .segu2{
    height:625px;
  }
  .segu3{
    height:693px;
  }
  .segu4{
    height:709px;
  }
  .segu5{
    height:814px;
  }
  .segu6{
    height:1357px;
  }
</style>

