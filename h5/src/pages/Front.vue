<template>
  <div class="wrap front">
    <!--<div class="mui-bar mui-bar-nav text-center" v-show="showHeader">
      <div class="mui-title">聚寶盆</div>
    </div>
    <div class='swiper-container'>
      <div class='swiper-wrapper'>
        <a :href="item.resLink || 'javascript:;'" class="swiper-slide" v-for="item in banners">
          <img class="img-responsive" :src="item.resUri" alt="">
        </a>
      </div>
      <div class="pagination"></div>
    </div>
    <div class="notice">
      <a href="/notice-list?ind=f" class="title">平台公告</a>
      <div class="content">
        <div class="item ell">
          <a :href="'/notice/'+notice.newsId">{{notice.newsTitle}}</a>
        </div>
      </div>
    </div>
    <div class="top">
      <div class="top_line_bot">
        <div class="top_tj">
          <img src="../assets/images/index_01.png" />
          <div class="top_inv">
            <p class="top_p1">已平稳运营时间</p>
            <p class="top_p2" id="operateDay"><span>{{ webSiteInfo.operateDay }}</span><i>天</i></p>
          </div>
        </div>
        <div class="top_tj top_tj2">
          <img src="../assets/images/index_02.png" />
          <div class="top_inv">
            <p class="top_p1">累计投资金额</p>
            <p class="top_p2" id="investmentAmount"><span>{{ webSiteInfo.investmentAmount }}</span><i>元</i></p>
          </div>
        </div>
      </div>
    </div>
    <div class="top" style="margin-top: 0;">
      <div class="top_line_bot" style="border-bottom: none;">
        <div class="top_tj">
          <img src="../assets/images/index_03.png" />
          <div class="top_inv">
            <p class="top_p1">累计注册人数</p>
            <p class="top_p2" id="investmentCount"><span>{{$fmoneyFormat(webSiteInfo.investmentCount)}}</span><i>人</i></p>
          </div>
        </div>
        <div class="top_tj top_tj2">
          <img src="../assets/images/index_04.png" />
          <div class="top_inv">
            <p class="top_p1">累计赚取收益</p>
            <p class="top_p2" id="income"><span>{{webSiteInfo.income}}</span><i>元</i></p>
          </div>
        </div>
      </div>
    </div>
    <div class="top home_top">
      <div class="top_line_bot">
        <a href="/about/aboutus">
          <div class="top_tj">
            <img src="../assets/images/index_05.png" />
            <div class="top_inv">
              <p class="top_p1">平台背景</p>
              <p class="top_p3">一个超有趣的理财平台</p>
            </div>
          </div>
        </a>
        <a href="/myRecommend?prev=1">
          <div class="top_tj top_tj2">
            <img src="../assets/images/index_06.png" />
            <div class="top_inv">
              <p class="top_p1">邀请好友</p>
              <p class="top_p3">壕友带你共享收益</p>
            </div>
          </div>
        </a>
      </div>
    </div>
    <div class="top home_top" style="margin-top: 0">
      <div class="top_line_bot" style="border-bottom: none">
        <a href="/infoDisclosure">
          <div class="top_tj">
            <img src="../assets/images/index_07.png" />
            <div class="top_inv">
              <p class="top_p1">資訊披露</p>
              <p class="top_p3">数据清晰投资保证</p>
            </div>
          </div>
        </a>
        <a href="/securityGuarantee">
          <div class="top_tj top_tj2">
            <img src="../assets/images/index_08.png" />
            <div class="top_inv">
              <p class="top_p1">安全保障</p>
              <p class="top_p3">资金安全再谈利益</p>
            </div>
          </div>
        </a>
      </div>
    </div>
    <a class="margin-top" href="/parent-child">
      <img src="../assets/images/baby_go.jpg" class="img-responsive">
    </a>
    <div class="margin-top product_factory">
      <div class="product_bar product_bar_new" v-for="item in products" v-if="item.prdType == 30">
        <a class="product_describe" href="/product-list/30/1">
          <h2>新手专享</h2>
          <img class="new_img pull-right" src="../assets/images/index_09.png" />
        </a>
        <a class="product_cont" :href="'/product/'+item.prdCode">
          <div class="profit">
            <h2>
              <span class="defaultRate7">{{$fmoney(item.defaultRate*100, 1)}}%</span>
              <i class="rewardRate7" v-show="item.rewardRate&&item.rewardRate!=0">+{{$fmoney(item.rewardRate*100,1)}}%</i>
            </h2>
          </div>
          <div class="date">
            <i id="minInvAmt">{{item.minInvAmt}}</i>元起投
          </div>
          <div class="index_can">
            <span class="per-num">{{ item.colPercent }}%</span>
            <div class="mui-progressbar-box">
              <div class="progressbar">
                <span :style="{'width':item.colPercent+'%'}"></span>
              </div>
            </div>
            <p class="period_day">期限<span id="NprdPeriod">{{item.prdPeriod}}</span>天 </p>
          </div>
        </a>
      </div>

      <div class="product_bar" v-for="item in products" v-if="item.prdType == 7">
        <a class="product_describe" href="/product-list/7/1">
          <h2>月月喜</h2>
          <i>往期记录</i>
        </a>
        <a class="product_cont name7" :href="'/product/'+item.prdCode">
          <div class="profit">
            <h2>
              <span class="defaultRate7">{{$fmoney(item.defaultRate*100, 1)}}%</span>
              <i class="rewardRate7" v-show="item.rewardRate&&item.rewardRate!=0">+{{$fmoney(item.rewardRate*100, 1)}}%</i>
            </h2>
          </div>
          <div class="date">
            <i class="starAmount7">{{item.minInvAmt}}</i>元起投
          </div>
          <div class="index_can">
              <span class="per-num">{{ item.colPercent }}%</span>
              <div class="mui-progressbar-box">
                <div class="progressbar">
                  <span :style="{'width':item.colPercent+'%'}"></span>
                </div>
              </div>
              <span class="per_col"></span>
              <p class="period_day">期限<span class="prdPeriod7">{{item.prdPeriod}}</span>天 </p>
            </div>
        </a>
      </div>

      <div class="product_bar" v-for="item in products" v-if="item.prdType == 8">
        <a class="product_describe" href="/product-list/8/1">
          <h2>季季宝</h2>
          <i>往期记录</i>
        </a>
        <a class="product_cont name7" :href="'/product/'+item.prdCode">
          <div class="profit">
            <h2>
              <span class="defaultRate7">{{$fmoney(item.defaultRate*100, 1)}}%</span>
              <i class="rewardRate7" v-show="item.rewardRate&&item.rewardRate!=0">+{{$fmoney(item.rewardRate*100, 1)}}%</i>
            </h2>
          </div>
          <div class="date">
            <i class="starAmount7">{{item.minInvAmt}}</i>元起投
          </div>
          <div class="index_can">
              <span class="per-num">{{ item.colPercent }}%</span>
              <div class="mui-progressbar-box">
                <div class="progressbar">
                  <span :style="{'width':item.colPercent+'%'}"></span>
                </div>
              </div>
              <span class="per_col"></span>
              <p class="period_day">期限<span class="prdPeriod7">{{item.prdPeriod}}</span>天 </p>
            </div>
        </a>
      </div>

      <div class="product_bar" v-for="item in products" v-if="item.prdType == 9">
        <a class="product_describe" href="/product-list/9/1">
          <h2>双季盈</h2>
          <i>往期记录</i>
        </a>
        <a class="product_cont name7" :href="'/product/'+item.prdCode">
          <div class="profit">
            <h2>
              <span class="defaultRate7">{{$fmoney(item.defaultRate*100, 1)}}%</span>
              <i class="rewardRate7" v-show="item.rewardRate&&item.rewardRate!=0">+{{$fmoney(item.rewardRate*100, 1)}}%</i>
            </h2>
          </div>
          <div class="date">
            <i class="starAmount7">{{item.minInvAmt}}</i>元起投
          </div>
          <div class="index_can">
              <span class="per-num">{{ item.colPercent }}%</span>
              <div class="mui-progressbar-box">
                <div class="progressbar">
                  <span :style="{'width':item.colPercent+'%'}"></span>
                </div>
              </div>
              <span class="per_col"></span>
              <p class="period_day">期限<span class="prdPeriod7">{{item.prdPeriod}}</span>天 </p>
            </div>
        </a>
      </div>
    </div>
    <a href="/securityGuarantee">
      <div class="home_bottom">
        <div class="b1">
          <span>严格甄选<br />优质产品 </span>
        </div>
        <div class="b2">
          <span>六层风控<br />安全保障 </span>
        </div>
        <div class="b3">
          <span>贴心服务<br />便捷流程 </span>
        </div>
      </div>
      <div class="bottom_high text-center">聚寶盆联手“上海银行”，实现资金存管</div>
    </a>
    <img src="../assets/images/index_10.png" style="width:100%" />
    <p class="bottom-alert text-center">理财有风险，投资需谨慎<br>遇到问题？您可以拨打客服电话<a href="javascript:phone('400-600-9976')">400-600-9976</a></p>
    <div class="mask0 mask-box home-mask" v-show="homePop==true">
      <a :href="actPopup.popLink" class="homePop-link">
        <img :src="actPopup.popUri" id="homePop-img" class="img-big">
      </a>
      <span class="close-pop" @click="closeHome"></span>
    </div>
    <div class="mask0 mask-box tyj-mask" v-show="tyjPop==true">
      <img src="../assets/images/tyj_popup.png" class="img-small">
      <span class="close-pop" @click="closeTyj"></span>
      <span class="txt" v-if="cpnCoupon && cpnCoupon.cpnInfo">{{$fmoney(cpnCoupon.cpnInfo)}}元体验金已到账</span>
      <a class="goto-btn" v-if="cpnCoupon && cpnCoupon.cpnInfo" :href="'/experience/'+product.prdCode+'/'+cpnCoupon.cpnNum+'/'+cpnCoupon.cpnInfo"></a>
    </div>
    <div class="pageFooter mui-bar mui-bar-tab">
      <div class="nav">
        <router-link class="nav-item" style="color: #FFBF00" to="/">
          <i class="mui-icon icon-homepage-active"></i>首页
        </router-link>
        <router-link class="nav-item" :to="{ name: 'ProductList', params: { prdType: $route.params.prdType,pageAt:1 }}"
                     v-if="$route.params.prdType" >
          <i class="mui-icon icon-invest"></i>理财
        </router-link>
        <router-link class="nav-item" to="/product-list/0/1" v-else>
          <i class="mui-icon icon-invest"></i>理财
        </router-link>
        <a class="nav-item" :href="discoverUrl">
          <i class="mui-icon icon-discover"></i>发现
        </a>
        <router-link class="nav-item" to="/profile">
          <i class="mui-icon icon-profile"></i>我的
        </router-link>
      </div>
    </div>-->
  </div>
