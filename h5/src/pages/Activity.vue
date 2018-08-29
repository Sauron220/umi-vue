<template>
  <div class="activity-warp">
    <div class="img-bg">
      <img src="/static/img/bg.svg" alt="">
    </div>
    <div class="activity-content-warp">
      <div class="bucket-gold">
        <div class="bucket-gold-hed">
          <span class="bucket-tit"><span>新手投資 專享通道</span></span><span class="tit">壹桶金</span>
        </div>
      </div>
      <div class="bucket-gold-con">
        <div class="bucket-gold-rate">
          <p class="rate">{{productRate(productInfo.defaultRate)}}</p>
          <p class="desc">預期年化收益</p>
        </div>
        <div class="bucket-gold-date">
          <p class="date">鎖定期{{productInfo.prdPeriod}}個月</p>
          <p class="desc">使用紅包，回報更高</p>
        </div>
      </div>
      <div class="bucket-gold">
        <div class="bucket-gold-hed">
          <span class="bucket-tit"><span>HOT</span></span><span class="tit">聚寶計畫</span>
        </div>
      </div>
      <div class="bucket-gold-con" style="border: none;" v-for="(item, index) in LastHomePrdList" :key="index">
        <div class="bucket-gold-rate">
          <p class="rate">{{productRate(item.defaultRate)}}</p>
          <p class="desc">預期年化收益</p>
        </div>
        <div class="bucket-gold-date">
          <p class="date">鎖定期{{item.prdPeriod}}個月</p>
          <p class="desc">使用紅包，回報更高</p>
        </div>
      </div>
    </div>
    <div class="activity-content-warp margintop" style="padding-bottom: 0.8rem;">
      <div class="activity-person">
        <img src="/static/img/person.svg" alt="">
        <span class="line"></span>
        <div class="desc-info">
          <p class="info-t">優選產品 服務多元</p>
          <p class="info-d">提供多種投資理財服務，</p>
          <p class="info-d">產品豐富、期限多樣</p>
        </div>
      </div>
      <div class="activity-person">
        <img src="/static/img/setting.svg" alt="">
        <span class="line"></span>
        <div class="desc-info">
          <p class="info-t">多重風控 安全保障</p>
          <p class="info-d">產品層層篩選，保證用戶資金安全</p>
          <p class="info-d">借款人資質經三重審核</p>
        </div>
      </div>
      <div class="activity-person">
        <img src="/static/img/tuijian.svg" alt="">
        <span class="line"></span>
        <div class="desc-info">
          <p class="info-t">一鍵投資 操作簡單</p>
          <p class="info-d">7 × 24 小時在綫下單</p>
          <p class="info-d">資金不放假，回款有規劃</p>
        </div>
      </div>
    </div>
    <div class="activity-content-warp dectop">
      聚寶盆為媒合投資及資金需求的缐上平台，提供領先全球的金融支付技術及最安全透明的金融服務，期待與您共同創造出有信用的機會財富。理財有風險，投資需謹慎。投資前請詳閲風險管理資訊及會員條款相關内容。
    </div>
    <div class="btn-warp" @click="toDownload">
      下載APP注冊領取1%加息券
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
  import Tool from '../util/ProductTool.js'
  export default {
    name: "activity",
    data () {
      return {
        LastHomePrdList: [{
          defaultRate: 0.08,
          prdPeriod: '12'
        }],
        productInfo: {
          defaultRate: 0.06,
          prdPeriod: '1'
        },
        flag: false
      }
    },
    created() {
      // this.getProductNew();
      // this.getLastHomePrd();
    },
    methods: {
      productRate: Tool.productRate,
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
      cancel() {
        this.flag = false;
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
    }
  }
</script>
