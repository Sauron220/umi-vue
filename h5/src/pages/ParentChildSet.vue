<template>
    <div class="wrap parentChildSet-content" :class="{'boy_set':childInfo.chlSex}">
        <div class="mask" v-if="isSetName || isSetAddress || isSetStar"></div>
        <div class="wrap baby_set" id="infoForm">
            <div class="set_pop set_nickname" v-show="isSetName">
                <div class="pos red-form">
                    <span class="close_set close_pop" @click="isSetName = false;"></span>
                    <h1>昵称</h1>
                    <input type="text" id="checkNikeName" class="nickName" maxlength="15" v-model="babyName" name="babyName"
                           v-validate="{rules:{required:true,babyName:true}}">
                    <i class="p-error">{{errors.first('babyName')}}</i>
                    <span class="in_txt">昵称必须由中文、字母、数字和下划线组成</span>
                    <button @click="setBabyInfo(1)" class="upload_btn confirm_btn bb_bg girl_set"
                            :disabled="errors.any()">确定</button>
                    <i class="input_clear nickName_clear" @click="babyName = '';"></i>
                </div>
            </div>

            <div class="set_box set_constellation" :class="{'set_box_high':isSetStar}" v-if="isSetStar">
                <div class="pos">
                    <div class="top clearfix">
                        <span class="close_set close_submit" @click="isSetStar = false;">取消</span>
                        <span class="upload_btn confirm_submit bb_txt" @click="setBabyInfo('4')">确定</span>
                    </div>
                    <div class="bottom twelve_zodiac">
                        <span class="set_bar" :class="{'set_bar_high':babyStar == '白羊座'}" @click = "babyStar = '白羊座';">白羊座</span>
                        <span class="set_bar" :class="{'set_bar_high':babyStar == '金牛座'}" @click = "babyStar = '金牛座';">金牛座</span>
                        <span class="set_bar" :class="{'set_bar_high':babyStar == '双子座'}" @click = "babyStar = '双子座';">双子座</span>
                        <span class="set_bar" :class="{'set_bar_high':babyStar == '巨蟹座'}" @click = "babyStar = '巨蟹座';">巨蟹座</span>
                        <span class="set_bar" :class="{'set_bar_high':babyStar == '狮子座'}" @click = "babyStar = '狮子座';">狮子座</span>
                        <span class="set_bar" :class="{'set_bar_high':babyStar == '处女座'}" @click = "babyStar = '处女座';">处女座</span>
                        <span class="set_bar" :class="{'set_bar_high':babyStar == '天秤座'}" @click = "babyStar = '天秤座';">天秤座</span>
                        <span class="set_bar" :class="{'set_bar_high':babyStar == '天蝎座'}" @click = "babyStar = '天蝎座';">天蝎座</span>
                        <span class="set_bar" :class="{'set_bar_high':babyStar == '射手座'}" @click = "babyStar = '射手座';">射手座</span>
                        <span class="set_bar" :class="{'set_bar_high':babyStar == '摩羯座'}" @click = "babyStar = '摩羯座';">摩羯座</span>
                        <span class="set_bar" :class="{'set_bar_high':babyStar == '水瓶座'}" @click = "babyStar = '水瓶座';">水瓶座</span>
                        <span class="set_bar" :class="{'set_bar_high':babyStar == '双鱼座'}" @click = "babyStar = '双鱼座';">双鱼座</span>
                    </div>
                </div>
            </div>

            <div class="set_pop set_address" v-if="isSetAddress">
                <div class="pos red-form">
                    <span class="close_set close_pop" @click="isSetAddress = false;"></span>
                    <h1>收件地址</h1>
                    <textarea class="address" id="checkAddress" maxlength="50" v-model="babyAddress"
                              name="babyAddress" v-validate="{rules:{required:true}}"></textarea>
                    <i class="p-error">{{errors.first('babyAddress')}}</i>
                    <button @click="setBabyInfo(5)" :disabled="errors.any()"
                       class="upload_btn confirm_btn bb_bg girl_set">确定</button>
                    <i class="input_clear address_clear" @click="babyAddress = '';"></i>
                </div>
            </div>
            <header>
                <div class="nav-box mui-bar baby_top_title bb_bg" style="color:#fff">
                    <a href="/parent-child" class="go-back mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
                    <h1 class="mui-title">设置宝宝资料</h1>
                </div>
            </header>
            <section class="set_baby_content">
                <div class="set_bar" id="theOne">
                    <h2>头像</h2>
                    <img v-if="childInfo.imgUrl" :src="childInfo.imgUrl" class="previewImg">
                    <img v-if="!childInfo.imgUrl && childInfo.chlSex == 1" src="../assets/images/baby_boy_face.png" class="previewImg">
                    <img v-if="!childInfo.imgUrl && childInfo.chlSex == 0" src="../assets/images/baby_girl_face.png" class="previewImg">
                    <input type="file" id="change" accept="image" @change="change">
                    <label for="change"></label>
                    <div class="container" v-show="panel">
                        <div class="pos">
                            <div class="img_canvas" style="height: 300px;overflow:auto">
                                <img id="image" :src="childInfo.imgUrl" alt="Picture">
                            </div>
                            <div class="crop_preview">
                                <img id="crop_preview" :src="childInfo.imgUrl">
                            </div>
                        </div>
                        <div id="crop-close" @click="this.location.reload()">退出</div>
                        <div id="crop-cut" @click="crop">裁剪并上传</div>
                    </div>
                </div>

                <div class="set_bar set-in" id="openNickName" @click="isSetName = true">
                    <h2>昵称</h2>
                    <span class="nickName">{{childInfo.nickName}}</span>
                </div>
                <div class="set_bar set-in set_bar_no">
                    <h2>性别</h2>
                    <span class="chlSex">{{getChildSex(childInfo.chlSex)}}</span>
                </div>
                <div class="set_bar set-in set_bar_no">
                    <h2>年龄</h2>
                    <span class="chlAge">{{childInfo.chlAgeStr || '--'}}</span>
                </div>
                <div class="set_bar set-in" id="openConstellation" @click="isSetStar = true;">
                    <h2>星座</h2>
                    <span class="chlStar">{{childInfo.chlStar || '--'}}</span>
                </div>
                <div class="set_bar set-in" id="openAdress" @click="isSetAddress = true;">
                    <h2>收件地址</h2>
                    <span class="address">{{childInfo.address || '--'}}</span>
                </div>
            </section>
            <footer class="bottom_info fixed-bottom">
                <h2>资料设置任务奖励说明：</h2>
                <p>完成所有资料设置（头像、昵称、宝宝性别、宝宝年龄、宝宝星座、收件地址），即可获得加息券一张，加息额度1%。所得奖励完成任务后系统自动发放，可能会有延迟，请耐心等待。</p>
                <p>请至 <a href="/parentChildMission">成长任务</a> 查看奖励详情。</p>
            </footer>
        </div>

    </div>
