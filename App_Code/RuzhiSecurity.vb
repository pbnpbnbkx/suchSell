Imports Microsoft.VisualBasic
Imports System.Security.Cryptography
Imports Microsoft.Security.Application


Public Class RuzhiSecurity
    Public Function TurnEncode(ByVal str As String, ByVal code As Integer) As String
        Dim newStr As String = "thisis" & str & "newcode"

        If code = 16 Then
            '16位MD5加密（取32位加密的9~25字符）
            Return System.Web.Security.FormsAuthentication.HashPasswordForStoringInConfigFile(newStr, "MD5").ToLower().Substring(8, 16)
        Else
            '32位加密
            Return System.Web.Security.FormsAuthentication.HashPasswordForStoringInConfigFile(newStr, "MD5").ToLower()
        End If
    End Function

    Public Function AntiXSS(ByVal Post As Object) As Object
        Dim re As Object
        re = Sanitizer.GetSafeHtmlFragment(Post)
        Return re
    End Function

    '修復SQLinjection的漏洞 sType=1 parameter,2 是string ，但string的長度只到20
    Function Fix_SQL(ByVal UserParameter As Object, ByVal sType As String) As Object
        Dim BadResult As Object = 0
        Select Case (sType)
            Case "1"
                If UserParameter <> "" Then
                    If IsNumeric(UserParameter) = True Then
                        Return UserParameter
                    Else
                        Return 0
                    End If
                End If
            Case "2"
                If UserParameter <> "" Then
                    If (System.Text.Encoding.Default.GetBytes(UserParameter).Length <= 20) Then
                        Return UserParameter
                    Else
                        Return Left(UserParameter, 20)
                    End If
                End If

            Case Else
                Return DBNull.Value
        End Select
        Return BadResult
    End Function
End Class
