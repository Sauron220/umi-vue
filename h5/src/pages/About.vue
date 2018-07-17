<template>
    <div class="wrap about-content">
        <PageNav message="/profile"></PageNav>
        <div class="mui-content">
            <div class="logo">
                <img src="../assets/images/icon_logo.png">
            </div>
            <ul class="mui-table-view">
                <li class="mui-table-view-cell">
                    <a class="mui-navigate-right" href="feedback">反馈</a>
                </li>
                <li class="mui-table-view-cell">
                    <a class="mui-navigate-right" href="/about/aboutus">關於我們</a>
                </li>
            </ul>
        </div>
        <div class="bottom-info-c">版权所有 © 上海尤鹿金融資訊服务有限公司<br>沪ICP备16027065号-2</div>
    </div>
</template>

<script>
  import PageNav from '@/components/PageNav'
  export default {
    name: 'About',
    data() {
      return {
        pageTitle: '关于聚寶盆',
      }
    },
    created(){
      var self = this;
      self.$store.commit('setPageTitle', self.pageTitle);
    },
    components: {
      'PageNav': PageNav,
    },
  }
</script>
