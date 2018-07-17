<template>
    <div class="wrap parentChildMission-content" :class="{'boy_set':childInfo.chlSex}">
        <div class="mask"></div>
        <div class="wrap baby_set" id="infoForm">
            <header>
                <div class="nav-box mui-bar baby_top_title bb_bg" style="color:#fff">
                    <a href="/parent-child" class="go-back mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
                    <h1 class="mui-title" id="headName">成长任务</h1>
                </div>
            </header>

            <section class="mission_box" style="margin-top: 56px;">
                <h1>等级任务</h1>
                <p>通过投资亲子计划资产获得经验值，达到等级即可领取对应等级宝箱奖励等级任务</p>
                <a class="go_btn" id="leveling" href="/parent-child">去升级</a>
            </section>

            <section class="mission_box">
                <h1>设置资料</h1>
                <p>首次完成头像以及基本资料设置，即可获得加息券一张，加息额度1%</p>
                <a class="go_btn" v-if="setInfo.isSetComplete == 0" href="/parentChildSet">前往</a>
                <span class="go_btn" v-if="setInfo.isSetComplete == 1 && setInfo.isReceiveCoupon == 0" @click="coupon">领取</span>
                <span class="go_btn" v-if="setInfo.isSetComplete == 1 && setInfo.isReceiveCoupon == 1">已领取</span>
                <span class="setStatus" v-if="setInfo.isSetComplete == 0">[未完成]</span>
                <span class="setStatus" v-if="setInfo.isSetComplete == 1">[已完成]</span>
            </section>

            <footer class="bottom_info fixed-bottom">
                <h2>任务及奖励说明：</h2>
                <p>1、亲子计划资产投资成功可获得一定经验值，达到特定经验值可提升亲子计划账户等级；<br>
                    2、亲子计划账户等级每提升一级，可获得对应的奖励（虚拟或实物以页面为准）；<br>
                    3、任务完成后所有奖励均需用户手动领取，实物奖励需经客服核实后发放，请确保您的收货地址准确无误；<br>
                    4、投资经验值=投资金额/10；</p>
            </footer>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'ParentChildMission',
    data() {
      return {
        setInfo:{},
      }
    },
    created() {
      let self = this;
      self.$http.post('/pbap-web/action/child/childSetComplete',{}).then((res) => {
        self.setInfo = res.body.respInfo;
      });
    },
    computed: {
      childInfo() {
        return this.$store.state.childInfo;
      },
    },
    methods:{
      coupon() {
        var self = this;
        self.$http.post('/pbap-web/action/child/childReward',{"type": 2}).then((res) => {
          if(res.body.errorInfo.errorCode == '0000'){
            self.$store.commit('setModal', {
              show: false,
              type: 'alert',
              msg: '领取成功！',
              confirmUrl:'/parentChildMission'
            });
            self.$store.commit('showModal');
          }
        });
      },
    },
  }
</script>
