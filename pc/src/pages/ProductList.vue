<template>
  <div class="product-list" v-TDK="TDK">
    <div class="container">
      <ol class="breadcrumb">
        <span>您現在的位置：</span>
        <li>
          <router-link to="/">首頁</router-link>
        </li>
        <li class="active">定期理財</li>
      </ol>
      <!--<div>產品id：{{$route.params.id}}</div>-->
      <!--<div class="product-banner text-center">
        <img src="../assets/images/product_all.jpg" class="img-responsive">
      </div>-->
      <div class="select-box">
        <div class="item" id="type">
          <div class="title">產品類型:</div>
          <router-link
            :class="{'active':$route.params.prdType == 0}"
            :to="{ name: 'ProductList', params: { prdType: 0,prdStatus:$route.params.prdStatus,pageAt:1 }}">
            全部
          </router-link>
          <router-link
            :class="{'active':$route.params.prdType == 30}"
            :to="{ name: 'ProductList', params: { prdType: 30,prdStatus:$route.params.prdStatus,pageAt:1 }}">
            壹桶金
          </router-link>
          <router-link
            :class="{'active':$route.params.prdType == 7}"
            :to="{ name: 'ProductList', params: { prdType: 7,prdStatus:$route.params.prdStatus,pageAt:1 }}">
            聚寶計劃
          </router-link>
          <router-link
            :class="{'active':$route.params.prdType == 8}"
            :to="{ name: 'ProductList', params: { prdType: 8,prdStatus:$route.params.prdStatus,pageAt:1 }}">
            分期投
          </router-link>
          <router-link
            :class="{'active':$route.params.prdType == 9}"
            :to="{ name: 'ProductList', params: { prdType: 9,prdStatus:$route.params.prdStatus,pageAt:1 }}">
            月月盈
          </router-link>
          <router-link
            :class="{'active':$route.params.prdType == 10}"
            :to="{ name: 'ProductList', params: { prdType: 10,prdStatus:$route.params.prdStatus,pageAt:1 }}">
            散標
          </router-link>
          <!--<router-link
                  :class="{'active':$route.params.prdType == 10}"
                  :to="{ name: 'ProductList', params: { prdType: 10,prdStatus:$route.params.prdStatus,pageAt:1 }}">
              年年余
          </router-link>-->
          <!-- <router-link
                   :class="{'active':$route.params.prdType == 40}"
                   :to="{ name: 'ProductList', params: { prdType: 40,prdStatus:$route.params.prdStatus,pageAt:1 }}">
               尊享計劃
           </router-link>-->
        </div>
        <div class="item" id="status">
          <div class="title">狀態:</div>
          <router-link
            :class="{'active':$route.params.prdStatus == 0}"
            :to="{ name: 'ProductList', params: { prdType: $route.params.prdType,prdStatus:0,pageAt:1 }}">全部
          </router-link>
          <router-link
            :class="{'active':$route.params.prdStatus == 11}"
            :to="{ name: 'ProductList', params: { prdType: $route.params.prdType,prdStatus:11,pageAt:1 }}">
            進行中
          </router-link>
          <router-link
            :class="{'active':$route.params.prdStatus == 20}"
            :to="{ name: 'ProductList', params: { prdType: $route.params.prdType,prdStatus:20,pageAt:1 }}">
            還款中
          </router-link>
          <router-link
            :class="{'active':$route.params.prdStatus == 30}"
            :to="{ name: 'ProductList', params: { prdType: $route.params.prdType,prdStatus:30,pageAt:1 }}">
            已還款
          </router-link>
        </div>
      </div>

      <div class="table" v-if="productList.length > 0">
        <table class="t-caption">
          <thead>
          <tr>
            <th class="rate regular-rate">年利率</th>
            <th class="name">借款標題</th>
            <th class="time">期限</th>
            <th class="money">金額</th>
            <th class="progress">進度</th>
            <th class="action"><img src="/static/img/reset-list.png" style="margin-right:10px;">重置</th>
          </tr>
          </thead>
          <tbody class="data-list">
          <tr class="history-list-data" v-for="item in productList">
            <td class="rate"> {{productRate(item.defaultRate, item.rewardRate)}}</td>
            <td class="name">{{item.prdName}}</td>
            <td class="time">{{item.prdPeriod}}天</td>
            <td class="money"><span>{{$fmoneyFormat(item.prdAmount)}}</span>元</td>
            <td class="progress" data-percent="100">
              <div class="percentage-text">{{item.colPercent}}%</div>
              <div class="outer"><span class="inner" :style="{'width':item.colPercent+'%'}"></span></div>
            </td>
            <td class="action">
              <!--:href="productUrl(item.prdType) + item.prdCode"-->
              <a href="javascript:;" target="_blank"
                 class="btn" @click="toDetail(item.prdType, item.prdCode)"
                 :class="{'btn-gray':!productActive(item.status),
                                        'btn-warning':productActive(item.status),
                                        'gray':item.status=='12'}">
                {{buttonText(item.status)}}
              </a>
              <!--<a class="disabled" href="https://www.renrendai.com/loan-2588596.html" target="_blank" onclick="return false">已满标</a>-->

            </td>
          </tr>
          <!--<tr class="history-list-data">-->
          <!--<td class="rate">9.60<span>%</span></td>-->
          <!--<td class="name">资金周转</td>-->
          <!--<td class="time">36个月</td>-->
          <!--<td class="money"><span>45,600.00</span>元</td>-->
          <!--<td class="progress" data-percent="100">-->
          <!--<div class="percentage-text">100%</div>-->
          <!--<div class="outer"><span class="inner" style="width: 120px;"></span></div>-->
          <!--</td>-->
          <!--<td class="action">-->

          <!--<a class="disabled" href="https://www.renrendai.com/loan-2588594.html" target="_blank" onclick="return false">已满标</a>-->

          <!--</td>-->
          <!--</tr>-->
          </tbody>
        </table>
        <vPagination v-if="productList.length>0 && productListInfo.totalPage>1"
                     :totalPage="productListInfo.totalPage"
                     :currentPage="$route.params.pageAt"
                     :withOutPageAtUrl="'/product-list/'+$route.params.prdType+'/'+$route.params.prdStatus+'/'">
        </vPagination>
      </div>
      <div v-if="!productList.length" style="margin:50px;text-align: center;">
        <img src="../assets/images/no_data.png">
      </div>
      <!-- <div class="product-result">
          <ul class="list-unstyled" id="productList">
            <li class="product-bar" v-for="item in productList">
              <h4 class="title"><a :href="productUrl(item.prdType) + item.prdCode" target="_blank">{{item.prdName}}</a>
              </h4>
              <div class="modular ell t1">
                <div class="text-info">預期年化收益</div>
                <p>
                                  <span class="font-red">
                                      {{productRate(item.defaultRate, item.rewardRate)}}
                                  </span>
                </p>
              </div>
              <div class="modular ell t2">
                <div class="text-info">借款期限</div>
                <p><span>{{item.prdPeriod}}</span>天</p>
              </div>
              <div class="modular ell t3">
                <div class="text-info">起投金額</div>
                <p><span>{{$fmoneyFormat(item.minInvAmt || 0)}}</span>元</p>
              </div>
              <div class="modular ell t4 clearfix">
                <div class="text-info">產品金額</div>
                <p><span>{{$fmoneyFormat(item.prdAmount)}}</span>元</p>
              </div>
              <div class="modular ell t5">
                <div class="progress pro_out" v-if="productActive(item.status)">
                  <div class="progress-bar pro_inner" :style="{'width':item.colPercent+'%'}"></div>
                  <i>{{item.colPercent}}%</i>
                </div>
                <a :href="productUrl(item.prdType) + item.prdCode" target="_blank"
                   class="btn  btn-block"
                   :class="{'btn-gray':!productActive(item.status),
                                          'btn-warning':productActive(item.status),
                                          'gray':item.status=='12'}">
                  {{buttonText(item.status)}}
                </a>
              </div>
            </li>
          </ul>
          <vPagination v-if="productList.length>0 && productListInfo.totalPage>1"
                       :totalPage="productListInfo.totalPage"
                       :currentPage="$route.params.pageAt"
                       :withOutPageAtUrl="'/product-list/'+$route.params.prdType+'/'+$route.params.prdStatus+'/'">
          </vPagination>
          <br>
          <br>
          <br>
        </div>-->
    </div>
  </div>
