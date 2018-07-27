<template>
  <div class="bucketGlod">
    <div class="bucket-img-warp">
      <img src="/static/img/newPeople.png" alt="" width="100%;">
    </div>
    <div class="section-space clearfix"></div>
    <div class="section-space clearfix"></div>
    <div class="content-warp">
      <h4 class="section-title">聚寶計劃
        <div class="section-title-text">
          定期投資 分散投標
        </div>
        <div class="gongg" style="display: inline;">
          <a class="pull-right text-muted more img-bg" href="/product-list/7/11/1" target="_blank"
             style="top: -4px;margin-left:8px;"></a>
          <a class="pull-right text-muted more" style="font-size: 12px" href="/product-list/7/11/1" target="_blank">查看更多</a>
        </div>
      </h4>
      <div class="product-area product-box" style="background: none;">
        <div class="plan-container">
          <div class="plan-case-item" v-for="(item, index) in products" :key="index" v-if="index < 3">
            <div class="plan-case-item-t">
              <div class="plan-case-item-t-l">
                <p class="rate">{{item.defaultRate ? $fmoney(formatNum(item.defaultRate || 0, 100), 1) : '--'}}<span v-if="item.rewardRate">+{{$fmoney(formatNum(item.rewardRate || 0, 100), 1)}}%</span></p>
                <p class="desc">预期年化收益</p>
              </div>
              <div class="plan-case-item-t-m"></div>
              <div class="plan-case-item-t-r">
                <p class="date">{{item.prdPeriod ? item.prdPeriod : '---'}}天</p>
                <p class="desc">借款期限</p>
              </div>
            </div>
            <div class="plan-case-item-b" @click="toDetail(item.prdCode)">
              {{item.status == 11 || item.status == 12 ? '立即加入' : '查看詳情'}}
            </div>
          </div>
        </div>
      </div>
      <!--<div class="plan-warp">
        <div class="plan-warp-hed">
          <div>計畫進度</div>
          <div class="jion-plan">如何加入壹桶金</div>
        </div>
        <div class="plan-warp-con">
          <div class="plan-warp-con-lf">
            <div class="date-start">
              <p>開始加入</p>
              <p>06月28日03:00</p>
            </div>
            <div class="line-path"></div>
            <div class="bg-progess">1~2天起息</div>
          </div>
          <div class="plan-warp-con-ri">
            <div class="date-start">
              <div>
                <p>進入鎖定日期</p>
                <p>06月28日03:00</p>
              </div>
              <div>
                <p>到期退出</p>
                <p>06月28日03:00</p>
              </div>
            </div>
            <div class="line-path"></div>
            <div class="bg-progess">1個月持續計息</div>
          </div>
        </div>
      </div>-->
      <div class="section-space clearfix"></div>
      <div class="section-space clearfix"></div>

      <div class="calculator-warp">
        <h4 class="section-title">期待回報計算器</h4>
        <div class="calculator-content">
          <div class="lf">
            <div><input type="number" v-model="calcMoney"> <span>元</span></div>
          </div>
          <div class="ri">
            <div class="mon-mun">3個月</div>
            <div class="progress-c">
                <div class="progress">
                  <div class="progress-bar progress-bar-warning"></div>
                </div>
                <div class="cal-money">{{marchMoney ? marchMoney : '--'}}元</div>
            </div>
            <div class="mon-mun">6個月</div>
            <div class="progress-c">
                <div class="progress">
                  <div class="progress-bar progress-bar-warning"></div>
                </div>
                <div class="cal-money">{{juneMoney ? juneMoney : '--'}}元</div>
            </div>
            <div class="mon-mun">12個月</div>
            <div class="progress-c">
                <div class="progress">
                  <div class="progress-bar progress-bar-warning"></div>
                </div>
                <div class="cal-money">{{decemberMoney ? decemberMoney : '--'}}元</div>
            </div>
          </div>
        </div>
      </div>

      <div class="section-space clearfix"></div>
      <div class="section-space clearfix"></div>
      <div class="histy-table-warp">
        <h4 class="section-title">歷史期數與利息回报</h4>
        <div class="histy-table-con">

        </div>
      </div>

      <div class="desc-answer-warp">
        <div class="view-warp">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "BucketGold",
    data() {
      return {
        money:'',
        flag:1,
        products:[],
        calcMoney:1000
      }
    },
    computed: {
      marchMoney: function () {
        const self = this;
        return self.$typingFormatAmountSimple((self.calcMoney*[1 + 4.8/100 * 3]));
      },
      juneMoney: function () {
        const self = this;
        return self.$typingFormatAmountSimple((self.calcMoney*[1 + 6/100 * 6]));
      },
      decemberMoney: function () {
        const self = this;
        return self.$typingFormatAmountSimple((self.calcMoney*[1 + 8/100 * 12]));
      },
    },
    created() {
      const self = this;
      sessionStorage.getItem('flag') ? this.flag = sessionStorage.getItem('flag') : this.flag = 1;
      self.$http.post('/pbap-web/action/product/query/lastHomePrd?7', {typeArr: [7], visibleTerm: 2}).then((res) => {
        self.products = res.body.respInfo.product || {};
        if (res.body.respInfo.product.length < 3) {
          let _len = res.body.respInfo.product.length;
          for (let i = 0; i < 3-_len; i++) {
            self.products.push({});
          }
        }
      });
    },
    methods:{
      toDetail(code) {
        const _proCode = code;
        console.log(code)
        _proCode && this.$router.push({name: 'Product', params: {prdCode: _proCode}});
      },
      formatNum(val, cus) {
        var self = this
        return self.$formatNum(val, cus);
      },
    }
  }
</script>
