<template>
    <div class="help-center">
        <PageNav message="/profile"></PageNav>
        <div class="dlList list swiper-help-nav">
            <div class="swiper-wrapper">
                <a class="swiper-slide" :class="{'active':helpSwipe.activeIndex==0}" @click="swipeTo(0)">登錄註冊</a>
                <a class="swiper-slide" :class="{'active':helpSwipe.activeIndex==1}" @click="swipeTo(1)">賬戶密碼</a>
                <a class="swiper-slide" :class="{'active':helpSwipe.activeIndex==2}" @click="swipeTo(2)">開戶</a>
                <a class="swiper-slide" :class="{'active':helpSwipe.activeIndex==3}" @click="swipeTo(3)">綁卡</a>
                <a class="swiper-slide" :class="{'active':helpSwipe.activeIndex==4}" @click="swipeTo(4)">儲值</a>
                <a class="swiper-slide" :class="{'active':helpSwipe.activeIndex==5}" @click="swipeTo(5)">提領</a>
                <a class="swiper-slide" :class="{'active':helpSwipe.activeIndex==6}" @click="swipeTo(6)">紅包</a>
                <a class="swiper-slide" :class="{'active':helpSwipe.activeIndex==7}" @click="swipeTo(7)">加息券</a>
                <a class="swiper-slide" :class="{'active':helpSwipe.activeIndex==8}" @click="swipeTo(8)">新用戶相關問題</a>
                <a class="swiper-slide" :class="{'active':helpSwipe.activeIndex==9}" @click="swipeTo(9)">產品介紹</a>
                <a class="swiper-slide" :class="{'active':helpSwipe.activeIndex==10}" @click="swipeTo(10)">用戶利益保障機制</a>
                <a class="swiper-slide" :class="{'active':helpSwipe.activeIndex==11}" @click="swipeTo(11)">借款審核與風控</a>
                <a class="swiper-slide" :class="{'active':helpSwipe.activeIndex==12}" @click="swipeTo(12)">用戶的自我保護</a>
            </div>
        </div>

        <div class="info_details">

            <div v-show="helpSwipe.activeIndex==0" class="help_inner">
                <div class="help_bar">
                    <div class="top clearfix">
                        <span>1、註冊時，進行手機驗證，收不到短信怎麽辦？</span>
                        <img src="/static/img/icon_recommend_up.png">
                    </div>
                    <div class="bottom">
                        <ul>
                          <li>請確認手機是否安裝短信攔截或過濾軟件；</li>
                          <li>請確認手機是否能夠正常接收短信（信號問題、欠費、停機等）；</li>
                          <li>短信收發過程中可能會存在延遲，請耐心等待，短信在15分鐘內均有效；</li>
                          <li>部分運營商短信存在到達率問題；</li>
                          <li>用戶還可以聯系客服，尋求幫助（02-8780-6767）。</li>
                        </ul>
                    </div>
                </div>
               <!-- <div class="help_bar">
                    <div class="top clearfix">
                        <span>2、在聚寶盆上注册后，可以不开通上海银行资金存管账户就进行投资吗？</span>
                        <img src="/static/img/icon_recommend_up.png">
                    </div>
                    <div class="bottom">不可以。上海银行资金存管账户用于分账管理用户的交易与资金資訊，如不开立，无法进行后续的操作。</div>
                </div>-->
                <!--<div class="help_bar">
                    <div class="top clearfix">
                        <span>3、在上海银行页面操作时，手机收不到验证码怎么办？</span>
                        <img src="/static/img/icon_recommend_up.png">
                    </div>
                    <div class="bottom">
                        <ul>
                            <li>请确认手机是否安装短信拦截或过滤软件；</li>
                            <li>请确认手机是否能够正常接收短信（信号问题、欠费、停机等）；</li>
                            <li>短信收发过程中可能会存在延迟，请耐心等待；</li>
                            <li>部分运营商短信存在到达率问题；</li>
                        </ul>
                    </div>
                </div>-->
            </div>
           <div v-show="helpSwipe.activeIndex==1" class="help_inner">
                <div class="help_bar">
                    <div class="top clearfix">
                        <span>1、如何修改登錄密碼？</span>
                        <img src="/static/img/icon_recommend_up.png">
                    </div>
                    <div class="bottom">打開聚寶盆，進入【個人中心】&#45;&#45;【賬戶安全】頁面，點擊【登錄密碼】資訊欄，修改登錄密碼。</div>
                </div>
                <div class="help_bar">
                    <div class="top clearfix">
                        <span>2、如何找回登錄密碼？</span>
                        <img src="/static/img/icon_recommend_up.png">
                    </div>
                    <div class="bottom">進入登錄頁面，點擊【忘記密碼】；跳轉至【密碼找回】頁面，可以選擇通過手機號找回登錄密碼。</div>
                </div>
                <div class="help_bar">
                    <div class="top clearfix">
                        <span>3、用戶的手機號出現變更，該如何修改？</span>
                        <img src="/static/img/icon_recommend_up.png">
                    </div>
                    <div class="bottom">出於安全性考慮，用戶暫不可修改註冊時綁定的手機號。</div>
                </div><div class="help_bar">
                    <div class="top clearfix">
                        <span>4、上海银行资金存管账户的交易密码和用户银行卡的交易密码有关系吗？</span>
                        <img src="/static/img/icon_recommend_up.png">
                    </div>
                    <div class="bottom">没有关系。用户在开通上海银行资金存管账户时设置的存管账户交易密码为用户在平台进行投资、提现时的资金交易密码，而用户的银行卡，是用户独立银行开立的实体银行账户，与用户在平台的存管账户并非同一账户。</div>
                </div><div class="help_bar">
                    <div class="top clearfix">
                        <span>5、用户的手机号出现变更，该如何修改？</span>
                        <img src="/static/img/icon_recommend_up.png">
                    </div>
                    <div class="bottom">出于安全性考虑，用户暂不可修改注册时绑定的手机号。</div>
                </div>
            </div>
           <div v-show="helpSwipe.activeIndex==2" class="help_inner">
              <div class="help_bar">
                  <div class="top clearfix">
                      <span>1、進行實名認證後，能解綁或重新認證嗎？</span>
                      <img src="/static/img/icon_recommend_up.png">
                  </div>
                  <div class="bottom">用戶在網站不可以進行解綁操作，如需解綁請聯繫客服（02-8780-6767）。</div>
              </div>
              <div class="help_bar">
                  <div class="top clearfix">
                      <span>2、一個手機號能綁定幾個聚寶盆賬戶？</span>
                      <img src="/static/img/icon_recommend_up.png">
                  </div>
                  <div class="bottom">一個手機號只能綁定一個聚寶盆賬戶。</div>
              </div>
              <div class="help_bar">
                  <div class="top clearfix">
                      <span>3、如何开通资金存管账户？</span>
                      <img src="/static/img/icon_recommend_up.png">
                  </div>
                  <div class="bottom">
                      <ul>
                          <li>在“我的账户-开户提醒浮窗”，点击【去开户】或在“账户安全”页面，点击【开户】按钮；</li>
                          <li>跳转到“开户”页面，填写完成开户所需資訊，点击【立即开户】；</li>
                          <li>跳转到上海银行开户页面，设置【交易密码】，开户成功。</li>
                      </ul>
                  </div>
              </div><div class="help_bar">
                  <div class="top clearfix">
                      <span>4、一个手机号能绑定几个聚寶盆账户？</span>
                      <img src="/static/img/icon_recommend_up.png">
                  </div>
                  <div class="bottom">一个手机号只能绑定一个聚寶盆账户。</div>
              </div>
              <div class="help_bar">
                  <div class="top clearfix">
                      <span>3、如何修改綁定手機號？</span>
                      <img src="/static/img/icon_recommend_up.png">
                  </div>
                  <div class="bottom">出於安全性考慮，用戶暫不可修改註冊時綁定的手機號。</div>
              </div>
          </div>
          <div v-show="helpSwipe.activeIndex==3" class="help_inner">
              <div class="help_bar">
                  <div class="top clearfix">
                      <span>1、如何完成綁卡操作？</span>
                      <img src="/static/img/icon_recommend_up.png">
                  </div>
                  <div class="bottom">用戶需填寫銀行資料號、開戶銀行、填寫完成後，等待系統反饋綁卡處理結果。</div>
              </div>
              <div class="help_bar">
                  <div class="top clearfix">
                      <span>2、用戶可以綁定幾張卡？</span>
                      <img src="/static/img/icon_recommend_up.png">
                  </div>
                  <div class="bottom"> 每個用戶只能綁定一張有效的銀行資料，可在我的銀行資料頁面進行換綁銀行資料。</div>
              </div>
              <div class="help_bar">
                  <div class="top clearfix">
                      <span>3、是否可以綁定別人的銀行資料？</span>
                      <img src="/static/img/icon_recommend_up.png">
                  </div>
                  <div class="bottom">不可以，只能使用本人的銀行資料。</div>
              </div>
              <div class="help_bar">
                  <div class="top clearfix">
                      <span>4、用户可以绑定几张卡？</span>
                      <img src="/static/img/icon_recommend_up.png">
                  </div>
                  <div class="bottom">每个用户只能绑定一张有效的银行卡，可在我的银行卡页面进行换绑银行卡。</div>
              </div><div class="help_bar">
                  <div class="top clearfix">
                      <span>5、是否可以绑定别人的银行卡？</span>
                      <img src="/static/img/icon_recommend_up.png">
                  </div>
                  <div class="bottom">不可以，只能使用本人的银行卡。</div>
              </div>
          </div>
          <div v-show="helpSwipe.activeIndex==4" class="help_inner">
              <div class="help_bar">
                  <div class="top clearfix">
                      <span>1、如何給賬戶儲值</span>
                      <img src="/static/img/icon_recommend_up.png">
                  </div>
                  <div class="bottom">登錄後，進入【個人中心】頁面、或者進入【賬戶總覽頁面】、或者進入產品詳情頁面的購買浮層，點擊【儲值】按鈕；</div>
              </div>
              <div class="help_bar">
                  <div class="top clearfix">
                      <span>1、如何給賬戶儲值？</span>
                      <img src="/static/img/icon_recommend_up.png">
                  </div>
                  <div class="bottom">
                      <ul>
                          <li>登錄後，進入【個人中心】頁面、或者進入【賬戶總覽頁面】、或者進入產品詳情頁面的購買浮層，點擊【儲值】按鈕；</li>
                         <li>跳转到【儲值】页面，输入儲值金额后选择儲值方式（快速儲值、网银儲值），点击【立即儲值】；</li>
                          <li>进入网银转账页面完成转账操作，即可完成儲值。</li>
                      </ul>
                  </div>
              </div>
              <div class="help_bar">
                  <div class="top clearfix">
                      <span>2、儲值會不會扣手續費？</span>
                      <img src="/static/img/icon_recommend_up.png">
                  </div>
                  <div class="bottom"> 為了回饋廣大用戶對聚寶盆的支持和信任，目前用戶儲值暫不需要支付儲值費用。</div>
              </div><div class="help_bar">
                  <div class="top clearfix">
                      <span>3、儲值会不会扣手续费？</span>
                      <img src="/static/img/icon_recommend_up.png">
                  </div>
                  <div class="bottom">为了回馈广大用户对聚寶盆的支持和信任，目前用户儲值暂不需要支付儲值费用。</div>
              </div> <div class="help_bar">
                  <div class="top clearfix">
                      <span>5、用户在向账户儲值资金未到账，是什么原因？</span>
                      <img src="/static/img/icon_recommend_up.png">
                  </div>
                  <div class="bottom">上海银行资金存管账户提供两种儲值方式，快速卡儲值与网银儲值，儲值资金正常即时到账。由于机构间資訊流转有可能存在一定延迟，如儲值成功2小时未到账可联系客服咨询具体情况； </div>
              </div>
          </div>
          <div v-show="helpSwipe.activeIndex==5" class="help_inner">
              <div class="help_bar">
                  <div class="top clearfix">
                      <span>1、申請提領後，多久能到賬？</span>
                      <img src="/static/img/icon_recommend_up.png">
                  </div>
                  <div class="bottom">根據銀行提供的路由通道不同，實際到賬時間各不相同，最快即時到賬。</div>
              </div>
              <div class="help_bar">
                  <div class="top clearfix">
                      <span>2、提領會不會扣手續費？</span>
                      <img src="/static/img/icon_recommend_up.png">
                  </div>
                  <div class="bottom">為了回饋廣大用戶對聚寶盆的支持和信任，目前用戶儲值暫不需要支付提領費用。</div>
              </div>
              <div class="help_bar">
                  <div class="top clearfix">
                      <span>3、如何提領？</span>
                      <img src="/static/img/icon_recommend_up.png">
                  </div>
                  <div class="bottom">登錄聚寶盆我的賬戶-提領，輸入要提領的金額，點擊【立即提領】，跳轉至上海銀行提領頁面完成提領操作，等待到賬即可。</div>
              </div>
              <div class="help_bar">
                  <div class="top clearfix">
                      <span>4、如果所填寫的銀行資料資訊不正確，能否提領成功？</span>
                      <img src="/static/img/icon_recommend_up.png">
                  </div>
                  <div class="bottom">如果用戶填寫的銀行資料號有誤或該銀行資料開戶名不是用戶實名認證的姓名，不會提領成功。</div>
              </div>
            <div class="help_bar">
              <div class="top clearfix">
                <span>5、提領未到賬，是什麽原因？</span>
                <img src="/static/img/icon_recommend_up.png">
              </div>
              <div class="bottom">提領後，聚寶盆交易記錄顯示 「銀行處理中」，並且銀行資料內餘額未增加。這是因為不同的提領路由通道到賬時間各不相同，最快即時到賬，如隔天還未到賬可聯繫客服查詢解決。</div>
            </div>
          </div>
          <div v-show="helpSwipe.activeIndex==6" class="help_inner">
               <div class="help_bar">
                   <div class="top clearfix">
                       <span>1、什麽是紅包？</span>
                       <img src="/static/img/icon_recommend_up.png">
                   </div>
                   <div class="bottom">紅包是聚寶盆為答謝廣大新老用戶所推出的優惠內容，用戶可通過紅包獲得現金或者體驗金。</div>
               </div>
               <div class="help_bar">
                   <div class="top clearfix">
                       <span>2、紅包的獲取。</span>
                       <img src="/static/img/icon_recommend_up.png">
                   </div>
                   <div class="bottom">聚寶盆會以站內活動等不特定形式向用戶發放紅包，用戶可以通過關註聚寶盆官方微信、微博獲取相關資訊。</div>
               </div>
               <div class="help_bar">
                   <div class="top clearfix">
                       <span>3、紅包使用規則</span>
                       <img src="/static/img/icon_recommend_up.png">
                   </div>
                   <div class="bottom">現金紅包會直接進入用戶的可用餘額中，用戶可以利用現金進行投資或者提領。
                   </div>
               </div>
           </div>
           <div v-show="helpSwipe.activeIndex==7" class="help_inner">
              <div class="help_bar">
                  <div class="top clearfix">
                      <span>1、什麽是加息券？</span>
                      <img src="/static/img/icon_recommend_up.png">
                  </div>
                  <div class="bottom">加息券是聚寶盆為答謝廣大新老用戶所推出的優惠內容，用戶可通過加息券增加所購產品的年化利率。</div>
              </div>
              <div class="help_bar">
                  <div class="top clearfix">
                      <span>2、加息券的獲取。</span>
                      <img src="/static/img/icon_recommend_up.png">
                  </div>
                  <div class="bottom">聚寶盆會以站內活動等不特定形式向用戶發放加息券，用戶可以通過關注聚寶盆官方微信、微博獲取相關資訊。</div>
              </div>
              <div class="help_bar">
                  <div class="top clearfix">
                      <span>3、如何使用加息券</span>
                      <img src="/static/img/icon_recommend_up.png">
                  </div>
                  <div class="bottom">進入聚寶盆的產品詳情頁，在購買頁面，即可看到優惠券的入口，點擊後進入優惠券選擇頁面，選擇加息券。</div>
              </div>
              <div class="help_bar">
                  <div class="top clearfix">
                      <span>4、加息券使用規則</span>
                      <img src="/static/img/icon_recommend_up.png">
                  </div>
                  <div class="bottom">
                      <ul>
                        <li>加息券支持購買指定產品時抵用</li>
                        <li>加息券需在有效期內使用，過期作廢</li>
                        <li>每筆支付只能使用一張加息券</li>
                        <li>加息券使用時需要滿足起用金額</li>
                        <li>已失效的加息券無法使用。</li>
                      </ul>
                  </div>
              </div>
          </div>
          <div v-show="helpSwipe.activeIndex==8" class="help_inner">
               <div class="help_bar">
                   <div class="top clearfix">
                       <span>1、什麽用戶可以在聚寶盆理財？</span>
                       <img src="/static/img/icon_recommend_up.png">
                   </div>
                   <div class="bottom">年滿18週歲，具有完全民事權利能力和民事行為能力，可以在聚寶盆網站上進行註冊、開戶和綁卡，成為理財人。用戶在聚寶盆網站選擇的理財產品所適用的法律法規、監管規定對用戶的資格有其他要求的，還應當符合相應要求。</div>
               </div>
               <div class="help_bar">
                   <div class="top clearfix">
                       <span>2、怎樣進行投資？</span>
                       <img src="/static/img/icon_recommend_up.png">
                   </div>
                   <div class="bottom">
                       <span>用戶按照以下步驟進行投資：</span>
                       <ul>
                         <li>在平台上進行註冊；</li>
                         <li>完成實名認證，設置支付密碼，綁定銀行資料操作；</li>
                         <li>賬戶儲值；</li>
                         <li>瀏覽產品列表，選擇自己感興趣的理財產品；</li>
                         <li>用戶根據所選擇的理財產品所適用的服務協議規定的要求，完成預估；</li>
                         <li>確認投資，投資成功。</li>
                       </ul>
                   </div>
               </div>
               <div class="help_bar">
                   <div class="top clearfix">
                       <span>3、由於產品超募而導致的退款是即時到賬的嗎？</span>
                       <img src="/static/img/icon_recommend_up.png">
                   </div>
                   <div class="bottom">由於產品超募而導致的退款不是即時到賬的，將由系統統一髮起退款，具體到賬時間，請查看交易記錄中退款的完成時間。</div>
               </div>
               <div class="help_bar">
                   <div class="top clearfix">
                       <span>4、理財產品計息後是否可以提前退出？</span>
                       <img src="/static/img/icon_recommend_up.png">
                   </div>
                   <div class="bottom">均不支持提前退出
                   </div>
               </div>

               <div class="help_bar">
                   <div class="top clearfix">
                       <span>5、理財是否有額外費用？</span>
                       <img src="/static/img/icon_recommend_up.png">
                   </div>
                   <div class="bottom"><b>儲值、提領費用</b><br>為了回饋廣大用戶對聚寶盆的支持和信任，目前用戶儲值和提領暫不需要支付手續費用。<br>
                     <b>產品相關費用</b><br>
                     產品的發行方、銷售方收取的申購/認購費、贖回費、管理費、手續費等費用，根據用戶所選擇的具體產品的產品協議、規則及相關法律文件確定。
                   </div>
               </div>
               <div class="help_bar">
                   <div class="top clearfix">
                       <span>6、什麼是到期還本付息？</span>
                       <img src="/static/img/icon_recommend_up.png">
                   </div>
                   <div class="bottom">到期還本付息是指借款到期後一次性歸還本金和利息。</div>
               </div>
               <div class="help_bar">
                   <div class="top clearfix">
                       <span>7、什麼是等額本息？</span>
                       <img src="/static/img/icon_recommend_up.png">
                   </div>
                   <div class="bottom">等額本息還款法是一種被廣泛採用的還款方式。在還款期內，每月償還同等數額的借款(包括本金和利息)。借款人每月還款額中的本金比重逐月遞增、利息比重逐月遞減。</div>
               </div>
               <div class="help_bar">
                   <div class="top clearfix">
                       <span>8、投標成功後，什麼時候開始計息？</span>
                       <img src="/static/img/icon_recommend_up.png">
                   </div>
                   <div class="bottom">投標成功後，會根據產品的計息時間進行計息，如果是D+N方式計息，那麼在滿標放款N天後的自然日計息，如果是T+N方式計息，那麼在滿標放款N天後的工作日計息。</div>
               </div>
             <div class="help_bar">
               <div class="top clearfix">
                 <span>9、產品到期後，什麼時候還款到賬？</span>
                 <img src="/static/img/icon_recommend_up.png">
               </div>
               <div class="bottom">產品到期後，會根據資金到賬實際時間計算還款時間，如果是D+N方式還款，那麼在產品到期N天後的自然日還款到賬，如果是T+N方式還款，那麼在產品到期N天後的工作日還款到賬。</div>
             </div>
               <div class="help_bar">
                   <div class="top clearfix">
                       <span>10、為什麼產品計息或者還款到賬會有一定延遲，而不是即時的？</span>
                       <img src="/static/img/icon_recommend_up.png">
                   </div>
                   <div class="bottom">部分交易所渠道獲得放款或者資產到期後，由於 機構結算、銀行間資金流轉以及節 假日因素，計息時間或還款到賬時間存在一定 延遲。</div>
               </div>
               <!--<div class="help_bar">
                   <div class="top clearfix">
                       <span>11、“计息时间”、“還款到账时间”详解？</span>
                       <img src="/static/img/icon_recommend_up.png">
                   </div>
                   <div class="bottom">（N≠0）（N =设定延迟天数）<br>
                       <table>
                           <tr>
                               <td>后台设置</td>
                               <td>计息时间</td>
                               <td>還款到账时间</td>
                           </tr>
                           <tr>
                               <td>D+0</td>
                               <td>满标放款当天开始计息（D+0）</td>
                               <td>還款到期当天可提现（D+0）</td>
                           </tr>
                           <tr>
                               <td>D+N</td>
                               <td>满标放款后第N天开始计息（D+N）</td>
                               <td>還款到期后第N天可提现（D+N）</td>
                           </tr>
                           <tr>
                               <td>T+0</td>
                               <td>满标放款当天开始计息，遇节假日顺延（T+0）</td>
                               <td>還款到期当天可提现，遇节假日顺延（T+0）</td>
                           </tr>
                           <tr>
                               <td>T+N</td>
                               <td>满标放款后第N天开始计息，遇节假日顺延（T+N）</td>
                               <td>還款到期后第N天可提现，遇节假日顺延（T+N）</td>
                           </tr>
                       </table>
                   </div>
               </div>-->
           </div>
           <div v-show="helpSwipe.activeIndex==9" class="help_inner">
               <div class="help_bar">
                   <div class="top clearfix">
                       <span>1、聚寶盆的理財產品有哪些？</span>
                       <img src="/static/img/icon_recommend_up.png">
                   </div>
                   <div class="bottom">聚寶盆的理財產品分別有：一桶金、聚寶計劃、分期投、月月盈以及聚寶盆不時推出的其他理財產品。</div>
               </div>
              <!-- <div class="help_bar">
                   <div class="top clearfix">
                       <span>2、什么是月月喜？</span>
                       <img src="/static/img/icon_recommend_up.png">
                   </div>
                   <div class="bottom">月月喜是聚寶盆平台为用户提供的投标工具，由系统为用户实现投标，更好的满足用户多样化的理财需求。该产品所对应的借款均100%适用于聚寶盆理财用户利益保障机制。用户出借所获得的利息收益可选择收益再投资（到期一次性领取本金和收益），借款期限为1个月，预期年化收益率在7.50%左右。</div>
               </div>-->
             <!--  <div class="help_bar">
                   <div class="top clearfix">
                       <span>3、什么是季季宝？</span>
                       <img src="/static/img/icon_recommend_up.png">
                   </div>
                   <div class="bottom">季季宝是聚寶盆平台为用户提供的投标工具，由系统为用户实现投标，更好的满足用户多样化的理财需求。该产品所对应的借款均100%适用于聚寶盆理财用户利益保障机制。用户出借所获得的利息收益可选择收益再投资（到期一次性领取本金和收益），借款期限为3个月，预期年化收益率在9.00%左右。</div>
               </div>-->
               <!--<div class="help_bar">
                   <div class="top clearfix">
                       <span>4、什么是双季盈？</span>
                       <img src="/static/img/icon_recommend_up.png">
                   </div>
                   <div class="bottom">双季盈是聚寶盆平台为用户提供的投标工具，由系统为用户实现投标，更好的满足用户多样化的理财需求。该产品所对应的借款均100%适用于聚寶盆理财用户利益保障机制。用户出借所获得的利息收益可选择收益再投资（到期一次性领取本金和收益），借款期限为6个月，预期年化收益率在10.00%左右。</div>
               </div>-->
               <!--<div class="help_bar">
                   <div class="top clearfix">
                       <span>5、什么是年年余？</span>
                       <img src="/static/img/icon_recommend_up.png">
                   </div>
                   <div class="bottom">年年余是聚寶盆平台为用户提供的投标工具，由系统为用户实现投标，更好的满足用户多样化的理财需求。该产品所对应的借款均100%适用于聚寶盆理财用户利益保障机制。用户出借所获得的利息收益可选择收益再投资（到期一次性领取本金和收益），借款期限为12个月，预期年化收益率在12.00%左右。</div>
               </div>-->
               <!--<div class="help_bar">
                   <div class="top clearfix">
                       <span>6、什么是新手专享？</span>
                       <img src="/static/img/icon_recommend_up.png">
                   </div>
                   <div class="bottom">新手专享是聚寶盆为新注册用户提供的优惠理财产品，由系统为新手用户实现投标。该产品所对应的借款均100%适用于聚寶盆理财用户利益保障机制。借款期限为14天，预期年化收益率在13.00%左右。</div>
               </div>-->
           </div>
          <!-- <div v-show="helpSwipe.activeIndex==11" class="help_inner">
               <div class="help_bar">
                   <div class="top clearfix">
                       <span>1、月月喜收益</span>
                       <img src="/static/img/icon_recommend_up.png">
                   </div>
                   <div class="bottom">月月喜锁定期1个月，预期年化收益7.50%。</div>
               </div>
               <div class="help_bar">
                   <div class="top clearfix">
                       <span>2、季季宝收益</span>
                       <img src="/static/img/icon_recommend_up.png">
                   </div>
                   <div class="bottom">季季宝锁定期3个月，预期年化收益9.00%。</div>
               </div>
               <div class="help_bar">
                   <div class="top clearfix">
                       <span>3、双季盈收益</span>
                       <img src="/static/img/icon_recommend_up.png">
                   </div>
                   <div class="bottom">双季盈锁定期6个月，预期年化收益10.00%。</div>
               </div>
               <div class="help_bar">
                   <div class="top clearfix">
                       <span>4、年年余收益</span>
                       <img src="/static/img/icon_recommend_up.png">
                   </div>
                   <div class="bottom">年年余锁定期12个月，预期年化收益12.00%。</div>
               </div>
               <div class="help_bar">
                   <div class="top clearfix">
                       <span>5、新手专享收益</span>
                       <img src="/static/img/icon_recommend_up.png">
                   </div>
                   <div class="bottom">新手专享锁定期14天，预期年化收益13.00%。</div>
               </div>
               <div class="help_bar">
                   <div class="top clearfix">
                       <span>6、到期还本付息的收益该如何计算？</span>
                       <img src="/static/img/icon_recommend_up.png">
                   </div>
                   <div class="bottom">到期还本付息是一种被广泛采用的还款方式。借款到期后一次性归还本金和利息。具体计算公式如下：<br>
                       本金利息总额=出借金额*[1+(年化利率/360*借款天数)]<br>注：1月=30天
                   </div>
               </div>
               <div class="help_bar">
                   <div class="top clearfix">
                       <span>7、儲值、提现费用</span>
                       <img src="/static/img/icon_recommend_up.png">
                   </div>
                   <div class="bottom">为了回馈广大用户对聚寶盆的支持和信任，目前用户儲值和提现暂不需要支付手续费用。</div>
               </div>
           </div>
           <div v-show="helpSwipe.activeIndex==12" class="help_inner">
               <div class="help_bar">
                   <div class="top clearfix">
                       <span>1、如何加入月月喜</span>
                       <img src="/static/img/icon_recommend_up.png">
                   </div>
                   <div class="bottom">在首页选择月月喜，或者进入产品列表页面，在顶部选择月月喜，选择进行中的产品。进入产品详情页后， 点击【立即加入】按钮，弹出购买浮层，用户在金额输入框内输入想要加入的金额，注意月月喜的最低加入金额和产品的剩余金额，用户确认加入資訊无误后，点击购买浮层的【立即加入】，跳转到上海银行页面，输入交易密码后，点击【确定】即加入成功。注：特别提醒加入月月喜时用户必须保证上海银行资金存管账户内资金足够，需要一次性支付清加入金额。</div>
               </div>
               <div class="help_bar">
                   <div class="top clearfix">
                       <span>2、月月喜的发布时间</span>
                       <img src="/static/img/icon_recommend_up.png">
                   </div>
                   <div class="bottom">根据用户投资情况发布月月喜，具体发布时间可在聚寶盆平台查看。</div>
               </div>
               <div class="help_bar">
                   <div class="top clearfix">
                       <span>3、月月喜的收益有多少？</span>
                       <img src="/static/img/icon_recommend_up.png">
                   </div>
                   <div class="bottom">月月喜锁定期1个月，预期年化收益7.50%。</div>
               </div>
               <div class="help_bar">
                   <div class="top clearfix">
                       <span>4、投资利息收益处理方式？</span>
                       <img src="/static/img/icon_recommend_up.png">
                   </div>
                   <div class="bottom">投资所获利息收益的处理方式：到期一次性领取本金和收益。</div>
               </div>
               <div class="help_bar">
                   <div class="top clearfix">
                       <span>5、月月喜的期限有多久？</span>
                       <img src="/static/img/icon_recommend_up.png">
                   </div>
                   <div class="bottom">月月喜的锁定期为1个月，到期后自动退出。</div>
               </div>
               <div class="help_bar">
                   <div class="top clearfix">
                       <span>6、锁定期是什么</span>
                       <img src="/static/img/icon_recommend_up.png">
                   </div>
                   <div class="bottom">月月喜具有锁定期限制。锁定期内，用户不可提前退出。锁定期满后自动退出。</div>
               </div>
               <div class="help_bar">
                   <div class="top clearfix">
                       <span>7、月月喜何时开始为用户投标？</span>
                       <img src="/static/img/icon_recommend_up.png">
                   </div>
                   <div class="bottom">月月喜会根据用户加入的时间顺序进行投标。</div>
               </div>
           </div>
           <div v-show="helpSwipe.activeIndex==13" class="help_inner">
               <div class="help_bar">
                   <div class="top clearfix">
                       <span>1、如何加入季季宝</span>
                       <img src="/static/img/icon_recommend_up.png">
                   </div>
                   <div class="bottom">在首页选择季季宝，或者进入产品列表页面，在顶部选择季季宝，选择进行中的产品。进入产品详情页后， 点击【立即加入】按钮，弹出购买浮层，用户在金额输入框内输入想要加入的金额，注意季季宝的最低加入金额和产品的剩余金额，用户确认加入資訊无误后，点击购买浮层的【立即加入】，跳转到上海银行页面，输入交易密码后，点击【确定】即加入成功。注：特别提醒加入季季宝时用户必须保证上海银行资金存管账户内资金足够，需要一次性支付清加入金额。</div>
               </div>
               <div class="help_bar">
                   <div class="top clearfix">
                       <span>2、季季宝的发布时间</span>
                       <img src="/static/img/icon_recommend_up.png">
                   </div>
                   <div class="bottom">根据用户投资情况发布季季宝，具体发布时间可在聚寶盆平台查看。</div>
               </div>
               <div class="help_bar">
                   <div class="top clearfix">
                       <span>3、季季宝的收益有多少？</span>
                       <img src="/static/img/icon_recommend_up.png">
                   </div>
                   <div class="bottom">季季宝锁定期3个月，预期年化收益9.00%。</div>
               </div>
               <div class="help_bar">
                   <div class="top clearfix">
                       <span>4、投资利息收益处理方式？</span>
                       <img src="/static/img/icon_recommend_up.png">
                   </div>
                   <div class="bottom">投资所获利息收益的处理方式：到期一次性领取本金和收益。</div>
               </div>
               <div class="help_bar">
                   <div class="top clearfix">
                       <span>5、季季宝的期限有多久？</span>
                       <img src="/static/img/icon_recommend_up.png">
                   </div>
                   <div class="bottom">季季宝的锁定期为3个月，到期后自动退出。</div>
               </div>
               <div class="help_bar">
                   <div class="top clearfix">
                       <span>6、锁定期是什么</span>
                       <img src="/static/img/icon_recommend_up.png">
                   </div>
                   <div class="bottom">季季宝具有锁定期限制。锁定期内，用户不可提前退出。锁定期满后自动退出。</div>
               </div>
               <div class="help_bar">
                   <div class="top clearfix">
                       <span>7、季季宝何时开始为用户投标？</span>
                       <img src="/static/img/icon_recommend_up.png">
                   </div>
                   <div class="bottom">季季宝会根据用户加入的时间顺序进行投标。</div>
               </div>
           </div>
           <div v-show="helpSwipe.activeIndex==14" class="help_inner">
               <div class="help_bar">
                   <div class="top clearfix">
                       <span>1、如何加入双季盈</span>
                       <img src="/static/img/icon_recommend_up.png">
                   </div>
                   <div class="bottom">在首页选择双季盈，或者进入产品列表页面，在顶部选择双季盈，选择进行中的产品。进入产品详情页后， 点击【立即加入】按钮，弹出购买浮层，用户在金额输入框内输入想要加入的金额，注意双季盈的最低加入金额和产品的剩余金额，用户确认加入資訊无误后，点击购买浮层的【立即加入】，跳转到上海银行页面，输入交易密码后，点击【确定】即加入成功。注：特别提醒加入双季盈时用户必须保证上海银行资金存管账户内资金足够，需要一次性支付清加入金额。</div>
               </div>
               <div class="help_bar">
                   <div class="top clearfix">
                       <span>2、双季盈的发布时间</span>
                       <img src="/static/img/icon_recommend_up.png">
                   </div>
                   <div class="bottom">根据用户投资情况发布双季盈，具体发布时间可在聚寶盆平台查看。</div>
               </div>
               <div class="help_bar">
                   <div class="top clearfix">
                       <span>3、双季盈的收益有多少？</span>
                       <img src="/static/img/icon_recommend_up.png">
                   </div>
                   <div class="bottom">双季盈锁定期6个月，10.00%。</div>
               </div>
               <div class="help_bar">
                   <div class="top clearfix">
                       <span>4、投资利息收益处理方式？</span>
                       <img src="/static/img/icon_recommend_up.png">
                   </div>
                   <div class="bottom">投资所获利息收益的处理方式：到期一次性领取本金和收益。</div>
               </div>
               <div class="help_bar">
                   <div class="top clearfix">
                       <span>5、双季盈的期限有多久？</span>
                       <img src="/static/img/icon_recommend_up.png">
                   </div>
                   <div class="bottom">年年余的锁定期为6个月，到期后自动退出。</div>
               </div>
               <div class="help_bar">
                   <div class="top clearfix">
                       <span>6、锁定期是什么</span>
                       <img src="/static/img/icon_recommend_up.png">
                   </div>
                   <div class="bottom">双季盈具有锁定期限制。锁定期内，用户不可提前退出。锁定期满后自动退出。</div>
               </div>
               <div class="help_bar">
                   <div class="top clearfix">
                       <span>7、双季盈何时开始为用户投标？</span>
                       <img src="/static/img/icon_recommend_up.png">
                   </div>
                   <div class="bottom">双季盈会根据用户加入的时间顺序进行投标。</div>
               </div>
           </div>
           <div v-show="helpSwipe.activeIndex==15" class="help_inner">
               <div class="help_bar">
                   <div class="top clearfix">
                       <span>1、如何加入年年余</span>
                       <img src="/static/img/icon_recommend_up.png">
                   </div>
                   <div class="bottom">在首页选择年年余，或者进入产品列表页面，在顶部选择年年余，选择进行中的产品。进入产品详情页后， 点击【立即加入】按钮，弹出购买浮层，用户在金额输入框内输入想要加入的金额，注意年年余的最低加入金额和产品的剩余金额，用户确认加入資訊无误后，点击购买浮层的【立即加入】，跳转到上海银行页面，输入交易密码后，点击【确定】即加入成功。注：特别提醒加入年年余时用户必须保证上海银行资金存管账户内资金足够，需要一次性支付清加入金额。</div>
               </div>
               <div class="help_bar">
                   <div class="top clearfix">
                       <span>2、年年余的发布时间</span>
                       <img src="/static/img/icon_recommend_up.png">
                   </div>
                   <div class="bottom">根据用户投资情况发布年年余，具体发布时间可在聚寶盆平台查看。</div>
               </div>
               <div class="help_bar">
                   <div class="top clearfix">
                       <span>3、年年余的收益有多少？</span>
                       <img src="/static/img/icon_recommend_up.png">
                   </div>
                   <div class="bottom">年年余锁定期12个月，预期年化收益12.00%。</div>
               </div>
               <div class="help_bar">
                   <div class="top clearfix">
                       <span>4、投资利息收益处理方式？</span>
                       <img src="/static/img/icon_recommend_up.png">
                   </div>
                   <div class="bottom">投资所获利息收益的处理方式：到期一次性领取本金和收益。</div>
               </div>
               <div class="help_bar">
                   <div class="top clearfix">
                       <span>5、年年余的期限有多久？</span>
                       <img src="/static/img/icon_recommend_up.png">
                   </div>
                   <div class="bottom">年年余的锁定期为12个月，到期后自动退出。</div>
               </div>
               <div class="help_bar">
                   <div class="top clearfix">
                       <span>6、锁定期是什么</span>
                       <img src="/static/img/icon_recommend_up.png">
                   </div>
                   <div class="bottom">年年余具有锁定期限制。锁定期内，用户不可提前退出。锁定期满后自动退出。</div>
               </div>
               <div class="help_bar">
                   <div class="top clearfix">
                       <span>7、年年余何时开始为用户投标？</span>
                       <img src="/static/img/icon_recommend_up.png">
                   </div>
                   <div class="bottom">年年余会根据用户加入的时间顺序进行投标。</div>
               </div>
           </div>
           <div v-show="helpSwipe.activeIndex==16" class="help_inner">
               <div class="help_bar">
                   <div class="top clearfix">
                       <span>1、如何加入新手专享</span>
                       <img src="/static/img/icon_recommend_up.png">
                   </div>
                   <div class="bottom">只有首次注册的用户才能加入新手专享产品。在首页选择新手专享，或者进入产品列表页面，在顶部选择新手专享，选择进行中的产品。进入产品详情页后， 点击【立即加入】按钮，弹出购买浮层，用户在金额输入框内输入想要加入的金额，注意新手专享的最低加入金额、最高加入金额和产品的剩余金额，用户确认加入資訊无误后，点击购买浮层的【立即加入】，跳转到上海银行页面，输入交易密码后，点击【确定】即加入成功。注：特别提醒加入新手专享时用户必须保证上海银行资金存管账户内资金足够，需要一次性支付清加入金额。</div>
               </div>
               <div class="help_bar">
                   <div class="top clearfix">
                       <span>2、新手专享的发布时间</span>
                       <img src="/static/img/icon_recommend_up.png">
                   </div>
                   <div class="bottom">根据新用户注册情况发布新手专享，具体发布时间可在聚寶盆平台查看。</div>
               </div>
               <div class="help_bar">
                   <div class="top clearfix">
                       <span>3、新手专享的收益有多少？</span>
                       <img src="/static/img/icon_recommend_up.png">
                   </div>
                   <div class="bottom">新手专享锁定期14天，预期年化收益13.00%。</div>
               </div>
               <div class="help_bar">
                   <div class="top clearfix">
                       <span>4、投资利息收益处理方式？</span>
                       <img src="/static/img/icon_recommend_up.png">
                   </div>
                   <div class="bottom">投资所获利息收益的处理方式：到期一次性领取本金和收益。</div>
               </div>
               <div class="help_bar">
                   <div class="top clearfix">
                       <span>5、新手专享的期限有多久？</span>
                       <img src="/static/img/icon_recommend_up.png">
                   </div>
                   <div class="bottom">新手专享的锁定期为14天，到期后自动退出。</div>
               </div>
               <div class="help_bar">
                   <div class="top clearfix">
                       <span>6、锁定期是什么</span>
                       <img src="/static/img/icon_recommend_up.png">
                   </div>
                   <div class="bottom">新手专享具有锁定期限制。锁定期内，用户不可提前退出。锁定期满后自动退出。</div>
               </div>
               <div class="help_bar">
                   <div class="top clearfix">
                       <span>7、新手专享何时开始为用户投标？</span>
                       <img src="/static/img/icon_recommend_up.png">
                   </div>
                   <div class="bottom">新手专享会根据用户加入的时间顺序进行投标。</div>
               </div>
           </div>-->
           <div v-show="helpSwipe.activeIndex==10" class="help_inner">
               <div class="help_bar">
                   <div class="top clearfix">
                       <span>1、在聚寶盆投資能否保障用戶利益？</span>
                       <img src="/static/img/icon_recommend_up.png">
                   </div>
                   <div class="bottom">為保障投資人的投資安全，聚寶盆設有適用於全體投資人的用戶利益保障機制。</div>
               </div>
               <div class="help_bar">
                   <div class="top clearfix">
                       <span>2、什麼是用戶利益保障機制</span>
                       <img src="/static/img/icon_recommend_up.png">
                   </div>
                   <div class="bottom">「用戶利益保障機制」是聚寶盆設立的為保護投資人的共同利益而建立的信用風險承擔機制。除另有說明外，投資人經過平台身份認證後，在平台進行的符合本機制規定的投資行為均適用於「用戶利益保障機制」項下對應的保障機制，投資人無需為此支付任何費用。聚寶盆有權根據市場和實際情況，對「用戶利益保障機制」的保障機制和規則進行調整並通過平台公示的形式告知各投資人，無需再取得各投資人的同意。</div>
               </div>
           </div>
          <!-- <div v-show="helpSwipe.activeIndex==18" class="help_inner">
               <div class="help_bar">
                   <div class="top clearfix">
                       <span>1、聚寶盆提供居间撮合服务的合法性</span>
                       <img src="/static/img/icon_recommend_up.png">
                   </div>
                   <div class="bottom">《合同法》第23章专门对“居间合同”作出规定，其第424条明确定义为：“居间合同是居间人向委托人报告订立合同的机会或者提供订立合同的媒介服务，委托人支付报酬的合同”。聚寶盆是合法设立的居间服务机构，致力于为民间借贷业务提供优质高效的撮合服务，以促成借贷双方形成借贷关系，然后收取相关报酬。此种居间服务有着明确的法律依据。</div>
               </div>
               <div class="help_bar">
                   <div class="top clearfix">
                       <span>2、投资人及借款人之间的借贷关系的合法性</span>
                       <img src="/static/img/icon_recommend_up.png">
                   </div>
                   <div class="bottom">《合同法》第196条规定：“借款合同是借款人向贷款人借款，到期返还借款并支付利息的合同”；根据《合同法》第十二章“借款合同”和《最高人民法院关于审理民间借贷案件适用法律若干问题的规定》，我国法律允许自然人等普通民事主体之间发生借贷关系，并允许投资方到期可以收回本金和符合法律规定的利息。投资人与借款人之间形成的借贷关系受到法律保护。</div>
               </div>
               <div class="help_bar">
                   <div class="top clearfix">
                       <span>3、投资人通过聚寶盆平台获得的投资利息的合法性</span>
                       <img src="/static/img/icon_recommend_up.png">
                   </div>
                   <div class="bottom">根据《最高人民法院关于审理民间借贷案件适用法律若干问题的规定》第二十六条：“借贷双方约定的利率未超过年利率24%，投资人请求借款人按照约定的利率支付利息的，人民法院应予支持。借贷双方约定的利率超过年利率36%，超过部分的利息约定无效。借款人请求投资人返还已支付的超过年利率36%部分的利息的，人民法院应予支持。”聚寶盆平台上投资人向借款人投资资金并按照约定利率收取利息，该利率未超过前述规定的上限，为合法利息收益，受到法律保护。</div>
               </div>
               <div class="help_bar">
                   <div class="top clearfix">
                       <span>4、电子合同的合法性</span>
                       <img src="/static/img/icon_recommend_up.png">
                   </div>
                   <div class="bottom">根据《合同法》第11条的规定，当事人可以采用合同书、信件和数据电文（包括电报、电传、传真、电子数据交换和电子邮件）等形式订立合同。电子合同是法律认可的书面合同形式之一。聚寶盆采取用户网上点击确认的方式签署电子合同。点击确认后的电子合同符合《中华人民共和国合同法》规定的合同成立、生效的要件，其有效性也被人民法院的司法实践所接受。</div>
               </div>
           </div>-->
           <div v-show="helpSwipe.activeIndex==11" class="help_inner">
               <div class="help_bar">
                   <div class="top clearfix">
                       <span>1、嚴格的貸前審核</span>
                       <img src="/static/img/icon_recommend_up.png">
                   </div>
                   <div class="bottom">在客戶提出借款申請後，聚寶盆或聚寶盆的合作機構會對客戶的基本資料進行分析。通過網絡、電話及其他可以掌握的有效渠道進行詳實、仔細的調查。避免不良客戶的欺詐風險。在資料資訊覈實完成後，根據個人信用風險分析系統進行評估，由經驗豐富的借款審核人員進行雙重審核確認後最終決定批核結果。</div>
               </div>
               <div class="help_bar">
                   <div class="top clearfix">
                       <span>2、完善的貸後管理</span>
                       <img src="/static/img/icon_recommend_up.png">
                   </div>
                   <div class="bottom">如果用戶逾期未歸還借款，聚寶盆或聚寶盆合作機構的貸後管理部門將第一時間通過短信、電話等方式提醒用戶進行還款。如果用戶在5天內還未歸還當期借款，聚寶盆或聚寶盆的合作機構將會聯繫該用戶的緊急聯繫人、直系親屬、單位等督促用戶盡快還款。如果用戶仍未還款，交由專業的高級催收團隊與第三方專業機構合作進行包括上門等一系列的催收工作，直至採取法律手段。</div>
               </div>
             <div class="help_bar">
               <div class="top clearfix">
                 <span>3、權限管理和隱私安全</span>
                 <img src="/static/img/icon_recommend_up.png">
               </div>
               <div class="bottom"> 聚寶盆網站運用各種先進的安全技術保護。聚寶盆賬戶中存儲用戶的個人資訊、賬戶資訊以及交易記錄，以免用戶賬戶遭受未經授權的訪問、使用以及資訊洩露。
                 聚寶盆網站有著完善的安全監測系統，可以及時發現網站的非正常訪問並做相應的安全響應。對於用戶的賬戶資訊， 聚寶盆網站會對其進行高強度的加密，以防止用戶資訊的外洩。<br/>
                 同時，我們還會持續更新和改進網站的安全策略，以保證網站安全策略的有效性。</div>
             </div>
           </div>
           <!--<div v-show="helpSwipe.activeIndex==20" class="help_inner">
               <div class="help_bar">
                   <div class="top clearfix">
                       <span>1、什么是资金存管？</span>
                       <img src="/static/img/icon_recommend_up.png">
                   </div>
                   <div class="bottom">根据《关于促进互联网金融健康发展的指导意见》“（十四）客户资金第三方存管制度。除另有规定外，从业机构应当选择符合条件的银行业金融机构作为资金存管机构，对客户资金进行管理和监督，实现客户资金与从业机构自身资金分账管理。”和《网络借贷資訊中介机构业务活动管理暂行办法（征求意见稿）》第二十八条“网络借贷資訊中介机构应当实行自身资金与投资人和借款人资金的隔离管理，选择符合条件的银行业金融机构作为投资人与借款人的资金存管机构。”和第三十六条“资金存管机构对投资人与借款人开立和使用资金管理账户进行管理和监督，并根据合同约定，依照投资人与借款人向网络借贷資訊中介机构发出的指令，对投资人与借款人的资金进行存管、划付、核算和监督。”“资金存管”是指这样一种安排，即P2P平台在银行业金融机构单独设立独立账户，将客户资金存入该等独立账户，并由银行业金融机构根据投资人、借款人发出的指令和合同约定，对该等资金的使用、划付进行管理和监督。</div>
               </div>
               <div class="help_bar">
                   <div class="top clearfix">
                       <span>2、实现资金存管对聚寶盆理财用户有哪些好处及平台的变化是什么？</span>
                       <img src="/static/img/icon_recommend_up.png">
                   </div>
                   <div class="bottom">首先，资金存管实现了P2P平台自有资金和用户资金的分离，避免P2P平台自有资金与用户资金发生混同，当P2P平台自身发生负债、破产时，用户资金不会受到P2P平台债权人的追索。其次，资金存管是由银行业金融机构根据投资人、借款人的指令和合同约定对用户资金的使用、划付进行管理、监督，且由银行对客户资金交易进行记录，能够尽可能地避免P2P平台非法动用投资人、借款人的资金，保障投资人、借款人的资金安全。<br>
                       资金存管上线后，聚寶盆引入上海银行作为合作伙伴。每位理财用户都将在上海银行开通独立的资金存管账户。因此在用户投资前增加了上海银行开户操作。在用户进行投资、提现等涉及资金操作时，均需要跳转至上海银行页面校验交易密码，有效保障了用户的资金安全。
                   </div>
               </div>
               <div class="help_bar">
                   <div class="top clearfix">
                       <span>3、实现上海银行资金存管后，投资人是不是要到上海银行开立账户？</span>
                       <img src="/static/img/icon_recommend_up.png">
                   </div>
                   <div class="bottom">每位聚寶盆的注册用户在进行投资前，均需要在线开通上海银行资金存管账户。</div>
               </div>
               <div class="help_bar">
                   <div class="top clearfix">
                       <span>4、上海银行为用户开立的交易资金账户由谁操作，資訊安全是否有保障？</span>
                       <img src="/static/img/icon_recommend_up.png">
                   </div>
                   <div class="bottom">用户的交易结算资金管理账户由用户本人管理，儲值、投资、提现时要由用户输入交易密码进行授权，平台或者上海银行都不能自行动用客户账户资金。用户需要保护好自己的交易密码、手机验证码等資訊，勿向他人泄露。</div>
               </div>
               <div class="help_bar">
                   <div class="top clearfix">
                       <span>5、权限管理和隐私安全</span>
                       <img src="/static/img/icon_recommend_up.png">
                   </div>
                   <div class="bottom">聚寶盆网站运用各种先进的安全技术保护。聚寶盆账户中存储用户的个人資訊、账户資訊以及交易记录，以免用户账户遭受未经授权的访问、使用以及資訊泄露。</div>
               </div>
           </div>-->
           <div v-show="helpSwipe.activeIndex==12" class="help_inner">
               <div class="help_bar">
                   <div class="top clearfix">
                       <span>1、牢記聚寶盆官方網址</span>
                       <img src="/static/img/icon_recommend_up.png">
                   </div>
                   <div class="bottom">牢記聚寶盆官方網址：http://www.fundbowl.tw
                     不要點擊來歷不明的連結訪問聚寶盆，謹防網站釣魚和欺詐。我們建議用戶將聚寶盆官方網址加入瀏覽器收藏夾，以方便下次訪問。
                   </div>
               </div>
               <div class="help_bar">
                   <div class="top clearfix">
                       <span>2、為賬戶設置高強度的登錄密碼</span>
                       <img src="/static/img/icon_recommend_up.png">
                   </div>
                   <div class="bottom">建議用戶在密碼設置時，使用數字和字母混合，不要使用純數字或純字母，且密碼長度要在6位以上；<br>不要使用生日、姓名拼音、身份證號碼、手機號或是郵箱名作為登錄密碼；<br>不要使用連續的，或重復的字母、數字組合作為密碼，例如：aaaaaa，111111，abcdef，123456；<br>不要使用以下常用密碼，例如：qazwsx，qwerty，mima123，password等。
                   </div>
               </div>
               <div class="help_bar">
                   <div class="top clearfix">
                       <span>3、注重電腦運行環境的安全</span>
                       <img src="/static/img/icon_recommend_up.png">
                   </div>
                   <div class="bottom">
                       <ul>
                         <li>用戶及時為電腦進行系統更新，安裝系統安全補丁，以防系統漏洞被黑客利用；</li>
                         <li>用戶為電腦安裝殺毒軟件或防火牆，並定期為電腦進行查毒、殺毒；</li>
                         <li>避免在網吧等公共場所使用網上銀行，不要打開來歷不明的電子郵件；</li>
                         <li>不要訪問危險的網站，不要使用來歷不明的軟件。</li>
                       </ul>
                   </div>
               </div>
               <div class="help_bar">
                   <div class="top clearfix">
                       <span>4、時刻注意保護個人隱私</span>
                       <img src="/static/img/icon_recommend_up.png">
                   </div>
                   <div class="bottom">用戶在平台上交流的過程中，不要向其他用戶透露自己真實姓名與住址等，以防個人資訊被盜取造成損失。</div>
               </div>
               <div class="help_bar">
                   <div class="top clearfix">
                       <span>5、避免私下交易</span>
                       <img src="/static/img/icon_recommend_up.png">
                   </div>
                   <div class="bottom">聚寶盆建議用戶避免私下交易。私下交易的約束力極低，造成逾期的風險非常高，同時用戶的個人資訊將有可能被洩漏，存在遭遇詐騙甚至受到嚴重犯罪侵害的隱患。</div>
               </div>
           </div>
        </div>
    </div>
</template>

<script>
  import Swipe from 'swiper'
  import PageNav from '@/components/PageNav'

  export default {
    name: 'HelpCenter',
    data() {
      return {
        pageTitle: '幫助中心',
        helpSwipe:{
          activeIndex:0
        }
      }
    },
    created() {
      var self = this;
      self.$store.commit('setPageTitle', self.pageTitle);
      self.$nextTick(function () {
        setTimeout(function () {
          self.helpSwipe = new Swipe('.swiper-help-nav', {
            slidesPerView: 'auto',
//            slideToClickedSlide: true,
            freeMode: true,
            freeModeMomentumRatio: 0.5,
            prevButton: '.swiper-button-prev',
            nextButton: '.swiper-button-next',
            paginationClickable :true,
          })
        })


        $('.top').each(function () {
          $(this).click(function () {
            $(this).next('.bottom').toggle();
            $(this).children('img').toggleClass('rotate');
          })
        })
      });
    },
    components: {
      'PageNav': PageNav,
    },
    methods:{
      swipeTo(arg){
        var self = this;
        self.helpSwipe.slideTo(arg);
        if(self.helpSwipe.progress==1){
          self.helpSwipe.activeIndex=arg;
        }
      }
    },
  }
</script>
