<%@ Page Language="VB" AutoEventWireup="false" CodeFile="exhibit_Add.aspx.vb" Inherits="management_product_Add" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
    <div>
        <asp:FormView ID="FormView1" runat="server" DataKeyNames="編號" 
            DataSourceID="SqlDataSource1" DefaultMode="Insert" Height="164px" 
            Width="512px">
            <EditItemTemplate>
                編號:
                <asp:Label ID="編號Label1" runat="server" Text='<%# Eval("編號") %>' />
                <br />
                產品編號:
                <asp:TextBox ID="產品編號TextBox" runat="server" Text='<%# Bind("產品編號") %>' />
                <br />
                說明:
                <asp:TextBox ID="說明TextBox" runat="server" Text='<%# Bind("說明") %>' />
                <br />
                定價數量:
                <asp:TextBox ID="定價數量TextBox" runat="server" Text='<%# Bind("定價數量") %>' />
                <br />
                定價金額:
                <asp:TextBox ID="定價金額TextBox" runat="server" Text='<%# Bind("定價金額") %>' />
                <br />
                上架日期:
                <asp:TextBox ID="上架日期TextBox" runat="server" Text='<%# Bind("上架日期") %>' />
                <br />
                下架日期:
                <asp:TextBox ID="下架日期TextBox" runat="server" Text='<%# Bind("下架日期") %>' />
                <br />
                <asp:LinkButton ID="UpdateButton" runat="server" CausesValidation="True" 
                    CommandName="Update" Text="更新" />
                &nbsp;<asp:LinkButton ID="UpdateCancelButton" runat="server" 
                    CausesValidation="False" CommandName="Cancel" Text="取消" />
            </EditItemTemplate>
            <InsertItemTemplate>
                編號:
                <asp:TextBox ID="編號TextBox" runat="server" Text='<%# Bind("編號") %>' />
                <br />
                產品編號:
                <asp:DropDownList ID="DropDownList2" runat="server" DataSourceID="sql_product" 
                    DataTextField="text" DataValueField="value" SelectedValue='<%# Bind("產品編號") %>'>
                </asp:DropDownList>
                <br />
                說明:
                <asp:TextBox ID="說明TextBox" runat="server" Text='<%# Bind("說明") %>' />
                <br />
                每台斤
                <asp:TextBox ID="定價數量TextBox" runat="server" Text='<%# Bind("每台斤金額") %>' />
                元<br />上架日期:
                <asp:TextBox ID="上架日期TextBox" runat="server" Text='<%# Bind("上架日期") %>' />
                <br />
                下架日期:
                <asp:TextBox ID="下架日期TextBox" runat="server" Text='<%# Bind("下架日期") %>' />
                <br />
                <asp:LinkButton ID="InsertButton" runat="server" CausesValidation="True" 
                    CommandName="Insert" Text="插入" />
                &nbsp;<asp:LinkButton ID="InsertCancelButton" runat="server" 
                    CausesValidation="False" CommandName="Cancel" Text="取消" 
                    onclick="InsertCancelButton_Click" />
            </InsertItemTemplate>
            <ItemTemplate>
                編號:
                <asp:Label ID="編號Label" runat="server" Text='<%# Eval("編號") %>' />
                <br />
                產品編號:
                <asp:DropDownList ID="DropDownList1" runat="server">
                </asp:DropDownList>
                <br />
                說明:
                <asp:Label ID="說明Label" runat="server" Text='<%# Bind("說明") %>' />
                <br />
                定價數量:
                <asp:Label ID="定價數量Label" runat="server" Text='<%# Bind("定價數量") %>' />
                <br />
                定價金額:
                <asp:Label ID="定價金額Label" runat="server" Text='<%# Bind("定價金額") %>' />
                <br />
                上架日期:
                <asp:Label ID="上架日期Label" runat="server" Text='<%# Bind("上架日期") %>' />
                <br />
                下架日期:
                <asp:Label ID="下架日期Label" runat="server" Text='<%# Bind("下架日期") %>' />
                <br />
                <asp:LinkButton ID="EditButton" runat="server" CausesValidation="False" 
                    CommandName="Edit" Text="編輯" />
                &nbsp;<asp:LinkButton ID="DeleteButton" runat="server" CausesValidation="False" 
                    CommandName="Delete" Text="刪除" />
                &nbsp;<asp:LinkButton ID="NewButton" runat="server" CausesValidation="False" 
                    CommandName="New" Text="新增" />
            </ItemTemplate>
        </asp:FormView>
    </div>
    <asp:SqlDataSource ID="SqlDataSource1" runat="server" 
        ConnectionString="<%$ ConnectionStrings:conndb %>" 
        DeleteCommand="DELETE FROM [product_exhibitInfo] WHERE [編號] = @編號" 
        InsertCommand="INSERT INTO [product_exhibitInfo] ([編號], [產品編號], [說明], [每台斤金額], [上架日期], [下架日期]) VALUES (@編號, @產品編號, @說明, @每台斤金額, @上架日期, @下架日期)" 
        SelectCommand="SELECT * FROM [product_exhibitInfo]" 
        
        UpdateCommand="UPDATE [product_exhibitInfo] SET [產品編號] = @產品編號, [說明] = @說明, [定價數量] = @定價數量, [定價金額] = @定價金額, [上架日期] = @上架日期, [下架日期] = @下架日期 WHERE [編號] = @編號">
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
        </InsertParameters>
        <UpdateParameters>
            <asp:Parameter Name="產品編號" Type="Int32" />
            <asp:Parameter Name="說明" Type="String" />
            <asp:Parameter Name="定價數量" Type="Int32" />
            <asp:Parameter Name="定價金額" Type="Int32" />
            <asp:Parameter Name="上架日期" Type="DateTime" />
            <asp:Parameter Name="下架日期" Type="DateTime" />
            <asp:Parameter Name="編號" Type="Int32" />
        </UpdateParameters>
    </asp:SqlDataSource>
    <asp:SqlDataSource ID="sql_product" runat="server" 
        ConnectionString="<%$ ConnectionStrings:conndb %>" 
        SelectCommand="SELECT [產品編號] value, '名稱：' + [產品名稱] + '_庫存量：' +  convert(varchar(10),庫存量) text FROM [product_Info]">
    </asp:SqlDataSource>
    <br />
    <asp:Label ID="Msg" runat="server" Text="Label"></asp:Label>
    <br />
    </form>
</body>
<script src="../Scripts/pageCss.js" type="text/javascript"></script>
<script src="exhibit_Add.js" type="text/javascript"></script>
<script src="../Scripts/i18n/jquery.ui.datepicker-zh-TW.js" type="text/javascript"></script>
</html>
