<template>
  <div class="container">
    <!--表單校驗-->
    <input type="text" v-validate="{ rules:{minlength: 3, maxlength: 15} }" class="form-control">
    <div class="error-text">
      <span v-show="">不得少於3個字符</span>
      <span v-show="">不得大於15個字符</span>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'Test',
    data () {
      return {
        comment:''
      }
    },
    created(){
    },
    mounted () {
    },
    methods: {
    }
  }
</script>
