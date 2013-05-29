
Partial Class Account_Login
    Inherits System.Web.UI.Page

    Protected Sub Login1_Authenticate(sender As Object, e As System.Web.UI.WebControls.AuthenticateEventArgs) Handles Login1.Authenticate
        If Login1.UserName = "admin" And Login1.Password = "048391222" Then
            Session("isAdmin") = "yes"
            e.Authenticated = True
            Me.Login1.DestinationPageUrl = "~/management/Admin_functionList.aspx"
        Else
            '一般登入者判斷
            Me.Login1.DestinationPageUrl = "~/Default.aspx"
            Msg.Text = "登入失敗"
        End If
    End Sub

End Class
