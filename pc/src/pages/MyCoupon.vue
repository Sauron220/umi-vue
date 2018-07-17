<template>
  <div id="PersonalCenter" class="myCoupon-content profile clearfix" v-TDK="TDK">
    <div class="container">
      <ol class="breadcrumb">
        <span>您現在的位置：</span>
        <li><router-link to="/accountOverview">我的賬戶</router-link></li>
        <li class="active">我的優惠券</li>
      </ol>
      <leftMenu></leftMenu>
      <div class="pull-left right_content">
        <ul class="top-title-line list-inline">
          <li>
            <router-link :to="{ name: 'MyCoupon', params: { couponStatus: 0,pageAt:1 }}"
                         :class="{'active':$route.params.couponStatus==0}">未使用優惠券</router-link>
          </li>
          <li>
            <router-link :to="{ name: 'MyCoupon', params: { couponStatus: 1,pageAt:1 }}"
                         :class="{'active':$route.params.couponStatus==1}">已使用優惠券</router-link>
          </li>
          <li>
            <router-link :to="{ name: 'MyCoupon', params: { couponStatus: 2,pageAt:1 }}"
                         :class="{'active':$route.params.couponStatus==2}">已失效優惠券</router-link>
          </li>
        </ul>

        <div class="coupon-explain">
          <a href="/helpCenter#8" target="_blank">優惠券使用說明</a>
        </div>

        <div class="clearfix" id="coupon0" v-if="couponList.length>0">
          <div class="coupon-cont" :class="{
                    'coupon-bg-gray':item.status !=0,
                    'three-eight':inTheArray(item.beginTime)
                }"
               v-for="item in couponList">
            <p class="coupon-tit">{{item.cpnType*1 == 3?'體驗金':'加息券'}}</p>
            <p class="coupon-cpnInfo" v-if="item.cpnType*1 !== 3">{{$formatNum(item.cpnInfo, 100)}}<span>%</span></p>
            <p class="coupon-cpnInfo" v-if="item.cpnType*1 == 3">{{$fmoneyFormat(item.cpnInfo)}}<span>元</span></p>
            <p class="coupon-time">{{item.beginTime}}-{{item.endTime}}</p>
            <p class="coupon-cpnApply">
              <span>適用產品：</span><span>{{item.cpnProName}}</span>
            </p>
            <p class="coupon-cpnProps" v-if="item.cpnType*1 !== 3">
              <span>最低投資金額：</span><span>{{$fmoneyFormat(item.cpnProps)}}</span>元
            </p>
            <p class="coupon-cpnProps" v-if="item.cpnType*1 == 3">
              <a :href="'/experience/'+cpnCoupon.prdCode+'?invest='+item.cpnInfo+'&cpnNum='+item.cpnNum" target="_blank">立即使用》</a>
            </p>
            <p class="coupon-from">
              <span>來源：</span><span>{{item.cpnOrigin}}</span>
            </p>
            <img class="gray-img" v-if="item.status == 1" src="../assets/images/coupon_ed.png">
            <img class="gray-img" v-if="item.status == 2" src="../assets/images/coupon_dis.png">
          </div>
        </div>
        <div id="noData" v-if="couponList.length==0">
          <img src="../assets/images/no_data.png"  style="width: 70px;"> <span>暫時沒有優惠券呢！</span>
        </div>
        <vPagination v-if="couponList.length>0 && couponListInfo.totalPage>1"
                     :totalPage="couponListInfo.totalPage"
                     :currentPage="$route.params.pageAt"
                     :withOutPageAtUrl="'/myCoupon/'+$route.params.couponStatus+'/'">
        </vPagination>
      </div>
    </div>
  </div>
</template>
<script>
  import PersonalCenterMenu from '../components/PersonalCenterMenu'
  import vPagination from '../components/vPagination'

  export default {
    name: 'MyCoupon',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App',
        couponListInfo: {
          totalPage: 0
        },
        couponList: [],
        cpnCoupon: {},
        TDK:{
          title:'我的加息券-聚寶盆',
          keyWords:'網絡理財，互聯網理財，理財，投資，投資理財，個人投資，網貸平臺，網貸投資，網貸，互金，互聯網金融，互金平臺，互聯網金融平臺，聚寶盆，聚寶計劃，分期投，月月盈，年年余，財富，P2P',
          description:'聚寶盆是壹家綜合性互聯網金融平臺，聚寶盆為廣大個人投資理財的用戶提供多元化的選擇與優質的服務。投資理財用戶可通過加入聚寶計劃、分期投、月月盈、年年余等產品進行投資獲得穩定收益。',
        }
      }
    },
    components: {
      'leftMenu': PersonalCenterMenu,
      'vPagination': vPagination,
    },
    created () {
      this.getCoupon(this.$route.params.couponStatus, this.$route.params.pageAt);
      this.getExperInfo();
    },
    beforeRouteUpdate (to, from, next){
      let params = to.params;
      this.couponListInfo.totalPage = 0;
      this.getCoupon(params.couponStatus, params.pageAt);
      next();
    },
    methods: {
      getCoupon(status, pageAt){
        var self = this;
        self.$http.post('/pbap-web/action/customer/query/myCoupon', {
          pageIndex: pageAt,
          pageSize: 9,
          status: status
        }).then((res) => {
          self.couponListInfo = res.body.respInfo.couponInfo;
          self.couponList = self.couponListInfo.dataList;
        })
      },
      getExperInfo(){
        var self = this;
        self.$http.post('/pbap-web/action/product/query/lastNewcomerPrd',{prdType:70}).then((res) => {
          self.cpnCoupon = res.body.respInfo.product;
        })
      },
      inTheArray(value) {
        var arr = ['2017.03.06', '2017.03.07', '2017.03.08', '2017.03.09', '2017.03.10', '2017.03.11', '2017.03.12'];
        if (arr.indexOf(value) >= 0) {
          return true
        } else {
          return false
        }
      }
    }
  }
</script>

