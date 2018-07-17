<template>
  <div class="parent-child female" v-TDK="TDK">
    <div class="container info-nav" id="infoNav">
      <div class="parent-child-user-info">
        <div class="img-box">
          <a href="javascript:;" @click="showAvatarEditor()">
            <img v-if="childInfo.imgUrl" :src="childInfo.imgUrl" class="img-responsive" alt="">
            <img v-if="childInfo.chlSex == 1" src="../assets/images/parent-child/avatar-male.png" class="img-responsive" alt="">
            <img v-if="childInfo.chlSex == 0" src="../assets/images/parent-child/avatar-female.png" class="img-responsive" alt="">
          </a>
          <div class="level cursor" @click="planGift = !planGift;">
            <img v-if="childInfo.grade == 0" src="../assets/images/parent-child/level0.png" alt="level">
            <img v-if="childInfo.grade == 1" src="../assets/images/parent-child/level1.png" alt="level">
            <img v-if="childInfo.grade == 3" src="../assets/images/parent-child/level3.png" alt="level">
            <img v-if="childInfo.grade == 4" src="../assets/images/parent-child/level4.png" alt="level">
            <img v-if="childInfo.grade == 5" src="../assets/images/parent-child/level5.png" alt="level">
          </div>
        </div>
        <div class="info">
          <div class="name ell">{{childInfo.nickName}}</div>
          <div class="id">ID:{{childInfo.cusMobile}}</div>
        </div>
      </div>
      <ul class="list-inline parent-child-nav">
        <li>
          <router-link :to="{ name: 'ParentChild', params: { pageAt: 'plan-content'}}">
            <img class="img-responsive" src="../assets/images/parent-child/male/parent-child-nav1.png"
                 alt="">
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'ParentChildActiveList', params: { pageIdx:1}}">
            <img class="img-responsive" src="../assets/images/parent-child/male/parent-child-nav2.png"
                 alt="">
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'ParentChild', params: { pageAt: 'setting'}}">
            <img class="img-responsive" src="../assets/images/parent-child/male/parent-child-nav3.png"
                 alt="">
          </router-link>
        </li>
        <li>
          <a href="javascript:;" @click="planIntro = true">
            <img class="img-responsive" src="../assets/images/parent-child/male/parent-child-nav4.png"
                 alt="">
          </a>
        </li>
      </ul>
    </div>
    <div class="clearfix"></div>
    <div class="container"></div>

    <div id="sexChoice" class="sex-choice" v-if="sexChoice">
      <div class="modal-backdrop fade in"></div>
      <div class="modal-dialog">
        <div class="modal-header">
          <a href="javascript:;" class="close" @click="sexChoice = !sexChoice">×</a>
        </div>
        <div class="modal-body">
          <ul class="list-inline select-item">
            <li>
              <label for="male">
                <div class="img-box">
                  <img src="../assets/images/parent-child/male/parent-child-male.png" alt="">
                </div>
                <div class="radio">
                  <input type="radio" id="male" name="sex" value="1">男寶寶
                </div>
              </label>
            </li>
            <li>
              <label for="female">
                <div class="img-box">
                  <img src="../assets/images/parent-child/male/parent-child-female.png" alt="">
                </div>
                <div class="radio">
                  <input type="radio" id="female" name="sex" value="0">女寶寶
                </div>
              </label>
            </li>
          </ul>
          <div class="text-center">
            <button class="btn btn-info btn-male btn-lg" id="setSex">確認</button>
          </div>
          <div class="tip text-center">獎勵提示：去“設置板塊”完成其他資料設置還能獲取壹張加息券哦！</div>
        </div>
      </div>
    </div>



    <div id="uploadImg" class="avatar-set-modal upload-img" v-if="uploadBabyAvatar">
      <div class="modal-backdrop fade in"></div>
      <div class="modal-dialog">
        <div class="modal-header">請選擇圖片
          <a href="javascript:;" @click="uploadBabyAvatar=!uploadBabyAvatar" class="close">×</a>
        </div>
        <div class="modal-body form-horizontal">
          <div class="form-group">
            <label class="col-xs-3 control-label">圖片上傳</label>
            <div class="col-xs-9">
              <div class="upload-box relative">
                <div class="input ell form-control">{{files[0]?files[0].name:''}}</div>
                <!--<input type="file" name="childfile" @change="fileSelect()" id="childfile"
                       accept="image/gif, image/jpeg, image/jpg, image/png"
                       >-->
                <file-upload name="childfile" class="btn btn-blue" v-model="files" :post-action="'/pbap-web/action/child/uploadImg'"
                             ref="upload" accept="image/gif, image/jpeg, image/jpg, image/png">選擇</file-upload>
              </div>
            </div>
          </div>
          <div class="form-group">
            <div class="col-xs-9 col-xs-offset-3">
              <small class="help-block">您可以上傳JPG、GIF或PNG文件，圖片大小不可超過4M</small>
              <div class="help-info text-danger" v-if="fileCheck.msg">{{fileCheck.msg}}</div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <a href="javascript:;" class="footer-confirm cancel" @click="uploadBabyAvatar=!uploadBabyAvatar">取消</a>
          <a href="javascript:;" class="footer-confirm light upload" @click="uploadImg()">上傳</a>
        </div>
      </div>
    </div>

    <div id="cutImg" class="avatar-set-modal cut-img" v-if="editBabyAvatar">
      <div class="modal-backdrop fade in"></div>
      <div class="modal-dialog">
        <div class="modal-header">編輯頭像
          <a href="javascript:;" @click="editBabyAvatar=!editBabyAvatar" class="close">×</a>
        </div>
        <div class="modal-body">
          <div class="text-center">
            <img :src="imgCutInfo.filePath" id="uploadAvatar" name="uploadAvatar" alt="avatar" class="img-responsive">
          </div>
        </div>
        <div class="modal-footer">
          <a href="javascript:;" class="footer-confirm" @click="editBabyAvatar=!editBabyAvatar">取消</a>
          <a href="javascript:;" id="avatarSubmit" @click="avatarSubmit()" class="footer-confirm light upload">上傳</a>
        </div>
      </div>
    </div>
    <div id="planIntro" class="plan-intro-modal" v-if="planIntro">
      <div class="modal-backdrop fade in"></div>
      <div class="modal-dialog">
        <div class="modal-body">
          <a href="javascript:;" @click="planIntro = !planIntro" class="close">×</a>
          <div class="content">親子計劃是壹款寓教於樂的理財計劃產品，寶媽寶爸可以通過親子計劃為寶貝的未來各項支出做好儲蓄規劃，寶寶可以通過親子計劃培養自己的財商。</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import FileUpload from 'vue-upload-component'
  import Cropper from 'cropperjs'

  export default {
    name: 'ParentChild',
    data () {
      return {
        childInfo: {
          imgUrl:'',
          levelImgUrl:'',
          nickName:'',
          cusMobile:'',
          chlSex:'',
          chlAgeStr:'',
          chlStar:'',
          address:'',
          grade:'',
        },
        localChildInfo: {},
        newsListInfo: '',
        newsList: '',
        newsDetail: '',
        planIntro: false,
        uploadBabyAvatar: false,
        editBabyAvatar: false,
        sexChoice: false,
        planGift: false,
        moneyChoice: false,
        editBabyInfo: false,
        lastVipPrd: '',
        investMoney: 0,
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
    created(){
      var self = this;
      self.$http.post('/pbap-web/action/child/cusChildInfo', {}).then((res) => {
        if (res.body.respInfo.loginType != 0) {
          self.childInfo = res.body.respInfo.childInfo;
          self.localChildInfo = JSON.parse(JSON.stringify(self.childInfo))
//            self.localChildInfo = self.childInfo;
          self.localChildInfo.chlSex = self.childInfo.chlSex || 1;
          self.localChildInfo.chlAgeStr = self.childInfo.chlAgeStr ||'';
          self.localChildInfo.chlStar = self.childInfo.chlStar || '白羊座';
        }
      });
      // 親子活動
      self.$http.post('/pbap-web/action/news/query/newsList', {
        "pageSize": 8,
        pageIndex: self.$route.params.pageIdx,
        newsType: 2
      }).then((res) => {
        self.newsListInfo = res.body.respInfo.list;
        self.newsList = self.newsListInfo.dataList;
      });

      // 親子活動文章詳情
      if (self.$route.params.newsId) {
        self.$http.post('/pbap-web/action/news/query/newsDetail', {newsId: self.$route.params.newsId}).then((res) => {
          self.newsDetail = res.body.respInfo.newsDetail;
        });
      }
      // 設置
      if (self.$route.params.pageAt == 'setting') {
        this.$validator.updateDictionary({
          en: {
            custom: {
              nickName : {
                required(){
                  return '請填寫昵稱'
                }
              },
              address:{
                required(){
                  return '請填寫收件地址'
                }
              }
            }
          }
        });
      }
    },
    computed: {
      userInfo(){
        return this.$store.state.userInfo
      },
      accountInfo(){
        return this.$store.state.accountInfo
      }
    },
    mounted (){

    },
    components:{
      FileUpload:FileUpload,
      Cropper:Cropper,
    },
    watch: {
      userInfo(){
        if (this.userInfo.loginResult) {
        }
      },
      investMoney(){
        this.investMoney = this.investMoney.toString().replace(/\D/g, '')
      },
      files(){
        this.checkFiles();
      }
    },
    mounted () {

    },
    methods: {
      getPreUrl(){
        var self = this;
        if (self.$route.params.pageIdx > 1) {
          return '/parent-child/activity-list/' + ($route.params.pageIdx * 1 - 1)
        } else {
          return 'javascript:;'
        }
      },
      getNextUrl(totalPage){
        var self = this;
        if (self.$route.params.pageIdx < totalPage) {
          return '/parent-child/activity-list/' + ($route.params.pageIdx * 1 + 1)
        } else {
          return 'javascript:;'
        }
      },
      getChildSex(chlSex){
        if (chlSex == 1) {
          return '男寶寶';
        } else if (chlSex == 0) {
          return '女寶寶';
        } else {
          return '--'
        }
      },
      saveBabyInfo(){
        var self = this;
        self.$validator.validateAll().then((result) => {
          if(result){
            self.$http.post('/pbap-web/action/child/editChild', self.localChildInfo).then(response => {
              self.childInfo = self.localChildInfo;
              self.editBabyInfo = false;
              self.$store.commit('setModal',{
                show:false,
                type:'alert',
                msg:'修改成功'
              });
              self.$store.commit('showModal');
            });
          }
        });
      },
      checkFiles(callback){
        var self  = this;
        self.fileCheck.msg = '';
        if(!self.files[0]){
          self.fileCheck.msg = '請先選擇文件'
        }else if(self.files[0].size / 1024 / 1024 > 4){
          self.fileCheck.msg = '文件太大';
        }else {
          var type = self.files[0].name.match(/^(.*)(\.)(.{1,8})$/)[3];
          type = type.toUpperCase();
          if (type != "JPEG" && type != "PNG" && type != "JPG" && type != "GIF") {
            self.fileCheck.msg = '請上傳JPG、GIF或PNG格式圖片文件';
          }else{
            //  校驗通過
            callback && callback();
          }
        }
      },
      uploadImg(){
        var self = this;
        this.checkFiles(function () {
          self.$refs.upload.upload(self.files[0]).then(function (res) { // 成功上傳
            self.imgCutInfo.filePath = res.response.respInfo.imgUrl;
            self.uploadBabyAvatar = !self.uploadBabyAvatar;
            self.editBabyAvatar = !self.editBabyAvatar;
            setTimeout(function () {
              var image = document.getElementById('uploadAvatar');
              var cropper = new Cropper(image, {
                aspectRatio: 1 / 1,
                zoomable:false,
                viewMode :1,
                crop: function(e) {
                  self.imgCutInfo.imgX = e.detail.x,
                    self.imgCutInfo.imgY = e.detail.y,
                    self.imgCutInfo.imgWidth = e.detail.width,
                    self.imgCutInfo.imgHeight = e.detail.height
                }
              });
            });
          });
        });
      },
      avatarSubmit(){
        var self = this;
        self.$http.post('/pbap-web/action/child/uploadPcCutImg', self.imgCutInfo).then((res) => {
          if (res.body.respInfo) {
          }
        });
      }
    }
  }
</script>
