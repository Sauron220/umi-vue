<template>
  <div class="bucketGlod product-detail" style="background: none;" v-TDK="TDK">
    <div class="nav-bar-tit">
      <span>您現在的位置:</span>
      <router-link to="/">首頁></router-link>
      <router-link to="" v-if="productDetail.prdName && productDetail.prdName.indexOf('聚寶計劃') == -1">{{productDetail.prdName && productDetail.prdName.substr(0,3)}}></router-link>
      <router-link to="" v-else>{{productDetail.prdName && productDetail.prdName.substr(0,4)}}></router-link>
      <span>{{productDetail.prdName}}</span>
    </div>
    <div class="content-warp">
      <div class="bucket-top">
        <div class="bucket-top-hed">
          <div class="bucket-top-hed-lf">
            <span class="bucket-top-hed-lf-h">{{productDetail.prdName}} 新手投資</span>
            <span class="bucket-top-hed-lf-d">使用紅包，回報更高</span>
          </div>
          <div class="bucket-top-hed-ri" @click="toProtocal">
            協議範本
          </div>
        </div>
        <div class="bucket-top-con">
          <div class="bucket-top-con-lf">
            <div class="rate">
              <p class="rate-num"><span>{{productRate(productDetail.defaultRate, productDetail.rewardRate)}}</span><span></span></p>
              <p class="desc">預期年化收益</p>
              <div class="bottom-img"><img src="static/img/tuijian.png" alt=""><span>銀行存管</span></div>
            </div>
            <div class="divider-line"></div>
            <div class="date">
              <p class="date-num">{{productDetail.prdPeriod}} <span>天</span></p>
              <p class="desc">借款期限</p>
              <div class="bottom-img second"><img src="static/img/tuijian.png" alt=""><span>合規排名位居前列</span></div>
            </div>
            <div class="divider-line"></div>
            <div class="money">
              <p class="money-num">{{$fmoney(productDetail.prdAmount)}} <span>元</span></p>
              <p class="desc">計劃金額</p>
              <div class="bottom-img"><img src="static/img/tuijian.png" alt=""><span>穩健運營</span></div>
            </div>
          </div>
          <div class="bucket-top-con-ri product-intro">
            <form v-if="productDetail.status == 11 || productDetail.status == 12" action="" method="post" id="payForm" submit="investRule" novalidate="" style="width: 300px;">
              <div class="balance clearfix pay-info" style="line-height: 30px;width: 280px;" >
                <i class="pull-left">帳戶餘額</i>
                <div class="account-info" v-if="userInfo.loginResult">
                  <span class="pull-left" style="color:#f05a23;">{{$fmoney(accountInfo.balanceAmount)}}元</span>
                  <a class="charge pull-right" href="/recharge" v-if="custInfo.tpStatus==1 && custInfo.payPwdOK"
                     target="_blank">匯款</a>
                  <a class="charge pull-right" href="javascript:;" v-if="custInfo.tpStatus!=1 || !custInfo.payPwdOK"
                     @click="linkToRealName();">匯款</a>
                </div>
                <div class="account-info" v-if="!userInfo.loginResult">
                  <span class="pull-left"><a :href="loginUrl" style="color:#f05a23;">登錄</a>後可見</span>
                </div>
              </div>
              <div class="money-warp" style="margin-top: 15px;width: 280px;">
                <input  type="text" name="invest" style="width: 280px;"
                       maxlength="10"
                       v-model="invest"
                       :placeholder="inputPlaceholder"
                       v-validate="{ rules: { required: true,
                                           investRule: [
                                             productDetail.minInvAmt,
                                             productDetail.maxInvAmt,
                                             productDetail.remainAmount,
                                             accountInfo.balanceAmount,
                                             invest
                                           ]}}"
                       :readonly="productDetail.minInvAmt > productDetail.remainAmount || !userInfo.loginResult || productDetail.status == 12">
                <span>元</span>
                <i class="p-error" style="color: #307bf2" v-if="errors.first('invest') && userInfo.loginResult">{{errors.first('invest')}}</i>
              </div>
              <div class="desc" v-if="!userInfo.loginResult">
                <span class="desc-lf">剩餘金額17,620,000 元 </span>
                <span class="desc-ri"> 加入上限10,000 元</span>
              </div>
              <div class="bucket-top-btn" style="width: 280px;"
                   v-if="productDetail.status == 11"
                   @click="investComfirm">加入</div>
              <a
                :href="userInfo.loginResult ? 'javascript:;':loginUrl"
                class="bucket-top-btn" style="display: inline-block;width: 280px;"
                v-else>加入</a>
            </form>
            <div class="other-status text-center" v-if="productDetail.status == 20">  <!-- 還款中 -->
              <img src="../assets/images/private_status_1.png">
              <p>退出時間 <span data-prd="dueDate">{{productDetail.dueDate}}</span></p>
            </div>
            <div class="other-status text-center" v-if="productDetail.status == 16">  <!-- 停止 -->
              <img src="../assets/images/private_status_2.png">
            </div>
            <div class="other-status text-center" v-if="productDetail.status == 30">  <!-- 已還款 -->
              <img src="../assets/images/private_status_3.png">
              <p>退出時間 <span data-prd="dueDate">{{productDetail.dueDate}}</span></p>
            </div>
            <div class="other-status text-center" v-if="productDetail.status == 14">  <!-- 已滿額 -->
              <img src="../assets/images/private_status_4.png">
            </div>
            <div class="other-status text-center" v-if="productDetail.status == 0">  <!-- 已下架 -->
              <img src="../assets/images/private_status_5.png">
            </div>
          </div>
        </div>
      </div>
      <div class="plan-warp">
        <div class="plan-warp-hed">
          <div>計畫進度</div>
          <div class="jion-plan" @click="toHelp">如何加入{{productDetail.prdName}}</div>
        </div>
        <div class="plan-warp-con">
          <div class="plan-warp-con-lf">
            <div class="date-start">
              <p>開始加入</p>
              <p v-if="productDetail.colBeginDate" style="color: #999;">{{moment(productDetail.colBeginDate).format('YYYY年MM月DD日')}}</p>
              <p style="visibility: hidden;" v-else>隐藏</p>
            </div>
            <div class="line-path"></div>
            <div class="bg-progess">1~2天起息</div>
          </div>
          <div class="plan-warp-con-ri">
            <div class="date-start">
              <div>
                <p>進入鎖定日期</p>
                <p v-if="productDetail.colEndDate" style="color: #999;">{{moment(productDetail.colEndDate).format('YYYY年MM月DD日')}}</p>
                <p style="visibility: hidden;" v-else>隐藏</p>
              </div>
              <div style="text-align: right;">
                <p>到期退出</p>
                <p v-if="productDetail.dueDate" style="color: #999;">{{moment(productDetail.dueDate).format('YYYY年MM月DD日')}}</p>
                <p style="visibility: hidden;" v-else>隐藏</p>
              </div>
            </div>
            <div class="line-path"></div>
            <div class="bg-progess">{{productDetail.prdPeriod}}天持續計息</div>
          </div>
        </div>
      </div>
      <div class="desc-answer-warp">
        <div class="desc-answer-hed">
          <div class="" :class="{'active-select': flag==1}" @click="toNext(1)">計劃進度</div>
          <div class="" :class="{'active-select': flag==2}" @click="toNext(2, proCode)">加入記錄</div>
          <!--<div class="" :class="{'active-select': flag==3}" @click="toNext(3)">借款信息</div>
          <div class="" :class="{'active-select': flag==4}" @click="toNext(4)">計劃表現</div>-->
          <div class="" :class="{'active-select': flag==5}" @click="toNext(5)">常見問題</div>
        </div>
        <div class="view-warp">
          <router-view></router-view>
        </div>
      </div>

      <!-- 購買 -->
      <div class="buy-confirm" v-if="buyConfirm">
        <div class="modal-backdrop fade in"></div>
        <div class="modal-dialog">
          <div class="modal-header">
            <h4 class="modal-title text-center">加入確認
              <a href="javascript:;" class="close" @click="buyConfirm = !buyConfirm">×</a>
            </h4>
          </div>
          <div class="modal-body form-horizontal">
            <div class="form-group">
              <label class="col-xs-4 control-label">產品名稱</label>
              <div class="col-xs-8">
                <div class="form-control-static ell">{{productDetail.prdName}}</div>
              </div>
            </div>
            <div class="form-group">
              <label class="col-xs-4 control-label">預期年化</label>
              <div class="col-xs-8">
                <div class="form-control-static text-warning">
                  {{productRateSimple(productDetail.defaultRate, productDetail.rewardRate)}}
                  <span class="text-danger" v-if="coupon && coupon.cpnInfo && coupon!=0">
                                    {{'+' + $fmoney($formatNum(coupon.cpnInfo, 100)) + '%'}}
                                </span>
                </div>
              </div>
            </div>
            <div class="form-group">
              <label class="col-xs-4 control-label">借款期限</label>
              <div class="col-xs-8">
                <div class="form-control-static"><span>{{productDetail.prdPeriod}}</span>天</div>
              </div>
            </div>
            <div class="form-group">
              <label class="col-xs-4 control-label">加入金額</label>
              <div class="col-xs-8">
                <div class="form-control-static text-warning">{{$fmoney(invest)}}元</div>
              </div>
            </div>
            <div class="form-group">
              <label class="col-xs-4 control-label">優惠券</label>
              <div class="col-xs-8">
                <select v-model="coupon" class="form-control" name="" id="constellation">
                  <option value="0">{{couponList.length == 0 ? '沒有合適加息券':'請選擇加息券'}}</option>
                  <option v-for="item in couponList" :value="item" v-if="item.status==0">
                    <span v-if="item.beginTime === '2017.02.14'">情人節</span>
                    <span v-if="inTheArray(item.beginTime)">女王節</span>
                    <span v-if="item.cpnInfo">{{'加息券 +' + $formatNum(item.cpnInfo, 100) + '%'}}</span>
                  </option>
                </select>
              </div>
            </div>
            <div class="form-group" style="margin-bottom: 40px;">
              <label class="col-xs-4 control-label">支付密碼</label>
              <div class="col-xs-8">
                <input type="password" v-if="!showPwd" v-model="payPwd" minlength="6" maxlength="20"
                       autocomplete="new-password" placeholder="請輸入支付密碼" class="form-control"
                       @focus="pwdTips=true" @blur="pwdTips=false"
                       v-validate="{rules:{required:true,payPwd:true}}" name="payPwd">
                <input type="text" v-if="showPwd" v-model="payPwd" minlength="6" maxlength="20"
                       autocomplete="new-password" placeholder="請輸入支付密碼" class="form-control"
                       @focus="pwdTips=true" @blur="pwdTips=false"
                       v-validate="{rules:{required:true,payPwd:true}}" name="payPwd">
                <span class="icon cipherText" :class="showPwd?'icon-eye-open':'icon-eye-close'"
                      @click="showPwd = !showPwd" style="left: 235px;top: 5px;"></span>
                <div class="sj-error" v-if="errors.first('payPwd')">
                  <i class="p-error">{{errors.first('payPwd')}}</i>
                </div>
                <a class="forget-pay-pwd" href="/changePayPwd">忘記密碼</a>
              </div>
            </div>
            <a class="btn btn-warning btn-block btn-lg submit" target="_blank"
               @click="setBuyUrl()">立即加入</a>
            <div class="col-xs-offset-1 col-xs-10">
              <br>
              <br>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Tool from '../util/ProductTool.js'
  import moment from 'moment'

  export default {
    name: "BucketGold",
    data() {
      return {
        money: '',
        flag: 1,
        proCode:'',
        custInfo: {},
        tpStatus: '',
        productDetail: {},
        inputPlaceholder: '',
        loginUrl: '',
        invest: null,
        coupon: 0,
        couponText: '',
        couponList: [],
        payPwd: '',
        showPwd: false,
        buyConfirm: false,
        invData: {},
        TDK: {
          title: '理財產品',
          keyWords: '尊享計劃,p2p理財產品,個人理財產品,如何理財,年化收益率',
          description: '聚寶盆-尊享計劃，是聚寶盆推出的壹款高端理財產品，預期年化收益高達12%！個人最好的理財產品之壹，聚寶盆幫您制定個人理財規劃，理財產品排行就選聚寶盆，6道風控審核保障，理財更安全！',
        }
      }
    },
    computed: {
      userInfo() {
        return this.$store.state.userInfo
      },
      accountInfo() {
        return this.$store.state.accountInfo
      }
    },
    created() {
      const self = this;
      const _proCode = sessionStorage.getItem('proCode');
      self.proCode = _proCode;
      this.$router.replace({path: '/bucketGold'});


      self.$http.post('/pbap-web/action/customer/query/custAuthInfo', {}).then((res) => {
        self.custInfo = res.body.respInfo.custInfo;
        self.tpStatus = res.body.respInfo.custInfo.tpStatus;
      });

      self.loginUrl = '/login?remark=' + location.pathname; // 設置登錄成功後的跳轉連結

      self.getProductDetail(_proCode, function () {
        self.setPlaceholder();
        if (self.productDetail.remainAmount >= self.productDetail.minInvAmt) {
          self.invest = self.productDetail.minInvAmt;
        } else {
          self.invest = self.productDetail.remainAmount;
        }
        self.getWelfareReminder(self.productDetail.prdType);
        self.TDK.title = self.productDetail.prdName + '-' + self.TDK.title;
        self.$store.commit('setPrdName', self.productDetail.prdName);
      })
      // self.getInvestRecord(1, _proCode);
    },
    methods: {
      moment,
      toNext(id, code) {
        const _that = this;
        switch (id) {
          case 1:
            _that.flag = 1;
            localStorage.setItem('flag', 1);
            this.$router.replace({path: '/bucketGold'});
            break;
          case 2:
            _that.flag = 2;
            localStorage.setItem('flag', 2);
            this.$router.replace({path: '/custTable/' + code});
            break;
          case 3:
            _that.flag = 3;
            localStorage.setItem('flag', 3);
            this.$router.replace({path: '/custTableTwo/' + id});
            break;
          case 4:
            _that.flag = 4;
            localStorage.setItem('flag', 4);
            this.$router.replace({path: '/plannedPerformance'});
            break;
          case 5:
            _that.flag = 5;
            localStorage.setItem('flag', 5);
            this.$router.replace({path: '/commonProblems', query:{ proType: _that.productDetail.prdName }});
            break;
          default:
        }
      },
      setPlaceholder() {
        var self = this;
        self.inputPlaceholder = '至少投資' + self.$fmoneyFormat(self.productDetail.minInvAmt) + '元'
      },
      investComfirm() {
        var self = this;
        if (self.userInfo.loginResult) {  //登錄情況
          self.$http.post('/pbap-web/action/customer/query/custAuthInfo', {}).then((res) => {
            self.tpStatus = res.body.respInfo.custInfo.tpStatus;
            self.activateStatus = res.body.respInfo.custInfo.activateStatus;
            console.log('self.tpStatus=', self.tpStatus);
            if (self.tpStatus == 1) {
              if (!self.custInfo.payPwdOK) {
                this.$store.commit('setModal', {
                  type: 'confirm',
                  msg: '為了您的資金安全，請先設置支付密碼',
                  confirmUrl: '/setPayPwd',
                  confirmText: "立即設置"
                })
                this.$store.commit('showModal')
              } else {
                self.$validator.validateAll().then((result) => {
                  if (result) {
                    self.buyConfirm = !self.buyConfirm;
                    self.getCooper(self.proCode);
                    self.getWelfareReminder(self.productDetail.prdType);
                  }
                });
              }
            } else if (self.tpStatus == 0) {
              this.$store.commit('setModal', {
                type: 'confirm',
                msg: '為了您的資金安全，請先完成實名認證',
                confirmUrl: '/openAccount',
                confirmText: "立即實名"
              })
              this.$store.commit('showModal')
            }
          });
        }
      },
      setBuyUrl() {
        var self = this;
        var _prdCode = self.productDetail.prdCode;
        sessionStorage.setItem('proCode', _prdCode);
        self.$validator.validateAll({'payPwd': self.payPwd}).then((result) => {
          if (result) {
            // self.buyHandle('/product/' + self.productDetail.prdCode);
            self.buyHandle('/bucketGold');
            if (self.coupon && self.coupon != 0) {
              let url = '/buy?prdCode=' + self.proCode + '&relAmount=' + self.invest + '&cpnNum=' + self.coupon.cpnNum + '&payPwd=' + self.payPwd
              window.open(url, '_blank');
            } else {
              let url = '/buy?prdCode=' + self.proCode + '&relAmount=' + self.invest + '&payPwd=' + self.payPwd
              window.open(url, '_blank');
            }
          }
        });
      },
      toHelp() {
        this.$router.push({name: 'HelpCenter'});
      },
      toProtocal() {
        this.$router.push({name: 'ProtocalText'});
      },
      linkToRealName() {
        let self = this;
        if (self.custInfo.tpStatus == 1) {
          if (!self.custInfo.payPwdOK) {
            this.$store.commit('setModal', {
              type: 'confirm',
              msg: '為了您的資金安全，請先設置支付密碼',
              confirmUrl: '/setPayPwds',
              confirmText: "立即設置"
            })
            this.$store.commit('showModal')
          }
        } else {
          this.$store.commit('setModal', {
            type: 'confirm',
            msg: '為了您的資金安全，請先完成實名認證',
            confirmUrl: '/openAccounts',
            confirmText: "立即實名"
          })
          this.$store.commit('showModal')
        }
      },
      productRate: Tool.productRate,
      getInvestRecord: Tool.getInvestRecord,
      getTimeLeft: Tool.getTimeLeft,
      productRate: Tool.productRate,
      productRateSimple: Tool.productRateSimple,
      getCooper: Tool.getCooper,
      getProductDetail: Tool.getProductDetail,
      getWelfareReminder: Tool.getWelfareReminder,
      buyHandle: Tool.buyHandle,
      inTheArray: Tool.inTheArray,
    },
    mounted() {
      var self = this;
      self.$validator.updateDictionary({
        en: {
          custom: {
            invest: {
              required() {
                return '請輸入加入金額'
              },
              moreThan() {
                return '最低加入金額為' + self.productDetail.minInvAmt + '元'
              }
            },
            payPwd: {
              required() {
                return '請輸入支付密碼'
              }
            }
          }
        }
      });
    },
  }
</script>
