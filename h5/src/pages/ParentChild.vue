<template>
    <div class="wrap ParentChild-content" :class="{'bo-bg':childInfo.chlSex}" :style="{ height: screenHeight.height + 'px' }">
        <div class="mask" v-if="isSetInfo || isInvest"></div>
        <div class="welcome_baby" v-if="isSetInfo">
            <form action="" method="post" submit="newBaby" novalidate id="newBabyForm">
                <swiper :options="swiperOption">
                    <swiper-slide>
                        <h1>请选择宝宝性别</h1>
                        <div class="choice_area clearfix">
                            <div class="choice_box choice_box1">
                                <div val="1" class="choice_img" :class="{'choice_img_high':isChoiceSex}" @click="choiceSex(1)">
                                    <img src="../assets/images/choice_boy.jpg">
                                    <i v-if="isChoiceSex" class="gou"></i>
                                </div>
                                <p>男宝宝</p>
                            </div>
                            <div class="choice_box choice_box2">
                                <div val="0" class="choice_img" :class="{'choice_img_high':!isChoiceSex}"
                                     @click="choiceSex(0)">
                                    <img src="../assets/images/choice_girl.jpg">
                                    <i v-if="!isChoiceSex" class="gou"></i>
                                </div>
                                <p>女宝宝</p>
                            </div>
                        </div>
                    </swiper-slide>
                    <swiper-slide>
                        <h1>请选择宝宝年龄</h1>
                        <div class="new_baby_btn" @click="setBabyInfo">确认</div>
                        <div class="choice_area">
                            <span val="0" class="tab" :class="{'choice_tab_high':isChoiceAge == 0}"
                                  @click="choiceAge(0)">准爸妈</span>
                            <span val="1" class="tab" :class="{'choice_tab_high':isChoiceAge == 1}"
                                  @click="choiceAge(1)">1岁</span>
                            <span val="2" class="tab" :class="{'choice_tab_high':isChoiceAge == 2}"
                                  @click="choiceAge(2)">1岁半</span>
                            <span val="3" class="tab" :class="{'choice_tab_high':isChoiceAge == 3}"
                                  @click="choiceAge(3)">2岁</span>
                            <span val="4" class="tab" :class="{'choice_tab_high':isChoiceAge == 4}"
                                  @click="choiceAge(4)">3岁</span>
                            <span val="5" class="tab" :class="{'choice_tab_high':isChoiceAge == 5}"
                                  @click="choiceAge(5)">4岁</span>
                            <span val="6" class="tab" :class="{'choice_tab_high':isChoiceAge == 6}"
                                  @click="choiceAge(6)">5岁</span>
                            <span val="7" class="tab" :class="{'choice_tab_high':isChoiceAge == 7}"
                                  @click="choiceAge(7)">6岁</span>
                            <span val="8" class="tab" :class="{'choice_tab_high':isChoiceAge == 8}"
                                  @click="choiceAge(8)">7岁</span>
                            <span val="9" class="tab" :class="{'choice_tab_high':isChoiceAge == 9}"
                                  @click="choiceAge(9)">8岁</span>
                            <span val="10" class="tab" :class="{'choice_tab_high':isChoiceAge == 10}"
                                  @click="choiceAge(10)">9岁</span>
                            <span val="11" class="tab" :class="{'choice_tab_high':isChoiceAge == 11}"
                                  @click="choiceAge(11)">10岁</span>
                            <span val="12" class="tab" :class="{'choice_tab_high':isChoiceAge == 12}"
                                  @click="choiceAge(12)">11岁</span>
                            <span val="13" class="tab" :class="{'choice_tab_high':isChoiceAge == 13}"
                                  @click="choiceAge(13)">12岁</span>
                            <span val="14" class="tab" :class="{'choice_tab_high':isChoiceAge == 14}"
                                  @click="choiceAge(14)">12岁以上</span>
                        </div>
                    </swiper-slide>
                </swiper>
                <div class="swiper-pagination" slot="pagination"></div>
            </form>
            <div class="dot_area"></div>
            <div class="alert">奖励提示：选择完毕后，去“设置宝宝资料”完成其他资料设置还能获取一张加息券哦！</div>
        </div>

        <div class="wrap parent_child">
            <header>
                <div class="nav-box mui-bar baby_top_title">
                    <a href="/" class="go-back mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
                    <h1 class="mui-title">亲子计划</h1>
                </div>
            </header>

            <div class="about_baby clearfix">
                <img class="baby_level" :src="'../static/img/parent-child/level'+(childInfo.grade || 0)+'.png'">
                <img v-if="childInfo.imgUrl" :src="childInfo.imgUrl" class="face go_set_btn">
                <img v-if="!childInfo.imgUrl && childInfo.chlSex == 1" class="face go_set_btn"
                     src="../assets/images/baby_boy_face.png">
                <img v-if="!childInfo.imgUrl && (!childInfo.chlSex || childInfo.chlSex == 0)" class="face go_set_btn"
                     src="../assets/images/baby_girl_face.png">
                <div class="baby_info">
                    <h1 class="nickName">{{childInfo.nickName || '--'}}</h1>
                    <a class="go_baby_set" :href="loginType?'/parentChildSet':'/login'"></a>
                    <a :href="loginType?'/parentChildComment':'/login'" class="go_comment">热门评论
                        <i v-show="replyCount && replyCount > 0"></i>
                    </a>
                    <div class="bott">
                        <p class="cusMobile go_set_btn">ID:{{childInfo.cusMobile || '--'}}</p>
                        <div class="xp_out go_set_btn">
                            <div class="xp_inner go_set_btn" :class="{'bg-boy':childInfo.chlSex}" ref="xpInner"></div>
                        </div>
                        <div class="xp_txt go_set_btn" :class="{'color-boy':childInfo.chlSex}">
                            {{childInfo.empiricValue || 0}}/{{childInfo.totalEmpiricValue || 10000}}
                        </div>
                    </div>
                </div>
            </div>

            <nav class="baby_nav">
                <ul class="clearfix">
                    <li :class="{'nav_high':myLevel}"
                        @click="myLevel = true;planContent = false;rank = false;activity = false;">我的等级
                    </li>
                    <li :class="{'nav_high':planContent}"
                        @click="myLevel = false;planContent = true;rank = false;activity = false;">计划介绍
                    </li>
                    <li :class="{'nav_high':rank}"
                        @click="myLevel = false;planContent = false;rank = true;activity = false;">排行榜
                    </li>
                    <li :class="{'nav_high':activity}"
                        @click="myLevel = false;planContent = false;rank = false;activity = true;newsListInfo(2,1)">亲子活动
                    </li>
                </ul>
            </nav>

            <section class="baby_box baby_box_1" v-if="myLevel">
                <a class="growth_mission" :href="loginType?'/parentChildMission':'/login'"></a>
                <swiper :options="swiperOption" ref="mySwiper">
                    <swiper-slide v-for="(item, index) in chestList" :key="index">
                        <div class="reward_txt">
                            <h1>累积投资亲子理财<span>{{parseFloat(item.empiricValue) * 10}}</span>元</h1>
                            <p>可获得<span class="prizeName">{{item.prizeName}}</span></p>
                        </div>


                        <div v-if="item.receiveStatus == 0" :chestId="item.rwdId" class="chest chest_on"
                             @click="openChest(item)"></div>
                        <p v-if="item.receiveStatus == 0" class="reward_alert">打开宝箱，查看奖励吧</p>

                        <div v-if="item.receiveStatus == 1" :chestId="item.rwdId" class="chest">
                            <img :src="item.prizeUrl">
                            <span class="getChest"></span>
                        </div>
                        <p v-if="item.receiveStatus == 1" class="reward_alert">请联系客服获取奖励<br>400-600-9976</p>

                        <div v-if="item.receiveStatus == 2" :chestId="item.rwdId" class="chest chest_off"></div>
                        <p v-if="item.receiveStatus == 2" class="reward_alert"></p>

                        <span class="flag">
					            <span>V{{item.grade}}</span>
				            </span>
                        <hr v-if="chestList.length > 2" class="hr_long"
                            :class="{'hr_first':index == 0,'hr_last':index == (chestList.length -1)}">
                        <hr v-if="chestList.length == 2" class="hr_long"
                            :class="{'hr_first':index ==0,'hr_last':index == (chestList.length -1)}">
                    </swiper-slide>
                </swiper>
                <div class="swiper-button-prev"></div>
                <div class="swiper-button-next"></div>
            </section>

            <section class="baby_box baby_box_2" v-if="planContent">
                <img src="../assets/images/baby_se2.png" class="se_img">
            </section>

            <section class="baby_box baby_box_3" v-if="rank">
                <img src="../assets/images/rank_title.png" class="title">
                <div class="tops_cont">
                    <div :class="{'gold':idx == 1,'silver':idx == 0,'copper':idx == 2}" class="top"
                         v-for="(item,idx) in childStatisticsDetTop">
                        <div class="crown">
                            <img v-if="item.imgUrl" class="thisFace" :src="item.imgUrl">
                            <img v-if="!item.imgUrl && !item.chlSex" class="thisFace"
                                 src="../assets/images/baby_girl_face.png">
                            <img v-if="!item.imgUrl && item.chlSex" src="../assets/images/baby_boy_face.png"
                                 class="thisFace">
                        </div>
                        <img class="rank_lv" :src="'../static/img/parent-child/level'+(item.grade || 0)+'.png'">
                        <h3>{{(item.nickName) || 暂未诞生}}</h3>
                        <span>{{$fmoney(item.stsInvestment)}}元</span>
                    </div>
                </div>
                <div class="rank_list_title rank_list">
                    <span class="r1">排名</span>
                    <span class="r2">姓名</span>
                    <span class="r3">亲子理财投资总额</span>
                    <span class="r4">等级</span>
                </div>
                <div id="rankList">
                    <div class="rank_list rank_list_txt" v-for="(item,idx) in childStatisticsDet" v-if="idx>2">
                        <span class="r1">{{setIndex(idx + 1)}}</span>
                        <span class="r2">{{item.nickName}}</span>
                        <span class="r3">{{$fmoney(item.stsInvestment)}}元</span>
                        <span class="r4">LV{{item.grade}}</span>
                    </div>
                </div>

                <img src="../assets/images/rank_record.png" class="title" style="width:40%">
                <div id="newRecordList">
                    <div class="new_record" v-for="item in cusRewardDet">恭喜 <span>{{item.nickName}}</span>
                        达到LV{{item.grade}}，获得 <span>{{item.rewardContent}}</span> 奖励
                    </div>
                </div>

            </section>

            <section class="baby_box baby_box_4" v-if="activity">
                <div class="baby_banner_frame">
                    <div class="baby_banner">
                        <div class="mobile_banner swiper-container" id="mobile_banner">
                            <div class="bd swiper-wrapper">
                                <ul id="bannerLoad">
                                    <li v-for="item in bannerList" v-if="!item.resLink"><img :src="item.resUri"
                                                                                             class="bannerImg"></li>
                                    <li v-for="item in bannerList" v-if="item.resLink"><a :href="item.resLink"
                                                                                          target="_blank">
                                        <img :src="item.resUri" class="bannerImg">
                                    </a></li>
                                </ul>
                            </div>
                            <div class="hd">
                                <ul></ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="news_nav">
                    <span class="news_tab left_tab" :class="{'news-high':isActive}"
                          @click="newsListInfo(2,1),isActive = true;">亲子活动</span>
                    <span class="news_tab right_tab" :class="{'news-high':!isActive}"
                          @click="newsListInfo(3,1),isActive = false;">亲子课堂</span>
                </div>

                <img src="../assets/images/baby_ceiling.png" class="ceiling">
                <v-scroll :on-refresh="onRefresh" :on-infinite="onInfinite" ref="hasBox">
                    <div id="newsList" class="ceiling_under mui-table-view mui-table-view-chevron">
                        <a :noticeId="item.newsId" class="under_bar clearfix" v-for="item in newsList" :href="'/ParentChildNews/&noticeId='+item.newsId">
                            <div class="left">
                                <img :src="item.resUri">
                            </div>
                            <div class="right">
                                <h2>{{item.newsTitle}}</h2>
                                <p>{{item.newsSummary}}</p>
                            </div>
                        </a>
                    </div>
                </v-scroll>
            </section>

            <section class="hide_box info_content clearfix" v-if="myLevel || planContent">
                <div class="info_1">
                    <h1>总投资额</h1>
                    <span class="stsInvestment">{{setNumOrString(childInfo.stsInvestment) || '--'}}</span>元
                </div>
                <div class="info_2">
                    <h1>累计收益</h1>
                    <span class="stsIncome">{{setNumOrString(childInfo.stsIncome) || '--'}}</span>元
                </div>
                <div class="info_3">
                    <h1>累计待收</h1>
                    <span class="stsCollect">{{setNumOrString(childInfo.stsCollect) || '--'}}</span>元
                </div>
            </section>

            <span class="hide_box go_baby_inv" v-if="myLevel || planContent" @click="openSimulationInv">立即投资</span>
        </div>
        <div class="investment_content" :class="{'investment_content_high':isInvest}">
            <div class="pos">
                <h1 class="clearfix">零钱投资<span id="close_pop" @click="isInvest = false;"></span></h1>
            </div>
            <h2>投资金额</h2>
            <div class="inv_bar clearfix">
                <input type="number" pattern="[0-9]*" id="simInv" :placeholder="product.minInvAmt+'元起投'" maxlength="10"
                       onpaste="return false" v-model="investMoney" name="investMoney"
                       v-validate="{rules:{required:true,moreThan:product.minInvAmt}}">
                <span class="go_purchase" @click="goPurchase">确认</span>
            </div>
            <div class="add_capital">
                <span val="100" @click="investMoney = parseFloat(investMoney + 100)">100元</span>
                <span val="500" @click="investMoney = parseFloat(investMoney + 500)">500元</span>
                <span val="1000" @click="investMoney = parseFloat(investMoney + 1000)">1000元</span>
                <span val="5000" @click="investMoney = parseFloat(investMoney + 5000)">5000元</span>
            </div>
        </div>
    </div>
