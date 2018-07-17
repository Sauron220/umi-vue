<template>
  <div class="OpenAccountFail" v-TDK="TDK">
    <div class="content clearfix widtdraw" style="width: 300px;text-align: center;">
      <img src="../assets/images/500.png">
      <div class="cont" style="">
        <br>
        <br>
        <h1 id="errorInfo">換綁失敗啦！</h1>
        <!--<a class="blue_btn" href="/views/openAccount.html">重新開戶</a>-->
      </div>
    </div>
  </div>
</template>

<script>
  import VDistpicker from '../components/Distpicker'

  const dictionary = {
    en: {
      custom: {
      }
    }
  }

  export default {
    name: 'ChangeCardFail',
    data() {
      return {
        TDK:{
          title:'換綁失敗',
        }
      }
    },
    components: {
    },

    created() {
    },
    mounted() {
    },
    watch: {
    },
    methods: {
    }
  }
</script>
