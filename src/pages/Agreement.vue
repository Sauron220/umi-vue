<template>
  <div class="agreement container" v-TDK="TDK">
    <div class="arg-header">
      <div class="pull-left">
        <img src="../assets/images/logo.png" class="logo">
      </div>
      <div class="pull-right">
        <a class="btn btn-primary btn-lg"
           :href="'/pbap-web/action/agreement/downloadAgreement/' + $route.params.prdCode + '?trdNum=' + $route.params.trdNum">
          <i class="icon-download icon-location"></i>下载合同
        </a>
      </div>
    </div>
    <div class="clearfix"></div>
    <div class="content" v-html="agrContent"></div>
  </div>
</template>

<script>
  export default {
    name: 'Agreement',
    data () {
      return {
        agreementVo:'',
        agrContent:{},
        TDK:{
          title:'产品合同-聚宝盆-',
          keyWords:'网络理财，互联网理财，理财，投资，投资理财，个人投资，网贷平台，网贷投资，网贷，互金，互联网金融，互金平台，互联网金融平台，聚宝盆，聚宝计划，分期投，月月盈，年年余，财富，P2P',
          description:'聚宝盆是一家综合性互联网金融平台，聚宝盆为广大个人投资理财的用户提供多元化的选择与优质的服务。投资理财用户可通过加入聚宝计划、分期投、月月盈、年年余等产品进行投资获得稳定收益。',
        }
      }
    },
    created(){
      var self = this
      self.$http.get('/pbap-web/action/agreement/queryAgreement/'+self.$route.params.prdCode + "?trdNum=" + self.$route.params.trdNum).then((res) => {
        self.agreementVo = res.body.respInfo.agreementVo
        self.agrContent = self.agreementVo.agrTempContent
      })
    },
    mounted () {

    },
    methods: {
    }
  }
</script>
