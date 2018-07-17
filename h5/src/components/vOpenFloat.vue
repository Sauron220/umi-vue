<template>
    <div class="v-modal modal-warning isOpen-content">
        <div class="isTpStatus" v-if="vOpenAccBl">
            <img src="../assets/images/sh_zkp.png" class="img">
        </div>
        <div class="isActivateStatus" v-if="!vOpenAccBl">
            <img src="../assets/images/sh_zkp2.png" class="img">
        </div>
        <div class="isOpen-bottom">
            <span class="closeDoor" @click="hideOpen()">取消</span>
            <a :href="whatUrl()" class="goIn" v-if="vOpenAccBl">立即开通</a>
            <a :href="whatUrl()" class="goIn" v-if="!vOpenAccBl">立即激活</a>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'vOpenFloat',
    props: {
      vOpenAccBl:{
        type: Boolean
      },
    },
    data() {
      return {
      }
    },
    created(){
      this.whatUrl()
    },
    methods: {
      hideOpen(){
        this.$parent.isOpen = false;
      },
      whatUrl(){
        if(this.$parent.isGoUrl){
          return '/openAccount?bu=' + this.$parent.isGoUrl
        }
        else if(this.$route.params.prdCode){
          return '/openAccount?bu=' + this.$route.name + '/' + this.$route.params.prdCode
        }
        else {
          return '/openAccount?bu=' + this.$route.name
        }
      }
    }
  }

</script>