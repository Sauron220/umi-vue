<template>
  <div id="PersonalCenter" class="rw-content OpenAccount changePwd-content profile clearfix">
    <UpLoadImage ref="UpLoadImage"></UpLoadImage>
    <div class="container">
      <!--<ol class="breadcrumb">
        <span>您現在的位置：</span>
        <li>
          <router-link to="/accountOverview">我的帳戶</router-link>
        </li>
        <li>
          <router-link to="/set">帳戶安全</router-link>
        </li>
        <li class="active">實名認證</li>
      </ol>
      <leftMenu></leftMenu>-->
      <div class="pull-left right_content">
        <ul class="top-title-line list-inline">
          <li class="top-line1 top-orange">實名認證</li>
        </ul>
        <form action="" method="post" submit="openAccount" novalidate id="openAccountForm">
          <div class="personal-bar form-group">
            <!--<div class="img-content" @click="showUploadBabyAvatar">+</div>-->
            <!--<font @test="change"></font>-->
            <img class="img-content" v-show="nameUrl1" :src="nameUrl1" @click="showUploadBabyAvatar(1)">
            <img class="img-content" v-show="!nameUrl1" id="img1" src="../assets/images/realname-bg.png"
                 @click="showUploadBabyAvatar(1)">
            <div class="realname-inpro">
              <h1 class="inpro-title">手持本人身份證正面照</h1>
              <p class="inpro-content">請您上傳壹張手持身份證正面照，請確保照片的內容完整並清晰可見。</p>
            </div>
          </div>

          <div class="personal-bar form-group">
            <img class="img-content" v-if="nameUrl2" :src="nameUrl2" @click="showUploadBabyAvatar(2)">
            <img class="img-content" v-if="!nameUrl2" src="../assets/images/realname-bg.png"
                 @click="showUploadBabyAvatar(2)">
            <div class="realname-inpro">
              <h1 class="inpro-title">本人身份證正面照</h1>
              <p class="inpro-content">請確保照片的內容完整並清晰可見，身份證必須在有效期內。</p>
            </div>
          </div>

          <div class="personal-bar form-group">
            <img class="img-content" v-if="nameUrl3" :src="nameUrl3" @click="showUploadBabyAvatar(3)">
            <img class="img-content" v-if="!nameUrl3" src="../assets/images/realname-bg.png"
                 @click="showUploadBabyAvatar(3)">
            <div class="realname-inpro">
              <h1 class="inpro-title">本人身份證背面照</h1>
              <p class="inpro-content">請確保照片的內容完整並清晰可見，身份證必須在有效期內。</p>
            </div>
          </div>

          <button type="button" class="btn btn-warning" @click="openAccount">{{btnText}}</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>

  import PersonalCenterMenu from '../components/PersonalCenterMenu'
  import UpLoadImage from '../components/UpLoadImage.vue'

  const dictionary = {
    en: {
      custom: {
        // pwd: {
        //   required(){
        //     return '請輸入登錄密碼'
        //   }
        // },
      }
    }
  };
  export default {
    name: 'OpenAccount',
    data() {
      return {

        TDK: {
          title: '修改密碼-聚寶盆',
          keyWords: '網絡理財，互聯網理財，理財，投資，投資理財，個人投資，網貸平臺，網貸投資，網貸，互金，互聯網金融，互金平臺，互聯網金融平臺，聚寶盆，聚寶計劃，分期投，月月盈，年年余，財富，P2P',
          description: '聚寶盆是壹家綜合性互聯網金融平臺，聚寶盆為廣大個人投資理財的用戶提供多元化的選擇與優質的服務。投資理財用戶可通過加入聚寶計劃、分期投、月月盈、年年余等產品進行投資獲得穩定收益。',
        },
        imgUrl1: '',
        imgUrl2: '',
        imgUrl3: '',
        btnText: '提交認證'
      }
    },
    components: {
      UpLoadImage: UpLoadImage,
      'leftMenu': PersonalCenterMenu,
    },
    created() {
      var self = this;
      self.$http.post('/pbap-web/action/idInfo/queryCusIdCardInfo', {}).then((res) => {

        if (res.body.respInfo.idCardInfo) {
          if (res.body.respInfo.idCardInfo.imgUrl1) {
            self.$store.commit('setnameUrl1', res.body.respInfo.idCardInfo.imgUrl1);
          }
          if (res.body.respInfo.idCardInfo.imgUrl2) {
            self.$store.commit('setnameUrl2', res.body.respInfo.idCardInfo.imgUrl2);
          }
          if (res.body.respInfo.idCardInfo.imgUrl3) {
            self.$store.commit('setnameUrl3', res.body.respInfo.idCardInfo.imgUrl3);
          }
        }
      });
    },
    computed: {
      nameUrl1() {
        return this.$store.state.nameUrl1
      },
      nameUrl2() {
        return this.$store.state.nameUrl2
      },
      nameUrl3() {
        return this.$store.state.nameUrl3
      },
      urlIndex() {
        return this.$store.state.urlIndex
      },
    },
    watch: {},
    mounted() {
      this.$validator.updateDictionary(dictionary);
    },
    methods: {
      openAccount() {
        var self = this;
        self.$http.post('/pbap-web/action/idInfo/saveImages', {
          'imgUrl1': self.nameUrl1,
          'imgUrl2': self.nameUrl2,
          'imgUrl3': self.nameUrl3,
        }).then((res) => {
          self.$store.commit('setModal', {
            show: false,
            type: 'alert',
            msg: '實名認證申請成功',
            confirmUrl: '/mineAccount'
          });
          self.$store.commit('showModal');
        }, res => {
          self.$store.commit('setnameUrl1','');
          self.$store.commit('setnameUrl2', '');
          self.$store.commit('setnameUrl3', '');
          self.$store.commit('seturlIndex', '');
          this.btnText = '重新認證'
        });
      },
      showUploadBabyAvatar(index) {
        this.$store.commit('seturlIndex', index);
        this.$refs.UpLoadImage.showUploadBabyAvatar();
      },
      change(url) {
        this.imgUrl1 = url;  // msg: 123
        console.log('imgutl1', this.imgUrl1)
        document.getElementById('img1').src(this.imgUrl1);
      },
    }
  }
</script>
