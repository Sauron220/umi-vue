<template>
  <div class="coupon-warp">
    <div class="coupon-nav-warp">
      <div class="coupon-nav-item" @click="selectSatus(1)" :class="{'active-select': flag == 1}">未使用的優惠券</div>
      <div class="coupon-nav-item" @click="selectSatus(2)" :class="{'active-select': flag == 2}">已使用的優惠券</div>
      <div class="coupon-nav-item" @click="selectSatus(3)" :class="{'active-select': flag == 3}">已失效的優惠券</div>
    </div>
    <div class="coupon-con-conm">
      <component :is="comp"></component>
    </div>
  </div>
</template>

<script>
  import Unused from "@/components/CouPonUnused"
  export default {
    name: "Coupon",
    components:{
      Unused,
    },
    data() {
      return {
        comp:'Unused',
        flag: 1,
        status:0,
      }
    },
    methods:{
      selectSatus(v) {
        const self = this;
        this.flag = v;
        switch (v) {
          case 1:
            self.comp = 'Unused';
            self.status = 0;
            self.$store.commit('setUnusedStatus', 0);
            break;
          case 2:
            self.comp = 'Unused';
            self.status = 1;
            self.$store.commit('setUnusedStatus', 1);
            break;
          case 3:
            self.comp = 'Unused';
            self.status = 2;
            self.$store.commit('setUnusedStatus', 2);
            break;
          default:
        }
      }
    }
  }
</script>
