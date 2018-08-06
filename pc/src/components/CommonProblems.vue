<template>
  <div class="common-problems">
    <div class="question-item">
      <p class="question-item-tit">Q1：{{prdName}}安全嗎？ </p>
      <p class="question-item-ans">聚寶盆以嚴謹負責的態度對每筆借款進行嚴格篩選，同時具備專業的貸後管理團隊和高效的催收流程，最大限度的保護出借人的權益。 </p>
    </div>
    <div class="question-item">
      <p class="question-item-tit">Q2：{{prdName}}發佈時間？  </p>
      <p class="question-item-ans" v-if="prdName.indexOf('分期投') != -1">會根據用戶出借情況隨機發布分期投， 請隨時關注官網及APP靈活安排您的出借時間。</p>
      <p class="question-item-ans" v-if="prdName.indexOf('月月盈') != -1">會根據用戶出借情況隨機發布月月盈， 請隨時關注官網及APP靈活安排您的出借時間。</p>
      <p class="question-item-ans" v-if="prdName.indexOf('分期投') == -1 && prdName.indexOf('月月盈') == -1">會根據用戶出借情況隨機發布{{prdName}}， 請隨時關注官網及APP靈活安排您的出借時間。</p>
    </div>
    <div class="question-item">
      <p class="question-item-tit">Q3：{{prdName}}期待年回報率有多少？  </p>
      <p class="question-item-ans" v-if="prdName.indexOf('聚寶計劃') != -1">聚寶計畫主要有3種，鎖定期分別為3個月、6個月、12個月，不同鎖定期長度的聚寶計畫期待年回報率不同，具體以當期 聚寶計畫公佈的期待年回報率為準。期待回報不代表對實際利息回報的承諾，您最終獲得的實際利息回報可能與期待年回報率不一致</p>
      <p class="question-item-ans" v-if="prdName.indexOf('分期投') != -1">分期投主要有2種，鎖定期為6個月、12個月，不同鎖定期長度的分期投期待年回報率不同，具體以當期分期投公佈的期待年回報率為準。期待回報不代表對實際利息回報的承諾，您最終獲得的實際利息回報可能與期待年回報率不一致</p>
      <p class="question-item-ans" v-if="prdName.indexOf('月月盈') != -1">月月盈主要有2種，鎖定期為6個月、12個月，不同鎖定期長度的月月盈期待年回報率不同，具體以當期月月盈公佈的期待年回報率為準。期待回報不代表對實際利息回報的承諾，您最終獲得的實際利息回報可能與期待年回報率不一致。</p>
      <p class="question-item-ans" v-if="prdName.indexOf('壹桶金') != -1">壹桶金，鎖定期為1個月，具體以當期 壹桶金公佈的期待年回報率為準。期待回報不代表對實際利息回報的承諾，您最終獲得的實際利息回報可能與期待年回報率不一致。</p>
    </div>
    <!--<div class="question-item">
      <p class="question-item-tit">Q4：壹桶金利息處理方式是什麼？  </p>
      <p class="question-item-ans">壹桶金提供以下兩種出借所獲利息處理方式：再出借，或由用戶自行支配。用戶在加入壹桶金時可進行選擇，暫不支持中途修改。另外，在 壹桶金退出後，債權轉讓所得資金及借款回款本息將返回至用戶的民生銀行存管賬戶，供用戶自行支配。</p>
    </div>-->
    <div class="question-item">
      <p class="question-item-tit">Q4：鎖定期是什麼？   </p>
      <p class="question-item-ans">{{prdName}}具有鎖定期限制。鎖定期內，您不可操作提前退出</p>
    </div>
    <div class="question-item">
      <p class="question-item-tit">Q5：{{prdName}}到期後，我如何退出並實現收回本息？ </p>
      <p class="question-item-ans">{{prdName}}到期當日，系統將自動通過債權轉讓為您收回出借本金，轉讓完成時間一般為1~3個工作日。</p>
    </div>
    <div class="question-item">
      <p class="question-item-ans">聚寶盆平台平台僅為信息發布平台，未以任何明示或暗示的方式對出借人提供擔保或承諾保本保息，出借人應根據自身的出借偏好 和風險承受能力進行獨立判斷和作出決策，並自行承擔資金出借的風險與責任。網貸有風險，出借需謹慎。</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: "common-problems",
    data() {
      return {
        prdName:'壹桶金'
      }
    },
    created() {
      this.prdName = this.$route.query.proType;
    },
    methods: {

    }
  }
</script>
