<template>
    <div class="wrap assetDetails-content">
        <PageNav message="/myAssets"></PageNav>
        <a href="" class="top-link">产品详情</a>
        <div class="basic-info">
            <div class="go-details">
                <i id="prdName">{{prdInfo.prdName}}</i>
                <span v-show="prdInfo.status == 11">进行中</span>
                <span v-show="prdInfo.status == 14">已满额</span>
                <span v-show="prdInfo.status == 16">已过期</span>
                <span v-show="prdInfo.status == 20">還款中</span>
                <span v-show="prdInfo.status == 30">已還款</span>
            </div>
            <div class="bottom">
                <div class="bar">
                    <span>投资金额 </span>
                    <i id="trdAmount">{{$fmoney(prdInfo.trdAmount)}}元</i>
                </div>
                <div class="bar">
                    <span>预期年化 </span>
                    <i id="rate">{{$fmoney(prdInfo.rate * 100)}}%</i>
                    <i class="text-orange" v-show="prdInfo.cpnInfo">+{{$formatNum(prdInfo.cpnInfo || 0,100)}}%</i>
                </div>
                <div class="bar">
                    <span>优惠券</span>
                    <i v-show="!prdInfo.cpnInfo">--</i>
                    <i v-show="prdInfo.cpnInfo">{{$formatNum(prdInfo.cpnInfo || 0,100)}}%加息</i>
                </div>
                <div class="bar">
                    <span>预期收益 </span>
                    <i id="incAmount">{{$fmoney(prdInfo.incAmount)}}元</i>
                    <i class="text-orange" v-show="prdInfo.pIncAmount">+{{$fmoney(prdInfo.pIncAmount)}}元</i>
                </div>
                <div class="bar">
                    <span>到期日</span>
                    <i id="dueDate">{{prdInfo.dueDate}}</i>
                </div>
                <div class="bar">
                    <span>投资协议 </span>
                    <a v-show="prdInfo.agrPath" :href="'/agreement/'+prdInfo.prdCode+'/0/1'">查看协议</a>
                    <a v-show="!prdInfo.agrPath" :href="'/agreement/'+prdInfo.prdCode+'/'+prdInfo.trdNum+'/0'">查看协议</a>
                </div>
            </div>
        </div>

        <v-scroll :on-refresh="onRefresh" :on-infinite="onInfinite" ref="hasBox">
            <div id="scheduleList" class="product-content mui-table-view mui-table-view-chevron">
                <div class="schedule" v-for="(item, index) in assetDetails">
                    <img src="../assets/images/dot_orange.jpg">
                    <i></i>
                    <div class="info">
                        <span class="arrow-left"></span>
                        <h1>還款时间<span>{{item.dueDate}}</span></h1>
                        <div>
                            <span>预期本金</span>
                            <font>{{$fmoney(item.capital)}}元</font>
                        </div>
                        <div>
                            <span>预期利息</span>
                            <font>{{$fmoney(item.interests)}}元</font>
                        </div>
                        <div>
                            <span>实际本金</span>
                            <font v-if="item.realCapital">{{$fmoney(item.realCapital)}}元</font>
                            <font v-else>--</font>
                        </div>
                        <div>
                            <span>实际利息</span>
                            <font v-if="item.realInterests">{{$fmoney(item.realInterests)}}元</font>
                            <font v-else>--</font>
                        </div>
                        <div>
                            <span>加息券奖励</span>
                            <font v-if="item.pInterests">{{$fmoney(item.pInterests)}}元</font>
                            <font v-else>--</font>
                        </div>
                        <div>
                            <span>剩余本金</span>
                            <font v-if="item.status==0">--</font>
                            <font v-else="!remainingCapital">0.00元</font>
                            <font v-else>{{$fmoney(item.remainingCapital)}}元</font>
                        </div>
                        <div>
                            <span>还款状态</span>
                            <font class="text-blue">{{setReStatus(item.status)}}</font>
                        </div>
                        <div class="repDate">
                            <span>還款到账日</span>
                            <font>{{item.repDate}}</font>
                        </div>
                    </div>
                </div>
            </div>
        </v-scroll>

    </div>
