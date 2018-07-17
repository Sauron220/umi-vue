<template>
    <div class="wrap">
        <PageNav></PageNav>
        <div class="mui-content">
            <div class="content inner">
                <img class="img-responsive" src="../assets/images/service_01.jpg">
                <img class="img-responsive" src="../assets/images/service_02.jpg">
                <img class="img-responsive" src="../assets/images/service_03.jpg">
            </div>
        </div>
    </div>
</template>

<script>
  import PageNav from '@/components/PageNav'
  export default {
    name: 'ContactService',
    data() {
      return {
        pageTitle: '与我们亲密接触的正确方式',
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