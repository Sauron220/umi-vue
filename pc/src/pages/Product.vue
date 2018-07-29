<template>
  <div class="product-detail product-normal" v-TDK="TDK">
    <!--<div>產品id：{{$route.params.id}}</div>-->
    <div class="section-space"></div>

    <!--<div class="product-info"> </div>-->
    <div class="container product-intro-box product-intro clearfix">
      <ol class="breadcrumb" style="background: #f8f8f8;padding-bottom: 30px;margin-bottom: 0px;">
        <span>您現在的位置：</span>
        <li>
          <router-link to="/">首頁</router-link>
        </li>
        <li>
          <router-link to="/product-list">定期理財</router-link>
        </li>
        <li v-if="productDetail.prdType">
          <router-link
            :to="{ name: 'ProductList', params: { prdType:productDetail.prdType,prdStatus:0,pageAt:1 }}">
            {{getTypeName(productDetail.prdType)}}
          </router-link>
        </li>
        <li class="active">產品詳情</li>
      </ol>
      <h1 class="product-name">
        <span class="title">{{productDetail.prdName}}</span>
      </h1>
      <div class="left-info">

        <div class="clearfix"></div>
        <div class="top clearfix">
          <div class="item profit">
            <div class="num">
              <span>{{productRate(productDetail.defaultRate, productDetail.rewardRate)}}</span>
            </div>
            <i>預期年化收益</i>
          </div>
          <div class="item term">
            <div class="num">
              <span>{{productDetail.prdPeriod}}</span>天
            </div>
            <i>借款期限</i>
          </div>
          <div class="item all">
            <div class="num">
              <span>{{$fmoney(productDetail.prdAmount)}}</span>元
            </div>
            <i>產品金額</i>
          </div>
        </div>
        <div class="bottom clearfix">
          <div class="intro-group">
            <div class="intro-text">收益方式</div>
            <span>{{repType(productDetail.repType)}}</span>
          </div>
          <div class="intro-group">
            <div class="intro-text">起投金額</div>
            <div class="intro-content">
              <span>{{$fmoneyFormat(productDetail.minInvAmt)}}</span>元
            </div>
          </div>
          <div class="intro-group intro-group-time" id="countdown">
            <div v-if="productDetail.status == 11">
              <div class="intro-text">剩余時間</div>
              <div class="intro-content">
                <span class="ell">{{showLeftTime}}</span>
              </div>
            </div>

            <div v-if="productDetail.status == 12">
              <div class="intro-text" style="width:90px;">距離開始時間</div>
              <div class="intro-content">
                <span class="ell">{{showBeginTime}}</span>
              </div>
            </div>
          </div>
          <div class="intro-group" v-if="productDetail.status == 11 || productDetail.status == 12">
            <div class="intro-text">剩余金額</div>
            <div class="intro-content">
              <span>{{$fmoneyFormat(productDetail.remainAmount)}}元</span>
            </div>
          </div>
          <div class="intro-group intro-group-progress"
               v-if="productDetail.status == 11 || productDetail.status == 12">
            <div class="intro-text">加入進度</div>
            <div class="intro-content">
              <div class="progress">
                <div class="progress-bar progress-bar-warning"
                     :style="{'width':productDetail.colPercent+'%'}"></div>
              </div>
              <i id="colPercent">{{productDetail.colPercent}}%</i>
            </div>
          </div>
        </div>
      </div>
      <div class="pay-status">
        <div class="pay-info" v-if="productDetail.status == 11 || productDetail.status == 12">
          <form action="" method="post" id="payForm" submit="investRule" novalidate="">
            <div class="balance clearfix">
              <i class="pull-left">賬戶餘額</i>
              <div class="account-info" v-if="userInfo.loginResult">
                <span class="pull-left" style="color:#f05a23;">{{$fmoney(accountInfo.balanceAmount)}}元</span>
                <a class="charge pull-right" href="/recharge" v-if="custInfo.tpStatus==1 && custInfo.payPwdOK"
                   target="_blank">儲值</a>
                <a class="charge pull-right" href="javascript:;" v-if="custInfo.tpStatus!=1 || !custInfo.payPwdOK"
                   @click="linkToRealName();">儲值</a>
              </div>
              <div class="account-info" v-if="!userInfo.loginResult">
                <span class="pull-left" style="color:#f05a23;"><a :href="loginUrl">登錄</a>後可見</span>
              </div>
            </div>
            <div class="amount-money">
              <div class="input-box">
                <input class="form-control" type="text" name="invest"
                       maxlength="10"
                       v-model="invest"
                       :placeholder="inputPlaceholder"
                       v-validate="{rules:{required:true,
                                           investRule:[
                                             productDetail.minInvAmt,
                                             productDetail.maxInvAmt,
                                             productDetail.remainAmount,
                                             accountInfo.balanceAmount,
                                             invest
                                           ]}}"
                       :readonly="productDetail.minInvAmt>productDetail.remainAmount || !userInfo.loginResult || productDetail.status == 12">
              </div>
              <div class="all-in text-center" @click="allIn">全額加入</div>
              <span class="input-text">元</span>
              <i class="p-error" v-if="errors.first('invest') && userInfo.loginResult">{{errors.first('invest')}}</i>
            </div>
            <div class="excepted-earn">
              預期收益<span>{{calcPreEarn(invest, productDetail.rate, productDetail.prdPeriod)}}</span>元
            </div>
            <a :href="userInfo.loginResult ? 'javascript:;':loginUrl" class="btn btn-warning btn-block"
               v-if="productDetail.status == 11"
               @click="investComfirm()">立即加入</a>
            <a :href="userInfo.loginResult ? 'javascript:;':loginUrl"
               class="btn btn-warning btn-block disabled"
               v-if="productDetail.status != 11">即將開始</a>
          </form>
        </div>
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

    <div class="section-space"></div>
    <div class="container" style="background-color: #f8f8f8;">
      <div class="planning-period">
        <div class="title">
          <i class="icon-plan icon-location"></i>產品周期
        </div>
        <div class="content text-center">
          <hr>
          <div class="item">
            <span class="bar light-bar">項目滿標</span>
            <span class="date">{{productDetail.colFinishDate}}</span>
            <p>（以實際滿標放款時間為準）</p>
          </div>
          <div class="item">
            <span class="bar light-bar">開始計息</span>
            <span class="date">{{productDetail.valueDate}}</span>
          </div>
          <div class="item">
            <span class="bar light-bar">到期退出</span>
            <span class="date">{{productDetail.dueDate}}</span>
          </div>
          <div class="item">
            <span class="bar light-bar">預計最遲可提領</span>
            <span class="date" data-prd="repDate">{{productDetail.repDate}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="section-space"></div>
    <div class="container">
      <ul id="tab" class="list-inline tab clearfix">
        <li :class="{'active':tabAt == 1}" @click="setTabValue(1)">產品介紹</li>
        <li :class="{'active':tabAt == 2}" @click="setTabValue(2)">出借記錄</li>
      </ul>
      <div class="section-space"></div>
      <div class="detail-intro" v-if="tabAt==1">
        <div class="check">
          <div class="title">
            <i class="icon-list-file icon-location"></i>產品審核
          </div>
          <div class="content">
            <ol class="list-unstyled">
              <li>
                <span class="pull-left">公司工商資訊</span>
                <span class="pull-right">已審核<i class="icon-checked"></i></span>
              </li>
              <li>
                <span class="pull-left">營業執照</span>
                <span class="pull-right">已審核<i class="icon-checked"></i></span>
              </li>
              <li>
                <span class="pull-left">開戶許可證</span>
                <span class="pull-right">已審核<i class="icon-checked"></i></span>
              </li>
              <li>
                <span class="pull-left">法人及股東身份證</span>
                <span class="pull-right">已審核<i class="icon-checked"></i></span>
              </li>
              <li>
                <span class="pull-left">公司章程</span>
                <span class="pull-right">已審核<i class="icon-checked"></i></span>
              </li>
              <li>
                <span class="pull-left">經營場所實地認證</span>
                <span class="pull-right">已審核<i class="icon-checked"></i></span>
              </li>
            </ol>
            <div class="section-space"></div>
            <div class="check-detail" v-show="imageList.length>0">
              <div class="title">審核資料</div>
              <div class="swiper-detail">
                <div v-if="imageList.length>3" @click="checkDetailSliderPre()" class="icon-angle-left pre"></div>
                <div class='check-detail-list swiper-wrapper'>
                  <div class="swiper-slide" v-for="(item,idx) in imageList">
                    <a href="javascript:;" @click="showImgDetail(idx)">
                      <img class="img-responsive" :src="item.url" target="_blank">
                    </a>
                  </div>
                </div>
                <div v-if="imageList.length>3" @click="checkDetailSliderNext()" class="icon-angle-right next"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="section-space"></div>
        <div class="intro">
          <div class="title"><i class="icon-book icon-location"></i>產品說明</div>
          <div class="content">
            <div class="table_list">
              <div class="intro-group">
                <div class="intro-text">名稱</div>
                <div class="intro-content">
                  <span>{{productDetail.prdName}}</span>
                </div>
              </div>
              <div class="intro-group">
                <div class="intro-text">產品介紹</div>
                <div class="intro-content">
                  <p v-html="productDetail.introduction"></p>
                </div>
              </div>
              <div class="intro-group">
                <div class="intro-text">投標範圍</div>
                <div class="intro-content">
                  <span>{{productDetail.prdArea}}</span>
                </div>
              </div>
              <div class="intro-group">
                <div class="intro-text">產品金額</div>
                <div class="intro-content">
                  <span>{{$fmoneyFormat(productDetail.prdAmount)}}元</span>
                </div>
              </div>
              <div class="intro-group">
                <div class="intro-text">投資條件</div>
                <div class="intro-content">
                  <span class="bid_range">最低{{$fmoneyFormat(productDetail.minInvAmt)}}元</span>
                </div>
              </div>
              <div class="intro-group">
                <div class="intro-text">還款方式</div>
                <div class="intro-content">
                  {{repType(productDetail.repType)}}
                </div>
              </div>
              <div class="intro-group">
                <div class="intro-text">計息時間</div>
                <div class="intro-content">
                  <span>{{valDelayTypeDays(productDetail.valDelayType, productDetail.repDelayType, productDetail.valDelayDays, productDetail.repDelayDays)}}</span>
                </div>
              </div>
              <div class="intro-group">
                <div class="intro-text">還款到賬時間</div>
                <div class="intro-content">
                  <span>{{repDelayTypeDays(productDetail.valDelayType, productDetail.repDelayType, productDetail.valDelayDays, productDetail.repDelayDays)}}</span>
                </div>
              </div>
              <div class="intro-group">
                <div class="intro-text">保障方式</div>
                <div class="intro-content">
                  <span>100%用戶利益保障機制</span>
                </div>
              </div>
              <div class="intro-group">
                <div class="intro-text">服務協議</div>
                <div class="intro-content">
                  <span>
                    <a class="link" href="javascript:;" @click="goAgreement">查看服務協議</a>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="record" v-if="tabAt==2">
        <div class="tit">
          <span class="r1">序號</span> <span class="r2">加入時間</span> <span class="r3">投資人</span> <span
          class="r4">出借金額</span>
        </div>
        <div id="invList">
          <div class="txt" v-for="(item,index) in invData.dataList" v-if="invData.dataList.length>0">
            <span class="r1">{{index + 1}}</span>
            <span class="r2">{{item.preTime}}</span>
            <span class="r3">{{item.realName}}</span>
            <span class="r4">{{$fmoney(item.trdAmount)}}元</span>
          </div>
          <vPagination v-if="invData.totalPage>1"
                       :totalPage="invData.totalPage"
                       :currentPage="invData.pageIndex"
                       :pageFor="getInvestRecord"
                       :pageForArg="{}">
          </vPagination>
        </div>
        <div class="no-data clearfix text-center" v-if="invData.dataList.length==0">
          <p>暫無出借記錄</p>
        </div>
      </div>
    </div>
    <br>
    <br>
    <br>
    <div class="check-img-detail" v-if="imgDetailSwipe.isShow">
      <div class="modal-backdrop fade in"></div>
      <div @click="imgDetailSwipeToggle" class="modal fade in text-center check-img-detail-box"
           style="display: block">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="item in imageList">
            <div class="img-box" @click.stop.prevent
                 :style="{ marginTop:-item.height/2+'px',marginLeft:-item.width/2 +'px'}">
              <img class="img-responsive" :src="item.url" target="_blank">
            </div>
          </div>
        </div>
      </div>
      <div v-if="imgDetailSwipe.hasPre" onclick="showImgDetailPre()" class="icon-angle-left pre"></div>
      <div v-if="imgDetailSwipe.hasNext" onclick="showImgDetailNext()" class="icon-angle-right next"></div>
      <div @click="imgDetailSwipeToggle" class="close">&times;</div>
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
          <!--<div class="form-group tips" v-if="welfareList && welfareList.length>0">&lt;!&ndash;&ndash;&gt;-->
          <!--<label class="col-xs-4 control-label">-->
          <!--<i class="icon-tips text-warning icon-location"></i>福利提醒：-->
          <!--</label>-->
          <!--<div class="col-xs-8 form-control-static">-->
          <!--<p v-for="item in welfareList" v-if="item.welfareReminder">-->
          <!--*{{item.welfareReminder}}-->
          <!--</p>-->
          <!--</div>-->
          <!--</div>-->
          <a class="btn btn-warning btn-block btn-lg submit" target="_blank"
             @click="setBuyUrl()">立即加入</a>
          <div class="col-xs-offset-1 col-xs-10">
            <br>
            <br>
          </div>
        </div>
      </div>
    </div>
    <vOpenFloat v-if="isOpen" :vOpenAccBl="vOpenAcc"></vOpenFloat>
  </div>
</template>

<script>
  import Tool from '../util/ProductTool.js'
  import vPagination from '../components/vPagination'
  import {Validator} from 'vee-validate';
  import vOpenFloat from '../components/vOpenFloat.vue'

  export default {
    name: 'Product',
    data() {
      return {
        custInfo: {},
        buyConfirm: false,
        productDetail: {},
        checkDetailSlider: {},
        tabAt: 1,
        imageList: [],
        imgDetailSwipe: {
          isShow: false,
          hasPre: true,
          hasNext: true
        },
        invData: {},
        invest: null,
        coupon: 0,
        couponText: '',
        showLeftTime: null,
        showBeginTime: null,
        inputPlaceholder: '',
        welfareList: '',
        couponList: [],
        isOpen: false,
        vOpenAcc: '',
        loginUrl: '',
        showPwd: false,
        pwdTips: false,
        payPwd: '',
        TDK: {
          title: '理財產品',
          keyWords: '尊享計劃,p2p理財產品,個人理財產品,如何理財,年化收益率',
          description: '聚寶盆-尊享計劃，是聚寶盆推出的壹款高端理財產品，預期年化收益高達12%！個人最好的理財產品之壹，聚寶盆幫您制定個人理財規劃，理財產品排行就選聚寶盆，6道風控審核保障，理財更安全！',
        }
      }
    },
    components: {
      vPagination: vPagination,
      vOpenFloat: vOpenFloat,
    },
    created() {
      var self = this;
      self.$http.post('/pbap-web/action/customer/query/custAuthInfo', {}).then((res) => {
        self.custInfo = res.body.respInfo.custInfo;
        self.tpStatus = res.body.respInfo.custInfo.tpStatus;
        // self.activateStatus = res.body.respInfo.custInfo.activateStatus;
      });
      self.loginUrl = '/login?remark=' + location.pathname; // 設置登錄成功後的跳轉連結
      self.getProductDetail(this.$route.params.prdCode, function () {
        self.setPlaceholder();
        if (self.productDetail.remainAmount >= self.productDetail.minInvAmt) {
          self.invest = self.productDetail.minInvAmt;
        } else {
          self.invest = self.productDetail.remainAmount;

        }
        self.getWelfareReminder(self.productDetail.prdType);
        if (self.userInfo.loginResult) {
          // self.showOpenFloat();
        }
        self.TDK.title = self.productDetail.prdName + '-' + self.TDK.title
        self.setDwipe(self);
      })
      self.getInvestRecord(1);
    },
    computed: {
      userInfo() {
        return this.$store.state.userInfo
      },
      accountInfo() {
        return this.$store.state.accountInfo
      }
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
    watch: {
      imageList() {
        var _self = this
        if (_self.imageList.length > 3) {
          setTimeout(function () {
            _self.setDwipe(_self);
            _self.checkDetailSlider.resizeFix()
          })
        }
      },
      invest() {
        this.invest = this.invest.toString().replace(/\D/g, '')
      }
    },
    methods: {
      setPlaceholder() {
        var self = this;
        self.inputPlaceholder = '至少投資' + self.$fmoneyFormat(self.productDetail.minInvAmt) + '元'
      },
      getProductDetail: Tool.getProductDetail,
      showImgDetail: Tool.showImgDetail,
      setTabValue: Tool.setTabValue,
      setDwipe: Tool.setDwipe,
      setImgDetailSwipePreNext: Tool.setImgDetailSwipePreNext,
      setImgDetailSwipe: Tool.setImgDetailSwipe,
      imgDetailSwipeToggle: Tool.imgDetailSwipeToggle,
      productRate: Tool.productRate,
      productRateSimple: Tool.productRateSimple,
      repType: Tool.repType,
      valDelayTypeDays: Tool.valDelayTypeDays,
      repDelayTypeDays: Tool.repDelayTypeDays,
      getTimeLeft: Tool.getTimeLeft,
      calcPreEarn: Tool.calcPreEarn,
      getInvestRecord: Tool.getInvestRecord,
      allIn: Tool.allIn,
      goAgreement: Tool.goAgreement,
      getCooper: Tool.getCooper,
      getWelfareReminder: Tool.getWelfareReminder,
      inTheArray: Tool.inTheArray,
      getTypeName: Tool.getTypeName,
      buyHandle: Tool.buyHandle,
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
                    self.getCooper();
                    self.getWelfareReminder(self.productDetail.prdType);
                  }
                });
              }

            } else if (self.tpStatus == 0) {
              /*self.isOpen = true;
              self.vOpenAcc = true;*/
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
      ifPostData(name, postData) {
        var data = this.$route.query[name]
        if (data && data != 'undefined') {
          postData[name] = data;
        }
      },
      setBuyUrl() {

        var self = this;

        self.$validator.validateAll({'payPwd': self.payPwd}).then((result) => {
          if (result) {
            self.buyHandle('/product/' + self.productDetail.prdCode);
            if (self.coupon && self.coupon != 0) {
              let url = '/buy?prdCode=' + self.$route.params.prdCode + '&relAmount=' + self.invest + '&cpnNum=' + self.coupon.cpnNum + '&payPwd=' + self.payPwd
              window.open(url, '_blank');
              // return '/buy?prdCode=' + self.$route.params.prdCode + '&relAmount=' + self.invest + '&cpnNum=' + self.coupon.cpnNum + '&payPwd=' + self.payPwd
            } else {
              let url = '/buy?prdCode=' + self.$route.params.prdCode + '&relAmount=' + self.invest + '&payPwd=' + self.payPwd
              window.open(url, '_blank');
              // return '/buy?prdCode=' + self.$route.params.prdCode + '&relAmount=' + self.invest + '&payPwd=' + self.payPwd
            }
          }
        });


      },
      showOpenFloat() {
        let self = this;
        self.linkToRealName();
      },
      linkToRealName() {
        let self = this;
        if (self.custInfo.tpStatus == 1) {
          if (!self.custInfo.payPwdOK) {
            this.$store.commit('setModal', {
              type: 'confirm',
              msg: '為了您的資金安全，請先設置支付密碼',
              confirmUrl: '/setPayPwd',
              confirmText: "立即設置"
            })
            this.$store.commit('showModal')
          }
        } else {
          this.$store.commit('setModal', {
            type: 'confirm',
            msg: '為了您的資金安全，請先完成實名認證',
            confirmUrl: '/openAccount',
            confirmText: "立即實名"
          })
          this.$store.commit('showModal')
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
