<template>
  <div class="parent-child" v-TDK="TDK" :class="{'female':childInfo.chlSex==0 || !childInfo.chlSex}">
    <ParentChildNav ref="ParentChildNav"></ParentChildNav>
    <div class="container">
      <div class="section-plan">
        <div class="plan-case">
          <div class="text-center">
            <a href="javascript:;" @click="clickBox" class="case-box">
              <img src="../../assets/images/parent-child/plan-case.png" alt="寶箱">
            </a>
          </div>
          <div class="case-tip">
            <img src="../../assets/images/parent-child/plan-case-tip.png" alt="點擊寶箱">
          </div>
        </div>
        <div class="plan-info-link">
          <a class="info-box" href="/myAssets/88/1" target="_blank" id="infoBox">
            <ul class="list-inline">
              <li class="item">
                <div class="text">總投資額</div>
                <div class="value"><span>{{setNumOrString(childInfo.stsInvestment) || '--'}}</span>元</div>
              </li>
              <li class="item">
                <div class="text">累計收益</div>
                <div class="value"><span>{{setNumOrString(childInfo.stsIncome) || '--'}}</span>元</div>
              </li>
              <li class="item">
                <div class="text">累計待收</div>
                <div class="value"><span>{{setNumOrString(childInfo.stsCollect) || '--'}}</span>元</div>
              </li>
            </ul>
          </a>
          <div class="link-box">
            <a target="_blank" :href="'/parent-child-detail/'+lastVipPrd+'/0'"
               id="goProductDetail" class="link"></a>
          </div>
        </div>
      </div>

      <div class="ranking">
        <img src="../../assets/images/parent-child/male/rank-top.png">
        <img class="rank-text-img" src="../../assets/images/parent-child/male/rank-text.png">
        <div class="rank-v">
          <div class="rank-vo" :class="{'rank-first':idx==0,'rank-second':idx==1,'rank-third':idx==2}"
               v-for="(item,idx) in childStatisticsDetTop">
            <div class="head-kuang"
                 :class="{'head-kuang2':idx==0,'head-kuang1':idx==1,'head-kuang3':idx==2}">
              <img v-if="item.imgUrl" class="rank-head" :src="item.imgUrl">
              <img v-if="!item.imgUrl && !item.chlSex" class="rank-head"
                   src="../../assets/images/parent-child/avatar-female.png">
              <img v-if="!item.imgUrl && item.chlSex" class="rank-head"
                   src="../../assets/images/parent-child/avatar-male.png">
            </div>
            <img class="rank-level" :src="'/static/img/parent-child/level'+item.grade+'.png'">
            <div class="rank-id">{{item.cusMobile}}</div>
            <div class="rank-num">{{$fmoney(item.stsInvestment)}}元</div>
          </div>
        </div>
        <div class="rank-list">
          <div class="list-title">
            <span class="title-t t1">排名</span>
            <span class="title-t t2">寶寶</span>
            <span class="title-t t3">親子理財投資總額</span>
          </div>
          <div id="rankList">
            <div class="list-content" v-for="(item,idx) in childStatisticsDet" v-if="idx>2">
              <span class="content-ranking">{{setIndex(idx + 1)}}</span>
              <div class="content-baby">
                <img v-if="item.imgUrl" class="baby-head" :src="item.imgUrl">
                <img v-if="!item.imgUrl && !item.chlSex" class="baby-head"
                     src="../../assets/images/parent-child/avatar-female.png">
                <img v-if="!item.imgUrl && item.chlSex" class="baby-head"
                     src="../../assets/images/parent-child/avatar-male.png">
                <img class="baby-level" :src="'/static/img/parent-child/level'+item.grade+'.png'">
                <span style="margin-left: 40px;">{{item.cusMobile}}</span>
              </div>
              <span class="content-amount">{{$fmoney(item.stsInvestment)}}</span><i>元</i>
            </div>
          </div>
        </div>
      </div>

      <div class="content-item-box">
        <div class="content">親子計劃是壹款寓教於樂的理財計劃產品，寶媽寶爸可以通過親子計劃為寶貝的未來各項支出做好儲蓄規劃，寶寶可以通過親子計劃培養自己的財商。</div>
      </div>

      <div class="comment" id="comment">
        <div class="commit-title">
          熱門評論<span class="comment-num" v-if="totalCmtCount">({{totalCmtCount}})</span>
        </div>
        <div class="commit-edit">
          <div class="media">
            <div class="media-left">
              <a href="#">
                <!--<img class="media-object" src="../../assets/images/parent-child/avatar-female.png">-->
                <img v-if="childInfo.imgUrl" class="media-object" :src="childInfo.imgUrl">
                <img v-if="!childInfo.imgUrl && !childInfo.chlSex" class="media-object"
                     src="../../assets/images/parent-child/avatar-female.png">
                <img v-if="!childInfo.imgUrl && childInfo.chlSex" class="media-object"
                     src="../../assets/images/parent-child/avatar-male.png">
              </a>
            </div>
            <div class="media-body">
                            <textarea v-focus="isLogin" placeholder="我也來評論壹句…" maxlength="300"
                                      v-model="cmtContent" class="form-control edit-content edit-content1"
                                      name="comment"
                                      v-validate="{rules:{required:true}}"></textarea>
              <div class="section-space"></div>
              <button class="commit-btn btn btn-info pull-right" @click="publishComment(1)">發布</button>
            </div>
          </div>
        </div>
        <ul id="hotCommitList" style="background: #fff;margin-bottom: 40px;">
          <div class="commit-reply" v-for="item in comList">
            <div class="edit-head">
              <img v-if="item.imgUrl" class="reply-img" :src="item.imgUrl">
              <img v-if="!item.imgUrl && !item.chlSex" class="reply-img"
                   src="../../assets/images/parent-child/avatar-female.png">
              <img v-if="!item.imgUrl && item.chlSex" class="reply-img"
                   src="../../assets/images/parent-child/avatar-male.png">
            </div>
            <div class="reply-content clearfix">
              <div class="reply-name">{{item.nickName}}</div>
              <div class="reply-btn" @click="showReply(item);">回復</div>
              <div class="reply-time">{{item.cmtTime}}</div>
              <div class="reply-text">{{item.cmtContent}}</div>
              <div class="see-reply" v-if="item.replyCount>0">
                <a @click="showReply(item,true)" href="javascript:void(0);">查看全部<span>{{item.replyCount}}</span>條回復 &gt;&gt;</a>
              </div>
            </div>
          </div>

          <vPagination v-if="comListInfo.totalPage>1"
                       :totalPage="comListInfo.totalPage"
                       :currentPage="comListInfo.pageIndex"
                       :pageFor="getCommentList"
                       :pageForArg="{}">
          </vPagination>
        </ul>
      </div>

    </div>

    <div class="money-choice" v-if="moneyChoice">
      <div class="modal-backdrop fade in"></div>
      <div class="modal-dialog">
        <div class="modal-body">
          <a href="javascript:;" @click="moneyChoice = !moneyChoice" class="close">×</a>
          <div class="text-center">
            <br>
            <img src="../../assets/images/parent-child/plan-case-small.png" alt="box">
          </div>
          <p class="text-center" style="font-size: 24px;margin: 20px;">零錢投資</p>
          <div class="content">
            <div class="control-form">
              <input type="text" id="investRule" v-model="investMoney"
                     maxlength="11"
                     onafterpaste="value=value.replace(/\D/g,'')"
                     placeholder="0" validate="validate.required|investRule">
              <span>元</span>
              <button class="btn btn-append btn-info" @click="goDetail()">確定</button>
            </div>
            <div class="money-select" id="valuePlus">
              <span @click="investMoney=investMoney*1+100" item-value='100'>+100元</span>
              <span @click="investMoney=investMoney*1+500" item-value='500'>+500元</span>
              <span @click="investMoney=investMoney*1+1000" item-value='1000'>+1000元</span>
              <span @click="investMoney=investMoney*1+5000" item-value='5000'>+5000元</span>
            </div>
            <div class="clearfix"></div>
          </div>
        </div>
      </div>
    </div>
    <div id="planGift" class="plan-gift" v-if="planGift">
      <div class="modal-backdrop fade in"></div>
      <div class="modal-dialog">
        <div class="modal-body">
          <a href="javascript:;" @click="planGift = !planGift" class="close">×</a>
          <div class="text-center">
            <br>
            <p><img src="../../assets/images/parent-child/plan-gift.png" alt=""></p>
            <br>
            <p class="tip">累計投資3000元以上可得，達標請聯系客服獲取。</p>
          </div>
        </div>
      </div>
    </div>

    <div class="reply-comment" v-if="isShowreplayComment">
      <div class="modal-backdrop fade in"></div>
      <div class="modal-dialog">
        <a href="javascript:;" class="close" @click="isShowreplayComment=!isShowreplayComment">×</a>
        <div class="modal-body">
          <div class="reply-content">
            <div class="media">
              <div class="media-left">
                <a href="#">
                  <img v-if="replayAuthor.imgUrl" class="reply-img" :src="replayAuthor.imgUrl">
                  <img v-if="!replayAuthor.imgUrl && !replayAuthor.chlSex" class="reply-img"
                       src="../../assets/images/parent-child/avatar-female.png">
                  <img v-if="!replayAuthor.imgUrl && replayAuthor.chlSex" class="reply-img"
                       src="../../assets/images/parent-child/avatar-male.png">
                </a>
              </div>
              <div class="media-body">
                <div class="reply-name">{{replayAuthor.nickName}}</div>
                <div class="reply-time text-muted">{{replayAuthor.cmtTime}}</div>
                <div class="reply-text">{{replayAuthor.cmtContent}}</div>
                <div class="reply-list" v-if="isShowReply">
                  <div class="media" v-for="item in replyList">
                    <div class="media-left">
                      <a href="#">
                        <img v-if="item.imgUrl" class="reply-img" :src="item.imgUrl">
                        <img v-if="!item.imgUrl && !item.chlSex" class="reply-img"
                             src="../../assets/images/parent-child/avatar-female.png">
                        <img v-if="!item.imgUrl && item.chlSex" class="reply-img"
                             src="../../assets/images/parent-child/avatar-male.png">
                      </a>
                    </div>
                    <div class="media-body">
                      <div class="reply-name">{{item.nickName}}
                        <a href="javascript:;" class="pull-right reply" @click="changeReplyFor(item.nickName,item.cmtCode)">回復</a>
                      </div>
                      <div class="reply-time text-muted">{{item.cmtTime}}</div>
                      <div class="reply-text">{{item.cmtContent}}</div>
                    </div>
                  </div>
                  <vPagination v-if="replyListInfo.totalPage>1"
                               :totalPage="replyListInfo.totalPage"
                               :currentPage="replyListInfo.pageIndex"
                               :pageFor="getCommentReplyList"
                               :pageForArg="{cmtCode:replayAuthor.cmtCode}">
                  </vPagination>
                </div>
                <input class="reply-in form-control" v-model="replyContent" :placeholder="'回復 @'+replayAuthor.replyNickName" pass="">
                <button class="btn btn-info pull-right" @click="submitReply()">回復</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import ParentChildNav from '../../components/ParentChildNav.vue'
  import vPagination from '../../components/vPagination'
  import {Validator} from 'vee-validate';
  import ParentChildTool from '../../util/ParentChildTool';

  export default {
    name: 'PlanContent',
    data() {
      return {
        planGift: false,
        moneyChoice: false,
        isShowreplayComment: false,
        isShowReply: false,
        lastVipPrd: '',
        investMoney: '',
        cmtContent: '',
        replyContent: '',
        childStatisticsDet: [],
        childStatisticsDetTop: [],
        totalCmtCount: '',
        cmtInfo: {},
        comListInfo: {},
        comList: [],
        replyListInfo: {},
        replyList: [],
        replayAuthor: {
          nickName: '',
          cmtTime: '',
          cmtContent: '',
          imgUrl: '',
          cmtCode: '',
          replyNickName: '',
          replyCmtCode:''
        },
        TDK:{
          title:'最新理財產品',
          keyWords:'尊享計劃,p2p理財產品,個人理財產品,如何理財,年化收益率',
          description:'聚寶盆-尊享計劃，是聚寶盆推出的壹款高端理財產品，預期年化收益高達12%！個人最好的理財產品之壹，聚寶盆幫您制定個人理財規劃，理財產品排行就選聚寶盆，6道風控審核保障，理財更安全！',
        }
      }
    },
    created() {
      var self = this;
      self.$http.post('/pbap-web/action/product/query/lastVipPrd', {prdType: '50'}).then((res) => {
        if (res.body.respInfo.product) {
          self.lastVipPrd = res.body.respInfo.product.prdCode;
        }
      });
      self.$http.post('/pbap-web/action/child/childInvestRanking', {}).then((res) => {
        self.childStatisticsDet = res.body.respInfo.childStatisticsDet;
        self.childStatisticsDetTop[0] = self.childStatisticsDet[1];
        self.childStatisticsDetTop[1] = self.childStatisticsDet[0];
        self.childStatisticsDetTop[2] = self.childStatisticsDet[2];
      });
      self.getCommentList({index: 1});
    },
    computed: {
      userInfo() {
        return this.$store.state.userInfo
      },
      accountInfo() {
        return this.$store.state.accountInfo
      },
      childInfo() {
        return this.$store.state.childInfo
      },
    },
    mounted() {
      var self = this;
      self.$validator.updateDictionary({
        en: {
          custom: {
            comment: {
              required() {
                return '請輸入評論'
              }
            }
          }
        }
      });

    },
    components: {
      vPagination: vPagination,
      ParentChildNav: ParentChildNav
    },
    watch: {
      childInfo() {
        if(this.childInfo.status == 0){
          this.$refs.ParentChildNav.showSexChoice();
        }
      },
      investMoney() {
        this.investMoney = this.investMoney.toString().replace(/\D/g, '')
      }
    },
    methods: {
      goDetail() {
        var self = this;
        if (self.investMoney != '' && self.investMoney * 1 > 1) {
          window.open("/parent-child-detail/" + self.lastVipPrd + "/" + self.investMoney);
        }
      },
      setNumOrString(val) {
        var self = this;
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
      isLogin() {
        var self = this;
        if (!self.userInfo.loginResult) {
          self.showLoginConfirm();
        }
      },
      showLoginConfirm:ParentChildTool.showLoginConfirm,
      publishComment(type) {
        var self = this;
        if (!self.userInfo.loginResult) {
          self.showLoginConfirm();
        } else {
          self.$validator.validateAll().then((result) => {
            if (result && self.cmtContent &&  self.cmtContent.trim().length>0) {
              self.$http.post('/pbap-web/action/child/cusComment', {
                cmtContent: self.cmtContent,
                type: type
              }).then((res) => {
                self.cmtInfo = res.body.respInfo.cmtInfo;
                self.getCommentList({index: 1});
                self.cmtContent = '';
                self.$store.commit('setModal', {
                  show: false,
                  type: 'alert',
                  msg: '發布成功！',
                });
                self.$store.commit('showModal');
              });
            }
          }).catch((err) => {
            self.$store.commit('setModal', {
              show: false,
              type: 'alert',
              msg: '請輸入評論',
            });
            self.cmtContent = self.cmtContent.trim();
            self.$store.commit('showModal');
          });
        }
      },
      getCommentList(obj) {
        var self = this;
        self.comListInfo.totalPage = 0;
        self.$http.post('/pbap-web/action/child/commentList', {
          pageIndex: obj.index,
          pageSize: 10
        }).then((res) => {
          self.totalCmtCount = res.body.respInfo.totalCmtCount;
          self.comListInfo = res.body.respInfo.comList;
          self.comList = self.comListInfo.dataList;
        });
      },
      getCommentReplyList(obj) {
        var self = this;
        self.replyListInfo.totalPage = 0;
        self.$http.post('/pbap-web/action/child/replyList', {
          pageIndex: obj.index,
          cmtCode: obj.cmtCode,
          pageSize: 3,
        }).then((res) => {
          self.replyListInfo = res.body.respInfo.replyList;
          self.replyList = self.replyListInfo.dataList;
        });
      },
      showReply(obj,isShowReply) {
        this.replayAuthor = obj;
        this.replayAuthor.replyNickName = this.replayAuthor.nickName;
        this.replayAuthor.replyCmtCode = this.replayAuthor.cmtCode;
        this.isShowreplayComment = true;
        if(isShowReply){
          this.isShowReply = true;
          this.getCommentReplyList({
            index:1,
            cmtCode:obj.cmtCode,
          });
        }else{
          this.isShowReply = false;
        }
      },
      changeReplyFor(nickName,cmtCode){
        this.replayAuthor.replyNickName = nickName;
        this.replayAuthor.replyCmtCode = cmtCode;
      },
      submitReply(){
        var self = this;
        if (!self.userInfo.loginResult) {
          self.showLoginConfirm();
        } else {
          if (self.replyContent && self.replyContent.trim().length>0) {
            self.$http.post('/pbap-web/action/child/cusComment', {
              cmtContent: self.replyContent,
              cmtCode: self.replayAuthor.cmtCode,
              replyCmtCode: self.replayAuthor.replyCmtCode,
              type: 2
            }).then((res) => {
              self.isShowreplayComment = false;
              self.getCommentList({index: 1});
              self.replyContent = '';
              self.$store.commit('setModal', {
                show: false,
                type: 'alert',
                msg: '發布成功！',
              });
              self.$store.commit('showModal');
            });
          }else{
            self.$store.commit('setModal', {
              show: false,
              type: 'alert',
              msg: '請輸入評論',
            });
            self.replyContent = self.replyContent.trim();
            self.$store.commit('showModal');
          }
        }
      },
      clickBox(){
        if(this.userInfo.loginResult){
          this.moneyChoice = !this.moneyChoice
        }else{
          this.showLoginConfirm();
        }
      }
    }
  }
</script>
