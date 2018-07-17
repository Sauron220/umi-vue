<template>
  <div id="PersonalCenter" class="myAssets-content profile clearfix" v-TDK="TDK">
    <div class="container">
      <div class="alert_mas">只有當您購買的產品還款後才會計入累計收益</div>
      <ol class="breadcrumb">
        <span>您現在的位置：</span>
        <li><router-link to="/accountOverview">我的賬戶</router-link></li>
        <li class="active">我的資產</li>
      </ol>
      <leftMenu></leftMenu>
      <div class="pull-left right_content">
        <div class="row top-assets">
          <div class="col-xs-4 info1">
            <img src="../assets/images/cir_09.png">
            <div>
              <h1>投資總額</h1>
              <p><span id="investmentAmount">{{$fmoney(statisticsView.investmentAmount)}}</span>元</p>
            </div>
          </div>
          <div class="col-xs-4 info2">
            <img src="../assets/images/cir_07.png">
            <div>
              <h1>預期收益</h1>
              <p><span id="benifitAmountExp">{{$fmoney(statisticsView.benifitAmountExp)}}</span>元</p>
            </div>
          </div>
          <div class="col-xs-4 info3">
            <img src="../assets/images/cir_08.png">
            <div style="min-width:90px;">
              <h1 id="alert" v-on:click="alertMasssage">累計收益</h1>
              <p><span id="benifitAmount">{{$fmoney(statisticsView.benifitAmount)}}</span>元</p>
            </div>
          </div>
        </div>

        <div class="screen">
          <h1>狀態:</h1>
          <router-link :to="{ name: 'MyAssets', params: { status: 88,pageAt:1 }}"
                       :class="{'active':$route.params.status==88}">不限</router-link>
          <router-link :to="{ name: 'MyAssets', params: { status: 11,pageAt:1 }}"
                       :class="{'active':$route.params.status==11}">進行中</router-link>
          <router-link :to="{ name: 'MyAssets', params: { status: 30,pageAt:1 }}"
                       :class="{'active':$route.params.status==30}">已還款</router-link>
        </div>

        <div class="assList-content">
          <div class="first-floor-title ">
            <span class="room1">產品名稱</span>
            <span class="room2">預期年化收益</span>
            <span class="room3">投資金額(元)</span>
            <span class="room4">預期收益(元)</span>
            <span class="room5">到期日</span>
            <span class="room6">狀態</span>
            <span class="room7">還款計劃</span>
            <span class="room8">操作</span>
          </div>
          <div id="assetsList">
            <div class="first-floor" :class="{'bg':index%2 == 1}" v-for="(item, index) in investmentList">
              <div class="upstairs">
                            <span class="room1">
                                <a target="_blank" :href="productUrl(item.prdType)+item.prdCode">{{item.prdName}}</a>
                            </span>
                <span class="room2">{{$fmoney(item.rate * 100)}}%
                                <i class="text-danger" v-if="item.cpnInfo">+{{$formatNum(item.cpnInfo || 0,100)}}%</i>
                            </span>
                <span class="room3">{{$fmoney(item.trdAmount)}}</span>
                <span class="room4">{{$fmoney(item.incomeAmount)}}
                                <i class="reward text-danger" v-if="item.couponIncome">+{{$fmoney(item.couponIncome)}}</i>
                            </span>
                <span class="room5">{{item.dueDate}}</span>
                <span class="room6">{{setStatus(item.status)}}</span>
                <span class="room7 go-downstairs" @click="showToggle(index,item.trdNum)">查看詳情</span>
                <a target="_blank" class="room8" :href="'/agreement/'+item.prdCode+'/'+item.trdNum">查看協議</a>
              </div>
              <div class="downstairs" v-if="detailNum == index">
                <img src="../assets/images/icon_arrow.png">
                <div class="downstairs-title">
                  <span class="base1">還款時間</span>
                  <span class="base2">預期本金(元)</span>
                  <span class="base3">預期利息(元)</span>
                  <span class="base4">實際本金(元)</span>
                  <span class="base5">實際利息(元)</span>
                  <span class="base6">加息券獎勵(元)</span>
                  <span class="base7">剩余本金(元)</span>
                  <span class="base8">還款狀態</span>
                  <span class="base9">還款到賬日</span>
                </div>
                <div class="next-floor">
                  <div class="cubicle" v-for="item in prdInfoList" v-if="prdInfoList.length!=0">
                    <span class="base1">{{item.dueDate}}</span>
                    <span class="base2">{{$fmoney(item.capital)}}</span>
                    <span class="base3">{{$fmoney(item.interests)}}</span>
                    <span class="base4">{{item.realCapital?$fmoney(item.realCapital):'--'}}</span>
                    <span class="base5">{{item.realInterests?$fmoney(item.realInterests):'--'}}</span>
                    <span class="base6">{{item.pInterests?$fmoney(item.pInterests):'--'}}</span>
                    <span class="base7">{{item.remainingCapital?$fmoney(item.remainingCapital):'--'}}</span>
                    <span class="base8">{{setReStatus(item.status)}}</span>
                    <span class="base9">{{item.repDate}}</span>
                  </div>
                  <vPagination v-if="prdInfoList.length>0 && prdInfo.totalPage>1"
                               :totalPage="prdInfo.totalPage"
                               :currentPage="prdInfo.pageIndex"
                               :pageFor="getProductInfo" :pageForArg="{trdNum:item.trdNum}">
                  </vPagination>
                  <div class="no-data" style="margin-top: 0;" v-if="prdInfoList.length==0">
                    <p>暫無詳情</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <vPagination v-if="investmentList.length>0 && investmentListInfo.totalPage>1"
                       :totalPage="investmentListInfo.totalPage"
                       :currentPage="$route.params.pageAt"
                       :withOutPageAtUrl="'/myAssets/'+$route.params.status+'/'">
          </vPagination>
          <div class="media" v-if="investmentList.length == 0 && $route.params.status==88" style="width: 300px;margin: 100px auto;">
            <div class="media-left">
              <img src="../assets/images/no_data.png"  style="width: 70px;">
            </div>
            <div class="media-body" style="line-height: 32px;padding-top: 20px;padding-left: 20px;">
              <p>您還沒有支持過任何項目，<br>去看看<a class="text-danger" href="/product-list/7/11/1" target="_blank">我們的項目</a>吧！</p>
            </div>
          </div>
          <div class="media" v-if="investmentList.length == 0 && $route.params.status!=88" style="width: 300px;margin: 100px auto;">
            <div class="media-left">
              <img src="../assets/images/no_data.png"  style="width: 70px;">
            </div>
            <div class="media-body" style="line-height: 32px;padding-top: 30px;padding-left: 20px;">
              <p class="text-muted" style="font-size: 16px;">暫無記錄</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import PersonalCenterMenu from '../components/PersonalCenterMenu'
  import vPagination from '../components/vPagination'

  export default {
    name: 'MyAssets',
    data () {
      return {
        statisticsView: [],
        investmentListInfo: {},
        investmentList: [],
        prdInfo: {},
        prdInfoList: [],
        detailNum: -1,
        TDK:{
          title:'我的資產-聚寶盆',
          keyWords:'網絡理財，互聯網理財，理財，投資，投資理財，個人投資，網貸平臺，網貸投資，網貸，互金，互聯網金融，互金平臺，互聯網金融平臺，聚寶盆，聚寶計劃，分期投，月月盈，年年余，財富，P2P',
          description:'聚寶盆是壹家綜合性互聯網金融平臺，聚寶盆為廣大個人投資理財的用戶提供多元化的選擇與優質的服務。投資理財用戶可通過加入聚寶計劃、分期投、月月盈、年年余等產品進行投資獲得穩定收益。',
        }
      }
    },
    components: {
      'leftMenu': PersonalCenterMenu,
      'vPagination': vPagination,
    },
    created(){
      var self = this
      // get資產總匯資訊
      self.$http.post('/pbap-web/action/statistics/query/personalProperties', {}).then((res) => {
        self.statisticsView = res.body.respInfo.statisticsView;
      })
      self.getInvestment(self.$route.params.status,self.$route.params.pageAt);
    },
    mounted () {
      $(".upstairs:odd").addClass('upstairs-high');
      // 產品狀態url
      document.querySelectorAll('#status a').forEach(function (el) {
        var statuUrl = '/myAssets/' + el.getAttribute('sta');
        el.setAttribute('href', statuUrl);
      })
    },
    beforeRouteUpdate (to, from, next){
      let params = to.params;
      this.investmentListInfo.totalPage = 0;
      this.detailNum = -1;
      this.getInvestment(params.status, params.pageAt);
      next();
    },
    methods: {
      // 累計收益提示按鈕
      alertMasssage: function () {
        $(".alert_mas").stop(true, true).fadeIn().delay(1200).fadeOut();
      },
      // 列表詳情展開&收起
      showToggle: function (index,trdNum) {
        var self = this
        if(self.detailNum != index){
          self.detailNum = index;
          self.getProductInfo({
            index:1,
            trdNum:trdNum
          });
        }else{
          self.detailNum = -1;
        }
      },
      getInvestment(status,pageAt){
        var self = this;
        self.$http.post('/pbap-web/action/investment/query/investmentList', {
          pageIndex: pageAt,
          pageSize: 10,
          status: status
        }).then((res) => {
          self.investmentListInfo = res.body.respInfo.investmentList;
          self.investmentList = self.investmentListInfo.dataList;
        })
      },
      getProductInfo(obj){
        var self = this;
        self.prdInfo.totalPage = 0;
        self.$http.post('/pbap-web/action/product/query/productInfo', {
          pageIndex: obj.index,
          pageSize: 10,
          trdNum: obj.trdNum
        }).then((res) => {
          self.prdInfo = res.body.respInfo.prdInfo.repList;
          self.prdInfoList = self.prdInfo.dataList;
        })
      },
      setStatus(status){
        switch (status) {
          case '11':
            return '進行中';
            break;
          case '14':
            return '已滿額';
            break;
          case '16':
            return '已過期';
            break;
            break;
          case '20':
            return '還款中';
            break;
          case '30':
            return '已還款';
            break;
          default:
            return ''
        }
      },
      setReStatus(status){
        switch (status) {
          case '0':
            return '未收';
            break;
          case '1':
            return '已收';
            break;
          case '2':
            return '已轉讓';
            break;
            break;
          case '9':
            return '作廢';
            break;
          default:
            return ''
        }
      }
    }
  }
</script>

