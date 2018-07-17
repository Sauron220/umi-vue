<template>
    <div class="wrap agreement-content">
        <div id="agreement" class="inner" v-html="agrContent"></div>
    </div>
</template>

<script>
  export default {
    name: 'Agreement',
    data() {
      return {
        pageTitle: '服务协议',
        agreementVo:'',
        agrContent:{},
      }
    },
    created(){
      var self = this;
      self.$store.commit('setPageTitle', self.pageTitle);
      if(self.$route.params.agrPath == '1'){
        PDFJS.getDocument("../../action/agreement/lookAgreement/" + prdCode).then(function(pdf) {
          for (var pageNum = 1; pageNum <= pdf.numPages; ++pageNum) {
            pdf.getPage(pageNum).then(function(page) {
              var scale = 1.5;
              var viewport = page.getViewport(1);

              var canvas = document.createElement('canvas');
              var context = canvas.getContext('2d');
              canvas.height = viewport.height;
              canvas.width = viewport.width;

              var renderContext = {
                canvasContext: context,
                viewport: viewport
              };
              page.render(renderContext);

              document.getElementById('agreement').appendChild(canvas);
            });
          }
        })
      } else {
        self.$http.get('/pbap-web/action/agreement/queryAgreement/'+self.$route.params.prdCode + "?trdNum=" + self.$route.params.trdNum).then((res) => {
          self.agreementVo = res.body.respInfo.agreementVo;
          self.agrContent = self.agreementVo.agrTempContent;
        })
      }

    },
  }
</script>
