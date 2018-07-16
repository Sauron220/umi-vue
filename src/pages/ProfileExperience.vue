<template>
  <div id="PersonalCenter" class="profile-experience profile clearfix" v-TDK="TDK">
    <div class="container">
      <ol class="breadcrumb">
        <span>您現在的位置：</span>
        <li><router-link to="/accountOverview">我的賬戶</router-link></li>
        <li class="active">體驗金</li>
      </ol>
      <leftMenu></leftMenu>
      <div class="pull-left right_content">
        <ul class="top-title-line list-inline">
          <li>
            <span class="active">體驗金</span>
          </li>
        </ul>
        <div class="row earn">
          <div class="col-sm-4 all">
            <div class="text">總收益</div>
            <div class="value">
              <span class="text-danger">{{$fmoney(statisticsDet.stsIncome || 0)}}</span>元
            </div>
          </div>
          <div class="col-sm-4 to-be-receive">
            <div class="text">待領取</div>
            <div class="value">
              <span class="text-danger">{{$fmoney(statisticsDet.stsCollect || 0)}}</span>元
              <button v-if="!statisticsDet.stsCollect || statisticsDet.stsCollect==0" class="btn btn-sm btn-default disabled">領取</button>
              <button v-if="statisticsDet.stsCollect && statisticsDet.stsCollect!=0 && flag==1" class="btn btn-sm btn-warning" @click="withDraw();" disabled>領取</button>
              <button v-if="statisticsDet.stsCollect && statisticsDet.stsCollect!=0 && flag==0" class="btn btn-sm btn-warning" @click="withDraw();" >領取</button>
            </div>
          </div>
        </div>
        <div class="section-space"></div>
        <ul class="nav nav-tabs">
          <li role="presentation" :class="{'active': $route.fullPath.indexOf('coupon')>-1}">
            <router-link to="/ProfileExperience/coupon/0/1">體驗金券</router-link>
          </li>
          <li role="presentation" :class="{'active': $route.fullPath.indexOf('record')>-1}">
            <router-link to="/ProfileExperience/record/0/1">我的投資</router-link>
          </li>
        </ul>

        <div class="experience-coupon" v-if="$route.fullPath.indexOf('coupon')>-1">
          <div class="screen">
            <router-link to="/ProfileExperience/coupon/0/1">可用</router-link>
            <router-link to="/ProfileExperience/coupon/2/1">不可用</router-link>
          </div>
          <div class="section-space"></div>
          <div class="coupon-list info-list" v-if="couponList.length > 0">
            <div class="title">
              <div class="item num">序號</div>
              <div class="item money">金額</div>
              <div class="item period">有效期</div>
              <div class="item get-date">領取時間</div>
              <div class="item status">狀態</div>
              <div class="item handle">操作</div>
            </div>
            <div class="list-item" v-for="(item,index) in couponList">
              <div class="item num">{{index+1}}</div>
              <div class="item money">{{$fmoney(item.cpnInfo)}}</div>
              <div class="item period">{{item.beginTime}} — {{item.endTime}}</div>
              <div class="item get-date">{{item.beginTime}}</div>
              <div class="item status text-danger" v-if="item.status==0">未使用</div>
              <div class="item status" v-if="item.status==1">已使用</div>
              <div class="item status" v-if="item.status==2">已過期</div>
              <div class="item handle">
                <a :href="'/experience/'+cpnCoupon.prdCode+'?invest='+item.cpnInfo+'&cpnNum='+item.cpnNum" target="_blank"
                   class="btn btn-border-warning btn-sm"
                   :class="{'disabled':item.status!=0}">去投資</a>
              </div>
            </div>
          </div>
          <div class="no-coupon" v-if="couponList.length==0">
            <img src="../assets/images/no_data.png"  style="width: 70px;"> <span>暫無記錄！</span>
          </div>
          <div class="section-space"></div>
          <vPagination v-if="couponList.length>0 && couponListInfo.totalPage>1"
                       :totalPage="couponListInfo.totalPage"
                       :currentPage="$route.params.pageAt"
                       :withOutPageAtUrl="'/ProfileExperience/coupon/'+$route.params.couponStatus+'/'">
          </vPagination>
        </div>

        <div class="experience-record" v-if="$route.fullPath.indexOf('record')>-1">
          <div class="section-space"></div>
          <div class="record-list info-list" v-if="recordList.length > 0">
            <div class="title">
              <div class="item name ell">標的名稱</div>
              <div class="item money">投資金額</div>
              <div class="item percent">年化利率</div>
              <div class="item limit">標的期限</div>
              <div class="item earn">預期收益</div>
              <div class="item end-date">到期日</div>
              <div class="item invest-date">投標時間</div>
            </div>
            <div class="list-item" v-for="(item,index) in recordList">
              <div class="item name ell">{{item.prdName}}</div>
              <div class="item money">{{$fmoney(item.trdAmount)}}</div>
              <div class="item percent">{{$fmoney(item.rate*100||0)+'%'}}</div>
              <div class="item limit">{{item.prdPeriod+'天'}}</div>
              <div class="item earn">{{$fmoney(item.incomeAmount)}}</div>
              <div class="item end-date">{{item.dueDate}}</div>
              <div class="item invest-date">{{item.trdDate}}</div>
            </div>
          </div>
          <div class="no-coupon" v-if="recordList.length==0">
            <img src="../assets/images/no_data.png"  style="width: 70px;"> <span>暫無記錄！</span>
          </div>
          <div class="section-space"></div>
          <vPagination v-if="recordList.length>0 && recordListInfo.totalPage>1"
                       :totalPage="recordListInfo.totalPage"
                       :currentPage="$route.params.pageAt"
                       :withOutPageAtUrl="'/ProfileExperience/record/'+$route.params.couponStatus+'/'">
          </vPagination>
        </div>
        <div class="section-space"></div>
        <div class="tips">
          <p class="text-warning">體驗金使用規則：</p>
          <p>1.體驗金是聚寶盆贈送給用戶的壹種虛擬貨幣，不顯示在用戶的可用餘額中，不可提領，僅限投資體驗標使用，不可投資其他標的;</p>
          <p>2.投資體驗標產生的收益以獎勵的形式發放給用戶，該收益可直接提領;</p>
        </div>
      </div>
    </div>
    <vOpenFloat v-if="isOpen" :vOpenAccBl="vOpenAcc"></vOpenFloat>
  </div>
