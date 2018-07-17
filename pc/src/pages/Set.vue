<template>
  <div id="PersonalCenter" class="set-content profile clearfix" v-TDK="TDK">
    <div class="container">
      <ol class="breadcrumb">
        <span>您現在的位置：</span>
        <li><router-link to="/accountOverview">我的賬戶</router-link></li>
        <li class="active">賬戶安全</li>
      </ol>
      <leftMenu></leftMenu>
      <div class="pull-left right_content">
        <ul class="top-title-line list-inline">
          <li class="top-line1 top-orange">
            <span class="active">賬戶安全</span>
          </li>
        </ul>

        <!--<div class="bar clearfix">
          <h1>銀行存管賬戶</h1>
          <h2 class="no-set" v-if="custInfo.activateStatus != 1">未開通</h2>
          <h2 class="set" v-if="custInfo.activateStatus == 1">已開通</h2>
          <p>為了您的資金安全，必須開通上海銀行存管賬戶，才能投資</p>
          <span v-if="custInfo.activateStatus != 1">
          <router-link class="go-real" :to="isOpen">開戶</router-link>
        </span>
          <span v-if="custInfo.activateStatus == 1">{{custInfo.bankAccCode}}</span>
        </div>-->
        <div class="bar clearfix">
          <h1>支付密碼</h1>
          <h2 class="no-set" v-if="!custInfo.payPwdOK">未設置</h2>
          <h2 class="set" v-if="custInfo.payPwdOK">已設置</h2>
          <p>保障帳戶安全，建議您定期更換密碼</p>
          <span>
            <router-link class="modify" v-if="!custInfo.payPwdOK" to="/setPayPwd">設置</router-link>
            <router-link class="modify" v-if="custInfo.payPwdOK" to="/changePayPwd">修改</router-link>
        </span>
        </div>
        <div class="bar clearfix">
          <h1>實名認證</h1>
          <h2 class="no-set" v-if="custInfo.idcardStatus != 3">未實名</h2>
          <h2 class="set" v-if="custInfo.idcardStatus == 3">已實名</h2>
          <p>實名認證</p>
          <span v-if="custInfo.idcardStatus != 3 && custInfo.idcardStatus != 1">
          <router-link class="go-real" to="/openAccount">認證</router-link>
        </span>
          <span class="modify" v-if="custInfo.idcardStatus == 1">已上傳認證中</span>
        </div>
        <div class="bar clearfix">
          <h1>登錄密碼</h1>
          <h2 class="set">已設置</h2>
          <p>保障帳戶安全，建議您定期更換密碼</p>
          <span>
          <router-link class="modify" to="/changePwd">修改</router-link>
        </span>
        </div>
        <div class="bar clearfix">
          <h1>手機號碼</h1>
          <h2 class="set">已設置</h2>
          <p>保障帳戶與資金安全，是您最重要的身份憑證</p>
          <span class="cusMobile">{{custInfo.cusMobile}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import PersonalCenterMenu from '../components/PersonalCenterMenu'

  export default {
    name: 'Set',
    data () {
      return {
        custInfo: {},
        isOpen:'',
        TDK:{
          title:'安全設置-聚寶盆',
          keyWords:'網絡理財，互聯網理財，理財，投資，投資理財，個人投資，網貸平臺，網貸投資，網貸，互金，互聯網金融，互金平臺，互聯網金融平臺，聚寶盆，聚寶計劃，分期投，月月盈，年年余，財富，P2P',
          description:'聚寶盆是壹家綜合性互聯網金融平臺，聚寶盆為廣大個人投資理財的用戶提供多元化的選擇與優質的服務。投資理財用戶可通過加入聚寶計劃、分期投、月月盈、年年余等產品進行投資獲得穩定收益。',
        }
      }
    },
    components: {
      'leftMenu': PersonalCenterMenu,
    },
    created () {
      var self = this;
      self.$http.post('/pbap-web/action/customer/query/custAuthInfo', {}).then((res) => {
        self.custInfo = res.body.respInfo.custInfo;
        console.log('realName',self.custInfo)
        if (self.custInfo.idcardStatus != 3) {
          self.isOpen = '/openAccount';
        } else if (self.custInfo.idcardStatus == 3) {
          if(self.custInfo.activateStatus != 1){
            self.isOpen = '/activateAccount';
          }
        }
      });
    },
    mounted () {

    },
    methods: {

    }

  }
</script>

