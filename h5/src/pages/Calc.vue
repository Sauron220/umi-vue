<template>
    <div class="wrap calc-content">
        <PageNav message="/profile"></PageNav>
        <div class="mui-backdrop mui-active" v-if="showPayWay" @click="showPayWay=!showPayWay"></div>
        <div class="pay-box" :class="{'active':showPayWay}">
            <div class="paybtn clearfix">
                <span>--还款方式--</span>
                <span class="paybtn-colse" @click="showPayWay=!showPayWay">取消</span>
            </div>
            <div class="pos">
                <div class="input-bar touch" tit="5" @click="showPayWay=!showPayWay;repType=5">
                    <span class="title">到期还本付息</span>
                    <span class="text">在最后一期偿还全部本金与利息</span>
                </div>
                <div class="input-bar touch" tit="3" @click="showPayWay=!showPayWay;repType=3">
                    <span class="title">每月付息，到期还本</span>
                    <span class="text">每月偿还固定利息，最后一期偿还本金</span>
                </div>
                <div class="input-bar touch" tit="2" @click="showPayWay=!showPayWay;repType=2">
                    <span class="title">等额本金</span>
                    <span class="text">每月偿还等额的本金和剩余贷款的利息</span>
                </div>
                <div class="input-bar touch" tit="1" @click="showPayWay=!showPayWay;repType=1">
                    <span class="title">等额本息</span>
                    <span class="text">每月以相等的金额偿还借款本息</span>
                </div>
            </div>
        </div>

        <div class="calc-operation mui-input-group">
            <div class="mui-input-row">
                <label>投资金额</label>
                <input class="mui-input-clear" type="text" name="invest" id="invest"
                       maxlength="11" v-model="invest" placeholder="请输入1至1亿的任意整数"
                       v-validate="{rules:{required:true}}" autocomplete="off">
                <i>元</i>
            </div>
            <div class="mui-input-row">
                <label>年化收益</label>
                <input class="mui-input-clear" type="text" name="rate" id="rate"
                       maxlength="5" v-model="rate" placeholder="请输入0.01至99.99的数字"
                       v-validate="{rules:{required:true,rateCheck:true}}" autocomplete="off">
                <i>%</i>
            </div>
            <div class="mui-input-row">
                <label>借款天数</label>
                <input class="mui-input-clear" type="text" name="date" id="date"
                       maxlength="4" v-model="date" placeholder="请输入1至9999的任意整数"
                       v-validate="{rules:{required:true}}" autocomplete="off">
                <i>天</i>
            </div>
            <div class="mui-input-row choice-btn" @click="showPayWay = !showPayWay">
                <label>还款方式</label>
                <span class="repType" v-if="repType==5">到期还本付息</span>
                <span class="repType" v-if="repType==3">每月付息，到期还本</span>
                <span class="repType" v-if="repType==2">等额本金</span>
                <span class="repType" v-if="repType==1">等额本息</span>
            </div>
            <a href="/calc#result" type="button" class="mui-btn calcing-btn" @click="defaultCalc()">计算</a>
        </div>
        <div id="result"></div>
        <div class="calc-title">计算结果</div>

        <div class="calc-box">
            <div>
                <span class="text-left">借款期数</span>
                <span>应收利息(元)</span>
                <span>应收本息(元)</span>
            </div>
            <div>
                <span class="text-red text-left">
                    <i class="set-size" id="prdStage">{{incomeResult.prdStage ? incomeResult.prdStage + '期' : '--'}}</i>
                </span>
                <span class="text-red">
                    <i class="set-size" id="totalInterests">
                        {{incomeResult.totalInterests ? $fmoney(incomeResult.totalInterests) : '--'}}
                    </i>
                </span>
                <span class="text-red">
                    <i class="set-size" id="totalAmount">
                        {{incomeResult.totalAmount ? $fmoney(incomeResult.totalAmount) : '--'}}
                    </i>
                </span>
            </div>
            <div class="calc-ts">* 预期收益率仅供参考，最终收益会与预期有所偏差，请以实际为准。</div>
        </div>

        <div class="hasList" v-if="incomeList.length>0">
            <div class="calc-title">本息回收时间表</div>
            <div class="list-tit">
                <span class="list-sp list-sp1">期数</span>
                <span class="list-sp">应收本金</span>
                <span class="list-sp">应收利息</span>
            </div>
            <div class="mui-table-view mui-table-view-chevron listContent">
                <scroller :on-refresh="refresh"
                          :on-infinite="infinite">
                    <div class="list-txt" v-for="(item,index) in incomeList"
                         :class="{'list-txt-bg':index%2==1}">
                        <span class="list-sp list-sp1">{{index+1}}期</span>
                        <span class="list-sp">{{$fmoney(item.amount)}}元</span>
                        <span class="list-sp">{{$fmoney(item.interests)}}元</span>
                    </div>
                </scroller>
            </div>
        </div>
{{vError}}
    </div>
