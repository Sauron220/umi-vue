<template>
  <div class="noviceArea front" v-TDK="TDK">
    <div class="index-slider">
      <div class="index-slider-box">
        <div class='swiper-container'>
          <div class='swiper-wrapper'>
            <div class="swiper-slide front-banner" v-for="item in banners" :key='item.resLink'>
              <a :href="item.resLink || 'javascript:;'" target="_blank">
                <img :src="item.resUri" alt="">
              </a>
            </div>
          </div>
          <div class="pagination"></div>
        </div>
      </div>
    </div>

    <div class="container">

      <div class="section-space"></div>
      <div class="section-space"></div>

      <h4 class="section-title">聚寶進階</h4>

      <div class="product-area product-box front-new-novice-box">
        <div class="content">
          <div class="product-month xrt-row xrt-row-new-novice" style="border: none;">
            <div class="col-xs-4">
              <div class="front-new-user">
                <img src="/static/img/select-03.png" alt="">
              </div>
              <p>1000元見面禮</p>
              <p class="product-noviceArea-desc">註冊即獲得總值1000元現金券,可用於抵扣相應面值的出借金額。 </p>
              <a class="front-new-user-reg new-user-active front-new-novice-reg" href="/register">注冊領取</a>
            </div>
            <div class="col-xs-4">
              <div class="front-new-user">
                <img src="/static/img/select-03.png" alt="">
              </div>
              <p>測評送積分</p>
              <p class="product-noviceArea-desc">完成風險測評，享受安心出借，還可額外獲得十積分。 </p>
              <a class="front-new-user-reg new-user-active front-new-novice-reg" href="/riskAssessment">完成評測</a>
            </div>
            <div class="col-xs-4" style="border: none">
              <div class="front-new-user">
                <img src="/static/img/select-03.png" alt="">
              </div>
              <p>拿第一桶金</p>
              <p class="product-noviceArea-desc">首次出借新手專享項目，期待年 回報率達10%，額外15積分贈送。 </p>
              <a class="front-new-user-reg new-user-active front-new-novice-reg"  @click="toBucketDeatil" href="javascript:;">完成出借</a>
            </div>
          </div>
        </div>
      </div>

      <div class="section-space"></div>
      <div class="section-space"></div>

      <div class="noviceArea-parper">
        <div class="novice-img">
          <img src="/static/img/gonggao.png" alt="">
        </div>
        <div class="noviceArea-tit">聚寶快報</div>
        <div class="noviceArea-desc">聚寶盆發起「理財，我是保守派」，倡導積極健康財富觀</div>
      </div>

      <div class="section-space"></div>
      <div class="section-space"></div>

      <h4 class="section-title">聚寶秘笈</h4>
      <div class="noviceArea-video">
        <img style="width: 100%;" src="/static/img/friend.png" alt="">
      </div>

      <div class="section-space"></div>
      <div class="section-space"></div>
    </div>
  </div>
</template>

<script>
  import Swipe from 'swiper'

  export default {
    name: "novice-area",
    data() {
      return {
        banners:[],
        products: {
          30: {},
        },
        TDK: {
          title:'聚寶盆新手專區',
          keyWords:'聚寶盆收益,聚寶盆收費標準,聚寶盆利息,聚寶盆提領',
          description:'聚寶盆會員幫助中心幫您解決登錄註冊、賬戶資訊、儲值提領、產品介紹等壹系列問題‘，有問題找幫助中心，希望給您的預訂疑問提供幫助! 服務熱線 02-8780-6767 。',
        }
      }
    },
    created(){
      const self = this;
      // banner
      this.$http.post('/pbap-web/action/resource/query/bannerList', {
        pageIndex: 1,
        pageSize: 5,
        resModule: 4
      }).then((res) => {
        res.body.respInfo.list.dataList.push({resUri:'/static/img/friend.png'});
        self.banners = res.body.respInfo.list.dataList;
        self.$nextTick(function () {
          self.mySwipe = new Swipe('.swiper-container', {
            loop: true,
            autoplay: 3000,
            pagination: '.pagination',
            paginationClickable: true
          })
          self.mySwipe.resizeFix()
        })
      });
      // 首頁產品 新手
      self.$http.post('/pbap-web/action/product/query/lastNewcomerPrd', {prdType: 30}).then((res) => {
        self.products[30] = res.body.respInfo.product || {};
        console.log(self.products[30])
      })
    },
    methods: {
      toBucketDeatil() {
        localStorage.setItem('proCode', this.products[30].prdCode);
        this.$router.push({path: 'bucketGold'});
      }
    }
  }
</script>
