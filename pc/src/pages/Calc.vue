<template>
  <div class="container" v-TDK="TDK">
    <div class="section-space"></div>
    <div class="calc">
      <div class="title">
        <span>收益計算器</span>
      </div>
      <div class="row form-horizontal">
        <div class="col-xs-6">
          <div class="form-group">
            <label for="invest" class="col-sm-4 control-label">投資金額</label>
            <div class="col-sm-8">
              <input class="form-control" type="text" name="invest" id="invest"
                     maxlength="11" v-model="invest" placeholder="請輸入1至1億的任意整數"
                     v-validate="{rules:{required:true}}">
              <span class="form-control-feedback">元</span>
              <span class="help-block small"
                    v-if="errors.first('invest')">{{errors.first('invest')}}</span>
            </div>
          </div>
          <div class="form-group">
            <label for="date" class="col-sm-4 control-label">借款天數</label>
            <div class="col-sm-8">
              <input class="form-control" type="text" name="date" id="date"
                     maxlength="4" v-model="date" placeholder="請輸入1至9999的任意整數"
                     v-validate="{rules:{required:true}}">
              <span class="form-control-feedback">天</span>
              <span class="help-block small" v-if="errors.first('date')">{{errors.first('date')}}</span>
            </div>
          </div>
        </div>
        <div class="col-xs-6">
          <div class="form-group">
            <label for="rate" class="col-sm-4 control-label">年化收益</label>
            <div class="col-sm-8">
              <input class="form-control" type="text" name="rate" id="rate"
                     maxlength="5" v-model="rate" placeholder="請輸入0.01至99.99的數字"
                     v-validate="{rules:{required:true,rateCheck:true}}">
              <span class="form-control-feedback">%</span>
              <span class="help-block small" v-if="errors.first('rate')">{{errors.first('rate')}}</span>
            </div>
          </div>
          <div class="form-group">
            <label for="repType" class="col-sm-4 control-label">還款方式</label>
            <div class="col-sm-8">
              <select class="form-control" id="repType" v-model="repType">
                <option value="5">到期還本付息</option>
                <option value="3">每月付息，到期還本</option>
                <option value="2">等額本金</option>
                <option value="1">等額本息</option>
              </select>
            </div>
          </div>
          <div class="form-group">
            <div class="col-sm-offset-4 col-sm-8">
              <button type="submit" @click="calc({index:1})" class="btn btn-warning btn-block">計算</button>
            </div>
          </div>
        </div>
      </div>
      <hr>
      <div class="row">
        <div class="col-xs-6">
          <p>
            到期還本付息，<span class="text-muted">即在最後壹期償還全部本金與利息</span>
          </p>
          <p>
            每月付息，到期還本，<span class="text-muted">即每月償還固定利息，最後壹期償還全部本金</span>
          </p>
          <p>＊預期收益率僅供參考，最終收益會與預期有所偏差，請以實際為準。</p>
        </div>
        <div class="col-xs-6">
          <p>
            等額本金，<span class="text-muted">即每月償還等額的本金和剩余貸款的利息</span>
          </p>
          <p>
            等額本息，<span class="text-muted">即每月以相等的金額償還借款本息</span>
          </p>
        </div>
      </div>
      <div class="result" v-if="incomeList.length>0">
        <div class="title">
          <span>計算結果</span>
        </div>
        <div class="row text-center">
          <div class="col-xs-4">
            <div class="text-muted">借款期數</div>
            <div class="text-danger calc-result">{{incomeResult.prdStage}}期</div>
          </div>
          <div class="col-xs-4">
            <div class="text-muted">應收利息(元)</div>
            <div class="text-danger calc-result">{{$fmoney(incomeResult.totalInterests)}}</div>
          </div>
          <div class="col-xs-4">
            <div class="text-muted">應收本息(元)</div>
            <div class="text-danger calc-result">{{$fmoney(incomeResult.totalAmount)}}</div>
          </div>
        </div>
      </div>
      <div class="result-detail" v-if="incomeList.length>0">
        <div class="title">
          <span>本息回收時間表</span>
        </div>
        <div class="content">
          <div class="calc-list">
            <div class="tit">
              <span>期數</span> <span>應收本息</span> <span>應收本金</span> <span>應收利息</span>
              <span>待收本息</span>
            </div>
            <div>
              <div class="txt" v-for="(item,index) in incomeList"
                   :class="{'txt-bg':index%2==1}">
                <span>{{index+1}}期</span>
                <span>{{$fmoney(item.amount)}}</span>
                <span>{{$fmoney(item.capital)}}</span>
                <span>{{$fmoney(item.interests)}}</span>
                <span>{{$fmoney(item.remainAmount)}}</span>
              </div>
            </div>
          </div>
        </div>
        <br>
        <vPagination v-if="incomeListInfo.totalPage>1"
                     :totalPage="incomeListInfo.totalPage"
                     :currentPage="incomeListInfo.pageIndex"
                     :pageFor="calc"
                     :pageForArg="{}">
        </vPagination>
      </div>
    </div>
  </div>
</template>

<script>
  import vPagination from '../components/vPagination'

  export default {
    name: 'Calc',
    data () {
      return {
        invest: '',
        repType: 5,
        rate: '',
        date: '',
        incomeListInfo: {},
        incomeList: [],
        incomeResult: {},
        TDK:{
          title:'理財收益計算器-聚寶盆',
          keyWords:'理財收益計算器,理財算算看,理財計算器,理財收益率怎麽算',
          description:'如何計算理財收益率？聚寶盆收益計算器，支持對各網貸P2P投資、基金、理財項目、銀行活期定期存款收益進行計算，讓您能更直觀地了解投資收益情況。',
        }
      }
    },
    components:{
      vPagination:vPagination
    },
    created(){
      var self = this;

    },
    mounted () {
      var self = this;
      self.$validator.updateDictionary({
        en: {
          custom: {
            invest: {
              required(){
                return '請輸入投資金額'
              },
              moreThan(){
                return '最低加入金額為' + self.productDetail.minInvAmt + '元'
              }
            },
            rate: {
              required(){
                return '請輸入年化利率'
              }
            },
            date: {
              required(){
                return '請輸入借款期限'
              }
            }
          }
        }
      });
    },
    watch: {
      invest(){
        this.invest = this.invest.toString().replace(/\D/g, '')
      }
    },
    methods: {
      calc(arg){
        var self = this;
        self.$http.post('/pbap-web/action/product/query/calculator', {
          pageIndex: arg.index,
          pageSize: 10,
          prdAmount: self.invest,
          prdPeriod: self.date,
          rate: self.rate,
          repType: self.repType
        }).then((res) => {
          self.incomeResult = res.body.respInfo.incomeResult;
          self.incomeListInfo = res.body.respInfo.incomeResult.incomeList;
          self.incomeList = self.incomeListInfo.dataList;
        });
      }
    }
  }
</script>
