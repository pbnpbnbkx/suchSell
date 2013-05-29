$(function () {
    $.jgrid.defaults.altclass = "altClass";
    var gridHeight = parseInt(getBrowserHeight() * 0.55);
    var gridWidth = parseInt(getBrowserWidth() * 0.95)

    jQuery("#list").jqGrid({
        url: 'jsonGetjqGridData.ashx',
        datatype: "json",
        contentType: "application/x-www-form-urlencoded",

        colNames: colNames,
        colModel: colModel,
        height: gridHeight,
        width: gridWidth,
        shrinkToFit: false,
        rowNum: 100,
        loadtext: '載入中...',
        rownumbers: true,
        rowList: [100, 1000],
        pager: '#pager',
        loadonce: fun_loadOnce,
        recordpos: 'right',
        //這段應該由後端程式來寫入
        onCellSelect: function (rowid, iCol, cellcontent, e) {
            if (fun_openEditDiv) {
                if (fun_Repair || fun_Picture) {
                    var colCounter = 1;
                    //兩者功能都有則計數為2
                    if (fun_Repair && fun_Picture) {
                        colCounter = 2;
                    }
                    if (iCol > colCounter) {
                        showEditDiv();
                        //OpenRepairList();
                    }
                }
                else {
                    showEditDiv();
                }
            }
        },
        gridComplete: function () {
            if (fun_Repair || fun_Picture) {
                var ids = jQuery("#list").jqGrid('getDataIDs');
                for (var i = 0; i < ids.length; i++) {
                    var cl = ids[i];
                    var row = $("#list").jqGrid('getRowData', cl);
                    if (fun_Repair) {
                        //string be done integer
                        if (row.Repair != 0) {
                            be = "<a href =\"javascript:OpenRepairList(" + fun_exportRepairCard + ")\"><img src=\"../button/Repair.jpg\" width=\"10\" height =\"10\" border =\"0\"  alt=\"請修紀錄\" /></a>"
                        }
                        else {
                            be = "<a href =\"javascript:OpenRepairList(" + fun_exportRepairCard + ")\"><span>R</span></a>"
                        }
                        jQuery("#list").jqGrid('setRowData', ids[i], { Repair: be });
                    }
                    if (fun_Picture) {
                        if (row.Pic != 0) {
                            ce = "<a href =\"#\"><img src=\"../button/Picture.jpg\" width=\"10\" height =\"10\" border =\"0\"  alt=\"圖片瀏灠\" /></a>"
                        }
                        else {
                            ce = ""
                        }
                        jQuery("#list").jqGrid('setRowData', ids[i], { Pic: ce });
                    }

                }

            }
        }
    }).navGrid('#pager', { search: false, edit: false, add: false, del: false, searchtext: "查詢" });
});

    function closeEditDiv(rowID) {
          $("#list").jqGrid('setRowData', rowID, { 備註2: $("#editDiv input#f_備註2").val() });
          $("#list").jqGrid('setRowData', rowID, { 備註2_1: $("#editDiv input#f_備註2_1").val() });
          $("#list").jqGrid('setRowData', rowID, { 使用現況: $("#editDiv input#f_使用現況").val() });
          $("#list").jqGrid('setRowData', rowID, { 存置地點2: $("#editDiv input#f_存置地點2").val() });
   }

   function savePlusFields(){
        var data1="{\"f_系統代碼\":\""+ $("#editDiv input#f_系統代碼").val() +"\",\"f_財物編號\":\"" +
         $("#editDiv span#f_propertyNumber").html() +"\",\"f_財物序號\":\""+ $("#editDiv span#f_propertySN").text() +
         "\",\"f_備註2\":\""+ $("#editDiv input#f_備註2").val() +
         "\",\"f_備註2_1\":\""+ $("#editDiv input#f_備註2_1").val() +
         "\",\"f_使用現況\":\""+ $("#editDiv input#f_使用現況").val() +
         "\",\"f_存置地點2\":\""+ $("#editDiv input#f_存置地點2").val() +"\"}"

        $.ajax({
            url: "jsonSaveEditData.ashx",
            type: "POST",
            data:{"data":data1},
            dataType: "text",
            contentType: "application/x-www-form-urlencoded",
            success: function (data) {
                try {
                    if (data == "Success") {
                        alert("儲存成功");
                    }

                    $("#editDiv").dialog("close");

                }
                catch (err) {
                    txt = "儲存失敗.\n\n";
                    txt += "錯誤原因: " + err.description + "\n\n";
                    alert(txt);
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert(xhr.status + "\n" + thrownError +"\n" +ajaxOptions);
            }
        });
    }

    function showLablePrint() {
        $("#labelDiv").dialog({ width: 300, height:250, resizable: false, draggable: true, modal: true, title: "條碼標籤" });
    }

    function showEditDiv() {
                var id = $("#list").jqGrid('getGridParam', 'selrow');
                if (id) {
                    var row = $("#list").jqGrid('getRowData', id);
                    $("#editDiv span#f_systemName").html(row.系統名稱);
                    $("#editDiv span#f_propertyNumber").html(row.財物編號);
                    $("#editDiv span#f_propertySN").text(row.財物序號);
                    $("#editDiv span#f_propertyNickName").text(row.財物別名);
                    $("#editDiv input#f_備註2").val(row.備註2);
                    $("#editDiv input#f_備註2_1").val(row.備註2_1);
                    $("#editDiv input#f_使用現況").val(row.使用現況);
                    $("#editDiv input#f_存置地點2").val(row.存置地點2);

                    $("#editDiv input#f_系統代碼").val(row.系統代碼);
                } 
        $("#editDiv").dialog({ width: 500,resizable: true, draggable: true, modal: true,title:"編輯",
                                 close: function (event, ui) {
                                     closeEditDiv(id);
                                   }
          })
       }

        function OpenRepairList(fun_exportRepairCard) {
            var id = $("#list").jqGrid('getGridParam', 'selrow');
            if (id) {
                var row = $("#list").jqGrid('getRowData', id);
                //row.Repair will show all element
                if (fun_exportRepairCard) {
                    urlstr = 'RepairCard.aspx?idnumber=' + row.財物編號 + '&snumber=' + row.財物序號 + '&systemCode=' + row.系統代碼 + '&objName=' + row.財物別名
                }
                else {
                    urlstr = '../FormFunction/RepairRecList.asp?idnumber=' + row.財物編號 + '&snumber=' + row.財物序號 + '&systemCode=' + row.系統代碼 + '&objName=' + row.財物別名
                }
                window.open(urlstr, "NewFun1", "width=750,height=500,toolbar=no,menubar=no,resizable=yes,scrollbars=yes", "")
            }
        }

        function exportReport() {
            var dataString = $("#f_ReportName").val() + "|" + encodeURI($("#f_setReportName").val()) + "|" + $("#f_fileType").val() + "|0" ;
            $("#inputdata").val(dataString);

            var popupWin = window.open("reportProcess.aspx?inputdata=" + dataString, "win_report", "width=300,height=100,toolbar=no,menubar=no,resizable=yes,scrollbars=yes");
            popupWin.focus();
        }

        function exportLable(systemClass) {
            var fileType = $("#lable_fileType").val();
            var popupWin = window.open("reportLablePrint.aspx?systemClass=" + systemClass  + "&fileType=" + fileType, "win_report", "width=300,height=100,toolbar=no,menubar=no,resizable=yes,scrollbars=yes");
            popupWin.focus();
        }

        function setReportName() {
            //$("#f_setReportName").val($("#f_ReportName :selected").text());
        }

        function showReportDiv() {
            $("#reportDiv").dialog({ width: 500, resizable: true, draggable: true, modal: true,title:"報表匯出"});
        }

        /*
        function ufsubmit1() {
            var popupWin = window.open("PromainAll.aspx", "PgeqryForm", "width=300,height=100,toolbar=no,menubar=no,resizable=yes,scrollbars=yes");
            popupWin.focus();
        }
        */
        function ufsubmit() {
            window.document.location.href = "PromainAllExcel.aspx"
        }
        function GoMainPage() {
            top.location.href = "../usermenu.asp"
        }
