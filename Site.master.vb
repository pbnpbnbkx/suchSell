
Partial Class Site
    Inherits System.Web.UI.MasterPage

    Protected Sub Page_Load(sender As Object, e As System.EventArgs) Handles Me.Load
        Me.home_title.Attributes.Add("onclick", "javascript:location.href='" & ResolveClientUrl("~/default.aspx") & "'")
    End Sub
End Class

