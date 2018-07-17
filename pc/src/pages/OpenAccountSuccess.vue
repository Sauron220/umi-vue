<template>
  <div class="OpenAccountSuccess" v-TDK="TDK">
    <div class="content clearfix widtdraw" style="width: 300px;text-align: center;">
      <img src="../assets/images/luck.png" style="width: 120px;">
      <div class="cont" style="">
        <br>
        <br>
        <h1 id="errorInfo">恭喜您開護成功！</h1>
        <!--<a class="blue_btn" href="/views/openAccount.html">重新開護</a>-->
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
    name: 'OpenAccountSuccess',
    data() {
      return {
        TDK:{
          title:'開護成功'
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
