<template>
    <div class="wrap privateSuccess-content">
        <div class="pos">
            <img src="../assets/images/giraffe_success.png" class="fzz">
            <p>恭喜您购买成功！</p>
        </div>

        <div class="result-bottom clearfix">
            <a @click="goMyAssest()" class="mui-btn base-btn mui-btn-block left">查看已投项目</a>
            <a @click="goBack()" class="mui-btn base-btn mui-btn-block right">浏览其它产品</a>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'PrivateSuccess',
    data() {
      return {}
    },
    created(){
    },
    methods: {
      goMyAssest() {
        var data = {
          'className' : '查看已投项目',
          'comFrom' : 'web'
        };
        try{
          window.WebViewJavascriptBridge.send(data);
        }catch(e){

        }
        window.parent.location.href = "/myAssets";
      },
      goBack() {
        var data = {
          'className' : '继续浏览其他产品',
          'comFrom' : 'web'
        };
        try{
          window.WebViewJavascriptBridge.send(data);
        }catch(e){

        }
        window.parent.location.href = "/product-list/40/1";
      }

    },
  }
</script>