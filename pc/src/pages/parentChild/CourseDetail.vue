<template>
  <div class="parent-child" v-TDK="TDK" :class="{'female':childInfo.chlSex==0 || !childInfo.chlSex}">
    <ParentChildNav></ParentChildNav>
    <div class="container">
      <div class="section-box section-activity-detail">
        <div class="title text-center">{{newsDetail.newsTitle}}</div>
        <div class="date text-right">時間：{{newsDetail.newsTime}}</div>
        <div class="content" v-html="newsDetail.newsContent"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import ParentChildNav from '../../components/ParentChildNav.vue'

  export default {
    name: 'CourseDetail',
    data () {
      return {
        newsDetail: '',
        TDK:{
          title:'最新理財產品',
          keyWords:'尊享計劃,p2p理財產品,個人理財產品,如何理財,年化收益率',
          description:'聚寶盆-尊享計劃，是聚寶盆推出的壹款高端理財產品，預期年化收益高達12%！個人最好的理財產品之壹，聚寶盆幫您制定個人理財規劃，理財產品排行就選聚寶盆，6道風控審核保障，理財更安全！',
        }
      }
    },
    created(){
      var self = this;
      self.$http.post('/pbap-web/action/news/query/newsDetail', {newsId: self.$route.params.newsId}).then((res) => {
        self.newsDetail = res.body.respInfo.newsDetail;
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
    },
    mounted () {

    },
    methods: {

    }
  }
</script>
