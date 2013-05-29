var pNo = ""; var pUt0 = ""; var pUt1 = ""; var uUt0 = ""; var uUt1 = ""; var sUt0 = "";
var sUt1 = ""; var soc0 = ""; var soc1 = ""; var pUr = ""; var acc = ""; var dDte0 = "";
var dDte1 = ""; var nTlt = ""; var price0 = ""; var price1 = ""; var uUr = ""; var gDte0 = "";
var gDte1 = ""; var type = ""; var memo = ""; var other = "";var procls = "";

$(function () {
    $$("##DDL_ProUnit0").change(function () {
        if ($(this).val() == "") {
            $$("##L_ProUnit0").text("請選擇");
        } else {
            $$("##L_ProUnit0").text($(this).val());
        }
    });

    $$("##DDL_ProUnit1").change(function () {
        if ($(this).val() == "") {
            $$("##L_ProUnit1").text("請選擇");
        } else {
            $$("##L_ProUnit1").text($(this).val());
        }
    });
    //-----------------------------------------------------------
    $$("##DDL_UseUnit0").change(function () {
        if ($(this).val() == "") {
            $$("##L_UseUnit0").text("請選擇");
        } else {
            $$("##L_UseUnit0").text($(this).val());
        }
    });

    $$("##DDL_UseUnit1").change(function () {
        if ($(this).val() == "") {
            $$("##L_UseUnit1").text("請選擇");
        } else {
            $$("##L_UseUnit1").text($(this).val());
        }
    });
    //-----------------------------------------------------------
    $$("##DDL_SaveUnit0").change(function () {
        if ($(this).val() == "") {
            $$("##L_SaveUnit0").text("請選擇");
        } else {
            $$("##L_SaveUnit0").text($(this).val());
        }
    });

    $$("##DDL_SaveUnit1").change(function () {
        if ($(this).val() == "") {
            $$("##L_SaveUnit1").text("請選擇");
        } else {
            $$("##L_SaveUnit1").text($(this).val());
        }
    });
    //-----------------------------------------------------------
    $$("##DDL_ProSource0").change(function () {
        if ($(this).val() == "0") {
            $$("##L_ProSource0").text("請選擇");
        } else {
            $$("##L_ProSource0").text($(this).val());
        }
    });

    $$("##DDL_ProSource1").change(function () {
        if ($(this).val() == "0") {
            $$("##L_ProSource1").text("請選擇");
        } else {
            $$("##L_ProSource1").text($(this).val());
        }
    });
    //-----------------------------------------------------------
    $$("##DDL_ProUnitPle").change(function () {
        if ($(this).val() == "0") {
            $$("##L_ProUnitPle").text("請選擇");
        } else {
            $$("##L_ProUnitPle").text($(this).val());
        }
    });
    //-----------------------------------------------------------
    $$("##DDL_UserUnitPle").change(function () {
        if ($(this).val() == "0") {
            $$("##L_UserUnitPle").text("請選擇");
        } else {
            $$("##L_UserUnitPle").text($(this).val());
        }
    });
    //-----------------------------------------------------------
    $$("##DDL_ProAccount").change(function () {
        if ($(this).val() == "0") {
            $$("##L_ProAccount").text("請選擇");
        } else {
            $$("##L_ProAccount").text($(this).val());
        }
    });
    //-----------------------------------------------------------
    $$("##TB_ScrappedDate0").datepicker({ changeMonth: true, changeYear: true, dateFormat: "yy/mm/dd" });
    $$("##TB_ScrappedDate1").datepicker({ changeMonth: true, changeYear: true, dateFormat: "yy/mm/dd" });
    $$("##TB_BuyDate0").datepicker({ changeMonth: true, changeYear: true, dateFormat: "yy/mm/dd" });
    $$("##TB_BuyDate1").datepicker({ changeMonth: true, changeYear: true, dateFormat: "yy/mm/dd" });

    $("#ui-datepicker-div").hide();

    $("#list").show();

    var gridHeight = parseInt(getBrowserHeight() * 0.95);
    var gridWidth = parseInt(getBrowserWidth() * 0.95)
    jQuery("#list").jqGrid({
        url: "getSearchData.ashx?sType=1",
        datatype: "json",
        contentType: "application/x-www-form-urlencoded",
        colNames: colNames,
        colModel: colModel,
        height: gridHeight,
        width: gridWidth,
        shrinkToFit: false,
        multiselect: false,
        rowNum: 20,
        loadtext: '載入中...',
        rownumbers: true,
        rowList: [20, 50],
        pager: '#pager',
        loadonce: false,
        recordpos: 'right'
    }).navGrid('#pager', { search: false, edit: false, add: false, del: false, searchtext: "查詢" }).trigger("reloadGrid", [{ page: 1}]); ;

});

