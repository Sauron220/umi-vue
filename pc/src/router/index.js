import Vue from 'vue'
import Router from 'vue-router'
import PageNav from '@/components/PageNav'
import PageFooter from '@/components/PageFooter'
import RightFloat from '@/components/RightFloat'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import FindPwd from '@/pages/FindPwd'
import ProductList from '@/pages/ProductList'
import Product from '@/pages/Product'
import Experience from '@/pages/Experience'
import Private from '@/pages/Private'
import Directional from '@/pages/Directional'
import PlanContent from '@/pages/parentChild/PlanContent'
import Task from '@/pages/parentChild/Task'
import Setting from '@/pages/parentChild/Setting'
import Course from '@/pages/parentChild/Course'
import Activity from '@/pages/parentChild/Activity'
import ArticleDetail from '@/pages/parentChild/ArticleDetail'
import ParentChildDetail from '@/pages/ParentChildDetail'
import Front from '@/pages/Front'
import AboutUs from '@/pages/AboutUs'
import HelpCenter from '@/pages/HelpCenter'
import SecurityGuarantee from '@/pages/SecurityGuarantee'
import InfoDisclosure from '@/pages/InfoDisclosure'
import AccountOverview from '@/pages/AccountOverview'
import MyAssets from '@/pages/MyAssets'
import TransactionRecord from '@/pages/TransactionRecord'
import TransactionDetails from '@/pages/TransactionDetails'
import MyRecommend from '@/pages/MyRecommend'
import Set from '@/pages/Set'
import MyBankcard from '@/pages/MyBankcard'
import ProfileExperience from '@/pages/ProfileExperience'
import MyCoupon from '@/pages/MyCoupon'
import Withdraw from '@/pages/Withdraw'
import WithdrawHandle from '@/pages/WithdrawHandle'
import Recharge from '@/pages/Recharge'
import RechargeHandle from '@/pages/RechargeHandle'
import NewsList from '@/pages/NewsList'
import News from '@/pages/News'
import NoticeList from '@/pages/NoticeList'
import Notice from '@/pages/Notice'
import Test from '@/pages/Test'
import Buy from '@/pages/Buy'
import ChangePwd from '@/pages/ChangePwd'
import ExperienceSuccess from '@/pages/ExperienceSuccess'
import PurchaseSuccess from '@/pages/PurchaseSuccess'
import PurchaseFail from '@/pages/PurchaseFail'
import PrivateSuccess from '@/pages/PrivateSuccess'
import PrivateFail from '@/pages/PrivateFail'
import RealNameAuthSuccess from '@/pages/RealNameAuthSuccess'
import RealNameAuthFail from '@/pages/RealNameAuthFail'
import RechargeSuccess from '@/pages/RechargeSuccess'
import RechargeFail from '@/pages/RechargeFail'
import WithdrawalsSuccess from '@/pages/WithdrawalsSuccess'
import WithdrawalsFail from '@/pages/WithdrawalsFail'
import Treatmentl from '@/pages/Treatmentl'
import RealNameAuth from '@/pages/RealNameAuth'
import Agreement from '@/pages/Agreement'
import Calc from '@/pages/Calc'
import ContactService from '@/pages/ContactService'
import RegisterAgreement from '@/pages/RegisterAgreement'
import RegisterSuccess from '@/pages/RegisterSuccess'
import NewGuide from '@/pages/NewGuide'
import RechargeTipsAll from '@/pages/RechargeTipsAll'
import RechargeTipsQuick from '@/pages/RechargeTipsQuick'
import OpenAccountFail from '@/pages/OpenAccountFail'
import OpenAccountSuccess from '@/pages/OpenAccountSuccess'
import OpenAccount from '@/pages/OpenAccount'
import ActivateAccount from '@/pages/ActivateAccount'
import ChangeBankCard from '@/pages/ChangeBankCard'
import ChangeCardFail from '@/pages/ChangeCardFail'
import ChangeCardSuccess from '@/pages/ChangeCardSuccess'
import ChangePayPwd from '@/pages/ChangePayPwd'
import SetPayPwd from '@/pages/SetPayPwd'
import NoviceArea from '@/pages/NoviceArea'
import RiskAssessment from '@/pages/RiskAssessment'
import BucketGold from '@/pages/BucketGold'
import PlanProgress from '@/components/PlanProgress'
import CustTable from '@/components/CustTable'
import CustTableTwo from '@/components/CustTableTwo'
import PlannedPerformance from '@/components/PlannedPerformance'
import CommonProblems from '@/components/CommonProblems'


