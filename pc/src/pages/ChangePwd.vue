<template>
  <div id="PersonalCenter" class="rw-content changePwd-content profile clearfix">
    <div class="container">
      <!--<ol class="breadcrumb">
        <span>您現在的位置：</span>
        <li><router-link to="/accountOverview">我的帳戶</router-link></li>
        <li><router-link to="/set">帳戶安全</router-link></li>
        <li class="active">修改密碼</li>
      </ol>
      <leftMenu></leftMenu>-->
      <div class="pull-left right_content">
        <ul class="top-title-line list-inline">
          <li class="top-line1 top-orange">修改登錄密碼</li>
        </ul>
        <form action="" method="post" submit="changePwd" novalidate id="changePwdForm">
          <div class="personal-bar form-group">
            <h1>當前密碼</h1>
            <input type="password" v-if="!showPwd" v-model="pwd" minlength="6" maxlength="20"
                   autocomplete="new-password" placeholder="請輸入當前登錄密碼" class="form-control"
                   @focus="pwdTips=true" @blur="pwdTips=false"
                   v-validate="{rules:{required:true,pwd:true}}" name="pwd">
            <input type="text" v-if="showPwd" v-model="pwd" minlength="6" maxlength="20"
                   autocomplete="new-password" placeholder="請輸入當前登錄密碼" class="form-control"
                   @focus="pwdTips=true" @blur="pwdTips=false"
                   v-validate="{rules:{required:true,pwd:true}}" name="pwd">
            <span class="icon cipherText" :class="showPwd?'icon-eye-open':'icon-eye-close'"
                  @click="showPwd = !showPwd"></span>
            <div class="sj-error" v-if="pwdTips && !errors.first('pwd')">
              <span></span> <i>請輸入當前登錄密碼</i>
            </div>
            <div class="sj-error" v-if="errors.first('pwd')">
              <span></span> <i class="p-error">{{errors.first('pwd')}}</i>
            </div>
          </div>
          <div class="personal-bar form-group">
            <h1>新的密碼</h1>
            <input type="password" v-if="!showPwdNew" v-model="pwdNew" minlength="6" maxlength="20"
                   autocomplete="new-password" placeholder="請輸入新登錄密碼" class="form-control"
                   @focus="pwdNewTips=true" @blur="pwdNewTips=false"
                   v-validate="{rules:{required:true,pwd:true}}" name="pwdNew">
            <input type="text" v-if="showPwdNew" v-model="pwdNew" minlength="6" maxlength="20"
                   autocomplete="new-password" placeholder="請輸入新登錄密碼" class="form-control"
                   @focus="pwdNewTips=true" @blur="pwdNewTips=false"
                   v-validate="{rules:{required:true,pwd:true}}" name="pwdNew">
            <span class="icon cipherText" :class="showPwdNew?'icon-eye-open':'icon-eye-close'"
                  @click="showPwdNew = !showPwdNew"></span>
            <div class="sj-error" v-if="pwdNewTips && !errors.first('pwdNew')">
              <span></span> <i>請輸入新登錄密碼</i>
            </div>
            <div class="sj-error" v-if="errors.first('pwdNew')">
              <span></span> <i class="p-error">{{errors.first('pwdNew')}}</i>
            </div>
          </div>
          <button type="button" class="btn btn-warning" @click="changePwd">立即修改</button>
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
          required(){
            return '請輸入登錄密碼'
          }
        },
        pwdNew: {
          required(){
            return '請輸入登錄密碼'
          }
        },
      }
    }
  };
  export default {
    name: 'ChangePwd',
    data () {
      return {
        showPwd: false,
        showPwdNew: false,
        pwd: '',
        pwdNew: '',
        pwdTips: false,
        pwdNewTips: false,
        TDK:{
          title:'修改密碼-聚寶盆',
          keyWords:'網絡理財，互聯網理財，理財，投資，投資理財，個人投資，網貸平臺，網貸投資，網貸，互金，互聯網金融，互金平臺，互聯網金融平臺，聚寶盆，聚寶計劃，分期投，月月盈，年年余，財富，P2P',
          description:'聚寶盆是壹家綜合性互聯網金融平臺，聚寶盆為廣大個人投資理財的用戶提供多元化的選擇與優質的服務。投資理財用戶可通過加入聚寶計劃、分期投、月月盈、年年余等產品進行投資獲得穩定收益。',
        }
      }
    },
    components: {
      'leftMenu': PersonalCenterMenu,
    },
    mounted () {
      this.$validator.updateDictionary(dictionary);
    },
    methods: {
      changePwd(){
        var self = this;
        self.$http.post('/pbap-web/action/user/upt/changePassword', {
          "usrPwd" : self.pwd,
          "newUsrPwd" : self.pwdNew
        }).then(response => {
          if (response.body.errorInfo.errorCode == '0000') {
            self.$store.commit('setModal',{
              show:false,
              type:'alert',
              msg:'登錄密碼修改成功',
              confirmUrl:'/mineAccount'
            });
            self.$store.commit('showModal');
          }
        });
      }
    }
  }
</script>
