<template>
    <div>
        <div class="mask0" v-if="vModal"></div>
        <div class="v-modal modal-warning" v-if="vModal">
            <div class="modal-backdrop fade in" style="z-index: 1060;"></div>
            <div class="popup">
                <div class="content">{{vModalOption.msg}}</div>
                <div class="handle-btn modal-alert" v-if="vModalOption.type=='alert'">
                    <a class="item light" :href="vModalOption.confirmUrl || 'javascript:;'"
                       @click="vModalOption.confirmDo || closeModal()">
                        {{vModalOption.confirmText || '确定'}}
                    </a>
                </div>
                <div class="handle-btn modal-confirm" v-if="vModalOption.type=='confirm'">
                    <a class="item" :href="vModalOption.cancelUrl || 'javascript:;'"
                       @click="vModalOption.cancelDo || closeModal()">
                        {{vModalOption.cancelText || '取消'}}
                    </a>
                    <a class="item light" :href="vModalOption.confirmUrl || 'javascript:;'"
                       @click="vModalOption.confirmDo || closeModal()">
                        {{vModalOption.confirmText || '确定'}}
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
/**
 * 组件使用方法
 * 参数设置 this.$store.commit('setModal', {
                  type: 'alert',
                  msg: '！',
                });
 * 显示：this.$store.commit('showModal');
 * 隐藏：this.$store.commit('hideModal');
 * */

  export default {
    name: 'vModal',
    props:{
      name:{
        type: String
      }
    },
    data () {
      return {
      }
    },
    computed: {
      vModal(){
        return this.$store.state.vModal.show
      },
      vModalOption(){
        return this.$store.state.vModal.option
      }
    },
    methods:{
      closeModal(){
        this.$store.commit('hideModal')
      }
    }
  }
</script>