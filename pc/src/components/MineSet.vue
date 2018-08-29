<template>
  <div class="mine-set-warp">
    <div class="mine-img-warp">
      <div class="img">
        <img src="/static/img/noLogin.svg" alt="" style="width: 80px;">
      </div>
      <div class="user-info-warp">
        <p class="user-name">{{custInfo.realName ? custInfo.realName : custInfo.cusMobile}}</p>
        <p class="user-lev">安全等級: <span>低</span></p>
      </div>
    </div>
    <ul class="user-lit-info">
      <li class="user-info-item">
        <div class="tit">
          <p class="tit-h">
            銀行帳戶
          </p>
          <p class="tit-t">
            銀行合作資金存管
          </p>
        </div>
        <div class="desc" v-if = "custInfo.activateStatus != 1">
          未開通
        </div>
        <div class="desc" v-else>
          已開通
        </div>
        <div class="action" v-if = "custInfo.activateStatus != 1">
          暫未開放
        </div>
      </li>
      <li class="user-info-item">
        <div class="tit">
          <p class="tit-h">
            實名認證
          </p>
          <p class="tit-t">
            帳戶更安全出借更放心
          </p>
        </div>
        <div class="desc" v-if="custInfo.idcardStatus == 0">
          未上傳
        </div>
        <div class="desc" v-else-if="custInfo.idcardStatus == 1">
          已上傳認證中
        </div>
        <div class="desc" v-else-if="custInfo.idcardStatus == 3">
          通過
        </div>
        <div class="desc" v-else-if="custInfo.idcardStatus == 4">
          拒絕
        </div>
        <div class="action" @click="toNextSet" v-if="custInfo.idcardStatus != 3 && custInfo.idcardStatus != 1">
          立即認證
        </div>
        <div class="action" v-else-if="custInfo.idcardStatus == 3">
          已實名
        </div>
        <div class="action" v-else-if="custInfo.idcardStatus == 1">
          認證中
        </div>
      </li>
      <li class="user-info-item">
        <div class="tit">
          <p class="tit-h">
            綁定手機
          </p>
          <p class="tit-t">
            帳戶更安全出借更放心
          </p>
        </div>
        <div class="desc">
          {{custInfo.cusMobile}}
        </div>
        <div class="action">
          &nbsp;暫未開放
        </div>
      </li>
      <li class="user-info-item">
        <div class="tit">
          <p class="tit-h">
            綁定郵箱
          </p>
          <p class="tit-t">
            及時獲取帳戶資金變動通知和出借訊息
          </p>
        </div>
        <div class="desc">
          未綁定
        </div>
        <div class="action">
          暫未開放
        </div>
      </li>
      <li class="user-info-item">
        <div class="tit">
          <p class="tit-h">
            登錄密碼
          </p>
          <p class="tit-t">
            登錄帳戶時需要填寫密碼
          </p>
        </div>
        <div class="desc">
          已設置
        </div>
        <div class="action" @click="changeLoginPasswod">
          修改
        </div>
      </li>
      <li class="user-info-item">
        <div class="tit">
          <p class="tit-h">
            支付密碼
          </p>
          <p class="tit-t">
            保障帳戶安全，建議您定期更換密碼
          </p>
        </div>
        <div class="desc">
          {{custInfo.payPwdOK ? '已設置' : '未設置'}}
        </div>
        <div class="action" @click="changePayPasswod">
          {{custInfo.payPwdOK ? '修改' : '設置'}}
        </div>
      </li>
      <li class="user-info-item">
        <div class="tit">
          <p class="tit-h">
            風險評測
          </p>
          <p class="tit-t">
            了解風險承受能力，減少出借損失
          </p>
        </div>
        <div class="desc" style="width: 125px;" v-if="riskTest > 0">
          {{riskTest > 0 ? '已完成測評' : '您尚未進行測評'}}
        </div>
        <div class="desc" v-else>
          {{riskTest > 0 ? '已完成測評' : '您尚未進行測評'}}
        </div>
        <div class="action" @click="toRisk" v-if="riskTest == 0">
          去評測
        </div>
        <div class="action" v-else style="width: 144px;">
          {{riskTest | formatType}}
        </div>
      </li>
      <li class="user-info-item">
        <div class="tit">
          <p class="tit-h">
            註銷存管帳戶
          </p>
          <p class="tit-t">
            註銷後您將無法進行出借，請謹慎操作
          </p>
        </div>
        <div class="desc">
          您尚未進行測評
        </div>
        <div class="action">
          暫未開放
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "MineSet",
    data(){
      return {
        custInfo:{},
        riskTest:30,
      }
    },
    created(){
      var self = this;
      self.$http.post('/pbap-web/action/customer/query/custAuthInfo', {}).then((res) => {
        self.custInfo = res.body.respInfo.custInfo;
        self.riskTest = res.body.respInfo.custInfo.riskTest;
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
    methods:{
      toAccount() {
        this.$router.push({path: '/activateAccount'});
      },
      toNextSet() {
        this.$router.push({path: '/openAccounts'});
      },
      toRisk() {
        this.$router.push({name: 'RiskAssessment'});
      },
      changeLoginPasswod(){
        this.$router.push('/changePwds')
      },
      changePayPasswod() {
        if (!this.custInfo.payPwdOK) {
          this.$router.push('/setPayPwds')
        } else {
          this.$router.push('/changePayPwds')
        }
      }
    },
    filters: {
      formatType (val) {
        if (val < 28) {
          return '您屬於:保守型的投资者'
        } else if (val >= 28 && val < 39) {
          return  '您屬於:稳健型的投资者'
        } else if (val >= 39) {
          return '您屬於:积极的投资者'
        } else if (val == 0) {
          return '去評測'
        }
      }
    }
  }
</script>
