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
          <th class="rate c-rate regular-rate">一桶金計畫名稱</th>
          <th class="name c-name">期待年會報率</th>
          <th class="time">出借金額</th>
          <th class="money">已獲回報</th>
          <th class="progress c-progress"> 投標次數</th>
          <th class="handle-c">狀態</th>
          <th style="width: 200px;">操作</th>
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
          <td>点击</td>
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
