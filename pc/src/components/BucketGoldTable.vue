<template>
  <div class="bucket-table product-list table-p">
    <div class="bucket-status-warp">
      <div>持有中(0)</div>
      <div>已退出(0)</div>
    </div>
    <div class="table">
      <table class="t-caption">
        <thead>
        <tr>
          <th class="rate c-rate regular-rate">計劃名稱</th>
          <th class="name c-name">加入人次</th>
          <th class="time c-time">計劃金額</th>
          <th class="money c-money d-money">期待年回報率</th>
          <th class="progress c-progress">累計利息回報</th>
          <th class="handle-c">狀態</th>
        </tr>
        </thead>
        <tbody class="data-list">
        <tr class="history-list-data">
          <td class="rate c-rate">聚寶計畫-3月-20180619期</td>
          <td class="name c-name">W***8</td>
          <td class="time c-time"><span>{{$fmoneyFormat(10000)}}</span>元</td>
          <td class="money c-money"><img src="" alt=""></td>
          <td>0元</td>
          <td @click="toDeatil('0')"><div class="c-pon">立即加入</div></td>
        </tr>
        <tr class="history-list-data">
          <td class="rate c-rate">1</td>
          <td class="name c-name">W***8</td>
          <td class="time c-time"><span>{{$fmoneyFormat(10000)}}</span>元</td>
          <td class="money c-money"><img src="" alt=""></td>
          <td>0元</td>
          <td @click="toDeatil('1')">已滿標</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  export default {
    name: "BucketGoldTable"
  }
</script>