function exp() {
    if ($("#list tr").length > 1) {
        //alert($("#list tr").length);
        return true;
    } else {
        alert("查無相關資料!!");
        return false;
    }    
}

function csd() {
    procls = $$("##DDL_PClass").val();

    if (procls != "0") {
        var errmsg = "下列有誤：\n";

        pNo = ""; pUt0 = ""; pUt1 = ""; uUt0 = ""; uUt1 = ""; sUt0 = ""; sUt1 = ""; soc0 = ""; soc1 = "";
        pUr = ""; acc = ""; dDte0 = ""; dDte1 = ""; nTlt = ""; price0 = ""; price1 = ""; uUr = ""; gDte0 = "";
        gDte1 = ""; type = ""; memo = ""; other = "";

        if ($$("##CheckBox1").attr("checked") == "checked") {
            var getobj = $$("##TB_PropertyNo").attr("id");
            var getvar = $("#" + getobj).val();


            if (getvar == "") {
                errmsg += "財產編號不能為空\n";
                $("#" + getobj).removeClass("tb10");
                $("#" + getobj).addClass("errtb10");

            } else {
                if (getvar.length > 6) {
                    var chkprocls = false;

                    if (procls == "10") {
                        if (getvar.substr(0, 2) != "10") {
                            errmsg += "財產編號請輸入10開頭\n";
                        } else {
                            chkprocls = true;
                        }
                    } else if (procls == "11") {
                        if (getvar.substr(0, 2) != "11") {
                            errmsg += "財產編號請輸入11開頭\n";
                        } else {
                            chkprocls = true;
                        }
                    } else if (procls == "20") {
                        if (getvar.substr(0, 1) != "2") {
                            errmsg += "財產編號請輸入2開頭\n";
                        } else {
                            chkprocls = true;
                        }
                    } else if (procls == "99") {
                        var getclschk = getvar.substr(0, 1);

                        if ((getclschk == "3") || (getclschk == "4") || (getclschk == "5")) {
                            chkprocls = true;
                        } else {
                            errmsg += "財產編號請輸入3, 4, 5開頭\n";
                        }
                    } else {
                        errmsg += "財產編號請輸入1-5類\n";
                    }

                    if (chkprocls == true) {
                        var splstr = new Array();
                        $("#" + getobj).removeClass("errtb10");
                        $("#" + getobj).addClass("tb10");

                        splstr = getvar.split("：");
                        pNo = splstr[0];
                    }
                } else {
                    errmsg += "財產編號有誤\n";
                    $("#" + getobj).addClass("errtb10");
                    $("#" + getobj).removeClass("tb10");
                }
            }
        } else {
            $$("##TB_PropertyNo").removeClass("errtb10");
            $$("##TB_PropertyNo").addClass("tb10");
        } //財產編號

        if ($$("##CheckBox3").attr("checked") == "checked") {
            var getobj0 = $$("##DDL_ProUnit0").attr("id");
            var getobj1 = $$("##DDL_ProUnit1").attr("id");

            var getvar0 = $("#" + getobj0).val();
            var getvar1 = $("#" + getobj1).val();

            if ((getvar0 == "") && (getvar1 == "")) {
                $("#" + getobj0).addClass("errddl");
                $("#" + getobj1).addClass("errddl");

                errmsg += "保管單位至少選一\n";
            } else {
                $("#" + getobj0).removeClass("errddl");
                $("#" + getobj1).removeClass("errddl");

                pUt0 = getvar0;
                pUt1 = getvar1;
            }

        } else {
            $$("##DDL_ProUnit0").removeClass("errddl");
            $$("##DDL_ProUnit1").removeClass("errddl");
        } //保管單位

        if ($$("##CheckBox4").attr("checked") == "checked") {
            var getobj0 = $$("##DDL_UseUnit0").attr("id");
            var getobj1 = $$("##DDL_UseUnit1").attr("id");

            var getvar0 = $("#" + getobj0).val();
            var getvar1 = $("#" + getobj1).val();

            if ((getvar0 == "") && (getvar1 == "")) {
                $("#" + getobj0).addClass("errddl");
                $("#" + getobj1).addClass("errddl");

                errmsg += "使用單位至少選一\n";
            } else {
                $("#" + getobj0).removeClass("errddl");
                $("#" + getobj1).removeClass("errddl");

                uUt0 = getvar0;
                uUt1 = getvar1;
            }

        } else {
            $$("##DDL_UseUnit0").removeClass("errddl");
            $$("##DDL_UseUnit1").removeClass("errddl");
        } //使用單位

        if ($$("##CheckBox5").attr("checked") == "checked") {
            var getobj0 = $$("##DDL_SaveUnit0").attr("id");
            var getobj1 = $$("##DDL_SaveUnit1").attr("id");

            var getvar0 = $("#" + getobj0).val();
            var getvar1 = $("#" + getobj1).val();

            if ((getvar0 == "") && (getvar1 == "")) {
                $("#" + getobj0).addClass("errddl");
                $("#" + getobj1).addClass("errddl");

                errmsg += "存置地點至少選一\n";
            } else {
                $("#" + getobj0).removeClass("errddl");
                $("#" + getobj1).removeClass("errddl");

                sUt0 = getvar0;
                sUt1 = getvar1;
            }

        } else {
            $$("##DDL_SaveUnit0").removeClass("errddl");
            $$("##DDL_SaveUnit1").removeClass("errddl");
        } //存置地點

        if ($$("##CheckBox6").attr("checked") == "checked") {
            var getobj0 = $$("##DDL_ProSource0").attr("id");
            var getobj1 = $$("##DDL_ProSource1").attr("id");

            var getvar0 = $("#" + getobj0).val();
            var getvar1 = $("#" + getobj1).val();

            if ((getvar0 == "0") && (getvar1 == "0")) {
                $("#" + getobj0).addClass("errddl");
                $("#" + getobj1).addClass("errddl");

                errmsg += "財產來源至少選一\n";
            } else {
                $("#" + getobj0).removeClass("errddl");
                $("#" + getobj1).removeClass("errddl");

                soc0 = getvar0;
                soc1 = getvar1;
            }

        } else {
            $$("##DDL_ProSource0").removeClass("errddl");
            $$("##DDL_ProSource1").removeClass("errddl");
        } //財產來源

        if ($$("##CheckBox7").attr("checked") == "checked") {
            var getobj = $$("##DDL_ProUnitPle").attr("id");

            var getvar = $("#" + getobj).val();

            if (getvar == "0") {
                $("#" + getobj).addClass("errddl");
                errmsg += "保管人未選\n";
            } else {
                $("#" + getobj).removeClass("errddl");
                pUr = getvar;
            }

        } else {
            $$("##DDL_ProUnitPle").removeClass("errddl");
        } //保管人

        if ($$("##CheckBox9").attr("checked") == "checked") {
            var getobj = $$("##DDL_ProAccount").attr("id");

            var getvar = $("#" + getobj).val();

            if (getvar == "0") {
                $("#" + getobj).addClass("errddl");
                errmsg += "會計科目未選\n";
            } else {
                $("#" + getobj).removeClass("errddl");
                acc = getvar;
            }

        } else {
            $$("##DDL_ProAccount").removeClass("errddl");
        }  //會計科目

        if ($$("##CheckBox11").attr("checked") == "checked") {
            var getobj0 = $$("##TB_ScrappedDate0").attr("id");
            var getobj1 = $$("##TB_ScrappedDate1").attr("id");

            var getvar0 = $("#" + getobj0).val();
            var getvar1 = $("#" + getobj1).val();

            if ((getvar0.length == 0) && (getvar1.length == 0)) {
                $("#" + getobj0).addClass("errtb10");
                $("#" + getobj1).addClass("errtb10");
                errmsg += "報廢日期至少需填一\n";
            } else {
                var chd0 = WPRuzhiCheckDate1($$("##TB_ScrappedDate0"), '報廢日期起');

                if (chd0 == "") {
                    dDte0 = getvar0;
                } else {
                    errmsg += chd0;
                }

                if ((dDte0 != "") && (getvar1 == "")) {
                    $("#" + getobj1).removeClass("errtb10");
                } else {
                    var chd1 = WPRuzhiCheckDate1($$("##TB_ScrappedDate1"), '報廢日期迄');

                    if (chd1 == "") {
                        dDte1 = getvar1;
                    } else {
                        errmsg += chd1;
                    }
                }

            }

        } else {
            $$("##TB_ScrappedDate0").removeClass("errtb10");
            $$("##TB_ScrappedDate1").removeClass("errtb10");
        } //報廢日期

        if ($$("##CheckBox13").attr("checked") == "checked") {
            var getobj = $$("##TB_NickName").attr("id");
            var getvar = $("#" + getobj).val();

            if (getvar == "") {
                errmsg += "財產別名不能為空\n";
                $("#" + getobj).removeClass("tb10");
                $("#" + getobj).addClass("errtb10");

            } else {
                var splstr = new Array();
                $("#" + getobj).removeClass("errtb10");
                $("#" + getobj).addClass("tb10");

                nTlt = getvar;

            }
        } else {
            $$("##TB_NickName").removeClass("errtb10");
            $$("##TB_NickName").addClass("tb10");
        } //財產別名

        if ($$("##CheckBox15").attr("checked") == "checked") {
            var getobj0 = $$("##TB_Price1").attr("id");
            var getobj1 = $$("##TB_Price2").attr("id");

            var getvar0 = $("#" + getobj0).val();
            var getvar1 = $("#" + getobj1).val();

            if ((getvar0 == "") && (getvar1 == "")) {
                $("#" + getobj0).addClass("errtb10");
                $("#" + getobj1).addClass("errtb10");

                errmsg += "價值至少填一\n";
            } else {
                $("#" + getobj0).removeClass("errtb10");
                $("#" + getobj1).removeClass("errtb10");

                price0 = getvar0;
                price1 = getvar1;
            }

        } else {
            $$("##TB_Price1").removeClass("errtb10");
            $$("##TB_Price2").removeClass("errtb10");
        }  //價值

        if ($$("##CheckBox8").attr("checked") == "checked") {
            var getobj = $$("##DDL_UserUnitPle").attr("id");

            var getvar = $("#" + getobj).val();

            if (getvar == "0") {
                $("#" + getobj).addClass("errddl");
                errmsg += "使用人未選\n";
            } else {
                $("#" + getobj).removeClass("errddl");
                uUr = getvar;
            }

        } else {
            $$("##DDL_UserUnitPle").removeClass("errddl");
        }  //使用人

        if ($$("##CheckBox10").attr("checked") == "checked") {
            var getobj0 = $$("##TB_BuyDate0").attr("id");
            var getobj1 = $$("##TB_BuyDate1").attr("id");

            var getvar0 = $("#" + getobj0).val();
            var getvar1 = $("#" + getobj1).val();

            if ((getvar0.length == 0) && (getvar1.length == 0)) {
                $("#" + getobj0).addClass("errtb10");
                $("#" + getobj1).addClass("errtb10");
                errmsg += "取得日期至少需填一\n";
            } else {
                var chd0 = WPRuzhiCheckDate1($$("##TB_BuyDate0"), '取得日期起');

                if (chd0 == "") {
                    gDte0 = getvar0;
                } else {
                    errmsg += chd0;
                }

                if ((gDte0 != "") && (getvar1 == "")) {
                    $("#" + getobj1).removeClass("errtb10");
                } else {
                    var chd1 = WPRuzhiCheckDate1($$("##TB_BuyDate1"), '取得日期迄');

                    if (chd1 == "") {
                        gDte1 = getvar1;
                    } else {
                        errmsg += chd1;
                    }
                }

            }

        } else {
            $$("##TB_BuyDate0").removeClass("errtb10");
            $$("##TB_BuyDate1").removeClass("errtb10");
        } //取得日期

        if ($$("##CheckBox12").attr("checked") == "checked") {
            var getobj = $$("##TB_Type").attr("id");
            var getvar = $("#" + getobj).val();

            if (getvar == "") {
                errmsg += "型式不能為空\n";
                $("#" + getobj).removeClass("tb10");
                $("#" + getobj).addClass("errtb10");

            } else {
                var splstr = new Array();
                $("#" + getobj).removeClass("errtb10");
                $("#" + getobj).addClass("tb10");

                type = getvar;

            }
        } else {
            $$("##TB_Type").removeClass("errtb10");
            $$("##TB_Type").addClass("tb10");
        } //型式

        if ($$("##CheckBox14").attr("checked") == "checked") {
            var getobj = $$("##TB_Memo").attr("id");
            var getvar = $("#" + getobj).val();

            if (getvar == "") {
                errmsg += "備註不能為空\n";
                $("#" + getobj).removeClass("tb10");
                $("#" + getobj).addClass("errtb10");

            } else {
                var splstr = new Array();
                $("#" + getobj).removeClass("errtb10");
                $("#" + getobj).addClass("tb10");

                memo = getvar;

            }
        } else {
            $$("##TB_Memo").removeClass("errtb10");
            $$("##TB_Memo").addClass("tb10");
        } //備註

        if ($$("##CheckBox16").attr("checked") == "checked") {
            var getobj = $$("##TB_Other").attr("id");
            var getvar = $("#" + getobj).val();

            if (getvar == "") {
                errmsg += "其他條件不能為空\n";
                $("#" + getobj).removeClass("tb10");
                $("#" + getobj).addClass("errtb10");

            } else {
                var splstr = new Array();
                $("#" + getobj).removeClass("errtb10");
                $("#" + getobj).addClass("tb10");

                other = getvar;

            }
        } else {
            $$("##TB_Other").removeClass("errtb10");
            $$("##TB_Other").addClass("tb10");
        }  //其他條件

        if (errmsg != "下列有誤：\n") {
            alert(errmsg);
        } else {
            insertRow();
        }
    } else {
    alert("請先選擇財產類別!!");
    }
    return false;
}

