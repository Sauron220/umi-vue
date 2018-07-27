<template>
  <div class="mine-set-warp">
    <div class="mine-img-warp">
      <div class="img">
        <img src="/static/img/tuijian.png" alt="">
      </div>
      <div class="user-info-warp">
        <p class="user-name">WE68317889</p>
        <p class="user-lev">安全等級: <span>低</span></p>
      </div>
    </div>
    <ul class="user-lit-info">
      <li class="user-info-item">
        <div class="tit">
          <p class="tit-h">
            存管賬戶
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
          暂未开放
        </div>
      </li>
      <li class="user-info-item">
        <div class="tit">
          <p class="tit-h">
            實名認證
          </p>
          <p class="tit-t">
            賬戶更安全出借更放心
          </p>
        </div>
        <div class="desc" v-if="custInfo.idcardStatus != 3">
          未認證
        </div>
        <div class="desc" v-else>
          已認證
        </div>
        <div class="action" @click="toNextSet" v-if="custInfo.idcardStatus != 3">
          立即認證
        </div>
        <div class="action" v-else>
          已實名
        </div>
      </li>
      <li class="user-info-item">
        <div class="tit">
          <p class="tit-h">
            綁定手機
          </p>
          <p class="tit-t">
            賬戶更安全出借更放心
          </p>
        </div>
        <div class="desc">
          {{custInfo.cusMobile}}
        </div>
        <div class="action">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;修改
        </div>
      </li>
      <li class="user-info-item">
        <div class="tit">
          <p class="tit-h">
            綁定郵箱
          </p>
          <p class="tit-t">
            及時獲取賬戶資金變動通知和出借訊息
          </p>
        </div>
        <div class="desc">
          未綁定
        </div>
        <div class="action">
          暂未开放
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
        <div class="desc">
          您尚未進行測評
        </div>
        <div class="action" @click="toRisk">
          &nbsp;&nbsp;&nbsp;去評測
        </div>
      </li>
      <li class="user-info-item">
        <div class="tit">
          <p class="tit-h">
            註銷存管賬戶
          </p>
          <p class="tit-t">
            註銷後您將無法進行出借，請謹慎操作
          </p>
        </div>
        <div class="desc">
          您尚未進行測評
        </div>
        <div class="action">
          暂未开放
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
      }
    },
    created(){
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
    methods:{
      toAccount() {
        this.$router.push({path: '/activateAccount'});
      },
      toNextSet() {
        this.$router.push({path: '/openAccount'});
      },
      toRisk() {
        this.$router.push({name: 'RiskAssessment'});
      }
    }
  }
</script>
