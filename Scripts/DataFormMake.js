//Move Type1 Unit->User
function getUser(obj, targetID) {
    $obj2 = $("#" + targetID);
    $.ajax({
        url: "../json/getUser.asp",
        type: "POST",
        data: { par: $(obj).val() },
        dataType: "json",
        contentType: "application/x-www-form-urlencoded",
        success: function (data1) {
            try {
                $obj2.empty();

                $.each(data1, function (sIndex, sData) {
                    $obj2.append("<option value='" + sData['Value'] + "'>" + sData['Text'] + "</option>");
                });

            }
            catch (err) {
                txt = "There was an error on this page.\n\n";
                txt += "Error description: " + err.description + "\n\n";
                txt += "Click OK to continue.\n\n";
                alert(txt);
            }

            $("#move_User1").val($("#move_User").val());
        }

    });
}

	function getSameUnit_Type1() {
        $("#move_Unit1").val($("#move_Unit").val());
        getUser($("#move_Unit1"), "move_User1");
       
	}


//Second Type User->Unit
	function getSameUnit() {
	    $("#move2_Unit1").val($("#move2_Unit").val());
	}

	function getUnit(obj) {
	    $.ajax({
	        url: "../json/getUser.asp",
	        type: "POST",
	        data: { par: $(obj).val(), sType: 1 },
	        dataType: "json",
	        contentType: "application/x-www-form-urlencoded",
	        success: function (data1) {
	            try {
	                $("#move2_Unit").val(data1['Value']);

	                //設定使用人使其人員相同
	                $("#move2_Unit1").val(data1['Value']);
	                $("#move2_User1").val($(obj).val());
	            }
	            catch (err) {
	                txt = "There was an error on this page.\n\n";
	                txt += "Error description: " + err.description + "\n\n";
	                txt += "Click OK to continue.\n\n";
	                alert(txt);
	            }
	        }
	    });
	}

	function getUnit1(obj, targetID) {
	    $obj1 = $(obj);
	    $obj2 = $("#" + targetID);

	    $.ajax({
	        url: "../json/getUser.asp",
	        type: "POST",
	        data: { par: $(obj).val(), sType: 1 },
	        dataType: "json",
	        contentType: "application/x-www-form-urlencoded",
	        success: function (data1) {
	            try {
	                $obj2.val(data1['Value']);
	            }
	            catch (err) {
	                txt = "There was an error on this page.\n\n";
	                txt += "Error description: " + err.description + "\n\n";
	                txt += "Click OK to continue.\n\n";
	                alert(txt);
	            }
	        }
	    });
	}

function SearchUnit(fSearch,TbName)
{
 var NewWindow1=window.open('SearchUnit.aspx?fSearch='+ fSearch +'&TbName='+ TbName,'Window1','width=750,height=500,toolbar=no,menubar=no,resizable=yes,scrollbars=yes')
 NewWindow1.focus();
}

function searchUser(fSearch, TbName) {
    var NewWindow1 = window.open('searchUser.aspx?fSearch=' + fSearch + '&TbName=' + TbName, 'Window1', 'width=750,height=500,toolbar=no,menubar=no,resizable=yes,scrollbars=yes')
    NewWindow1.focus();
}

//移動單 新增人員處理
function addPerson() {
    $("#move2_choicePerson").hide();
    $("#move2_addNewPerson").show();
}

function cancelAdd() {
    var newPerson = $("#move2_newPerson").val().toString();
    if (newPerson.length != 0) {
        if (confirm("返回將清除你的新增人員資料")) {
            $("#move2_newPerson").val("");
            $("#move2_choicePerson").show();
            $("#move2_addNewPerson").hide();
        }
    }
    else {
        $("#move2_newPerson").val("");
        $("#move2_choicePerson").show();
        $("#move2_addNewPerson").hide();
    }
}

