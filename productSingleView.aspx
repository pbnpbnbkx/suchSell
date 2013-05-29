<%@ Page Title="" Language="VB" MasterPageFile="~/Site.master" AutoEventWireup="false" CodeFile="productSingleView.aspx.vb" Inherits="productSingleView" %>

<asp:Content ID="Content1" ContentPlaceHolderID="HeadContent" Runat="Server">
    <link href="Styles/singleView.css" rel="stylesheet" type="text/css" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" Runat="Server">
    <!-- 商品類別 -->
     <div id="sidenav">
      <ul>
         <li>><span class="sideItem" onclick="javascript:location.href='Default.aspx?pClass=0'">筍類</span></li>
         <li>><span class="sideItem" onclick="javascript:location.href='Default.aspx?pClass=1'">香菇</span></li>
      </ul>
    </div>
    <div id="div_exhibit">
       <div class="sitemap"></div>
       <div class="div_MainPic">
           <asp:Image ID="main_Pic" runat="server"  />
       </div>
       <div class="p_memo">
        <h1>產品名稱：<span id="product_Name" runat="server">竹筍</span></h1>
        <div class="showPrice">
            每台斤:<span id="orderPrice" runat="server"></span>元
        </div>
         <div id="addOrderList" style="display:none;">
            數量：
            <select>
               <option value="1">1</option>
               <option value="2">2</option>
            </select>
            斤
           <a href="javascript:alert('還沒好，你是點個屁')" class="Button">加入購物</a>
         </div>
       </div>
       <div class="memoExplainTitle clear">
         說明
       </div>
       <div id="memoExplain" class="memoExplain clear" runat="server">
       </div>
       <div class="div_show" style="height:100%">
           <asp:Image ID="Image5" runat="server" ImageUrl="~/productPic/2_Pic/1.jpg" />
         <br />
           <asp:Image ID="Image4" runat="server" ImageUrl="~/productPic/2_Pic/1.jpg" />
          <br />
           <asp:Image ID="Image3" runat="server" ImageUrl="~/productPic/2_Pic/1.jpg" />
          <br />
           <asp:Image ID="Image2" runat="server" ImageUrl="~/productPic/2_Pic/1.jpg" />
       </div>
    </div>
    <div class="clear"></div>
</asp:Content>