</template>

<script>
  import Scroll from '@/components/vPullupLoading'
  import {swiper, swiperSlide} from 'vue-awesome-swiper'

  export default {
    name: 'ParentChild',
    data() {
      return {
        loginType: false,
        isChoiceSex: 1,
        isChoiceAge: 0,
        isSetInfo: false,
        isSex: false,
        isAge: false,
        myLevel: true,
        planContent: false,
        rank: false,
        activity: false,
        childStatisticsDet: [],
        childStatisticsDetTop: [],
        cusRewardDet: [],
        isActive: true,
        newsList: [],
        bannerList: [],
        chestList: [],
        indexNews: 2,
        pageSize: 3,
        pageAt: 1, //默认已经显示出15条数据 count等于一是让从16条开始加载
        pageSize: 10,  // 一次显示多少条
        pageStart: 0, // 开始页数
        pageEnd: 0, // 结束页数
        swiperOption: {
          //是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象，假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true
          notNextTick: true,
          pagination: '.swiper-pagination',
          slidesPerView: 'auto',
          centeredSlides: true,
          paginationClickable: true,
          prevButton: '.swiper-button-prev',
          nextButton: '.swiper-button-next',
          pagination: '.swiper-pagination',
          onSlideChangeEnd: swiper => {
            //这个位置放swiper的回调方法
            this.page = swiper.realIndex + 1;
            this.index = swiper.realIndex;
          }
        },
        isInvest: false,
        product: '',
        investMoney: '',
        screenHeight: {
          height : 0
        },
        replyCount: 0
      }
    },
    created() {
      let self = this;
      self.$http.post('/pbap-web/action/child/cusChildInfo', {}).then((res) => {
        document.querySelector('body').setAttribute('style','background:#8cbf26')
        self.screenHeight.height = document.body.scrollHeight;
        if (res.body.respInfo.loginType != 0) {
          self.loginType = true;
          self.$store.commit('setChildInfo', res.body.respInfo.childInfo);
          if (res.body.respInfo.childInfo.status == 0) {
            self.isSetInfo = true;
          } else if (res.body.respInfo.childInfo.status == 1) {
            self.isSetInfo = true;
            if (res.body.respInfo.childInfo.chlSex || res.body.respInfo.childInfo.chlSex == 0) {
              self.isSex = true;
              if (res.body.respInfo.childInfo.chlSex == 1) {
                self.isChoiceSex = true;
              } else {
                self.isChoiceSex = false;
              }
            } else {
              self.isAge = true;
              self.isChoiceAge = res.body.respInfo.childInfo.chlAge;
            }
          } else {
            if (parseFloat(self.childInfo.empiricValue) > parseFloat(self.childInfo.totalEmpiricValue)) {
              this.$refs.xpInner.style.width = "100%";
            } else {
              if (self.childInfo.empiricValue) {
                this.$refs.xpInner.style.width = (self.childInfo.empiricValue / self.childInfo.totalEmpiricValue) * 100 + "%";
              }
            }
            self.replyCount = res.body.respInfo.childInfo.replyCount;
            console.log(self.replyCount)


            self.$http.post('/pbap-web/action/resource/query/bannerList', {
              'pageIndex': 1,
              'pageSize': 5,
              'resModule': 5,
              'resType': 6
            }).then((res) => {
              self.bannerList = res.body.respInfo.list.dataList;
            });
            self.$http.post('/pbap-web/action/child/childRewardList', {}).then((res) => {
              self.chestList = res.body.respInfo.rewardList;
            });
            self.$http.post('/pbap-web/action/product/query/lastVipPrd', {prdType: 50}).then((res) => {
              self.product = res.body.respInfo.product;
            });
          }
        }
        self.$http.post('/pbap-web/action/child/childInvestRanking', {}).then((res) => {
          self.childStatisticsDet = res.body.respInfo.childStatisticsDet;
          self.childStatisticsDetTop[0] = self.childStatisticsDet[1];
          self.childStatisticsDetTop[1] = self.childStatisticsDet[0];
          self.childStatisticsDetTop[2] = self.childStatisticsDet[2];
        });
        self.$http.post('/pbap-web/action/child/childRewardRanking', {}).then((res) => {
          if (res.body.respInfo.cusRewardDet.length > 0) {
            self.cusRewardDet = res.body.respInfo.cusRewardDet;
          }
        });
      });


    },
    computed: {
      childInfo() {
        return this.$store.state.childInfo;
      },
      swiper() {
        return this.$refs.mySwiper.swiper;
      }
    },
    mounted() {
      var self = this;
      self.$validator.updateDictionary({
        en: {
          custom: {
            invest: {
              required() {
                return '请输入加入金额'
              },
              moreThan() {
                return '最低加入金额为' + self.productDetail.minInvAmt + '元'
              }
            }
          }
        }
      });
      //这边就可以使用swiper这个对象去使用swiper官网中的那些方法
//      this.swiper.slideTo(0, 0, false);
    },
    components: {
      'v-scroll': Scroll,
      'swiper': swiper,
      'swiper-slide': swiperSlide
    },
    methods: {
      goPurchase() {
        let self = this;

        if (!self.product || !self.product.prdCode) {
          self.$store.commit('setModal', {
            type: 'alert',
            msg: '暂无亲子理财产品',
          });
          self.$store.commit('showModal');
        } else {
          if (!self.investMoney) {
            self.$store.commit('setModal', {
              type: 'alert',
              msg: '请输入投资金额',
            });
            self.$store.commit('showModal');
          } else if (self.investMoney < self.product.minInvAmt) {
            self.$store.commit('setModal', {
              type: 'alert',
              msg: '最低投资金额为' + self.product.minInvAmt + '元',
            });
            self.$store.commit('showModal');
          }
          else {
            location.href = '/parent-child-detail/' + self.product.prdCode + '?amount=' + self.investMoney;
          }

        }
      },
      openSimulationInv() {
        let self = this;
        if (self.loginType) {
          self.investMoney = '';
          self.isInvest = true;
        } else {
          location.href = '/login';
        }
      },
      choiceSex(ind) {
        let self = this;
        if (!self.isSex) {
          self.isChoiceSex = ind;
        }
      },
      choiceAge(ind) {
        let self = this;
        if (!self.isAge) {
          self.isChoiceAge = ind;
        }
      },
      setBabyInfo() {
        let self = this;
        let query = {}
        query.chlSex = self.isChoiceSex;
        query.chlAge = self.isChoiceAge;
        if (self.childInfo.status == 0) {
          query.typeStr = "2-3";
        } else if (self.childInfo.status == 1) {
          if (!self.isSex) {
            query.typeStr = "2";
          } else if (!self.isAge) {
            query.typeStr = "3";
          }
        }
        console.log("query", query)
        self.$http.post('/pbap-web/action/child/editChild', query).then((res) => {
          if (res.body.errorInfo.errorCode == '0000') {
            self.isSetInfo = false;
            self.$store.commit('setModal', {
              show: false,
              type: 'alert',
              msg: '设置成功！',
              confirmUrl: '/parent-child'
            });
            self.$store.commit('showModal');
          }
        });
      },
      setNumOrString(val) {
        let self = this;
        if (typeof val == 'number') {
          return this.$fmoney(val);
        } else {
          return val;
        }
      },
      setIndex(val) {
        if (val < 10) {
          return '0' + val
        } else {
          return val
        }
      },
      newsListInfo(ind, pageAt) {
        let self = this;
        self.indexNews = ind;
//        self.isActive = !self.isActive;
        self.$http.post('/pbap-web/action/news/query/newsList', {
          'pageIndex': pageAt,
          'pageSize': self.pageSize,
          'newsType': self.indexNews,
        }).then((res) => {
          self.pageAt++;
          self.newsList = [];
          if (res.body.respInfo.list.totalPage == 0) {
            this.$el.querySelector('.yo-scroll').style.display = 'none';
          } else {
            self.$refs.hasBox.refreshScroll();
            self.newsList = res.body.respInfo.list.dataList;
            this.$el.querySelector('.load-more').innerHTML = '加载中……';
            if (res.body.respInfo.list.pageIndex == res.body.respInfo.list.totalPage) {
              this.$el.querySelector('.load-more').innerHTML = '没有更多数据了';
            }
          }

        })
      },
      onRefresh(done) {
        this.newsListInfo(this.indexNews, 1);
        done()
      },
      onInfinite(done) {
        let self = this;
        self.$http.post('/pbap-web/action/news/query/newsList', {
          'pageIndex': self.pageAt,
          'pageSize': self.pageSize,
          'newsType': self.indexNews,
        }).then((res) => {
          self.pageAt++;
          self.pageEnd = self.pageSize * self.pageAt;
          self.pageStart = self.pageEnd - self.pageSize;
          let arr = res.body.respInfo.list.dataList;
          self.newsList = self.newsList.concat(arr);
          if (res.body.respInfo.list.pageIndex == res.body.respInfo.list.totalPage) {
            this.$el.querySelector('.load-more').innerHTML = '没有更多数据了';
          }
          done();
        })
      },
      openChest(obj) {
        let self = this;
        self.$http.post('/pbap-web/action/child/childReward', {
          "rewardContent": obj.prizeName,
          "rwdId": obj.rwdId,
          "type": 1
        }).then((res) => {
          for (var i = 0; i < self.chestList.length; i++) {
            if (obj.rwdId == self.chestList[i].rwdId) {
              self.chestList[i].receiveStatus = 1;
            }
          }

        })
      }
    },
  }
</script>
