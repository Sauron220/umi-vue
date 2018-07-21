<template>
  <div class="warp-con-cou">
    <div class="cou-top">
      <div class="btn-cou">兌換優惠券</div>
      <div class="coupon-unused-warp">
        <div class="unused-item">
          <div class="unused-tp-num">
            <span class="num">400</span>元現金券
          </div>
          <div class="unused-bt-desc">
            <ul>
              <li>新人專享</li>
              <li>優選計劃、U計劃(鎖定期12月/24月/36月)</li>
              <li>2018年06月16日- 2018年07月31日</li>
              <li>最低出借金額: 150,000 元</li>
            </ul>
          </div>
        </div>
        <div class="unused-item">
          <div class="unused-tp-num">
            <span class="num">150</span>元現金券
          </div>
          <div class="unused-bt-desc">
            <ul>
              <li>新人專享</li>
              <li>優選計劃、U計劃(鎖定期12月/24月/36月)</li>
              <li>2018年06月16日- 2018年07月31日</li>
              <li>最低出借金額: 150,000 元</li>
            </ul>
          </div>
        </div>
        <div class="unused-item">
          <div class="unused-tp-num">
            <span class="num">60</span>元現金券
          </div>
          <div class="unused-bt-desc">
            <ul>
              <li>新人專享</li>
              <li>優選計劃、U計劃(鎖定期12月/24月/36月)</li>
              <li>2018年06月16日- 2018年07月31日</li>
              <li>最低出借金額: 150,000 元</li>
            </ul>
          </div>
        </div>
        <div class="unused-item">
          <div class="unused-tp-num">
            <span class="num">20</span>元現金券
          </div>
          <div class="unused-bt-desc">
            <ul>
              <li>新人專享</li>
              <li>優選計劃、U計劃(鎖定期12月/24月/36月)</li>
              <li>2018年06月16日- 2018年07月31日</li>
              <li>最低出借金額: 150,000 元</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="mine-invite-warp">
      <div class="mine-invite-hed">
        <h4>我的邀請</h4>
      </div>
      <div class="mine-invite-num">
        <div class="mine-invite-num-item">
          <div class="invite-tit">0</div>
          <div class="invite-desc">邀請人數(人)</div>
        </div>
        <div class="mine-invite-num-item">
          <div class="invite-tit">0.00</div>
          <div class="invite-desc">纍計現金獎勵(元)</div>
        </div>
        <div class="mine-invite-num-item">
          <div class="invite-tit">0.00元</div>
          <div class="invite-desc">獲得優惠券(張)</div>
        </div>
      </div>
    </div>
    <div class="invite-gift">
      <div class="invite-gift-tit">
        <h4>邀請出借有禮</h4>
      </div>
      <div class="invite-gift-con">
        <div class="invite-gift-con-t">
          <div class="invite-gift-con-t-item">
            <div class="invite-gift-con-t-item-h">
              <span class="it-f">Step</span><span class="it-l">1.</span>
            </div>
            <div class="invite-gift-con-t-item-d">
              分享鏈接給好友
            </div>
          </div>
          <div class="invite-gift-con-t-item">
            <div class="invite-gift-con-t-item-h">
              <span class="it-f">Step</span><span class="it-l">2.</span>
            </div>
            <div class="invite-gift-con-t-item-d">
              好友通過鏈接注 <br>冊並完成出借
            </div>
          </div>
          <div class="invite-gift-con-t-item">
            <div class="invite-gift-con-t-item-h">
              <span class="it-f">Step</span><span class="it-l">3.</span>
            </div>
            <div class="invite-gift-con-t-item-d">
              您即可得獎勵 <br>具體見活動詳情
            </div>
          </div>
        </div>
        <div class="invite-gift-con-b">
          <div class="invite-gift-con-b-link">
            <input type="text" readonly v-model="link">
            <div class="btn-link-copy"
                 v-clipboard:copy="link"
                 v-clipboard:success="onCopy"
                 v-clipboard:error="onError">
              <img style="width: 18px;margin-right: 5px;" src="/static/img/link.png" alt="">复制链接
            </div>
          </div>
          <div class="fenxiang-warp">
            <div class="fenxiang-warp-item">
              <img src="/static/img/link.png" alt="">
              <p class="desc">分享到&nbsp;&nbsp;LINE</p>
            </div>
            <div class="fenxiang-warp-item">
              <img src="/static/img/link.png" alt="">
              <p class="desc">分享到&nbsp;&nbsp;微信</p>
            </div>
            <a href="https://www.facebook.com/fundbowl.tw/" class="fenxiang-warp-item">
              <img src="/static/img/link.png" alt="">
              <p class="desc">分享到&nbsp;&nbsp;Ｆace Book</p>
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="invite-gift-info">
      <div class="invite-gift-info-t">
        <h4>獎勵詳情</h4>
      </div>
      <div class="invite-con-peo product-list table-p">
        <div class="table">
          <table class="t-caption">
            <thead>
            <tr>
              <th class="rate regular-rate">好友</th>
              <th class="name c-name">注冊時間</th>
              <th class="time c-time">出借狀態</th>
              <th class="money c-money">我的獎勵</th>
            </tr>
            </thead>
            <tbody class="data-list" v-if="arrlen>0">
            <tr class="history-list-data">
              <td class="rate">1</td>
              <td class="name c-name">W***8</td>
              <td class="time c-time"><span>{{$fmoneyFormat(10000)}}</span>元</td>
              <td class="money c-money"><img src="" alt=""></td>
            </tr>
            <tr class="history-list-data">
              <td class="rate">1</td>
              <td class="name c-name">W***8</td>
              <td class="time c-time"><span>{{$fmoneyFormat(10000)}}</span>元</td>
              <td class="money c-money"><img src="" alt=""></td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="blank-info">您還未邀請好友，趕快去邀請！</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "CouPonUnused",
    data() {
      return {
        link: 'https://www.renrendai.com/pc/ppb/cv1/page/5954d9425fe3df4e55713071.html?utmsource=pc_mgm_01&inviteCode=1070rRmiDsqg0947',
        arrlen: 0,
      }
    },
    created() {

    },
    methods: {
      onCopy: function (e) {
        this.$store.commit('setModal', {
          type: 'alert',
          msg: '已成功复制到您的剪切板！',
        });
        this.$store.commit('showModal');
      },
      onError: function (e) {
        this.$store.commit('setModal', {
          type: 'alert',
          msg: '复制失败，请手动CTRL+C复制链接！',
        });
        this.$store.commit('showModal');
      }
    }
  }
</script>
