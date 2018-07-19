<template>
  <div class="bucketGlod">
    <div class="nav-bar-tit">
      <router-link to="/">聚寶盆首頁></router-link>
      <router-link to="/bucketGold">壹桶金></router-link>
      <span>壹桶金-新1月-20180628期</span>
    </div>
    <div class="content-warp">
      <div class="bucket-top">
        <div class="bucket-top-hed">
          <div class="bucket-top-hed-lf">
            <span class="bucket-top-hed-lf-h">壹桶金 新手投資</span>
            <span class="bucket-top-hed-lf-d">使用红包，回报更高</span>
          </div>
          <div class="bucket-top-hed-ri">
            壹桶金-新1月-20180628期協議範本
          </div>
        </div>
        <div class="bucket-top-con">
          <div class="bucket-top-con-lf">
            <div class="rate">
              <p class="rate-num"><span>8.0</span><span>%+0.8%</span></p>
              <p class="desc">預期年化收益</p>
              <div class="bottom-img"><img src="static/img/tuijian.png" alt=""><span>銀行存管</span></div>
            </div>
            <div class="divider-line"></div>
            <div class="date">
              <p class="date-num">30 <span>天</span></p>
              <p class="desc">借款期限</p>
              <div class="bottom-img second"><img src="static/img/tuijian.png" alt=""><span>合規排名位居前列</span></div>
            </div>
            <div class="divider-line"></div>
            <div class="money">
              <p class="money-num">200000 <span>元</span></p>
              <p class="desc">計劃金額</p>
              <div class="bottom-img"><img src="static/img/tuijian.png" alt=""><span>穩健運營</span></div>
            </div>
          </div>
          <div class="bucket-top-con-ri">
            <p>賬戶余額登<router-link to="/register">錄後</router-link>可見</p>
            <div class="money-warp">
              <input type="text" placeholder="輸入加入金額，為1,0000元的整倍數" v-model="money"/><span>元</span>
            </div>
            <div class="desc">
              <span class="desc-lf">剩餘金額17,620,000 元 </span>
              <span class="desc-ri"> 加入上限10,000 元</span>
            </div>
            <div class="bucket-top-btn">加入</div>
          </div>
        </div>
      </div>
      <div class="plan-warp">
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
      </div>
      <div class="desc-answer-warp">
        <div class="desc-answer-hed">
          <div class="" :class="{'active-select': flag==1}" @click="toNext(1)">計劃進度</div>
          <div class="" :class="{'active-select': flag==2}" @click="toNext(2)">加入記錄</div>
          <div class="" :class="{'active-select': flag==3}" @click="toNext(3)">借款信息</div>
          <div class="" :class="{'active-select': flag==4}" @click="toNext(4)">計劃表現</div>
          <div class="" :class="{'active-select': flag==5}" @click="toNext(5)">常見問題</div>
        </div>
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
      }
    },
    created() {

    },
    methods:{
      toNext(id) {
        const _that = this;
        switch(id)
        {
          case 1:
            _that.flag = 1;
            this.$router.push({path:'/bucketGold'});
            break;
          case 2:
            _that.flag = 2;
            this.$router.push({path:'/custTable/'+id});
            break;
          case 3:
            _that.flag = 3;
            this.$router.push({path:'/custTable/'+id});
            break;
          default:

        }

      }
    }
  }
</script>
