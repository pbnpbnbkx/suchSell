//日期指定
function getDateSet(postDateID) {    
    var sUrl = '../Calendar.aspx?TextBoxId=' + postDateID
    var myWin = window.open(sUrl, 'win_GetDate', 'height=315,width=350,status=no,toolbar=no,menubar=no,location=no', '');
    myWin.focus();
}

//checkBox隱藏，單一物件
function checkThisTextbox(chkid, targetID) {
    var TID = window.document.getElementById(targetID);
    if (chkid.checked == true) {
        TID.disabled = false;        
    }
    else {
        TID.disabled = true;        
    }
}

//checkBox隱藏，兩個物件
function checkTwoTextbox(chTwoId, tbidA, tbidB) {
    var tidA = window.document.getElementById(tbidA);
    var tidB = window.document.getElementById(tbidB);
    if (chTwoId.checked == true) {
        tidA.disabled = false;
        tidB.disabled = false;
    }
    else {
        tidA.disabled = true;
        tidB.disabled = true;
    }
}

//page剛load進來，指定各物件disabled屬性
function pageLoad(sender, args) {
    var cbA = "#ctl00_ContentPlaceHolder1_CheckBox1"
    var cbB = "#ctl00_ContentPlaceHolder1_CheckBox3"
    var cbC = "#ctl00_ContentPlaceHolder1_CheckBox4"
    var cbD = "#ctl00_ContentPlaceHolder1_CheckBox5"
    var cbE = "#ctl00_ContentPlaceHolder1_CheckBox6"
    var cbF = "#ctl00_ContentPlaceHolder1_CheckBox7"
    var cbG = "#ctl00_ContentPlaceHolder1_CheckBox8"
    var cbH = "#ctl00_ContentPlaceHolder1_CheckBox9"
    var cbI = "#ctl00_ContentPlaceHolder1_CheckBox10"
    var cbJ = "#ctl00_ContentPlaceHolder1_CheckBox11"
    var cbK = "#ctl00_ContentPlaceHolder1_CheckBox12"
    var cbL = "#ctl00_ContentPlaceHolder1_CheckBox13"
    var cbM = "#ctl00_ContentPlaceHolder1_CheckBox14"
    var cbN = "#ctl00_ContentPlaceHolder1_CheckBox15"
    var cbO = "#ctl00_ContentPlaceHolder1_CheckBox16"
    
    if ($(cbA).attr('checked')) {        
        $("#ctl00_ContentPlaceHolder1_TB_PropertyNo").removeAttr("disabled");
    } else {         
        $("#ctl00_ContentPlaceHolder1_TB_PropertyNo").attr("disabled", true);
    }
    
    if ($(cbB).attr('checked')) {
        $("#ctl00_ContentPlaceHolder1_DDL_ProUnit0").removeAttr("disabled");
        $("#ctl00_ContentPlaceHolder1_DDL_ProUnit1").removeAttr("disabled");
    } else {
        $("#ctl00_ContentPlaceHolder1_DDL_ProUnit0").attr("disabled", true);
        $("#ctl00_ContentPlaceHolder1_DDL_ProUnit1").attr("disabled", true);
    }

    if ($(cbC).attr('checked')) {        
        $("#ctl00_ContentPlaceHolder1_DDL_UseUnit0").removeAttr("disabled");
        $("#ctl00_ContentPlaceHolder1_DDL_UseUnit1").removeAttr("disabled");
    } else {        
        $("#ctl00_ContentPlaceHolder1_DDL_UseUnit0").attr("disabled", true);
        $("#ctl00_ContentPlaceHolder1_DDL_UseUnit1").attr("disabled", true);
    }

    if ($(cbD).attr('checked')) {        
        $("#ctl00_ContentPlaceHolder1_DDL_SaveUnit0").removeAttr("disabled");
        $("#ctl00_ContentPlaceHolder1_DDL_SaveUnit1").removeAttr("disabled");
    } else {        
        $("#ctl00_ContentPlaceHolder1_DDL_SaveUnit0").attr("disabled", true);
        $("#ctl00_ContentPlaceHolder1_DDL_SaveUnit1").attr("disabled", true);
    }

    if ($(cbE).attr('checked')) {
        $("#ctl00_ContentPlaceHolder1_DDL_ProSource0").removeAttr("disabled");
        $("#ctl00_ContentPlaceHolder1_DDL_ProSource1").removeAttr("disabled");
    }
    else
     {
        $("#ctl00_ContentPlaceHolder1_DDL_ProSource0").attr("disabled", true);
        $("#ctl00_ContentPlaceHolder1_DDL_ProSource1").attr("disabled", true);
    }

    if ($(cbF).attr('checked')) {
        $("#ctl00_ContentPlaceHolder1_DDL_ProUnitPle").removeAttr("disabled");
    } else {
        $("#ctl00_ContentPlaceHolder1_DDL_ProUnitPle").attr("disabled", true);
    }

    if ($(cbG).attr('checked')) {
        $("#ctl00_ContentPlaceHolder1_DDL_UserUnitPle").removeAttr("disabled");
    } else {
        $("#ctl00_ContentPlaceHolder1_DDL_UserUnitPle").attr("disabled", true);
    }

    if ($(cbH).attr('checked')) {
        $("#ctl00_ContentPlaceHolder1_DDL_ProAccount").removeAttr("disabled");
    } else {
        $("#ctl00_ContentPlaceHolder1_DDL_ProAccount").attr("disabled", true);
    }

    if ($(cbI).attr('checked')) {
        $("#ctl00_ContentPlaceHolder1_TB_BuyDate0").removeAttr("disabled");
        $("#ctl00_ContentPlaceHolder1_TB_BuyDate1").removeAttr("disabled");
    } else {
        $("#ctl00_ContentPlaceHolder1_TB_BuyDate0").attr("disabled", true);
        $("#ctl00_ContentPlaceHolder1_TB_BuyDate1").attr("disabled", true);
    }

    if ($(cbJ).attr('checked')) {
        $("#ctl00_ContentPlaceHolder1_TB_ScrappedDate0").removeAttr("disabled");
        $("#ctl00_ContentPlaceHolder1_TB_ScrappedDate1").removeAttr("disabled");
    } else {
        $("#ctl00_ContentPlaceHolder1_TB_ScrappedDate0").attr("disabled", true);
        $("#ctl00_ContentPlaceHolder1_TB_ScrappedDate1").attr("disabled", true);
    }

    if ($(cbK).attr('checked')) {
        $("#ctl00_ContentPlaceHolder1_TB_Type").removeAttr("disabled");
    } else {
        $("#ctl00_ContentPlaceHolder1_TB_Type").attr("disabled", true);
    }

    if ($(cbL).attr('checked')) {
        $("#ctl00_ContentPlaceHolder1_TB_NickName").removeAttr("disabled");
    } else {
        $("#ctl00_ContentPlaceHolder1_TB_NickName").attr("disabled", true);
    }

    if ($(cbM).attr('checked')) {
        $("#ctl00_ContentPlaceHolder1_TB_Memo").removeAttr("disabled");
    } else {
        $("#ctl00_ContentPlaceHolder1_TB_Memo").attr("disabled", true);
    }

    if ($(cbN).attr('checked')) {
        $("#ctl00_ContentPlaceHolder1_TB_Price1").removeAttr("disabled");
        $("#ctl00_ContentPlaceHolder1_TB_Price2").removeAttr("disabled");
    } else {
        $("#ctl00_ContentPlaceHolder1_TB_Price1").attr("disabled", true);
        $("#ctl00_ContentPlaceHolder1_TB_Price2").attr("disabled", true);
    }

    if ($(cbO).attr('checked')) {
        $("#ctl00_ContentPlaceHolder1_TB_Other").removeAttr("disabled");
    } else {
        $("#ctl00_ContentPlaceHolder1_TB_Other").attr("disabled", true);
    }
  
}