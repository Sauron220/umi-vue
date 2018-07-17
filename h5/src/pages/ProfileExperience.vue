<template>
    <div class="wrap profileExperience-content">
        <PageNav message="/profile"></PageNav>
        <a class="mui-pull-right mui-text previous-record" @click="tips = !tips">使用说明</a>
        <div class="cusStatisticsDet clearfix">
            <div class="box" style="border-right:1px solid #fff">
                <p id="stsIncome">{{$fmoney(statisticsDet.stsIncome || 0)}}</p>
                <span>总收益（元）</span>
            </div>
            <div class="box">
                <p id="stsCollect">{{$fmoney(statisticsDet.stsCollect || 0)}}</p>
                <span>待领取（元）</span>
            </div>
            <button v-if="!statisticsDet.stsCollect || statisticsDet.stsCollect==0"
                    class="getTicket getTicket-disabled disabled">领取</button>
            <button v-if="statisticsDet.stsCollect && statisticsDet.stsCollect!=0"
                    class="getTicket" @click="withDraw()">领取</button>
        </div>

        <ul class="nav clearfix list-unstyled">
            <li @click="setTabType(0)" :class="{'nav-high' : tabType==0}" id="ticket-btn" style="border-right:1px solid #d9d9d9">体验金券</li>
            <li @click="setTabType(1)" :class="{'nav-high' : tabType==1}" id="record-btn">投资记录</li>
        </ul>

        <div class="experience-box ticket_box">
            <scroller :on-refresh="refreshCoupon" v-show="tabType == 0 && couponListInfo.totalCount != 0"
                      :on-infinite="infiniteCoupon" style="margin-top: 20px;">
                <div class="ticket-bar clearfix" v-for="item in couponList">
                    <span class="ticket-used" v-if="item.status==1"></span>
                    <span class="ticket-expired" v-if="item.status==2"></span>
                    <div class="left">
                        <span class="cpnInfo">{{$fmoney(item.cpnInfo)}}元</span>
                        <span class="date">有效日期：{{item.beginTime}} — {{item.endTime}}</span>
                        <span class="short">适用产品：体验标</span>
                        <a :href="'/experience/'+product.prdCode+'/'+item.cpnNum+'/'+item.cpnInfo" class="go-detail" v-if="item.status==0">立即使用>></a>
                    </div>
                    <div class="right">体验金</div>
                </div>
            </scroller>
            <div id="noTicketList" class="no-content" style="display: block" v-if="tabType == 0 && couponListInfo.totalCount == 0">
                <img class="center-img" src="../assets/images/giraffe_none.png">
                <p class="center-text">暂无体验金券</p>
            </div>
            <scroller :on-refresh="refreshRecord" v-show="tabType == 1 && recordListInfo.totalCount != 0"
                      :on-infinite="infiniteRecord" style="margin-top: 20px;">
                <div class="record-bar clearfix" v-for="item in recordList">
                    <span class="title">{{item.prdName}}</span>
                    <div class="bottom clearfix">
                        <div><span>投资金额：</span>{{$fmoney(item.trdAmount)}}元</div>
                        <div><span>投资日期：</span>{{item.trdDate}}</div>
                        <div><span>预计收益：</span>{{$fmoney(item.incomeAmount)}}元</div>
                        <div><span>到期日：</span>{{item.dueDate}}</div>
                    </div>
                </div>
            </scroller>
            <div id="noRecordList" class="no-content" style="display: block" v-if="tabType == 1 && recordListInfo.totalCount == 0">
                <img class="center-img" src="../assets/images/giraffe_none.png">
                <p class="center-text">暂无投资记录</p>
            </div>
        </div>

        <div class="mui-views" v-if="tips">
            <header class="top-nav">
                <div class="nav-box mui-bar mui-bar-nav">
                    <a @click="tips = !tips" class="go-back mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
                    <h1 class="mui-title">使用说明</h1>
                </div>
                <div class="top-space"></div>
            </header>
            <div class="mui-page-content">
                <ul>
                    <li>体验金是聚寶盆赠送给用户的一种虚拟货币，不显示在用户的可用余额中，不可提现，仅限投资体验标使用，不可投资其他标的。</li>
                    <li>投资体验标产生的收益以奖励的形式发放给用户，该收益可直接提现。</li>
                </ul>
            </div>
        </div>
        <vOpenFloat v-if="isOpen" :vOpenAccBl="vOpenAcc"></vOpenFloat>
    </div>
</template>

