<template>
    <div class="wrap feedback-content">
        <PageNav message="/about"></PageNav>
        <form action="" method="post" submit="feedBackContent" novalidate id="fbForm">
            <div class="mui-content">
                <textarea id="textarea" rows="5" placeholder="您的意见是我们宝贵的财富"
                          v-model="feedContent" name="feedContent"></textarea>
            </div>
            <div class="mui-content-padded">
                <button type="button" class="mui-btn mui-btn-warning mui-btn-block" @click="feedBackSubmit">提交</button>
            </div>
        </form>
        <div class="bottom-info-c">版权所有 © 上海尤鹿金融資訊服务有限公司<br>沪ICP备16027065号-2</div>

        <div class="feedBack-alert" :class="{'feedBack-high': alertText == true}">
            <img src="../assets/images/checkmark.png">
            <i>感谢您的反馈，我们会认真对待</i>
        </div>
    </div>
</template>

<script>
  import PageNav from '@/components/PageNav'
  export default {
    name: 'Feedback',
    data() {
      return {
        pageTitle: '反馈',
        feedContent: '',
        alertText: false,
      }
    },
    created(){
      var self = this;
      self.$store.commit('setPageTitle', self.pageTitle);
    },
    components: {
      'PageNav': PageNav,
    },
    methods: {
      feedBackSubmit() {
        var self = this;
        let loginData = {
          feedContent: this.feedContent,
        };
        self.$validator.validateAll().then((result) => {
          if (result) {
            self.$http.post('/pbap-web/action/customer/feedBack', loginData).then(response => {
              if (response.body.errorInfo.errorCode == '0000') {
                self.alertText = true;
                setTimeout(function(){
                  self.alertText = false;
                  self.feedContent = "";
                },2000)
              }
            }, response => {
              // error callback
            });
          }

        });
        return false;
      }
    }
  }
</script>
