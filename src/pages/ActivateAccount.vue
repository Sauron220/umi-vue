<template>
  <div class="ActivateAccount" v-TDK="TDK">
    <div class="container">
      <div class="open-account">
        <div class="account-top">開通上海銀行資金存管賬戶</div>
        <div class="account-tip">
          您的賬戶已升級為上海銀行資金存管賬戶，請激活賬戶
        </div>
        <div class="account-form">
          <form action="" method="post" submit="activateAccount" novalidate
                id="openForm">
            <div class="form-bar clearfix">
              <span class="input-label">真實姓名</span> <div type="chinese" class="long-inp activa-input" style="color: #a8a8a8"
                                                         name="realName">{{custInfo.realName}}</div>
            </div>
            <div class="form-bar clearfix">
              <span class="input-label">身份證號</span> <div type="idNo" class="long-inp activa-input" style="color: #a8a8a8"
                                                         name="idNum" >{{custInfo.idNum}}</div>
            </div>
            <a class="bas-btn btn form-submit" href="javascript:void(0)"
               @click="activateAccount();">立即激活</a>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'ActivateAccount',
    data () {
      return {
        custInfo:{},
        TDK:{
          title:'開戶-聚寶盆',
          keyWords:'網絡理財，互聯網理財，理財，投資，投資理財，個人投資，網貸平臺，網貸投資，網貸，互金，互聯網金融，互金平臺，互聯網金融平臺，聚寶盆，聚寶計劃，分期投，月月盈，年年余，財富，P2P',
          description:'聚寶盆是壹家綜合性互聯網金融平臺，聚寶盆為廣大個人投資理財的用戶提供多元化的選擇與優質的服務。投資理財用戶可通過加入聚寶計劃、分期投、月月盈、年年余等產品進行投資獲得穩定收益。',
        }
      }
    },
    components: {
    },
    created(){
      let self =this;
      self.$http.post('/pbap-web/action/customer/query/custAuthInfo',{}).then((res)=>{
        self.custInfo = res.body.respInfo.custInfo;
      });
    },
    mounted () {
    },
    methods: {
      activateAccount(){
        let self = this;
        var newWin = window.open("", "_blank");
        newWin.document.write("頁面跳轉中，請稍後…");
        self.$http.post('/pbap-web/action/customer/upt/activateAccount',{}).then((res)=>{
          let form = res.body.respInfo.form;
          if(form){
            self.showRealNameAuthPrompt();
            newWin.document.write(form);
          }
        },(res) =>{
          newWin.close();
          self.$store.commit('setModal',{
            show:false,
            type:'alert',
            msg:res.body.errorInfo.errorMessage
          });
          self.$store.commit('showModal');
        });
      },
      showRealNameAuthPrompt(){
        let self = this;
        self.$store.commit('setModal',{
          show:false,
          type:'confirm',
          msg:'您賬戶操作是否已成功？',
          cancelUrl:'/helpCenter#3',
          cancelText:'遇到問題',
          confirmUrl:'/accountOverview',
          confirmText:'開通成功'
        });
        self.$store.commit('showModal');
      },
    }
  }
</script>