</template>

<script>
  import Scroll from '@/components/vPullupLoading'
  import PageNav from '@/components/PageNav'

  export default {
    name: 'AssetDetails',
    data() {
      return {
        pageTitle: '购买详情',
        trdNum: "",
        prdInfo: [],
        assetDetails: [],
        pageAt : 1,
        pageSize : 500, /*预期收益加息的值因一页读取数目相关*/
        pageStart : 0,
        pageEnd : 0,
      }
    },
    created(){
      var self = this;
      self.$store.commit('setPageTitle', self.pageTitle);

      self.trdNum = self.$route.params.trdNum;
      self.getInvestment(self.trdNum, 1);
    },
    components : {
      'v-scroll' : Scroll,
      'PageNav': PageNav,
    },
    methods:{
      // get列表
      getInvestment(trdNum,pageAt){
        var self = this;
        self.$http.post('/pbap-web/action/product/query/productInfo', {
          pageIndex: pageAt,
          pageSize: self.pageSize,
          trdNum: trdNum
        }).then((res) => {
          self.prdInfo = [];
          self.assetDetails = [];
          self.pageAt = pageAt;
          self.pageAt++;

          self.prdInfo = res.body.respInfo.prdInfo;
          self.prdType = self.prdInfo.prdType;
          self.prdCode = self.prdInfo.prdCode;
          self.goDetails(self.prdType,self.prdCode);

          if(self.prdInfo.repList.totalCount != 0){
            self.assetDetails = self.prdInfo.repList;

            if(self.assetDetails.totalCount == 0){
              this.$el.querySelector('.yo-scroll').style.display = 'none';
            }
            else {
              self.assetDetails = self.assetDetails.dataList;
              this.$el.querySelector('.load-more').innerHTML = '加载中……';
              if(self.assetDetails.pageIndex == self.assetDetails.totalPage){
                this.$el.querySelector('.load-more').innerHTML = '没有更多数据了';
              }
            }
          } else {
            //this.$el.querySelector('.yo-scroll').style.display = 'none';
            this.$el.querySelector('.yo-scroll').style.color = 'transparent';
          }

        }, (res) => {
          console.log('error' + res);
        });
      },
      onRefresh(done) {
        this.getInvestment(this.trdNum,1);
        done()
      },
      // 上拉加载
      onInfinite(done) {
        let self = this;
        self.$http.post('/pbap-web/action/product/query/productInfo',{
          pageIndex: self.pageAt,
          pageSize: self.pageSize,
          trdNum: self.trdNum
        }).then((res) => {
          self.pageAt++;
          self.pageEnd = self.pageSize * self.pageAt;
          self.pageStart = self.pageEnd - self.pageSize;

          let arr = res.body.respInfo.prdInfo.repList.dataList;
          self.assetDetails = self.assetDetails.concat(arr);

          if(self.assetDetails.pageIndex == self.assetDetails.totalPage){
            this.$el.querySelector('.load-more').innerHTML = '没有更多数据了';
          }
          done() // call done
        }, (response) => {
          console.log('error');
        });
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
            return '已转让';
            break;
            break;
          case '9':
            return '作废';
            break;
          default:
            return ''
        }
      },
      goDetails(prdType, prdCode){
        let goUrl;
        if(prdType == 40){
          goUrl = "/private/"+prdCode+"?asset=1"
        }
        else if(prdType == 50){
          goUrl = "/parent-child-detail/"+prdCode+"?asset=1"
        }
        else {
          goUrl = "/product/"+prdCode+"?asset=1"
        }
        this.$el.querySelector('.top-link').setAttribute('href', goUrl);

      }
    }


  }
</script>