</template>
<script>
  import Swipe from 'swiper'

  export default {
    name: 'Front',
    data () {
      return {
        banners: [],
        mySwipe: [],
        webSiteInfo:{},
        notice:{},
        products:{},
        showHeader: false,
        tyjPop: false,
        homePop: false,
        actPopup: {},
        cpnCoupon: {},
        product: {},
        discoverUrl: '',
      }
    },
    created(){
      var self = this;
      // banner
      self.$http.post('/pbap-web/action/resource/query/bannerList',{
        pageIndex:1,
        pageSize:5,
        resModule:5
      }).then((res) => {
        self.banners = res.body.respInfo.list.dataList;
      });
      window.addEventListener('scroll', this.handleScroll);
      // 上部公告
      self.$http.post('/pbap-web/action/news/query/lastNews',{
        newsType:1,
        pageSize:5,
        pageIndex:1
      }).then((res)=>{
        self.notice = res.body.respInfo.news;
      });
      // get平台交易数据
      self.$http.get('/pbap-web/action/statistics/query/tradesSumInfo').then((res)=>{
        self.webSiteInfo = res.body.respInfo.sumInfo;
        self.webSiteInfo.investmentAmount = self.$fmoney(self.webSiteInfo.investmentAmount);
        self.webSiteInfo.income = self.$fmoney(self.webSiteInfo.income);
      });
      // 首页产品
      self.$http.post('/pbap-web/action/product/query/lastHomePrd',{
        typeArr:[ 7, 8, 9, 30, 60 ],
        visibleTerm:2
      }).then((res)=>{
        self.products = res.body.respInfo.product;
      });

      self.$http.post('/pbap-web/action/resource/query/domainUrlList?header', {}).then((res) => {
        let mevsUrl = res.body.respInfo.mevs;
        if (mevsUrl) {
          self.discoverUrl = mevsUrl + "h5/discover.html"
        }
      });

      //首页浮层
      if(self.userInfo.loginResult && self.$cookie.get('newUser')){
        self.$http.post('/pbap-web/action/customer/regExperInfo').then((res)=>{
          self.tyjPop = true;
          self.cpnCoupon = res.body.respInfo.cpnCoupon;
          self.$http.post('/pbap-web/action/product/query/lastNewcomerPrd', {
            "prdType": "70"
          }).then((res)=>{
            self.product = res.body.respInfo.product;
          })
        })
      } else {
        self.openPopup();
      }
    },
    computed: {
      userInfo(){
        return this.$store.state.userInfo
      },
    },
    mounted(){
      var self = this
      setTimeout(function () {
        self.mySwipe = new Swipe('.swiper-container', {
          loop: true,
          autoplay: 3000,
          pagination: '.pagination',
          paginationClickable :true,
          autoplayDisableOnInteraction: false
        })
      })
    },
    methods:{
      formatNum(val,cus){
        var self = this
        return self.$formatNum(val,cus);
      },
      handleScroll(){
        if(window.scrollY >200){
          this.showHeader = true;
        }else{
          this.showHeader = false;
        }
      },
      openPopup() {
        var self = this;
        self.$http.post('/pbap-web/action/resource/query/actPopup?type=1').then((res)=>{
          self.actPopup = res.body.respInfo.actPopup;
          if(!self.$cookie.get('adShow') && self.actPopup.status == "1" && self.actPopup.popLink){
            self.homePop = true;
            self.$cookie.set('adShow', true, 1)
          }
        });
      },
      closeTyj(){
        var self = this;
        self.tyjPop = false;
        self.$cookie.delete('newUser');
        if(!self.$cookie.get('adShow')){
          self.openPopup();
        }
      },
      closeHome(){
        var self = this;
        self.homePop = false
      },
    }
  }
</script>
