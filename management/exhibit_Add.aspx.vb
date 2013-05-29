Imports System.IO

Partial Class management_product_Add
    Inherits System.Web.UI.Page

    Protected Sub Page_Init(sender As Object, e As System.EventArgs) Handles Me.Init
        Dim javascript As New StringBuilder()
        javascript.AppendLine("<link href=""" & ResolveClientUrl("~/Scripts/layout/layout-default-latest.css") & """ rel=""stylesheet"" type=""text/css"" />")
        javascript.AppendLine("<script src=""" & ResolveClientUrl("~/Scripts/jquery-1.8.3.js") & """ type=""text/javascript""></script>")
        javascript.AppendLine("<script src=""" & ResolveClientUrl("~/Scripts/layout/new-jquery-ui-latest.js") & """ type=""text/javascript""></script>")
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
            Dim tmpTextbox = DirectCast(Me.FormView1.FindControl("編號TextBox"), TextBox)
            tmpTextbox.ReadOnly = True
            tmpTextbox.Text = New RuzhiGetMaxMin().GetMax("編號", "product_exhibitInfo")
            DirectCast(Me.FormView1.FindControl("上架日期TextBox"), TextBox).Text = Now.ToShortDateString()
            DirectCast(Me.FormView1.FindControl("下架日期TextBox"), TextBox).Text = Now.ToShortDateString()
        End If
    End Sub

    Protected Sub FormView1_ItemInserted(sender As Object, e As System.Web.UI.WebControls.FormViewInsertedEventArgs) Handles FormView1.ItemInserted
        Response.Redirect("exhibit_View.aspx")
    End Sub

    Protected Sub InsertCancelButton_Click(sender As Object, e As System.EventArgs)
        Response.Redirect("exhibit_View.aspx")
    End Sub
End Class
