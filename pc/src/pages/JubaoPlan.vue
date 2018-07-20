<template>
  <div class="bucketGlod">
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
          <div class="plan-case-item">
            <div class="plan-case-item-t">
              <div class="plan-case-item-t-l">
                <p class="rate">4.8%</p>
                <p class="desc">预期年化收益</p>
              </div>
              <div class="plan-case-item-t-m"></div>
              <div class="plan-case-item-t-r">
                <p class="date">三个月</p>
                <p class="desc">借款期限</p>
              </div>
            </div>
            <div class="plan-case-item-b" @click="toDetail(products[7].prdCode)">
              {{products[7].status == 11 || products[7].status == 12 ? '立即加入' : '查看詳情'}}
            </div>
          </div>
          <div class="plan-case-item">
            <div class="plan-case-item-t">
              <div class="plan-case-item-t-l">
                <p class="rate">4.8%</p>
                <p class="desc">预期年化收益</p>
              </div>
              <div class="plan-case-item-t-m"></div>
              <div class="plan-case-item-t-r">
                <p class="date">三个月</p>
                <p class="desc">借款期限</p>
              </div>
            </div>
            <div class="plan-case-item-b">
              查看详情
            </div>
          </div>
          <div class="plan-case-item">
            <div class="plan-case-item-t">
              <div class="plan-case-item-t-l">
                <p class="rate">4.8%</p>
                <p class="desc">预期年化收益</p>
              </div>
              <div class="plan-case-item-t-m"></div>
              <div class="plan-case-item-t-r">
                <p class="date">三个月</p>
                <p class="desc">借款期限</p>
              </div>
            </div>
            <div class="plan-case-item-b">
              查看详情
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
                <div class="cal-money">41.67元</div>
            </div>
            <div class="mon-mun">6個月</div>
            <div class="progress-c">
                <div class="progress">
                  <div class="progress-bar progress-bar-warning"></div>
                </div>
                <div class="cal-money">140.15元</div>
            </div>
            <div class="mon-mun">12個月</div>
            <div class="progress-c">
                <div class="progress">
                  <div class="progress-bar progress-bar-warning"></div>
                </div>
                <div class="cal-money">310.44元</div>
            </div>
          </div>
        </div>
      </div>

      <div class="section-space clearfix"></div>
      <div class="section-space clearfix"></div>
      <div class="histy-table-warp">
        <h4 class="section-title">歷史期數與利息回</h4>
        <div class="histy-table-con">

        </div>
      </div>



      <div class="desc-answer-warp">
        <!--<div class="desc-answer-hed">
          <div class="" :class="{'active-select': flag==1}" @click="toNext(1)">計劃進度</div>
          <div class="" :class="{'active-select': flag==2}" @click="toNext(2)">加入記錄</div>
          <div class="" :class="{'active-select': flag==3}" @click="toNext(3)">借款信息</div>
          <div class="" :class="{'active-select': flag==4}" @click="toNext(4)">計劃表現</div>
          <div class="" :class="{'active-select': flag==5}" @click="toNext(5)">常見問題</div>
        </div>-->
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
        products:{7:{status: 0}},
        calcMoney:1000
      }
    },
    created() {
      const self = this;
      localStorage.getItem('flag') ? this.flag = localStorage.getItem('flag') : this.flag = 1;
      self.$http.post('/pbap-web/action/product/query/lastHomePrd?7', {typeArr: [7], visibleTerm: 2}).then((res) => {
        self.products[7] = res.body.respInfo.product[0] || {};
      });
    },
    methods:{
      toDetail(code) {
        const _proCode = code;
        console.log(code)
        _proCode && this.$router.push({name: 'Product', params: {prdCode: _proCode}});
      }
    }
  }
</script>
