<template>
  <div class="news" v-TDK="newsDetail">
    <div class="section-space"></div>
    <div class="container">
      <ol class="breadcrumb">
        <span>您現在的位置：</span>
        <li>
          <router-link to="/">首頁</router-link>
        </li>
        <li>
          <router-link :to="{name:'NewsList',params:{newsType:newsDetail.newsType,pageAt:1}}">{{setNewTypeName(newsDetail.newsType)}}</router-link>
        </li>
        <li class="active">新聞詳情</li>
      </ol>
      <h1 class="title">{{newsDetail.newsTitle}}</h1>
      <div class="text-center text-small text-muted">
        <br>
        <span class="date">日期：{{newsDetail.newsTime}}</span>&emsp;&emsp;&emsp;
        <span class="author" v-if="newsDetail.newsFrom">來源：{{newsDetail.newsFrom}}</span>
      </div>
      <div class="content" v-html="newsDetail.newsContent"></div>
    </div>
    <div class="section-space"></div>
  </div>
</template>

<script>
  export default {
    name: 'News',
    data() {
      return {
        newsDetail: {
          newsType:0,
          title:''
        },
      }
    },
    created() {
      var self = this
      self.$http.post('/pbap-web/action/news/query/newsDetail', {newsId: self.$route.params.newsId}).then((res) => {
        self.newsDetail = res.body.respInfo.newsDetail;
        self.newsDetail.title = self.newsDetail.newsTitle;
      })
    },
    methods: {
      setNewTypeName(newsType) {
        if (newsType == 0) {
          return '公司新聞'
        } else {
          return '行業新聞'
        }
      }
    }
  }
</script>
