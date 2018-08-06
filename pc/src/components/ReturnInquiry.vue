<template>
  <div class="return-inquiry">
    <!--<vue-datepicker-local v-model="time" />-->
    <div class="inquiry-hed">
      <h4>回賬查詢</h4>
      <span>全部待收本息：0.00元</span>
    </div>
    <div class="inquiry-con-warp">
      <div class="type" @click="selectType(1, '20')" :class="{'active-select': flag == 1}">待收回款</div>
      <div class="type" @click="selectType(2, '30')" :class="{'active-select': flag == 2}">已收回款</div>
    </div>
    <div class="date-select-warp">
      <div class="select-date">
        日期<vue-datepicker-local inputClass="cust-bor" v-model="timeStart" />到<vue-datepicker-local inputClass="cust-bor" :disabled-date="disabledDate" v-model="timeEnd" />
      </div>
      <div class="select-date-money">查詢期待收回報總額：0.00 元</div>
    </div>
    <div class="">
      <return-inquiry-table
        :status="status"
        :timeEnd="timeEnd"
        :timeStart="timeStart"></return-inquiry-table>
    </div>
    <!--<div class="none-data" v-if="isNull">沒有數據</div>-->
  </div>
</template>

<script>
  import VueDatepickerLocal from 'vue-datepicker-local'
  import ReturnInquiryTable from './ReturnInquiryTable'
  import moment from 'moment'
  export default {
    name: "ReturnInquiry",
    components:{
      VueDatepickerLocal,
      ReturnInquiryTable
    },
    data() {
      return {
        timeStart: moment(new Date()).format('YYYY-MM-DD'),
        timeEnd: moment(new Date()).format('YYYY-MM-DD'),
        flag: 1,
        isNull: true,
        status:'20',
      }
    },
    watch:{
      timeStart(newV, oldV){
        newV && (this.timeStart = moment(this.timeStart).format('YYYY-MM-DD').toString());
      },
      timeEnd(newV, oldV){
        newV && (this.timeEnd = moment(this.timeEnd).format('YYYY-MM-DD').toString());
      },
    },
    created() {

    },
    methods: {
      disabledDate(time) {
        return time < new Date(this.timeStart)
      },
      selectType(v, status) {
        this.flag = v;
        this.status = status;
      }
    }
  }
</script>
