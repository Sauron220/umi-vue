<template>
    <div class="wrap parentChildNews-content" :class="{'boy_set':childInfo.chlSex}">
        <header>
            <div class="nav-box mui-bar baby_top_title girl_title">
                <a href="/parent-child"
                   class="go-back mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
                <h1 class="mui-title" id="headName">亲子活动</h1>
            </div>
        </header>
        <h1 class="baby_details_name">{{newsInfo.newsTitle}}</h1>
        <div class="baby_news_content" v-html="newsInfo.newsContent">{{newsInfo.newsContent}}</div>
        <section class="comment_area">
            <h1>所有评论</h1>
            <v-scroll :on-refresh="onRefresh" :on-infinite="onInfinite" ref="hasBox">
                <div id="commentList" class="assets_box mui-table-view mui-table-view-chevron">
                    <div class="comment_bar clearfix" v-for="item in commentList">
                        <div class="face">
                            <img v-if="item.imgUrl" :src="item.imgUrl">
                            <img v-if="!item.imgUrl && item.chlSex == 1" src="../assets/images/baby_boy_face.png">
                            <img v-if="!item.imgUrl && item.chlSex == 0" src="../assets/images/baby_girl_face.png">
                        </div>
                        <div :cmt="item.cmtCode" class="communication">
                            <h2>{{item.nickName}}</h2>
                            <h3>{{item.cmtTime}}</h3>
                            <p>{{item.cmtContent}}</p>
                            <div class="reply_content" v-if="item.replyContent">
                                <h4>客服</h4>
                                <h5>{{item.replyTime}}</h5>
                                <p><font>@{{item.nickName}}</font> {{item.replyContent}}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </v-scroll>
        </section>
        <footer class="speak_area">
            <div class="pos">
                <input type="text" placeholder="我也来评论一句..." id="commentOn" v-model="cont" name="cont">
                <span id="sendOut" @click="commentOn" :class="{'text-blue': cont}">发送</span>
            </div>
        </footer>
    </div>
</template>

<script>
  import Scroll from '@/components/vPullupLoading'

  export default {
    name: 'ParentChildNews',
    data() {
      return {
        msg: 'Welcome to Your Vue.js App',
        cont: '',
        noticeId: '',
        newsInfo: '',
        commentList: [],
        pageAt: 1, //默认已经显示出15条数据 count等于一是让从16条开始加载
        pageSize: 10,  // 一次显示多少条
        pageStart: 0, // 开始页数
        pageEnd: 0, // 结束页数
      }
    },
    created() {
      this.loadInfo();
      this.loadList(1);
    },
    computed:{
      childInfo() {
        return this.$store.state.childInfo;
      },
    },
    components: {
      'v-scroll': Scroll,
    },
    methods: {
      commentOn() {
        let self = this;
        self.$http.post('/pbap-web/action/child/cusComment', {
          pageId: self.noticeId,
          cmtContent: self.cont,
          type: 1
        }).then((res) => {
          self.$store.commit('setModal', {
            show: false,
            type: 'alert',
            msg: '评论成功'
          });
          self.$store.commit('showModal');
          self.cont = '';
          self.loadList(1);
        });
      },
      loadInfo() {
        let self = this;
        self.noticeId = self.loadUrlParm("noticeId");
        self.$http.post('/pbap-web/action/news/query/newsDetail', {
          newsId: self.noticeId
        }).then((res) => {
          self.newsInfo = res.body.respInfo.newsDetail;
        });
      },
      loadList(pageAt) {
        let self = this;
        self.$http.post('/pbap-web/action/child/commentList', {
          pageIndex: pageAt,
          pageSize: self.pageSize,
          pageId: self.noticeId
        }).then((res) => {
          self.pageAt++;
          self.commentList = [];
          if (res.body.respInfo.comList.totalPage == 0) {
            this.$el.querySelector('.yo-scroll').style.display = 'none';
          } else {
            self.$refs.hasBox.refreshScroll();
            self.commentList = res.body.respInfo.comList.dataList;
            this.$el.querySelector('.load-more').innerHTML = '加载中……';
            if (res.body.respInfo.comList.pageIndex == res.body.respInfo.comList.totalPage) {
              this.$el.querySelector('.load-more').innerHTML = '没有更多数据了';
            }
          }
        });
      },
      onRefresh(done) {
        this.loadList(1);
        done();
      },
      onInfinite(done) {
        let self = this;
        self.$http.post('/pbap-web/action/child/commentList', {
          pageIndex: self.pageAt,
          pageSize: self.pageSize,
          pageId: self.noticeId
        }).then((res) => {
          self.pageAt++;
          self.pageEnd = self.pageSize * self.pageAt;
          self.pageStart = self.pageEnd - self.pageSize;
          let arr = res.body.respInfo.comList.dataList;
          self.commentList = self.commentList.concat(arr);
          if (res.body.respInfo.comList.pageIndex == res.body.respInfo.comList.totalPage) {
            this.$el.querySelector('.load-more').innerHTML = '没有更多数据了';
          }
          done();
        });
      },
    },
  }
</script>
