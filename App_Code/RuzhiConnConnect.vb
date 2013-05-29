Imports Microsoft.VisualBasic
Imports System.Data.SqlClient


Public Class RuzhiConnConnect
    '使用Application來加速連結字串的取得
    Public Function GetConnString() As String
        If (HttpContext.Current.Application("connStr") IsNot Nothing) Then
            Return HttpContext.Current.Application("connStr").ToString()
        Else
            Return GetConnectString_Combine()
        End If
    End Function

    Public Function TestConn(ByVal connStr As String) As Boolean
        Dim result As Boolean = True
        Try
            Using conn As New SqlConnection
                conn.ConnectionString = connStr
                conn.Open()
            End Using
        Catch ex As Exception
            result = False
        End Try

        Return result
    End Function

    'Public Function GetConnectString() As String
    '    Try
    '        Return System.Web.Configuration.WebConfigurationManager.ConnectionStrings("prosumout315080000ConnectionString").ConnectionString
    '    Catch ex As Exception
    '        HttpContext.Current.Response.Write("連結字串不存在")
    '        HttpContext.Current.Response.End()
    '        Return ""
    '    End Try
    'End Function

    Public Function GetConnectString_Combine() As String
        Return System.Web.Configuration.WebConfigurationManager.ConnectionStrings("conndb").ConnectionString

        'Dim ConnectString As String = ""
        'Dim ServerName, AccountID, PasswordID, DBName As String
        'Try
        '    ServerName = System.Web.Configuration.WebConfigurationManager.AppSettings("ServerName")
        '    DBName = System.Web.Configuration.WebConfigurationManager.AppSettings("DBName")
        '    AccountID = System.Web.Configuration.WebConfigurationManager.AppSettings("Account")
        '    PasswordID = System.Web.Configuration.WebConfigurationManager.AppSettings("Password")

        '    ConnectString = "Data Source=" & ServerName & ";Initial Catalog=" & DBName & ";Persist Security Info=True;User ID=" & AccountID & ";Password=" & PasswordID

        '    If (TestConn(ConnectString)) Then
        '        '給予至Application加快利用
        '        HttpContext.Current.Application("connStr") = ConnectString
        '        'Throw New Exception("資料庫無法連結")
        '    End If
        'Catch ex As Exception
        '    ConnectString = ""
        'End Try

        'Return ConnectString
    End Function

    Public Function GetConnectString_Combine(ByVal DbName As String) As String
        Dim ConnectString As String = ""
        Dim ServerName, AccountID, PasswordID As String
        Try
            ServerName = System.Web.Configuration.WebConfigurationManager.AppSettings("ServerName")
            AccountID = System.Web.Configuration.WebConfigurationManager.AppSettings("Account")
            PasswordID = System.Web.Configuration.WebConfigurationManager.AppSettings("Password")

            ConnectString = "Data Source=" & ServerName & ";Initial Catalog=" & DbName & ";Persist Security Info=True;User ID=" & AccountID & ";Password=" & PasswordID
            If Not (TestConn(ConnectString)) Then
                ConnectString = ""
            End If
        Catch ex As Exception
            ConnectString = ""
        End Try

        Return ConnectString
    End Function
End Class