</template>

<script>
  import PageNav from '@/components/PageNav'
  export default {
    name: 'Calc',
    data() {
      return {
        pageTitle: '收益计算器',
        showPayWay:false,
        invest: '',
        repType: 5,
        rate: '',
        date: '',
        incomeListInfo: {},
        incomeList: [],
        incomeResult: {},
        currentPage:1
      }
    },
    created(){
      var self = this;
      self.$store.commit('setPageTitle', self.pageTitle);
    },
    mounted () {
      var self = this;
      self.$validator.updateDictionary({
        en: {
          custom: {
            invest: {
              required(){
                return '请输入投资金额'
              },
              moreThan(){
                return '最低加入金额为' + self.productDetail.minInvAmt + '元'
              }
            },
            rate: {
              required(){
                return '请输入年化利率'
              }
            },
            date: {
              required(){
                return '请输入借款期限'
              }
            }
          }
        }
      });
    },
    components: {
      'PageNav': PageNav,
    },
    computed:{
      vError() {
        this.$store.state.vError
      },
    },
    watch: {
      invest(){
        this.invest = this.invest.toString().replace(/\D/g, '')
      }
    },
    methods: {
      calc(index,callback){
        var self = this;
        self.$http.post('/pbap-web/action/product/query/calculator', {
          pageIndex: index,
          pageSize: 10,
          prdAmount: self.invest,
          prdPeriod: self.date,
          rate: self.rate,
          repType: self.repType
        }).then((res) => {
          callback && callback(res);
        });
      },
      defaultCalc(){
        var self = this;
        self.$validator.validateAll().then((result) => {
          if (result) {
            self.currentPage = 1;
            self.calc(self.currentPage,function (res) {
              self.incomeResult = res.body.respInfo.incomeResult;
              self.incomeListInfo = res.body.respInfo.incomeResult.incomeList;
              self.incomeList = self.incomeListInfo.dataList;
            })
          }else{
            self.$store.commit('setMsg', {
              msg: self.errors.items[0].msg,
            });
            self.$store.commit('showMsg');
            setTimeout(function () {
              self.$store.commit('hideMsg');
            },3000)
          }
        });
      },
      refresh(done) {
        var self = this;
        self.currentPage = 1;
        self.calc(self.currentPage,function (res) {
          let returnVal = res.body.respInfo.incomeResult.incomeList.dataList.length == 0;
          if(!returnVal){
            self.incomeResult = res.body.respInfo.incomeResult;
            self.incomeListInfo = res.body.respInfo.incomeResult.incomeList;
            self.incomeList = self.incomeListInfo.dataList;
          }
          done(returnVal);
          return
        });
      },
      infinite(done){
        var self = this;
        self.currentPage++;
        if(self.currentPage<=self.incomeListInfo.totalPage){
          self.calc(self.currentPage,function (res) {
            let returnVal = res.body.respInfo.incomeResult.incomeList.dataList.length == 0;
            if(!returnVal){
              self.incomeResult = res.body.respInfo.incomeResult;
              self.incomeListInfo = res.body.respInfo.incomeResult.incomeList;
              self.incomeList = self.incomeList.concat(res.body.respInfo.incomeResult.incomeList.dataList);
            }
            done(returnVal);
            return
          });
        }else{
          done(true);
        }
      },
    }
  }
</script>
