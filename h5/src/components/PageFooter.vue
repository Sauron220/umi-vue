<template>
  <div class="pageFooter mui-bar mui-bar-tab">
    <div class="nav">
      <router-link class="nav-item" to="/">
        <i class="mui-icon icon-homepage"></i>首页
      </router-link>
      <router-link class="nav-item" :to="{ name: 'ProductList', params: { prdType: $route.params.prdType,pageAt:1 }}" v-if="$route.params.prdType" >
        <i class="mui-icon icon-invest"></i>理财
      </router-link>
      <router-link class="nav-item" to="/product-list/0/1" v-else>
        <i class="mui-icon icon-invest"></i>理财
      </router-link>
      <a class="nav-item" :href="discoverUrl">
        <i class="mui-icon icon-discover"></i>发现
      </a>
      <router-link class="nav-item" to="/profile">
        <i class="mui-icon icon-profile"></i>我的
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageFooter',
  data () {
    return {
      discoverUrl: '',
    }
  },
  created: function () {
    var self = this;
    self.$http.post('/pbap-web/action/resource/query/domainUrlList?header', {}).then((res) => {
      let mevsUrl = res.body.respInfo.mevs;
      if (mevsUrl) {
        self.discoverUrl = mevsUrl + "h5/discover.html"
      }
    });
  },
}
</script>