Vue.use(Router)

var appRouter =  new Router({
  mode: 'history',
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'Front',
      components: {
        content:Front,
        PageNav: PageNav,
        PageFooter: PageFooter,
        // RightFloat: RightFloat,
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/findPwd',
      name: 'FindPwd',
      component: FindPwd
    },
    {
      path: '/product-list/:prdType/:prdStatus/:pageAt',
      name: 'ProductList',
      components: {
        content:ProductList,
        PageNav: PageNav,
        PageFooter: PageFooter,
        // RightFloat: RightFloat,
      },
      children: [
        {
          path: '/product-list',
          name: 'Products',
          redirect: () => {
            return '/product-list/0/11/1'
          }
        }
      ]
    },
    {
      path: '/product/:prdCode',
      name: 'Product',
      components: {
        content:Product,
        PageNav: PageNav,
        PageFooter: PageFooter,
        // RightFloat: RightFloat,
      }
    },
    {
      path: '/private/:prdCode',
      name: 'Private',
      components: {
        content:Private,
        PageNav: PageNav,
        PageFooter: PageFooter,
        // RightFloat: RightFloat,
      }
    },
    {
      path: '/directional/:prdCode',
      name: 'Directional',
      components: {
        content:Directional,
        PageNav: PageNav,
        PageFooter: PageFooter,
        // RightFloat: RightFloat,
      }
    },
    {
      path: '/parent-child/plan-content',
      name: 'PlanContent',
      components: {
        content:PlanContent,
        PageNav: PageNav,
        PageFooter: PageFooter,
        // RightFloat: RightFloat,
      }
    },
    {
      path: '/parent-child/task',
      name: 'Task',
      components: {
        content:Task,
        PageNav: PageNav,
        PageFooter: PageFooter,
        // RightFloat: RightFloat,
      }
    },
    {
      path: '/parent-child/setting',
      name: 'Setting',
      components: {
        content:Setting,
        PageNav: PageNav,
        PageFooter: PageFooter,
        // RightFloat: RightFloat,
      }
    },
    {
      path: '/parent-child/activity-list/:pageIdx',
      name: 'ParentChildActiveList',
      components: {
        content:Activity,
        PageNav: PageNav,
        PageFooter: PageFooter,
        // RightFloat: RightFloat,
      }
    },
    {
      path: '/parent-child/article/:newsId',
      name: 'ParentChildArticle',
      components: {
        content:ArticleDetail,
        PageNav: PageNav,
        PageFooter: PageFooter,
        // RightFloat: RightFloat,
      }
    },
    {
      path: '/parent-child/course-list/:pageIdx',
      name: 'ParentChildCourse',
      components: {
        content:Course,
        PageNav: PageNav,
        PageFooter: PageFooter,
        // RightFloat: RightFloat,
      }
    },
    {
      path: '/parent-child-detail/:prdCode/:investMoney',
      name: 'ParentChildDetail',
      components: {
        content:ParentChildDetail,
        PageNav: PageNav,
        PageFooter: PageFooter,
        // RightFloat: RightFloat,
      }
    },
    {
      path: '/experience/:prdCode',
      name: 'Experience',
      components: {
        content:Experience,
        PageNav: PageNav,
        PageFooter: PageFooter,
        // RightFloat: RightFloat,
      }
    },
    {
      path: '/agreement/:prdCode/:trdNum',
      name: 'Agreement',
      component: Agreement
    },
    {
      path: '/calc',
      name: 'Calc',
      components: {
        content:Calc,
        PageNav: PageNav,
        PageFooter: PageFooter,
        // RightFloat: RightFloat,
      }
    },
    {
      path: '/register-agreement',
      name: 'RegisterAgreement',
      components: {
        content:RegisterAgreement,
        PageNav: PageNav,
        PageFooter: PageFooter,
        // RightFloat: RightFloat,
      }
    },
    {
      path: '/register-success',
      name: 'RegisterSuccess',
      components: {
        content:RegisterSuccess,
        PageNav: PageNav,
        PageFooter: PageFooter,
        // RightFloat: RightFloat,
      }
    },
    {
      path: '/new-guide',
      name: 'NewGuide',
      components: {
        content:NewGuide,
        PageNav: PageNav,
        PageFooter: PageFooter,
        // RightFloat: RightFloat,
      }
    },
    {
      path: '/contact-service',
      name: 'ContactService',
      components: {
        content:ContactService,
        PageNav: PageNav,
        PageFooter: PageFooter,
        // RightFloat: RightFloat,
      }
    },
    {
      path: '/aboutUs',
      name: 'AboutUs',
      components: {
        content:AboutUs,
        PageNav: PageNav,
        PageFooter: PageFooter,
        // RightFloat: RightFloat,
      }
    },
    {
      path: '/helpCenter',
      name: 'HelpCenter',
      components: {
        content:HelpCenter,
        PageNav: PageNav,
        PageFooter: PageFooter,
        // RightFloat: RightFloat,
      }
    },
    {
      path: '/securityGuarantee',
      name: 'SecurityGuarantee',
      components: {
        content:SecurityGuarantee,
        PageNav: PageNav,
        PageFooter: PageFooter,
        // RightFloat: RightFloat,
      }
    },
    {
      path: '/infoDisclosure',
      name: 'InfoDisclosure',
      components: {
        content:InfoDisclosure,
        PageNav: PageNav,
        PageFooter: PageFooter,
        // RightFloat: RightFloat,
      }
    },
    {
      path: '/accountOverview',
      name: 'AccountOverview',
      components: {
        content:AccountOverview,
        PageNav: PageNav,
        PageFooter: PageFooter,
        // RightFloat: RightFloat,
      }
    },
    {
      path: '/myAssets/:status/:pageAt',
      name: 'MyAssets',
      components: {
        content:MyAssets,
        PageNav: PageNav,
        PageFooter: PageFooter,
        // RightFloat: RightFloat,
      },
      children: [
        {
          path: '/myAssets',
          name: 'MyAsset',
          redirect: () => {
            return '/myAssets/88/1'
          }
        }
      ]
    },
    {
      path: '/transactionRecord/:tradeType/:pageAt',
      name: 'TransactionRecord',
      components: {
        content:TransactionRecord,
        PageNav: PageNav,
        PageFooter: PageFooter,
        // RightFloat: RightFloat,
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
        PageNav: PageNav,
        PageFooter: PageFooter,
        // RightFloat: RightFloat,
      }
    },
    {
      path: '/myRecommend',
      name: 'MyRecommend',
      components: {
        content:MyRecommend,
        PageNav: PageNav,
        PageFooter: PageFooter,
        // RightFloat: RightFloat,
      }
    },
    {
      path: '/set',
      name: 'Set',
      components: {
        content:Set,
        PageNav: PageNav,
        PageFooter: PageFooter,
        // RightFloat: RightFloat,
      }
    },
    {
      path: '/myBankcard',
      name: 'MyBankcard',
      components: {
        content:MyBankcard,
        PageNav: PageNav,
        PageFooter: PageFooter,
        // RightFloat: RightFloat,
      }
    },
    {
      path: '/ProfileExperience',
      name: 'ProfileExperience',
      components: {
        content:ProfileExperience,
        PageNav: PageNav,
        PageFooter: PageFooter,
        // RightFloat: RightFloat,
      },
      children: [
        {
          path: '/ProfileExperience',
          name: 'ProfileExperiences',
          redirect: () => {
            return '/ProfileExperience/coupon/0/1'
          }
        },
        {
          path: '/ProfileExperience/coupon/:couponStatus/:pageAt',
          name: 'ProfileExperienceCoupon',
          components: {
            content:ProfileExperience,
            PageNav: PageNav,
            PageFooter: PageFooter,
            // RightFloat: RightFloat,
          },
        },
        {
          path: '/ProfileExperience/record/:couponStatus/:pageAt',
          name: 'ProfileExperienceRecord',
          components: {
            content:ProfileExperience,
            PageNav: PageNav,
            PageFooter: PageFooter,
            // RightFloat: RightFloat,
          },
        },
      ]
    },
    {
      path: '/myCoupon/:couponStatus/:pageAt',
      name: 'MyCoupon',
      components: {
        content:MyCoupon,
        PageNav: PageNav,
        PageFooter: PageFooter,
        // RightFloat: RightFloat,
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
      path: '/withdraw',
      name: 'Withdraw',
      components: {
        content:Withdraw,
        PageNav: PageNav,
        PageFooter: PageFooter,
        // RightFloat: RightFloat,
      }
    },
    {
      path: '/withdraw-handle',
      name: 'WithdrawHandle',
      components: {
        content:WithdrawHandle,
        PageNav: PageNav,
        PageFooter: PageFooter,
        // RightFloat: RightFloat,
      }
    },
    {
      path: '/recharge',
      name: 'Recharge',
      components: {
        content:Recharge,
        PageNav: PageNav,
        PageFooter: PageFooter,
        // RightFloat: RightFloat,
      }
    },
    {
      path: '/recharge-handle',
      name: 'RechargeHandle',
      components: {
        content:RechargeHandle,
        PageNav: PageNav,
        PageFooter: PageFooter,
        // RightFloat: RightFloat,
      }
    },
    {
      path: '/recharge-tips-all',
      name: 'RechargeTipsAll',
      components: {
        content:RechargeTipsAll,
        PageNav: PageNav,
        PageFooter: PageFooter,
        // RightFloat: RightFloat,
      }
    },
    {
      path: '/recharge-tips-quick',
      name: 'RechargeTipsQuick',
      components: {
        content:RechargeTipsQuick,
      }
    },
    {
      path: '/news-list/:newsType/:pageAt',
      name: 'NewsList',
      components: {
        content:NewsList,
        PageNav: PageNav,
        PageFooter: PageFooter,
        // RightFloat: RightFloat,
      }
    },
    {
      path: '/news/:newsId',
      name: 'News',
      components: {
        content:News,
        PageNav: PageNav,
        PageFooter: PageFooter,
        // RightFloat: RightFloat,
      }
    },
    {
      path: '/notice-list/:pageAt',
      name: 'NoticeList',
      components: {
        content:NoticeList,
        PageNav: PageNav,
        PageFooter: PageFooter,
        // RightFloat: RightFloat,
      },
      children: [
        {
          path: '/notice-list',
          component: NoticeList,
          redirect: to => {
            return '/notice-list/1'
          }
        }
      ]
    },
    {
      path: '/notice/:newsId',
      name: 'Notice',
      components: {
        content:Notice,
        PageNav: PageNav,
        PageFooter: PageFooter,
        // RightFloat: RightFloat,
      }
    },
    {
      path: '/test',
      name: 'Test',
      components: {
        content:Test,
        PageNav: PageNav,
        PageFooter: PageFooter,
        // RightFloat: RightFloat,
      }
    },
    {
      path: '/buy',
      name: 'Buy',
      components: {
        content:Buy,
        PageNav: PageNav,
        PageFooter: PageFooter,
        // RightFloat: RightFloat,
      }
    },
    {
      path: '/ExperienceSuccess',
      name: 'ExperienceSuccess',
      components: {
        content:ExperienceSuccess,
        PageNav: PageNav,
        PageFooter: PageFooter,
        // RightFloat: RightFloat,
      }
    },
    {
      path: '/purchaseSuccess',
      name: 'PurchaseSuccess',
      components: {
        content:PurchaseSuccess,
        PageNav: PageNav,
        PageFooter: PageFooter,
        // RightFloat: RightFloat,
      }
    },
    {
      path: '/purchaseFail',
      name: 'PurchaseFail',
      components: {
        content:PurchaseFail,
        PageNav: PageNav,
        PageFooter: PageFooter,
        // RightFloat: RightFloat,
      }
    },
    {
      path: '/privateSuccess',
      name: 'PrivateSuccess',
      components: {
        content:PrivateSuccess,
        PageNav: PageNav,
        PageFooter: PageFooter,
        // RightFloat: RightFloat,
      }
    },
    {
      path: '/privateFail',
      name: 'PrivateFail',
      components: {
        content:PrivateFail,
        PageNav: PageNav,
        PageFooter: PageFooter,
        // RightFloat: RightFloat,
      }
    },
    {
      path: '/realNameAuthSuccess',
      name: 'RealNameAuthSuccess',
      components: {
        content:RealNameAuthSuccess,
        PageNav: PageNav,
        PageFooter: PageFooter,
        // RightFloat: RightFloat,
      }
    },
    {
      path: '/realNameAuthFail',
      name: 'RealNameAuthFail',
      components: {
        content:RealNameAuthFail,
        PageNav: PageNav,
        PageFooter: PageFooter,
        // RightFloat: RightFloat,
      }
    },
    {
      path: '/rechargeSuccess',
      name: 'RechargeSuccess',
      components: {
        content:RechargeSuccess,
        PageNav: PageNav,
        PageFooter: PageFooter,
        // RightFloat: RightFloat,
      }
    },
    {
      path: '/rechargeFail',
      name: 'RechargeFail',
      components: {
        content:RechargeFail,
        PageNav: PageNav,
        PageFooter: PageFooter,
        // RightFloat: RightFloat,
      }
    },
    {
      path: '/withdrawalsSuccess',
      name: 'WithdrawalsSuccess',
      components: {
        content:WithdrawalsSuccess,
        PageNav: PageNav,
        PageFooter: PageFooter,
        // RightFloat: RightFloat,
      }
    },
    {
      path: '/withdrawalsFail',
      name: 'WithdrawalsFail',
      components: {
        content:WithdrawalsFail,
        PageNav: PageNav,
        PageFooter: PageFooter,
        // RightFloat: RightFloat,
      }
    },
    {
      path: '/treatmentl',
      name: 'Treatmentl',
      components: {
        content:Treatmentl,
        PageNav: PageNav,
        PageFooter: PageFooter,
        // RightFloat: RightFloat,
      }
    },
    {
      path: '/realNameAuth',
      name: 'RealNameAuth',
      components: {
        content:RealNameAuth,
        PageNav: PageNav,
        PageFooter: PageFooter,
        // RightFloat: RightFloat,
      }
    },
/*    {
      path: '/product/:id',
      name: 'ProductListTest',
      components: {
        content:ProductList,
        PageNav: PageNav,
        PageFooter: PageFooter,
        // RightFloat: RightFloat,
      },
      redirect: to => {
      }
    },*/
    {
      path: '/changePwd',
      name: 'ChangePwd',
      components: {
        content:ChangePwd,
        PageNav: PageNav,
        PageFooter: PageFooter,
        // RightFloat: RightFloat,
      }
    },
    {
      path: '/openAccount',
      name: 'OpenAccount',
      components: {
        content:OpenAccount,
        PageNav: PageNav,
        PageFooter: PageFooter,
        // RightFloat: RightFloat,
      }
    },
    {
      path: '/openAccountFail',
      name: 'OpenAccountFail',
      components: {
        content:OpenAccountFail,
        PageNav: PageNav,
        PageFooter: PageFooter,
        // RightFloat: RightFloat,
      }
    },
    {
      path: '/openAccountSuccess',
      name: 'OpenAccountSuccess',
      components: {
        content:OpenAccountSuccess,
        PageNav: PageNav,
        PageFooter: PageFooter,
        // RightFloat: RightFloat,
      }
    },
    {
      path: '/changeCardSuccess',
      name: 'ChangeCardSuccess',
      components: {
        content:ChangeCardSuccess,
        PageNav: PageNav,
        PageFooter: PageFooter,
        // RightFloat: RightFloat,
      }
    },
    {
      path: '/changeCardFail',
      name: 'ChangeCardFail',
      components: {
        content:ChangeCardFail,
        PageNav: PageNav,
        PageFooter: PageFooter,
        // RightFloat: RightFloat,
      }
    },
    {
      path: '/activateAccount',
      name: 'ActivateAccount',
      components: {
        content:ActivateAccount,
        PageNav: PageNav,
        PageFooter: PageFooter,
        // RightFloat: RightFloat,
      }
    },
    {
      path: '/changeBankCard',
      name: 'ChangeBankCard',
      components: {
        content:ChangeBankCard,
        PageNav: PageNav,
        PageFooter: PageFooter,
        // RightFloat: RightFloat,
      }
    },
    {
      path: '/changePayPwd',
      name: 'ChangePayPwd',
      components: {
        content:ChangePayPwd,
        PageNav: PageNav,
        PageFooter: PageFooter,
        // RightFloat: RightFloat,
      }
    },
    {
      path: '/setPayPwd',
      name: 'SetPayPwd',
      components: {
        content:SetPayPwd,
        PageNav: PageNav,
        PageFooter: PageFooter,
        // RightFloat: RightFloat,
      }
    },
    {
      path: '/noviceArea',
      name: 'NoviceArea',
      components: {
        content:NoviceArea,
        PageNav: PageNav,
        PageFooter: PageFooter,
        // RightFloat: RightFloat,
      }
    },
    {
      path: '/riskAssessment',
      name: 'RiskAssessment',
      components: {
        content:RiskAssessment,
        PageNav: PageNav,
        PageFooter: PageFooter,
        // RightFloat: RightFloat,
      }
    },
    {
      path: '/bucketGold',
      name: 'BucketGold',
      components: {
        content:BucketGold,
        PageNav: PageNav,
        PageFooter: PageFooter,
        // RightFloat: RightFloat,
      },
      children:[
        {
          path:'/',
          name:'PlanProgress',
          component:PlanProgress
        },
        {
          path:'/custTable/:id',
          name:'CustTable',
          component:CustTable
        },
        {
          path:'/custTableTwo/:id',
          name:'CustTableTwo',
          component:CustTableTwo
        },
        {
          path:'/plannedPerformance',
          name:'PlannedPerformance',
          component:PlannedPerformance
        },
        {
          path:'/commonProblems',
          name:'CommonProblems',
          component:CommonProblems
        },
      ]
    },
  ]
})

appRouter.beforeEach(function (to,from,next) {
  // for 百度统计
  _hmt.push(['_trackPageview', to.fullPath]);
  // for google 统计
  if (window.ga) {
    window.ga('send', 'pageview', to.fullPath);
    /*ga('set', 'page', to.fullPath);
    ga('send', 'pageview');*/
  }
  // 继续路由
  next();
})

export default appRouter;
