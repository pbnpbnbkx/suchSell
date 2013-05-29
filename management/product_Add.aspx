<%@ Page Language="VB" AutoEventWireup="false" CodeFile="product_Add.aspx.vb" Inherits="management_product_Add" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
    <div>
        <asp:FormView ID="FormView1" runat="server" DataKeyNames="產品編號" 
            DataSourceID="SqlDataSource1" DefaultMode="Insert" Height="164px" 
            Width="512px">
            <EditItemTemplate>
                產品編號:
                <asp:Label ID="產品編號Label1" runat="server" Text='<%# Eval("產品編號") %>' />
                <br />
                產品名稱:
                <asp:TextBox ID="產品名稱TextBox" runat="server" Text='<%# Bind("產品名稱") %>' />
                <br />
                主圖位置:
                <asp:TextBox ID="主圖位置TextBox" runat="server" Text='<%# Bind("主圖位置") %>' />
                <br />
                庫存量:
                <asp:TextBox ID="庫存量TextBox" runat="server" Text='<%# Bind("庫存量") %>' />
                <br />
                修改日期:
                <asp:TextBox ID="修改日期TextBox" runat="server" Text='<%# Bind("修改日期") %>' />
                <br />
                <asp:LinkButton ID="UpdateButton" runat="server" CausesValidation="True" 
                    CommandName="Update" Text="更新" />
                &nbsp;<asp:LinkButton ID="UpdateCancelButton" runat="server" 
                    CausesValidation="False" CommandName="Cancel" Text="取消" />
            </EditItemTemplate>
            <InsertItemTemplate>
                產品編號:
                <asp:TextBox ID="產品編號TextBox" runat="server" Text='<%# Bind("產品編號") %>' />
                <br />
                產品名稱:
                <asp:TextBox ID="產品名稱TextBox" runat="server" Text='<%# Bind("產品名稱") %>' />
                <br />
                上傳圖片<asp:FileUpload ID="FileUpload1" runat="server" />
                <asp:Button ID="B_PostPic" runat="server" onclick="B_PostPic_Click" Text="上傳" />
                <br />
                <asp:HiddenField ID="f_picPath" runat="server" Value='<%# Bind("主圖位置") %>' />
                <br />
                庫存量:
                <asp:TextBox ID="庫存量TextBox" runat="server" Text='<%# Bind("庫存量") %>' />
                <br />
                修改日期:
                <asp:TextBox ID="修改日期TextBox" runat="server" Text='<%# Bind("修改日期") %>' />
                <br />
                <asp:LinkButton ID="InsertButton" runat="server" CausesValidation="True" 
                    CommandName="Insert" Text="插入" />
                &nbsp;<asp:LinkButton ID="InsertCancelButton" runat="server" 
                    CausesValidation="False" CommandName="Cancel" Text="取消" 
                    onclick="InsertCancelButton_Click" />
            </InsertItemTemplate>
            <ItemTemplate>
                產品編號:
                <asp:Label ID="產品編號Label" runat="server" Text='<%# Eval("產品編號") %>' />
                <br />
                產品名稱:
                <asp:Label ID="產品名稱Label" runat="server" Text='<%# Bind("產品名稱") %>' />
                <br />
                主圖位置:
                <asp:Label ID="主圖位置Label" runat="server" Text='<%# Bind("主圖位置") %>' />
                <br />
                庫存量:
                <asp:Label ID="庫存量Label" runat="server" Text='<%# Bind("庫存量") %>' />
                <br />
                修改日期:
                <asp:Label ID="修改日期Label" runat="server" Text='<%# Bind("修改日期") %>' />
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
        DeleteCommand="DELETE FROM [product_Info] WHERE [產品編號] = @產品編號" 
        InsertCommand="INSERT INTO [product_Info] ([產品編號], [產品名稱], [主圖位置], [庫存量], [修改日期]) VALUES (@產品編號, @產品名稱, @主圖位置, @庫存量, @修改日期)" 
        SelectCommand="SELECT * FROM [product_Info]" 
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
    <asp:Label ID="Msg" runat="server" Text="Label"></asp:Label>
    <br />
    </form>
</body>
<script src="../Scripts/pageCss.js" type="text/javascript"></script>
<script src="product_Add.js" type="text/javascript"></script>
<script src="../Scripts/i18n/jquery.ui.datepicker-zh-TW.js" type="text/javascript"></script>
</html>
