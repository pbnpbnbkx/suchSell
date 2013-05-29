<%@ Page Language="VB" AutoEventWireup="false" CodeFile="Admin_functionList.aspx.vb" Inherits="management_Admin_functionList" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
    <a href="../Default.aspx">返回首頁</a>
    <div>
      <ul>
        <li>
            <asp:HyperLink ID="fun_1" runat="server" 
                NavigateUrl="~/management/product_View.aspx">產品管理</asp:HyperLink>
          </li>
          <li>
              <asp:HyperLink ID="fun_2" runat="server" 
                  NavigateUrl="~/management/exhibit_view.aspx">上架管理</asp:HyperLink>
          </li>
      </ul>
    </div>
    </form>
</body>
</html>
