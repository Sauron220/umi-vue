<template>
  <!--<div class="right-tool">-->
  <!--<a class="item item1" href="/calc" target="_blank"></a>-->
  <!--<div class="item item2">-->
  <!--<img src="../assets/images/gotoapp.png">-->
  <!--</div>-->
  <!--<div class="item item4 udsk"></div>-->
  <!--<div class="item item3" @click="toTop()"></div>-->
  <!--</div>-->
</template>

<script>

  // import jQuery from 'jquery'

  export default {
    name: 'RightFloat',
    data () {
      return {
        prdId: parseInt(Math.random())
      }
    },
    created(){
    },
    mounted () {
      if (this.myBrowser() == "IE8" || this.myBrowser() == "IE9") {
        document.querySelector('.udsk').style.display = 'none'
      } else {
        try {
          (function (a, h, c, b, f, g) {
            a['UdeskApiObject'] = f;
            a[f] = a[f] || function () {
              (a[f].d = a[f].d || []).push(arguments)
            };
            g = h.createElement(c);
            g.async = 1;
            g.src = b;
            c = h.getElementsByTagName(c)[0];
            c.parentNode.insertBefore(g, c)
          })(window,document, 'script', 'https://zhongkejf.udesk.cn/im_client/js/udeskApi.js', 'ud');
          ud({
            'code': '171jhhh9',
            'link': 'https://zhongkejf.udesk.cn/im_client',
            'isInvite': true,
            'mode': 'inner',
            'color': '#307AE8',
            'pos_flag': 'crb',
            'onlineText': '聯系客服，在線咨詢',
            'offlineText': '客服下班，請留言',
            'targetSelector': '.udsk',
            'pop': {
              'direction': 'top',
              'arrow': {
                'top': 0,
                'left': '80%'
              }
            },
            'panel': {
              "css": {
                /* "top": "0", */"right": "120px"
              }
            },
            'mobile': { // 為響應式布局，提供pc、mobile自定制
              'mode': 'blank',
              'color': '#307AE8',
              'pos_flag': 'crb',
              'onlineText': '聯系客服，在線咨詢',
              'offlineText': '客服下班，請留言',
              'pop': {
                'direction': 'top',
                'arrow': {
                  'top': 0,
                  'left': '70%'
                }
              }
            }
          });
        } catch (err){
          window.console && console.log(err);
        }
      }
    },
    methods: {
      showModal: function () {
//        this.$modal.Show({isAlert:true});
        this.$parent.showModal();
      },
      toTop: function () {
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0
      },
      myBrowser: function () {
        var userAgent = navigator.userAgent; // 取得瀏覽器的userAgent字符串
        var isOpera = userAgent.indexOf("Opera") > -1; // 判斷是否Opera瀏覽器
        var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera; // 判斷是否IE瀏覽器
        var isFF = userAgent.indexOf("Firefox") > -1; // 判斷是否Firefox瀏覽器
        if (isIE) {
          var IE5 = IE55 = IE6 = IE7 = IE8 = false;
          var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
          reIE.test(userAgent);
          var fIEVersion = parseFloat(RegExp["$1"]);
          IE55 = fIEVersion == 5.5;
          IE6 = fIEVersion == 6.0;
          IE7 = fIEVersion == 7.0;
          IE8 = fIEVersion == 8.0;
          IE9 = fIEVersion == 9.0;
          if (IE55) {
            return "IE55";
          }
          if (IE6) {
            return "IE6";
          }
          if (IE7) {
            return "IE7";
          }
          if (IE8) {
            return "IE8";
          }
          if (IE9) {
            return "IE9";
          }
        } // isIE end
        if (isFF) {
          return "FF";
        }
        if (isOpera) {
          return "Opera";
        }
      } // myBrowser() end
    }
  }
</script>
