// JScript 檔
/*
 window.document.getElementById("")
*/
//取得瀏覽器視窗高度
function getBrowserHeight() {
    if ($.browser.msie) {
        return document.compatMode == "CSS1Compat" ? document.documentElement.clientHeight :
                 document.body.clientHeight;
    } else {
        return self.innerHeight;
    }
}

//取得瀏覽器視窗寬度
function getBrowserWidth() {
    if ($.browser.msie) {
        return document.compatMode == "CSS1Compat" ? document.documentElement.clientWidth :
                 document.body.clientWidth;
    } else {
        return self.innerWidth;
    }
}

function showBrowserVersion() {
    var nVer = navigator.appVersion;
    var nAgt = navigator.userAgent;
    var browserName = '';
    var fullVersion = 0;
    var majorVersion = 0;

    //IE9開啟相容性 會變成IE7
    // In Internet Explorer, the true version is after "MSIE" in userAgent
    if ((verOffset = nAgt.indexOf("MSIE")) != -1) {
        browserName = "Microsoft Internet Explorer";
        fullVersion = parseFloat(nAgt.substring(verOffset + 5));
        majorVersion = parseInt('' + fullVersion);
    }

    // In Opera, the true version is after "Opera"
    else if ((verOffset = nAgt.indexOf("Opera")) != -1) {
        browserName = "Opera";
        fullVersion = parseFloat(nAgt.substring(verOffset + 6));
        majorVersion = parseInt('' + fullVersion);
    }

    // In Firefox, the true version is after "Firefox"
    else if ((verOffset = nAgt.indexOf("Firefox")) != -1) {
        browserName = "Firefox";
        fullVersion = parseFloat(nAgt.substring(verOffset + 8));
        majorVersion = parseInt('' + fullVersion);
    }

    // In most other browsers, "name/version" is at the end of userAgent
    else if ((nameOffset = nAgt.lastIndexOf(' ') + 1) < (verOffset = nAgt.lastIndexOf('/'))) {
        browserName = nAgt.substring(nameOffset, verOffset);
        fullVersion = parseFloat(nAgt.substring(verOffset + 1));
        if (!isNaN(fullVersion)) majorVersion = parseInt('' + fullVersion);
        else { fullVersion = 0; majorVersion = 0; }
    }

    // Finally, if no name and/or no version detected from userAgent...
    if (browserName.toLowerCase() == browserName.toUpperCase()
|| fullVersion == 0 || majorVersion == 0) {
        browserName = navigator.appName;
        fullVersion = parseFloat(nVer);
        majorVersion = parseInt(nVer);
    }

    return browserName;
    document.write('Browser name  = ' + browserName + '<br>');
    document.write('Full version  = ' + fullVersion + '<br>');
    document.write('Major version = ' + majorVersion + '<br>');
    document.write('navigator.appName = ' + navigator.appName + '<br>');
    document.write('navigator.userAgent = ' + navigator.userAgent + '<br>');
}

// 顯示載入的畫面
//ObjName= 元件的id  UserButton=隱藏的button  MyPicUrl=等待的圖片位置 UserMsg=訊息內容
function ShowWaitBar(UserButton,MyPicUrl,UserMsg)
{
  //Span 及 Div在 firefox 中不支援此傳遞 因此改用DIV1方式傳遞並指定名稱為DIV1
  //UserDiv.innerHTML +='<img src=' + MyPicUrl + '>' + UserMsg ;
  window.document.getElementById("DIV1").innerHTML ="<img src='" + MyPicUrl + "' border='0' >" + UserMsg ;

  DisableButton(UserButton);
}

function WebFormPost(url)
{
 window.document.getElementById ("form1").action= url
 window.document.getElementById ("form1").submit();
}

//顯示Msg並詢問user是否如此做然後導入url
function ShowConfirm(Msg, url1,url2)
{
   if (confirm(Msg)){
    location.href= url1
    }
    else{
    location.href= url2
    }
}

function DenyInput(sObject)
{
 //alert(event.keyCode)
 if(event.keyCode !=9 && event.keyCode !=8)
 {
       alert('禁止變更');
       sObject.value=sObject.value.substr(0,sObject.value.length-1);
 }
}