<script>
  import Scroll from '@/components/vPullupLoading'
  import PageNav from '@/components/PageNav'
  import vOpenFloat from '@/components/vOpenFloat'

  export default {
    name: 'ProfileExperience',
    data() {
      return {
        pageTitle: '体验金',
        tips: false,
        prdCode: null,
        statisticsDet: {},
        couponListInfo: {
          totalPage: 0
        },
        couponList: [],
        recordListInfo: {
          totalPage: 0
        },
        recordList: [],
        tabType:0,
        currentPage:1,
        currentPageRecord:1,
        custInfo:0,
        isOpen: false,
        vOpenAcc: '',
      }
    },
    created(){
      var self = this;
      self.$store.commit('setPageTitle', self.pageTitle);
      self.$http.post('/pbap-web/action/product/query/lastNewcomerPrd', {
        prdType: 70,
      }).then((res) => {
        self.product = res.body.respInfo.product || {};
      });

      if(this.$route.query && this.$route.query.tab == "2"){
        self.tabType = 1
      }

      self.$http.post('/pbap-web/action/statistics/query/cusStatisticsDet', {
        prdType: 70,
      }).then((res) => {
        self.statisticsDet = res.body.respInfo.statisticsDet || {};
      });

      self.getCoupon(0,self.currentPage,function (res) {
        self.couponListInfo = res.body.respInfo.couponInfo;
        self.couponList = self.couponListInfo.dataList;
      });

      self.getRecord(1,function (res) {
        self.recordListInfo = res.body.respInfo.investmentList;
        self.recordList = self.recordListInfo.dataList;
      });

      // 判断用户是否实名&儲值提现按钮
      self.$http.post('/pbap-web/action/customer/query/custAuthInfo', {}).then((res) => {
        self.custInfo = res.body.respInfo.custInfo;
      });

    },
    components: {
      'PageNav': PageNav,
      'vOpenFloat': vOpenFloat,
    },
    methods: {
      getCoupon(status, pageAt,callback){
        var self = this;
        self.$http.post('/pbap-web/action/customer/query/myCoupon', {
          pageIndex: pageAt,
          pageSize: 10,
          status: status,
          cpnType: '03',
        }).then((res) => {
          callback && callback(res);
        })
      },
      getRecord(pageAt,callback){
        var self = this;
        self.$http.post('/pbap-web/action/investment/query/experInvestList', {
          pageIndex: pageAt,
          pageSize: 10,
        }).then((res) => {
          callback && callback(res);
        })
      },
      refreshCoupon(done) {
        var self = this;
        self.currentPage = 1;
        self.getCoupon(0,self.currentPage,function (res) {
          let returnVal = res.body.respInfo.couponInfo.dataList.length == 0;
          done(returnVal);
          return
        });
      },
      infiniteCoupon(done){
        var self = this;
        self.currentPage++;
        self.getCoupon(0,self.currentPage,function (res) {
          self.couponList = self.couponList.concat(res.body.respInfo.couponInfo.dataList);
          let returnVal = res.body.respInfo.couponInfo.dataList.length == 0;
          done(returnVal);
          return
        });
      },
      refreshRecord(done) {
        var self = this;
        self.currentPageRecord = 1;
        self.getRecord(self.currentPageRecord,function (res) {
          let returnVal = res.body.respInfo.investmentList.dataList.length == 0;
          done(returnVal);
          return
        });
      },
      infiniteRecord(done){
        var self = this;
        self.currentPageRecord++;
        self.getRecord(self.currentPageRecord,function (res) {
          self.recordList = self.recordList.concat(res.body.respInfo.investmentList.dataList);
          let returnVal = res.body.respInfo.investmentList.dataList.length == 0;
          done(returnVal);
          return
        });
      },
      setTabType(val){
        this.tabType = val;
      },
      withDraw(){
        var self = this;
        if(self.custInfo.tpStatus == 1){
          if(self.custInfo.activateStatus == 1){
            self.isActive = true;
            if(self.statisticsDet.stsCollect){
              self.$http.post('/pbap-web/action/trade/add/getExpInterests',{
                trdAmount:self.statisticsDet.stsCollect,
                bankChannel:0,
                remark:'',
              }).then((res) => {
                if(res.body.errorInfo.errorCode == '0000'){
                  self.statisticsDet.stsCollect = 0;
                  self.$store.commit('setModal', {
                    type: 'alert',
                    msg: '领取成功，请关注您的账户余额！',
                  });
                  self.$store.commit('showModal');
                }
              })
            }
          }else{
            self.isOpen = true;
            self.vOpenAcc = false;
            self.isActive = false;
          }
        }else{
          self.isOpen = true;
          self.vOpenAcc = true;
          self.isActive = false;
        }
      }
    }
  }
</script>
<style>
    .no-data-text{
        display: none;
    }
</style>
