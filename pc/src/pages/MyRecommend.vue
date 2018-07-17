<template>
  <div id="PersonalCenter" class="myRecommend-content profile clearfix" v-TDK="TDK">
    <div class="container">

      <ol class="breadcrumb">
        <span>您現在的位置：</span>
        <li><router-link to="/accountOverview">我的賬戶</router-link></li>
        <li class="active">我的推薦</li>
      </ol>
      <leftMenu></leftMenu>
      <div class="pull-left right_content">
        <ul class="top-title-line list-inline">
          <li class="top-line1 top-orange">我的推薦</li>
        </ul>
        <img src="../assets/images/myrecommend_01.jpg" class="top-img">

        <div class="quick-recommend clearfix">
          <div class="title text-center">快速推薦</div>
          <div class="recommend-list">
            <div class="item">
              <i class="icon-code"></i>
              <div class="re-content">
                <div class="arrow"></div>
                <div class="content">
                  <div class="text">推薦碼</div>
                  <div class="copy-content">
                    <input class="recommend copy" type="text" v-model="custInfo.rcmCode" value="" readonly>
                    <a class="btn btn-warning" href="javascript:void(0)"
                       v-clipboard:copy="custInfo.rcmCode"
                       v-clipboard:success="onCopy"
                       v-clipboard:error="onError"
                    >復制</a>
                  </div>
                  <div class="clearfix"></div>
                  <div class="intro ">
                    <p>1、復制“推薦碼”發送給好友。</p>
                    <p>2、好友在註冊時輸入您的“推薦碼”</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="item">
              <i class="icon-wechat"></i>
              <div class="re-content re-content-large">
                <div class="arrow"></div>
                <div class="content">
                  <div class="qr-box">
                    <div class="text-center title">微信分享</div>
                    <div class="qr">
                      <vue-qr class="qr" size="120" dotScale="1" margin='0' :text="rcmLink"></vue-qr>
                    </div>
                  </div>
                  <div class="qr-intro">
                    <p>1、這是您的專屬推薦二維碼，打開手機微信“掃壹掃”推薦二維碼。</p>
                    <p>2、展開右上角菜單，點擊“發送給朋友”或“分享到朋友圈”分享邀請連結。</p>
                    <p>3、好友使用您分享的頁面進行註冊即可成為您的被推薦人。</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="item">
              <i class="icon-qq"></i>
              <div class="re-content re-content-large">
                <div class="arrow"></div>
                <div class="content">
                  <div class="qr-box">
                    <div class="text-center title">QQ分享</div>
                    <vue-qr class="qr" size="120" dotScale="1" margin='0' :text="rcmLink"></vue-qr>
                  </div>
                  <div class="qr-intro">
                    <p>1、這是您的專屬推薦二維碼，打開手機QQ“掃壹掃”推薦二維碼。</p>
                    <p>2、右上角菜單，點擊“好友”或“QQ空間”分享邀請連結。</p>
                    <p>3、好友使用您分享的頁面進行註冊即可成為您的被推薦人。</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="item">
              <i class="icon-link"></i>
              <div class="re-content">
                <div class="arrow"></div>
                <div class="content">
                  <div class="text">推薦連結</div>
                  <div class="copy-content">
                    <input class="recommend copy" type="text" v-model="rcmLink" value="" readonly>
                    <a href="javascript:;" class="btn btn-warning"
                       v-clipboard:copy="rcmLink"
                       v-clipboard:success="onCopy"
                       v-clipboard:error="onError"
                    >復制</a>
                  </div>
                  <div class="clearfix"></div>
                  <div class="intro ">
                    <p>1、復制“推薦連結”發送給好友。</p>
                    <p>2、好友使用您分享的頁面進行註冊即可成為您的被推薦人。</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="alert">
          <h2>推薦活動說明:</h2>
          <ol>
            <li>推薦人必須通過分享自己的推薦碼，介紹新用戶前來註冊投資</li>
            <li>被推薦人在註冊日起60天內進行投資，推薦人即可獲得相應的推薦獎勵 </li>
            <li>推薦獎勵按被推薦人累計投資總額的1%（獎勵年化）計算，根據不同產品周期獎勵額度不同，例如：
              <br />被推薦人投資10000元聚寶計劃和10000元分期投，總投資額20000元
              <br />推薦獎勵：
              <br />聚寶計劃=投資金額*1%/360天*30天=10000*1%/360*30=8.33元
              <br />分期投=投資金額*1%/360天*90天=10000*1%/360*90=25.00元
              <br />則聚寶計劃推薦獎勵+分期投推薦獎勵=8.33+25.00=33.33元
              <br />即推薦獎勵總額約33.33元
            </li>
            <li>推薦獎勵按自然月清算，將於每月5號前由系統發放上月推薦獎勵，如遇節假日，則延後至下壹個工作日發放 </li>
            <li>推薦獎勵將以現金紅包的形式發放至推薦人的註冊賬戶內 </li>
            <li>活動獎勵及推薦人與被推薦人關系由系統核實為準，不予人工審核 </li>
            <li>該活動規則最終解釋權歸聚寶盆所有</li>
          </ol>
        </div>


      </div>
    </div>
  </div>
</template>
<script>
  import PersonalCenterMenu from '../components/PersonalCenterMenu'
  import VueQr from 'vue-qr'

  export default {
    name: 'MyRecommend',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App',
        custInfo: {
          rcmCode:''
        },
        rcmLink:'https://github.com/l-ll/qrcode-vue',
        size: 128,
        bgColor: '#fff',
        fgColor: '#000',
        TDK:{
          title:'我的推薦-聚寶盆',
          keyWords:'網絡理財，互聯網理財，理財，投資，投資理財，個人投資，網貸平臺，網貸投資，網貸，互金，互聯網金融，互金平臺，互聯網金融平臺，聚寶盆，聚寶計劃，分期投，月月盈，年年余，財富，P2P',
          description:'聚寶盆是壹家綜合性互聯網金融平臺，聚寶盆為廣大個人投資理財的用戶提供多元化的選擇與優質的服務。投資理財用戶可通過加入聚寶計劃、分期投、月月盈、年年余等產品進行投資獲得穩定收益。',
        }
      }
    },
    components: {
      'leftMenu': PersonalCenterMenu,
      'VueQr': VueQr,
    },
    created () {
      var self = this;
      self.$http.post('/pbap-web/action/customer/query/custAuthInfo', {}).then((res)=>{
        self.custInfo = res.body.respInfo.custInfo;
        self.rcmLink = location.origin+'/register?rcmCode='+self.custInfo.rcmCode;
      })
    },
    mounted () {

      $('.recommend-list .item i').hover(function () {
        $(this).next('.re-content').show();
      },function () {
        $(this).next('.re-content').hide();
      });
      $('.re-content').hover(function () {
        $(this).show();
      },function () {
        $(this).hide();
      });
    },
    methods: {
      onCopy: function (e) {
        this.$store.commit('setModal', {
          type: 'alert',
          msg: '已成功復制到您的剪切板！',
        });
        this.$store.commit('showModal');
      },
      onError: function (e) {
        this.$store.commit('setModal', {
          type: 'alert',
          msg: '復制失敗，請手動CTRL+C復制連結！',
        });
        this.$store.commit('showModal');
      }
    }

  }
</script>