//四捨五入函式
//數學解法
//num 是允許到小數點幾位數的進位
function Round1(value,num){
return parseInt(value * Math.pow(10,num) + 0.5) / Math.pow(10,num);
}
//字串解法
function Round2(value,num){
return Math.round(value * Math.pow(10,num)) / Math.pow(10,num);
}

//允許輸入數值和小數點兩位數
//dotAllow是允許小數點幾位數以下
function CheckFloat(GetNumber,sObjectName)
{   
    if(GetNumber.value.length !=0)
    {
        var re=/^[0-9]+(.[0-9]{1,2})?$/;
        var test1=re.test(GetNumber.value);
        if (!re.test(GetNumber.value))
        {
          alert(sObjectName + '小數點僅允許兩位數');
          GetNumber.style.backgroundColor ='#FFFFCC';
          
          GetNumber.value=GetNumber.value.substr(0,GetNumber.value.indexOf('.') + 3);

        }
    }
}
function CheckFloat_InputAllow(GetNumber)
{
   //允許輸入整數和小數點，若非此條件則取代
 	GetNumber.value=GetNumber.value.replace(/[^\d^.]/g,'');
}

//檢查是否為數值，並需大於 0 同IsInteger 
function CheckInteger(GetNumber,NumberName)
{
	GetNumber.value=GetNumber.value.replace(/\W/g,'');
	GetNumber.value=GetNumber.value.replace(/[^\d]/g,'');
}

//檢查正整數並在指定範圍內
//GetNumber=若取得之值 NumberName=該欄位名稱,UserMaxValue=最大範圍
function IsInteger_InRange(GetNumber,NumberName,UserMaxValue)
{
  IsInteger(GetNumber,NumberName)
  
  if (parseInt(GetNumber.value,10) > UserMaxValue)
  {
     GetNumber.value=0
     GetNumber.focus();
     alert(NumberName +"超出" + UserMaxValue);
  }
}

//檢查正整數和不為空白
function IsInteger(GetNumber,NumberName)
{
     var TmpNumber = GetNumber.value;
     if (TmpNumber.length > 0)
     {
         if(isNaN(GetNumber.value))
         {
           alert(NumberName + "的值須為數值");
           GetNumber.value=0;
           GetNumber.focus();
           //不通過
         }
         else
         {
             if(parseInt(GetNumber.value,10) < 0 )
             {
                 alert(NumberName + "的值須大於等於 0 ");
                 GetNumber.value=0;
                 GetNumber.focus();
              //不通過
             }
         }
     }
     else
     {
           alert(NumberName + "不可為空白");
            //不通過
     }
}

