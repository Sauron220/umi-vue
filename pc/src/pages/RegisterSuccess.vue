<template>
  <div class="register-success-content text-center" v-TDK="TDK">
    <div class="container">
      <img src="../assets/images/check-right.png" alt="">
      <div class="title">恭喜您註冊成功！</div>
      <!--<p class="content" id="newPack">新手禮包已經發放到您的帳戶中<a class="text-primary" href="/myCoupon" target="_blank">點擊查看>></a>-->
      <!--</p>-->
      <!--<div class="tips">快開通上海存管帳戶，開啟財富之旅吧！</div>-->
      <div class="btns">
        <a class="btn btn-warning btn-lg" href="/openAccount">去開戶</a>
      </div>
      <!--<a class="content" href="/accountOverview">跳過</a>-->
      <br>
      <br>
      <br>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'RegisterSuccess',
    data() {
      return {
        TDK: {
          title: '恭喜您註冊成功',
        }
      }
    },
    created() {

    },
    mounted() {
    },
    computed: {
      mevsUrl(){
        return this.$store.state.mevsUrl
      }
    },
    methods: {}
  }
</script>
