/*
var tmpData = new create_ddlRowDataUser(getVal);
changeUserUnit(1, $$("##D_保管人"), tmpData);
*/

function create_ddlRowDataUser(par) {
    this.par = par;
};

function changeUserUnit(type, getObj, tmpData) {
    $.ajax({
        url: "../ashx/SetHoldPeople.ashx?sType=" + type,
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
                    $(getObj).append("<option value=''>無人員資料</option>");
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