</template>
<script>
  import PersonalCenterMenu from '../components/PersonalCenterMenu'
  import vPagination from '../components/vPagination'
  import vOpenFloat from '../components/vOpenFloat.vue'

  export default {
    name: 'ProfileExperience',
    data () {
      return {
        statisticsDet: {},
        couponListInfo: {
          totalPage: 0
        },
        couponList: [],
        recordListInfo: {
          totalPage: 0
        },
        recordList: [],
        cpnCoupon: {},
        tabStatus:0,
        custInfo:0,
        isOpen:false,
        vOpenAcc:false,
        isActive:false,
        flag:0,
        TDK:{
          title:'體驗金券-聚寶盆',
        }
      }
    },
    components: {
      'leftMenu': PersonalCenterMenu,
      'vPagination': vPagination,
      'vOpenFloat': vOpenFloat,
    },
    created () {
      var self = this;
      self.$http.post('/pbap-web/action/statistics/query/cusStatisticsDet', {
        prdType: 70,
      }).then((res) => {
        self.statisticsDet = res.body.respInfo.statisticsDet || {};
      });
      this.getCoupon(this.$route.params.couponStatus, this.$route.params.pageAt);
      this.getRecord(this.$route.params.pageAt);
      this.getExperInfo();

      // 判斷用戶是否實名&儲值提領按鈕
      self.$http.post('/pbap-web/action/customer/query/custAuthInfo', {}).then((res) => {
        self.custInfo = res.body.respInfo.custInfo;
      });
    },
    beforeRouteUpdate (to, from, next){
      let params = to.params;
      this.couponListInfo.totalPage = 0;
      this.getCoupon(params.couponStatus, params.pageAt);
      this.getRecord(params.pageAt);
      next();
    },
    methods: {
      getCoupon(status, pageAt){
        var self = this;
        self.$http.post('/pbap-web/action/customer/query/myCoupon', {
          pageIndex: pageAt,
          pageSize: 10,
          status: status,
          cpnType: '03',
        }).then((res) => {
          self.couponListInfo = res.body.respInfo.couponInfo;
          self.couponList = self.couponListInfo.dataList;
        })
      },
      getRecord(pageAt){
        var self = this;
        self.$http.post('/pbap-web/action/investment/query/experInvestList', {
          pageIndex: pageAt,
          pageSize: 10,
        }).then((res) => {
          self.recordListInfo = res.body.respInfo.investmentList;
          self.recordList = self.recordListInfo.dataList;
        })
      },
      getExperInfo(){
        var self = this;
        self.$http.post('/pbap-web/action/product/query/lastNewcomerPrd',{prdType:70}).then((res) => {
          self.cpnCoupon = res.body.respInfo.product;
        })
      },
      withDraw(){
        var self = this;
        if(self.custInfo.tpStatus == 1){  // 是否開戶
          if(self.custInfo.activateStatus == 1){
            self.isActive = true;
            if(self.statisticsDet.stsCollect){  // 可提領
              self.flag = 1;
              self.$http.post('/pbap-web/action/trade/add/getExpInterests',{
                trdAmount:self.statisticsDet.stsCollect,
                bankChannel:0,
                remark:'',
              }).then((res) => {
                if(res.body.errorInfo.errorCode == '0000'){
                  self.$store.commit('setModal', {
                    type: 'alert',
                    msg: '領取成功，請關註您的賬戶餘額！',
                    confirmUrl:'/ProfileExperience/coupon/0/1'
                  });
                  self.$store.commit('showModal');
                }
                self.flag = 0;
              }).catch((err) => {
                self.$store.commit('setModal', {
                  show: false,
                  type: 'alert',
                  msg: '領取失敗請稍後重試',
                });
                self.$store.commit('showModal');
                self.flag = 0;
              });
            }
          }else{
            self.isOpen = true;
            self.vOpenAcc = false;
            self.isActive = false;
          }
        }else{
          self.isOpen = true;
          self.vOpenAcc = true;
          self.isActive = false;
        }
      },
    }
  }
</script>

