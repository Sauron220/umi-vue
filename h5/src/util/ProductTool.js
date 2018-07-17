import Swipe from 'swiper'

export default {
  getProductDetail(prdCode,callback){
    var self = this;
    // 产品详情
    self.$http.post('/pbap-web/action/product/query/productDetail', {
      prdCode: prdCode
    }).then((res) => {
      self.productDetail = res.body.respInfo.productDetail;
      if(self.productDetail.prdType != '70'){
        self.showLeftTime = self.getTimeLeft(self.productDetail.colEndTime.replace(new RegExp("-", "gm"), "/"));
        self.showBeginTime = self.getTimeLeft(self.productDetail.colBeginTime.replace(new RegExp("-", "gm"), "/"));
        self.imageList = self.productDetail.verifyDetailList || [];
        setInterval(function () {
          self.showLeftTime = self.getTimeLeft(self.productDetail.colEndTime.replace(new RegExp("-", "gm"), "/"));
          self.showBeginTime = self.getTimeLeft(self.productDetail.colBeginTime.replace(new RegExp("-", "gm"), "/"));
        }, 1000)
      }
      callback && callback();
    });
  },
  getWelfareReminder(prdType){
    var self = this;
    if(self.userInfo.loginResult){
      self.$http.post('/pbap-web/action/customer/welfareReminder', {
        prdType: prdType
      }).then((res) => {
        self.welfareList = res.body.respInfo.welfareList;
      });
    }
  },
  showImgDetail(Swiper){
    this.imgDetailSwipeToggle();
    this.setImgDetailSwipe(Swiper.clickedSlideIndex % 3);
    //document.querySelector('.check-img-detail').style.display = 'block';
  },
  setImgDetailSwipePreNext(Swipe, _self){
    setTimeout(function () {
      if (Swipe.activeIndex == 0) {
        _self.imgDetailSwipe.hasPre = false;
      } else {
        _self.imgDetailSwipe.hasPre = true;
      }
      if (Swipe.activeIndex == _self.$data.imageList.length - 1) {
        _self.imgDetailSwipe.hasNext = false;
      } else {
        _self.imgDetailSwipe.hasNext = true;
      }
    })
  },
  setImgDetailSwipe(idx){
    var _self = this;
    setTimeout(function () {
      window.showImgDetail = new Swipe('.check-img-detail-box', {
        loop: false,
        initialSlide: idx,
        resizeReInit: true,
        simulateTouch: false,
        onSlideChangeEnd(Swipe){
          _self.setImgDetailSwipePreNext(Swipe, _self);
        },
        onFirstInit(Swipe){
          _self.setImgDetailSwipePreNext(Swipe, _self);
        }
      })
    })
    window.showImgDetailPre = function () {
      window.showImgDetail.swipePrev();
    }
    window.showImgDetailNext = function () {
      window.showImgDetail.swipeNext();
    }
  },
  imgDetailSwipeToggle(){
    if (this.imgDetailSwipe.isShow) {
      this.imgDetailSwipe.isShow = false;
    } else {
      this.imgDetailSwipe.isShow = true;
    }
  },
  productRate(defaultRate, rewardRate){
    let rate;
    if (rewardRate != 0 && rewardRate && defaultRate) {
      rate = this.$formatNum(defaultRate, 100).toFixed(1) + '%+' + this.$formatNum(rewardRate, 100).toFixed(1) + '%';
    } else if (rewardRate != 0 && rewardRate && !defaultRate) {
      rate = this.$formatNum(rewardRate, 100).toFixed(1) + '%';
    } else if (defaultRate) {
      rate = this.$formatNum(defaultRate, 100).toFixed(1) + '%'
    }
    return rate || 0;
  },
  productRateSimple(defaultRate, rewardRate){
    let rate;
    if (rewardRate != 0 && rewardRate && defaultRate) {
      rate = (this.$formatNum(defaultRate, 1000) + this.$formatNum(rewardRate, 1000))/10;
    } else if (defaultRate) {
      rate = this.$formatNum(defaultRate, 100)
    }
    rate = this.$fmoney(rate);
    return rate + '%';
  },
  repType(repType){
    switch (repType) {
      case 1:
        return '等额本息'
      case 2:
        return '等额本金'
      case 3:
        return '每月付息到期还本'
      case 4:
        return '每季付息到期还本'
      case 5:
        return '到期还本付息'
    }
  },
  valDelayTypeDays(valDelayType, repDelayType, valDelayDays, repDelayDays){
    valDelayType = valDelayType == "1" ? "T" : "D";
    repDelayType = repDelayType == "1" ? "T" : "D";
    if (valDelayType == "T" && valDelayDays == 0) {
      return "满标放款当天开始计息，遇节假日顺延 (T+0)";
    }
    else if (valDelayType == "D" && valDelayDays == 0) {
      return "满标放款当天开始计息 (D+0)";
    }
    else if (valDelayType == "T" && valDelayDays > 0) {
      return "满标放款后第" + valDelayDays + "天开始计息，遇节假日顺延 (" + valDelayType + "+" + valDelayDays + ")";
    }
    else if (valDelayType == "D" && valDelayDays > 0) {
      return "满标放款后第" + valDelayDays + "天开始计息 (" + valDelayType + "+" + valDelayDays + ")";
    }
  },
  repDelayTypeDays(valDelayType, repDelayType, valDelayDays, repDelayDays){
    valDelayType = valDelayType == "1" ? "T" : "D";
    repDelayType = repDelayType == "1" ? "T" : "D";
    if (repDelayType == "T" && repDelayDays == 0) {
      return "還款到期当天可提现，遇节假日顺延 (T+0)";
    }
    else if (repDelayType == "D" && repDelayDays == 0) {
      return "還款到期当天可提现 (D+0)";
    }
    else if (repDelayType == "T" && repDelayDays > 0) {
      return "還款到期后第" + repDelayDays + "天可提现，遇节假日顺延 (" + repDelayType + "+" + repDelayDays + ")";
    }
    else if (repDelayType == "D" && repDelayDays > 0) {
      return "還款到期后第" + repDelayDays + "天可提现 (" + repDelayType + "+" + repDelayDays + ")";
    }
  },
  getTimeLeft(date){  //倒计时
    let leftTime = new Date(date).getTime(),
      nowTime = new Date().getTime(),
      showTime = Math.abs(nowTime - leftTime);
    if (nowTime >= leftTime) {
      return 0
    } else {
      let dayNum, hourNum, minNum, SecondNum;
      dayNum = ifSingle(parseInt(showTime / (1000 * 60 * 60 * 24)));
      hourNum = ifSingle(parseInt(showTime % (1000 * 60 * 60 * 24) / (1000 * 60 * 60)));
      minNum = ifSingle(parseInt(showTime % (1000 * 60 * 60) / (1000 * 60)));
      SecondNum = ifSingle(parseInt(showTime % (1000 * 60) / (1000)));
      function ifSingle(num) {
        return (num < 10 ? '0' : '') + num
      }
      return dayNum + '天' + hourNum + '时' + minNum + '分' + SecondNum + '秒'
    }
  },
  calcPreEarn(money, rate, day){  //收益计算
    money= money*1
    if(typeof money !== 'number'){
      money = 0;
    }
    var preEarn = money * (rate * 100) * day / (360 * 100);
    if(isNaN(preEarn.toFixed(2))){
      return 0.00
    }else{
      return preEarn.toFixed(2);
    }
  },
  getInvestRecord(obj){
    var self = this;
    self.invData.totalPage=0;
    self.$http.post('/pbap-web/action/investment/query/invList', {
      pageIndex: obj.index,
      pageSize: 10,
      prdCode: self.$route.params.prdCode
    }).then((res) => {
      self.invData = res.body.respInfo.invList;
    });
  },
  allIn(){
    var self = this;
    if(self.productDetail.maxInvAmt == 0){//  单笔最小加入金额  是否有限制
      self.invest = Math.floor(Math.min(self.productDetail.remainAmount,self.accountInfo.balanceAmount));
    }else{
      self.invest = Math.floor(Math.min(self.productDetail.remainAmount,self.productDetail.maxInvAmt,self.accountInfo.balanceAmount));
    }
  },
  goAgreement(){
    window.open('/agreement/'+this.productDetail.prdCode+'/'+this.productDetail.trdNum,
      '_blank','height=768, width=1100,toolbar=no,scrollbars=yes,menubar=no,status=no')
  },
  getCooper(){
    var self = this;
    //self.invData.totalPage=0;
    self.$http.post('/pbap-web/action/investment/query/coupon', {
      cpnProps: self.relAmount,
      pageIndex: 1,
      pageSize: 500,
      prdCode: self.$route.params.prdCode,
      status:0
    }).then((res) => {
      self.couponList = res.body.respInfo.cpnInfo.dataList;
    });
  },
  inTheArray(value){
    var arr = ['2017.03.06', '2017.03.07', '2017.03.08', '2017.03.09', '2017.03.10', '2017.03.11', '2017.03.12'];
    if (arr.indexOf(value) >= 0) {
      return true
    } else {
      return false
    }
  },
  setBuyUrl(value){
    var arr = ['2017.03.06', '2017.03.07', '2017.03.08', '2017.03.09', '2017.03.10', '2017.03.11', '2017.03.12'];
    if (arr.indexOf(value) >= 0) {
      return true
    } else {
      return false
    }
  },
  getTypeName(type){
    switch (type) {
      case 30:
        return '新手专享'
      case 7:
        return '月月喜'
      case 8:
        return '季季宝'
      case 9:
        return '双季盈'
      case 10:
        return '年年余'
      case 40:
        return '尊享计划'
      case 70:
        return '体验标'
    }
  },
  buyHandle(confirmUrl){
    var self = this;
    self.$store.commit('setModal', {
      show: false,
      type: 'confirm',
      msg: '您的购买是否成功？',
      cancelUrl: '/helpCenter#9',
      cancelText: '遇到问题',
      confirmUrl: confirmUrl || '#',
      confirmText: '购买成功'
    });
    self.$store.commit('showModal');
    self.buyConfirm = false;
  },
  helpTextToggle(){
    this.showHelpText = !this.showHelpText;
  },
  isOpenAccount(goUrl, code){
    let self = this;
    self.$http.post('/pbap-web/action/customer/query/custAuthInfo', {}).then((res) => {
      self.custInfo = res.body.respInfo.custInfo;
      self.tpStatus = self.custInfo.tpStatus;
      self.activateStatus = self.custInfo.activateStatus;
      if(self.tpStatus == 0){
        self.isOpen = true;
        self.vOpenAcc = true;
        self.isGoUrl = goUrl
      }
      else if(self.activateStatus == 0){
        self.isOpen = true;
        self.vOpenAcc = false;
        self.isGoUrl = goUrl
      }
      else if(goUrl && code){
        window.location.href = '/' + goUrl + '/' + code
      }
      else if(goUrl){
        window.location.href = '/' + goUrl
      }
    });
  },
}
