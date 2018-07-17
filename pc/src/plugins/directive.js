
const directive = {
  install(Vue,options){
    Vue.directive('TDK', {
      bind (el, binding, vnode, oldVnode) {
        binding.oldTDK = {
          title:document.querySelector('title').innerHTML,
          keyWords:document.querySelector('meta[name="keywords"]').getAttribute('content'),
          description:document.querySelector('meta[name="description"]').getAttribute('content'),
        };
        if(binding.value){
          binding.value.title && (document.querySelector('title').innerHTML = binding.value.title);
          binding.value.keyWords && document.querySelector('meta[name="keywords"]').setAttribute('content',binding.value.keyWords);
          binding.value.description && document.querySelector('meta[name="description"]').setAttribute('content',binding.value.description);
        }
      },
      update (el, binding, vnode, oldVnode) {
        if(binding.value){
          binding.value.title && (document.querySelector('title').innerHTML = binding.value.title);
          binding.value.keyWords && document.querySelector('meta[name="keywords"]').setAttribute('content',binding.value.keyWords);
          binding.value.description && document.querySelector('meta[name="description"]').setAttribute('content',binding.value.description);
        }
      },
      unbind(el,binding){  // 页面跳转离开时、 重置页面tdk
        if(binding.oldTDK){
          document.querySelector('title').innerHTML = binding.oldTDK.title;
          document.querySelector('meta[name="keywords"]').setAttribute('content',binding.oldTDK.keyWords);
          document.querySelector('meta[name="description"]').setAttribute('content',binding.oldTDK.description);
        }
      }
    });
    Vue.directive('focus', {
      inserted (el, binding, vnode, oldVnode) {
        el.onfocus = function () {
          if(binding.value){
            binding.value()
          }
        }
      }
    });
  }
}
export default directive;
