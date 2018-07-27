<template>
  <div class="news-list" v-TDK="TDK">
    <div class="section-space"></div>
    <div class="container" style="padding-bottom: 85px;">
      <!--<ol class="breadcrumb">
        <span>您現在的位置：</span>
        <li><router-link to="/">首頁</router-link></li>
        <li class="active">平臺公告</li>
      </ol>-->
      <h1 class="title">平臺公告</h1>
      <ul class="list-unstyled news">
        <li v-for="item in noticeList">
          <router-link :to="{ name: 'Notice', params: {newsId : item.newsId}}" target="_blank">
            <span class="title ell">{{ item.newsTitle }}</span>
            <span class="pull-right">{{ item.newsTime }}</span>
          </router-link>
        </li>
      </ul>
    </div>
    <div class="section-space"></div>
    <vPagination v-if="noticeListInfo.totalPage>1"
                 :totalPage="noticeListInfo.totalPage"
                 :currentPage="$route.params.pageAt"
                 :withOutPageAtUrl="'/notice-list/'">
    </vPagination>
  </div>
</template>
<!--
 v-TDK="TDK"
,
        TDK:{
          title:'',
          keyWords:'',
          description:'',
        }
-->
<script>
  import vPagination from '../components/vPagination'

  export default {
    name: 'NoticeList',
    data () {
      return {
        noticeListInfo: {},
        noticeList: {},
        TDK:{
          title:'聚寶盆平臺公告',
          keyWords:'聚寶盆平臺公告,聚寶盆產品發布,網站維護公告',
          description:'聚寶盆平臺公告欄目為您帶來最新產品發布情況、網站維護公告、最新的活動資訊等。服務熱線：400-600-9976。',
        }
      }
    },
    components: {
      vPagination
    },
    created(){
      this.pagechange(this.$route.params.pageAt);
    },
    mounted () {

    },
    methods: {
      pagechange (current){
        var self = this
        self.$http.post('/pbap-web/action/news/query/newsList',{newsType:1,pageSize:10,pageIndex:current}).then((res)=>{
          self.noticeListInfo = res.body.respInfo.list;
          self.noticeList = res.body.respInfo.list.dataList;
        })
      }
    }
  }
</script>

