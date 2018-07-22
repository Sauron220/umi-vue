<template>
  <div class="riskAssessment">
    <div class="risk-container">
      <div class="risk-head">
        <span>風險評測</span>
        <span class="risk-head-skip" @click="skipRisk">跳過測評，默認保守型</span>
      </div>
      <div class="risk-question">
        <div class="risk-queston-tip">
          <p><img src="static/img/gonggao.png" alt="">本問卷調查表旨在協助投資人瞭解自身的投資狀況，主要包括投資偏好、風險承受能力及風險認知能力等方面，可以向投資人提供一些衡量自身風險屬性的指標。</p>
        </div>
        <ul class="risk-radio-question" v-for="(val, index) in questions" :key="index">
          <li>{{val.question}}</li>
          <li v-for="(v, i) in val.answer" :key="i">
            <i class="select-img" :class="{ 'select-active-img':val.model == v.key }"></i>
            <input type="radio" :value="v.key" v-model="val.model">
            <span class="desc-answer" style="margin-left: 35px;">{{v.value}}</span>
          </li>
        </ul>
      </div>
      <div class="submit-btn">提&nbsp;&nbsp;&nbsp;交</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "risk-assessment",
    data() {
      return {
        questions:[
          {
            question:'1.您目前的年齡？',
            model:'pick',
            answer:[
              {key: 1, value: '小於25歲'},
              {key: 2, value: '25-40歲之間'},
              {key: 3, value: '41-60歲之間'},
              {key: 4, value: '大於60歲'},
            ]
          },
          {
            question:'2.您當前的資產主要構成情況？',
            model:'pick1',
            answer:[
              {key: 1, value: '只有銀行存款（活期或者定期）；'},
              {key: 2, value: '主要是銀行存款，還有少量國債和基金、藍籌股'},
              {key: 3, value: '既有股票、基金、股票、理財產品，也有銀行存款，前後兩者各半'},
              {key: 4, value: '以期貨等金融衍生產品和股票投資為主'},
            ]
          },
          {
            question:'3.您當前用家庭資產多少比例進行投資？',
            model:'pick2',
            answer:[
              {key: 1, value: '10%之內的資產;'},
              {key: 2, value: '10-20%之間'},
              {key: 3, value: '25-50%之間 '},
              {key: 4, value: '超過50%'},
            ]
          },
        ]
      }
    },
    created() {

    },
    methods:{
      skipRisk() {
        this.$router.go(-1);
      }
    }
  }
</script>
