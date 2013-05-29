Imports Microsoft.VisualBasic
Imports System.Data
Imports System.Data.SqlClient


Public Class RuzhiParameterCheck

    Public Function CheckNull(ByVal sParameter As Object) As Object
        If sParameter Is DBNull.Value Then
            Return ""
        Else
            Return sParameter
        End If

    End Function
    Public Function CheckIsNull(ByVal sParameter As Object) As Object
        If sParameter Is DBNull.Value Then
            Return ""
        Else
            Return sParameter
        End If
    End Function

    Public Function CheckIsNull_Integer(ByVal sParameter As Object) As Object
        If sParameter Is DBNull.Value Then
            Return 0
        Else
            If IsNumeric(sParameter) = False Then
                Return 0
            Else
                Return sParameter
            End If
        End If
    End Function

    '用來檢查要儲存回資料表內的值，若為""的值則傳回 null
    Public Function CheckReturnData(ByVal sData As Object) As Object
        '判斷sData是否為數值型態
        If IsNumeric(sData) Then
            Return sData
        Else
            '若sData為空白則傳回null回傳至資料表內
            If sData = "" Then
                Return DBNull.Value
            Else
                Return sData
            End If
        End If

    End Function

    '檢查是否為正整數
    Public Function CheckIsInteger(ByVal sParameter As String) As Boolean
        Dim sResult As Boolean = True '預設為是數字為真

        If sParameter Is Nothing Then
            sResult = False
        ElseIf sParameter Is DBNull.Value Then
            sResult = False
        ElseIf sParameter = "" Then
            sResult = False
        ElseIf IsNumeric(sParameter) = False Then
            sResult = False
        ElseIf CInt(sParameter) < 0 Then
            sResult = False
        ElseIf InStr(sParameter, ".") <> 0 Then
            sResult = False
        End If

        Return sResult

    End Function
End Class
