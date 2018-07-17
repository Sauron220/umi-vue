<template>
  <div id="PersonalCenter" class="rw-content changePwd-content profile clearfix">
    <div class="container">
      <ol class="breadcrumb">
        <span>您現在的位置：</span>
        <li>
          <router-link to="/accountOverview">我的賬戶</router-link>
        </li>
        <li>
          <router-link to="/set">賬戶安全</router-link>
        </li>
        <li class="active">支付密碼</li>
      </ol>
      <leftMenu></leftMenu>
      <div class="pull-left right_content">
        <ul class="top-title-line list-inline">
          <li class="top-line1 top-orange">支付密碼</li>
        </ul>
        <form action="" method="post" submit="changePwd" novalidate id="changePwdForm">
          <div class="personal-bar form-group">
            <h1>支付密碼</h1>
            <input type="password" v-if="!showPwd" v-model="pwd" minlength="6" maxlength="20"
                   autocomplete="new-password" placeholder="請輸入支付密碼" class="form-control"
                   @focus="pwdTips=true" @blur="pwdTips=false"
                   v-validate="{rules:{required:true,payPwd:true}}" name="pwd">
            <input type="text" v-if="showPwd" v-model="pwd" minlength="6" maxlength="20"
                   autocomplete="new-password" placeholder="請輸入支付密碼" class="form-control"
                   @focus="pwdTips=true" @blur="pwdTips=false"
                   v-validate="{rules:{required:true,payPwd:true}}" name="pwd">
            <span class="icon cipherText" :class="showPwd?'icon-eye-open':'icon-eye-close'"
                  @click="showPwd = !showPwd"></span>
            <div class="sj-error" v-if="errors.first('pwd')">
              <span></span> <i class="set-normal">{{errors.first('pwd')}}</i>
            </div>
          </div>
          <div class="personal-bar form-group">
            <h1 style="width: 100px;">確認支付密碼</h1>
            <input type="password" v-if="!showPwdNew" v-model="pwdNew" minlength="6" maxlength="20"
                   autocomplete="new-password" placeholder="請輸入支付密碼" class="form-control"
                   @focus="pwdNewTips=true" @blur="pwdNewTips=false"
                   v-validate="{rules:{required:true,payPwd:true}}" name="pwdNew">
            <input type="text" v-if="showPwdNew" v-model="pwdNew" minlength="6" maxlength="20"
                   autocomplete="new-password" placeholder="請輸入支付密碼" class="form-control"
                   @focus="pwdNewTips=true" @blur="pwdNewTips=false"
                   v-validate="{rules:{required:true,payPwd:true}}" name="pwdNew">
            <span class="icon cipherText" :class="showPwdNew?'icon-eye-open':'icon-eye-close'"
                  @click="showPwdNew = !showPwdNew"></span>
            <div class="sj-error" v-if="errors.first('pwdNew')">
              <span></span> <i class="set-normal">{{errors.first('pwdNew')}}</i>
            </div>
          </div>
          <button type="button" class="btn btn-warning" @click="changePwd()">確認</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  import PersonalCenterMenu from '../components/PersonalCenterMenu'

  const dictionary = {
    en: {
      custom: {
        pwd: {
          required() {
            return '請輸入支付密碼'
          }
        },
        pwdNew: {
          required() {
            return '請輸入支付密碼'
          }
        },
      }
    }
  };
  export default {
    name: 'setPayPwd',
    data() {
      return {
        showPwd: false,
        showPwdNew: false,
        pwd: '',
        pwdNew: '',
        pwdTips: false,
        pwdNewTips: false,
        TDK: {
          title: '支付密碼-聚寶盆',
          keyWords: '網絡理財，互聯網理財，理財，投資，投資理財，個人投資，網貸平臺，網貸投資，網貸，互金，互聯網金融，互金平臺，互聯網金融平臺，聚寶盆，聚寶計劃，分期投，月月盈，年年余，財富，P2P',
          description: '聚寶盆是壹家綜合性互聯網金融平臺，聚寶盆為廣大個人投資理財的用戶提供多元化的選擇與優質的服務。投資理財用戶可通過加入聚寶計劃、分期投、月月盈、年年余等產品進行投資獲得穩定收益。',
        }
      }
    },
    components: {
      'leftMenu': PersonalCenterMenu,
    },
    created() {

    },
    mounted() {
      this.$validator.updateDictionary(dictionary);
    },
    methods: {
      changePwd() {
        var self = this;
        self.$validator.validateAll({
          'pwd': this.pwd,
          'pwdNew': this.pwdNew
        }).then((result) => {
          if (result) {
            self.$http.post('/pbap-web/action/user/savePayPwd', {
              "payPwd": self.pwd
            }).then(response => {
              console.log('塵能夠給')
              self.$store.commit('setModal', {
                show: false,
                type: 'alert',
                msg: '支付密碼設置成功',
                confirmUrl: '/set'
              });
              self.$store.commit('showModal');
            })
          }
        });
      }
    }
  }
</script>
