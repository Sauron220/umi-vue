<template>
    <div class="wrap notice-list">
        <PageNav message="/profile"></PageNav>
        <div class="mui-content">
            <v-scroll :on-refresh="onRefresh" :on-infinite="onInfinite" ref="hasBox">
                <a class="item" :href="'/news/'+item.newsId" v-for="item in noticeList">
                    <div class="title-date">
                        <div class="bar name">
                            <div class="ell">{{ item.newsTitle }}</div>
                        </div>
                        <span class="bar date">{{ item.newsTime }}</span>
                    </div>
                    <p class="ell" v-html="item.newsContent"></p>
                </a>
            </v-scroll>
            <div class="no-content" ref="noBox">
                <img src="../assets/images/giraffe_none.png" class="center-img">
                <p class="center-text">暂无新闻</p>
            </div>
        </div>
    </div>
</template>

<script>
  import Scroll from '@/components/vPullupLoading'
  import PageNav from '@/components/PageNav'
  export default {
    name: 'NewsList',
    data() {
      return {
        pageTitle: '公司新闻',
        noticeListInfo: {},
        noticeList: {},
        nowPage: 0,
        pageAt : 1,
        pageSize : 10,
        pageStart : 0,
        pageEnd : 0,
      }
    },
    created(){
      var self = this;
      self.$store.commit('setPageTitle', self.pageTitle);

      this.pagechange(1);
    },
    components : {
      'v-scroll' : Scroll,
      'PageNav': PageNav,
    },
    methods: {
      pagechange (pageAt){
        var self = this
        self.$http.post('/pbap-web/action/news/query/newsList',{
          newsType: 0,
          pageSize: self.pageSize,
          pageIndex: pageAt
        }).then((res)=>{
          self.noticeList = {};
        self.pageAt = pageAt;

        let noticeListInfo = res.body.respInfo.list;

        if(noticeListInfo.totalCount == 0){
          this.$refs.noBox.style.display = "block";
          this.$el.querySelector('.yo-scroll').style.display = 'none';
        }
        else {
          self.pageAt++;
          self.noticeList = noticeListInfo.dataList;

          this.$el.querySelector('.load-more').innerHTML = '加载中……';
          if(noticeListInfo.pageIndex == noticeListInfo.totalPage){
            this.$el.querySelector('.load-more').innerHTML = '没有更多数据了';
          }
        }

      }, (res) => {
          console.log('error' + res);
        });
      },
      onRefresh(done) {
        this.pagechange(1);
        done()
      },
      // 上拉加载
      onInfinite(done) {
        let self = this;
        self.$http.post('/pbap-web/action/news/query/newsList',{
          newsType: 0,
          pageSize: self.pageSize,
          pageIndex: self.pageAt
        }).then((res) => {
          self.pageAt++;
        self.pageEnd = self.pageSize * self.pageAt;
        self.pageStart = self.pageEnd - self.pageSize;
        let noticeListInfo = res.body.respInfo.list;
        let arr = noticeListInfo.dataList;
        self.noticeList = self.noticeList.concat(arr);

        if(noticeListInfo.pageIndex == noticeListInfo.totalPage){
          this.$el.querySelector('.load-more').innerHTML = '没有更多数据了';
        }
        done() // call done
      }, (response) => {
          console.log('error');
        });
      },
    }
  }
</script>
