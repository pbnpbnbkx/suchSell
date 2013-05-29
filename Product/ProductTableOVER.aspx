<%@ Page Language="VB" AutoEventWireup="false" CodeFile="ProductTableOVER.aspx.vb" Inherits="Product_ProductTableOVER" %>

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
        
        .maskGood
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
    <%--<div id="main">
        <div id="item_list" runat="server">
        
        </div>
    </div>--%>
    <div id="container">
        <!-- 彈出視窗 -->
        <!--
        <div id='pop-divGood' class="pop-box ">  
            <h4>更新中請稍候</h4>  
            <div class="pop-box-body" >
                <asp:Image ID="Image1" runat="server" ImageUrl="~/App_Themes/images/Loading.gif" Width="150px" Height="125px" />
            </div>  
        </div>
        <div id='maskGood'></div>
        -->
        <!--總外框-->
        <div id="container_content">
            <!--總內框-->
            <div id="container_content_Menu" runat="server">
            </div>
        </div>
    </div>
    </form>
</body>
<script type="text/javascript">
    $(document).ready(function () {
        //_refresh_interval = setInterval('do_refreshOver()', 10000);
    });

    function do_refreshOver() {
        //LoadReportDivOver('pop-divGood');

        var par = getParameterByName('par1');

        $("#container_content_MenuGood").empty();

        $.ajax({
            url: "../json/refreshBiddingOver.aspx",
            context: document.body,
            data: "aid=" + par,
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


    function LoadReportDivOver(div_id) {
        var div_obj = $("#pop-divGood");
        var windowWidth = $("#container_content_MenuGood").width();
        var windowHeight = $("#container_content_MenuGood").height();
        $("#pop-divGood").css({ "height": 200, "width": 160 });

        var popupWidth = div_obj.width();
        $("#maskGood").addClass("maskGood")
                                  .width(windowWidth)
                                  .height(windowHeight)
                                  .css({ "opacity": "0.6", "z-index": "9" })
                                  .show()
        div_obj.css({ "position": "absolute", "z-index": "10", "margin-left": windowWidth / 2 - popupWidth / 2 })
               .show();
        var t = setTimeout("hideDivOver()", 3000)
    }

    function hideDivOver() {
        $("#maskGood").hide();
        $("#pop-divGood").hide();
    }

</script>
</html>
