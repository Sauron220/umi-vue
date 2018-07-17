const commonTool = {
  install(Vue, options){
    Vue.prototype.$$ = function (selector) {
      return document.querySelectorAll(selector);
    }
    // 金額小數點後兩位
    Vue.prototype.$fmoney = function (s, n) {
      if(!s){
        s = 0;
      }
      n = n > 0 && n <= 20 ? n : 2;
      // 多保留壹位小數，然後截掉最後壹位，避免出現四舍五入
      var tempNum = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n+1);
      s = tempNum.substring(0,tempNum.lastIndexOf('.')+n+1) + "";
      let l = s.split(".")[0].split("").reverse(), r = s.split(".")[1];
      let t = "";
      for (let i = 0; i < l.length; i++) {
        t += l[i] + ( (i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
      }
      return t.split("").reverse().join("") + "." + r;
    }

    // 解決小數點計算問題
    Vue.prototype.$formatNum = function (arg1, arg2) {
      let m = 0, s1 = arg1.toString(), s2 = arg2.toString();
      try {
        m += s1.split(".")[1].length
      } catch (e) {
      }
      try {
        m += s2.split(".")[1].length
      } catch (e) {
      }
      return Number(s1.replace(".", "")) * Number(s2.replace(".", ""))
        / Math.pow(10, m)
    }
    // 整數千分位
    Vue.prototype.$fmoneyFormat = function (s, n) {
      if(!s){
        s = 0;
      }
      n = n > 0 && n <= 20 ? n : 2;
      // 多保留壹位小數，然後截掉最後壹位，避免出現四舍五入
      var tempNum = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n);
      s = tempNum.substring(0,tempNum.lastIndexOf('.')+n+1) + "";
      var l = s.split(".")[0].split("").reverse(), r = s.split(".")[1];
      var t = "";
      for (var i = 0; i < l.length; i++) {
        t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
      }
      if (parseFloat(r) == 0) {
        return t.split("").reverse().join("");
      } else {
        return parseFloat(t.split("").reverse().join("") + "." + r);
      }
    }
    // 輸入money
    Vue.prototype.$typingFormatAmountSimple = function (amount) {
      if (amount) {
        amount = amount.toString().replace(/[^0-9|\.]/g, '');
        var suffix = "";
        var replaceStr = "";
        var i = amount.indexOf(".");
        if (i != -1) {
          replaceStr = amount.substring(i, amount.length);
          suffix = "." + replaceStr.replace(/[.]/g, "").substring(0, 2);
          amount = amount.replace(replaceStr, "");
        }

        amount = amount.toString().replace(/\$|\,/g, '');
        if (!amount || isNaN(amount)) {
          return null;
        }

        var sign = (amount == (amount = Math.abs(amount)));
        amount = Math.floor(amount * 100 + 0.50000000001);
        amount = Math.floor(amount / 100).toString();
        return ((sign) ? '' : '-') + amount + suffix;
      }
    }
    Vue.prototype.getCookie = function (name) {
      var arr = document.cookie.match(new RegExp("(^| )" + name
        + "=([^;]*)(;|$)"));
      if (arr != null)
        return (arr[2]);
      return null;
    }
    Vue.prototype.setCookie = function (name, value, expTime) { // 兩個參數，壹個是cookie的名子，壹個是值
      if (name != "usernamekeyLJH") {
        var exp = new Date();
        var defaultExp = exp.getTime() + 10 * 24 * 60 * 60 * 1000;
        exp.setTime(expTime || defaultExp);// 過期時間 2分鐘
      } else {
        var maxDays = 30 * 24 * 60 * 60 * 1000; // 此 cookie 將被保存 30 天
        var exp = new Date(); // new Date("December 31, 9998");
        var defaultExp = exp.getTime() + maxDays;
        exp.setTime(expTime || defaultExp);
      }
      document.cookie = name + "=" + escape(value) + ";expires="
        + exp.toGMTString() + ";path=/";
      ;
    }

    Vue.prototype.rememberKey = {
      userNameKey : "usernamekeyZKP",
      indexNumKey : "1",
    };

    Vue.prototype.productUrl = function(prdType){
      if (prdType == 40) {
        return '/private/'
      } else if (prdType == 70) {
        return '/experience/'
      } else {
        return '/product/'
      }
    };
    /*Vue.directive('number', {
     bind (el, binding, vnode, oldVnode) {
     // el.value = el.value.replace(/\D/g,'')
     }
     })*/
  }
}
export default commonTool;