function End_Reload() {    
      $("div.formstep1").hide();
      $("#finshButton").show();
  }

  function formSubmit() {
      var formURL = $("#formURL").val();
      if (formURL) {
          End_Reload();
          form1.action = formURL;
          form1.submit();
      }
  }

  function movehide(showtype) {
      $("div#moveType1").hide();
      $("div#moveType2").show();


      if (showtype == "2") {
          $("#moveType1").hide();
          $("#moveType2").show();
      }
      else {
          $("#moveType1").show();
          $("#moveType2").hide();
      }
  }
  //轉換
  function typeTrans() {
      $("#moveType1").css("display") == "none" ? movehide("1") : movehide("2");
  }

  function ufsubmit(formType, systemClass) {
        switch (formType) {
            case 2:
                ufsubmit1(systemClass);
                break;
            case 3:
                ufsubmit2(systemClass);
                break;
            case 4:
                ufsubmit3(systemClass);
                break;
            case 5:
                ufsubmit_Repair(systemClass);
                break;
            case 7:
                break;
            //非移
            case 8:
                ufsubmit1(systemClass);
                break;
            //非借
            case 9:
                ufsubmit1(systemClass);
                break;
            //非報廢
            case 10:
                ufsubmit2(systemClass);
                break;
            //非請修
            case 12:
                ufsubmit_Repair(systemClass);
                break;

         }
}


function ufsubmit1(systemClass)
{
    //移動單
    if (window.document.form1.move_Unit) {
        sUnit = window.document.form1.move_Unit;
        HoldMan = window.document.form1.move_User;
    }
    else {
        sUnit = window.document.form1.move2_Unit;
        if ($("#move2_addNewPerson").css("display") == "none") {
            HoldMan = window.document.form1.move2_User;
        }
        else {
            HoldMan = window.document.getElementById("move2_newPerson");
        }

    }

    StockPlace = window.document.form1.ed3;

     if (sUnit.value.length == 0)
	  {
	        alert("你尚未選擇保管單位");
	        //window.document.form1.ed1.focus();
	        sUnit.focus();
		    return;
	  }
	else if (HoldMan.value.length == 0) {
	    if ($("#move2_addNewPerson").css("display") == "none") {
	        alert("你尚未選擇保管人!")
	    }
	    else {
	        alert("你尚未新增保管人!")
	    }
	    HoldMan.focus();
	    return;
	  }	
     var sConfirm=true;
     if (sConfirm) {
         formSubmit();
     }
}
function ufsubmit2(systemClass) {
    formSubmit();
}

function ufsubmit3(systemClass) {
    formSubmit();
}

function ufsubmit_Repair(systemClass) {
    var checkOk = true;
    $(".f_Text").each(function () {
        if ($(this).val().toString().length == 0) {
            $(this).css("background-color", "pink");
            tipMsg($(this), "欄位請勿空白");
            checkOk = false;
        }
        else {
            if (formCheckStringLen($(this))) {
                $(this).css("background-color", "yellow");
                checkOk = false
            }
            else {
                $(this).css("background-color", "");
                delTipMsg($(this));
            }
        }
    });

    $("input.f_AutoMemo").each(function () {
        if ($(this).val().toString().length == 0) {
            $(this).css("background-color", "pink");
            tipMsg($(this), "欄位請勿空白");
            checkOk = false;
        }
        else {
            if (formCheckStringLen($(this))) {
                $(this).css("background-color", "yellow");
                checkOk = false
            }
            else {
                $(this).css("background-color", "");
                delTipMsg($(this));
            } 
        }
    });
    $("input.f_Int").each(function () {
        if ($(this).val().toString().length == 0) {
            $(this).css("background-color", "pink");
            tipMsg($(this), "欄位請勿空白");
            checkOk = false;
        }
        else {
            delTipMsg($(this));
            $(this).css("background-color", "");
        }
    });

    if (checkOk) {
        var formURL = $("#formURL").val();
        if (formURL) {
            $("div.formstep1").hide();
            $("#finshButton").show();
            End_Reload();
            form1.action = formURL;
            form1.submit();
        }
    }
}
//satart 非消耗品
//end 非耗品javascript

function propertyBack() {
    window.location.href = "ProMain4.asp";
}