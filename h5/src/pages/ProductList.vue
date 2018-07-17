<template>
    <div class="wrap productList-content">
        <div class="mask0" v-if="thisList == true"></div>
        <section class="productList-header">
            <h2 id="screen-products" @click="openList">
                <span v-show="$route.params.prdType == 0">全部产品</span>
                <span v-show="$route.params.prdType == 30">新手专享</span>
                <span v-show="$route.params.prdType == 7">月月喜</span>
                <span v-show="$route.params.prdType == 8">季季宝</span>
                <span v-show="$route.params.prdType == 9">双季盈</span>
                <span v-show="$route.params.prdType == 10">年年余</span>
                <span v-show="$route.params.prdType == 40">尊享计划</span>
            </h2>
            <ul class="list" v-if="thisList == true">
                <li :class="{'list-high':$route.params.prdType == 0}" @click="getProductList('0', 1)">
                    <a href="/product-list/0/1">全部产品</a>
                </li>
                <li :class="{'list-high':$route.params.prdType == 30}" @click="getProductList('30', 1)">
                    <a href="/product-list/30/1">新手专享</a>
                </li>
                <li :class="{'list-high':$route.params.prdType == 7}" @click="getProductList('7', 1)">
                    <a href="/product-list/7/1">月月喜</a>
                </li>
                <li :class="{'list-high':$route.params.prdType == 8}" @click="getProductList('8', 1)">
                    <a href="/product-list/8/1">季季宝</a>
                </li>
                <li :class="{'list-high':$route.params.prdType == 9}" @click="getProductList('9', 1)">
                    <a href="/product-list/9/1">双季盈</a>
                </li>
                <li :class="{'list-high':$route.params.prdType == 10}" @click="getProductList('10', 1)">
                    <a href="/product-list/10/1">年年余</a>
                </li>
                <li :class="{'list-high':$route.params.prdType == 40}" @click="getProductList('40', 1)">
                    <a href="/product-list/40/1">尊享计划</a>
                </li>
            </ul>
        </section>

        <v-scroll :on-refresh="onRefresh" :on-infinite="onInfinite" ref="hasBox">
            <div id="productList" class="product-content mui-table-view mui-table-view-chevron">
                <div class="product-bar" v-for="(item, index) in productList.dataList">
                    <div class="due-mask" v-show="item.status == '14' ||
                                                  item.status == '16' ||
                                                  item.status == '20' ||
                                                  item.status == '30'">
                    </div>
                    <a class="due-href" :href="'/private/' + item.prdCode" v-if="item.prdType=='40'"></a>
                    <a class="due-href" :href="'/product/' + item.prdCode" v-else></a>
                    <div class="top">
                        <span class="name">{{item.prdName}}</span>
                        <span class="much">产品金额：{{$fmoneyFormat(item.prdAmount)}}元</span>
                    </div>
                    <div class="bottom clearfix">
                        <div class="return-rate">
                            <span>预期年化</span>
                            <i>{{productRate(item.defaultRate)}}</i>
                        </div>
                        <div class="addHao" v-if="item.rewardRate">+</div>
                        <div class="addHao" v-if="!item.rewardRate"></div>
                        <div class="return-rate">
                            <span>年化奖励</span>
                            <i v-if="item.rewardRate">{{productRate(item.rewardRate)}}</i>
                        </div>
                        <div class="term">
                            <span>借款期限</span>
                            <div class="bor">
                                <i>{{item.prdPeriod}}</i>天
                            </div>
                        </div>
                        <div class="minInvAmt">
                            <span>起投金额</span>
                            <div class="bor">
                                <i v-if="$route.params.prdType == 40">{{$fmoneyFormat((item.minInvAmt/10000) || 0)}}万元</i>
                                <i v-else>{{$fmoneyFormat(item.minInvAmt || 0)}}元</i>
                            </div>
                        </div>
                        <div class="pie-chart">
                            <vue-circle
                                v-show="item.status == '11'"
                                :id="'circle'+index"
                                :progress= item.colPercent
                                :size="66"
                                :reverse="false"
                                line-cap="round"
                                :fill="fill"
                                empty-fill="rgba(0, 0, 0, .1)"
                                :animation-start-value="0.0"
                                :start-angle="-1.5"
                                insert-mode="append"
                                :thickness="3"
                                :show-percent="true"
                                >
                            </vue-circle>
                            <div class="over-circle"
                                 v-show="item.status == '12' ||
                                  item.status == '14' ||
                                  item.status == '16' ||
                                  item.status == '20' ||
                                  item.status == '30'">
                                <span v-show="item.status == '12'">预热中</span>
                                <span v-show="item.status == '14'">已满额</span>
                                <span v-show="item.status == '16'">已过期</span>
                                <span v-show="item.status == '20'">還款中</span>
                                <span v-show="item.status == '30'">已還款</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </v-scroll>

        <div class="no-content" ref="noBox">
            <img class="center-img" src="../assets/images/giraffe_none.png">
            <span class="center-text">暂无产品</span>
        </div>

        <div class="pageFooter mui-bar mui-bar-tab">
            <div class="nav">
                <router-link class="nav-item" to="/">
                    <i class="mui-icon icon-homepage"></i>首页
                </router-link>
                <router-link class="nav-item" style="color: #FFBF00" :to="{ name: 'ProductList', params: { prdType: $route.params.prdType,pageAt:1 }}" v-if="$route.params.prdType" >
                    <i class="mui-icon icon-invest-active"></i>理财
                </router-link>
                <router-link class="nav-item" style="color: #FFBF00" to="/product-list/0/1" v-else>
                    <i class="mui-icon icon-invest-active"></i>理财
                </router-link>
                <a class="nav-item" :href="discoverUrl">
                    <i class="mui-icon icon-discover"></i>发现
                </a>
                <router-link class="nav-item" to="/profile">
                    <i class="mui-icon icon-profile"></i>我的
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
  import Tool from '../util/ProductTool.js'
  import Scroll from '@/components/vPullupLoading'
  import VueCircle from 'vue2-circle-progress'

  export default {
    name: 'ProductList',
    data () {
      return {
        thisList: false,
        productList: [],
        pageAt : 1, //默认已经显示出15条数据 count等于一是让从16条开始加载
        pageSize : 10,  // 一次显示多少条
        pageStart : 0, // 开始页数
        pageEnd : 0, // 结束页数
        fill : { gradient: ["#ffbf00"] },
        discoverUrl: '',
      }
    },
    created () {
      let self = this;
      let params = self.$route.params;
      self.getProductList(params.prdType, params.pageAt);

      self.$http.post('/pbap-web/action/resource/query/domainUrlList?header', {}).then((res) => {
        let mevsUrl = res.body.respInfo.mevs;
        if (mevsUrl) {
          self.discoverUrl = mevsUrl + "h5/discover.html"
        }
      });
    },
    components : {
      'v-scroll' : Scroll,
      VueCircle
    },
    methods: {
      productRate:Tool.productRate,
      getHref(val){
        return 'https://cnodejs.org/topic/'+val
      },
      // 打开筛选
      openList(){
        if(this.thisList == true){
          this.thisList = false;
        }else{
          this.thisList = true
        }
      },
      // get列表
      getProductList(prdType, pageAt){
        var self = this;
        self.thisList = false;
        if (prdType == 0) {
          prdType = ''
        }

        self.$http.post('/pbap-web/action/product/query/prdList', {
          pageSize: self.pageSize,
          prdType: prdType,
          pageIndex: pageAt
        }).then((res) => {
          self.productList = [];
          self.pageAt = pageAt;
          self.prdType = prdType;

          if(res.body.respInfo.prdList.totalPage == 0){
            this.$refs.noBox.style.display = "block";
            this.$el.querySelector('.yo-scroll').style.display = 'none';
          }
          else {
            this.$refs.noBox.style.display = "none";
            this.$el.querySelector('.yo-scroll').style.display = 'block';
            self.pageAt++;
            self.$refs.hasBox.refreshScroll();

            self.productList = res.body.respInfo.prdList;
            let nowPage = self.productList.pageIndex;
            this.$el.querySelector('.load-more').innerHTML = '加载中……';
            if(nowPage == self.productList.totalPage){
              this.$el.querySelector('.load-more').innerHTML = '没有更多数据了';
            }
          }

        }, (res) => {
          console.log('error' + res);
        });
      },
      onRefresh(done) {
        this.getProductList(this.$route.params.prdType, 1);
        done()
      },
      // 上拉加载
      onInfinite(done) {
        let self = this;
        self.$http.post('/pbap-web/action/product/query/prdList',{
          pageSize: self.pageSize,
          prdType: this.$route.params.prdType,
          pageIndex: self.pageAt
        }).then((res) => {
          self.pageAt++;
          self.pageEnd = self.pageSize * self.pageAt;
          self.pageStart = self.pageEnd - self.pageSize;
          let nowPage = res.body.respInfo.prdList.pageIndex;

          let arr = res.body.respInfo.prdList.dataList;
          self.productList.dataList = self.productList.dataList.concat(arr);

          if(nowPage == res.body.respInfo.prdList.totalPage){
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















