<template>
  <div class="BorrowingInput" >
    <div class="bg-color">
      <!--<div class="borrowinginput-left">
        <div class="borrowinginput-left-t">
          <img src="/static/img/logo-n.png" alt="" style="width: 76px;height: 76px;">
          <div class="borrowinginput-tit">聚寶盆</div>
          <div class="line-divid"></div>
          <div class="desc">借款</div>
        </div>
        <p class="borrowinginput-info">最高借款額度20萬元</p>
        <div class="img-warp">
          <img src="/static/img/personC.png" alt="" class="img-g">
        </div>
        <p class="borrowing-info-p"><span>3步快速申請</span><span>最快十分鐘審核</span><span>最快一小時到賬</span></p>
      </div>-->
      <div class="input-warp">
        <div class="borrowinginput-ri">
          <div class="borrowinginput-ri-t">
            <p class="borrowinginput-ri-t-h">填寫借款資料</p>
            <p class="borrowinginput-ri-t-d">填寫訊息，客服專員會與您取得聯係</p>
            <div class="tab-warp">
              <span :class="{'active-select': flag == 1}" @click="changeTab(1, 'PersonalBorrow')">個人借款</span>
              <span :class="{'active-select': flag == 2}" @click="changeTab(2, 'CompanyBorrow')">企業借款</span>
            </div>
            <div class="view-warp">
              <component :is="per"></component>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import PersonalBorrow from '@/components/PersonalBorrow'
  import CompanyBorrow from '@/components/CompanyBorrow'

  export default {
    name: "BorrowingInput",
    components: {
      PersonalBorrow,
      CompanyBorrow,
    },
    data() {
      return {
        flag: 1,
        per: 'PersonalBorrow'
      }
    },
    created() {

    },
    methods: {
      changeTab(val, com) {
        this.flag = val;
        this.per = com;
      }
    }
  }
</script>
