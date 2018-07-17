<template>
  <div class="parent-child" v-TDK="TDK" :class="{'female':childInfo.chlSex==0 || !childInfo.chlSex}">
    <ParentChildNav ref="ParentChildNav"></ParentChildNav>
    <div class="container course">
      <div class="growth-mission">
        <img class="img-title" src="../../assets/images/parent-child/grow-title.png">
        <div class="grow-tips">經驗值達標即可升級，還有更多任務獎勵哦！</div>

        <div class="grow-level" v-if="showLevelList" v-levelList
             :itemLength="rewardList.length"
             :default-position="-170*(activeLevel-6>0?(activeLevel-6):0)">
          <div class="handle" v-if="rewardList.length>6">
            <img class="grow-left prev prevStop" alt=""
                 src="../../assets/images/parent-child/grow-left.png">
            <img class="grow-right next" src="../../assets/images/parent-child/grow-right.png">
          </div>
          <div class="grow-list">
            <div id="growList" :style="{width:rewardList.length*1*170+'px'}">
              <div class="box-cont grow-bx-0" :class="{'grow-bx-bottom':$index % 2 == 1}"
                   v-for="(item,$index) in rewardList">
                <div class="reward-show" @mouseover="rewardId = false,overBl = true,rwd = item.rwdId"
                     @mouseout="rewardId = true,overBl = false,rwd = rewardIndex"
                     v-show="(rewardId && ((item.receiveStatus == 2 && rewardList[$index-1] && rewardList[$index-1].receiveStatus != 2) ||
                                    (item.receiveStatus != 2 && !rewardList[$index+1]) || (item.receiveStatus == 2 && !rewardList[$index-1])))||(overBl && rwd == item.rwdId)">
                  <img class="reward-img"
                       :src="item.prizeUrl">
                  <div v-show="item.receiveStatus == 0" class="reward-receive receive-orange"
                       @click="receive(item.rwdId)"
                       :name="item.prizeName" :alt="item.rwdId"
                       title="請點擊領取">領取
                  </div>
                  <div v-show="item.receiveStatus == 1" class="reward-receive receive-orange rota"
                       :name="item.prizeName" :alt="item.rwdId"
                       title="已領取">已獲得
                  </div>
                  <div v-show="item.receiveStatus == 2" class="reward-receive" :name="item.prizeName"
                       :alt="item.rwdId"
                       title="未達等級不能領取">領取
                  </div>
                  <div class="reward-sj"></div>
                  <div class="grow-ex"><span class="ex-text">EX</span><span
                    class="ex-num ex-current">{{(childInfo.empiricValue < parseFloat(item.empiricValue)) ? childInfo.empiricValue : item.empiricValue}}</span>/<span
                    class="ex-num ex-total">{{item.empiricValue}}</span>
                  </div>
                </div>
                <img class="grow-lu"
                     v-if="(item.receiveStatus != 2 && rewardList[$index+1] && rewardList[$index+1].receiveStatus == 2) || (item.receiveStatus != 2 && !rewardList[$index+1])"
                     src="../../assets/images/parent-child/grow-lu.png">
                <img v-if="item.receiveStatus == 1" class="bao-xiang"
                     @mouseover="rewardId = false,overBl = true,rwd = item.rwdId"
                     @mouseout="rewardId = true,overBl = false,rwd = rewardIndex"
                     src="../../assets/images/parent-child/baox-on.png">
                <img v-if="item.receiveStatus != 1" class="bao-xiang"
                     @mouseover="rewardId = false,overBl = true,rwd = item.rwdId"
                     @mouseout="rewardId = true,overBl = false,rwd = rewardIndex"
                     src="../../assets/images/parent-child/baox-off.png">
                <!--<img class="bao-xiang" src="../../assets/images/parent-child/baox-off.png">-->
                <img class="grow-qz" src="../../assets/images/parent-child/grow-qi-bg.png">
                <span class="grow-grade-text">v{{$index + 1}}</span>
                <img v-if="$index%2 == 1" class="grow-line-01"
                     src="../../assets/images/parent-child/grow-xian-01.png">
                <img v-if="$index%2 == 0" class="grow-line-01 grow-line-02"
                     src="../../assets/images/parent-child/grow-xian-02.png">
              </div>

            </div>
          </div>
        </div>


        <div class="all-task">
          <h3>所有任務</h3>
          <div class="task-content clearfix">
            <h3>等級任務</h3>
            <span>通過投資親子計劃資產獲得經驗值，達到等級即可領取對應等級寶箱獎勵</span>
            <div class="task-btn"><a href="/parent-child/plan-content">去升級</a></div>
          </div>
          <div class="task-content clearfix">
            <h3>設置資料</h3>
            <span>首次完成頭像以及基本資料設置，即可獲得加息券壹張，加息額度1%</span>
            <div class="task-btn" :class="{'disabled':setInfo.isSetComplete == 1 && setInfo.isReceiveCoupon == 1}">
              <a v-if="setInfo.isSetComplete != 1" class="task-set" href="/parent-child/setting">前往</a>
              <a v-if="setInfo.isSetComplete == 1 && setInfo.isReceiveCoupon != 1" class="task-reward" @click="coupon" href="javascript:void (0);" >領取</a>
              <a v-if="setInfo.isSetComplete == 1 && setInfo.isReceiveCoupon == 1" class="task-reward" href="javascript:void (0);">已領取</a>
            </div>
            <span class="no-task no-set" v-if="setInfo.isSetComplete != 1">[未完成]</span>
            <span class="no-task is-set" v-if="setInfo.isSetComplete == 1">[已完成]</span>
          </div>
          <div class="reward-pro">
            <p>任務及獎勵說明：</p>
            <p>1、親子計劃資產投資成功可獲得壹定經驗值，達到特定經驗值可提升親子賬戶等級；</p>
            <p>2、親子賬戶等級每提升壹級，可獲得對應的獎勵（虛擬或實物以頁面為準）；</p>
            <p>3、任務完成後所有獎勵均需用戶手動領取，實物獎勵需經客服核實後發放，請確保您的收貨地址準確無誤；</p>
            <p>4、投資經驗值=投資金額/10；</p>
          </div>
        </div>
      </div>
    </div>
    <div class="section-space"></div>
    <div class="section-space"></div>
    <div id="rewardGift" class="plan-gift" v-show="rewardGift">
      <div class="mask" style="display: block"></div>
      <div class="item-box">
        <a href="javascript:;" @click="closeRewardGift" class="close">×</a>
        <div class="text-center">
          <br>
          <p class="gift-img"><img :src="giftImgUrl" alt=""></p>
          <br>
          <p class="tip">恭喜您獲得 <span class="gift-name">{{giftName}}</span></p>
          <p class="gift-pro">提醒：實物獎勵將於領取後五個工作日內寄出，請確保您已正確無誤設置收貨地址。<a
            href="/parent-child/setting">去設置</a></p>
        </div>
      </div>
    </div>
    <div id="setInfo" class="set-modal" v-if="isSetInfo">
      <div class="mask" style="display: block"></div>
      <div class="item-set">
        <p>系統將根據您的的寶寶性別與年齡自動匹配對應的任務獎品，請先設置寶寶性別、年齡段</p>
        <div class="set-group clearfix">
          <div class="text-label">寶寶性別</div>
          <div class="radio-ctrl clearfix">
            <label class="half-box male">
              <input type="radio" name="setChlSex" value="1" v-model="childInfo.chlSex" :disabled="isSex">男寶寶
            </label>
            <label class="half-box female">
              <input type="radio" name="setChlSex" value="0" v-model="childInfo.chlSex" :disabled="isSex">女寶寶
            </label>
          </div>
        </div>
        <div class="set-group clearfix">
          <div class="text-label">寶寶年齡</div>
          <div class="form-ctrl">
            <select id="babyAge" v-model="babyAge" :disabled="isAge" placeholder="請選擇">
              <option value="0">準爸媽</option>
              <option value="1">壹歲</option>
              <option value="2">壹歲半</option>
              <option value="3">二歲</option>
              <option value="4">三歲</option>
              <option value="5">四歲</option>
              <option value="6">五歲</option>
              <option value="7">六歲</option>
              <option value="8">七歲</option>
              <option value="9">八歲</option>
              <option value="10">九歲</option>
              <option value="11">十歲</option>
              <option value="12">十壹歲</option>
              <option value="13">十二歲</option>
              <option value="14">十二歲以上</option>
            </select>
            <div class="age-error">請選擇寶寶年齡</div>
            <div class="set-btn">
              <button @click="setSave" class="btn btn-info btn-block">確認</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import ParentChildNav from '../../components/ParentChildNav.vue'

  export default {
    name: 'Task',
    data() {
      return {
        setInfo: {},
        rewardList: [],
        rewardIndex: '',
        rewardId: true,
        overBl: false,
        rwd: '',
        rewardGift:false,
        giftImgUrl:'',
        giftName:'',
        isSetInfo:false,
        isAge:false,
        isSex:false,
        showLevelList:false,
        babyAge:0,
        activeLevel:0,
        TDK:{
          title:'最新理財產品',
          keyWords:'尊享計劃,p2p理財產品,個人理財產品,如何理財,年化收益率',
          description:'聚寶盆-尊享計劃，是聚寶盆推出的壹款高端理財產品，預期年化收益高達12%！個人最好的理財產品之壹，聚寶盆幫您制定個人理財規劃，理財產品排行就選聚寶盆，6道風控審核保障，理財更安全！',
        }
      }
    },
    created() {
      var self = this;
      self.$http.post('/pbap-web/action/child/childSetComplete', {}).then((res) => {
        self.setInfo = res.body.respInfo
      });
    },
    computed: {
      userInfo() {
        return this.$store.state.userInfo
      },
      accountInfo() {
        return this.$store.state.accountInfo
      },
      childInfo() {
        return this.$store.state.childInfo
      },
    },
    mounted() {

    },
    components: {
      ParentChildNav: ParentChildNav
    },
    watch: {
      childInfo(){
        let self = this;
        if(self.childInfo.status == 0){
          self.isSetInfo = true;
        }else if (self.childInfo.status == 1) {
          self.isSetInfo = true;
          if (self.childInfo.chlAge || self.childInfo.chlAge == 0) {
            self.isAge = true;
            self.babyAge = self.childInfo.chlAge;
          } else {
            self.isSex = true;
          }
        }else if(self.childInfo.status == 2){
          self.isAge = true;
          self.isSex = true;
          self.getList();
        }
      }
    },
    methods: {
      getList(){
        let self = this;
        self.$http.post('/pbap-web/action/child/childRewardList', {}).then((res) => {
          self.rewardList = res.body.respInfo.rewardList;
          if(self.rewardList){
            for (var i = self.rewardList.length - 1; i >= 0; i--) {
              if (self.rewardList[i].receiveStatus != 2) {
                self.activeLevel = i+1;
                if (i == (self.rewardList.length - 1)) {
                  self.rewardIndex = i;
                } else {
                  self.rewardIndex = i + 1;
                }
                break;
              }
              if (self.rewardList[0].receiveStatus == 2) {
                self.rewardIndex = 0;
              }
            }
          }
          self.showLevelList = true;
        });
      },
      receive(index){
        let self = this;
        for(var i = 0;i<self.rewardList.length;i++){
          if(self.rewardList[i].rwdId == index){
            self.giftImgUrl = self.rewardList[i].prizeUrl;
            self.giftName = self.rewardList[i].prizeName;
            break;
          }
        }
        self.$http.post('/pbap-web/action/child/childReward',{
          rwdId: index,
          type: 1
        }).then((res) => {
          self.rewardGift = true;
        });
      },
      closeRewardGift(){
        let self = this;
        self.rewardGift = false;
        self.getList();
      },
      setSave(){
        let self = this;
        var query={};
        if (!self.isAge && !self.isSex) {
          query = {
            "chlSex": self.childInfo.chlSex,
            "chlAge": self.babyAge,
            "typeStr" :"2-3"
          };
        } else if (!self.isAge) {
          query.chlAge = self.babyAge;
          query.typeStr = "3"
        }else if(!self.isSex){
          query.chlSex = self.childInfo.chlSex;
          query.typeStr = "2"
        }
        self.$http.post('/pbap-web/action/child/editChild',query).then((res) => {
          if(res.body.errorInfo.errorCode == '0000'){
            self.isSetInfo = false;
            self.$store.commit('setModal', {
              show: false,
              type: 'alert',
              msg: '設置成功！',
              confirmUrl:'/parent-child/task'
            });
            self.$store.commit('showModal');
          }
        });

      },
      coupon() {
        var self = this;
        self.$http.post('/pbap-web/action/child/childReward',{"type": 2}).then((res) => {
          if(res.body.errorInfo.errorCode == '0000'){
            self.$store.commit('setModal', {
              show: false,
              type: 'alert',
              msg: '領取成功！',
              confirmUrl:'/parent-child/task'
            });
            self.$store.commit('showModal');
          }
        });
      },
    },
    directives: {
      levelList: {
        bind(el, binding, vnode, oldVnode) {
          var moveFlag = false;
          var growList = el.querySelector('#growList');
          var growListItem = el.querySelectorAll('#growList .box-cont');
          // 計算移動範圍
          let rangeNum = el.getAttribute('itemLength')*1-6;
          let moveRange = rangeNum > 0 ? rangeNum*170:0;
          console.log(el.getAttribute('itemLength'))
          console.log(moveRange)
          // 前壹個
          var prev = el.querySelector('.prev');
          if(prev){
            prev.onclick = function () {
              if (!moveFlag) {
                listMove(170);
              }
            }
          }
          // 後壹個
          var next = el.querySelector('.next');
          if(next){
            next.onclick = function () {
              if (!moveFlag) {
                listMove(-170);
              }
            }
          }
          // 移動
          function listMove(val) {
            moveFlag = true;
            let elChildWidth = toGetComputedStyle(growList, 'margin-left').replace('px', '') * 1;
            var listelChildWidth = elChildWidth + val;
            var setListPosition = setInterval(function () {
              elChildWidth += val / 100;
              // 右移
              if (val >= 0) {
                if (listelChildWidth >= -moveRange && listelChildWidth <= 0 && elChildWidth <= listelChildWidth) {
                  growList.style.marginLeft = elChildWidth + 'px';
                } else {
                  clearTimeout(setListPosition);
                  moveFlag = false;
                }
              } else {  // 左移
                if (listelChildWidth >= -moveRange && listelChildWidth <= 0 && elChildWidth >= listelChildWidth) {
                  growList.style.marginLeft = elChildWidth + 'px';
                } else {
                  clearTimeout(setListPosition);
                  moveFlag = false;
                }
              }
            }, 5);
          }

          function toGetComputedStyle(elChild, value) {
            return window.getComputedStyle(elChild)[value]
          }



          // 設置初始化位置   由綁定指令元素上的  default-position 屬性 傳進來
          moveTo(el.getAttribute('default-position')+'px');
          // 移動到
          function moveTo(val){
            growList.style.marginLeft = val;
          }
        },
        componentUpdated(el, binding, vnode, oldVnode){
//          console.log()
        }
      }
    }
  }
</script>
