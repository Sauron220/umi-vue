<template>
  <div class="product-detail private" v-TDK="TDK">
    <div class="private-top"></div>
    <div class="product-info">
      <div class="container product-intro-box product-intro">
        <div class="left-info">
          <h1 class="product-name">
            <span class="icon-diamond"></span>
            <span class="title">{{productDetail.prdName}}</span>
          </h1>
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
          <div class="pay-way">
            <span class="repType5">按月還息，到期還本</span>
          </div>
        </div>
        <div class="pay-status">
          <div class="pay-info" v-if="productDetail.status == 11 || productDetail.status == 12">
            <form action="" method="post" id="payForm" submit="investRule" novalidate="">
              <div class="balance clearfix">
                <i class="pull-left">帳戶餘額</i>
                <div class="account-info" v-if="userInfo.loginResult">
                  <span class="pull-left">{{$fmoney(accountInfo.balanceAmount)}}元</span>
                  <a class="charge pull-right" href="javascript:;" @click="showOpenFloat();">匯款</a>
                </div>
                <div class="account-info" v-if="!userInfo.loginResult">
                  <span class="pull-left"><a :href="loginUrl">登錄</a>後可見</span>
                </div>
              </div>
              <div class="amount-money">
                <span class="text">尊享碼</span>
                <div class="code-input">
                  <input type="text" v-model="vipCode" placeholder="請輸入尊享碼" maxlength="6"
                         v-validate="{rules:{required:true,digits:6}}" name="vipCode"
                         :readonly="!userInfo.loginResult || productDetail.status == 12">
                </div>
              </div>
              <div class="error" v-if="userInfo.loginResult && productDetail.status != 12">{{errors.first('vipCode')}}</div>
              <div class="excepted-earn">預期收益<span class="pre-earn-money">1,200.00</span>元</div>
              <a :href="userInfo.loginResult ? 'javascript:;':loginUrl" class="btn btn-warning btn-block"
                 v-if="productDetail.status == 11"
                 @click="investComfirm()">立即加入</a>
              <a :href="userInfo.loginResult ? 'javascript:;':loginUrl" class="btn btn-warning btn-block disabled"
                 v-if="productDetail.status != 11">即將開始</a>
            </form>
          </div>
          <div class="other-status text-center" v-if="productDetail.status == 20">  <!-- 還款中 -->
            <p><img src="../assets/images/private_status_1.png"></p>
            <p>退出時間 <span data-prd="dueDate">{{productDetail.dueDate}}</span></p>
          </div>
          <div class="other-status text-center" v-if="productDetail.status == 16">  <!-- 停止 -->
            <p><img src="../assets/images/private_status_2.png"></p>
          </div>
          <div class="other-status text-center" v-if="productDetail.status == 30">  <!-- 已還款 -->
            <p><img src="../assets/images/private_status_3.png"></p>
            <p>退出時間 <span data-prd="dueDate">{{productDetail.dueDate}}</span></p>
          </div>
          <div class="other-status text-center" v-if="productDetail.status == 14">  <!-- 已滿額 -->
            <p><img src="../assets/images/private_status_4.png"></p>
          </div>
          <div class="other-status text-center" v-if="productDetail.status == 0">  <!-- 已下架 -->
            <p><img src="../assets/images/private_status_5.png"></p>
          </div>
        </div>
      </div>
    </div>
    <div class="section-space"></div>
    <div class="container product-intro-box new-in">
      <span class="text pull-left">最新加入</span>
      <div class="list-content">
        <div class="content" style="max-height: 40px;">
          <div class="marquee-container" v-js-marquee v-if="invList.length>0">
            <ul class="item-list">
              <li class="item" v-for="item in invList">
                <span class="date">{{item.trdDate}}</span>
                <span class="phone text-center">{{item.cusMobile}}</span>
                <span class="money text-right">{{$fmoney(item.trdAmount)}}元</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="section-space"></div>
    <div class="container product-intro-box">
      <ul id="tab" class="list-inline tab clearfix">
        <li :class="{'active':tabAt == 1}" @click="setTabValue(1)">計劃說明</li>
        <li :class="{'active':tabAt == 2}" @click="setTabValue(2)">產品詳情</li>
      </ul>
      <div class="record" v-if="tabAt==1">
        <div class="plan-intro">
          <div class="title">計劃特色</div>
          <div class="feature clearfix">
            <div class="item">
              <img src="../assets/images/featrue1.png" alt="">
              <span>資產優化</span>
            </div>
            <div class="item">
              <img src="../assets/images/featrue2.png" alt="">
              <span>專屬體驗</span>
            </div>
          </div>
          <div class="title">VIP尊享用戶六項專屬特權</div>
          <div class="for-vip clearfix">
            <div class="item">
              <i class="icon-call"></i>專屬客服
            </div>
            <div class="item">
              <i class="icon-star"></i>可自定義個性推薦碼
            </div>
            <div class="item">
              <i class="icon-gift"></i>每季度的專屬福利
            </div>
            <div class="item">
              <i class="icon-cookie"></i>特別的生日禮包
            </div>
            <div class="item">
              <i class="icon-letter-love"></i>年會特邀嘉賓席
            </div>
            <div class="item">
              <i class="icon-crown-o"></i>新品發布優先體驗特權
            </div>
          </div>
          <div class="title">常見問題解答</div>
          <div class="q-a">
            <div class="item">
              <div class="q">Q：什麽是尊享計劃？</div>
              <div class="a">A：尊享計劃是聚寶盆推出的壹款高端理財產品，更好的滿足您多樣化的理財需求。參與尊享計劃的用戶將會獲得聚寶盆提供的六項特權服務。</div>
            </div>
            <div class="item">
              <div class="q">Q：如何加入尊享計劃？</div>
              <div class="a">A：尊享計劃暫時僅限內部邀約用戶投資，被邀約用戶通過自己獨立的尊享碼即可加入。</div>
            </div>
            <div class="item">
              <div class="q">Q：怎樣獲取尊享碼？</div>
              <div class="a">A：被邀約加入尊享計劃的用戶會由專屬客服提供尊享碼。</div>
            </div>
            <div class="item">
              <div class="q">Q：投資尊享計劃有什麽特權？</div>
              <div class="a">
                <div>A：投資尊享計劃可享六大特權</div>
                <ul class="clearfix">
                  <li>(1)專屬客服服務</li>
                  <li>(2)自定義個性推薦碼</li>
                  <li>(3)季度專屬福利</li>
                  <li>(4)特別的生日禮包</li>
                  <li>(5)年會特邀嘉賓席</li>
                  <li>(6)新品發布優先體驗權</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="detail-intro" v-if="tabAt==2">
        <div class="planning-period">
          <div class="title">
            <i class="icon-plan icon-location"></i>產品周期
          </div>
          <div class="content text-center" style="z-index: 1">
            <hr>
            <div class="item">
              <span class="bar light-bar" id="st1">項目滿標</span>
              <span class="date">{{productDetail.colFinishDate}}</span>
              <p>（以實際滿標放款時間為準）</p>
            </div>
            <div class="item">
              <span class="bar light-bar" id="st2">開始計息</span>
              <span class="date">{{productDetail.valueDate}}</span>
            </div>
            <div class="item">
              <span class="bar light-bar" id="st3">到期退出</span>
              <span class="date">{{productDetail.dueDate}}</span>
            </div>
            <div class="item">
              <span class="bar light-bar">預計最遲可提領</span>
              <span class="date" data-prd="repDate">{{productDetail.repDate}}</span>
            </div>
          </div>
        </div>
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
            <div class="check-detail" v-if="imageList.length>0">
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
                <div class="intro-text">還款到帳時間</div>
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
            <div class="col-xs-6">
              <div class="form-control-static">{{productDetail.prdName}}</div>
            </div>
          </div>
          <div class="form-group">
            <label class="col-xs-4 control-label">預期年化</label>
            <div class="col-xs-6">
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
            <div class="col-xs-6">
              <div class="form-control-static"><span>{{productDetail.prdPeriod}}</span>天</div>
            </div>
          </div>
          <div class="form-group">
            <label class="col-xs-4 control-label">加入金額</label>
            <div class="col-xs-6">
              <div class="form-control-static text-warning">{{$fmoney(productDetail.prdAmount)}}元</div>
            </div>
          </div>
          <div class="form-group">
            <label class="col-xs-4 control-label">優惠券</label>
            <div class="col-xs-6">
              <select v-model="coupon" class="form-control" name="" id="constellation">
                <option value="0">{{couponList.length == 0 ? '沒有合適加息券':'請選擇加息券'}}</option>
                <option v-for="item in couponList" :value="item">
                  <span v-if="item.beginTime === '2017.02.14'">情人節</span>
                  <span v-if="inTheArray(item.beginTime)">女王節</span>
                  <span v-if="item.cpnInfo">{{'加息券 +'+$formatNum(item.cpnInfo,100)+'%'}}</span>
                </option>
              </select>
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
             @click="buyHandle('/private/'+productDetail.prdCode);"
             :href="setBuyUrl()">立即加入</a>
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
  import Swipe from 'swiper'
  import Tool from '../util/ProductTool.js'
  import vPagination from '../components/vPagination'
  import {Validator} from 'vee-validate';
  import vOpenFloat from '../components/vOpenFloat.vue'

  export default {
    name: 'Product',
    data () {
      return {
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
        vipCode: null,
        coupon: 0,
        couponText: '',
        showLeftTime: null,
        showBeginTime: null,
        inputPlaceholder:'',
        welfareList:[],
        couponList:[],
        invList:[],
        isOpen: false,
        vOpenAcc: '',
        loginUrl: '',
        TDK:{
          title:'理財產品',
          keyWords:'尊享計劃,p2p理財產品,個人理財產品,如何理財,年化收益率',
          description:'聚寶盆-尊享計劃，是聚寶盆推出的壹款高端理財產品，預期年化收益高達12%！個人最好的理財產品之壹，聚寶盆幫您制定個人理財規劃，理財產品排行就選聚寶盆，6道風控審核保障，理財更安全！',
        }
      }
    },
    components:{
      vPagination:vPagination,
      vOpenFloat: vOpenFloat,
    },
    created(){
      var self = this;
      self.loginUrl = '/login?remark='+location.pathname;
      self.getProductDetail(this.$route.params.prdCode,function () {
        self.invest = self.productDetail.minInvAmt;
        if(self.userInfo.loginResult){
          self.showOpenFloat();
        }
        self.TDK.title = self.productDetail.prdName+'-'+self.TDK.title
      })
      self.getWelfareReminder(40);

      self.$http.post('/pbap-web/action/investment/query/invList', {
        pageIndex:1,
        pageSize:10,
        prdType:40
      }).then((res) => {
        self.invList = res.body.respInfo.invList.dataList;
      });
    },
    computed: {
      userInfo(){
        return this.$store.state.userInfo
      },
      accountInfo(){
        return this.$store.state.accountInfo
      }
    },
    mounted () {
      var self = this;
      self.$validator.updateDictionary({
        en: {
          custom: {
            vipCode: {
              required() {
                return '請輸入尊享碼'
              },
              digits() {
                return '尊享碼長度為6位數字'
              }
            }
          }
        }
      });
    },
    watch:{
      vipCode() {
        this.vipCode = this.vipCode.replace(/\D/g, '');
      },
      imageList(){
        var _self = this
        if(_self.imageList.length>3){
          setTimeout(function () {
            _self.setDwipe(_self);
            _self.checkDetailSlider.resizeFix()
          })
        }
      }
    },
    methods: {
      getProductDetail:Tool.getProductDetail,
      showImgDetail:Tool.showImgDetail,
      setTabValue(value){
        this.tabAt = value;
        var _self = this
        if (value == 2 && _self.imageList.length>3) {
          setTimeout(function () {
            _self.setDwipe(_self);
          })
        }
      },
      setDwipe:Tool.setDwipe,
      setImgDetailSwipePreNext:Tool.setImgDetailSwipePreNext,
      setImgDetailSwipe:Tool.setImgDetailSwipe,
      imgDetailSwipeToggle:Tool.imgDetailSwipeToggle,
      productRate:Tool.productRate,
      productRateSimple:Tool.productRateSimple,
      repType:Tool.repType,
      valDelayTypeDays:Tool.valDelayTypeDays,
      repDelayTypeDays:Tool.repDelayTypeDays,
      getTimeLeft:Tool.getTimeLeft,
      calcPreEarn: Tool.calcPreEarn,
      getInvestRecord:Tool.getInvestRecord,
      goAgreement:Tool.goAgreement,
      getCooper:Tool.getCooper,
      getWelfareReminder:Tool.getWelfareReminder,
      inTheArray:Tool.inTheArray,
      buyHandle:Tool.buyHandle,
      investComfirm(){
        var self = this;
        if(self.userInfo.loginResult){  //登錄情況
          self.$http.post('/pbap-web/action/customer/query/custAuthInfo',{}).then((res) => {
            self.tpStatus = res.body.respInfo.custInfo.tpStatus;
            self.activateStatus = res.body.respInfo.custInfo.activateStatus;
            if(self.tpStatus == 1){
              if(self.activateStatus !=1 ){
                self.isOpen = true;
                self.vOpenAcc = false;
              }else{
                // 校驗尊享碼輸入格式是否正確
                self.$validator.validateAll().then((result) => {
                  if (result) {
                    // 提交尊享碼校驗尊享碼的可用性
                    self.$http.post('/pbap-web/action/investment/add/prdPurchaseBefore',{
                      prdCode:self.productDetail.prdCode,
                      vipCode:self.vipCode
                    }).then((res) => {
                      if(res.body.errorInfo.errorCode == '0000'){
                        self.buyConfirm = !self.buyConfirm;
                        self.getCooper();
                        self.getWelfareReminder(40);
                      }
                    });
                  }
                });
              }
            }else if(self.tpStatus == 0){
              self.isOpen = true;
              self.vOpenAcc = true;
            }
          });

        }
      },
      setBuyUrl(){
        var self = this;
        if(self.coupon && self.coupon != 0){
          return '/buy?prdCode='+self.$route.params.prdCode+'&relAmount='+ self.invest + '&vipCode=' + self.vipCode + '&cpnNum=' + self.coupon.cpnNum
        }else {
          return '/buy?prdCode='+self.$route.params.prdCode+'&relAmount='+ self.invest + '&vipCode=' + self.vipCode
        }
      },
      showOpenFloat(){
        let self = this;
        self.$http.post('/pbap-web/action/customer/query/custAuthInfo',{}).then((res) => {
          self.tpStatus = res.body.respInfo.custInfo.tpStatus;
          self.activateStatus = res.body.respInfo.custInfo.activateStatus;
          if(self.tpStatus == 1){
            if(self.activateStatus !=1 ){
              self.isOpen = true;
              self.vOpenAcc = false;
            }else{
              $('.charge').attr('onclick','');
              $('.charge').attr('target','_blank');
              $('.charge').attr('href','/recharge');
            }
          }else if(self.tpStatus == 0){
            self.isOpen = true;
            self.vOpenAcc = true;
          }
        });
      },

    },
    directives: {
      jsMarquee: {
        inserted (el, binding, vnode, oldVnode) {
          function toGetComputedStyle(elChild,value) {
            return window.getComputedStyle(elChild)[value]
          }
          let elChildren = el.children[0].children;  // list items
          let elWidth = 0;  // 容器寬度
          for(var i = 0;i<elChildren.length;i++){
            let elChild = elChildren[i];
            let elChildWidth = toGetComputedStyle(elChild,'width').replace('px','')*1;
            let marginRight = toGetComputedStyle(elChild,'margin-right').replace('px','')*1;
            let marginLeft = toGetComputedStyle(elChild,'margin-left').replace('px','')*1;
            let elChildRealWidth = elChildWidth + marginRight + marginLeft;
            elWidth += elChildRealWidth;
          };
          // 元素長度 elWidth
          let elChild = el.children[0];
          elChild.style.float = 'left';
          elChild.style.width = elWidth + 'px';
          el.style.width = elWidth*2 + 'px';
          el.style.overflow = 'hidden';

          // 設置初始位置
          el.style.marginLeft = 0;
          // 數據少於兩條時候不使用滾動效果
          if(elChildren.length>2){
            let childCopy = elChild.cloneNode(true);
            el.appendChild(childCopy);
            var moveTimer;
            moveTimer = setTimeout(function () {
              elMove();
              // 鼠標懸浮停止移動
              el.onmouseover = function () {
                clearTimeout(setMarginClock)
              }
              // 鼠標離開 繼續移動
              el.onmouseout = function () {
                elMove()
              }
            },1500)
          }
          // 移動方法
          var setMarginClock;
          function elMove() {
            setMarginClock = setInterval(function () {
              el.style.marginLeft = el.style.marginLeft.replace('px','')*1 -1 +'px';
              if(Math.abs(el.style.marginLeft.replace('px','')) >= elWidth){
                clearTimeout(setMarginClock);
                el.style.marginLeft = 0;
                elMove();
              }
            },10)
          }
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
