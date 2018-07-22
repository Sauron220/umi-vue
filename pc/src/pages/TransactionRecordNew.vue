<template>
  <div class="tranaction-new">
    <div class="tranaction-new-h">
      <h4>交易記錄</h4>
    </div>
    <div class="tranaction-new-date-warp">
      <div class="tit">起止日期</div>
      <div class="item" @click="selectDate(1)" :class="{'active-select': flag == 1}">全部</div>
      <div class="item" @click="selectDate(2)" :class="{'active-select': flag == 2}">最近1個月</div>
      <div class="item" @click="selectDate(4)" :class="{'active-select': flag == 4}">3個月</div>
      <div class="item" @click="selectDate(5)" :class="{'active-select': flag == 5}">6個月</div>
      <div class="item" @click="selectDate(6)" :class="{'active-select': flag == 6}">1年</div>
      <div class="item" @click="selectDate(7)">
        <dropdown :class="{'cus-menu': flag == 7}" :close-on-click="true">
          <template slot="btn">更多</template>
          <template slot="body">
            <div class="">
              2年
            </div>
          </template>
        </dropdown>
      </div>
    </div>
    <div class="tranaction-new-date-warp">
      <div class="tit">交易類型</div>
      <div class="item" @click="selectType(1)" :class="{'active-select': type == 1}">全部</div>
      <div class="item" @click="selectType(2)" :class="{'active-select': type == 2}">儲值</div>
      <div class="item" @click="selectType(3)" :class="{'active-select': type == 3}">提現</div>
      <div class="item" @click="selectType(4)">
        <dropdown :class="{'cus-menu': type == 4}" :close-on-click="true">
          <template slot="btn">一桶金</template>
          <template slot="body">
            <div class="">全部</div>
            <div class="">進行中</div>
            <div class="">還款中</div>
            <div class="">已還款</div>
          </template>
        </dropdown>
      </div>
      <div class="item" @click="selectType(5)">
        <dropdown :class="{'cus-menu': type == 5}" :close-on-click="true">
          <template slot="btn">聚寶計畫</template>
          <template slot="body">
            <div class="">全部</div>
            <div class="">進行中</div>
            <div class="">還款中</div>
            <div class="">已還款</div>
          </template>
        </dropdown>
      </div>
      <div class="item" @click="selectType(6)">
        <dropdown  :class="{'cus-menu': type == 6}" :close-on-click="true">
          <template slot="btn">分期投</template>
          <template slot="body">
            <div class="">全部</div>
            <div class="">進行中</div>
            <div class="">還款中</div>
            <div class="">已還款</div>
          </template>
        </dropdown>
      </div>
      <div class="item"  @click="selectType(7)">
        <dropdown :class="{'cus-menu': type == 7}" :close-on-click="true">
          <template slot="btn">月月盈</template>
          <template slot="body">
            <div class="">全部</div>
            <div class="">進行中</div>
            <div class="">還款中</div>
            <div class="cus-menu">已還款</div>
          </template>
        </dropdown>
      </div>
      <div class="item" @click="selectType(8)">
        <dropdown :class="{'cus-menu': type == 8}" :close-on-click="true">
          <template slot="btn">債權/散標</template>
          <template slot="body">
            <div class="">全部</div>
            <div class="">進行中</div>
            <div class="">還款中</div>
            <div class="">已還款</div>
          </template>
        </dropdown>
      </div>
      <div class="item" @click="selectType(9)" :class="{'active-select': type == 9}">其它</div>
      <div class="export-execl-btn">導出查詢結果</div>
    </div>
    <!--<div class="record-list-warp">
      <component :is="RecordTabel"></component>
    </div>-->
    <record-tabel
      :tradeType="tradeType"
      :pageAt="pageAt"
    ></record-tabel>
  </div>
</template>

<script>
  import Dropdown from 'bp-vuejs-dropdown';
  import RecordTabel from '@/components/RecordTabel'

  export default {
    name: "TransactionRecordNew",
    components: {
      Dropdown,
      RecordTabel,
    },
    data() {
      return {
        flag: 1,
        type: 1,
        currentPage:1,
        RecordTabel:'RecordTabel',
        tradeType:'IV',
        pageAt:"1",
      }
    },
    created() {

    },
    methods: {
      selectType(v) {
        this.type = v;
      },
      selectDate(v) {
        this.flag = v;
      },

    },

  }
</script>

<style scoped>

</style>
