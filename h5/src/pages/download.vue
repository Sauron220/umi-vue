<template>
  <div class="download">
    <div class='swiper-container'>
      <div class='swiper-wrapper' style="height: 210px;">
        <a :href="item.resLink || 'javascript:;'" class="swiper-slide" v-for="(item, index) in banners" :key="index">
          <img class="img-responsive" :src="item.resUri" alt="" style="height: 210px;">
        </a>
      </div>
      <div class="pagination"></div>
    </div>
    <div class="dec-info-warp">
      <div class="dec-info-warp-item">
        <img src="/static/img/newUser.png" alt="" class="img-bg" style="width: 0.9rem;">
        <p>優質產品</p>
        <p>服務多元</p>
      </div>
      <div class="dec-info-warp-item">
        <img src="/static/img/shezhi.png" alt="" class="img-bg" style="width: 0.95rem;">
        <p>多重風控</p>
        <p>安全保障</p>
      </div>
      <div class="dec-info-warp-item">
        <img src="/static/img/tuijian.png" alt="" class="img-bg" style="width: 0.76rem;">
        <p>一鍵投資</p>
        <p>操作簡單</p>
      </div>
    </div>
    <div class="space-divid"></div>
    <div class="tuijian-warp">
      <div class="tuijian-warp-head">
        推薦項目
      </div>
      <div class="tuijian-list-item">
        <div class="tuijian-list-item-lf">
          <div class="rate-info" >{{productRate(productInfo.defaultRate)}}</div>
          <div class="rate-desc">預期年化收益</div>
        </div>
        <div class="tuijian-list-item-ri">
          <div class="rate-product">壹桶金-新手專享</div>
          <div class="rate-desc cus-date" style="display: flex;align-items: center;">鎖定期{{productInfo.prdPeriod}}天 <span> 限投一次</span></div>
        </div>
      </div>
      <div class="tuijian-list-item" v-for="(item, index) in LastHomePrdList" :key="index">
        <div class="tuijian-list-item-lf">
          <div class="rate-info">{{productRate(item.defaultRate)}}</div>
          <div class="rate-desc">預期年化收益</div>
        </div>
        <div class="tuijian-list-item-ri">
          <div class="rate-product">{{item.prdName}}</div>
          <div class="rate-desc cus-date">鎖定期{{item.prdPeriod}}天</div>
        </div>
      </div>
    </div>
    <div class="warn-warp">
      網貸有風險，出借需謹慎
    </div>
    <div class="btn-warp" @click="toDownload">
      下載聚寶盆APP
    </div>
    <div class="mask-box-warp" v-if="flag">
    </div>
    <div class="mask-content" v-if="flag">
      <!--<span>要在 「App Store」 中打開嗎？</span>-->
      <span>即將上線</span>
      <div class="confirm-warp">
        <span class="cancel" @click="cancel">确定</span>
        <!--<span class="cancel" @click="cancel">取消</span>-->
        <!--<span class="tolink" @click="toLinkDetail">打開</span>-->
      </div>
    </div>
  </div>
</template>

<script>
  import Swipe from 'swiper'
  import Tool from '../util/ProductTool.js'

  export default {
    name: "download",
    data() {
      return {
        banners: [],
        LastHomePrdList: [],
        mySwipe: '',
        flag: false,
        productInfo: {},
      }
    },
    created() {
      this.fetchBannerList();
      this.getProductNew();
      this.getLastHomePrd();
    },
    methods: {
      productRate: Tool.productRate,
      fetchBannerList() {
        var self = this;
        // banner
        self.$http.post('/pbap-web/action/resource/query/bannerList', {
          pageIndex: 1,
          pageSize: 5,
          resModule: 5
        }).then((res) => {
          self.banners = res.body.respInfo.list.dataList;
          self.$nextTick(function () {
            self.mySwipe = new Swipe('.swiper-container', {
              loop: true,
              autoplay: 3000,
              pagination: '.pagination',
              paginationClickable: true
            })
            // self.mySwipe.resizeFix();
          });
        })
      },
      toDownload() {
        var ua = navigator.userAgent;
        if (!!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
          /**在ios*/
          this.flag = true;
        } else if (ua.indexOf('Android') > -1 || u.indexOf('Adr') > -1) {
          /**Android*/
          location.href = 'https://play.google.com/store/apps/details?id=com.zkjf.android_dev';
        }
      },
      cancel() {
        this.flag = false;
      },
      toLinkDetail() {
        //TODO 待提供ios下载地址
        // location.href = 'http://www.baidu.com';
      },
      getProductNew() {
        const self = this;
        self.$http.post('/pbap-web/action/product/query/lastNewcomerPrd', {
          prdType: "30"
        }).then((res) => {
          self.productInfo = res.data.respInfo.product;
        })
      },
      getLastHomePrd() {
        const self = this;
        self.$http.post('/pbap-web/action/product/query/lastHomePrd', {
          typeArr: [7, 8, 9, 10, 60],
          visibleTerm: 2,
        }).then((res) => {
          console.log(res, '<<<<<<<<<<<<<<<')
          self.LastHomePrdList = res.data.respInfo.product;
        })
      },

    }
  }
</script>
