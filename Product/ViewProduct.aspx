<%@ Page Language="VB" AutoEventWireup="false" CodeFile="ViewProduct.aspx.vb" Inherits="Product_ViewProduct" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta http-equiv="Cache-Control" content="no-cache" />
  <meta http-equiv="Pragma" content="no-cache" />
  <meta http-equiv="Expires" content="-1" />      

    <title>動拍賣</title>
    <style type="text/css" >
    div.showpager { text-align:center; clear:both; }
    div.showpager a { padding:5px; border:1px solid #ccc; cursor:pointer; } 
    div.showpager .showMore-navi { margin:1em; }
    </style>
    <script src="../Scripts/jquery.js" type="text/javascript"></script>
</head>
<body>
    <form id="form1" runat="server">
        <table>
            <tr>
              <td>
                    <div id="container_content"> <!--總內框-->
                        <div id="container_content_Menu" runat="server"> <!--商品內框-->
                        </div> <!--商品內框o-->
                    </div> <!--總內框o-->
                    <div id="newpager" class="showpager" runat="server"> 
                    </div> 
                    <input type="hidden" id="pStatus" />
                    <input type="hidden" id="pType" />
              </td>
            </tr>
        </table>
    <asp:Literal ID="Literal1" runat="server"></asp:Literal>
    </form>
</body>
<script type="text/javascript">
    var _refresh_interval;
    $(document).ready(function () {
           load_exhibit();
    });

    function getMoreData(par1, obj) {
        $.getJSON('../json/getProductDataMore.aspx', {
            par1: par1,
            par2: $("#pType").val(),
            par3: $("#pStatus").val()
        }, function (data) {
            moreProduction(data);
        });
        $("div.showMore-navi a").css("color", "");
        $(obj).css("color", "red");
    }

    function moreProduction(data) {
        //清除div內的資料
        $("#container_content_Menu").empty();
        var htmlStr = "<ul>";
        var p_sn = 0;
        while (nowdata = data.moreData.shift()) {
            p_sn = nowdata.商品編號;
            htmlStr += "<li class='auction_item' id='auction_" + p_sn + "'>";
            htmlStr += "<Div class='BOX'>";
            htmlStr += " <div class='BOX-3'>";
            htmlStr += "<table class='P'>";
            htmlStr += "<tr>";
            htmlStr += "<td width='151' class='P2'>" + nowdata.商品名稱 + "</td>";
            htmlStr += "</tr>";
            htmlStr += "</table>";
            htmlStr += "</div>";
            htmlStr += "<Div class='BOX-1'><a href='../bid/default.aspx?p_sn=" + p_sn + "'><img style='border:0px;' src='" + nowdata.圖片 + "' /></a> </Div>";
            htmlStr += "<Div class='BOX-2'>";
            htmlStr += "<table class='P'>";
            htmlStr += "<tr>";
            htmlStr += "<td class='P4'>得 標 者 :</td>";
            htmlStr += "<td width='85px'><div class='bidder'><span id='current_bidder_" + p_sn + "'> " + nowdata.nickName + "</span></div> </td></tr>";
            htmlStr += "<tr>";
            htmlStr += "<td>入 場 費 :</td><td><div class='price'><span id='current_price_" + p_sn + "'>" + nowdata.入場金幣 + "</span></div></td></tr>";
            htmlStr += "<tr>";
            htmlStr += " <td class='P3'>剩餘標數:</td><td><div class='leftbid'><span id='current_leftbid_" + p_sn + "'> " + nowdata.leftBid + "</span></div></td></tr>";
            htmlStr += "</table></Div>";
            htmlStr += "</Div>";
            htmlStr += "</li>";
        }
        htmlStr += "</ul>";
        $("#container_content_Menu").append(htmlStr);
        //重load 否則他會記錄之前的狀態
        clearInterval(_refresh_interval);
        load_exhibit();
    }

    function load_exhibit() {
        var auctionIds = new Array();
        $('#container_content_Menu li.auction_item').each(function () {
            if (id = $(this).attr('id')) {
                if (id.match(/^auction_(\d+)$/)) {
                    auctionIds.push(RegExp.$1);
                }
            }
        });
        if (auctionIds.length) {
            //alert(auctionIds);
            clearInterval(_refresh_interval);
            _refresh_interval = setInterval("do_refresh('" + auctionIds.join(',') + "')",5000);
            //do_refresh(auctionIds.join(','));
        }
    }

    function getParameterByName(name) {
        name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
        var regexS = "[\\?&]" + name + "=([^&#]*)";
        var regex = new RegExp(regexS);
        var results = regex.exec(window.location.href);
        alert(results);
        if (results == null)
            return "";
        else
            return decodeURIComponent(results[1].replace(/\+/g, " "));
    }

    function do_refresh(exhibitIds) {
        //09test.ruzhi.com.tw
        $.getJSON('../json/refreshBidding.aspx', {
            aid: exhibitIds,
            t: (new Date()).getTime()
        }, function (data) {
            while (bidData = data.TmpTb.shift()) {
                $('#current_bidder_' + bidData.id).html(bidData.current_bidder);
                if (bidData.current_Status != 2) {
                    $("#current_leftbid_" + bidData.id).html("已結標");
                    //$("#auction_" + bidData.id + " div.BOX-1 a").attr("href", "#").attr("disabled", "disabled");
                    $("#auction_" + bidData.id).hide();
                }
                else {
                    $("#current_leftbid_" + bidData.id).html(bidData.current_leftBid);
                    //_timer[exhibit.id] = '已結標';
                    //$('#bid_btn_' + exhibit.id).attr('disabled', 'disabled');
                    //$('#bid_btn_' + exhibit.id).addClass('end');
                }
            }
        });
    }
</script>
</html>