function StartSearch(sAction, tbName, rowData) {
    var filtersStr = JSON.stringify(rowData);
    var postData = $("#list").jqGrid("getGridParam", "postData");

    $.extend(postData, { rowData: filtersStr });
    $("#list").jqGrid("setGridParam", {
        search: false
    }).trigger("reloadGrid", [{ page: 1}]);

}

function insertRow() {
    var tmpData = new create_RowData(procls, pNo, pUt0, pUt1, uUt0, uUt1, sUt0, sUt1, soc0, soc1, pUr,
                          acc, dDte0, dDte1, nTlt, price0, price1, uUr, gDte0, gDte1, type, memo, other);
    StartSearch("", "", tmpData);
}

function create_RowData(c0, c1, c2, c3, c4, c5, c6, c7, c8, c9, c10, c11, c12, c13, c14, c15, c16, c17, c18, c19, c20, c21, c22) {
    this.c0 = c0; this.c1 = c1;    this.c2 = c2;    this.c3 = c3;    this.c4 = c4;    this.c5 = c5;    this.c6 = c6;    this.c7 = c7;
    this.c8 = c8;    this.c9 = c9;    this.c10 = c10;    this.c11 = c11;    this.c12 = c12;    this.c13 = c13;    this.c14 = c14;
    this.c15 = c15; this.c16 = c16; this.c17 = c17; this.c18 = c18; this.c19 = c19; this.c20 = c20; this.c21 = c21;
    this.c22 = c22;
};

