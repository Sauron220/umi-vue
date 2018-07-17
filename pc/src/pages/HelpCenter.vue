<template>
  <div class="helpCenter-content" v-TDK="TDK">
    <div class="search_content">
      <div class="wrap clearfix">
        <h1>幫助中心</h1>
        <input type="text" placeholder="輸入問題" id="searchText">
        <img src="../assets/images/icon_search.jpg" id="searchBtn" @click="search">
      </div>
    </div>

    <div class="clearfix help-box help">
      <div class="scrollWrap">
        <a href="#1" class="help_list">登錄註冊</a>
        <a href="#2" class="help_list">賬戶密碼</a>
        <a href="#3" class="help_list" id="realNameAuth">開戶</a>
        <a href="#4" class="help_list">綁卡</a>
        <a href="#5" class="help_list" id="recharge">儲值</a>
        <a href="#6" class="help_list" id="withdraw">提領</a>
        <a href="#7" class="help_list">紅包</a>
        <a href="#8" class="help_list" id="coupon">加息券</a>
        <a href="#9" class="help_list" id="purchase">新用戶相關問題</a>
        <a href="#10" class="help_list">產品介紹</a>
        <a href="#11" class="help_list">用戶利益保障機制</a>
        <a href="#12" class="help_list">借款審核與風控</a>
        <a href="#13" class="help_list">用戶的自我保護</a>
      </div>

      <div class="info_details">
        <div class="help_inner inner-high">
          <div class="help_bar">
            <div class="top clearfix">
              <span>1、註冊時，進行手機驗證，收不到短信怎麽辦？</span>
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
              <span>2、在聚寶盆上註冊後，可以不開通上海銀行資金存管賬戶就進行投資嗎？</span>
            </div>
            <div class="bottom">不可以。上海銀行資金存管賬戶用於分賬管理用戶的交易與資金資訊，如不開立，無法進行後續的操作。</div>
          </div>
          <div class="help_bar">
            <div class="top clearfix">
              <span>3、在上海銀行頁面操作時，手機收不到驗證碼怎麽辦？</span>
            </div>
            <div class="bottom">
              <ul>
                <li>請確認手機是否安裝短信攔截或過濾軟件；</li>
                <li>請確認手機是否能夠正常接收短信（信號問題、欠費、停機等）；</li>
                <li>短信收發過程中可能會存在延遲，請耐心等待；</li>
                <li>部分運營商短信存在到達率問題；</li>
                &lt;!&ndash;<li>用戶還可以聯系匯付天下的客服，尋求幫助（400-820-2819）。</li>&ndash;&gt;
              </ul>
            </div>
          </div>-->
        </div>

        <div class="help_inner">
          <div class="help_bar">
            <div class="top clearfix">
              <span>1、如何修改登錄密碼？</span>

            </div>
            <div class="bottom">打開聚寶盆，進入【個人中心】--【賬戶安全】頁面，點擊【登錄密碼】資訊欄，修改登錄密碼。</div>
          </div>
          <div class="help_bar">
            <div class="top clearfix">
              <span>2、如何找回登錄密碼？</span>

            </div>
            <div class="bottom">進入登錄頁面，點擊【忘記密碼】；跳轉至【密碼找回】頁面，可以選擇通過手機號找回登錄密碼。</div>
          </div>
          <div class="help_bar">
            <div class="top clearfix">
              <span>3、用戶的手機號出現變更，該如何修改？</span>

            </div>
            <div class="bottom">
              出於安全性考慮，用戶暫不可修改註冊時綁定的手機號。
            </div>
          </div>
          <!--<div class="help_bar">
            <div class="top clearfix">
              <span>4、上海銀行資金存管賬戶的支付密碼和用戶銀行資料的支付密碼有關系嗎？</span>

            </div>
            <div class="bottom">
              沒有關系。用戶在開通上海銀行資金存管賬戶時設置的存管賬戶支付密碼為用戶在平臺進行投資、提領時的資金支付密碼，而用戶的銀行資料，是用戶獨立銀行開立的實體銀行賬戶，與用戶在平臺的存管賬戶並非同壹賬戶。
            </div>
          </div>-->
         <!-- <div class="help_bar">
            <div class="top clearfix">
              <span>5、用戶的手機號出現變更，該如何修改？</span>

            </div>
            <div class="bottom">出於安全性考慮，用戶暫不可修改註冊時綁定的手機號。</div>
          </div>-->
        </div>

        <div class="help_inner">
          <div class="help_bar">
            <div class="top clearfix">
              <span>1、進行實名認證後，能解綁或重新認證嗎？</span>

            </div>
            <div class="bottom">用戶在網站不可以進行解綁操作，如需解綁請聯繫客服（02-8780-6767）。</div>
          </div>
          <div class="help_bar">
            <div class="top clearfix">
              <span>2、一個手機號能綁定幾個聚寶盆賬戶？</span>

            </div>
            <div class="bottom">一個手機號只能綁定一個聚寶盆賬戶。
            </div>
          </div>
          <div class="help_bar">
            <div class="top clearfix">
              <span>3、如何修改綁定手機號？</span>

            </div>
            <div class="bottom">
              出於安全性考慮，用戶暫不可修改註冊時綁定的手機號。
            </div>
          </div>
         <!-- <div class="help_bar">
            <div class="top clearfix">
              <span>4、進行實名認證後，能解綁或重新認證嗎？</span>

            </div>
            <div class="bottom">用戶在網站不可以進行解綁操作，如需解綁請聯系客服（02-8780-6767）。</div>
          </div>-->
        <!--  <div class="help_bar">
            <div class="top clearfix">
              <span>5、壹個手機號能綁定幾個聚寶盆賬戶？</span>

            </div>
            <div class="bottom">壹個手機號只能綁定壹個聚寶盆賬戶。</div>
          </div>
          <div class="help_bar">
            <div class="top clearfix">
              <span>6、如何修改綁定手機號？</span>

            </div>
            <div class="bottom">出於安全性考慮，用戶暫不可修改註冊時綁定的手機號。</div>
          </div>-->
        </div>

        <div class="help_inner">
          <div class="help_bar">
            <div class="top clearfix">
              <span>1、如何完成綁卡操作？</span>

            </div>
            <div class="bottom">用戶需填寫銀行資料號、開戶銀行、填寫完成後，等待系統反饋綁卡處理結果。</div>
          </div>
          <div class="help_bar">
            <div class="top clearfix">
              <span>2、用戶可以綁定幾張卡？</span>

            </div>
            <div class="bottom">
              每個用戶只能綁定一張有效的銀行資料，可在我的銀行資料頁面進行換綁銀行資料。
            </div>
          </div>
          <div class="help_bar">
            <div class="top clearfix">
              <span>3、是否可以綁定別人的銀行資料？</span>

            </div>
            <div class="bottom">
              不可以，只能使用本人的銀行資料。
            </div>
          </div>
        <!--  <div class="help_bar">
            <div class="top clearfix">
              <span>4、綁卡失敗提示用戶“持卡人身份資訊或手機號輸入不正確”或者“銀行系統錯誤”是什麽意思？</span>

            </div>
            <div class="bottom">
              首先用戶需要確認綁定的卡是否為本人持有。如果用戶確認是自己的銀行資料，那麽用戶輸入的銀行資料預留手機號不正確，不正確有兩種情況：壹是用戶輸入了錯誤的手機號，二是銀行資料本身沒有設置預留手機號。在銀行資料預留手機號錯誤的情況下，用戶需要登錄自己的網銀確認自己的預留手機號。註意，銀行預留手機號是指用戶當初去銀行櫃面申請辦卡時所留的手機號，用戶註冊聚寶盆賬戶時候可能使用另外的手機號，兩者有可能是不壹致的。
            </div>
            <div class="bottom text-gray" style="font-size: 14px;">
              <div>註：1.綁定中國銀行資料，所填“預留手機號”必須為銀行辦卡時預留在移動電話壹欄的手機號，若填寫預留在家庭電話壹欄的手機號則會出錯；2.綁定工商銀行資料，所填“預留手機號”必須為銀行辦卡時在櫃臺所預留的手機號，若填寫其他渠道（如自助網銀預留等）預留的手機號將會導致失敗；</div>
            </div>
          </div>-->
          <!--<div class="help_bar">
            <div class="top clearfix">
              <span>5、用戶可以綁定幾張卡？</span>

            </div>
            <div class="bottom">每個用戶只能綁定壹張有效的銀行資料，可在我的銀行資料頁面進行換綁銀行資料。</div>
          </div>
          <div class="help_bar">
            <div class="top clearfix">
              <span>6、是否可以綁定別人的銀行資料？</span>

            </div>
            <div class="bottom">不可以，只能使用本人的銀行資料。</div>
          </div>-->
        </div>

        <div class="help_inner">
         <!-- <div class="help_bar">
            <div class="top clearfix">
              <span>1、儲值介紹</span>

            </div>
            <div class="bottom">
              為給廣大用戶帶來更加便利的投資體驗，聚寶盆已接入上海銀行資金存管賬戶，聚寶盆的用戶可以通過上海銀行提供的通道進行儲值。用戶儲值的資金進入用戶在上海銀行開立的存管賬戶後，由上海銀行進行存管和監督。
            </div>
          </div>-->
          <div class="help_bar">
            <div class="top clearfix">
              <span>1、如何給賬戶儲值？</span>

            </div>
            <div class="bottom">
              <ul>
                <li>登錄後，進入【個人中心】頁面、或者進入【賬戶總覽頁面】、或者進入產品詳情頁面的購買浮層，點擊【儲值】按鈕；</li>
                <!--<li>跳轉到【儲值】頁面，輸入儲值金額後選擇儲值方式（快捷儲值、網銀儲值），點擊【立即儲值】；</li>
                <li>進入網銀轉賬頁面完成轉賬操作，即可完成儲值。</li>-->
              </ul>
            </div>
          </div>
          <div class="help_bar">
            <div class="top clearfix">
              <span>2、儲值會不會扣手續費？</span>

            </div>
            <div class="bottom">
              為了回饋廣大用戶對聚寶盆的支持和信任，目前用戶儲值暫不需要支付儲值費用。
            </div>
          </div>
          <!--<div class="help_bar">
            <div class="top clearfix">
              <span>3、為什麽用戶去銀行設置了預留手機號，儲值後還是失敗並且提示“銀行系統錯誤”？</span>

            </div>
            <div class="bottom">
              用戶去銀行為自己的銀行資料設置了預留手機號，需要等待7天，匯付天下才會更新用戶銀行資料的預留手機號資訊，之後用戶才能正常儲值。遇到此問題，用戶可以撥打匯付天下的客服電話（400-820-2819）。
            </div>
          </div>-->
         <!-- <div class="help_bar">
            <div class="top clearfix">
              <span>5、儲值是否有限額？</span>

            </div>
            <div class="bottom">儲值限額會根據不同的銀行而變化，在儲值頁面內參考儲值限額壹覽表。</div>
          </div>
          <div class="help_bar">
            <div class="top clearfix">
              <span>6、儲值會不會扣手續費？</span>

            </div>
            <div class="bottom">為了回饋廣大用戶對聚寶盆的支持和信任，目前用戶儲值暫不需要支付儲值費用。</div>
          </div>
          <div class="help_bar">
            <div class="top clearfix">
              <span>7、用戶在向賬戶儲值資金未到賬，是什麽原因？</span>

            </div>
            <div class="bottom">上海銀行資金存管賬戶提供兩種儲值方式，快捷卡儲值與網銀儲值，儲值資金正常即時到賬。由於機構間資訊流轉有可能存在壹定延遲，如儲值成功2小時未到賬可聯系客服咨詢具體情況；</div>
          </div>
          <div class="help_bar">
            <div class="top clearfix">
              <span>8、代扣儲值是什麽？會在用戶不知情的情況下影響用戶的資金麽？</span>

            </div>
            <div class="bottom">代扣儲值是在用戶簽約快捷儲值銀行資料時，授權匯付天下在驗證用戶的資金托管賬戶支付密碼及手機驗證碼後，從用戶綁定的銀行資料內進行扣款至平臺賬戶，從而完成快捷支付流程的過程；
              代扣儲值需要綁定用戶簽約本人銀行資料，且在儲值前均需用戶輸入匯付天下資金托管的賬戶支付密碼，平臺不會自動對用戶卡內資金進行扣款，也請用戶勿對外泄露密碼。
            </div>
          </div>-->
        </div>

        <div class="help_inner">
          <div class="help_bar">
            <div class="top clearfix">
              <span>1、申請提領後，多久能到賬？</span>

            </div>
            <div class="bottom">根據銀行提供的路由通道不同，實際到賬時間各不相同，最快即時到賬。</div>
          </div>
          <div class="help_bar">
            <div class="top clearfix">
              <span>2、提領會不會扣手續費？</span>

            </div>
            <div class="bottom">為了回饋廣大用戶對聚寶盆的支持和信任，目前用戶儲值暫不需要支付提領費用。</div>
          </div>
          <div class="help_bar">
            <div class="top clearfix">
              <span>3、如何提領？</span>

            </div>
            <div class="bottom">登錄聚寶盆我的賬戶-提領，輸入要提領的金額，點擊【立即提領】，跳轉至上海銀行提領頁面完成提領操作，等待到賬即可。
            </div>
          </div>
          <div class="help_bar">
            <div class="top clearfix">
              <span>4、如果所填寫的銀行資料資訊不正確，能否提領成功？</span>

            </div>
            <div class="bottom">如果用戶填寫的銀行資料號有誤或該銀行資料開戶名不是用戶實名認證的姓名，不會提領成功。</div>
          </div>
          <div class="help_bar">
            <div class="top clearfix">
              <span>5、提領未到賬，是什麽原因？</span>

            </div>
            <div class="bottom">
              提領後，聚寶盆交易記錄顯示 「銀行處理中」，並且銀行資料內餘額未增加。這是因為不同的提領路由通道到賬時間各不相同，最快即時到賬，如隔天還未到賬可聯繫客服查詢解決。
            </div>
          </div>
        </div>

        <div class="help_inner">
          <div class="help_bar">
            <div class="top clearfix">
              <span>1、什麽是紅包？</span>

            </div>
            <div class="bottom">紅包是聚寶盆為答謝廣大新老用戶所推出的優惠內容，用戶可通過紅包獲得現金或者體驗金。</div>
          </div>
          <div class="help_bar">
            <div class="top clearfix">
              <span>2、紅包的獲取。</span>

            </div>
            <div class="bottom">聚寶盆會以站內活動等不特定形式向用戶發放紅包，用戶可以通過關註聚寶盆官方微信、微博獲取相關資訊。</div>
          </div>
          <div class="help_bar">
            <div class="top clearfix">
              <span>3、紅包使用規則</span>

            </div>
            <div class="bottom">
              現金紅包會直接進入用戶的可用餘額中，用戶可以利用現金進行投資或者提領。
            </div>
          </div>
        </div>

        <div class="help_inner">
          <div class="help_bar">
            <div class="top clearfix">
              <span>1、什麽是加息券？</span>
            </div>
            <div class="bottom">加息券是聚寶盆為答謝廣大新老用戶所推出的優惠內容，用戶可通過加息券增加所購產品的年化利率。</div>
          </div>
          <div class="help_bar">
            <div class="top clearfix">
              <span>2、加息券的獲取？</span>
            </div>
            <div class="bottom">聚寶盆會以站內活動等不特定形式向用戶發放加息券，用戶可以通過關注聚寶盆官方微信、微博獲取相關資訊。</div>
          </div>
          <div class="help_bar">
            <div class="top clearfix">
              <span>3、如何使用加息券？</span>
            </div>
            <div class="bottom">進入聚寶盆的產品詳情頁，在購買頁面，即可看到優惠券的入口，點擊後進入優惠券選擇頁面，選擇加息券。</div>
          </div>
          <div class="help_bar">
            <div class="top clearfix">
              <span>4、加息券使用規則</span>
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

        <div class="help_inner">
          <div class="help_bar">
            <div class="top clearfix">
              <span>1、什麽用戶可以在聚寶盆理財？</span>

            </div>
            <div class="bottom">
              年滿18週歲，具有完全民事權利能力和民事行為能力，可以在聚寶盆網站上進行註冊、開戶和綁卡，成為理財人。用戶在聚寶盆網站選擇的理財產品所適用的法律法規、監管規定對用戶的資格有其他要求的，還應當符合相應要求。
            </div>
          </div>
          <div class="help_bar">
            <div class="top clearfix">
              <span>2、怎樣進行投資？</span>
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

            </div>
            <div class="bottom">由於產品超募而導致的退款不是即時到賬的，將由系統統一髮起退款，具體到賬時間，請查看交易記錄中退款的完成時間。</div>
          </div>
          <div class="help_bar">
            <div class="top clearfix">
              <span>4、理財產品計息後是否可以提前退出?</span>

            </div>
            <div class="bottom">
              均不支持提前退出。
            </div>
          </div>
          <div class="help_bar">
            <div class="top clearfix">
              <span>5、理財是否有額外費用？</span>

            </div>
            <div class="bottom">
              <b>儲值、提領費用</b><br>為了回饋廣大用戶對聚寶盆的支持和信任，目前用戶儲值和提領暫不需要支付手續費用。<br>
              <b>產品相關費用</b><br>
              產品的發行方、銷售方收取的申購/認購費、贖回費、管理費、手續費等費用，根據用戶所選擇的具體產品的產品協議、規則及相關法律文件確定。
            </div>
          </div>
          <div class="help_bar">
            <div class="top clearfix">
              <span>6、什麼是到期還本付息？</span>

            </div>
            <div class="bottom">到期還本付息是指借款到期後一次性歸還本金和利息。</div>
          </div>
          <div class="help_bar">
            <div class="top clearfix">
              <span>7、什麼是等額本息？</span>
            </div>
            <div class="bottom">等額本息還款法是一種被廣泛採用的還款方式。在還款期內，每月償還同等數額的借款(包括本金和利息)。借款人每月還款額中的本金比重逐月遞增、利息比重逐月遞減。</div>
          </div>
          <div class="help_bar">
            <div class="top clearfix">
              <span>8、投標成功後，什麼時候開始計息？</span>
            </div>
            <div class="bottom">投標成功後，會根據產品的計息時間進行計息，如果是D+N方式計息，那麼在滿標放款N天後的自然日計息，如果是T+N方式計息，那麼在滿標放款N天後的工作日計息。</div>
          </div>
          <div class="help_bar">
            <div class="top clearfix">
              <span>9、產品到期後，什麼時候還款到賬？</span>
            </div>
            <div class="bottom">產品到期後，會根據資金到賬實際時間計算還款時間，如果是D+N方式還款，那麼在產品到期N天後的自然日還款到賬，如果是T+N方式還款，那麼在產品到期N天後的工作日還款到賬。</div>
          </div>
          <div class="help_bar">
            <div class="top clearfix">
              <span>10、為什麼產品計息或者還款到賬會有一定延遲，而不是即時的？</span>
            </div>
            <div class="bottom">部分交易所渠道獲得放款或者資產到期後，由於 機構結算、銀行間資金流轉以及節 假日因素，計息時間或還款到賬時間存在一定 延遲。</div>
           <!-- <div class="bottom">（N≠0）（N =設定延遲天數）<br>
              <table class="table-border" style="background: #fff;">
                <thead>
                <tr>
                  <td>後臺設置</td>
                  <td>計息時間</td>
                  <td>還款到賬時間</td>
                </tr>
                </thead>
                <tbody>
                <tr>
                  <td>D+0</td>
                  <td>滿標放款當天開始計息（D+0）</td>
                  <td>還款到期當天可提領（D+0）</td>
                </tr>
                <tr>
                  <td>D+N</td>
                  <td>滿標放款後第N天開始計息（D+N）</td>
                  <td>還款到期後第N天可提領（D+N）</td>
                </tr>
                <tr>
                  <td>T+0</td>
                  <td>滿標放款當天開始計息，遇節假日順延（T+0）</td>
                  <td>還款到期當天可提領，遇節假日順延（T+0）</td>
                </tr>
                <tr>
                  <td>T+N</td>
                  <td>滿標放款後第N天開始計息，遇節假日順延（T+N）</td>
                  <td>還款到期後第N天可提領，遇節假日順延（T+N）</td>
                </tr>
                </tbody>
              </table>
            </div>-->
          </div>
        </div>

        <div class="help_inner">
          <div class="help_bar">
            <div class="top clearfix">
              <span>1、聚寶盆的理財產品有哪些？</span>

            </div>
            <div class="bottom">聚寶盆的理財產品分別有：一桶金、聚寶計劃、分期投、月月盈以及聚寶盆不時推出的其他理財產品。</div>
          </div>
         <!-- <div class="help_bar">
            <div class="top clearfix">
              <span>2、什麽是聚寶計劃？</span>

            </div>
            <div class="bottom">
              聚寶計劃是聚寶盆平臺為用戶提供的投標工具，由系統為用戶實現投標，更好的滿足用戶多樣化的理財需求。該產品所對應的借款均100%適用於聚寶盆理財用戶利益保障機制。用戶出借所獲得的利息收益可選擇收益再投資（到期壹次性領取本金和收益），借款期限為1個月，預期年化收益率在7.50%左右。
            </div>
          </div>
          <div class="help_bar">
            <div class="top clearfix">
              <span>3、什麽是分期投？</span>

            </div>
            <div class="bottom">
              分期投是聚寶盆平臺為用戶提供的投標工具，由系統為用戶實現投標，更好的滿足用戶多樣化的理財需求。該產品所對應的借款均100%適用於聚寶盆理財用戶利益保障機制。用戶出借所獲得的利息收益可選擇收益再投資（到期壹次性領取本金和收益），借款期限為3個月，預期年化收益率在9.00%左右。
            </div>
          </div>
          <div class="help_bar">
            <div class="top clearfix">
              <span>4、什麽是月月盈？</span>

            </div>
            <div class="bottom">
              月月盈是聚寶盆平臺為用戶提供的投標工具，由系統為用戶實現投標，更好的滿足用戶多樣化的理財需求。該產品所對應的借款均100%適用於聚寶盆理財用戶利益保障機制。用戶出借所獲得的利息收益可選擇收益再投資（到期壹次性領取本金和收益），借款期限為6個月，預期年化收益率在10.00%左右。
            </div>
          </div>
          <div class="help_bar">
            <div class="top clearfix">
              <span>5、什麽是年年余？</span>

            </div>
            <div class="bottom">
              年年余是聚寶盆平臺為用戶提供的投標工具，由系統為用戶實現投標，更好的滿足用戶多樣化的理財需求。該產品所對應的借款均100%適用於聚寶盆理財用戶利益保障機制。用戶出借所獲得的利息收益可選擇收益再投資（到期壹次性領取本金和收益），借款期限為12個月，預期年化收益率在12.00%左右。
            </div>
          </div>
          <div class="help_bar">
            <div class="top clearfix">
              <span>6、什麽是壹桶金？</span>

            </div>
            <div class="bottom">
              壹桶金是聚寶盆為新註冊用戶提供的優惠理財產品，由系統為新手用戶實現投標。該產品所對應的借款均100%適用於聚寶盆理財用戶利益保障機制。借款期限為14天，預期年化收益率在13.00%左右。
            </div>
          </div>-->
        </div>


        <div class="help_inner">
          <div class="help_bar">
            <div class="top clearfix">
              <span>1、在聚寶盆投資能否保障用戶利益？</span>

            </div>
            <div class="bottom">為保障投資人的投資安全，聚寶盆設有適用於全體投資人的用戶利益保障機制。</div>
          </div>
          <div class="help_bar">
            <div class="top clearfix">
              <span>2、什麼是用戶利益保障機制</span>

            </div>
            <div class="bottom">
              「用戶利益保障機制」是聚寶盆設立的為保護投資人的共同利益而建立的信用風險承擔機制。除另有說明外，投資人經過平台身份認證後，在平台進行的符合本機制規定的投資行為均適用於「用戶利益保障機制」項下對應的保障機制，投資人無需為此支付任何費用。聚寶盆有權根據市場和實際情況，對「用戶利益保障機制」的保障機制和規則進行調整並通過平台公示的形式告知各投資人，無需再取得各投資人的同意。
            </div>
          </div>
        </div>


        <div class="help_inner">
          <div class="help_bar">
            <div class="top clearfix">
              <span>1、嚴格的貸前審核</span>

            </div>
            <div class="bottom">
              在客戶提出借款申請後，聚寶盆或聚寶盆的合作機構會對客戶的基本資料進行分析。通過網絡、電話及其他可以掌握的有效渠道進行詳實、仔細的調查。避免不良客戶的欺詐風險。在資料資訊覈實完成後，根據個人信用風險分析系統進行評估，由經驗豐富的借款審核人員進行雙重審核確認後最終決定批核結果。
            </div>
          </div>
          <div class="help_bar">
            <div class="top clearfix">
              <span>2、完善的貸後管理</span>

            </div>
            <div class="bottom">
              如果用戶逾期未歸還借款，聚寶盆或聚寶盆合作機構的貸後管理部門將第一時間通過短信、電話等方式提醒用戶進行還款。如果用戶在5天內還未歸還當期借款，聚寶盆或聚寶盆的合作機構將會聯繫該用戶的緊急聯繫人、直系親屬、單位等督促用戶盡快還款。如果用戶仍未還款，交由專業的高級催收團隊與第三方專業機構合作進行包括上門等一系列的催收工作，直至採取法律手段。
            </div>
          </div>
          <div class="help_bar">
            <div class="top clearfix">
              <span>3、權限管理和隱私安全</span>

            </div>
            <div class="bottom">
              聚寶盆網站運用各種先進的安全技術保護。聚寶盆賬戶中存儲用戶的個人資訊、賬戶資訊以及交易記錄，以免用戶賬戶遭受未經授權的訪問、使用以及資訊洩露。
              聚寶盆網站有著完善的安全監測系統，可以及時發現網站的非正常訪問並做相應的安全響應。對於用戶的賬戶資訊， 聚寶盆網站會對其進行高強度的加密，以防止用戶資訊的外洩。<br/>
              同時，我們還會持續更新和改進網站的安全策略，以保證網站安全策略的有效性。
            </div>
          </div>
        </div>


        <div class="help_inner">
          <div class="help_bar">
            <div class="top clearfix">
              <span>1、牢記聚寶盆官方網址</span>

            </div>
            <div class="bottom">牢記聚寶盆官方網址：http://www.fundbowl.tw
              不要點擊來歷不明的連結訪問聚寶盆，謹防網站釣魚和欺詐。我們建議用戶將聚寶盆官方網址加入瀏覽器收藏夾，以方便下次訪問。
            </div>
          </div>
          <div class="help_bar">
            <div class="top clearfix">
              <span>2、為賬戶設置高強度的登錄密碼</span>

            </div>
            <div class="bottom">
              建議用戶在密碼設置時，使用數字和字母混合，不要使用純數字或純字母，且密碼長度要在6位以上；<br>不要使用生日、姓名拼音、身份證號碼、手機號或是郵箱名作為登錄密碼；<br>不要使用連續的，或重復的字母、數字組合作為密碼，例如：aaaaaa，111111，abcdef，123456；<br>不要使用以下常用密碼，例如：qazwsx，qwerty，mima123，password等。
            </div>
          </div>
          <div class="help_bar">
            <div class="top clearfix">
              <span>3、注重電腦運行環境的安全</span>

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

            </div>
            <div class="bottom">用戶在平台上交流的過程中，不要向其他用戶透露自己真實姓名與住址等，以防個人資訊被盜取造成損失。</div>
          </div>
          <div class="help_bar">
            <div class="top clearfix">
              <span>5、避免私下交易</span>

            </div>
            <div class="bottom">聚寶盆建議用戶避免私下交易。私下交易的約束力極低，造成逾期的風險非常高，同時用戶的個人資訊將有可能被洩漏，存在遭遇詐騙甚至受到嚴重犯罪侵害的隱患。</div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'HelpCenter',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App',
        TDK:{
          title:'聚寶盆會員幫助中心',
          keyWords:'聚寶盆收益,聚寶盆收費標準,聚寶盆利息,聚寶盆提領',
          description:'聚寶盆會員幫助中心幫您解決登錄註冊、賬戶資訊、儲值提領、產品介紹等壹系列問題‘，有問題找幫助中心，希望給您的預訂疑問提供幫助! 服務熱線 02-8780-6767 。',
        }
      }
    },
    mounted () {
      $(function() {
        var idx = Number(location.hash.replace('#', ''))-1;
        if(idx==-1){
          idx = 0;
        }
        $('.help_list').eq(idx).addClass('help-high');
        $(".help_inner").eq(idx).fadeIn();
        $(document).on('click', '.help_list', function() {
          var index = $(".help_list").index(this);
          $(".help_list").removeClass("help-high");
          $(this).addClass("help-high");
          $(".help_inner").hide().eq(index).fadeIn();
        })
        $(document).on('keyup', '', function() {
          $("#searchText").keyup(function() {
            if (oldKey == $('#searchText').val()) {

            } else {
              state = "0";
              oldKey = $('#searchText').val();
              ind = -1;
              oldCount = 0;
              numArr = [];
            }

          });
        });
        if (location.href.indexOf("coupon") > 0) {
          $("#coupon").click();
        }else if(location.href.indexOf("recharge")>0){
          $("#recharge").click();
        }else if(location.href.indexOf("withdraw")>0){
          $("#withdraw").click();
        }else if(location.href.indexOf("purchase")>0){
          $("#purchase").click();
        }else if(location.href.indexOf("realNameAuth")>0){
          $("#realNameAuth").click();
        }

      });

      var state = "0";
      var oldKey = "";
      var ind = -1;
      var oldCount = 0;
      var numArr = [];
      var searchText = "";

      (function($) {
        $.fn.textSearch = function(str, options) {
          searchText = $('#searchText').val();
          if (numArr.length) {
            next();
            return;
          }
          var defaults = {
            divFlag : true,
            divStr : false,
            markClass : "",
            markColor : "red",
            nullReport : true,
            callback : function() {
              if (!numArr.length) {
                var _top = $(".light").eq(0).offset().top
                  + $(".light").eq(0).height();
                var _tip = $(".light").eq(0).parent().find(".help").text();
                if (_tip == "")
                  _tip = $(".light").eq(0).parent().parent()
                    .find(".help").text();
                var _left = $(".light").eq(0).offset().left;
                var _tipWidth = $(".current").width();
                if (_left > $(document).width() - _tipWidth) {
                  _left = _left - _tipWidth;
                }

                $("html, body").scrollTop(_top - 250);
                state = "1";
                $('.light').each(function() {
                  numArr.push($(this).offset().top);
                });
              }
            }
          };
          var sets = $.extend({}, defaults, options || {}), clStr;
          if (sets.markClass) {
            clStr = "class='" + sets.markClass + "'";
          } else {
            clStr = "style='color:" + sets.markColor + ";'";
          }

          // 對前壹次高亮處理的文字還原
          $("font[class='light']").each(function() {
            var text = document.createTextNode($(this).text());
            $(this).replaceWith($(text));
          });
          $("font[class='light current']").each(function() {
            $(this).removeClass("current");
            $(this).removeClass("light");
          });

          // 字符串正則表達式關鍵字轉化
          $.regTrim = function(s) {
            var imp = /[\^\.\\\|\(\)\*\+\-\$\[\]\?]/g;
            var imp_c = {};
            imp_c["^"] = "\\^";
            imp_c["."] = "\\.";
            imp_c["\\"] = "\\\\";
            imp_c["|"] = "\\|";
            imp_c["("] = "\\(";
            imp_c[")"] = "\\)";
            imp_c["*"] = "\\*";
            imp_c["+"] = "\\+";
            imp_c["-"] = "\\-";
            imp_c["$"] = "\$";
            imp_c["["] = "\\[";
            imp_c["]"] = "\\]";
            imp_c["?"] = "\\?";
            s = s.replace(imp, function(o) {
              return imp_c[o];
            });
            return s;
          };
          $(this).each(
            function() {
              var t = $(this);
              str = $.trim(str);
              if (str === "") {
                alert("關鍵字為空");
                return false;
              } else {
                // 將關鍵字push到數組之中
                var arr = [];
                if (sets.divFlag) {
                  arr = str.split(sets.divStr);
                } else {
                  arr.push(str);
                }
              }
              var v_html = t.html();
              // 刪除註釋
              v_html = v_html.replace(/<!--(?:.*)\-->/g, "");

              // 將HTML代碼支離為HTML片段和文字片段，其中文字片段用於正則替換處理，而HTML片段置之不理
              var tags = /[^<>]+|<(\/?)([A-Za-z]+)([^<>]*)>/g;
              var a = v_html.match(tags), test = 0;
              $.each(a, function(i, c) {
                if (!/<(?:.|\s)*?>/.test(c)) {// 非標簽
                  // 開始執行替換
                  $.each(arr, function(index, con) {
                    if (con === "") {
                      return;
                    }
                    var reg = new RegExp($.regTrim(con), "g");
                    if (reg.test(c)) {
                      // 正則替換
                      c = c.replace(reg, "♂" + con + "♀");
                      test = 1;
                    }
                  });
                  c = c.replace(/♂/g,
                    "<font class='light' " + clStr + ">")
                    .replace(/♀/g, "</font>");
                  a[i] = c;
                }
              });
              // 將支離數組重新組成字符串
              var new_html = a.join("");

              $(this).html(new_html);
              $('#searchText').val(searchText);
              if (test === 0 && sets.nullReport) {
                alert("沒有搜索結果");
                return false;
              }
              // 執行回調函數
              sets.callback();
            });
        };
      })(jQuery);

      function next() {
        $(".light:eq(" + ind + ")").removeClass("current");
        ind++;
        if (ind == numArr.length) {
          ind = 0;
        }
        ind = ind == oldCount ? 0 : ind;
        var key = $("#searchText").val(); // 取key值
        if (!key) {
          oldKey = "";
          return; // key為空則退出
        }

        $(".light:eq(" + ind + ")").addClass("current");

        $("body").scrollTop(numArr[ind]);

        var _top = $(".light").eq(ind).offset().top + $(".light").eq(ind).height();
        var _tip = $(".light").eq(ind).parent().find(".help").text();
        if (_tip == "")
          _tip = $(".light").eq(ind).parent().parent().find(".help").text();
        var _left = $(".light").eq(ind).offset().left;
        var _tipWidth = $(".current").width();
        if (_left > $(document).width() - _tipWidth) {
          _left = _left - _tipWidth;
        }

        $("html, body").scrollTop(_top - 250);
      }

      var submitOrHidden = function(evt) {
        evt = window.event || evt;
        if (evt.keyCode == 13) {
          $("#searchBtn").click();
        }
      };
      window.document.onkeydown = submitOrHidden;

    },
    methods: {
      search(){
        $(".help").textSearch($('#searchText').val(), {
          markColor : "back"
        });
      }
    }
  }
</script>
