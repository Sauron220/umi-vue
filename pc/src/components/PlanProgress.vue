<template>
  <div class="PlanProgress">
    <ul class="plan-list-warp">
      <li class="plan-list-item">
        <div class="tit">名稱</div>
        <div class="tit-con">{{productDetail.prdName}}</div>
      </li>
      <li class="plan-list-item odd">
        <div class="tit">計劃介紹</div>
        <div class="tit-con" v-html="productDetail.introduction"></div>
      </li>
      <li class="plan-list-item odd">
        <div class="tit">投標範圍</div>
        <div class="tit-con">{{productDetail.prdArea}}</div>
      </li>
      <li class="plan-list-item odd">
        <div class="tit">利息處理方式及 期待年回報率</div>
        <div class="tit-con">
          <ul>
            <li>1.循環出借10.00 % </li>
            <li>2.提取至帳戶10.00 % </li>
            <li>* 一經選擇，無法修改</li>
          </ul>
        </div>
      </li>
      <li class="plan-list-item odd">
        <div class="tit">鎖定期</div>
        <div class="tit-con">{{productDetail.prdPeriod}} 天</div>
      </li>
      <li class="plan-list-item odd">
        <div class="tit">退出日期</div>
        <div class="tit-con">{{moment(productDetail.dueDate).format('YYYY年MM月DD日')}}</div>
      </li>
      <li class="plan-list-item odd">
        <div class="tit">加入條件</div>
        <div class="tit-con">加入金額{{$fmoney(productDetail.minInvAmt)}}元起，且為{{$fmoney(productDetail.minInvAmt)}}元的整數倍遞增。</div>
      </li>
      <li class="plan-list-item odd">
        <div class="tit">加入上限</div>
        <div class="tit-con">{{productDetail.maxInvAmt ? $fmoney(productDetail.maxInvAmt) + '元': '無上限'}}</div>
      </li>
      <li class="plan-list-item odd">
        <div class="tit">開始加入時間</div>
        <div class="tit-con">{{moment(productDetail.colBeginDate).format('YYYY年MM月DD日') || moment(productDetail.colEndTime).format('YYYY年MM月DD日')}}</div>
      </li>
      <li class="plan-list-item odd">
        <div class="tit">到期退出方式</div>
        <div class="tit-con">系統將通過債權轉讓自動完成退出，您所持債權轉讓完成的具體時間，視債權轉讓市場交易情況而定。</div>
      </li>
      <li class="plan-list-item odd">
        <div class="tit">提前退出方式</div>
        <div class="tit-con">鎖定期內支持提前退出，詳情參見 <a href="javascript:;" @click="goAgreement" style="color:rgb(60, 100, 160)">服務協議</a></div>
      </li>
      <li class="plan-list-item odd">
        <div class="tit">費用</div>
        <div class="tit-con">
          <ul>
            <li>加入費用：<span class="tit-con-rate">0.0% </span></li>
            <li>管理費用：參見<a href="javascript:;" @click="goAgreement" style="color:rgb(60, 100, 160)">服務協議</a> </li>
            <li>退出費用：<span class="tit-con-rate">0.0%</span></li>
            <li>提前退出費用：加入金額x <span class="tit-con-rate">2.0 %</span>，詳情參見<a href="javascript:;" @click="goAgreement" style="color:rgb(60, 100, 160)">服務協議</a></li>
          </ul>
        </div>
      </li>
      <li class="plan-list-item odd">
        <div class="tit">提前退出方式</div>
        <div class="tit-con" style="color: #3c64a0;cursor: pointer;" @click="goAgreement">【點擊查看】</div>
      </li>
    </ul>
  </div>
</template>

<script>
  import Tool from '../util/ProductTool.js'
  import moment from 'moment'
  export default {
    name: "PlanProgress",
    data () {
      return {
        productDetail:{},
      }
    },
    created() {
      const _proCode = sessionStorage.getItem('proCode');
      const self = this;
      self.getProductDetail(_proCode, function () {
        self.setPlaceholder();
        if (self.productDetail.remainAmount >= self.productDetail.minInvAmt) {
          self.invest = self.productDetail.minInvAmt;
        } else {
          self.invest = self.productDetail.remainAmount;
        }
        self.getWelfareReminder(self.productDetail.prdType);
        self.TDK.title = self.productDetail.prdName + '-' + self.TDK.title;
      })
    },
    methods: {
      moment,
      getProductDetail: Tool.getProductDetail,
      goAgreement() {
        window.open('/static/聚寶盆 P2P 平台服務條款.pdf',
          '_blank','height=768, width=1100,toolbar=no,scrollbars=yes,menubar=no,status=no')
      },
    }
  }
</script>
