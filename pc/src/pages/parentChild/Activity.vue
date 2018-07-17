<template>
  <div class="parent-child" v-TDK="TDK" :class="{'female':childInfo.chlSex==0 || !childInfo.chlSex}">
    <ParentChildNav ref="ParentChildNav"></ParentChildNav>
    <div class="container">
      <div class="section-box section-activity" id="activityList" v-if="$route.params.pageIdx">
        <div class="title text-center">
          <img src="../../assets/images/parent-child/activity-title.png" alt="title">
        </div>
        <ul class="list-inline activity-list">
          <li v-for="item in newsList">
            <a :href="'/parent-child/article/' + item.newsId"
               target="_blank">
              <div class="cover-img">
                <img :src="item.resUri" class="img-responsive" alt="cover img">
              </div>
              <div class="activity-title ell">{{item.newsTitle}}</div>
            </a>
          </li>
        </ul>
        <div class="clearfix"></div>
        <div class="pagination-nav text-center" v-if="newsListInfo.totalPage>1">
          <a :href="getPreUrl()" class="pre">
            <i class="icon icon-angle-left" :class="{'active':$route.params.pageIdx>1}"></i>
          </a>
          <div class="page-num">
            <span class="current">{{newsListInfo.pageIndex}}</span>/
            <span class="total">{{newsListInfo.totalPage}}</span>
          </div>
          <a :href="getNextUrl(newsListInfo.totalPage)" class="next">
            <i class="icon icon-angle-right"
               :class="{'active':$route.params.pageIdx<newsListInfo.totalPage}"></i>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import ParentChildNav from '../../components/ParentChildNav.vue'

  export default {
    name: 'Activity',
    data () {
      return {
        newsListInfo: '',
        newsList: '',
        TDK:{
          title:'最新理財產品',
          keyWords:'尊享計劃,p2p理財產品,個人理財產品,如何理財,年化收益率',
          description:'聚寶盆-尊享計劃，是聚寶盆推出的壹款高端理財產品，預期年化收益高達12%！個人最好的理財產品之壹，聚寶盆幫您制定個人理財規劃，理財產品排行就選聚寶盆，6道風控審核保障，理財更安全！',
        }
      }
    },
    created(){
      var self = this;
      // 親子活動
      self.$http.post('/pbap-web/action/news/query/newsList?article', {
        "pageSize": 8,
        pageIndex: self.$route.params.pageIdx,
        newsType: 2
      }).then((res) => {
        self.newsListInfo = res.body.respInfo.list;
        self.newsList = self.newsListInfo.dataList;
      });
    },
    computed: {
      childInfo() {
        return this.$store.state.childInfo
      },
    },
    mounted (){

    },
    components:{
      ParentChildNav:ParentChildNav
    },
    watch: {
      childInfo() {
        if(this.childInfo.status == 0){
          this.$refs.ParentChildNav.showSexChoice();
        }
      },
    },
    mounted () {

    },
    methods: {
      getPreUrl(){
        var self = this;
        if (self.$route.params.pageIdx > 1) {
          return '/parent-child/activity-list/' + (self.$route.params.pageIdx * 1 - 1)
        } else {
          return 'javascript:;'
        }
      },
      getNextUrl(totalPage){
        var self = this;
        if (self.$route.params.pageIdx < totalPage) {
          return '/parent-child/activity-list/' + (self.$route.params.pageIdx * 1 + 1)
        } else {
          return 'javascript:;'
        }
      },
    }
  }
</script>
