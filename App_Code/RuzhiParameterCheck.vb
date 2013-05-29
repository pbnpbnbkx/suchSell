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

    '�Ψ��ˬd�n�x�s�^��ƪ����ȡA�Y��""���ȫh�Ǧ^ null
    Public Function CheckReturnData(ByVal sData As Object) As Object
        '�P�_sData�O�_���ƭȫ��A
        If IsNumeric(sData) Then
            Return sData
        Else
            '�YsData���ťիh�Ǧ^null�^�Ǧܸ�ƪ�
            If sData = "" Then
                Return DBNull.Value
            Else
                Return sData
            End If
        End If

    End Function

    '�ˬd�O�_�������
    Public Function CheckIsInteger(ByVal sParameter As String) As Boolean
        Dim sResult As Boolean = True '�w�]���O�Ʀr���u

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