function RuzhiCheckDate(GetDate, DateName) {
    $objDate = GetDate;
    var Msg = "";

    if ($objDate.length !=0) {
            var isDate = true;

            var TmpDate = $objDate.val();
            var sDate = TmpDate.split("/");

            if (sDate.length != 3) {
                alert(DateName + " 格式不正確,須為 年/月/日 的格式 如 96/01/01 ")
                isDate = false;
            }
            else {
                for (var i = 0; i < sDate.length; i++) {
                    if (isNaN(sDate[i])) {
                        Msg = DateName + " 格式不正確 ,請以阿拉伯數值表示年、月、日 ";
                        isDate = false;
                        break;
                    }
                }
                if (isDate) {
                    //月份判斷
                    if (sDate[1] < 1 || sDate[1] > 12) {
                        Msg = DateName + " 的月份需為01~12";
                        isDate = false;
                    }
                    else {
                        var Monthday = 0;
                        var UserMonth = parseInt(sDate[1], 10); //將來源視為10進位碼來處理該數字
                        var UserDay = parseInt(sDate[2], 10);
                        var UserYear = parseInt(sDate[0], 10) + 1911;
                        var isMod = UserYear % 4;

                        //在該月份的日數判斷
                        switch (UserMonth) {
                            case 1:
                                Monthday = 31;
                                break;
                            case 2:
                                if (isMod == 0)
                                    Monthday = 29;
                                else
                                    Monthday = 28;
                                break;
                            case 3:
                                Monthday = 31;
                                break;
                            case 4:
                                Monthday = 30;
                                break;
                            case 5:
                                Monthday = 31;
                                break;
                            case 6:
                                Monthday = 30;
                                break;
                            case 7:
                                Monthday = 31;
                                break;
                            case 8:
                                Monthday = 31;
                                break;
                            case 9:
                                Monthday = 30;
                                break;
                            case 10:
                                Monthday = 31;
                                break;
                            case 11:
                                Monthday = 30;
                                break;
                            case 12:
                                Monthday = 31;
                                break;
                        }
                        if (UserDay > Monthday || UserDay < 1) {
                            Msg=DateName + "該月份的日數需介於 1 ~ " + Monthday;
                            isDate = false;
                        }
                    }


                    if (isDate) {
                        if (sDate[1].length != 2) {
                            Msg = DateName + " 的月份不正確 如1月須為 01 ";
                            isDate = false;
                        }
                        else if (sDate[2].length != 2) {
                            Msg=DateName + " 的日不正確 如1日須為 01 ";
                            isDate = false;
                        }
                        else {
                            switch (sDate[0].length) {
                                case 1:
                                    sDate[0] = "00" + sDate[0];
                                    break;
                                case 2:
                                    sDate[0] = "0" + sDate[0];
                                    break;
                                default:
//                                    if (sDate[0].substring(0, 1) == " ") {
//                                        Msg='年份錯誤，若為民國99年，應為099而不是以空白值呈現';
//                                        isDate = false;
//                                    }
                            }
                        }
                    }

                }
            } //end of else
            if (isDate == true) {
                if (TmpDate.length < 9) {
                    $objDate.val(sDate[0] + "/" + sDate[1] + "/" + sDate[2]);
                }
            }
            else {
                $objDate.css("color", "red");
            }

            //tipMsg($objDate,Msg);
            return isDate;
        }
}

//WebProperty 新日期格式的檢查function ex:0990101 表示為民國99年1月1日
function WPRuzhiCheckDate(GetDate) {
    var reStr = "";

    if (GetDate.value.length == 0) {
        //alert( DateName + "不可為空白");
    }
    else {
        var isDate = true;

        var TmpDate = GetDate.value;

        if (GetDate.value.length != 7) {
            reStr = " 格式不正確,須為 年月日 的格式 如 0990101 ";
            GetDate.focus();
            isDate = false;
        }
        else {
            var sDate = new Array(3);
            sDate[0] = TmpDate.substr(0, 3);
            sDate[1] = TmpDate.substr(3, 2);
            sDate[2] = TmpDate.substr(5, 2);

            for (var i = 0; i < sDate.length; i++) {
                if (isNaN(sDate[i])) {
                    reStr = " 格式不正確 ,請以阿拉伯數值表示年、月、日 ";
                    GetDate.focus();
                    isDate = false;
                    break;
                }
            }

            if (isDate) {
                //月份判斷
                if (sDate[1] < 1 || sDate[1] > 12) {
                    reStr = " 的月份需為01~12";
                    GetDate.focus();
                    isDate = false;
                }
                else {
                    var Monthday = 0;
                    var UserMonth = parseInt(sDate[1], 10); //將來源視為10進位碼來處理該數字
                    var UserDay = parseInt(sDate[2], 10);
                    var UserYear = parseInt(sDate[0], 10) + 1911;
                    var isMod = UserYear % 4;

                    //在該月份的日數判斷
                    switch (UserMonth) {
                        case 1:
                            Monthday = 31;
                            break;
                        case 2:
                            if (isMod == 0)
                                Monthday = 29;
                            else
                                Monthday = 28;
                            break;
                        case 3:
                            Monthday = 31;
                            break;
                        case 4:
                            Monthday = 30;
                            break;
                        case 5:
                            Monthday = 31;
                            break;
                        case 6:
                            Monthday = 30;
                            break;
                        case 7:
                            Monthday = 31;
                            break;
                        case 8:
                            Monthday = 31;
                            break;
                        case 9:
                            Monthday = 30;
                            break;
                        case 10:
                            Monthday = 31;
                            break;
                        case 11:
                            Monthday = 30;
                            break;
                        case 12:
                            Monthday = 31;
                            break;
                    }
                    if (UserDay > Monthday || UserDay < 1) {
                        reStr = "該月份的日數需介於 1 ~ " + Monthday;
                        GetDate.focus();
                        isDate = false;
                    }
                }


                if (isDate) {
                    if (sDate[1].length != 2) {
                        reStr = " 的月份不正確 如1月須為 01 ";
                        GetDate.focus();
                        isDate = false;
                    }
                    else if (sDate[2].length != 2) {
                        reStr = " 的日不正確 如1日須為 01 ";
                        GetDate.focus();
                        isDate = false;
                    }
                    else {
                        switch (sDate[0].length) {
                            case 1:
                                sDate[0] = "00" + sDate[0];
                                break;
                            case 2:
                                sDate[0] = "0" + sDate[0];
                                break;
                        }
                    }
                }

            }
        }
    }

    return reStr;
}

