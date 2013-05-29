<%@ Page Language="VB" AutoEventWireup="false" CodeFile="ViewMoreProduct.aspx.vb" Inherits="Product_ViewProduct" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <title>動拍賣</title>
    <link href="../Styles/showMorePage.css" rel="stylesheet" type="text/css" />
    <script src="../Scripts/jquery.js" type="text/javascript"></script>
</head>
<body>
    <form id="form1" runat="server">
            <div id="header"><a href="http://09test.ruzhi.com.tw" style="font-size:12px; text-decoration:none; color:#36F">回動拍賣首頁</a></div>
            <div id="container_content"> <!--總內框-->
                <div id="container_content_Menu" runat="server"> <!--商品內框-->
                </div> <!--商品內框o-->
            </div> <!--總內框o-->
            <div id="newpager" runat="server"> 
            </div> 
     </form>
</body>
<script type="text/javascript">
    $(document).ready(function () {
        load_exhibit();
    });

    function load_exhibit() {
        var auctionIds = new Array();
        $('.auction_item').each(function () {
            if (id = $(this).attr('id')) {
                if (id.match(/^auction_(\d+)$/)) {
                    auctionIds.push(RegExp.$1);
                }
            }
        });
        if (auctionIds.length) {
            //alert(auctionIds);
            _refresh_interval = setInterval("do_refresh('" + auctionIds.join(',') + "')", 10000);
            //do_refresh(auctionIds.join(','));
        }
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
