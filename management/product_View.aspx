<%@ Page Language="VB" AutoEventWireup="false" CodeFile="product_View.aspx.vb" Inherits="management_product_View" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="../Styles/Common.css" rel="stylesheet" type="text/css" />
</head>
<body>
    <form id="form1" runat="server">
    <div>
        <asp:LinkButton ID="B_Insert" runat="server" CssClass ="Button">新增產品</asp:LinkButton>
        <a href="Admin_functionList.aspx" class="Button_1">返回功能表</a>
        
    </div>
    <br />
    <div>
        <asp:GridView ID="GridView1" runat="server" AutoGenerateColumns="False" 
            DataKeyNames="產品編號" DataSourceID="SqlDataSource1">
            <Columns>
                <asp:CommandField ShowDeleteButton="True" ShowEditButton="True" />
                <asp:BoundField DataField="產品編號" HeaderText="產品編號" ReadOnly="True" 
                    SortExpression="產品編號" />
                <asp:BoundField DataField="產品名稱" HeaderText="產品名稱" SortExpression="產品名稱" />
                <asp:TemplateField HeaderText="主圖位置" SortExpression="主圖位置">
                    <EditItemTemplate>
                        <asp:TextBox ID="TextBox1" runat="server" Text='<%# Bind("主圖位置") %>'></asp:TextBox>
                    </EditItemTemplate>
                    <ItemTemplate>
                        <asp:Image ID="Image1" runat="server" Height="200px" 
                            ImageUrl='<%# Bind("主圖位置") %>' Width="200px" />
                        <br />
                        <asp:Label ID="Label1" runat="server" Text='<%# Bind("主圖位置") %>'></asp:Label>
                    </ItemTemplate>
                </asp:TemplateField>
                <asp:BoundField DataField="庫存量" HeaderText="庫存量" SortExpression="庫存量" />
                <asp:TemplateField HeaderText="修改日期" SortExpression="修改日期">
                    <EditItemTemplate>
                        <asp:TextBox ID="f_editDate" runat="server" CssClass="jDate" 
                            Text='<%# Bind("修改日期") %>'></asp:TextBox>
                    </EditItemTemplate>
                    <ItemTemplate>
                        <asp:Label ID="Label2" runat="server" Text='<%# Bind("修改日期") %>'></asp:Label>
                    </ItemTemplate>
                </asp:TemplateField>
            </Columns>
            <EmptyDataTemplate>
                尚無產品資料
            </EmptyDataTemplate>
        </asp:GridView>
    </div>
    <asp:SqlDataSource ID="SqlDataSource1" runat="server" 
        ConnectionString="<%$ ConnectionStrings:conndb %>" 
        DeleteCommand="DELETE FROM [product_Info] WHERE [產品編號] = @產品編號" 
        InsertCommand="INSERT INTO [product_Info] ([產品編號], [產品名稱], [主圖位置], [庫存量], [修改日期]) VALUES (@產品編號, @產品名稱, @主圖位置, @庫存量, @修改日期)" 
        SelectCommand="SELECT [產品編號], [產品名稱], [主圖位置], [庫存量], CONVERT(varchar(10), 修改日期, 111) 修改日期 FROM [product_Info]" 
        UpdateCommand="UPDATE [product_Info] SET [產品名稱] = @產品名稱, [主圖位置] = @主圖位置, [庫存量] = @庫存量, [修改日期] = @修改日期 WHERE [產品編號] = @產品編號">
        <DeleteParameters>
            <asp:Parameter Name="產品編號" Type="Int32" />
        </DeleteParameters>
        <InsertParameters>
            <asp:Parameter Name="產品編號" Type="Int32" />
            <asp:Parameter Name="產品名稱" Type="String" />
            <asp:Parameter Name="主圖位置" Type="String" />
            <asp:Parameter Name="庫存量" Type="Int32" />
            <asp:Parameter Name="修改日期" Type="DateTime" />
        </InsertParameters>
        <UpdateParameters>
            <asp:Parameter Name="產品名稱" Type="String" />
            <asp:Parameter Name="主圖位置" Type="String" />
            <asp:Parameter Name="庫存量" Type="Int32" />
            <asp:Parameter Name="修改日期" Type="DateTime" />
            <asp:Parameter Name="產品編號" Type="Int32" />
        </UpdateParameters>
    </asp:SqlDataSource>

<script src="product_View.js" type="text/javascript"></script>
<script src="../Scripts/i18n/jquery.ui.datepicker-zh-TW.js" type="text/javascript"></script>

    </form>
</body>
</html>
