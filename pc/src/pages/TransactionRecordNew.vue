<template>
  <div class="tranaction-new">
    <div class="tranaction-new-h">
      <h4>交易記錄</h4>
    </div>
    <div class="tranaction-new-date-warp">
      <div class="tit">起止日期</div>
      <!--<div class="item" @click="selectDate(1)" :class="{'active-select': flag == 1}">全部</div>-->
      <div class="item" @click="selectDate(2)" :class="{'active-select': flag == 2}">最近1個月</div>
      <div class="item" @click="selectDate(3)" :class="{'active-select': flag == 3}">3個月</div>
      <div class="item" @click="selectDate(4)" :class="{'active-select': flag == 4}">6個月</div>
      <div class="item" @click="selectDate(5)" :class="{'active-select': flag == 5}">1年</div>
      <div class="item" @click="selectDate(6)">
        <dropdown :class="{'cus-menu': flag == 6}" :close-on-click="true">
          <template slot="btn">更多</template>
          <template slot="body">
            <div class="" @click="selectDate(7)">
              2年
            </div>
          </template>
        </dropdown>
      </div>
    </div>
    <div class="tranaction-new-date-warp">
      <div class="tit">交易類型</div>
      <!--<div class="item" @click="selectType(1)" :class="{'active-select': type == 1}">全部</div>-->
      <div class="item" @click="selectType(2, 'CO', null)" :class="{'active-select': type == 2}">儲值</div>
      <div class="item" @click="selectType(3, 'WD', null)" :class="{'active-select': type == 3}">提現</div>
      <div class="item" @click="selectType(4, null, '70')">
        <dropdown :class="{'cus-menu': type == 4}" :close-on-click="true">
          <template slot="btn">一桶金</template>
          <template slot="body">
            <div class="" :class="{'active-select': type == 4 && statusAr == 0}" @click="selectStatus('0')">全部</div>
            <div class="" :class="{'active-select': type == 4 && statusAr == 1}" @click="selectStatus('1', 'IV')">投资</div>
            <div class="" :class="{'active-select': type == 4 && statusAr == 2}" @click="selectStatus('2', 'RP')">回款</div>
            <div class="" :class="{'active-select': type == 4 && statusAr == 3}" @click="selectStatus('3', 'RF')">退款</div>
          </template>
        </dropdown>
      </div>
      <div class="item" @click="selectType(5, null, '7')">
        <dropdown :class="{'cus-menu': type == 5}" :close-on-click="true">
          <template slot="btn">聚寶計畫</template>
          <template slot="body">
            <div class="" :class="{'active-select': type == 5 && statusAr == 0}" @click="selectStatus('0')">全部</div>
            <div class="" :class="{'active-select': type == 5 && statusAr == 1}" @click="selectStatus('1', 'IV')">投资</div>
            <div class="" :class="{'active-select': type == 5 && statusAr == 2}" @click="selectStatus('2', 'RP')">回款</div>
            <div class="" :class="{'active-select': type == 5 && statusAr == 3}" @click="selectStatus('3', 'RF')">退款</div>
          </template>
        </dropdown>
      </div>
      <div class="item" @click="selectType(6, null, '8')">
        <dropdown  :class="{'cus-menu': type == 6}" :close-on-click="true">
          <template slot="btn">分期投</template>
          <template slot="body">
            <div class="" :class="{'active-select': type == 6 && statusAr == 0}" @click="selectStatus('0')">全部</div>
            <div class="" :class="{'active-select': type == 6 && statusAr == 1}" @click="selectStatus('1', 'IV')">投资</div>
            <div class="" :class="{'active-select': type == 6 && statusAr == 2}" @click="selectStatus('2', 'RP')">回款</div>
            <div class="" :class="{'active-select': type == 6 && statusAr == 3}" @click="selectStatus('3', 'RF')">退款</div>
          </template>
        </dropdown>
      </div>
      <div class="item"  @click="selectType(7, null, '9')">
        <dropdown :class="{'cus-menu': type == 7}" :close-on-click="true">
          <template slot="btn">月月盈</template>
          <template slot="body">
            <div class="" :class="{'active-select': type == 7 && statusAr == 0}" @click="selectStatus('0')">全部</div>
            <div class="" :class="{'active-select': type == 7 && statusAr == 1}" @click="selectStatus('1', 'IV')">投资</div>
            <div class="" :class="{'active-select': type == 7 && statusAr == 2}" @click="selectStatus('2', 'RP')">回款</div>
            <div class="" :class="{'active-select': type == 7 && statusAr == 3}" @click="selectStatus('3', 'RF')">退款</div>
          </template>
        </dropdown>
      </div>
      <div class="item" @click="selectType(8, null, null, '1')">
        <dropdown :class="{'cus-menu': type == 8}" :close-on-click="true">
          <template slot="btn">債權/散標</template>
          <template slot="body">
            <div class="" :class="{'active-select': type == 8 && statusAr == 0}" @click="selectStatus('0')">全部</div>
            <div class="" :class="{'active-select': type == 8 && statusAr == 1}" @click="selectStatus('1', 'IV')">投资</div>
            <div class="" :class="{'active-select': type == 8 && statusAr == 2}" @click="selectStatus('2', 'RP')">回款</div>
            <div class="" :class="{'active-select': type == 8 && statusAr == 3}" @click="selectStatus('3', 'RF')">退款</div>
          </template>
        </dropdown>
      </div>
      <!--<div class="item" @click="selectType(9)" :class="{'active-select': type == 9}">其它</div>-->
      <div class="export-execl-btn" @click="toExecl">導出查詢結果</div>
    </div>
    <!--<div class="record-list-warp">
      <component :is="RecordTabel"></component>
    </div>-->
    <record-tabel
      :tradeType="tradeType"
      :prdType="prdType"
      :prdNature="prdNature"
      :startTime="startTime"
      :endTime="endTime"
      :pageAt="pageAt"
    ></record-tabel>
  </div>
