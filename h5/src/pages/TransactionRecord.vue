<template>
    <div class="wrap transactionRecord-content">
        <PageNav message="/profile"></PageNav>
        <span class="funnel" @click="openList">
            <span v-show="tradeType == 'CO'">儲值</span>
            <span v-show="tradeType == 'WD'">提现</span>
            <span v-show="tradeType == 'IV'">投资</span>
            <span v-show="tradeType == 'RP'">還款</span>
            <span v-show="tradeType == 'RF'">退款</span>
            <span v-show="tradeType == 'BN'">红包</span>
        </span>
        <div class="mask0" v-show="thisList == true"></div>
        <div class="funnel-box" :class="{'funnel-box-high':thisList == true}">
            <div @click="getTransactionRecord('CO',1)" class="spot icon-funnel01 clearfix">
                <router-link :class="{'span-high': tradeType == 'CO'}" to="/transactionRecord/CO/1">儲值</router-link>
            </div>
            <div @click="getTransactionRecord('WD',1)" class="spot icon-funnel02 clearfix">
                <router-link :class="{'span-high': tradeType == 'WD'}" to="/transactionRecord/WD/1">提现</router-link>
            </div>
            <div @click="getTransactionRecord('IV',1)" class="spot icon-funnel03 clearfix">
                <router-link :class="{'span-high': tradeType == 'IV'}" to="/transactionRecord/IV/1">投资</router-link>
            </div>
            <div @click="getTransactionRecord('RP',1)" class="spot icon-funnel04 clearfix">
                <router-link :class="{'span-high': tradeType == 'RP'}" to="/transactionRecord/RP/1">還款</router-link>
            </div>
            <div @click="getTransactionRecord('RF',1)" class="spot icon-funnel05 clearfix">
                <router-link :class="{'span-high': tradeType == 'RF'}" to="/transactionRecord/RF/1">退款</router-link>
            </div>
            <div @click="getTransactionRecord('BN',1)" class="spot icon-funnel06 clearfix">
                <router-link :class="{'span-high': tradeType == 'BN'}" to="/transactionRecord/BN/1">红包</router-link>
            </div>
        </div>

        <v-scroll :on-refresh="onRefresh" :on-infinite="onInfinite" ref="hasBox">
            <div id="recordList" class="product-content mui-table-view mui-table-view-chevron">
                <div class="time-list clearfix" v-for="(item, index) in tradeInfo">
                    <div class="dataYear" v-show="item.date">{{adjustMonth(item.date)}}</div>
                    <a :href="'/transactionDetails/'+a.trdNum+'/'+tradeType" class="time-box" v-for="a in item.pagingData.dataList">
                        <img class="dot" src="../assets/images//dot_orange.jpg">
                        <i class="line"></i>
                        <span class="arrow-left"></span>
                        <div class="info">
                            <div class="left-cont"><i>{{a.recordDay}}</i>日</div>
                            <div class="right-cont">
                                <div class="data-type">
                                    <span v-show="tradeType == 'CO'">儲值</span>
                                    <span v-show="tradeType == 'WD'">提现</span>
                                    <span v-show="tradeType == 'IV'">投资</span>
                                    <span v-show="tradeType == 'RP'">還款</span>
                                    <span v-show="tradeType == 'RF'">退款</span>
                                    <span v-show="tradeType == 'BN'">红包</span>
                                    <div class="record" v-show="tradeType == 'IV' ||tradeType == 'WD'"
                                         :class="{'record-reduce': tradeType =='IV' || tradeType =='WD'}">
                                        <i class="increaseReduce">-</i>
                                        {{$fmoney(a.trdAmount)}}
                                    </div>

                                    <div class="record" v-show="tradeType == 'CO' || tradeType == 'RP' || tradeType == 'RF' || tradeType == 'BN'"
                                         :class="{'record-increase': tradeType =='CO' || tradeType =='RP' || tradeType =='RF' || tradeType =='BN'}">
                                        <i class="increaseReduce">+</i>
                                        {{$fmoney(a.trdAmount)}}
                                    </div>
                                </div>
                                <div class="record-right">
                                    <i>{{a.preTime}}</i>
                                    <div class="trd-status trd-gray">{{getTrdStatus(a.trdStatus,$route.params.tradeType)}}</div>
                                </div>
                            </div>
                        </div>
                    </a>

                </div>
            </div>
        </v-scroll>

        <div class="no-content" ref="noBox">
            <img src="../assets/images/giraffe_none.png" class="center-img">
            <p class="center-text">暂无数据</p>
        </div>
    </div>
