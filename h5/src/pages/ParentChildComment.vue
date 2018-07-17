<template>
    <div class="wrap parentChildComment-content" :class="{'boy_set':childInfo.chlSex}">
        <header>
            <div class="nav-box mui-bar baby_top_title bb_bg girl_title" style="color:#fff">
                <a href="/parent-child" class="go-back mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
                <h1 class="mui-title" id="headName">热门评论</h1>
            </div>
        </header>
        <section class="introduce clearfix">
            <img src="../assets/images/comment_img.jpg">
            <div>亲子计划是一款寓教于乐的理财计划产品，宝妈宝爸可以通过亲子计划为宝贝的未来各项支出做好储蓄规划，宝宝可以通过亲子计划培养自己的财商。</div>
        </section>
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
                            <a class="reply" :href="'/parentChildReply/&cmt='+item.cmtCode">回复</a>
                            <h2>{{item.nickName}}</h2>
                            <h3>{{item.cmtTime}}</h3>
                            <p>{{item.cmtContent}}</p>
                            <a v-if="item.replyCount > 0" class="see_line" :href="'/parentChildReply/&cmt='+item.cmtCode">查看全部{{item.replyCount}}条回复>></a>
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
    name: 'ParentChildComment',
    data() {
      return {
        commentList: [],
        cont: '',
        pageAt : 1, //默认已经显示出15条数据 count等于一是让从16条开始加载
        pageSize : 10,  // 一次显示多少条
        pageStart : 0, // 开始页数
        pageEnd : 0, // 结束页数
      }
    },
    created() {
      this.loadcomList(1);
      this.$http.post('/pbap-web/action/child/readComment', {}).then((res) => {});
    },
    computed:{
      childInfo() {
        return this.$store.state.childInfo;
      },
    },
    components : {
      'v-scroll' : Scroll,
    },
    methods: {
      commentOn() {
        let self = this;
        self.$http.post('/pbap-web/action/child/cusComment', {
          'cmtContent': self.cont,
          'type': 1
        }).then((res) => {
          self.$store.commit('setModal', {
            show: false,
            type: 'alert',
            msg: '评论成功'
          });
          self.$store.commit('showModal');
          self.cont = '';
          self.loadcomList(1);
        });
      },
      loadcomList(pageAt) {
        let self = this;
        self.$http.post('/pbap-web/action/child/commentList', {
          'pageIndex': pageAt,
          'pageSize': self.pageSize,
        }).then((res) => {
          self.pageAt++;
          self.commentList = [];
         if(res.body.respInfo.comList.totalPage == 0){
//            this.$refs.noBox.style.display = "block";  //无数据时显示
           this.$el.querySelector('.yo-scroll').style.display = 'none';
          }else{
           self.$refs.hasBox.refreshScroll();
           self.commentList = res.body.respInfo.comList.dataList;
           this.$el.querySelector('.load-more').innerHTML = '加载中……';
           if(res.body.respInfo.comList.pageIndex == res.body.respInfo.comList.totalPage){
             this.$el.querySelector('.load-more').innerHTML = '没有更多数据了';
           }
         }
        });
      },
      onRefresh(done) {
        this.loadcomList(1);
        done()
      },
      onInfinite(done){
        let self = this;
        self.$http.post('/pbap-web/action/child/commentList', {
          'pageIndex': self.pageAt,
          'pageSize': self.pageSize,
        }).then((res) => {
          self.pageAt++;
          self.pageEnd = self.pageSize * self.pageAt;
          self.pageStart = self.pageEnd - self.pageSize;
          let arr = res.body.respInfo.comList.dataList
          self.commentList = self.commentList.concat(arr);
          if(res.body.respInfo.comList.pageIndex == res.body.respInfo.comList.totalPage){
            this.$el.querySelector('.load-more').innerHTML = '没有更多数据了';
          }
          done();
        });
      },
    }
  }
</script>
