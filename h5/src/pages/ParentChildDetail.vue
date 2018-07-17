<template>
    <div class="wrap product-content parentChildDetail-content">
        <PageNav :message="backUrl"></PageNav>
        <div class="contScroll mui-content">
            <div class="product-top">
                <div>
                    <div class="return-rate">
                        <span>{{$fmoney(productDetail.defaultRate*100, 1)}}</span>
                        <i v-if="productDetail.rewardRate && parseFloat(productDetail.rewardRate) != 0">+{{$fmoney(productDetail.rewardRate*100, 1)}}%</i>
                        <i v-else>%</i>
                    </div>
                    <div id="countdown">
                        <div id="tiles" class="residual-time" v-if="productDetail.status == 11">剩余时间
                            <span>{{showLeftTime}}</span>
                        </div>

                        <div id="tiles2" class="begin-time" v-if="productDetail.status == 12">距离开始时间
                            <span>{{showBeginTime}}</span>
                        </div>
                    </div>
                </div>
                <div class="info" v-if="productDetail.status == '14'||
                                        productDetail.status == '20'||
                                        productDetail.status == '30'">
                    <p class="info-show">借款期限
                        <i>{{productDetail.prdPeriod}}天</i>
                    </p>
                </div>
                <div class="info" v-else>
                    <div class="info1 info_hide">
                        借款期限 <span id="prdPeriod">{{productDetail.prdPeriod}}天</span>
                    </div>
                    <div class="info2 info_hide">
                        剩余金额 <span id="remainAmount">{{$fmoneyFormat(productDetail.remainAmount)}}元</span>
                    </div>
                    <div class="info3 info_hide">
                        加入进度 <span id="colPercent">{{productDetail.colPercent}}%</span>
                    </div>
                </div>
            </div>
            <div class="product-center">
                <div class="cycle">
                    <h1>计划周期</h1>
                    <div class="content clearfix">
                        <hr>
                        <div class="t1">
                            <img src="../assets/images/cycle_01.png">
                            <span id="st1" class="gray-node blue_node">项目满标</span>
                            <span class="date colFinishDate">{{productDetail.colFinishDate}}</span>
                            <i @click="question01" class="question-mark question01"></i>
                        </div>
                        <div class="t2">
                            <img src="../assets/images/cycle_02.png">
                            <span id="st2" class="gray-node">开始计息</span>
                            <span class="date valueDate">{{productDetail.valueDate}}</span>
                        </div>
                        <div class="t3">
                            <img src="../assets/images/cycle_03.png">
                            <span id="st3" class="gray-node">到期退出</span>
                            <span class="date dueDate">{{productDetail.dueDate}}</span>
                        </div>
                        <div class="t4">
                            <img src="../assets/images/cycle_04.png">
                            <span id="st4" class="gray-node">预计最迟可提现</span>
                            <span class="date repDate">{{productDetail.repDate}}</span>
                            <i @click="question02" class="question-mark question02"></i>
                        </div>
                    </div>
                </div>
                <div class="about">
                    <div>
                        <h3>产品总额</h3>
                        <span class="bid-range">{{$fmoneyFormat(productDetail.prdAmount)}}元</span>
                    </div>
                    <div>
                        <h3>投资条件</h3>
                        <span class="bid-range">最低投资{{$fmoneyFormat(productDetail.minInvAmt)}}元</span>
                    </div>
                    <div>
                        <h3>起息日期</h3>
                        <span class="bid-range">满标即起息</span>
                    </div>
                    <div>
                        <h3>还款方式</h3>
                        <span class="bid-range">{{repType(productDetail.repType)}}</span>
                    </div>
                    <div>
                        <h3>还款提示</h3>
                        <span class="bid-range">到期后本金及收益归至账户余额</span>
                    </div>
                    <div>
                        <h3>产品详情</h3>
                        <span @click="openDetail" class="more bid-range text-orange">查看详情</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="bottom-btn">
            <a v-if="productDetail.status == 11" class="product-btn product-btn-high"
               :href="userInfo.loginResult ? 'javascript:;':loginUrl" @click="investComfirm()">立即加入</a>
            <div v-if="productDetail.status == 20" class="product-btn">還款中</div>
            <div v-if="productDetail.status == 30" class="product-btn">已還款</div>
            <div v-if="productDetail.status == 16" class="product-btn">停止加入</div>
            <a v-if="productDetail.status == 12" class="product-btn product-btn-high"
               :href="userInfo.loginResult ? 'javascript:;':loginUrl">即将开始</a>
            <div v-if="productDetail.status == 0" class="product-btn">已下架</div>
            <div v-if="productDetail.status == 14" class="product-btn">已满额</div>
        </div>
        <div class="look-details" :class="{'look-details-high': watchDetail == true}">
            <div class="pull-box">
                <span class="pull-back" @click="closeDetails"></span>
                <ul class="clearfix">
                    <li :class="{'li-high':tabAt == 1}" @click="setTabValue(1)">产品介绍</li>
                    <li :class="{'li-high':tabAt == 2}"  @click="setTabValue(2)">出借记录</li>
                </ul>

                <div class="details details1" v-if="tabAt==1">
                    <h2 class="dd1">产品审核</h2>
                    <div class="line">
                        <span>公司工商資訊</span>
                        <i>已审核</i>
                    </div>
                    <div class="line">
                        <span>营业执照</span>
                        <i>已审核</i>
                    </div>
                    <div class="line">
                        <span>开户许可证</span>
                        <i>已审核</i>
                    </div>
                    <div class="line">
                        <span>法人及股东身份证</span>
                        <i>已审核</i>
                    </div>
                    <div class="line">
                        <span>公司章程</span>
                        <i>已审核</i>
                    </div>
                    <div class="line">
                        <span>经营场所实地认证</span>
                        <i>已审核</i>
                    </div>

                    <h2 class="dd2 audit-data" v-if="imgDetailSwipe.isShow">审核资料</h2>
                    <div class="photo-views audit-data" v-if="productDetail.verifyInfo">
                        <img src="../assets/images/look_details1_tip.png" class="right-icon">
                        <see-box>
                            <see-item v-for="(item,index) in verifyList" :key="index" :img="item"></see-item>
                        </see-box>
                    </div>

                    <h2 class="dd3">产品说明</h2>
                    <div class="bar clearfix">
                        <h1>产品介绍</h1>
                        <span v-html="productDetail.introduction"></span>
                    </div>
                    <div class="bar clearfix">
                        <h1>投标范围</h1>
                        <span>{{productDetail.prdArea}}</span>
                    </div>
                    <div class="bar clearfix">
                        <h1>计息时间</h1>
                        <span>{{valDelayTypeDays(productDetail.valDelayType, productDetail.repDelayType, productDetail.valDelayDays, productDetail.repDelayDays)}}</span>
                    </div>
                    <div class="bar clearfix">
                        <h1>還款到账时间</h1>
                        <span>{{repDelayTypeDays(productDetail.valDelayType, productDetail.repDelayType, productDetail.valDelayDays, productDetail.repDelayDays)}}</span>
                    </div>
                    <div class="bar clearfix">
                        <h1>保障方式</h1>
                        <span>100%用户利益保障机制</span>
                    </div>
                    <div class="bar clearfix">
                        <h1>服务协议</h1>
                        <a class="text-blue goAgreement" v-show="productDetail.agrPath"
                           :href="'/agreement/'+productDetail.prdCode+'/0/1'">查看服务协议</a>
                        <a class="text-blue goAgreement" v-show="!productDetail.agrPath"
                           :href="'/agreement/'+productDetail.prdCode+'/'+productDetail.trdNum+'/0'">查看服务协议</a>
                    </div>
                </div>

                <div class="details details2" v-if="tabAt==2">
                    <v-scroll :on-refresh="onRefresh" :on-infinite="onInfinite" ref="hasBox">
                        <div id="invList" class="record-box mui-table-view mui-table-view-chevron">
                            <div class="record-bar" v-for="(item,index) in invData">
                                <div class="bar1">{{index + 1}}</div>
                                <div class="bar2">
                                    <span>{{item.realName}}</span>
                                    <span>{{item.preTime}}</span>
                                </div>
                                <div class="bar3">{{$fmoney(item.trdAmount)}}元</div>
                            </div>
                        </div>
                    </v-scroll>
                    <div class="no-content" ref="noBox">
                        <img src="../assets/images/giraffe_none.png" class="center-img">
                        <p class="center-text">暂无出借记录</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="mask0" v-show="buyConfirm" @click="closeInvestComfirm()"></div>
        <div class="pay-box" :class="{'pay-box-high': buyConfirm}">
            <div class="pos">
                <div class="bar bar-gray">
                    <div class="six-box six-line clearfix">
                        <h1>产品剩余金额</h1>
                        <span class="text-blue">{{$fmoneyFormat(productDetail.remainAmount)}}元</span>
                    </div>
                </div>
                <div class="bar bar-gray">
                    <div class="six-box clearfix">
                        <h1>账户余额</h1>
                        <span class="text-orange">{{$fmoney(accountInfo.balanceAmount)}}元</span>
                        <a class="go-cz" @click="isOpenAccount('recharge?bu=product', productDetail.prdCode)">儲值</a>
                    </div>
                </div>
                <div class="bar bar-white">
                    <div class="six-box clearfix">
                        <h1>加入金额</h1>
                        <input class="inp" type="text" name="invest" maxlength="10" v-model="invest"
                               :placeholder="inputPlaceholder" v-validate="{rules:{required:true,
                               investRule:[productDetail.maxInvAmt,productDetail.remainAmount,accountInfo.balanceAmount],
                               moreThan:productDetail.minInvAmt}}" v-if="productDetail.remainAmount<productDetail.minInvAmt">
                        <input class="inp" type="text" name="invest" maxlength="10" v-model="invest"
                               :placeholder="inputPlaceholder" v-validate="{rules:{required:true,
                               investRule:[productDetail.maxInvAmt,productDetail.remainAmount,accountInfo.balanceAmount],
                               moreThan:productDetail.minInvAmt}}" v-else>
                        <font>元</font>
                        <div class="all-in" @click="allIn">全额加入</div>
                        <i class="p-error" v-if="errors.first('invest')">{{errors.first('invest')}}</i>
                    </div>
                </div>
                <div class="bar bar-gray">
                    <div class="six-box six-line clearfix">
                        <h1>预期收益</h1>
                        <span class="expected-revenue">{{calcPreEarn(invest, productDetail.rate, productDetail.prdPeriod)}}元</span>
                    </div>
                </div>
                <div class="bar bar-gray alert">
                    <div id="new-alert" v-if="welfareList && welfareList.length>0">
                        <h2>福利提醒：</h2>
                        <ol>
                            <li v-for="item in welfareList" v-if="item.welfareReminder">{{item.welfareReminder}}</li>
                        </ol>
                    </div>
                    <div id="base-alert" v-else>
                        遇到问题？您可以：<br>
                        1、拨打客服电话 <a href="tel:400-600-9976" class="text-blue telto">400-600-9976</a><br>
                        2、关注微信公众号 <i>“上海聚寶盆”</i> 留言提问
                    </div>
                </div>
            </div>
            <a class="paybtn" @click="testBuyUrl()">共计{{$fmoney(invest)}}元，立即加入</a>
        </div>
        <vOpenFloat v-if="isOpen" :vOpenAccBl="vOpenAcc"></vOpenFloat>
    </div>
