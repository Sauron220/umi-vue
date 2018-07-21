<template>
  <div class="mine-account">
    <div class="nav-tp">
      <div class="nav-item" @click="toPage(1)" :class="{'active-select': flag == 1}">賬戶資料</div>
      <div class="nav-item" @click="toPage(2)" :class="{'active-select': flag == 2}">我的銀行卡</div>
    </div>
    <div class="mine-accout">
      <component :is="comp"></component>
    </div>
  </div>
</template>

<script>
  import mineSet from '@/components/MineSet'
  export default {
    name: "MineAccount",
    components:{
      mineSet,
    },
    data() {
      return {
        flag: 1,
        comp: 'mineSet'
      }
    },
    created(){

    },
    methods:{
      toPage(v) {
        this.flag = v;

      }
    }
  }
</script>
