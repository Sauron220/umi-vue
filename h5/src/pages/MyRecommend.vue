<template>
    <div class="wrap myRecommend-content">
        <PageNav :message="goBackBtn()"></PageNav>
        <div class="inner">
            <img src="../assets/images/recom_icon.png" class="recom-icon">
            <div class="my-recom clearfix">
                <span class="tit">我的推荐码</span>
                <div class="my-recom-ts">
                    <textarea class="recommend copy" type="text" id="myRec" readonly v-model="rcmLink"></textarea>
                    <span>请长按输入框复制链接</span>
                </div>
            </div>

            <div class="explain noCopy">
                <div class="tit">推荐活动说明</div>
                <ul>
                    <li>推荐人必须通过分享自己的推荐码，介绍新用户前来注册投资 。</li>
                    <li>被推荐人在注册之日起60天内进行投资，推荐人即可获得相应的推荐奖励 。</li>
                    <li>推荐奖励按被推荐人累计投资总额的1%（奖励年化）计算，根据不同产品周期 </br>
                        奖励额度不同，例如：</br>
                        被推荐人投资10000元月月喜和10000元季季宝，总投资额20000元 </br>
                        推荐奖励：</br>
                        月月喜=投资金额*1%/360天*30天</br>
                        =10000*1%/360*30=8.33元</br>
                        季季宝=投资金额*1%/360天*90天</br>
                        =10000*1%/360*90=25.00元</br>
                        则月月喜推荐奖励+季季宝推荐奖励</br>
                        =8.33+25.00=33.33元</br>
                        即推荐奖励总额约33.33。
                    </li>
                    <li>推荐奖励按自然月清算，将于每月5号前由系统发放上月推荐奖励，如遇节假日，则延后至下一个工作日发放。</li>
                    <li>推荐奖励将以现金红包的形式发放至推荐人的注册账户内。</li>
                    <li>活动奖励及推荐人与被推荐人关系由系统核实为准，不予人工审核 。</li>
                    <li>该活动规则最终解释权归聚寶盆所有 。</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
  import clipboard from 'v-clipboard'
  import PageNav from '@/components/PageNav'
  export default {
    name: 'MyRecommend',
    data () {
      return {
        pageTitle: '我的推荐',
        msg: 'Welcome to Your Vue.js App',
        custInfo: {
          rcmCode:''
        },
        rcmLink:'',
        size: 128,
        bgColor: '#fff',
        fgColor: '#000',
      }
    },
    components: {
      'clipboard': clipboard,
      'PageNav': PageNav,
    },
    created () {
      var self = this;
      self.$store.commit('setPageTitle', self.pageTitle);
      self.$http.post('/pbap-web/action/customer/query/custAuthInfo', {}).then((res)=>{
        self.custInfo = res.body.respInfo.custInfo;
        self.rcmLink = location.origin+'/register?rcmCode='+self.custInfo.rcmCode;
      })
    },

    methods: {
      onCopy: function (e) {
        this.$store.commit('setModal', {
          type: 'alert',
          msg: '已成功复制到您的剪切板！',
        });
        this.$store.commit('showModal');
      },
      onError: function (e) {
        this.$store.commit('setModal', {
          type: 'alert',
          msg: '复制失败，请手动CTRL+C复制链接！',
        });
        this.$store.commit('showModal');
      },
      goBackBtn(){
        var self = this;
        let refLink = document.referrer.substring(document.referrer.lastIndexOf('/'),document.referrer.lastIndexOf('/')+6);
        if(refLink == '/login'){
          return '/'
        }
        else if(self.$route.query.prev){
          return '/'
        }
        else {
          return '/profile'
        }

      }
    }

  }
</script>
