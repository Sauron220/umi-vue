<template>
  <div class="OpenAccountSuccess" v-TDK="TDK">
    <div class="content clearfix widtdraw" style="width: 300px;text-align: center;">
      <img src="../assets/images/luck.png">
      <div class="cont" style="">
        <br>
        <br>
        <h1 id="errorInfo">恭喜您換綁成功！</h1>
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
    name: 'ChangeCardSuccess',
    data() {
      return {
        TDK:{
          title:'換綁成功'
        }
      }
    },
    components: {
    },
    created() {
    },
    mounted() {
    },
    computed: {
      mevsUrl(){
        return this.$store.state.mevsUrl
      }
    },
    watch: {
    },
    methods: {
    }
  }
</script>
