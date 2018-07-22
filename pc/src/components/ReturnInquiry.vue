<template>
  <div class="return-inquiry">
    <!--<vue-datepicker-local v-model="time" />-->
    <div class="inquiry-hed">
      <h4>回賬查詢</h4>
      <span>全部待收本息：0.00元</span>
    </div>
    <div class="inquiry-con-warp">
      <div class="type" @click="selectType(1)" :class="{'active-select': flag == 1}">待收回款</div>
      <div class="type" @click="selectType(2)" :class="{'active-select': flag == 2}">已收回款</div>
    </div>
    <div class="date-select-warp">
      <div class="select-date">
        日期<vue-datepicker-local class="cust-bor" v-model="timeStart" />到<vue-datepicker-local :disabled-date="disabledDate" v-model="timeEnd" />
      </div>
      <div class="select-date-money">查詢期待收回報總額：0.00 元</div>
    </div>
    <div class=""></div>
    <div class="none-data" v-if="isNull">沒有數據</div>
  </div>
</template>

<script>
  import VueDatepickerLocal from 'vue-datepicker-local'
  export default {
    name: "ReturnInquiry",
    components:{
      VueDatepickerLocal
    },
    data() {
      return {
        timeStart: new Date(),
        timeEnd: new Date(),
        flag: 1,
        isNull: true,
      }
    },
    created() {

    },
    methods: {
      disabledDate(time) {
        return time < this.timeStart
      },
      selectType(v) {
        this.flag = v;
      }
    }
  }
</script>
