import Vue from 'vue'
import Router from 'vue-router'
import PageNav from '@/components/PageNav'
import PageFooter from '@/components/PageFooter'
import Front from '@/pages/Front'
import ProductList from '@/pages/ProductList'
import Profile from '@/pages/Profile'
import About from '@/pages/About'
import Aboutus from '@/pages/Aboutus'
import Feedback from '@/pages/Feedback'
import NoticeList from '@/pages/NoticeList'
import Notice from '@/pages/Notice'
import NewsList from '@/pages/NewsList'
import News from '@/pages/News'
import ContactService from '@/pages/ContactService'
import AccountOverview from '@/pages/AccountOverview'
import MyAssets from '@/pages/MyAssets'
import AssetDetails from '@/pages/AssetDetails'
import TransactionRecord from '@/pages/TransactionRecord'
import TransactionDetails from '@/pages/TransactionDetails'
import MyRecommend from '@/pages/MyRecommend'
import MyBankcard from '@/pages/MyBankcard'
import MyCoupon from '@/pages/MyCoupon'
import Calc from '@/pages/Calc'
import HelpCenter from '@/pages/HelpCenter'
import ProfileExperience from '@/pages/ProfileExperience'
import Set from '@/pages/Set'
import ChangePwd from '@/pages/ChangePwd'
import Recharge from '@/pages/Recharge'
import RechargeSuccess from '@/pages/RechargeSuccess'
import RechargeFail from '@/pages/RechargeFail'
import PurchaseSuccess from '@/pages/PurchaseSuccess'
import PurchaseFail from '@/pages/PurchaseFail'
import Withdraw from '@/pages/Withdraw'
import PrivateFail from '@/pages/PrivateFail'
import PrivateSuccess from '@/pages/PrivateSuccess'
import OpenAccountSuccess from '@/pages/OpenAccountSuccess'
import OpenAccountFail from '@/pages/OpenAccountFail'
import WithdrawalsSuccess from '@/pages/WithdrawalsSuccess'
import WithdrawalsFail from '@/pages/WithdrawalsFail'
import Treatmentl from '@/pages/Treatmentl'
import OpenAccount from '@/pages/OpenAccount'
import ParentChild from '@/pages/ParentChild'
import RegisterAgreement from '@/pages/RegisterAgreement'
import Agreement from '@/pages/Agreement'
import FindPwd from '@/pages/FindPwd'
import InfoDisclosure from '@/pages/InfoDisclosure'
import Instructions from '@/pages/Instructions'
import SecurityGuarantee from '@/pages/SecurityGuarantee'
import Product from '@/pages/Product'
import PurchaseConfirm from '@/pages/PurchaseConfirm'
import UseCoupon from '@/pages/UseCoupon'
import Private from '@/pages/Private'
import ParentChildMission from '@/pages/ParentChildMission'
import ParentChildComment from '@/pages/ParentChildComment'
import ParentChildReply from '@/pages/ParentChildReply'
import ParentChildNews from '@/pages/ParentChildNews'
import ParentChildSet from '@/pages/ParentChildSet'
import ChangeBankCard from '@/pages/ChangeBankCard'
import ParentChildDetail from '@/pages/ParentChildDetail'
import Experience from '@/pages/Experience'
import RegisterSuccess from '@/pages/RegisterSuccess'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import download from '@/pages/download'

Vue.use(Router)

