<template>
  <div class="parent-child" v-TDK="TDK" :class="{'female':childInfo.chlSex==0 || !childInfo.chlSex}">
    <ParentChildNav ref="ParentChildNav"></ParentChildNav>
    <div class="container">
      <div class="section-box section-setting">
        <div id="setBaseInfo">
          <a class="avatar-box text-center" href="javascript:;" @click="showUploadBabyAvatar">
            <div class="img-box">
              <img v-if="childInfo.imgUrl" :src="childInfo.imgUrl" class="img-responsive" alt="">
              <img v-if="childInfo.chlSex == 1" src="../../assets/images/parent-child/avatar-male.png"
                   class="img-responsive" alt="">
              <img v-if="!childInfo.chlSex || childInfo.chlSex == 0" src="../../assets/images/parent-child/avatar-female.png"
                   class="img-responsive" alt="">
            </div>
            <p class="color-link" style="color:#307bf2">點擊修改</p>
          </a>
          <div class="title">
            <div class="title-text">寶寶基本資料</div>
            <a href="javascript:;" class="edit color-link" @click="editBabyInfo=!editBabyInfo" style="color:#307bf2">編輯</a>
          </div>
          <div class="clearfix"></div>
          <div class="user-info">
            <div class="info-group">
              <div class="info-text">昵稱</div>
              <div class="info-content">{{childInfo.nickName}}</div>
            </div>
            <div class="info-group">
              <div class="info-text">寶寶性別</div>
              <div class="info-content">{{getChildSex(childInfo.chlSex)}}</div>
            </div>
            <div class="info-group">
              <div class="info-text">寶寶年齡</div>
              <div class="info-content">{{childInfo.chlAgeStr || '--'}}</div>
            </div>
            <div class="info-group">
              <div class="info-text">寶寶星座</div>
              <div class="info-content">{{childInfo.chlStar || '--'}}</div>
            </div>
            <div class="info-group">
              <div class="info-text">收件地址</div>
              <div class="info-content">
                <div>{{childInfo.address || '--'}}</div>
              </div>
            </div>
          </div>
          <div class="intro-text">
            <p>資料設置任務獎勵說明：</p>
            <p>完成所有資料設置（頭像、昵稱、寶寶性別、寶寶年齡、寶寶星座、收件地址），即可獲得加息券</p>
            <p>壹張，加息額度1%。</p>
            <p>所得獎勵完成任務後系統自動發放，可能會有延遲，請耐心等待。</p>
            <br>
          </div>
        </div>

        <div id="editInfo" class="avatar-set-modal edit-info" v-if="editBabyInfo">
          <div class="modal-backdrop fade in"></div>
          <div class="modal-dialog">
            <div class="modal-header">編輯寶寶資料
              <a href="javascript:;" class="close" @click="editBabyInfo=!editBabyInfo">×</a>
            </div>
            <div class="modal-body">
              <form class="form-horizontal">
                <div class="form-group">
                  <label for="nickName" class="col-xs-3 control-label">昵稱</label>
                  <div class="col-xs-8">
                    <input type="text" v-model="localChildInfo.nickName" id="nickName"
                           name="nickName" class="form-control"
                           v-validate="{rules:{required:true,nickName:true}}">
                    <div class="help-text text-muted">昵稱必須由中文、字母、數字或下劃線組成。</div>
                    <i class="help-text text-danger">{{errors.first('nickName')}}</i>
                  </div>
                </div>
                <div class="form-group sex">
                  <label class="col-xs-3 control-label">寶寶性別</label>
                  <div class="col-xs-9">
                    <div class="row form-control-static">
                      <label class="col-xs-6 male">
                        <input type="radio" name="chlSex" v-model="localChildInfo.chlSex"
                               value="1" :disabled="isSex">男寶寶
                      </label>
                      <label class="col-xs-6 female">
                        <input type="radio" name="chlSex" v-model="localChildInfo.chlSex"
                               value="0" :disabled="isSex">女寶寶
                      </label>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-xs-3 control-label">寶寶年齡</label>
                  <div class="col-xs-8">
                    <select name="" class="form-control" id="ageStr"
                            v-model="localChildInfo.chlAgeStr" :disabled="isAge">
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
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-xs-3 control-label">寶寶星座</label>
                  <div class="col-xs-8">
                    <select name="" class="form-control" id="constellation"
                            v-model="localChildInfo.chlStar">
                      <option value="白羊座">白羊座</option>
                      <option value="金牛座">金牛座</option>
                      <option value="雙子座">雙子座</option>
                      <option value="巨蟹座">巨蟹座</option>
                      <option value="獅子座">獅子座</option>
                      <option value="處女座">處女座</option>
                      <option value="天秤座">天秤座</option>
                      <option value="天蠍座">天蠍座</option>
                      <option value="射手座">射手座</option>
                      <option value="摩羯座">摩羯座</option>
                      <option value="水瓶座">水瓶座</option>
                      <option value="雙魚座">雙魚座</option>
                    </select>
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-xs-3 control-label">收件地址</label>
                  <div class="col-xs-8">
                                    <textarea name="address" id="address" maxlength="50" class="form-control"
                                              cols="30" rows="5" onresize="false"
                                              v-model="localChildInfo.address"
                                              v-validate="{rules:{required:true}}"></textarea>
                    <i class="help-text text-danger">{{errors.first('address')}}</i>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-xs-offset-3 col-xs-9">
                    <a class="btn btn-info save" @click="saveBabyInfo">保存</a>
                  </div>
                </div>
              </form>
              <!--<div class="tip">
                  <p>資料設置任務獎勵說明：</p>
                  <p>完成所有資料設置（頭像、昵稱、寶寶性別、寶寶年齡、寶寶星座、收件地址），即可獲得加息券壹張，加息額度1%。</p>
                  <p>所得獎勵完成任務後系統自動發放，可能會有延遲，請耐心等待。</p>
              </div>-->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import ParentChildNav from '../../components/ParentChildNav.vue'

  const dictionary={
    en:{
      custom:{
        nickName:{
          required() {
            return '請填寫昵稱'
          },
        },
        address:{
          required() {
            return '請輸入地址'
          },
        }
      }
    }
  }

  export default {
    name: 'Setting',
    data() {
      return {
        localChildInfo: {
          imgUrl: '',
          levelImgUrl: '',
          nickName: '',
          cusMobile: '',
          chlSex: '',
          chlAgeStr: '',
          chlStar: '',
          address: '',
          grade: '',
        },
        editBabyInfo: false,
        isSex:false,
        isAge:false,
        uploadBabyAvatar: false,
        fileCheck:{msg:''},
        files:[],
        imgCutInfo : {
          filePath:'',
          imgX: '',
          imgY: '',
          imgWidth: '',
          imgHeight: '',
          filePath:''
        },
        TDK:{
          title:'最新理財產品',
          keyWords:'尊享計劃,p2p理財產品,個人理財產品,如何理財,年化收益率',
          description:'聚寶盆-尊享計劃，是聚寶盆推出的壹款高端理財產品，預期年化收益高達12%！個人最好的理財產品之壹，聚寶盆幫您制定個人理財規劃，理財產品排行就選聚寶盆，6道風控審核保障，理財更安全！',
        }
      }
    },
    created() {
      var self = this;
      setTimeout(function () {
        self.localChildInfo.nickName = self.childInfo.nickName || '';
        if(self.childInfo.chlSex == '0'){
          self.localChildInfo.chlSex = 0;
        }else if(self.childInfo.chlSex == '1'){
          self.localChildInfo.chlSex = 1;
        }
//        self.localChildInfo.chlSex = ((self.childInfo.chlSex) || (self.childInfo.chlSex == "0"))  || 1;
        self.localChildInfo.chlAgeStr = self.childInfo.chlAge || '0';
        self.localChildInfo.chlStar = self.childInfo.chlStar || '白羊座';
        self.localChildInfo.address = self.childInfo.address;
        if(self.childInfo.status == "2"){
          self.isAge = true;
          self.isSex = true;
        }else if (self.childInfo.status == "1") {
          if (self.childInfo.chlAge || self.childInfo.chlAge == 0) {
            self.isAge = true;
            self.localChildInfo.chlAgeStr = self.childInfo.chlAge;
          } else {
            self.isSex = true;
            self.localChildInfo.chlSex = self.childInfo.chlSex;
          }
        }
      },100);
    },
    computed: {
      childInfo() {
        return this.$store.state.childInfo
      },
    },
    mounted() {
      this.$validator.updateDictionary(dictionary);
    },
    components: {
      ParentChildNav: ParentChildNav
    },
    watch: {
      childInfo() {
        if(this.childInfo.status == 0){
          this.$refs.ParentChildNav.showSexChoice();
        }
      },
    },
    methods: {
      getChildSex(chlSex) {
        if (chlSex == 1) {
          return '男寶寶';
        } else if (chlSex == 0) {
          return '女寶寶';
        } else {
          return '--'
        }
      },
      saveBabyInfo(){
        let self = this;
        let query = {};
        query.nickName = self.localChildInfo.nickName;
        query.chlStar = self.localChildInfo.chlStar;
        query.address = self.localChildInfo.address;
        query.typeStr = "1-4-5";

        if (!self.isSex) {
          query.chlSex = self.localChildInfo.chlSex;
          query.typeStr = "1-2-4-5";
        }
        if (!self.isAge) {
          query.chlAge = self.localChildInfo.chlAgeStr;
          query.typeStr = "1-3-4-5";
        }
        if (!self.isSex && !self.isAge) {
          query.typeStr = "1-2-3-4-5";
        }
        self.$http.post('/pbap-web/action/child/editChild',query).then((res) => {
          if(res.body.errorInfo.errorCode == '0000'){
            self.childInfo.nickName = self.localChildInfo.nickName;
            self.childInfo.chlSex = self.localChildInfo.chlSex;
            self.childInfo.chlAgeStr =  $("#ageStr").find("option[value=" + self.localChildInfo.chlAgeStr + "]").text();
            self.childInfo.chlStar = self.localChildInfo.chlStar;
            self.childInfo.address = self.localChildInfo.address;
            self.editBabyInfo = false;
            self.$store.commit('setModal',{
              show: false,
              type:'alert',
              msg:'設置成功！',
              confirmUrl:'/parent-child/setting'
            });
            self.$store.commit('showModal');
          }
        });
      },
      showUploadBabyAvatar(){
        this.$refs.ParentChildNav.showUploadBabyAvatar();
      }
    }
  }
</script>
