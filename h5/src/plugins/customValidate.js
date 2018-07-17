import {Validator} from 'vee-validate';
// custom validate
Validator.extend('pwd', {
  getMessage: field => '登录密码由6-20位数字与字母的组合',
  validate: value => {
    return /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]*$/.test(value) && /^(\w){6,20}$/.test(value)
  }
});
Validator.extend('phoneNum', {
  getMessage: field => '手机号码格式不正确',
  validate: value => {
    return /^0?1[3|4|5|7|8][0-9]\d{8}$/.test(value);
  }
});
Validator.extend('lessThan', {
  getMessage: field => '输入有误',
  validate: (value,flag) => {
    return value<=flag[0];
  }
});
Validator.extend('moreThan', {
  getMessage: (field,args) => {
    return '输入有误'
  },
  validate: (value,args) => {
    return value>=args[0];
  }
});
Validator.extend('moreThan2', {
  getMessage: (field,args) => {
    return '输入有误'
  },
  validate: (value,args) => {
    return value>args[0];
  }
});
Validator.extend('investRule', {
  getMessage: (field,args,data) => {
    if(args[0]==0){
      if(args[1]<args[2]){
        return '产品剩余金额为'+args[1]+"元"
      }else{
        return "您的可用余额不足，请去儲值"
      }
    }else{
      if(args[0]==Math.min(args[0],args[1],args[2])){
        return "最高加入金额为" + args[0] + "元"
      }else if(args[1]==Math.min(args[0],args[1],args[2])){
        return "产品剩余金额为" + args[1] + "元"
      }else if(args[2]==Math.min(args[0],args[1],args[2])){
        return "您的可用余额不足，请去儲值"
      }
    }
  },
  validate: (value,args) => {
    if(args[0]==0){
      return value*1<=Math.min(args[1],args[2]);
    }else{
      return value*1<=Math.min(args[0],args[1],args[2]);
    }
  }
});
Validator.extend('babyName', {
  getMessage: (field) => {
    return '请输入正确的昵称'
  },
  validate: (value) => {
    return /^(_*[a-zA-Z0-9\u4e00-\u9fa5]+[a-zA-Z0-9_\u4e00-\u9fa5]*)$/.test(value);
  }
});
Validator.extend('rateCheck', {
  getMessage: (field) => {
    return '利率范围为0.01%至99.99%'
  },
  validate: (value) => {
    return /^[1-9]\d{0,3}\.\d$|^[1-9]\d{0,2}\.\d{2}$|^[1-9]\d{0,1}$|^[0]\.\d{1,2}$/.test(value);
  }
});
Validator.extend('chinese', {
  getMessage: field => '姓名格式不正确',
  validate: value => {
    return /^[\u2E80-\uFE4F]+$/.test(value);
  }
});
Validator.extend('idNumber',{
  getMessage: field => '身份证格式不正确',
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
  getMessage: field => '银行卡号格式不正确',
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
