import {Validator} from 'vee-validate';
// custom validate
Validator.extend('pwd', {
  getMessage: field => '登錄密碼由6-20位數字與字母的組合',
  validate: value => {
  return /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]*$/.test(value) && /^(\w){6,20}$/.test(value)
}
});
Validator.extend('payPwd', {
  getMessage: field => '支付密碼由6-20位數字與字母的組合',
  validate: value => {
  return /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]*$/.test(value) && /^(\w){6,20}$/.test(value)
}
});
Validator.extend('phoneNum', {
  getMessage: field => '手機號碼格式不正確',
  validate: value => {
  // return /^0?1[3|4|5|7|8][0-9]\d{8}$/.test(value);
    return /^0?09[0-9]\d{7}$/.test(value);
}
});

Validator.extend('emailPwd', {
  getMessage: field => '郵箱格式不正確',
  validate: value => {
  return /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/.test(value);
}
});

Validator.extend('lessThan', {
  getMessage: field => '輸入有誤',
  validate: (value,flag) => {
  return value<=flag[0];
}
});
Validator.extend('moreThan', {
  getMessage: (field,args) => {
  return '輸入有誤'
},
  validate: (value,args) => {
  return value>=args[0];
}
});
Validator.extend('moreThan2', {
  getMessage: (field,args) => {
  return '輸入有誤'
},
  validate: (value,args) => {
  return value>args[0];
}
});
Validator.extend('investRule', {
  getMessage: (field,args,data) => {
  if(args[1]==0){   //無最大金額限制
  if(args [0]<=args [2]){ //剩余金額大於起投金額
    if(args [4]<args [0]){  //輸入金額小於起投金額
      return "最低加入金額為" + args[0] + "元"
    }else {
      if(args [3]>args[2]){  // 帳戶餘額大於產品剩余金額
        return "產品剩余金額為" + args[2] + "元"
      }else{
        return "您的可用餘額不足，請去匯款"
      }
    }
  }else{  //剩余金額小於起投金額
    if(args [3]<args [2]){  // 帳戶餘額小於起投金額
      return "您的可用餘額不足，請去匯款"
    }else{
      return '產品剩余金額為'+args[2]+"元"
    }
  }
}else{  //有最大金額限制
  if(args [0]<=args [2]){ //剩余金額大於起投金額
    if(args [4]<args [0]){  //輸入金額小於起投金額
      return "最低加入金額為" + args[0] + "元"
    }else {
      //最大加入金額 、剩余金額和帳戶餘額比較
      if(args[1]==Math.min(args[1],args[2],args[3])){        //最大加入金額 三者最小
        return "最高加入金額為" + args[1] + "元"
      }else if(args[2]==Math.min(args[0],args[1],args[2])){  //剩余金額 三者最小
        return "產品剩余金額為" + args[2] + "元"
      }else if(args[3]==Math.min(args[0],args[1],args[2])){  //帳戶餘額 三者最小
        return "您的可用餘額不足，請去匯款"
      }
    }
  }else{  //剩余金額小於起投金額
    if(args [3]<args [2]){  // 帳戶餘額小於起投金額
      return "您的可用餘額不足，請去匯款"
    }else{
      return '產品剩余金額為'+args[2]+"元"
    }
  }
}
},
validate: (value,args) => {
  if(args[1]==0){  //無最大金額限制
    if(args [0]<=args [2]){  //剩余金額大於起投金額
      // 投資金額小於剩余金額和帳戶餘額  且大於起投金額
      return value*1<=Math.min(args[2],args[3]) && value*1>=args[0];
    }else{  //剩余金額小於起投金額 只能投資剩余金額  且帳戶餘額大於剩余金額
      return value*1==args [2] && args [3]>args [2];
    }
  }else{  //有最大金額限制
    if(args [0]<=args [2]){  //剩余金額大於起投金額
      return value*1<=Math.min(args[1],args[2],args[3]) && value*1>=args[0];
    }else{   //剩余金額小於起投金額 只能投資剩余金額
      return value*1==args [2] && args [3]>args [2];
    }
  }
}
});
Validator.extend('nickName', {
  getMessage: (field) => {
  return '請輸入正確的昵稱'
},
  validate: (value) => {
  return /^(_*[a-zA-Z0-9\u4e00-\u9fa5]+[a-zA-Z0-9_\u4e00-\u9fa5]*)$/.test(value);
}
});
Validator.extend('rateCheck', {
  getMessage: (field) => {
  return '利率範圍為0.01%至99.99%'
},
  validate: (value) => {
  return /^[1-9]\d{0,3}\.\d$|^[1-9]\d{0,2}\.\d{2}$|^[1-9]\d{0,1}$|^[0]\.\d{1,2}$/.test(value);
}
});
Validator.extend('chinese', {
  getMessage: field => '姓名格式不正確',
  validate: value => {
  return /^[\u2E80-\uFE4F]+$/.test(value);
}
});
Validator.extend('idNumber',{
  getMessage: field => '身份證格式不正確',
  validate: value => {

  var num = value;
  if (!num) {
    return false;
  }

  num = num.toUpperCase().replace(/\s+/g,'');
  if (!(/(^\d{17}([0-9]|X)$)/.test(num))) {
    return false;
  }
  /*if (!(/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(num))) {
    return false;
  }*/

  var len, re;
  len = num.length;
  /*if (len == 15) {
    re = new RegExp(/^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/);
    var arrSplit = num.match(re);

    var dtmBirth = new Date('19' + arrSplit[2] + '/' + arrSplit[3]
        + '/' + arrSplit[4]);
    var bGoodDay;
    bGoodDay = (dtmBirth.getYear() == Number(arrSplit[2]))
        && ((dtmBirth.getMonth() + 1) == Number(arrSplit[3]))
        && (dtmBirth.getDate() == Number(arrSplit[4]));
    if (!bGoodDay) {
      return false;
    }
  }*/
  if (len == 18) {
    re = new RegExp(/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/);
    var arrSplit = num.match(re);

    var dtmBirth = new Date(arrSplit[2] + "/" + arrSplit[3] + "/"
      + arrSplit[4]);
    var bGoodDay;
    bGoodDay = (dtmBirth.getFullYear() == Number(arrSplit[2]))
      && ((dtmBirth.getMonth() + 1) == Number(arrSplit[3]))
      && (dtmBirth.getDate() == Number(arrSplit[4]));
    if (!bGoodDay) {
      return false;
    } else {
      var valnum;
      var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10,
        5, 8, 4, 2);
      var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5',
        '4', '3', '2');
      var nTemp = 0, i;
      for (i = 0; i < 17; i++) {
        nTemp += num.substr(i, 1) * arrInt[i];
      }
      valnum = arrCh[nTemp % 11];
      if (valnum != num.substr(17, 1)) {
        return false;
      }
    }
  }
  return true;

  // return /^[\u2E80-\uFE4F]+$/.test(value);
}
});
Validator.extend('bankCardNum', {
  getMessage: field => '銀行資料號格式不正確',
  validate: value => {
  return /^[0-9]*$/.test(value);
}
});
Validator.extend('hasGetCode', {
  getMessage: field => '假',
  validate: (value,args) => {
  return args[0] > 0;
}
});
const customValidate = {
  install(Vue,options){
    // Vue.$validator.attach('pwd', 'pwd');
  }
}
export default customValidate;