//注意，此項的名稱是固定的，for temp
function CheckDelete()
{
 if(confirm('是否確定刪除資料')){
   window.document.getElementById("ctl00_ContentPlaceHolder1_H_Response").value ="Y";
 }
 else{ 
   window.document.getElementById("ctl00_ContentPlaceHolder1_H_Response").value ="N";
 }
}

//不允許.net的linkbutton的postback使用
function DoNothing()
{
 return false;
}

//檢查電話的格式
function checkTel(thisObj) {
    $obj = $(thisObj);
    var t1 = $obj.val();
    t1 = t1.replace(/[^0-9-()#]{1,15}/g, '');
    $obj.val(t1);
}

//1000926 add, 計算字串bytes
String.prototype.Blength = function () {
    var arr = this.match(/[^\x00-\xff]/ig);
    return arr == null ? this.length : this.length + arr.length;
}

//表單驗證中確認適合 varchar
function formCheckStringLen(obj) {
    var limitBytes = 0
    if ($(obj).attr("maxlength")) {
        limitBytes = $(obj).attr("maxlength");
    }
    var nowbytes = $(obj).val().Blength();
    if (nowbytes > limitBytes) {
        //超過字數
        tipMsg($(obj), "文字長度超過" + limitBytes + ",目前為" + nowbytes);
        return true; //確定超出範圍
    }
    else {
        delTipMsg($(obj));
        return false;
    }
}

//表單驗證中確認 適合 nvarchar
function formCheckStringLen_nvarchar(obj) {
    var limitBytes = 0
    if ($(obj).attr("maxlength")) {
        limitBytes = $(obj).attr("maxlength");
    }
    var nowbytes = $(obj).val().length;
    if (nowbytes > limitBytes) {
        //超過字數
        tipMsg($(obj), "文字長度超過" + limitBytes + ",目前為" + nowbytes);
        return true; //確定超出範圍
    }
    else {
        delTipMsg($(obj));
        return false;
    }
}

//表單驗證中確認without tipmsg
function formCheckStringLen_withoutTip(obj) {
    var limitBytes = 0
    if ($(obj).attr("maxlength")) {
        limitBytes = $(obj).attr("maxlength");
    }
    var nowbytes = $(obj).val().Blength();
    if (nowbytes > limitBytes) {
        //超過字數
        $(obj).attr("title", "文字長度超過" + limitBytes + ",目前為" + nowbytes);
        return true; //確定超出範圍
    }
    else {
        return false;
    }
}

//刪除tipMsg,不支援Pop物件
/*function delTipMsg(obj) {
    $(obj).removeAttr("title");
    $nowSpan = $("#span" + $(obj).attr("id"));
    if ($nowSpan) {
        $nowSpan.remove();
    }
}

//顯示錯誤訊息，userobject是element ，errmsg是訊息，且在該網頁上需加入spanMsg
function tipMsg(userObject, Msg) {
    //$(userObject).css("background-color", "pink").attr("title", Msg);
    $(userObject).attr("title", Msg);
    var idname = "span" + $(userObject).attr("id");

    if ($("#" + idname).text()) {
        $("#" + idname).text(Msg).show();
    }
    else {
        var offset = $(userObject).offset();
        var objectWidth = $(userObject).width()-10;
        //var objHeight = $(userObject).height();
        //alert(offset.top + "   " + objHeight);
        var x = offset.left + objectWidth;
        var y = offset.top ;
        var $newSpan = $("<span id=\"" + idname + "\"></span>");
        $("body").append($newSpan);

        $newSpan.addClass('message_box')
        .css({ "left": x, "top": y, "position": "absolute", "background": "#ffc", "border": "1px solid #CCCCCC", "font-weight": "bold", "min-width": "150px", "max-width": "400px","z-index":999 })
        .text(Msg).hide(8000);

        $(userObject).mouseover(function () {
            $newSpan.show();
        }).mouseout(function () {
            $newSpan.hide();
        });
    }

}*/

//onkeyup 時檢查用
function checkStringLen(obj) {
    //檢查字數是否符合指定長度
    /*
    var t1 = $(obj).val().toString();
    t1 = t1.replace(/^.{limitBytes}/, t1.substring(0, limitBytes - 1));
    $(obj).val(t1);
    */
    var limitBytes = 0
    if ($(obj).attr("maxlength")) {
        limitBytes = $(obj).attr("maxlength");
    }

    var nowbytes = $(obj).val().Blength();
    if (nowbytes > limitBytes) {
        //超過字數
        var nowPagelen = $(obj).val().length
        $(obj).val($(obj).val().toString().substring(0, nowPagelen - 1));
        //因為firefox與Ie8控制不一樣，disable dialog
        //showMessage("輸入字數超過欄位字數<BR>欄位只允許輸入" + limitBytes + "bytes<BR>你已輸入" + nowbytes + "bytes", "警告","M");
    }
}

//userStr是輸入的物件 limitBytes是允許的bytes數 在onblur檢查
function CheckStringLength(userObject, limitBytes) {
    var nowbytes = $(userObject).val().Blength();
    if (nowbytes > limitBytes) {
        showMsgSpan(userObject, '欄位長度超過' + limitBytes + 'bytes,現在為' + nowbytes + 'bytes');
    }
    else {
        hideMsgSpan(userObject);
    }
}

//顯示錯誤訊息，userobject是element ，errmsg是訊息，且在該網頁上需加入spanMsg
function showMsgSpan(userObject, Msg) {
    $(userObject).css('background-color', 'pink').attr('title', Msg);
    var idname = 'span' + $(userObject).attr('id');

    if ($("#" + idname).length != 0) {
        $("#" + idname).text(Msg);
    }
    else {
        var offset = $(userObject).offset();
        var objectWidth = $(userObject).width() - 30;
        var x = offset.left + objectWidth;
        var y = offset.top;

        $('#spanMsg').clone().attr('id', idname).addClass('message_box')
        .css({ "left": x, "top": y, "position": "absolute", "background": "#ffc", "border": "1px solid #CCCCCC", "font-weight": "bold", "min-width": "150px", "max-width": "400px" })
        .text(Msg)
        .appendTo(document.body);
    }
    $("#" + idname).css('z-index', 10).show();
}

function hideMsgSpan(userObject) {
    var sthis = $('#span' + $(userObject).attr('id'));
    if (sthis.val() != '') {
        sthis.css('z-index', -1);
    }
    else {
        $(userObject).css('background-color', 'white').attr('title', '');
        sthis.hide();
    }
}

function CheckInteger_New(sObject) {
    sObject.value = sObject.value.replace(/\W/g, '');
    sObject.value = sObject.value.replace(/[^\d]/g, '');
    if (sObject.value.length == 0) {
        showMsgSpan(sObject, "請填入整數");
    }
    else {
        hideMsgSpan(sObject);
    }
}

function closeMessage() {
    $("#popDialog").dialog("close");
    $("#message").html("");
}

var ruzhiDialog = function (message, titleString, winSize) {
    var popHeight = 0;
    var popWidth = 0;
    switch (winSize) {
        case "L":
            popWidth = 600;
            popHeight = 500;
            break;
        default:
            popWidth = 350;
            popHeight = 200;
            break;
    }
    if (!document.getElementById("ruzhiDialogMessage")) {
        var $newSpan = $("<div id=\"ruzhiDialogMessage\" style=\"display:none\"><div id=\"ruzhiDialogMessage_Text\" style=\"font-size:1.2em;\"></div><br><div style=\"text-align:right;\"><input type=\"button\" onclick=\"$('#ruzhiDialogMessage').dialog('close');\" value=\"確定\"></div></div>");
        $("body").append($newSpan);
    }
    $("#ruzhiDialogMessage_Text").html(message);
    if (titleString.length == 0) {
        $("#ruzhiDialogMessage").dialog({
            create: function (event, ui) {
                $(this).closest('.ui-dialog').find('.ui-dialog-titlebar').hide();
            },
            width: popWidth, height: popHeight, resizable: false, draggable: false, modal: true
        })
    }
    else {
        $("#ruzhiDialogMessage").dialog({ width: popWidth, height: popHeight, resizable: false, draggable: false, modal: true, title: titleString })
    }
};


//只能輸入數字
function CheckIsInt(obj) {
    var values = $(obj).val();
    if (isNaN(values)) {
        $(obj).val('0');
    }
}

//只能輸入數字
function ValidateNumber(e, pnumber) {
    var re = false;
    if (!/^\d+$/.test(pnumber)) {
        var newValue = /^\d+/.exec(e.value);
        if (newValue != null) {
            e.value = newValue;
            re = true;
        }
        else {
            e.value = "";
            re = false;
        }
    }
    return re;
}

//可輸入數字與小數點
function ValidateFloat(e, pnumber) {
    if (!/^\d+[.]?\d*$/.test(pnumber)) {
        var newValue = /^\d+[.]?\d*/.exec(e.value);
        if (newValue != null) {
            e.value = newValue;
        }
        else {
            e.value = "";
        }
    }
    return false;
}

//可輸入數字與小數點限一位
function ValidateFloat2(e, pnumber) {
    if (!/^\d+[.]?[1-9]?$/.test(pnumber)) {
        var newValue = /\d+[.]?[1-9]?/.exec(e.value);
        if (newValue != null) {
            e.value = newValue;
        }
        else {
            e.value = "";
        }
    }

    return false;
}

//可輸入數字與小數點限2位
function ValidateFloat3(e, pnumber) {
    if (!/^\d+[.]?[0-9]{0,2}?$/.test(pnumber)) {
        var newValue = /\d+[.]?[0-9]{2,2}?/.exec(e.value);
        if (newValue != null) {
            e.value = newValue;
        }
        else {
            e.value = "";
        }
    }

    return false;
}

//檢查EMAIL格式
function IsEmail(sTarget) {
    var getValue = $(sTarget).val();
    var objRe = /[A-Za-z0-9_.]+[A-Za-z0-9]+\@([A-Za-z0-9_]+\.)+[a-zA-Z]{2,4}$/;
    var reStr = "";
    ///^[_a-z0-9]+@([_a-z0-9]+\.)+[a-z0-9]{2,3}$/;
    if (getValue == '') {
        //reStr = "欄位請勿空白!!";
        reStr = "456";
    } else {
        if (objRe.test(getValue)) {
            reStr="123";
        } else {
            reStr= "您的EMail格式有誤!!";
        }
    }

    return reStr;
}

//檢查整數格式傳回true/fales
function isInteger(str) {
    var regu = /^[-]{0,1}[0-9]{1,}$/;
    return regu.test(str);
}

//從右取字串
String.prototype.Right = function (n) {
    if (n <= 0)
        return "";
    else if (n > String(this).length)
        return this;
    else {
        var iLen = String(this).length;
        return String(this).substring(iLen, iLen - n);
    }
}
//從左取字串
String.prototype.Left = function (n) {
    if (n <= 0)
        return "";
    else if (n > String(this).length)
        return this;
    else
        return String(this).substring(0, n);
}

//移除Array特定的值tmpArray.removeByValue(val);
Array.prototype.removeByValue = function (val) {
    for (var i = 0; i < this.length; i++) {
        var c = this[i];
        if (c == val || (val.equals && val.equals(c))) {
            this.splice(i, 1);
            break;
        }
    }
};

//針對ie 6, 7, 8 定義indexOf
if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function (obj, fromIndex) {
        if (fromIndex == null) {
            fromIndex = 0;
        } else if (fromIndex < 0) {
            fromIndex = Math.max(0, this.length + fromIndex);
        }
        for (var i = fromIndex, j = this.length; i < j; i++) {
            if (this[i] === obj)
                return i;
        }
        return -1;
    };
}