<template>
    <div class="wrap infoDisclosure-content">
        <div class="inner">
            <div class="inner-pos">
                <ul class="id-nav">
                    <li :class="{'id-nav-high': disclosure==1}" @click="navTab(1)">股东資訊</li>
                    <li :class="{'id-nav-high': disclosure==2}" @click="navTab(2)">证照披露</li>
                    <li :class="{'id-nav-high': disclosure==3}" @click="navTab(3)">合作机构</li>
                </ul>
            </div>

            <div class="id-content id-content-small" v-show="disclosure==1">
                <div class="clearfix">
                    <img src="../assets/images/comp_zkp.jpg">
                    <p>中科光电是一家专业从事电子資訊产业光通信产品制造和网络系统集成业务，集技术研发、高端产品制造、销售和服务为一体的高科技民营企业，也是全球领先的光通信连接器产品制造商。产品广泛应用于航空、航天、传媒、电力、通信、交通、机电、医疗、教育等领域。8月29日上午澳大利亚时间10：30分，中科光电子集团股票（代码：ZKP）在澳大利亚国家证券交易所（NSX）成功上市。</p>
                </div>
            </div>

            <div class="id-content id-content-big gallery"  v-show="disclosure==2">
                <img src="../assets/images/id_box2.jpg" id="go-big" @click="isBig=true">
            </div>

            <div class="id-content id-content-small"  v-show="disclosure==3">
                <div class="clearfix">
                    <img src="../assets/images/id_box4_01.png">
                    <p>上海银行股份有限公司（以下简称“上海银行”）成立于1995年12月29日，总行位于上海，是上海证券交易所主板上市公司，股票代码601229。</p>
                    <p>上海银行以“精品银行”为战略愿景，以“精诚至上，信义立行”为核心价值观，近年来通过推进专业化经营和精细化管理，着力在中小企业、财富管理和养老金融、金融市场、跨境金融、在线金融等领域培育和塑造经营特色，不断增强可持续发展能力。</p>
                    <p>上海银行目前在上海、北京、深圳、天津、成都、宁波、南京、杭州、苏州、无锡、绍兴、南通、常州、盐城等城市设立分支机构，形成长三角、环渤海、珠三角和中西部重点城市的布局框架；发起设立四家村镇银行、上银基金管理有限公司，设立上海银行（香港）有限公司，获准筹建消费金融公司，并与全球120多个国家和地区近1500多家境内外银行及其分支机构建立了代理行关系。</p>
                    <p>成立以来上海银行市场影响力不断提升,截至2016年末，总资产17553亿元，同比增长21%；实现净利润143亿元，同比增长10%。在英国《银行家》2017年公布的“全球前1000家银行”排名中，按一级资本和总资产计算，上海银行分别位列全球银行业第85位和89位；多次被《亚洲银行家》杂志评为“中国最佳城市零售银行”。</p>
                </div>
            </div>
        </div>
        <div class="mask0" v-if="isBig"></div>
        <img src="../assets/images/id_box2.jpg" id="theBig" v-if="isBig" @click="isBig=false">

    </div>
</template>
<script>
  export default {
    name: 'InfoDisclosure',
    data() {
      return {
        pageTitle: '資訊披露',
        disclosure: 1,
        isBig: false,
      }
    },
    created(){
      var self = this;
      self.$store.commit('setPageTitle', self.pageTitle);
    },
    methods: {
      navTab(tab) {
        var self = this;
        self.disclosure = tab;
      },
    }
  }
</script>
