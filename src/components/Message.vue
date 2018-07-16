<template>
  <div class="comment" id="comment">
    <div class="commit-title">
      評論<span class="comment-num" v-if="totalCount">({{totalCount}})</span>
    </div>
    <div class="commit-edit">
      <div class="media">
        <div class="media-left">
          <a href="#">
            <!--<img class="media-object" src="../assets/images/parent-child/avatar-female.png">-->
            <img v-if="childInfo.imgUrl" class="media-object" :src="childInfo.imgUrl">
            <img v-if="!childInfo.imgUrl && !childInfo.chlSex" class="media-object"
                 src="../assets/images/parent-child/avatar-female.png">
            <img v-if="!childInfo.imgUrl && childInfo.chlSex" class="media-object"
                 src="../assets/images/parent-child/avatar-male.png">
          </a>
        </div>
        <div class="media-body">
                            <textarea v-focus="isLogin" placeholder="我也來評論壹句…" maxlength="300"
                                      v-model="cmtContent" class="form-control edit-content edit-content1"
                                      name="comment"
                                      v-validate="{rules:{required:true}}"></textarea>
          <div class="section-space"></div>
          <div class="commit-btn btn btn-info pull-right" @click="publishComment(1)">發布</div>

        </div>
      </div>
    </div>
    <ul id="hotCommitList" style="background: #fff;margin-bottom: 40px;">
      <div class="commit-reply" v-for="item in comList">
        <div class="edit-head">
          <img v-if="item.imgUrl" class="reply-img" :src="item.imgUrl">
          <img v-if="!item.imgUrl && !item.chlSex" class="reply-img"
               src="../assets/images/parent-child/avatar-female.png">
          <img v-if="!item.imgUrl && item.chlSex" class="reply-img"
               src="../assets/images/parent-child/avatar-male.png">
        </div>
        <div class="reply-content clearfix">
          <div class="reply-name">{{item.nickName}}</div>
          <div class="reply-btn" @click="showReply(item);" v-if="!pageId">回復</div>
          <div class="reply-time">{{item.cmtTime}}</div>
          <div class="reply-text">{{item.cmtContent}}</div>
          <div class="see-reply" v-if="item.replyCount>0 &&　!pageId">
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
                       src="../assets/images/parent-child/avatar-female.png">
                  <img v-if="!replayAuthor.imgUrl && replayAuthor.chlSex" class="reply-img"
                       src="../assets/images/parent-child/avatar-male.png">
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
                             src="../assets/images/parent-child/avatar-female.png">
                        <img v-if="!item.imgUrl && item.chlSex" class="reply-img"
                             src="../assets/images/parent-child/avatar-male.png">
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
  import vPagination from '../components/vPagination'
  import {Validator} from 'vee-validate';
  import ParentChildTool from '../util/ParentChildTool';

  export default {
    name: 'Message',
    data () {
      return {
        isShowreplayComment: false,
        isShowReply: false,
        cmtContent: '',
        replyContent: '',
        childStatisticsDet: [],
        childStatisticsDetTop: [],
        totalCount: '',
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
      }
    },
    props:{
      pageId:{
        type:String
      }
    },
    created(){
      var self = this;
      self.getCommentList({index: 1});
    },
    computed: {
      userInfo() {
        return this.$store.state.userInfo
      },
      childInfo() {
        return this.$store.state.childInfo
      },
    },
    mounted (){
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
    components:{
      vPagination: vPagination,
    },
    watch: {
    },
    mounted () {

    },
    methods: {
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
            if (result) {
              let query = {
                cmtContent: self.cmtContent,
                type: type
              }
              // 文章  添加id參數
              if(self.pageId){
                query.pageId = self.pageId
              }
              self.$http.post('/pbap-web/action/child/cusComment', query).then((res) => {
                self.cmtInfo = res.body.respInfo.cmtInfo;
                self.getCommentList({index: 1});
                self.cmtContent = '';
                self.$store.commit('setModal', {
                  show: true,
                  type: 'alert',
                  msg: '發布成功！',
                });
                self.$store.commit('showModal');
              });
            }
          }).catch((err) => {
            self.$store.commit('setModal', {
              show: true,
              type: 'alert',
              msg: '請輸入評論',
            });
            self.$store.commit('showModal');
          });
        }
      },
      getCommentList(obj) {
        var self = this;
        self.comListInfo.totalPage = 0;
        var query = {
          pageIndex: obj.index,
          pageSize: 10
        }
        // 文章  添加id參數
        if(self.pageId){
          query.pageId = self.pageId
        }
        self.$http.post('/pbap-web/action/child/commentList', query).then((res) => {
          self.totalCount = res.body.respInfo.comList.totalCount;
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
          if (self.replyContent) {
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
            self.$store.commit('showModal');
          }
        }
      }

    }
  }
</script>
