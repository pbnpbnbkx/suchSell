<%@ Page Language="VB" AutoEventWireup="false" CodeFile="exhibit_View.aspx.vb" Inherits="management_product_View" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="../Styles/Common.css" rel="stylesheet" type="text/css" />
</head>
<body>
    <form id="form1" runat="server">
    <div>
        <asp:LinkButton ID="B_Insert" runat="server" CssClass ="Button">新增上架</asp:LinkButton>
        <a href="Admin_functionList.aspx" class="Button_1">返回功能表</a>
        
    </div>
    <br />
    <div>
        <asp:GridView ID="GridView1" runat="server" AutoGenerateColumns="False" 
            DataKeyNames="編號" DataSourceID="SqlDataSource1">
            <Columns>
                <asp:CommandField ShowDeleteButton="True" ShowEditButton="True" />
                <asp:BoundField DataField="編號" HeaderText="編號" ReadOnly="True" 
                    SortExpression="編號" />
                <asp:BoundField DataField="產品編號" HeaderText="產品編號" SortExpression="產品編號" />
                <asp:BoundField DataField="說明" HeaderText="說明" SortExpression="說明" />
                <asp:BoundField DataField="每台斤金額" HeaderText="每台斤金額" SortExpression="每台斤金額" />
                <asp:TemplateField HeaderText="上架日期" SortExpression="上架日期">
                    <EditItemTemplate>
                        <asp:TextBox ID="f_上架日期" runat="server" Text='<%# Bind("上架日期") %>'></asp:TextBox>
                    </EditItemTemplate>
                    <ItemTemplate>
                        <asp:Label ID="Label1" runat="server" Text='<%# Bind("上架日期") %>'></asp:Label>
                    </ItemTemplate>
                </asp:TemplateField>
                <asp:TemplateField HeaderText="下架日期" SortExpression="下架日期">
                    <EditItemTemplate>
                        <asp:TextBox ID="f_下架日期" runat="server" Text='<%# Bind("下架日期") %>'></asp:TextBox>
                    </EditItemTemplate>
                    <ItemTemplate>
                        <asp:Label ID="Label2" runat="server" Text='<%# Bind("下架日期") %>'></asp:Label>
                    </ItemTemplate>
                </asp:TemplateField>
                <asp:CheckBoxField DataField="下架" HeaderText="下架" SortExpression="下架" />
            </Columns>
            <EmptyDataTemplate>
                沒有上架產品
            </EmptyDataTemplate>
        </asp:GridView>
    </div>
    <asp:SqlDataSource ID="SqlDataSource1" runat="server" 
        ConnectionString="<%$ ConnectionStrings:conndb %>" 
        DeleteCommand="DELETE FROM [product_exhibitInfo] WHERE [編號] = @編號" 
        InsertCommand="INSERT INTO [product_exhibitInfo] ([編號], [產品編號], [說明], [定價數量], [定價金額], [上架日期], [下架日期]) VALUES (@編號, @產品編號, @說明, @定價數量, @定價金額, @上架日期, @下架日期)" 
        SelectCommand="SELECT [編號], [產品編號], [說明], 每台斤金額,convert(varchar(10),上架日期,111) 上架日期, convert(varchar(10),下架日期,111) 下架日期,下架 FROM [product_exhibitInfo]" 
        UpdateCommand="UPDATE [product_exhibitInfo] SET [產品編號] = @產品編號, [說明] = @說明, [每台斤金額] = @每台斤金額, [上架日期] = @上架日期, [下架日期] = @下架日期,[下架]=@下架 WHERE [編號] = @編號">
        <DeleteParameters>
            <asp:Parameter Name="編號" Type="Int32" />
        </DeleteParameters>
        <InsertParameters>
            <asp:Parameter Name="編號" Type="Int32" />
            <asp:Parameter Name="產品編號" Type="Int32" />
            <asp:Parameter Name="說明" Type="String" />
            <asp:Parameter Name="每台斤金額" Type="Int32" />
            <asp:Parameter Name="上架日期" Type="DateTime" />
            <asp:Parameter Name="下架日期" Type="DateTime" />
            <asp:Parameter Name="下架" Type="Boolean" />
        </InsertParameters>
        <UpdateParameters>
            <asp:Parameter Name="產品編號" Type="Int32" />
            <asp:Parameter Name="說明" Type="String" />
           <asp:Parameter Name="每台斤金額" Type="Int32" />
            <asp:Parameter Name="上架日期" Type="DateTime" />
            <asp:Parameter Name="下架日期" Type="DateTime" />
            <asp:Parameter Name="編號" Type="Int32" />
            <asp:Parameter Name="下架" Type="Boolean" />
        </UpdateParameters>
    </asp:SqlDataSource>

<script src="exhibit_View.js" type="text/javascript"></script>
<script src="../Scripts/i18n/jquery.ui.datepicker-zh-TW.js" type="text/javascript"></script>

    </form>
</body>
</html>
