<template>
  <div class="personal-warp form-horizontal">
    <form action="" onsubmit="return false" ref="forM">
      <div class="form-group personal-item">
        <label for="name" class="col-sm-3 control-label">姓<span style="visibility: hidden;">姓名</span>名</label>
        <div class="col-sm-8">
          <input type="text" v-model="name" @focus="tips=true;clearError('name')"
                 @blur="tips=false;" autocomplete="off" name="name"
                 v-validate="{rules:{required:true,chinese:true}}"
                 class="form-control" id="name" placeholder="請填寫正確姓名">
        </div>
        <i class="p-error" style="top: 36px;left: 142px;" v-if="errors.first('name')"><span class="icon icon-reject-o"></span>{{errors.first('name')}}</i>
      </div>
      <div class="form-group personal-item">
        <label for="phone" class="col-sm-3 control-label">手機號碼</label>
        <div class="col-sm-8">
          <input type="text"
                 v-model="phone" @focus="tips=true;clearError('phone')"
                 @blur="tips=false;" autocomplete="off" maxlength="10" name="phone"
                 v-validate="{rules:{required:true,digits:10,phoneNum:true}}"
                 class="form-control" id="phone" placeholder="請填寫正確手機號碼">
        </div>
        <i class="p-error" style="top: 36px;left: 142px;" v-if="errors.first('phone')"><span class="icon icon-reject-o"></span>{{errors.first('phone')}}</i>
      </div>
      <div class="form-group personal-item">
        <label for="idCard" class="col-sm-3 control-label">身份證號</label>
        <div class="col-sm-8">
          <input type="text"
                 v-model="idCard" autocomplete="off"
                 class="form-control" id="idCard" placeholder="請填寫正確身份證號碼">
        </div>
        <!--<i class="p-error" style="top: 36px;left: 142px;" v-if="errors.first('idCard')"><span class="icon icon-reject-o"></span>{{errors.first('idCard')}}</i>-->
      </div>
      <div class="form-group personal-item">
        <label for="companyName" class="col-sm-3 control-label">公司名稱</label>
        <div class="col-sm-8">
          <input type="text" autocomplete="off" v-model="companyName" class="form-control" id="companyName" placeholder="請填寫正確公司名稱">
        </div>
      </div>
      <div class="form-group personal-item">
        <label for="address" class="col-sm-3 control-label">戶籍地址</label>
        <div class="col-sm-8">
          <input type="text" autocomplete="off" v-model="address" class="form-control" id="address" placeholder="請填寫正確戶籍地址">
        </div>
      </div>
      <div class="form-group personal-item">
        <label for="money" class="col-sm-3 control-label">借款金額</label>
        <div class="col-sm-8">
          <input type="text" autocomplete="off" v-model="money" class="form-control" id="money" placeholder="請填寫借款金額">
        </div>
      </div>
      <div class="form-group personal-item">
        <label for="cause" class="col-sm-3 control-label">借款事由</label>
        <div class="col-sm-8">
          <input type="text" autocomplete="off" v-model="cause" class="form-control" id="cause" placeholder="請填借款事由">
        </div>
      </div>
      <div class="form-group personal-item">
        <label for="cause" class="col-sm-3 control-label" style="visibility: hidden;">借款事由</label>
        <div class="col-sm-8">
          <button type="button" class="btn btn-danger col-sm-12" @click="submitMes"
                  style="background: #f26921;outline: none;border: none;padding: 10px 0;">發送</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
  const dictionary = {
    en: {
      custom: {
        phone: {
          required() {
            return '請輸入手機號碼'
          },
          digits() {
            return "手機號碼為10位數字"
          }
        },
        name: {
          required() {
            return '請輸入姓名'
          },
        },
        idCard: {
          required() {
            return '請輸入身份證'
          },
        },
        pwd: {
          required() {
            return '請輸入登錄密碼'
          }
        },
        imgCode: {
          required() {
            return '請輸入圖形驗證碼'
          },
          min() {
            return '請輸入正確的圖形驗證碼'
          },
          max() {
            return '請輸入正確的圖形驗證碼'
          }
        },
        smsCode: {
          required() {
            return '請輸入驗證碼'
          },
          digits() {
            return '驗證碼長度6位'
          },
          hasGetCode() {
            return '請先獲取驗證碼'
          }
        }
      }
    }
  };

  export default {
    name: "PersonalBorrow",
    data() {
      return {
        tips: false,
        name:'',
        phone:'',
        idCard:'',
        companyName:'',
        address:'',
        money:'',
        cause:'',
      }
    },
    created() {

    },
    methods: {
      clearError(name) {
        this.errors.remove(name);
      },
      submitMes() {
        const self = this;
        self.$validator.validateAll().then((result) => {
          if (result) {
            self.$http.post('/pbap-web/action/lbmsMember/save', {
              merType: 1,
              merName: self.name,
              merMobile: self.phone,
              idNum: self.idCard,
              company: self.companyName,
              address: self.address,
              trdAmount: self.money,
              purpose: self.cause,
            }).then((res) => {
              if (res.body.errorInfo.errorCode == '0000') {
                this.$store.commit('setModal', {
                  type: 'alert',
                  msg: '您的申請已經發送，請耐心等待，專職客服稍後會與您聯繫！',
                })
                self.$store.commit('showModal');
                self.name='';
                self.phone='';
                self.idCard='';
                self.companyName='';
                self.address='';
                self.money='';
                self.cause='';
                self.$validator.clean();
              }
            })
          }
        });
      }
    },
    mounted() {
      this.$validator.updateDictionary(dictionary);
    },
  }
</script>
