<template>
  <div class="account-new">
    <div class="nav-head">
      <div class="nav-con">
        <div class="nav-tit" @click="toNext(1)" :class="{'active': flag == 1}">我的資產</div>
        <div class="nav-tit" @click="toNext(2)" :class="{'active': flag == 2}">我的優惠卷</div>
        <div class="nav-tit" @click="toNext(3)" :class="{'active': flag == 3}">消息中心(3)</div>
        <div class="nav-tit" @click="toNext(4)" :class="{'active': flag == 4}">帳號設置</div>
        <div class="nav-tit" @click="toNext(5)" :class="{'active': flag == 5}">我的銀行資料</div>
      </div>
    </div>
    <div class="page-view">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  export default {
    name: "AccountNew",
    data() {
      return {
        flag: 1,
      }
    },
    watch:{
      $route() {
        const self = this;
        switch (this.$route.name) {
          case 'BucketGoldTable':
            self.flag = 1;
            break;
          case 'Coupon':
            self.flag = 2;
            break;
          case 'MineAccount':
            self.flag = 4;
            break;
          case 'MyBankcard':
            self.flag = 5;
            break;
          default:
        }
      }
    },
    created() {

    },
    methods:{
      toNext(v) {
        this.flag = v;
        switch (v) {
          case 1:
            this.$router.replace({name: 'BucketGoldTable'});
            break;
          case 2:
            this.$router.replace({name: 'Coupon'});
            break;
          case 3:
            this.$router.replace({name: 'Coupon'});
            break;
          case 4:
            this.$router.replace({name: 'MineAccount'});
            break;
          case 5:
            this.$router.replace({name: 'MyBankcard'});
            break;
          default:
        }

      }
    }
  }
</script>
