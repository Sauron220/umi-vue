<template>
    <div class="wrap regSuccess-content">
        <PageNav message="/"></PageNav>
        <img src="../assets/images/check-right.png">
        <h1>恭喜您注册成功</h1>
        <p>新手礼包已经发放到您的账户中<a href="/myCoupon">点击查看&gt;&gt;</a></p>
        <div>快开通上海存管账户，开启财富之旅吧！</div>
        <a class="base-btn" href="/openAccount">去开户</a>
    </div>
</template>

<script>
  import PageNav from '@/components/PageNav'
  export default {
    name: 'RegisterSuccess',
    data() {
      return {
        pageTitle: '注册成功',
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