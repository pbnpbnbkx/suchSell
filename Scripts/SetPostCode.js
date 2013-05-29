/*
    $$("##D_縣市").change(function () {
        var getVal = $(this).val();
        var tmpData = new create_ddlRowData1(getVal);

        changePostCode(2, $$("##D_鄉鎮市區"), tmpData);

        var p1 = $$("##D_鄉鎮市區").val();
        var tmpData1 = new create_ddlRowData2(getVal, p1);

        changePostCode(3, $$("##D_段"), tmpData1);
        $$("##D_B_縣市").val(getVal);
        //-----------------------------------------------------
        changePostCode(2, $$("##D_B_鄉鎮市區"), tmpData);

        var p2 = $$("##D_B_鄉鎮市區").val();
        var tmpData2 = new create_ddlRowData2(getVal, p2);

        changePostCode(3, $$("##D_B_段"), tmpData2);
    });
*/

function create_ddlRowData2(ddlID1, ddlID2) {
    this.ddlID1 = ddlID1; this.ddlID2 = ddlID2;
};

function create_ddlRowData1(ddlID) {
    this.ddlID = ddlID;
};

function changePostCode(type, getObj, tmpData) {
    $.ajax({
        url: "../ashx/SetPostCode.ashx?sType=" + type,
        type: "POST",
        data: { "rowData": JSON.stringify(tmpData) },
        dataType: "json",
        contentType: "application/x-www-form-urlencoded",
        async: false,
        success: function (data) {
            try {
                if (data.length > 0) {
                    $(getObj).empty();
                    $(getObj).append("<option value=''></option>").attr('selected', 'selected');
                    $.each(data, function (Index, jData) {
                        $(getObj).append("<option value='" + jData['code'] + "'>" + jData['value'] + "</option>");
                    });
                } else {
                    $(getObj).empty();
                    $(getObj).append("<option value=''>無資料</option>");
                }
            }
            catch (err) {
                txt = "執行失敗.\n\n";
                txt += "錯誤原因: " + err.description + "\n\n";
                $("#storeDiv").text(txt);
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert(xhr.status + "\n" + thrownError + "\n" + ajaxOptions);
        }
    });
}