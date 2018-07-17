<template>
    <div class="wrap privateDetail-content">
        <PageNav :message="backUrl"></PageNav>
        <a :href="'/product-list/'+productDetail.prdType+'/1'" class="previous-record">往期记录</a>
        <img src="../assets/images/private_banner.jpg" class="top-banner">
        <div class="info flex-pack-justify">
            <div class="info1">锁定期
                <span class="prdPeriod">{{productDetail.prdPeriod}}天</span>
            </div>
            <div class="info2">还款方式
                <span class="">按月还息，到期还本</span>
            </div>
            <div class="info3">投资金额
                <span>{{$fmoneyFormat(productDetail.minInvAmt / 10000)}}万元</span>
            </div>
        </div>
        <ul class="choice-tab flex-pack-justify">
            <li @click="choiceBtn(1)" :class="{'choice-high': choiceTab==1}">计划说明</li>
            <li @click="choiceBtn(2)" :class="{'choice-high': choiceTab==2}">产品详情</li>
        </ul>
        <div class="description-details">
            <div class="description-box description-box1" v-show="choiceTab==1">
                <h1>产品特色</h1>
                <div class="feature">
                    <span class="f1">资产优化</span>
                    <span class="f2">专属体验</span>
                </div>
                <h1>VIP尊享用户六项专属特权</h1>
                <div class="privilege">
                    <span class="p1">专属客服</span>
                    <span class="p2">可自定义个性推荐码</span>
                    <span class="p3">每季度的专属福利</span>
                    <span class="p4">特别的生日礼包</span>
                    <span class="p5">年会特邀嘉宾席</span>
                    <span class="p6">新品发布优先体验特权</span>
                </div>
                <h1>常见问题解答</h1>
                <div class="qa-box">
                    <h2>Q：什么是尊享计划？</h2>
                    <div class="clearfix">
                        <i>A：</i>
                        <p>尊享计划是聚寶盆推出的一款高端理财产品，更好的满足您多样化的理财需求。参与尊享计划的用户将会获得聚寶盆提供的六项特权服务。</p>
                    </div>
                    <h2>Q：如何加入尊享计划？</h2>
                    <div class="clearfix">
                        <i>A：</i>
                        <p>尊享计划暂时仅限内部邀约用户投资，被邀约用户通过自己独立的尊享码即可加入。</p>
                    </div>
                    <h2>Q：怎样获取尊享码？</h2>
                    <div class="clearfix">
                        <i>A：</i>
                        <p>被邀约加入尊享计划的用户会由专属客服提供尊享码。</p>
                    </div>
                    <h2>Q：投资尊享计划有什么特权？</h2>
                    <div class="clearfix">
                        <i>A：</i>
                        <p>投资尊享计划可享六大特权<br>
                            <span>(1)专属客服服务</span>
                            <span>(2)自定义个性推荐码</span>
                            <span>(3)季度专属福利</span>
                            <span>(4)特别的生日礼包</span>
                            <span>(5)年会特邀嘉宾席</span>
                            <span>(6)新品发布优先体验权</span>
                        </p>
                    </div>
                </div>
                <h1 v-if="invList.length>0">最新加入</h1>
                <div id="newest-join" class="newest-join picScroll-top" v-if="invList.length>0">
                    <div class="bd">
                        <ul class="infoList" id="joinList" :style="{ top }">
                            <li v-for="item in invList">
                                <span class="list-preTime">{{item.trdDate}}</span>
                                <span class="list-realName">{{item.cusMobile}}</span>
                                <span class="list-trdAmount">{{$fmoney(item.trdAmount)}}元</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div class="description-box description-box2" v-show="choiceTab==2">
                <h1 class="d2-tit1">计划周期</h1>
                <div class="cycle flex-pack-justify">
                    <hr />
                    <div class="t1">
                        <img src="../assets/images/cycle_01.png">
                        <span id="st1" class="gray-node">项目满标</span>
                        <span class="date colFinishDate">2017-08-31</span>
                        <i class="question-mark question01" @click="question01()"></i>
                    </div>
                    <div class="t2">
                        <img src="../assets/images/cycle_02.png">
                        <span id="st2" class="gray-node">开始计息</span>
                        <span class="date valueDate">2017-08-31</span>
                    </div>
                    <div class="t3">
                        <img src="../assets/images/cycle_03.png">
                        <span id="st3" class="gray-node">到期退出</span>
                        <span class="date dueDate">2017-08-31</span>
                    </div>
                    <div class="t4">
                        <img src="../assets/images/cycle_04.png">
                        <span id="st4" class="gray-node">预计最迟可提现</span>
                        <span class="date repDate">2018-08-26 23:59:59</span>
                        <i class="question-mark question02" @click="question02()"></i>
                    </div>
                </div>

                <h1 class="d2-tit2">产品审核</h1>
                <div class="examine-info">
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
                </div>
                <h1 class="d2-tit3 audit_data" v-if="productDetail.verifyInfo">审核资料</h1>
                <div class="photo-views audit-data" v-if="productDetail.verifyInfo">
                    <img src="../assets/images/look_details1_tip.png" class="right-icon">
                    <see-box>
                        <see-item v-for="(item,index) in verifyList" :key="index" :img="item"></see-item>
                    </see-box>
                </div>

                <h1 class="d2-tit4">产品说明</h1>
                <div class="explain">
                    <div class="introduction" v-html="productDetail.introduction"></div>
                    <div class="concrete">
                        <div class="flex-pack-justify">
                            <h2>产品金额</h2>
                            <span>{{$fmoneyFormat(productDetail.prdAmount)}}元</span>
                        </div>
                        <div class="flex-pack-justify">
                            <h2>投资条件</h2>
                            <span>最低{{$fmoneyFormat(productDetail.minInvAmt)}}元</span>
                        </div>
                        <div class="flex-pack-justify">
                            <h2>还款方式</h2>
                            <span>{{repType(productDetail.repType)}}</span>
                        </div>
                        <div class="flex-pack-justify">
                            <h2>计息时间</h2>
                            <span>{{valDelayTypeDays(productDetail.valDelayType, productDetail.repDelayType, productDetail.valDelayDays, productDetail.repDelayDays)}}</span>
                        </div>
                        <div class="flex-pack-justify">
                            <h2>還款到账时间</h2>
                            <span>{{repDelayTypeDays(productDetail.valDelayType, productDetail.repDelayType, productDetail.valDelayDays, productDetail.repDelayDays)}}</span>
                        </div>
                        <div class="flex-pack-justify">
                            <h2>保障方式</h2>
                            <span>100%用户利益保障方式</span>
                        </div>
                        <div class="flex-pack-justify">
                            <h2>服务协议</h2>
                            <span>
                                <a class="text-gold goAgreement" v-show="productDetail.agrPath"
                                   :href="'/agreement/'+productDetail.prdCode+'/0/1'">查看服务协议</a>
                                <a class="text-gold goAgreement" v-show="!productDetail.agrPath"
                                   :href="'/agreement/'+productDetail.prdCode+'/'+productDetail.trdNum+'/0'">查看服务协议</a>
                            </span>
                        </div>
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
        <div class="mask0" v-show="buyConfirm" @click="closeInvestComfirm()"></div>
        <div class="pay-box" :class="{'pay-box-high': buyConfirm}">
            <div class="pos">
                <form action="" method="post" id="payForm" submit="investRule" novalidate="" class="red-form">
                    <div class="bar bar-gray">
                        <div class="six-box six-line clearfix">
                            <h1>可用余额</h1>
                            <span class="text-orange">{{$fmoney(accountInfo.balanceAmount)}}元</span>
                            <a class="go-cz" @click="isOpenAccount('recharge?bu=product', productDetail.prdCode)">儲值</a>
                        </div>
                    </div>
                    <div class="bar bar-gray">
                        <div class="six-box six-line clearfix">
                            <h1>加入金额</h1>
                            <span class="text-blue">{{$fmoney(productDetail.prdAmount)}}元</span>
                        </div>
                    </div>
                    <div class="bar bar-gray">
                        <div class="six-box clearfix">
                            <h1>预期收益</h1>
                            <span class="text-blue" id="加入金额">{{calcPreEarn(invest, productDetail.rate, productDetail.prdPeriod)}}元</span>
                        </div>
                    </div>
                    <div class="bar bar-white">
                        <div class="six-box clearfix">
                            <h1>尊享码</h1>
                            <input type="text" v-model="vipCode" placeholder="请输入尊享码" maxlength="6" class="inp"
                                   v-validate="{rules:{required:true,digits:6}}" name="vipCode">
                            <i class="p-error">{{errors.first('vipCode')}}</i>
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
                </form>
            </div>
            <div class="paybtn" @click="goBuy()">立即加入</div>
        </div>
        <vOpenFloat v-if="isOpen" :vOpenAccBl="vOpenAcc"></vOpenFloat>
    </div>