</template>

<script>
  import vPagination from '../components/vPagination'
  import Tool from '../util/ProductTool.js'

  export default {
    name: 'ProductList',
    data() {
      return {
        msg: 'Welcome to Your Vue.js App',
        productListRequest: null,
        productListInfo: {
          totalPage: 0
        },
        productList: [],
        TDK: {
          title: '個人理財_網上理財_理財產品',
          keyWords: 'p2p理財平臺,理財產品排行,個人投資理財,聚寶計劃,分期投,月月盈',
          description: '聚寶盆理財平臺，靈活理財，14天-365天理財產品任選，現旗下有壹桶金、聚寶計劃、分期投、月月盈、尊享計劃等方式進行投資獲得穩定收益，新手註冊，即領998元紅包！',
        }
      }
    },
    created() {
      let params = this.$route.params
      this.getProductList(params.prdType, params.prdStatus, params.pageAt);
    },
    components: {
      vPagination: vPagination
    },
    beforeRouteUpdate(to, from, next) {
      let params = to.params;
      this.productListInfo.totalPage = 0;
      this.getProductList(params.prdType, params.prdStatus, params.pageAt, function () {
        next();
      });
    },
    methods: {
      productRate: Tool.productRate,
      getProductList(prdType, prdStatus, pageAt, callback) {
        if (prdType == 0) {
          prdType = ''
        }
        if (prdStatus == 0) {
          prdStatus = ''
        }
        var self = this;
        self.$http.post('/pbap-web/action/product/query/prdList', {
          pageSize: 10,
          prdType: prdType != '10' ? prdType : null,
          status: prdStatus,
          pageIndex: pageAt,
          prdNature: prdType == '10' ? 1 : null,
        }, {
          before(request) {
            if (self.productListRequest) {
              self.productListRequest.abort();
            }
            self.productListRequest = request;
          }
        })
          .then((res) => {
            self.productListInfo = res.body.respInfo.prdList
            self.productList = res.body.respInfo.prdList.dataList
            callback && callback();
          })
      },
      productActive(status) {
        if (status == '14' || status == '16' || status == '20' || status == '30') {
          return false
        } else {
          return true
        }
      },
      buttonText(status) {
        switch (status) {
          case '11':
            return '立即加入';
            break;
          case '12':
            return '預熱中';
            break;
          case '14':
            return '已滿額';
            break;
          case '16':
            return '已過期';
            break;
          case '20':
            return '還款中';
            break;
          case '30':
            return '已還款';
            break;
          default:
            return '立即加入'
        }
      },
      toDetail(prdType, prdCode) {
        sessionStorage.setItem('proCode', prdCode);
        if (prdType == '40') {
          this.$router.push({name: 'Private', params: {prdCode: prdCode}})
        } else if (prdType == '70') {
          this.$router.push({name: 'Experience', params: {prdCode: prdCode}})
        } else {
          this.$router.push('/bucketGold');
        }
      }
    }
  }
</script>
