<template>
  <div class="personal-warp form-horizontal">
    <form action="" onsubmit="return false">
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
                 v-model="idCard"
                 class="form-control"
                 id="idCard" placeholder="請填寫正確身份證號">
        </div>
        <i class="p-error" style="top: 36px;left: 142px;" v-if="errors.first('idCard')"><span class="icon icon-reject-o"></span>{{errors.first('idCard')}}</i>
      </div>
      <!--<div class="form-group personal-item form-bar clearfix">
        <label for="phone" class="col-sm-3 control-label"><i class="required">*</i>手機驗證</label>
        <div class="col-sm-5">
          <input v-model="smsCode" type="text" placeholder="請輸入簡訊驗證碼"
                 @focus="codeTips=true;clearError('smsCode')" @blur="codeTips=false"
                 class="form-control"
                 autocomplete="off" minlength="6" maxlength="6" name="smsCode"
                 v-validate="{rules:{hasGetCode:hasGetCode,required:true,digits:6}}">
        </div>
        <span class="btn btn-warning btn-code col-sm-2" style="width: 21.6667%;" @click="getCode()" v-if="!getCodeFlag">獲取驗證碼</span>
        <span class="btn btn-warning btn-code disabled col-sm-2" style="width: 21.6667%;"  v-if="getCodeFlag">{{getCodeText}}</span>
        <i class="p-error tips" style="top: 36px;left: 142px;" v-if="codeTips && !errors.first('smsCode')"><span class="icon icon-info-o"></span>短信驗證碼為6位數字</i>
        <i class="p-error" style="top: 36px;left: 142px;" v-if="errors.first('smsCode')"><span class="icon icon-reject-o"></span>{{errors.first('smsCode')}}</i>
      </div>-->
      <!--<div class="form-group personal-item">
        <label for="email" class="col-sm-3 control-label"><i class="required">*</i>電子郵箱</label>
        <div class="col-sm-8">
          <input type="text" v-model="email" autocomplete="off" class="form-control" id="email" placeholder="請填寫正確郵箱">
        </div>
      </div>-->
      <div class="form-group personal-item">
        <label for="companyName" class="col-sm-3 control-label">公司名稱</label>
        <div class="col-sm-8">
          <input type="text" v-model="companyName" class="form-control" id="companyName" placeholder="請填寫正確公司名稱">
        </div>
      </div>
      <!--<div class="form-group personal-item">
        <label for="peopleNum" class="col-sm-3 control-label"><i class="required">*</i>企業規模</label>
        <div class="col-sm-8">
          <input type="text" v-model="peopleNum" class="form-control" id="peopleNum" placeholder="請填寫正確公司名稱">
        </div>
      </div>-->
      <div class="form-group personal-item">
        <label for="address" class="col-sm-3 control-label">公司地址</label>
        <div class="col-sm-8">
          <input type="text" v-model="address" class="form-control" id="address" placeholder="請填寫正確公司地址">
        </div>
      </div>
      <div class="form-group personal-item">
        <label for="companyNo" class="col-sm-3 control-label" style="padding: 0;width: 148px;padding-top: 7px;">公司統一編號</label>
        <div class="col-sm-8" style="padding-left: 0;width: 64%;">
          <input type="text" v-model="companyNo" class="form-control" id="companyNo" placeholder="請填寫公司統一編號">
        </div>
      </div>
      <!--<div class="form-group personal-item">
        <label for="postio" class="col-sm-3 control-label">職&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;位</label>
        <div class="col-sm-8">
          <input type="text" v-model="postio" class="form-control" id="postio" placeholder="請填寫正確戶籍地址">
        </div>
      </div>-->
      <!--<div class="form-group personal-item">
        <label for="invite" class="col-sm-3 control-label">邀&nbsp;&nbsp;請&nbsp;&nbsp;碼</label>
        <div class="col-sm-8">
          <input type="text" v-model="invite" class="form-control" id="invite" placeholder="非必填項，若無邀請碼可不填">
        </div>
      </div>-->
      <div class="form-group personal-item">
        <label for="money" class="col-sm-3 control-label">借款金額</label>
        <div class="col-sm-8">
          <input type="number" v-model="money" class="form-control" id="money" placeholder="請填寫借款金額">
        </div>
      </div>
      <div class="form-group personal-item">
        <label for="cause" class="col-sm-3 control-label">借款用途</label>
        <div class="col-sm-8">
          <input type="text" v-model="cause" class="form-control" id="cause" placeholder="請填寫借款用途">
        </div>
      </div>
      <div class="form-group personal-item">
        <label for="cause" class="col-sm-3 control-label" style="visibility: hidden;">借款事由</label>
        <div class="col-sm-8">
          <button type="button" class="btn btn-danger col-sm-12" @click="submitMes"
                  style="background: #ff6633;outline: none;border: none;padding: 10px 0;">發送</button>
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
        companyNo:'',
        address:'',
        cause:'',
        money:'',
        showPwd: false,
        pwd: '',
        imgCode: '',
        smsCode: '',
        rcmCode: '',
        invite:'',
        imgUrl: Math.random(),
        codeTips: false,
        pwdTips: false,
        hasGetCode: 0,
        getCodeText: '',
        getCodeFlag: false,
        recommendCode: false,
        hasAccept: true,
        hasRequestSmsCode: false,
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
              merType: 2,
              merName: self.name,
              merMobile: self.phone,
              idNum: self.idCard,
              company: self.companyName,
              address: self.address,
              trdAmount: self.money,
              purpose: self.cause,
              orgCode: self.companyNo,
            }).then((res) => {
              if (res.body.errorInfo.errorCode == '0000') {
                self.$store.commit('setModal', {
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
                self.companyNo='';
                self.$validator.clean();
              }
            })
          }
        });
      },
      getCode() {
        var self = this;
        self.$validator.validateAll({
          'phone': this.phone,
          'imgCode': this.imgCode
        }).then((result) => {
          if (result) {
            self.$http.post('/pbap-web/action/user/query/verifyUser', {
              "usrName": self.phone
            }).then(response => {
              if (response.body.respInfo.userCount == 1) {
                self.loadImage();
                self.$store.commit('setModal', {
                  show: false,
                  type: 'alert',
                  msg: '手機號已被占用'
                });
                self.$store.commit('showModal');
              } else {
                self.hasGetCode++;
                self.$http.post('/pbap-web/action/user/add/sendSmsCode', {
                  "cusMobile": self.phone,
                  "smsType": 3,
                  "randNum": self.imgCode
                }).then(response => {
                  if (response.body.errorInfo.errorCode == '0000') {
                    self.getCodeFlag = true;
                    var countDown = 60;
                    self.getCodeText = countDown + '秒後重新發送';
                    var countDownTime = setInterval(function () {
                      if (countDown > 0) {
                        self.getCodeText = countDown + '秒後重新發送';
                        countDown--;
                      } else {
                        clearInterval(countDownTime);
                        self.getCodeFlag = false;
                      }
                    }, 1000)
                  } else {
                    self.loadImage();
                  }
                }, response => {
                  self.loadImage();
                });
              }
            }, response => {
              self.loadImage();
            });
          }
        }).catch(() => {
          self.loadImage();
        });
      },
    },
    mounted() {
      this.$validator.updateDictionary(dictionary);
    },
  }
</script>