</template>

<script>
  import Dropdown from 'bp-vuejs-dropdown';
  import RecordTabel from '@/components/RecordTabel'
  import moment from 'moment';

  export default {
    name: "TransactionRecordNew",
    components: {
      Dropdown,
      RecordTabel,
    },
    data() {
      return {
        flag: 2,
        type: 2,
        RecordTabel:'RecordTabel',
        tradeType:'CO',
        prdNature:null,
        startTime:'',
        endTime:moment().format('YYYYMMDD'),
        prdType:'',
        pageAt:"1",
        statusAr:0
      }
    },
    created() {
      this.startTime = moment().subtract(1, 'months').format('YYYYMMDD');
    },
    methods: {
      selectType(v, type, prdType, prdNature) {
        this.type != v && (this.statusAr = 0);
        this.type = v;
        this.prdType = prdType;
        this.prdNature = prdNature;
        this.tradeType = type;
      },
      selectDate(v) {
        const self = this;
        this.flag = v;
        switch (v) {
          case 2:
            self.startTime = moment().subtract(1, 'months').format('YYYYMMDD');
            break;
          case 3:
            self.startTime = moment().subtract(3, 'months').format('YYYYMMDD');
            break;
          case 4:
            self.startTime = moment().subtract(6, 'months').format('YYYYMMDD');
            break;
          case 5:
            self.startTime = moment().subtract(12, 'months').format('YYYYMMDD');
            break;
          case 7:
            self.startTime = moment().subtract(24, 'months').format('YYYYMMDD');
            break;
          default:
        }
      },
      selectStatus(val, tradeType){
        this.statusAr = val;
        this.tradeType = tradeType;
      },
      toExecl() {
        const self = this;
        self.$http.get('/pbap-web/action/trade/download/exportTradeMonthList',{responseType: 'arraybuffer'}, {
          params:{
            trdCode: self.tradeType,
            prdType: self.prdType,
            prdNature: self.prdNature,
            startTime: self.startTime,
            endTime: self.endTime,
          }
        }).then((res) => {
          res.text().then((val) => {
            var blob = new Blob([res.body], {type: 'application/vnd.ms-excel,charset=UTF-8'}),
              fileName = '交易记录';
            if (window.navigator.msSaveOrOpenBlob) {
              navigator.msSaveBlob(blob, fileName);
            } else {
              var link = document.createElement('a');
              link.href = window.URL.createObjectURL(blob);
              link.download = fileName;
              link.click();
              window.URL.revokeObjectURL(link.href);
            }
          })
        });
      }
    },

  }
</script>

<style scoped>

</style>
