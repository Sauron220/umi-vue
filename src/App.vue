<template>
    <div id="app" style="height: 100%;">
        <div class="page-content">
            <router-view name="PageNav"></router-view>
            <router-view name="content"></router-view>
            <router-view></router-view>
            <div class="footer-space"></div>
        </div>
        <router-view name="PageFooter"></router-view>
        <router-view name="RightFloat"></router-view>
        <vModal></vModal>
    </div>
</template>

<script>

  import vModal from './components/vModal'
  export default {
    name: 'app',
    data(){
      return {
        hasHeader:true,
        hasFooter:true,
        modalShow:false,
        isAlert:true
      }
    },
    created(){
    },
    components: {
      'vModal': vModal
    },
    methods:{
      showModal(){
        this.modalShow = true;
      }
    }
  }
</script>