</template>

<script>
  import Tool from '../util/ProductTool.js'
  import Scroll from '@/components/vPullupLoading'
  import vOpenFloat from '@/components/vOpenFloat'
  import PageNav from '@/components/PageNav'

  export default {
    name: 'ParentChildDetail',
    data() {
      return {
        pageTitle: '',
        amount: '',
        buyConfirm: false,
        productDetail: {},
        checkDetailSlider: {},
        tabAt: 1,
        //imageList: [],
        imgDetailSwipe: {
          isShow: false,
          hasPre: true,
          hasNext: true
        },
        invDataList:{},
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
        showHelpText: false,
        watchDetail: false,
        pageAt : 1,
        pageSize : 10,
        pageStart : 0,
        pageEnd : 0,
        status : 11,
        backUrl: '',
        verifyDate: {},
        verifyList: [],
      }
    },
    created(){
      var self = this;
      self.loginUrl = '/login?remark=' + location.pathname; // 设置登录成功后的跳转链接
      self.getProductDetail(this.$route.params.prdCode, function () {
        self.setPlaceholder();
        if(self.productDetail.remainAmount < self.productDetail.minInvAmt){
          self.invest = self.$fmoneyFormat(self.productDetail.remainAmount);
        } else {
          self.invest = self.$fmoneyFormat(self.productDetail.minInvAmt);
        }
        if(self.$route.query.amount && self.$route.query.amount != 0){
          self.invest = self.$route.query.amount
        }
        else if (self.$route.params.investMoney && self.$route.params.investMoney != 0) {
          self.invest = self.$route.params.investMoney
        }
        if(self.$route.query && self.$route.query.asset == '1'){
          self.backUrl = document.referrer
        } else {
          self.backUrl = '/parent-child';
        }
        self.getWelfareReminder(self.productDetail.prdType);
        self.pageTitle = self.productDetail.prdName;
        self.$store.commit('setPageTitle', self.pageTitle);
        if(self.productDetail.verifyInfo){
          self.verifyDate = self.productDetail.verifyInfo.split(',');
          for(var i=0; i<self.verifyDate.length; i++){
            var persons = new Array();
            persons = {
              u: self.verifyDate[i],
            }
            self.verifyList.push(persons)
          }
        }

      })
    },
    components : {
      'v-scroll' : Scroll,
      'vOpenFloat': vOpenFloat,
      'PageNav': PageNav,
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
      let hei = document.documentElement.clientHeight - 50;
      document.querySelector('.product-content').setAttribute('style', 'height:'+hei+'px');

      self.$validator.updateDictionary({
        en: {
          custom: {
            invest: {
              required() {
                return '请输入加入金额'
              },
              moreThan() {
                if(self.productDetail.remainAmount < self.productDetail.minInvAmt){
                  return '最低加入金额为' + self.productDetail.remainAmount + '元'
                } else {
                  return '最低加入金额为' + self.productDetail.minInvAmt + '元'
                }
              }
            }
          }
        }
      });
    },
    watch: {
      invest() {
        this.invest = this.invest.toString().replace(/\D/g, '')
      }
    },
    methods: {
      setPlaceholder() {
        var self = this;
        if(self.productDetail.remainAmount < self.productDetail.minInvAmt){
          self.inputPlaceholder = '至少投资' + self.$fmoneyFormat(self.productDetail.remainAmount) + '元';
        } else {
          self.inputPlaceholder = '至少投资' + self.$fmoneyFormat(self.productDetail.minInvAmt) + '元';
        }
      },
      getProductDetail: Tool.getProductDetail,
      showImgDetail: Tool.showImgDetail,
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
      allIn: Tool.allIn,
      goAgreement: Tool.goAgreement,
      getWelfareReminder: Tool.getWelfareReminder,
      inTheArray: Tool.inTheArray,
      getTypeName: Tool.getTypeName,
      buyHandle: Tool.buyHandle,
      helpTextToggle: Tool.helpTextToggle,
      isOpenAccount: Tool.isOpenAccount,
      investComfirm() {
        var self = this;
        if (self.userInfo.loginResult) {  //登录情况
          self.$http.post('/pbap-web/action/customer/query/custAuthInfo', {}).then((res) => {
            self.tpStatus = res.body.respInfo.custInfo.tpStatus;
            self.activateStatus = res.body.respInfo.custInfo.activateStatus;
            if (self.tpStatus == 1) {
              if (self.activateStatus != 1) {
                self.isOpen = true;
                self.vOpenAcc = false;
              } else {
                self.buyConfirm = true;
                self.getWelfareReminder(self.productDetail.prdType);
              }
            } else if (self.tpStatus == 0) {
              self.isOpen = true;
              self.vOpenAcc = true;
            }
          });
        }
      },
      setTabValue(value){
        this.tabAt = value;
        var _self = this
        if (value == 2) {
          setTimeout(function () {
            _self.getInvestRecord(1);
          })
        }
      },
      getInvestRecord(pageAt){
        var self = this;
        self.$http.post('/pbap-web/action/investment/query/invList', {
          pageIndex: pageAt,
          pageSize: self.pageSize,
          prdCode: self.$route.params.prdCode
        }).then((res) => {
          self.invDataList = res.body.respInfo.invList;
        if(self.invDataList.totalCount == 0){
          this.$refs.noBox.style.display = "block";
          this.$el.querySelector('.yo-scroll').style.display = 'none';
        }
        else {
          self.pageAt++;
          self.nowPage = self.invDataList.pageIndex;
          self.invData = self.invDataList.dataList;
          this.$el.querySelector('.load-more').innerHTML = '加载中……';
          if(self.nowPage == self.invDataList.totalPage){
            this.$el.querySelector('.load-more').innerHTML = '没有更多数据了';
          }
        }

      });
      },
      onRefresh(done) {
        this.getInvestRecord(1);
        done()
      },
      onInfinite(done) {
        let self = this;
        self.$http.post('/pbap-web/action/investment/query/invList',{
          pageIndex: self.pageAt,
          pageSize: self.pageSize,
          prdCode: self.$route.params.prdCode
        }).then((res) => {
          self.pageAt++;
          self.invDataList = res.body.respInfo.invList;
          self.pageEnd = self.pageSize * self.pageAt;
          self.pageStart = self.pageEnd - self.pageSize;
          self.nowPage = self.invDataList.pageIndex;

          let arr = res.body.respInfo.invData.dataList;
          self.invData = self.invData.concat(arr);

          if(self.nowPage == self.invDataList.totalPage){
            this.$el.querySelector('.load-more').innerHTML = '没有更多数据了';
          }
          done() // call done
        }, (response) => {
          console.log('error');
        });
      },
      testBuyUrl(){
        var self = this;
        self.$validator.validateAll().then((result) => {
          if (result) {
            window.location.href = '/purchaseConfirm/'+self.$route.params.prdCode +'/'+self.invest+'/0/0'
          }
        });
      },
      question01(){
        this.$store.commit('setModal', {
          type: 'alert',
          msg: '已实际满标放款时间为准',
          confirmText: '我知道了'
        });
        this.$store.commit('showModal');
      },
      question02(){
        this.$store.commit('setModal', {
          type: 'alert',
          msg: '部分交易所渠道资产到期后，由于机构结算、银行间资金流转以及节假日因素，還款到账时间存在一定延时。',
          confirmText: '我知道了'
        });
        this.$store.commit('showModal');
      },
      // open产品详情
      openDetail(){
        let self = this;
        self.watchDetail = true;
        let hei = document.documentElement.clientHeight - 150;
        document.querySelector('.details').setAttribute('style', 'height:'+hei+'px');
      },
      closeDetails(){
        let self = this;
        self.watchDetail = false;
      },
      closeInvestComfirm(){
        this.buyConfirm = false;
      }
    }


  }
</script>
