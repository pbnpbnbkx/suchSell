<%@ Page Title="" Language="VB" MasterPageFile="~/Site.master" AutoEventWireup="false" CodeFile="複製 - productSingleView.aspx.vb" Inherits="productSingleView" %>

<asp:Content ID="Content1" ContentPlaceHolderID="HeadContent" Runat="Server">
    <link href="Styles/singleView.css" rel="stylesheet" type="text/css" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" Runat="Server">
     <div id="sidenav">
      <ul>
         <li>><span class="sideItem">冬筍</span></li>
         <li>><span class="sideItem">香菇</span></li>
      </ul>
    </div>
    <div id="div_exhibit">
       <div class="sitemap"></div>
       <div class="div_MainPic">
           <asp:Image ID="Image1" runat="server" ImageUrl="~/productPic/1_Pic/1.jpg" />
       </div>
       <div class="p_memo">
        <h1>產品名稱：<span>竹筍</span></h1>
        <div class="showPrice">
            每斤:<span id="orderPrice">100</span>元
        </div>
         <div id="addOrderList">
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
         這是說明
       </div>
       <div class="memoExplain clear">
            <h2>說明</h2>
            <p>這是什麼~</p>
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
</asp:Content>

