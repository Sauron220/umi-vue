<template>
    <div class="wrap noticeDetails-content">
        <PageNav></PageNav>
        <div class="mui-content">
            <h1 class="text-center">{{noticeDetail.newsTitle}}</h1>
            <div class="mui-content-padded" v-html="noticeDetail.newsContent"></div>
        </div>
    </div>
</template>

<script>
  import PageNav from '@/components/PageNav'
  export default {
    name: 'Notice',
    data() {
      return {
        pageTitle: '公告详情',
        noticeDetail:{
          title:''
        }
      }
    },
    created(){
      var self = this;
      self.$store.commit('setPageTitle', self.pageTitle);

      self.$http.post('/pbap-web/action/news/query/newsDetail',{
        newsId:self.$route.params.newsId
      }).then((res)=>{
        self.noticeDetail = res.body.respInfo.newsDetail;
        self.noticeDetail.title = self.noticeDetail.newsTitle;
      })
    },
    components: {
      'PageNav': PageNav,
    },
  }
</script>
