<template>
  <div class="riskAssessment">
    <div class="risk-container">
      <div class="risk-head">
        <span>風險評測</span>
        <span class="risk-head-skip" @click="skipRisk">跳過測評，默認保守型</span>
      </div>
      <div class="risk-question">
        <div class="risk-queston-tip">
          <p><img src="static/img/tips.png" alt="">本問卷調查表旨在協助投資人瞭解自身的投資狀況，主要包括投資偏好、風險承受能力及風險認知能力等方面，可以向投資人提供一些衡量自身風險屬性的指標。</p>
        </div>
        <ul class="risk-radio-question" v-for="(val, index) in questions" :key="index">
          <li class="risk-question-h">{{val.question}}</li>
          <li class="risk-question-s" v-for="(v, i) in val.answer" :key="i">
            <i class="select-img" :class="{ 'select-active-img':val.model == v.key }"></i>
            <input type="radio" :value="v.key" v-model="val.model">
            <span class="desc-answer" style="margin-left: 35px;">{{v.value}}</span>
          </li>
        </ul>
      </div>
      <div class="submit-btn" @click="changeRisk">提&nbsp;&nbsp;&nbsp;交</div>
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
              {key: 2, value: '主要是銀行存款，還有少量國債和基金、藍籌股；'},
              {key: 3, value: '既有股票、基金、股票、理財產品，也有銀行存款，前後兩者各半；'},
              {key: 4, value: '以期貨等金融衍生產品和股票投資為主。'},
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
          {
            question:'4.如果有個為期1年投資項目可參與，投資成功的概率是50%，一旦成功可獲得4倍收益，一旦失敗則本錢全部損失，對這樣的投資您願意投入的資金    量是多少？ ',
            model:'pick3',
            answer:[
              {key: 1, value: '一分也不投入 '},
              {key: 2, value: '1個月的收入； '},
              {key: 3, value: '3個月的收入；  '},
              {key: 4, value: '6個月或超過6個月的收入'},
            ]
          },
          {
            question:'5.往往高收益的基金或理財產品伴隨著高風險，您準備承擔多大的風險？ ',
            model:'pick4',
            answer:[
              {key: 1, value: '不願意讓我的錢有任何損失；  '},
              {key: 2, value: '因為基金有潛在的增值功能，我願意承擔一定的風險； '},
              {key: 3, value: '很願意通過長期投資使資產增值保值，也願意在此過程中承擔風險；  '},
              {key: 4, value: '我願意投資最具增長潛力的產品，也願意為了更高的收益承受大幅度的風險變動。\n'},
            ]
          },
          {
            question:'6.請問您投資價格波動性的產品有多少年的經驗？（具有價格波動的產品包括股票、基金、外匯、期權期貨等金融產品） ',
            model:'pick5',
            answer:[
              {key: 1, value: '7-10年 '},
              {key: 2, value: '4-7年 '},
              {key: 3, value: '1-3年 '},
              {key: 4, value: '從來沒有或剛剛開始'},
            ]
          },
          {
            question:'7.通常情況下您一筆投資預備持有的期限是多久',
            model:'pick6',
            answer:[
              {key: 1, value: '長期⸺超過7年;'},
              {key: 2, value: '中期⸺4年到7年 '},
              {key: 3, value: '中短期⸺1年到3年  '},
              {key: 4, value: '短期⸺半年內'},
            ]
          },
          {
            question:'8.一年中您能最能接受的資產波動範圍是？',
            model:'pick7',
            answer:[
              {key: 1, value: '最多盈利10%，最大虧損5%； '},
              {key: 2, value: '最多盈利20，最大虧損15%  '},
              {key: 3, value: '最多盈利40%，最大虧損30%  '},
              {key: 4, value: '最多盈利60%，最大虧損50%'},
            ]
          },
          {
            question:'9.您此次投資的目的是？',
            model:'pick8',
            answer:[
              {key: 1, value: '就希望能每年分紅或者獲得固定的收益;'},
              {key: 2, value: '希望能獲得分紅並實現資產的部分升值; '},
              {key: 3, value: '兩者各半;'},
              {key: 4, value: '為了資產大幅升值。'},
            ]
          },
          {
            question:'10.如果您剛剛投資就遇到市場調整，您能承受的損失大概是多少？ ',
            model:'pick9',
            answer:[
              {key: 1, value: '5%以內 '},
              {key: 2, value: '6-20% '},
              {key: 3, value: '21-40% '},
              {key: 4, value: '超過40%'},
            ]
          },
        ],
        myCode:'',
        flag: false,
    }
    },
    created() {
      const self = this;
      this.$http.post('/pbap-web/action/customer/query/custAuthInfo', {}).then((res) => {
        self.myCode = res.body.respInfo.custInfo.cusCode;
      });
    },
    methods:{
      skipRisk() {
        this.$router.go(-1);
      },
      changeRisk() {
        const self = this;
        let isStringArr = [];
        isStringArr = this.questions.filter((val, index, arr) => {
          if (self.checkType(val.model) != 'number') {
            return val;
          }
        });
        if (!isStringArr.length) {
          console.log(self.myCode)
          self.$http.post('/pbap-web/action/customer/upt/riskTest', {
            cusCode: self.myCode
          }).then((val) => {
            self.$store.commit('setModal', {
              type: 'alert',
              msg: '已完成评测！',
              confirmText: '我知道了'
            });
            self.$store.commit('showModal');
            self.$router.go(-1);
          })
        } else {
          self.$store.commit('setModal', {
            type: 'alert',
            msg: '请完成所有选项！',
            confirmText: '我知道了'
          });
          self.$store.commit('showModal');
        }
      },
      checkType(val) {
        return Object.prototype.toString.call(val).toLowerCase().match(/\s\w+/)[0].trim();
      }
    }
  }
</script>
