<%@ Page Language="VB" AutoEventWireup="false" CodeFile="ProductTable.aspx.vb" Inherits="Product_ProductTable" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <%--<link href="../Styles/Show%20page.css" rel="stylesheet" type="text/css" />--%>
    <style type="text/css">
       .pop-box {   
            display: none;   
            position: absolute;   
            background: #FFF;   
            border:2px solid #336699;
            font: 16px/22px 'Trebuchet MS', Verdana, Arial; 
            text-align:center;
        }   
        
         .pop-box-body {   
            margin: 4px;   
            padding: 2px;   
        } 
          
        .pop-box h4{ margin-top :0px; height:30px; line-height:30px; width:100%; background-color :Gray ; color:#fff; font-weight:bold;}  
        
        .mask
        {
            display: none; 
            color:#000;
            background-color:#000;
            position:absolute;
        } 
    </style>   
</head>
<body>
    <form id="form1" runat="server">
    
    <div id="container">
        <!-- 彈出視窗 -->
        <div id='pop-div' class="pop-box ">  
            <h4>更新中請稍候</h4>  
            <div class="pop-box-body" >
                <img src="../websell/App_Themes/images/Loading.gif" alt="pic" style="width:150px;height:125px" />
            </div>  
        </div>
        <div id='mask'></div>
        <!--總外框-->
        <div id="container_content">
            <!--總內框-->
            <div id="container_content_Menu" runat="server">
                <asp:Literal ID="HtmlArea" runat="server"></asp:Literal>
            </div>
        </div>
    </div>
    </form>
</body>
<script type="text/javascript">
    $(document).ready(function () {
        //load_exhibit();
        _refresh_interval = setInterval('do_refresh()', 5000);
    });

    function do_refresh() {
        
//        if ($("#ui-tabs-1").hasClass("ui-tabs-panel ui-widget-content ui-corner-bottom")) {
//            alert('yes');
//        } else {
//            alert('no');
//        }
        //LoadReportDiv('pop-div');

        var par = getParameterByName('par1');
        alert(par);
        //抓取商品類型的參數
        var par = $("#MainContent_NowGood").text();
        var par = 1;

        $("#container_content_Menu").empty();

        $.ajax({
            url: "../websell/json/refreshBidding.aspx",
            context: document.body,
            data:{aid:par},
            dataType: "text",
            contentType: "application/x-www-form-urlencoded",
            success: function (data1) {
                try {

                    $("#container_content_Menu").html(data1);
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

    function getParameterByName(name) {
        name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
        var regexS = "[\\?&]" + name + "=([^&#]*)";
        var regex = new RegExp(regexS);
        var results = regex.exec(window.location.href);
        if (results == null)
            return "";
        else
            return decodeURIComponent(results[1].replace(/\+/g, " "));
    }
    
    function LoadReportDiv(div_id) {
        var div_obj = $("#pop-div");
        var windowWidth = $("#container_content_Menu").width();
        var windowHeight = $("#container_content_Menu").height();
        $("#pop-div").css({ "height": 200, "width": 160 });

        var popupWidth = div_obj.width();
        $("#mask").addClass("mask")
                                  .width(windowWidth)
                                  .height(windowHeight)
                                  .css({ "opacity": "0.6", "z-index": "9" })
                                  .show()
        div_obj.css({ "position": "absolute", "z-index": "10", "margin-left": windowWidth / 2 - popupWidth / 2 })
               .show();
        var t = setTimeout("hideDiv()", 3000)
    }

    function hideDiv() {
        $("#mask").hide();
        $("#pop-div").hide();
    }

</script>
</html>
