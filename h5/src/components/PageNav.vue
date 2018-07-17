<template>
  <header class="top-nav" v-show="!sh">
    <div class="nav-box mui-bar mui-bar-nav">
      <a href="javascript:window.history.go(-1)" v-if="!message" class="go-back mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
      <a :href="message" v-else class="go-back mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
      <h1 class="mui-title" v-text="pageTitle"></h1>
    </div>
    <div class="top-space"></div>
  </header>
</template>

<script>
export default {
  name: 'PageNav',
  props: ['message'],
  data () {
    return {
      prdId: parseInt(Math.random()),
      lastVipPrd: '0',
      anUrl: '',
      sh: null,
    }
  },
  created: function () {
    var self = this;
    self.sh = this.$route.query.sh;

    self.$http.post('/pbap-web/action/product/query/lastVipPrd', {prdType: '40'}).then((res) => {
      if (res.body.respInfo.product) {
        self.lastVipPrd = res.body.respInfo.product.prdCode;
        self.$store.commit('setLastVipPrd', self.lastVipPrd);
      }
    });
    self.$http.post('/pbap-web/action/resource/query/domainUrlList?header', {}).then((res) => {
      let mevsUrl = res.body.respInfo.mevs;
      if (mevsUrl) {
        self.anUrl = mevsUrl + "anniversary.html"
      }
    });

    self.setPrevUrl();

  },
  computed: {
    pageTitle(){
      return this.$store.state.pageTitle;
    }
  },
  methods: {
    setPrevUrl(){
      let self = this;
      let prevUrl = document.referrer;
      self.$cookie.set('prevUrl', prevUrl, 1);
    },
    goBackView(){
      let self = this;
      let prevUrl = self.$cookie.get('prevUrl');

      if(prevUrl){
        window.location.href = prevUrl;
      } else {
        window.history.go(-1)
      }
    }
  }

}
</script>

