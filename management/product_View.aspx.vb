
Partial Class management_product_View
    Inherits System.Web.UI.Page

    Protected Sub B_Insert_Click(sender As Object, e As System.EventArgs) Handles B_Insert.Click
        Response.Redirect("product_Add.aspx")
    End Sub

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

    Protected Sub GridView1_RowCreated(sender As Object, e As System.Web.UI.WebControls.GridViewRowEventArgs) Handles GridView1.RowCreated
        'If e.Row.RowState = DataControlRowState.Edit Then
        '    If e.Row.RowType = DataControlRowType.DataRow Then
        '        Dim tmp1 As TextBox = CType(e.Row.Cells(5).Controls(0).FindControl("f_editDate"), TextBox)
        '        tmp1.Attributes.Add("onclick", "alert(""hello"")")
        '    End If
        'End If
    End Sub

    Protected Sub Page_Load(sender As Object, e As System.EventArgs) Handles Me.Load
        If Session("isAdmin") <> "yes" Then
            Response.Redirect("~/Default.aspx")
        End If

    End Sub
End Class