</template>

<script>
  /*import FileUpload from 'vue-upload-component'*/
  import Cropper from 'cropperjs'

  const dictionary={
    en:{
      custom:{
        babyName:{
          required() {
            return '请填写昵称'
          },
        },
        babyAddress:{
          required() {
            return '请输入地址'
          },
        }
      }
    }
  }

  export default {
    name: 'ParentChildSet',
    data() {
      return {
        isSetAddress: false,
        isSetName: false,
        isSetStar:false,
        babyName: '',
        babyStar: '',
        babyAddress: '',
        picValue:'',
        cropper:'',
        croppable:false,
        panel:false,
        url:'',
      }
    },
    created() {
      let self = this;
      self.getBabyInfo();
    },
    components:{
      /*FileUpload:FileUpload,*/
      Cropper:Cropper,
    },
    computed: {
      childInfo() {
        return this.$store.state.childInfo
      },
    },
    mounted () {
      //初始化这个裁剪框
      var self = this;
      self.$validator.updateDictionary(dictionary);

      var image = document.getElementById('image');
      this.cropper = new Cropper(image, {
        aspectRatio: 1,
        preview: '.crop_preview',
        /*viewMode: 1,
        background:true,
        zoomable:false,*/
        ready: function () {
          self.croppable = true;
        }
      });
    },
    methods: {
      getChildSex(chlSex) {
        if (chlSex == 1) {
          return '男宝宝';
        } else if (chlSex == 0) {
          return '女宝宝';
        } else {
          return '--'
        }
      },
      setBabyInfo(type) {
        let self = this;
        self.$http.post('/pbap-web/action/child/editChild', {
          "nickName": self.babyName,
          "chlStar": self.babyStar,
          "address": self.babyAddress,
          "typeStr": type
        }).then((res) => {
          self.isSetAddress = false;
          self.isSetName = false;
          self.isSetStar = false;
          self.getBabyInfo();
        });
      },
      getBabyInfo(){
        let self = this;
        self.$http.post('/pbap-web/action/child/cusChildInfo', {}).then((res) => {
          if (res.body.respInfo.loginType != 0) {
            self.$store.commit('setChildInfo', res.body.respInfo.childInfo);
            self.babyName = res.body.respInfo.childInfo.nickName;
            self.babyAddress = res.body.respInfo.childInfo.address;
            self.babyStar = res.body.respInfo.childInfo.chlStar;
          }
        });
      },

      getObjectURL (file) {
        var url = null ;
        if (window.createObjectURL!=undefined) { // basic
          url = window.createObjectURL(file) ;
        } else if (window.URL!=undefined) { // mozilla(firefox)
          url = window.URL.createObjectURL(file) ;
        } else if (window.webkitURL!=undefined) { // webkit or chrome
          url = window.webkitURL.createObjectURL(file) ;
        }
        return url ;
      },
      change (e) {
        let files = e.target.files || e.dataTransfer.files;
        if (!files.length) return;
        let imgSize = (files[0].size/1024*100)/100;
        let type = files[0].name.match(/^(.*)(\.)(.{1,8})$/)[3];
        type = type.toUpperCase();
        if (type != "JPEG" && type != "PNG" && type != "JPG" && type != "GIF") {
          this.$store.commit('setModal', {
            type: 'alert',
            msg: '请上传JPG、GIF或PNG格式图片文件',
          });
          this.$store.commit('showModal');
          this.panel = false;
          return
        } else if(imgSize > 4096){
          this.$store.commit('setModal', {
            type: 'alert',
            msg: '上传图片大小不可上传4M',
          });
          this.$store.commit('showModal');
          this.panel = false;
          return
        }
        this.panel = true;
        this.picValue = files[0];
        this.childInfo.imgUrl = this.getObjectURL(this.picValue);
        //每次替换图片要重新得到新的url
        if(this.cropper){
          this.cropper.replace(this.childInfo.imgUrl);
        }
        this.panel = true;
      },
      crop () {
        let self = this;
        this.panel = false;
        var croppedCanvas;
        var roundedCanvas;

        if (!this.croppable) {
          return;
        }
        // Crop
        croppedCanvas = this.cropper.getCroppedCanvas();
        // Round
        roundedCanvas = this.getRoundedCanvas(croppedCanvas);

        this.childInfo.imgUrl = roundedCanvas.toDataURL("image/jpeg");

        setTimeout(function(){
          self.postImg(self.childInfo.imgUrl)
        },100)
        //alert(this.childInfo.imgUrl)

      },
      getRoundedCanvas (sourceCanvas) {
        var canvas = document.createElement('canvas');
        var context = canvas.getContext('2d');
        var width = sourceCanvas.width;
        var height = sourceCanvas.height;

        canvas.width = width;
        canvas.height = height;

        context.imageSmoothingEnabled = true;
        context.drawImage(sourceCanvas, 0, 0, width, height);
        context.globalCompositeOperation = 'destination-in';
        context.beginPath();
        context.arc(width / 2, height / 2, Math.min(width, height) / 2, 0, 2 * Math.PI, true);
        context.fill();

        return canvas;
      },
      postImg (childfile) {
        var self = this;
        self.$http.post('/pbap-web/action/child/uploadCutImg',{'childfile': childfile}).then((res) => {
          if (res.body.respInfo) {
            location.reload();
          }
        });
      }
    },

  }
</script>
