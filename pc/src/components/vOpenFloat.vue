<template>
  <div>
    <div class="v-modal modal-warning">
      <!--sadf{{name}}{{phoneNums}}-->
      <div class="modal-backdrop fade in" style="z-index: 1060;"></div>
      <div class="oppen-acc clearfix">
        <a href="javascript:;" @click="hideOpen()" class="close">×</a>
        <div class="oppen-acc-content">
          <img class="oppen-img" src="../assets/images/zkp-01.png">
          <span class="oppen-line"></span>
          <img class="oppen-img" src="../assets/images/sh-bank.jpg">
          <div class="oppen-account" v-if="vOpenAccBl">
            <div class="oppen-text1">聚寶盆攜手上海銀行保障您的資金安全</div>
            <div class="oppen-text2">請您開通上海銀行資金存管帳戶<a class="viewDetails" target="_blank" href="http://event.zhongkejf.com/depositoryIntroduce.html">查看詳情 >></a>
            </div>
          </div>
          <div class="activate-account" v-if="!vOpenAccBl">
            <div class="oppen-text1">您的帳戶已升級為上海銀行資金存管帳戶</div>
            <div class="oppen-text2">請您激活上海銀行資金存管帳戶<a class="viewDetails" target="_blank" href="http://event.zhongkejf.com/depositoryIntroduce.html">查看詳情 >></a>
            </div>
          </div>
        </div>
        <div class="activate-account" v-if="!vOpenAccBl"><a class="bas-btn btn oppen-btn" href="/activateAccount">去激活</a></div>
        <div class="oppen-account" v-if="vOpenAccBl"><a class="bas-btn btn oppen-btn" href="/openAccount">去開戶</a></div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'vOpenFloat',
    props: {
      vOpenAccBl:{
        type: Boolean
      },
    },
    data() {
      return {
      }
    },
    created(){
    },
    methods: {
      hideOpen(){
        this.$parent.isOpen = false;
//        this.$emit('isOpen',false);
      }
    }
  }

</script>
