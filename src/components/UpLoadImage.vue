<template>
  <div class="container info-nav upLoadImage">
    <div class="clearfix"></div>
    <div :class="{'imgLod':isLoding,'modal-backdrop':isLoding}"></div>
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
                <file-upload name="childfile" class="btn btn-info" v-model="files"
                             :post-action="'/pbap-web/action/idInfo/uploadImg'"
                             ref="upload" accept="image/gif, image/jpeg, image/jpg, image/png">選擇
                </file-upload>
              </div>
            </div>
          </div>
          <div class="form-group">
            <div class="col-xs-9 col-xs-offset-3">
              <small class="help-block">您可以上傳JPG、GIF或PNG文件，圖片大小不可超過1M</small>
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
  </div>
</template>

<script>
  import FileUpload from 'vue-upload-component'
  import Cropper from 'cropperjs'

  export default {
    name: 'UploadImage',
    data() {
      return {
        isLoding:false,
        nameUrl1: '',
        editBabyAvatar: false,
        uploadBabyAvatar: false,
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

    },
    computed: {
      urlIndex() {
        return this.$store.state.urlIndex;
      },
    },
    mounted() {
    },
    components: {
      FileUpload: FileUpload,
      Cropper: Cropper,
    },
    watch: {
      files() {
        // this.checkFiles();
      },
    },
    methods: {
      checkFiles(callback) {
        var self = this;
        self.fileCheck.msg = '';
        if (!self.files[0]) {
          self.fileCheck.msg = '請先選擇文件'
        } else if (self.files[0].size / 1024 / 1024 > 1) {
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
          self.uploadBabyAvatar = !self.uploadBabyAvatar;
          self.isLoding = true;
          self.$refs.upload.upload(self.files[0]).then(function (res) { // 成功上傳
            self.imgCutInfo.filePath = res.response.respInfo.imgUrl;
            console.log('self.urlIndex', self.urlIndex);
            if (self.urlIndex == 1) {
              self.$store.commit('setnameUrl1', res.response.respInfo.imgUrl);
            } else if (self.urlIndex == 2) {
              self.$store.commit('setnameUrl2', res.response.respInfo.imgUrl);
            } else if (self.urlIndex == 3) {
              self.$store.commit('setnameUrl3', res.response.respInfo.imgUrl);
            }
            self.isLoding = false;
            // self.$emit('change',res.response.respInfo.imgUrl);

            /*self.editBabyAvatar = !self.editBabyAvatar;*/
            console.log('res', res.response.respInfo);
            // this.$parent.imgUrl1 = res.response.respInfo.imgUrl;

            /*  setTimeout(function () {
                var image = document.getElementById('uploadAvatar');
                var cropper = new Cropper(image, {
                  aspectRatio: 1 / 1,
                  zoomable: false,
                  viewMode: 1,
                  crop: function (e) {
                    // console.log(e)
                    self.imgCutInfo.imgX = e.detail.x,
                      self.imgCutInfo.imgY = e.detail.y,
                      self.imgCutInfo.imgWidth = e.detail.width,
                      self.imgCutInfo.imgHeight = e.detail.height
                  }
                });
              },100);*/
          });
        });
      },
      avatarSubmit() {
        var self = this;
        console.log(self.imgCutInfo)
        self.$http.post('/pbap-web/action/idInfo/uploadImg', self.imgCutInfo).then((res) => {
          if (res.body.respInfo) {
            console.log(res)
            self.editBabyAvatar = !self.editBabyAvatar;
            // location.href = ''
          }
        });
      },
      showUploadBabyAvatar() {
          this.files = [];
        this.uploadBabyAvatar = true;
      }
    }
  }
</script>
