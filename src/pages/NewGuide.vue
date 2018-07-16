<template>
  <div class="text-center">
    <div class="segu og1">
      <div>
        <img src="../assets/images/og_01.jpg">
      </div>
    </div>
    <div class="segu og2">
      <div>
        <img src="../assets/images/og_02.jpg">
      </div>
    </div>
    <div class="segu og3">
      <div>
        <img src="../assets/images/og_03.jpg">
      </div>
    </div>
    <div class="segu og4">
      <div>
        <img src="../assets/images/og_04.jpg">
      </div>
    </div>
    <div class="segu og5">
      <div>
        <img src="../assets/images/og_05.jpg">
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'NewGuide',
    data () {
      return {

      }
    },
    created(){
    },
    mounted () {
    },
    methods: {
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
    height:620px;
  }
  .segu7{
    height:562px;
  }
  .segu8{
    height:661px;
  }

  .og1{
    height:380px;
  }
  .og2{
    height:431px;
  }
  .og3{
    height:408px;
  }
  .og4{
    height:1420px;
  }
  .og5{
    height:1479px;
  }
</style>
