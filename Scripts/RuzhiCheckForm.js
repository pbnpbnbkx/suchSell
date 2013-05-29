/*if (($.browser.msie  && parseInt($.browser.version, 10)) == 8) {
    $('input[placeholder]').each(function () {
        $(this).css('color', '#7e7783');
        var input = $(this);

        $(input).val(input.attr('placeholder'));

        $(input).focus(function () {
            if (input.val() == input.attr('placeholder')) {
                input.val('');
            }
        });

        $(input).blur(function () {
            if (input.val() == '' || input.val() == input.attr('placeholder')) {
                input.val(input.attr('placeholder'));
            }
        });
    });
}*/

$(function () {
    //$("head").append("<link href=\"../Styles/RuzhiCheckForm.css\" rel=\"stylesheet\" type=\"text/css\" />");

//    $("#tb_push").click(function () {
//        checkForm("div#test_dialog");
//    });

    $("#test_dialog").dialog({
        autoOpen: true,
        height: 500,
        width: 500,
        modal: true,
        open: function (type, data) {
            $(this).parent().appendTo("form");
        }
    });
    
});

function tipMsg(getObj, msg) {
    var offset = $(getObj).offset();
    var x = offset.left;
    var y = offset.top;
    var title = $(getObj).attr("id");

    delTipMsg($(getObj));  //有新的錯誤，先刪除之前的錯誤框

    $(getObj).attr("placeholder", msg); //指定PlaceHolder

    $(getObj).mouseover(function () {
        $("form").append("<span id=\"span_" + title + "\" class=\"show_message\">" + msg + "</span>");
        $("#span_" + title).position({
            of: $(getObj),
            my: "right top",
            at: "right top",
            offset: "0 25", //'"' + y + ' ' + x + '"',
            collision: "none none"
        });
    }).mouseout(function () {
        var title = $(getObj).attr("id");
        $("#span_" + title).remove();
    });
}

function delTipMsg(getObj) {
    $(getObj).unbind('mouseover mouseout');
    var title = $(getObj).attr("title");
    $("#span_" + title).remove();
    $(getObj).attr("placeholder", title);
    $(getObj).removeClass("err2 err3 err4");
}

/*
----------↓錯誤樣式↓----------
err3=不可為空, err2=大小有誤, err4=格式錯誤
----------↓錯誤訊息↓----------
f_Text=不可空白、varchar大小, 
f_int=不可空白、整數格式, 
f_area=不可空白、面積格式小數點第二位,
f_nText=不可空白、nvarchar大小, 
f_date=不可空白、日期格式(1011212), 
f_nodate=日期格式(1011212)
f_ddl=不可空白
*/

function checkForm(getTar) {
    var checkOk = true;
    console.log("Run checkForm");
    $(getTar + " .f_Text").each(function () {
        if ($(this).val().toString().length == 0) {
            console.log("Run checkForm1");
            tipMsg($(this), "欄位請勿空白");
            $(this).addClass("err3");
            checkOk = false;
        }
        else {
            console.log("Run checkForm2");
            if (formCheckStringLen($(this))) {
                $(this).addClass("err2");
                checkOk = false
            }
            else {
                delTipMsg($(this));
            }
        }
    });
    $(getTar + " .f_int").each(function () {
        if ($(this).val().toString().length == 0) {
            tipMsg($(this), "欄位請勿空白");
            $(this).addClass("err3");
            checkOk = false;
        } else {
            if (isInteger($(this).val())) {
                if ($(this).val() > 0) {
                    delTipMsg($(this));
                } else {
                    tipMsg($(this), "欄位請大於零");
                    $(this).addClass("err4");
                    checkOk = false;
                }
            } else {
                tipMsg($(this), "欄位請填入數字");
                $(this).addClass("err4");
                checkOk = false;
            }
        }
    });
    $(getTar + " .f_area").each(function () {
        if ($(this).val().toString().length == 0) {
            tipMsg($(this), "欄位請勿空白");
            $(this).addClass("err3");
            checkOk = false;
        } else {
            if (!/^\d+[.]?[0-9]{0,2}?$/.test($(this).val())) {
                tipMsg($(this), "欄位請填入小數點至第二位的數字");
                $(this).addClass("err4");
                checkOk = false;
            } else {
                delTipMsg($(this));
            }
        }
    });
    $(getTar + " .f_nText").each(function () {
        if ($(this).val().toString().length == 0) {
            tipMsg($(this), "欄位請勿空白");
            $(this).addClass("err3");
            checkOk = false;
        }
        else {
            if (formCheckStringLen_nvarchar($(this))) {
                $(this).addClass("err2");
                checkOk = false
            }
            else {
                delTipMsg($(this));
            }
        }
    });
    $(getTar + " .f_date").each(function () {
        if ($(this).val().toString().length == 0) {
            tipMsg($(this), "欄位請勿空白");
            $(this).addClass("err3");
            checkOk = false;
        }
        else {
            var getStr = WPRuzhiCheckDate(this);
            if (getStr == "") {
                delTipMsg($(this));
            }
            else {
                //delTipMsg($(this));
                tipMsg($(this), getStr);
                $(this).addClass("err2");
                checkOk = false
            }
        }
    });
    $(getTar + " .f_nodate").each(function () {
        if ($(this).val().toString().length == 0) {
            delTipMsg($(this));
        }
        else {
            var getStr = WPRuzhiCheckDate(this);
            if (getStr == "") {
                delTipMsg($(this));
            }
            else {
                //delTipMsg($(this));
                tipMsg($(this), getStr);
                $(this).addClass("err2");
                checkOk = false
            }
        }
    });

    $(getTar + " .f_ddl").each(function () {
        if ($(this).val() == "") {
            tipMsg($(this), "請選擇該項");
            $(this).addClass("err3");
            checkOk = false;
        } else {
            delTipMsg($(this));
        }
    });
    return checkOk;
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