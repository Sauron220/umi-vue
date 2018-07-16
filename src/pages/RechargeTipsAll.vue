<template>
  <div class="tips-warp">
    <h1 class="text-center">匯付天下儲值限額壹覽表</h1>
    <p class="text-right">*實時限額數據以匯付天下儲值頁面為準</p>
    <hr>
    <br>
    <table class="table table-bordered table-tips" id="bankTip">
      <thead>
      <tr>
        <th>
          <div class="bank-name">銀行</div>
        </th>
        <th>
          <div class="card-type">支持卡種</div>
        </th>
        <th>
          <div class="single-limit">單筆限額(元)</div>
        </th>
        <th>
          <div class="day-limit">每日限額(元)</div>
        </th>
        <th>
          <div class="intro">需要滿足條件</div>
        </th>
      </tr>
      </thead>
      <tbody v-for="(a,idx) in bankList" :id="'bankcode' + a.bankCode" :tNum="countList=0">
      <tr v-for="(item,index) in bankListSimple" v-if="a.bankCode == item.bankCode">
        <td :class="'bank'+item.bankCode">
          <div class="bank-name">{{item.bankName}}</div>
        </td>
        <td :class="'type'+item.bankCode" :bankType=item.bankType>
          <div class="card-type">{{item.bankType}}</div>
        </td>
        <td>
          <div class="single-limit">{{item.singleLimit}}</div>
        </td>
        <td>
          <div class="day-limit">{{item.dailyLimit}}</div>
        </td>
        <td>
          <div class="intro">{{item.payMethod}}</div>
        </td>
      </tr>
      </tbody>
    </table>
    <br>
    <br>
    <br>
  </div>
</template>

<script>
  export default {
    name: 'RechargeTipsAll',
    data () {
      return {
        bankList:[],
        bankListSimple:[],
      }
    },
    created(){
      var self = this;
      self.$http.post('/pbap-web/action/customer/quickRechargeLimit',{}).then((res)=>{
        self.bankListSimple = res.body.respInfo.quickBank;
      });
      self.$http.post('/pbap-web/action/bankcard/query/allBankLimit',{}).then((res)=>{
        self.bankList = res.body.respInfo.bankList;
      });
    },
    mounted () {
      var self = this;
      setTimeout(function () {
        for(var i=0;i<self.bankList.length;i++){
          self.tableRowOne('bankcode'+self.bankList[i].bankCode);

          for(var j=0;j<self.bankList[i].bankType.length;j++){
            var arrBankType = [];
            var bList = $('.type'+self.bankList[i].bankCode);
            for(var y =0;y<bList.length;y++){
              if(bList.eq(y).attr('banktype').trim() === self.bankList[i].bankType[j].bankType.trim()){
                arrBankType.push(bList.eq(y));
              }
            };
            arrBankType[0].attr('rowspan',arrBankType.length);
            for(var x = 0;x<arrBankType.length;x++){
              if(x!=0){
                arrBankType[x].remove();
              }
            }
          }
        }
      })
    },
    methods: {
      tableRowOne(tableId) {
        var rows = $('#'+tableId+' tr');
        var large = rows.length;
        rows.eq(0).children('td').eq(0).attr('rowspan',large);
        var rowsLittle = rows.slice(1);
        rowsLittle.each(function(){
          $(this).children('td').eq(0).remove();
        });
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1{
    line-height: 3;
  }
  .tips-warp{
    width:650px;
    margin:0 auto;
  }
</style>