</template>

<script>
  import Scroll from '@/components/vPullupLoading'
  import PageNav from '@/components/PageNav'
  export default {
    name: 'TransactionRecord',
    data() {
      return {
        pageTitle: '交易记录',
        thisList: false,
        tradeInfo: [],
        pageAt : 1,
        pageSize : 10,
        pageStart : 0,
        pageEnd : 0,
        tradeType : '',
      }
    },
    created(){
      var self = this;
      self.$store.commit('setPageTitle', self.pageTitle);

      self.getTransactionRecord(self.$route.params.tradeType, 1);
      self.adjustMonth()
    },
    components : {
      'v-scroll' : Scroll,
      'PageNav': PageNav,
    },
    methods: {
      // 打开筛选
      openList(){
        if(this.thisList == true){
          this.thisList = false;
        }else{
          this.thisList = true
        }
      },
      getTransactionRecord(tradeType,pageAt){
        var self = this;
        self.thisList = false;
        self.$http.post('/pbap-web/action/trade/query/tradeList', {
          pageIndex: pageAt,
          pageSize: 10,
          tradeType: tradeType
        }).then((res) => {
          self.tradeInfo = [];
          self.pageAt = pageAt;
          self.tradeType = tradeType;

          if(res.body.respInfo.tradeInfo.length == 0){
            this.$refs.noBox.style.display = "block";
            this.$el.querySelector('.yo-scroll').style.display = 'none';
          }
          else {
            this.$refs.noBox.style.display = "none";
            this.$el.querySelector('.yo-scroll').style.display = 'block';
            self.pageAt++;
            self.$refs.hasBox.refreshScroll();

            self.tradeInfo = res.body.respInfo.tradeInfo;
            let nowPage = self.tradeInfo[0].pagingData.pageIndex;

            this.$el.querySelector('.load-more').innerHTML = '加载中……';
            if(nowPage == self.tradeInfo[0].pagingData.totalPage){
              this.$el.querySelector('.load-more').innerHTML = '没有更多数据了';
            }
          }

        }, (res) => {
          console.log('error' + res);
        });
      },
      onRefresh(done) {
        this.getTransactionRecord(this.tradeType,1);
        done()
      },
      // 上拉加载
      onInfinite(done) {
        let self = this;
        self.$http.post('/pbap-web/action/trade/query/tradeList',{
          pageIndex: self.pageAt,
          pageSize: 10,
          tradeType: self.tradeType
        }).then((res) => {
          self.pageAt++;
          self.pageEnd = self.pageSize * self.pageAt;
          self.pageStart = self.pageEnd - self.pageSize;
          let nowPage = self.tradeInfo[0].pagingData.pageIndex;
          let arrOld = self.tradeInfo;
          let arrNew = res.body.respInfo.tradeInfo;
          let i = arrOld.length-1;

          if(arrNew[0] && arrOld[i].date == arrNew[0].date){
            self.tradeInfo[i].pagingData.dataList = self.tradeInfo[i].pagingData.dataList.concat(arrNew[0].pagingData.dataList);
            arrNew.splice(0,1)
          } else {
            this.$el.querySelector('.load-more').innerHTML = '没有更多数据了';
          }

          self.tradeInfo = self.tradeInfo.concat(arrNew);

          if(nowPage == self.tradeInfo[0].pagingData.totalPage){
            this.$el.querySelector('.load-more').innerHTML = '没有更多数据了';
          }
          done() // call done
        }, (response) => {
          console.log('error');
        });
      },
      getTrdStatus(trdStatus,tradeType){
        let tStatus;
        if(trdStatus == 0 || trdStatus == 1){
          if(tradeType == "WD" && trdStatus == 1){
            tStatus = '交易成功'
          }else{
            tStatus = '交易处理中'
          }
        }else{
          switch (trdStatus){
            case '7':
              tStatus = '退款';
              break;
            case '8':
              tStatus = '交易成功';
              break;
            case '9':
              tStatus = '交易失败';
              break;
            default:
              tStatus = '--';
              break;
          }
        }
        return tStatus;
      },
      adjustMonth(p){
        if(p){
          let tmpY = p.substring(0, 4);
          let tmpM = p.substring(4);
          let newstr = tmpY + '年' + tmpM + '月';
          return newstr
        }
      }

    }
  }
</script>
