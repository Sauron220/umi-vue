<template>
  <div class="mine-account">
    <div class="nav-tp">
      <div class="nav-item" @click="toPage(1, 'mineSet')" :class="{'active-select': flag == 1}">賬戶資料</div>
      <div class="nav-item" @click="toPage(2, 'AddBankCard')" :class="{'active-select': flag == 2}">我的銀行卡</div>
    </div>
    <div class="mine-accout">
      <component :is="comp"></component>
    </div>
  </div>
</template>

<script>
  import mineSet from '@/components/MineSet'
  import AddBankCard from '@/components/AddBankCard'

  export default {
    name: "MineAccount",
    components:{
      mineSet,
      AddBankCard,
    },
    data() {
      return {
        flag: 1,
        comp: 'mineSet'
      }
    },
    created(){
      const _comp = this.$route.query.comp;
      _comp ? this.comp = _comp : this.comp = 'mineSet';
      if (_comp == 'mineSet') {
        this.flag = 1;
      } else if (_comp) {
        this.flag = 2;
      }
    },
    methods:{
      toPage(v, cop) {
        this.flag = v;
        this.comp = cop;
      }
    }
  }
</script>
