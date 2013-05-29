Imports System.IO

Partial Class management_product_Add
    Inherits System.Web.UI.Page

    Protected Sub Page_Init(sender As Object, e As System.EventArgs) Handles Me.Init
        'Dim RMeta As New HtmlMeta
        ''RMeta.HttpEquiv = "refresh"
        ''RMeta.Content = "1000"
        ''Me.Page.Header.Controls.Add(RMeta)
        'RMeta = New HtmlMeta
        'RMeta.HttpEquiv = "Cache-Control"
        'RMeta.Content = "no-cache"
        'Me.Page.Header.Controls.Add(RMeta)

        Dim javascript As New StringBuilder()
        javascript.AppendLine("<link href=""" & ResolveClientUrl("~/Scripts/layout/layout-default-latest.css") & """ rel=""stylesheet"" type=""text/css"" />")

        javascript.AppendLine("<script src=""" & ResolveClientUrl("~/Scripts/jquery-1.8.3.js") & """ type=""text/javascript""></script>")
        javascript.AppendLine("<script src=""" & ResolveClientUrl("~/Scripts/layout/new-jquery-ui-latest.js") & """ type=""text/javascript""></script>")
        'javascript.AppendLine("<script src=""" & ResolveClientUrl("~/Scripts/layout/new-jquery.layout-latest.js") & """ type=""text/javascript""></script>")

        javascript.AppendLine("<script src=""" & ResolveClientUrl("~/Scripts/ui/jquery.ui.core.min.js") & """ type=""text/javascript""></script>")
        javascript.AppendLine("<script src=""" & ResolveClientUrl("~/Scripts/ui/jquery.ui.widget.min.js") & """ type=""text/javascript""></script>")
        javascript.AppendLine("<script src=""" & ResolveClientUrl("~/Scripts/ui/jquery.ui.mouse.min.js") & """ type=""text/javascript""></script>")
        javascript.AppendLine("<script src=""" & ResolveClientUrl("~/Scripts/ui/jquery.ui.draggable.min.js") & """ type=""text/javascript""></script>")
        javascript.AppendLine("<script src=""" & ResolveClientUrl("~/Scripts/ui/jquery.ui.position.min.js") & """ type=""text/javascript""></script>")
        javascript.AppendLine("<script src=""" & ResolveClientUrl("~/Scripts/ui/jquery.ui.resizable.min.js") & """ type=""text/javascript""></script>")
        javascript.AppendLine("<script src=""" & ResolveClientUrl("~/Scripts/ui/jquery.ui.dialog.min.js") & """ type=""text/javascript""></script>")
        javascript.AppendLine("<script src=""" & ResolveClientUrl("~/Scripts/ui/jquery.ui.button.min.js") & """ type=""text/javascript""></script>")

        javascript.AppendLine("<script src=""" & ResolveClientUrl("~/Scripts/ruzhi.js") & """ type=""text/javascript""></script>")
        javascript.AppendLine("<link href=""" & ResolveClientUrl("~/Scripts/themes/1.8.2 redmond/jquery-ui-1.8.2.custom.css") & """ rel=""stylesheet"" type=""text/css"" />")
        javascript.AppendLine("<link href=""" & ResolveClientUrl("~/Styles/Common.css") & """ rel=""stylesheet"" type=""text/css"" />")

        Dim addscript As New Literal()
        addscript.Text = javascript.ToString()
        Me.Header.Controls.Add(addscript)
    End Sub

    Protected Sub Page_Load(sender As Object, e As System.EventArgs) Handles Me.Load
        If Session("isAdmin") <> "yes" Then
            Response.Redirect("~/Default.aspx")
        End If

        If (Not IsPostBack) Then
            Dim tmpTextbox = DirectCast(Me.FormView1.FindControl("產品編號TextBox"), TextBox)
            tmpTextbox.ReadOnly = True
            tmpTextbox.Text = New RuzhiGetMaxMin().GetMax("產品編號", "product_Info")
            DirectCast(Me.FormView1.FindControl("修改日期TextBox"), TextBox).Text = Now.ToShortDateString()
        End If
    End Sub

    Protected Sub FormView1_ItemInserted(sender As Object, e As System.Web.UI.WebControls.FormViewInsertedEventArgs) Handles FormView1.ItemInserted
        Response.Redirect("product_View.aspx")
    End Sub

    Protected Sub B_PostPic_Click(sender As Object, e As System.EventArgs)
        Dim tmp1 As FileUpload = DirectCast(Me.FormView1.FindControl("fileupload1"), FileUpload)
        Try
            If tmp1.HasFile Then
                saveFile(tmp1.PostedFile)
                Me.Msg.Text = "上傳成功"
            End If
        Catch ex As Exception
            Msg.Text = "上傳失敗：" & ex.Message
        Finally
            tmp1.Dispose()
        End Try

    End Sub

    Protected Function saveFile(ByVal userfile As HttpPostedFile) As Boolean
        Dim product_Number As Integer = DirectCast(Me.FormView1.FindControl("產品編號TextBox"), TextBox).Text
        Dim floderName As String = Server.MapPath("~/productPic") & "\" & product_Number & "_Pic"
        If Not Directory.Exists(floderName) Then
            Directory.CreateDirectory(floderName)
        End If
        Dim filePath As String = floderName & "\1" & Path.GetExtension(userfile.FileName).ToLower()
        userfile.SaveAs(filePath)
        DirectCast(Me.FormView1.FindControl("f_picPath"), HiddenField).Value = "~/productPic" & "/" & product_Number & "_Pic" & "/1" & Path.GetExtension(userfile.FileName).ToLower()
        Return True
    End Function

    Protected Sub InsertCancelButton_Click(sender As Object, e As System.EventArgs)
        Response.Redirect("product_View.aspx")
    End Sub
End Class
