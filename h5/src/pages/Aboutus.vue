<template>
    <div class="wrap aboutUs-content">
        <PageNav></PageNav>
        <div class="mui-content">
          <img src="../assets/images/about_01.png" width="100%;">
           <!-- <div class="banner">
                <img src="../assets/images/aboutUs_banner.jpg" class="img-responsive">
            </div>-->
            <!--<div class="inner">
                <div class="line">
                    <h2>聚寶盆是什么平台</h2>
                    <img src="../assets/images/security_01.png" class="about-right-img">
                    <p class="about-info">“聚寶盆”平台是由上海尤鹿金融資訊服务有限公司倾力打造的互联网金融交易平台。其核心交易系统标准搭建参照银行，为立体账户系统，对客户而言意味着系统更安全稳定，体验更顺畅，每笔交易可追溯；对监管而言，真正做到资产存续和资金流向的清晰透明，从系统及业务上均拥抱监管要求。系统本身强调低耦合，高内聚；可拆分，易配置；可根据不同产品特性及托管要求快速迭代，为不同客户提供多维度的资产配置建议及資訊展示。</p>
                    <img src="../assets/images/aboutUs_img.jpg" class="about-left-img">
                    <p class="about-info">其上游风控系统基于多年银行，三方支付，供应链金融公司的业务流程量身打造，针对不同业务片段（基础交易，核心企业，物流控制等），沉淀出可操作，能量化，多场景的风控评价体系。适用的交易主体包括融资租赁，保理，以及其他供应链金融公司。目前合作的基础交易主要来自A股上市公司，国企以及其他大型制造企业。</p>
                </div>
                <div class="line">
                    <h2>我们的优势</h2>
                    <ul>
                        <li>严格风控，帐户安全
                            <ol>
                                <li>六层风控安全保障体系，确保平台安全；</li>
                                <li>身份证、银行卡、手机号三重认证，严防盗刷；</li>
                                <li>交易流程银行全程监管，平台不接触资金；</li>
                                <li>汇付天下为资金帐户安全全额承担；</li>
                            </ol>
                        </li>
                        <li>严格甄选，优质产品
                            <ol>
                                <li>甄选优质合作商户，深入合作，确保投资资金安全；</li>
                                <li>0手续费，1元起投，零门槛投资；</li>
                                <li>精选优质产品，30倍银行存款利率；</li>
                            </ol>
                        </li>
                        <li>优质服务，便捷流程
                            <ol>
                                <li>投资步骤精简，1分钟轻松搞定；</li>
                                <li>APP、WEB端随时查询、购买。操作随心；</li>
                                <li>强大客服团队，问题解决无忧；</li>
                            </ol>
                        </li>
                    </ul>
                </div>

                <div class="line">
                    <h2>我们的愿景</h2>
                    <p class="about-info" style="text-indent:0">用科技为用户创造收益，让钱更有价值</p>
                </div>

                <div class="line" style="border:none;">
                    <h2>平台背景</h2>
                    <p class="about-info" style="margin-bottom:0">上海尤鹿金融資訊服务有限公司定位为金融产品综合交易平台，以大数据为核心的征信平台，围绕Fintech应用场景产生的相关应用服务等。公司旨在以创新科技铺就地基，以优质资产作为支柱，以資訊透明成就信心，为投资人打造安全，便捷的投资服务平台。</p>
                    &lt;!&ndash;<img src="/img/h5/about_us_img1.jpg" style="width:100%">&ndash;&gt;
                    <img src="../assets/images/comp_zkp.jpg" class="about-center-img" style="width:2rem">
                    <p class="about-info">中科光电是一家专业从事电子資訊产业光通信产品制造和网络系统集成业务，集技术研发、高端产品制造、销售和服务为一体的高科技民营企业，也是全球领先的光通信连接器产品制造商。产品广泛应用于航空、航天、传媒、电力、通信、交通、机电、医疗、教育等领域。8月29日上午澳大利亚时间10：30分，中科光电子集团股票（代码：ZKP）在澳大利亚国家证券交易所（NSX）成功上市。</p>
                </div>

            </div>-->
        </div>
    </div>
</template>
<script>
  import PageNav from '@/components/PageNav'
  export default {
    name: 'Aboutus',
    data() {
      return {
        pageTitle: '關於我們',
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
