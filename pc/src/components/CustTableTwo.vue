<template>
  <div class="product-list table-p">
    <div class="desc-info">溫馨提示：該列表僅代表該期計劃可能出借標的，實際出借後可在我的賬戶-該期計劃詳情頁面查詢實際投標情況</div>
    <div class="table">
      <table class="t-caption">
        <thead>
          <tr>
            <th class="rate regular-rate">序號</th>
            <th class="name c-name">借款說明</th>
            <th class="time c-time">借款金額</th>
            <th class="money c-money">借款期限</th>
            <th class="progress c-progress">操作</th>
          </tr>
        </thead>
        <tbody class="data-list">
          <tr class="history-list-data">
            <td class="rate">1232434</td>
            <td class="name c-name">台北市林小姐</td>
            <td class="time c-time"><span>{{$fmoneyFormat(10000)}}</span>元</td>
            <td class="money c-money">36個月</td>
            <td><a href="#">查看詳情</a></td>
          </tr>
          <tr class="history-list-data">
            <td class="rate">1232434</td>
            <td class="name c-name">台北市林小姐</td>
            <td class="time c-time"><span>{{$fmoneyFormat(10000)}}</span>元</td>
            <td class="money c-money">36個月</td>
            <td><a href="#">查看詳情</a></td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="pageInation">
      <pagination :page-no="pageNo"></pagination>
    </div>
  </div>
</template>

<script>
  import Pagination from './Pagination'
  export default {
    name: "CustTableTwo",
    components:{
      Pagination
    },
    data() {
      return {
        productList: [],
      }
    },
    watch:{
      current(newV, oldV) {
        this.requestData(newV)
      }
    },
    computed:{
      current() {
        return this.$store.state.currentPage;
      }
    },
    created(){
      this.requestData()
    },
    data () {
      return {
        currentPage: 1,
        pageNo:10
      }
    },
    methods: {
      requestData (v) {
        // 在这里使用ajax或者fetch将对应页传过去获取数据即可
        console.log("-----",v)
      }
    }
  }
</script>
