<template>
  <div>
    <div class="container info-nav" id="infoNav">
      <div class="parent-child-user-info">
        <div class="img-box">
          <a class="avatar" href="javascript:;" @click="showAvatarEditor()">
            <img v-if="childInfo.imgUrl" :src="childInfo.imgUrl" class="img-responsive" alt="">
            <img v-if="childInfo.chlSex == 1" src="../assets/images/parent-child/avatar-male.png" class="img-responsive"
                 alt="">
            <img v-if="!childInfo.chlSex || childInfo.chlSex == 0 "
                 src="../assets/images/parent-child/avatar-female.png" class="img-responsive" alt="">
          </a>
          <a class="level cursor" href="javascript:;" @click="showLoginConfirm" v-if="userInfo.loginResult==0">
            <img :src="'/static/img/parent-child/level'+(childInfo.grade || 0)+'.png'" alt="level">
          </a>
          <a class="level cursor" href="/parent-child/task" v-if="userInfo.loginResult!=0">
            <img :src="'/static/img/parent-child/level'+(childInfo.grade || 0)+'.png'" alt="level">
          </a>
        </div>
        <div class="info">
          <div class="name ell">{{childInfo.nickName || '--'}}</div>
          <div class="id">ID:{{childInfo.cusMobile || '--'}}</div>
          <div class="pro-bar-w">
            <div class="pro-bar-n"></div>
          </div>
          <div class="empiric-value">{{childInfo.empiricValue || 0}}/{{childInfo.totalEmpiricValue || 10000}}</div>
        </div>
      </div>
      <ul class="list-inline parent-child-nav">
        <li>
          <router-link :to="{ name: 'PlanContent'}">
            <img class="img-responsive" src="../assets/images/parent-child/male/parent-child-nav1.png"
                 alt="">
          </router-link>
        </li>
        <li>
          <a href="/parent-child/plan-content#comment">
            <img class="img-responsive" src="../assets/images/parent-child/male/parent-child-nav5.png"
                 alt="">
          </a>
        </li>
        <li>
          <a href="javascript:;" @click="showLoginConfirm" v-if="userInfo.loginResult==0">
            <img class="img-responsive" src="../assets/images/parent-child/male/parent-child-nav6.png"
                 alt="">
          </a>
          <router-link :to="{ name: 'Task'}" v-if="userInfo.loginResult!=0">
            <img class="img-responsive" src="../assets/images/parent-child/male/parent-child-nav6.png"
                 alt="">
          </router-link>
        </li>
        <li>
          <a href="javascript:;" @click="showLoginConfirm" v-if="userInfo.loginResult==0">
            <img class="img-responsive" src="../assets/images/parent-child/male/parent-child-nav3.png"
                 alt="">
          </a>
          <router-link :to="{ name: 'Setting'}" v-if="userInfo.loginResult!=0">
            <img class="img-responsive" src="../assets/images/parent-child/male/parent-child-nav3.png"
                 alt="">
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'ParentChildCourse', params: { pageIdx:1}}">
            <img class="img-responsive" src="../assets/images/parent-child/male/parent-child-nav7.png"
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
          <a href="javascript:;" @click="planIntro = true">
            <img class="img-responsive" src="../assets/images/parent-child/male/parent-child-nav4.png"
                 alt="">
          </a>
        </li>
      </ul>
    </div>

    <div class="clearfix"></div>
    <div id="uploadImg" class="avatar-set-modal upload-img" v-if="uploadBabyAvatar">
      <div class="modal-backdrop fade in"></div>
      <div class="modal-dialog">
        <div class="modal-header">請選擇圖片3
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
                <file-upload name="childfile" class="btn btn-info" v-model="files"
                             :post-action="'/pbap-web/action/child/uploadImg'"
                             ref="upload" accept="image/gif, image/jpeg, image/jpg, image/png">選擇
                </file-upload>
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
                  <input type="radio" v-model="chlSex" id="male" name="sex" value="1">男寶寶
                </div>
              </label>
            </li>
            <li>
              <label for="female">
                <div class="img-box">
                  <img src="../assets/images/parent-child/male/parent-child-female.png" alt="">
                </div>
                <div class="radio">
                  <input type="radio" v-model="chlSex" id="female" name="sex" value="0">女寶寶
                </div>
              </label>
            </li>
          </ul>
          <div class="text-center">
            <button class="btn btn-info btn-male btn-lg" id="setSex" @click="selectSex">確認</button>
          </div>
          <div class="tip text-center">獎勵提示：去“設置板塊”完成其他資料設置還能獲取壹張加息券哦！</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import FileUpload from 'vue-upload-component'
  import Cropper from 'cropperjs'
  import ParentChildTool from '../util/ParentChildTool';

  export default {
    name: 'ParentChildNav',
    data() {
      return {
        editBabyAvatar: false,
        planIntro: false,
        task: '',
        uploadBabyAvatar: false,
        sexChoice: false,
        chlSex: '',
        fileCheck: {msg: ''},
        files: [],
        imgCutInfo: {
          filePath: '',
          imgX: '',
          imgY: '',
          imgWidth: '',
          imgHeight: '',
          filePath: ''
        }
      }
    },
    created() {
      var self = this;
      self.$http.post('/pbap-web/action/child/cusChildInfo', {}).then((res) => {
        if (res.body.respInfo.loginType != 0) {
          self.$store.commit('setChildInfo', res.body.respInfo.childInfo);
          if (parseFloat(self.childInfo.empiricValue) > parseFloat(self.childInfo.totalEmpiricValue)) {
            $(".pro-bar-n").width("100%");
          } else {
            $(".pro-bar-n").width((self.childInfo.empiricValue / self.childInfo.totalEmpiricValue) * 100 + "%");
          }
        }
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
      }
    },
    mounted() {
    },
    components: {
      FileUpload: FileUpload,
      Cropper: Cropper,
    },
    watch: {
      files() {
        this.checkFiles();
      },
      userInfo() {
        var self = this;
        if (self.userInfo.loginResult) {
          self.task = '/parent-child/task';
        } else {
          self.taskAction = self.showLoginConfirm
          self.task = 'javascript:;';
        }
      }
    },
    methods: {
      showLoginConfirm: ParentChildTool.showLoginConfirm,
      showAvatarEditor() {
        if (this.userInfo.loginResult) {
          this.uploadBabyAvatar = !this.uploadBabyAvatar;
        }
      },
      checkFiles(callback) {
        var self = this;
        self.fileCheck.msg = '';
        if (!self.files[0]) {
          self.fileCheck.msg = '請先選擇文件'
        } else if (self.files[0].size / 1024 / 1024 > 4) {
          self.fileCheck.msg = '文件太大';
        } else {
          var type = self.files[0].name.match(/^(.*)(\.)(.{1,8})$/)[3];
          type = type.toUpperCase();
          if (type != "JPEG" && type != "PNG" && type != "JPG" && type != "GIF") {
            self.fileCheck.msg = '請上傳JPG、GIF或PNG格式圖片文件';
          } else {
            //  校驗通過
            callback && callback();
          }
        }
      },
      uploadImg() {
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
                zoomable: false,
                viewMode: 1,
                crop: function (e) {
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
      avatarSubmit() {
        var self = this;
        self.$http.post('/pbap-web/action/child/uploadPcCutImg', self.imgCutInfo).then((res) => {
          if (res.body.respInfo) {
            // location.href = ''
          }
        });
      },
      showUploadBabyAvatar() {
        this.uploadBabyAvatar = true;
      },
      showSexChoice() {
        this.sexChoice = true;
      },
      selectSex() {
        var self = this;
        if (self.chlSex || self.chlSex === 0) {
          self.$http.post('/pbap-web/action/child/editChild', {
            chlSex: self.chlSex,
            typeStr: 2
          }).then((res) => {
            if (res.body.respInfo) {
              self.sexChoice = false;
              location.reload();
            }
          });
        } else {
          self.$store.commit('setModal', {
            type: 'alert',
            msg: '請選擇寶寶性別',
          });
          self.$store.commit('showModal');
        }
      }
    }
  }
</script>
