<template>
    <div class="wrap security-content">
        <div id="pageContain" class="page-wrap inner">
            <img src="../assets/images/security2_banner.jpg" class="security-banner">
            <div class="page">
                <h2>6道风控审核保障</h2>
                <img src="../assets/images/security2_1.png">
            </div>
            <div class="page gray">
                <h2>风险保障</h2>
                <img src="../assets/images/security2_2.png">
            </div>
            <div class="page">
                <h2>风控优势</h2>
                <img src="../assets/images/security2_3.png">
            </div>
            <div class="page gray">
                <h2>合法合规</h2>
                <img src="../assets/images/security2_4.png">
            </div>
            <div class="page">
                <h2>技术安全</h2>
                <img src="../assets/images/security2_5.png">
            </div>
            <div class="page gray">
                <h2>账户资金安全</h2>
                <img src="../assets/images/security2_6.png">
            </div>
            <div class="page">
                <img src="../assets/images/security2_7.png">
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'Security',
    data() {
      return {
        pageTitle: '安全保障',
      }
    },
    created(){
      var self = this;
      self.$store.commit('setPageTitle', self.pageTitle);
    },
  }
</script>