</template>

<script>
  import Tool from '../util/ProductTool.js'
  import PageNav from '@/components/PageNav'
  import Scroll from '@/components/vPullupLoading'
  import vOpenFloat from '@/components/vOpenFloat'

  export default {
    name: 'PrivateDetail',
    data() {
      return {
        pageTitle: '',
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
        showHelpText: false,
        choiceTab: 1,
        backUrl: '',
        verifyDate: {},
        verifyList: [],
        activeIndex: 0
      }
    },
    components:{
      'v-scroll' : Scroll,
      'PageNav': PageNav,
      'vOpenFloat': vOpenFloat
    },
    computed: {
      userInfo(){
        return this.$store.state.userInfo
      },
      accountInfo(){
        return this.$store.state.accountInfo
      },
      top() {
        return - this.activeIndex * 140 + 'px';
      }
    },
    created(){
      var self = this;
      self.loginUrl = '/login?remark='+location.pathname;
      self.getProductDetail(this.$route.params.prdCode,function () {
        self.invest = self.productDetail.minInvAmt;
        self.pageTitle = self.productDetail.prdName;
        self.$store.commit('setPageTitle', self.pageTitle);
        if(self.$route.query && self.$route.query.asset == '1'){
          self.backUrl = document.referrer
        } else {
          self.backUrl = '/product-list/'+self.productDetail.prdType+'/1';
        }
        document.querySelector('.mui-bar-nav').style.background = 'black';
        document.querySelector('.mui-title').style.color = '#facc7d';
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
      self.getWelfareReminder(40);

      self.$http.post('/pbap-web/action/investment/query/invList', {
        pageIndex:1,
        pageSize:10,
        prdType:40
      }).then((res) => {
        self.invList = res.body.respInfo.invList.dataList;
      });
    },
    mounted () {
      var self = this;
      self.$validator.updateDictionary({
        en: {
          custom: {
            vipCode: {
              required() {
                return '请输入尊享码'
              },
              digits() {
                return '尊享码长度为6位数字'
              }
            }
          }
        }
      });
      setInterval(_ => {
        let i = parseInt(this.invList.length/3);
        console.log(this.activeIndex +","+i);
        if(this.activeIndex+1 < i) {
          this.activeIndex += 1;
        } else {
          this.activeIndex = 0;
        }
      }, 3000);
    },
    watch:{
      vipCode() {
        this.vipCode = this.vipCode.replace(/\D/g, '');
      },
      imageList(){
        var _self = this
        if(_self.imageList.length>3){
          setTimeout(function () {

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

          })
        }
      },
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
      helpTextToggle: Tool.helpTextToggle,
      isOpenAccount: Tool.isOpenAccount,
      investComfirm(){
        var self = this;
        if(self.userInfo.loginResult){  //登录情况
          self.$http.post('/pbap-web/action/customer/query/custAuthInfo',{}).then((res) => {
            self.tpStatus = res.body.respInfo.custInfo.tpStatus;
            self.activateStatus = res.body.respInfo.custInfo.activateStatus;
            if(self.tpStatus == 1){
              if(self.activateStatus !=1 ){
                self.isOpen = true;
                self.vOpenAcc = false;
              }else{
                  self.buyConfirm = true;
                  self.getWelfareReminder(self.productDetail.prdType);
              }
            }else if(self.tpStatus == 0){
              self.isOpen = true;
              self.vOpenAcc = true;
            }
          });

        }
      },
      goBuy(){
        var self = this;
        // 校验尊享码输入格式是否正确
        self.$validator.validateAll().then((result) => {
          if (result) {
            // 提交尊享码校验尊享码的可用性
            self.$http.post('/pbap-web/action/investment/add/prdPurchaseBefore',{
              prdCode:self.productDetail.prdCode,
              vipCode:self.vipCode
            }).then((res) => {
              if(res.body.errorInfo.errorCode == '0000'){
                console.log("成功");
                window.location.href = '/purchaseConfirm/'+self.$route.params.prdCode +'/'+self.invest+'/0/'+self.vipCode
              }
            });
          }
        });
      },
      choiceBtn(tab){
        var self = this;
        self.choiceTab = tab;
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
      closeInvestComfirm(){
        this.buyConfirm = false;
      }
    }
  }
</script>