var appRouter =  new Router({
  mode: 'history',
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'Front',
      components: {
        content:download,
        //PageFooter: PageFooter,
      }
    },
    {
      path: '/download',
      name: 'download',
      components: {
        content:download,
        //PageFooter: PageFooter,
      }
    },
    /*{
      path: '/product-list/:prdType/:pageAt',
      name: 'ProductList',
      components: {
        content:ProductList,
        //PageFooter: PageFooter,
      },
      children: [
        {
          path: '/product-list',
          name: 'Products',
          redirect: () => {
            return '/product-list/0/1'
          }
        }
      ]
    },

    {
      path: '/profile',
      name: 'Profile',
      components: {
        content:Profile,
        //PageFooter: PageFooter,
      }
    },
    {
      path: '/about',
      name: 'About',
      components: {
        content:About,
      },
    },*/
    {
      path: '/about/aboutus',
      name: 'Aboutus',
      components: {
        content:Aboutus,
      },
    },
   /* {
      path: '/feedback',
      name: 'Feedback',
      components: {
        content:Feedback,
      },
    },
    {
      path: '/notice-list',
      name: 'NoticeList',
      components: {
        content:NoticeList,
      },
    },
    {
      path: '/notice/:newsId',
      name: 'Notice',
      components: {
        content: Notice,
      },
    },
    {
      path: '/news-list',
      name: 'NewsList',
      components: {
        content:NewsList,
      },
    },
    {
      path: '/news/:newsId',
      name: 'News',
      components: {
        content: News,
      },
    },
    {
      path: '/contact-service',
      name: 'ContactService',
      components: {
        content: ContactService,
      },
    },

    {
      path: '/accountOverview',
      name: 'AccountOverview',
      components: {
        content:AccountOverview,
      }
    },

    {
      path: '/myAssets/:status/:pageAt',
      name: 'MyAssets',
      components: {
        content:MyAssets,
      },
      children: [
        {
          path: '/myAssets',
          name: 'MyAsset',
          redirect: () => {
            return '/myAssets/11/1'
          }
        }
      ]
    },

    {
      path: '/assetDetails/:trdNum',
      name: 'AssetDetails',
      components: {
        content:AssetDetails,
      }
    },

    {
      path: '/transactionRecord/:tradeType/:pageAt',
      name: 'TransactionRecord',
      components: {
        content:TransactionRecord,
      },
      children: [
        {
          path: '/transactionRecord',
          name: 'TransactionRecords',
          redirect: () => {
            return '/transactionRecord/IV/1'
          }
        }
      ]
    },

    {
      path: '/transactionDetails/:tradeCode/:tradeType',
      name: 'TransactionDetails',
      components: {
        content:TransactionDetails,
      }
    },

    {
      path: '/myRecommend',
      name: 'MyRecommend',
      components: {
        content:MyRecommend,
      }
    },

    {
      path: '/myBankcard',
      name: 'MyBankcard',
      components: {
        content:MyBankcard,
      }
    },

    {
      path: '/myCoupon/:couponStatus/:pageAt',
      name: 'MyCoupon',
      components: {
        content:MyCoupon,
      },
      children: [
        {
          path: '/myCoupon',
          name: 'MyCoupons',
          redirect: () => {
            return '/myCoupon/0/1'
          }
        }
      ]
    },

    {
      path: '/calc',
      name: 'Calc',
      components: {
        content:Calc,
      }
    },*/

    {
      path: '/helpCenter',
      name: 'HelpCenter',
      components: {
        content:HelpCenter,
      }
    },

   /* {
      path: '/profileExperience',
      name: 'ProfileExperience',
      components: {
        content:ProfileExperience,
      }
    },

    {
      path: '/set',
      name: 'Set',
      components: {
        content:Set,
      }
    },

    {
      path: '/changePwd',
      name: 'ChangePwd',
      components: {
        content:ChangePwd,
      }
    },

    {
      path: '/recharge',
      name: 'Recharge',
      components: {
        content:Recharge,
      }
    },

    {
      path: '/withdraw',
      name: 'Withdraw',
      components: {
        content:Withdraw,
      }
    },*/

    {
      path: '/rechargeSuccess',
      name: 'RechargeSuccess',
      components: {
        content:RechargeSuccess,
      }
    },

    {
      path: '/rechargeFail',
      name: 'RechargeFail',
      components: {
        content:RechargeFail,
      }
    },

    {
      path: '/purchaseSuccess',
      name: 'PurchaseSuccess',
      components: {
        content:PurchaseSuccess,
      }
    },

    {
      path: '/purchaseFail',
      name: 'PurchaseFail',
      components: {
        content:PurchaseFail,
      }
    },

    /*{
      path: '/privateFail',
      name: 'PrivateFail',
      components: {
        content:PrivateFail,
      }
    },

    {
      path: '/privateSuccess',
      name: 'PrivateSuccess',
      components: {
        content:PrivateSuccess,
      }
    },*/

    {
      path: '/openAccountSuccess',
      name: 'OpenAccountSuccess',
      components: {
        content:OpenAccountSuccess,
      }
    },

    {
      path: '/openAccountFail',
      name: 'OpenAccountFail',
      components: {
        content:OpenAccountFail,
      }
    },
    {
      path: '/withdrawalsSuccess',
      name: 'WithdrawalsSuccess',
      components: {
        content:WithdrawalsSuccess,
      }
    },

    {
      path: '/withdrawalsFail',
      name: 'WithdrawalsFail',
      components: {
        content:WithdrawalsFail,
      }
    },
    /*{
      path: '/login',
      name: 'Login',
      components: {
        content:Login,
      }
    },

    {
      path: '/register',
      name: 'Register',
      components: {
        content:Register,
      }
    },

    {
      path: '/treatmentl',
      name: 'Treatmentl',
      components: {
        content:Treatmentl,
      }
    },

    {
      path: '/openAccount',
      name: 'OpenAccount',
      components: {
        content:OpenAccount,
        PageNav: PageNav,
      }
    },

    {
      path: '/parent-child',
      name: 'ParentChild',
      components: {
        content:ParentChild,
      }
    },
    {
      path: '/register-agreement',
      name: 'RegisterAgreement',
      components: {
        content:RegisterAgreement,
        PageNav: PageNav,
      }
    },

    {
      path: '/agreement/:prdCode/:trdNum/:agrPath',
      name: 'Agreement',
      components: {
        content:Agreement,
        PageNav: PageNav,
      }
    },

    {
      path: '/findPwd',
      name: 'FindPwd',
      components: {
        content:FindPwd,
        PageNav: PageNav,
      }
    },

    {
      path: '/infoDisclosure',
      name: 'InfoDisclosure',
      components: {
        content:InfoDisclosure,
        PageNav: PageNav,
      }
    },

    {
      path: '/instructions',
      name: 'Instructions',
      components: {
        content:Instructions,
        PageNav: PageNav,
      }
    },

    {
      path: '/securityGuarantee',
      name: 'SecurityGuarantee',
      components: {
        content:SecurityGuarantee,
        PageNav: PageNav,
      }
    },

    {
      path: '/product/:prdCode',
      name: 'Product',
      components: {
        content:Product,
      }
    },

    {
      path: '/purchaseConfirm/:prdCode/:relAmount/:cpnNum/:vipCode',
      name: 'PurchaseConfirm',
      components: {
        content:PurchaseConfirm,
      }
    },

    {
      path: '/useCoupon/:prdCode/:relAmount/:cpnNum/:vipCode',
      name: 'UseCoupon',
      components: {
        content:UseCoupon,
        PageNav: PageNav,
      }
    },

    {
      path: '/private/:prdCode',
      name: 'Private',
      components: {
        content:Private,
      }
    },

    {
      path: '/parentChildMission',
      name: 'ParentChildMission',
      components: {
        content:ParentChildMission,
      }
    },

    {
      path: '/parentChildComment',
      name: 'ParentChildComment',
      components: {
        content:ParentChildComment,
      }
    },

    {
      path: '/parentChildReply/:cmt',
      name: 'ParentChildReply',
      components: {
        content:ParentChildReply,
      }
    },

    {
      path: '/parentChildNews/:noticeId',
      name: 'ParentChildNews',
      components: {
        content:ParentChildNews,
        PageNav: PageNav,
      }
    },

    {
      path: '/parentChildSet',
      name: 'ParentChildSet',
      components: {
        content:ParentChildSet,
      }
    },
    {
      path: '/changeBankCard',
      name: 'ChangeBankCard',
      components: {
        content:ChangeBankCard,
      }
    },
    {
      path: '/parent-child-detail/:prdCode',
      name: 'ParentChildDetail',
      components: {
        content:ParentChildDetail,
      }
    },
    {
      path: '/experience/:prdCode/:cpnNum/:cpnInfo',
      name: 'Experience',
      components: {
        content:Experience,
      }
    },
    {
      path: '/register-success',
      name: 'RegisterSuccess',
      components: {
        content:RegisterSuccess,
      }
    },*/
  ]
})

appRouter.beforeEach(function (to,from,next) {
  // for 百度统计
  _hmt.push(['_trackPageview', to.fullPath]);
  // for google 统计
  if (window.ga) {
    window.ga('send', 'pageview', to.fullPath);
  }
  // 继续路由
  next();
})

export default appRouter;
