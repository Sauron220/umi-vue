import Modal from '../components/vModal.vue'

const vModal = {
  install(Vue,options){
    Vue.prototype.$modal = {
      Show(option){
        Modal.methods.showModal(option);
      }
    }
    Vue.component('modal', Modal);
  }
}
export default vModal;
