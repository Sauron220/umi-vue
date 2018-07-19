<template>
  <div class="product-list">
    <div class="table">
      <table class="t-caption">
        <thead>
        <tr>
          <th class="rate regular-rate">序號</th>
          <th class="name">出借人</th>
          <th class="time">加入金额</th>
          <th class="money">来源</th>
          <th class="progress">加入时间</th>
        </tr>
        </thead>
        <tbody class="data-list">
        <tr class="history-list-data">
          <td class="rate">1213</td>
          <td class="name">33</td>
          <td class="time">33天</td>
          <td class="money"><span>{{$fmoneyFormat(10000)}}</span>元</td>
          <td >12312</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  export default {
    name: "CustTable",
    data(){
      return {
        productList:[]
      }
    }
  }
</script>

<style scoped>

</style>
