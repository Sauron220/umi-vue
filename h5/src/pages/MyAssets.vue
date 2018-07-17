<template>
  <div class="wrap myAssets-content">
    <PageNav message="/profile"></PageNav>
    <div class="assets">
      <h1>
        投资总额（元）<span id="investmentAmount">{{$fmoney(statisticsView.investmentAmount)}}</span>
      </h1>
      <div class="profit clearfix">
        <div>
          预期收益<br> <span><i id="benifitAmountExp">{{$fmoney(statisticsView.benifitAmountExp)}}</i>元</span>
        </div>
        <div id="alert" @click="alertInfo()">
          累计收益<br> <span><i id="benifitAmount">{{$fmoney(statisticsView.benifitAmount)}}</i>元</span>
        </div>
      </div>
    </div>

    <ul class="assets-nav clearfix">
      <li id="assets1" :class="{'assets-high': status == 11}" @click="getInvestment(11,1)">
        <router-link to="/myAssets/11/1">进行中</router-link>
      </li>
      <li id="assets2" :class="{'assets-high': status == 30}" @click="getInvestment(30,1)">
        <router-link to="/myAssets/30/1">已還款</router-link>
      </li>
    </ul>

    <v-scroll :on-refresh="onRefresh" :on-infinite="onInfinite" ref="hasBox">
      <div id="couponList" class="product-content mui-table-view mui-table-view-chevron">
        <div class="time" v-for="(item, index) in investmentList">
          <a :href="'/assetDetails/'+item.trdNum" class="go-details">{{item.prdName}}
            <span v-show="item.status == 11">进行中</span>
            <span v-show="item.status == 14">已满额</span>
            <span v-show="item.status == 16">已过期</span>
            <span v-show="item.status == 20">還款中</span>
            <span v-show="item.status == 30">已還款</span>
          </a>
          <div class="bottom clearfix">
            <div class="bar">
              <span>投资金额</span>
              <p class="text-orange">{{$fmoney(item.trdAmount)}}元</p>
            </div>
            <div class="bar">
              <span>预期年化</span>
              <p>{{$fmoney(item.rate * 100)}}%
                <i class="text-orange" v-if="item.cpnInfo"> + {{$formatNum(item.cpnInfo || 0,100)}}%</i>
              </p>
            </div>
            <div class="bar">
              <span>预期收益</span>
              <p>{{$fmoney(item.incomeAmount)}}元
                <i class="text-orange" v-if="item.couponIncome"> + {{$fmoney(item.couponIncome)}}元</i>
              </p>
            </div>
            <div class="bar">
              <span>到期日</span>
              <p>{{item.dueDate}}</p>
            </div>
          </div>
        </div>
      </div>
    </v-scroll>

    <div class="no-content" ref="noBox">
      <img src="../assets/images/giraffe_none.png" class="center-img">
      <p class="center-text">暂无资产记录</p>
    </div>

  </div>
</template>

<script>
  import Scroll from '@/components/vPullupLoading'
  import PageNav from '@/components/PageNav'

  export default {
    name: 'MyAssets',
    data () {
      return {
        pageTitle: '我的资产',
        statisticsView: [],
        investmentList: [],
        pageAt : 1,
        pageSize : 10,
        pageStart : 0,
        pageEnd : 0,
        status : 11,
      }
    },
    created(){
      var self = this;
      self.$store.commit('setPageTitle', self.pageTitle);
      // get资产总汇資訊
      self.$http.post('/pbap-web/action/statistics/query/personalProperties', {}).then((res) => {
          self.statisticsView = res.body.respInfo.statisticsView;
      });

      self.getInvestment(11, 1);

    },
    components : {
      'v-scroll' : Scroll,
      'PageNav': PageNav,
    },
    methods:{
      alertInfo() {
        this.$store.commit('setModal', {
          type: 'alert',
          msg: '只有当您购买的产品還款后才会计入累计收益',
        });
        this.$store.commit('showModal');
      },
      // get列表
      getInvestment(status,pageAt){
        var self = this;
        self.$http.post('/pbap-web/action/investment/query/investmentList', {
          pageIndex: pageAt,
          pageSize: self.pageSize,
          status: status
        }).then((res) => {
          self.investmentList = [];
          self.pageAt = pageAt;
          self.status = status;
          let investment = res.body.respInfo.investmentList;

          if(investment.totalCount == 0){
            this.$refs.noBox.style.display = "block";
            this.$el.querySelector('.yo-scroll').style.display = 'none';
          }
          else {
            this.$refs.noBox.style.display = "none";
            this.$el.querySelector('.yo-scroll').style.display = 'block';
            self.pageAt++
            self.$refs.hasBox.refreshScroll();
            self.investmentList = investment.dataList;

            this.$el.querySelector('.load-more').innerHTML = '加载中……';
            if(investment.pageIndex == investment.totalPage){
              this.$el.querySelector('.load-more').innerHTML = '没有更多数据了';
            }
          }

        }, (res) => {
          console.log('error' + res);
        });
      },
      onRefresh(done) {
        this.getInvestment(this.status,1);
        done()
      },
      // 上拉加载
      onInfinite(done) {
        let self = this;
        self.$http.post('/pbap-web/action/investment/query/investmentList',{
          pageIndex: self.pageAt,
          pageSize: self.pageSize,
          status: self.status
        }).then((res) => {
          self.pageAt++;
          self.pageEnd = self.pageSize * self.pageAt;
          self.pageStart = self.pageEnd - self.pageSize;
          let investment = res.body.respInfo.investmentList;

          let arr = investment.dataList;
          self.investmentList = self.investmentList.concat(arr);

          if(investment.pageIndex == investment.totalPage){
            this.$el.querySelector('.load-more').innerHTML = '没有更多数据了';
          }
          done() // call done
        }, (response) => {
          console.log('error');
        });
      },
    }
  }
</script>
