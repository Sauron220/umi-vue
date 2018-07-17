<template>
  <div class="news-list" v-TDK="TDK">
    <div class="section-space"></div>
    <div class="container">
      <ol class="breadcrumb">
        <span>您現在的位置：</span>
        <li><router-link to="/">首頁</router-link></li>
        <li class="active">{{setNewTypeName()}}</li>
      </ol>
      <h1 class="title">{{setNewTypeName()}}</h1>
      <ul class="list-unstyled news">
        <li v-for="item in newsList">
          <router-link :to="{ name: 'News', params: {newsId : item.newsId}}" target="_blank">
            <span class="title ell">{{ item.newsTitle }}</span>
            <span class="pull-right">{{ item.newsTime }}</span>
          </router-link>
        </li>
      </ul>
    </div>
    <div class="section-space"></div>
    <vPagination v-if="newsListInfo.totalPage>1"
                 :totalPage="newsListInfo.totalPage"
                 :currentPage="$route.params.pageAt"
                 :withOutPageAtUrl="'/news-list/' + $route.params.newsType +'/'">
    </vPagination>
  </div>
</template>

<script>
  import vPagination from '../components/vPagination'

  export default {
    name: 'NoticeList',
    data () {
      return {
        newsListInfo: {},
        newsList: {},
        TDK:{
          title:'聚寶盆新聞',
          keyWords:'聚寶盆怎麽樣,聚寶盆新聞,聚寶盆金融',
          description:'聚寶盆最新新聞發布，理財產品消息發布，作為壹個以技術驅動的互聯網金融平臺，為您帶來安全可靠的投資理財。',
        }
      }
    },
    components: {
      vPagination
    },
    created(){
      this.getNewsList(this.$route.params.pageAt);
    },
    mounted () {

    },
    methods: {
      getNewsList:function(current){
        var self = this
        self.$http.post('/pbap-web/action/news/query/newsList',{
          newsType:self.$route.params.newsType,
          pageSize:10,
          pageIndex:current
        }).then((res)=>{
          self.newsListInfo = res.body.respInfo.list;
          self.newsList = res.body.respInfo.list.dataList;
        })
      },
      setNewTypeName(){
        var self = this;
        if(self.$route.params.newsType == 0){
          return '公司新聞'
        }else{
          return '行業新聞'
        }
      }
    }
  }
</script>

