<template>
  <div class="news" style="background: #fff;" v-TDK="noticeDetail">
    <div class="section-space"></div>
    <div class="container">
      <!--<ol class="breadcrumb">
        <span>您現在的位置：</span>
        <li><router-link to="/">首頁</router-link></li>
        <li><router-link to="/notice-list">平臺公告</router-link></li>
        <li class="active">公告詳情</li>
      </ol>-->
      <h1 class="title">{{noticeDetail.newsTitle}}</h1>
      <div class="content" v-html="noticeDetail.newsContent"></div>
    </div>
    <div class="section-space"></div>
  </div>
</template>

<script>
  export default {
    name: 'Notice',
    data () {
      return {
        noticeDetail:{
          title:''
        }
      }
    },
    created(){
      var self = this
      self.$http.post('/pbap-web/action/news/query/newsDetail',{newsId:self.$route.params.newsId}).then((res)=>{
        self.noticeDetail = res.body.respInfo.newsDetail;
        self.noticeDetail.title = self.noticeDetail.newsTitle;
      })
    }
  }
</script>
