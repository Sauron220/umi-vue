<template>
  <div id="PersonalCenter" class="rw-content relNameAuth-content profile clearfix" v-TDK="TDK">
    <div class="container">
      <!--<ol class="breadcrumb">
        <span>您現在的位置：</span>
        &lt;!&ndash;<li><router-link to="/accountOverview">我的帳戶</router-link></li>&ndash;&gt;
        <li><router-link to="/accountNew">我的帳戶</router-link></li>
        &lt;!&ndash;<li><router-link to="/set">帳戶安全</router-link></li>&ndash;&gt;
        <li class="active">實名認證</li>
      </ol>-->
      <!--<leftMenu></leftMenu>-->
      <div class="pull-left right_content">
        <ul class="top-title-line list-inline">
          <li class="top-line1 top-orange">實名認證</li>
        </ul>

        <form action="" method="post" submit="subAuth" novalidate id="tpAuthForm">
          <div class="personal-bar form-group">
            <h1>真是姓名</h1>
            <input type="chinese" class="inpArea" placeholder="請輸入真實姓名" autocomplete="off" id="realName" maxlength="10" required>
            <div class="sj-error" inputId="realName" validateAlert="validate.required">
              <span></span> <i class="set-normal">請輸入姓名</i>
            </div>
            <div class="sj-error" inputId="realName" validateAlert="validate.chinese">
              <span></span> <i class="set-normal">姓名格式不正確</i>
            </div>
          </div>
          <div class="personal-bar form-group">
            <h1>身份證號</h1>
            <input type="tel" class="inpArea" placeholder="請輸入身份證號" maxlength="22" autocomplete="off" id="idNum" required>
            <!--<i inputId="idNum" validateAlert="validate.idNo">身份證格式不正確</i>-->
            <div class="sj-error" inputId="idNum" validateAlert="validate.chinese">
              <span></span> <i class="set-normal">請輸入身份證號碼</i>
            </div>
          </div>
          <button type="button" class="btn btn-warning">確認</button>
        </form>

      </div>
    </div>
  </div>
</template>

<script>
  import PersonalCenterMenu from '../components/PersonalCenterMenu'
  export default {
    name: 'RealNameAuth',
    data () {
      return {
        TDK:{
          title:'實名認證-聚寶盆',
          keyWords:'網絡理財，互聯網理財，理財，投資，投資理財，個人投資，網貸平臺，網貸投資，網貸，互金，互聯網金融，互金平臺，互聯網金融平臺，聚寶盆，聚寶計劃，分期投，月月盈，年年余，財富，P2P',
          description:'聚寶盆是壹家綜合性互聯網金融平臺，聚寶盆為廣大個人投資理財的用戶提供多元化的選擇與優質的服務。投資理財用戶可通過加入聚寶計劃、分期投、月月盈、年年余等產品進行投資獲得穩定收益。',
        }
      }
    },
    components: {
      'leftMenu': PersonalCenterMenu,
    },
    mounted () {

    },
    methods: {
    }
  }
</script>
