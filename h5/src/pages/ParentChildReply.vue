<template>
    <div class="wrap parentChildReply-content" :class="{'boy_set':childInfo.chlSex}">
        <header>
            <div class="nav-box mui-bar baby_top_title bb_bg girl_title" style="color:#fff">
                <a href="/parentChildComment" class="go-back mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
                <h1 class="mui-title" id="headName">回复</h1>
            </div>
        </header>
        <section class="reply_basic" style="margin-top: 50px;">
            <div class="comment_bar clearfix" style="border:none;">
                <div class="face">
                    <img v-if="replayInfo.imgUrl" :src="replayInfo.imgUrl">
                    <img v-if="!replayInfo.imgUrl && replayInfo.chlSex == 1" src="../assets/images/baby_boy_face.png">
                    <img v-if="!replayInfo.imgUrl && replayInfo.chlSex == 0" src="../assets/images/baby_girl_face.png">
                </div>
                <div class="communication" :cmt="replayInfo.replyCmtCode">
                    <span class="reply" @click="replayName = replayInfo.nickName">回复</span>
                    <h2>{{replayInfo.nickName}}</h2>
                    <h3>{{replayInfo.cmtTime}}</h3>
                    <p>{{replayInfo.cmtContent}}</p>
                </div>
            </div>
        </section>

        <section class="comment_area">
            <h1>所有回复</h1>
            <v-scroll :on-refresh="onRefresh" :on-infinite="onInfinite" ref="hasBox">
                <div id="replyList" class="assets_box mui-table-view mui-table-view-chevron">
                    <div class="comment_bar clearfix" v-for="item in replayList">
                        <div class="face">
                            <img v-if="item.imgUrl" :src="item.imgUrl">
                            <img v-if="!item.imgUrl && item.chlSex == 1" src="../assets/images/baby_boy_face.png">
                            <img v-if="!item.imgUrl && item.chlSex == 0" src="../assets/images/baby_girl_face.png">
                        </div>
                        <div :cmt="item.cmtCode" class="communication">
                            <span class="reply" @click="replayName = item.nickName">回复</span>
                            <h2>{{item.nickName}}</h2>
                            <h3>{{item.cmtTime}}</h3>
                            <p><font>@{{item.replyNickName}}</font>：{{item.cmtContent}}</p>
                        </div>
                    </div>
                </div>
            </v-scroll>
        </section>
        <footer class="speak_area">
            <div class="pos">
                <input type="text" :placeholder="'回复 @'+ replayName" id="replyOn" v-model="cont" name="cont">
                <span id="sendOut" @click="commentOn" :class="{'text-blue': cont}">发送</span>
            </div>
        </footer>
    </div>
</template>

<script>
  import Scroll from '@/components/vPullupLoading'

  export default {
    name: 'ParentChildReply',
    data() {
      return {
        cmt: '',
        replayInfo: [],
        replayList: [],
        replayName: '',
        pageAt: 1, //默认已经显示出15条数据 count等于一是让从16条开始加载
        pageSize: 10,  // 一次显示多少条
        pageStart: 0, // 开始页数
        pageEnd: 0, // 结束页数
        cont: '',
      }
    },
    created() {
      this.loadList(1);
    },
    components: {
      'v-scroll': Scroll,
    },
    computed:{
      childInfo() {
        return this.$store.state.childInfo;
      },
    },
    methods: {
      commentOn() {
        let self = this;
        self.$http.post('/pbap-web/action/child/cusComment', {
          'cmtContent': self.cont,
          'type': 2,
          "cmtCode" : self.cmt,
          "replyCmtCode" : self.replayInfo.cmtCode
        }).then((res) => {
          self.$store.commit('setModal', {
            show: false,
            type: 'alert',
            msg: '回复成功'
          });
          self.$store.commit('showModal');
          self.cont = '';
          self.loadList(1);
        });
      },
      loadList(pageAt) {
        let self = this;
        self.cmt = self.loadUrlParm("cmt");
        self.$http.post('/pbap-web/action/child/replyList', {
          pageIndex: pageAt,
          pageSize: self.pageSize,
          cmtCode: self.cmt
        }).then((res) => {
          self.pageAt++
          self.replayList = [];
          if (res.body.respInfo.replyList.totalPage == 0) {
            this.$el.querySelector('.yo-scroll').style.display = 'none';
          } else {
            self.$refs.hasBox.refreshScroll();
            self.replayInfo = res.body.respInfo.cmtInfo;
            self.replayName = self.replayInfo.nickName;
            self.replayList = res.body.respInfo.replyList.dataList;
            this.$el.querySelector('.load-more').innerHTML = '加载中……';
            if (res.body.respInfo.replyList.pageIndex == res.body.respInfo.replyList.totalPage) {
              this.$el.querySelector('.load-more').innerHTML = '没有更多数据了';
            }
          }
        });
      },
      onRefresh(done) {
        this.loadList(1);
        done()
      },
      onInfinite(done) {
        let self = this;
        self.$http.post('/pbap-web/action/child/replyList', {
          pageIndex: self.pageAt,
          pageSize: self.pageSize,
          cmtCode: self.cmt
        }).then((res) => {
          self.pageAt++;
          self.pageEnd = self.pageSize * self.pageAt;
          self.pageStart = self.pageEnd - self.pageSize;
          let arr = res.body.respInfo.replyList.dataList;
          self.replayList = self.replayList.concat(arr);
          if (res.body.respInfo.replyList.pageIndex == res.body.respInfo.replyList.totalPage) {
            this.$el.querySelector('.load-more').innerHTML = '没有更多数据了';
          }
          done();
        });
      },
    },
  }
</script>
