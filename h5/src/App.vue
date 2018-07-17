<template>
  <div id="app">
    <router-view name="PageNav"></router-view>
    <router-view name="content"></router-view>
    <router-view></router-view>
    <router-view name="PageFooter"></router-view>
    <vModal></vModal>
    <vError></vError>
  </div>
</template>

<script>
  import vModal from './components/vModal'
  import vError from './components/vError'
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
    components: {
      'vModal': vModal,
      'vError': vError
    },
    methods:{
      showModal(){
        this.modalShow = true;
      }
    }
  }
</script>
