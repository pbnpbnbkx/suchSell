
Partial Class management_Admin_functionList
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(sender As Object, e As System.EventArgs) Handles Me.Load
        If Session("isAdmin") <> "yes" Then
            Response.Redirect("~/Default.aspx")
        End If
    End Sub
End Class
