<%@ Page Title="首頁" Language="VB" MasterPageFile="~/Site.Master" AutoEventWireup="false"
    CodeFile="Default.aspx.vb" Inherits="_Default" %>

<asp:Content ID="HeaderContent" runat="server" ContentPlaceHolderID="HeadContent">
    <link href="Styles/Showpage.css" rel="stylesheet" type="text/css" />
    <style type="text/css">
        div.showpager { text-align:center; clear:both; padding-top:3px;}
        div.showpager a { padding:3px; border:1px solid #ccc; cursor:pointer; } 
        div.showpager .showMore-navi { margin:10px 0; }
        a{cursor:pointer;}
    </style>
</asp:Content>
<asp:Content ID="BodyContent" runat="server" ContentPlaceHolderID="MainContent">
                        <div id="container_content" style="width:950px">
                            <div id="container_content_Menu" class="Showpage_container_content_Menu" runat="server">
                            </div>
                        </div>
                        <div id="newpager" class="showpager" runat="server"> 
                        </div> 

                        <div id="Msg" runat="server"></div>
</asp:Content>