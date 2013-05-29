Imports Microsoft.VisualBasic
Imports System.Data.SqlClient

Public Class RuzhiGetMaxMin

    '���o���w��ƪ����w����쪺�̤j��
    Function GetMax_ConnDb(ByVal systemCode As String, ByVal FieldName As String, ByVal TableName As String) As Integer

        Dim MaxID As Integer = 0
        Dim mapDb As String = ""


        Using conn As New SqlConnection
            conn.ConnectionString = New RuzhiConnConnect().GetConnectString_Combine()
            conn.Open()

            Using cmd As New SqlCommand
                cmd.Connection = conn
                cmd.CommandText = "select * from SystemCode where �t�ΥN�X=@SystemCode"
                cmd.Parameters.Add("SystemCode", Data.SqlDbType.VarChar, 4).Value = systemCode

                Using reader As SqlDataReader = cmd.ExecuteReader()
                    If reader.Read Then
                        mapDb = reader("������Ʈw")

                        TableName = mapDb & ".dbo." & TableName
                    End If
                End Using

                cmd.CommandText = "select Count(*) as Counter, Max(" & FieldName & ") as MaxID from " & TableName

                Using reader As SqlDataReader = cmd.ExecuteReader
                    reader.Read()

                    If reader("Counter") = 0 Then
                        MaxID = 1

                    Else
                        MaxID = reader("MaxID") + 1

                    End If
                End Using

            End Using
        End Using

        'MaxID �Y��0�h����
        Return MaxID
    End Function


    '���o���w��ƪ����w����쪺�̤j��
    Function GetMax(ByVal FieldName As String, ByVal TableName As String) As Integer

        Dim MaxID As Integer = 0

        Using conn As New SqlConnection
            conn.ConnectionString = New RuzhiConnConnect().GetConnectString_Combine()
            conn.Open()

            Using cmd As New SqlCommand
                cmd.CommandText = "select Count(*) as Counter, Max(" & FieldName & ") as MaxID from " & TableName
                cmd.Connection = conn

                Using reader As SqlDataReader = cmd.ExecuteReader
                    reader.Read()

                    If reader("Counter") = 0 Then
                        MaxID = 1

                    Else
                        MaxID = reader("MaxID") + 1

                    End If
                End Using

            End Using
        End Using



        Return MaxID
    End Function
    '���o���w��ƪ����w����쪺�̤j�Ȩña������
    Function GetMaxHasWhereStr(ByVal FieldName As String, ByVal TableName As String, ByVal WhereStr As String) As Integer

        Dim MaxID As Integer = 0

        Using conn As New SqlConnection
            conn.ConnectionString = New RuzhiConnConnect().GetConnectString_Combine()
            conn.Open()

            Using cmd As New SqlCommand
                cmd.CommandText = "select Count(*) as Counter, Max(" & FieldName & ") as MaxID from " & TableName & " " & WhereStr
                cmd.Connection = conn

                Using reader As SqlDataReader = cmd.ExecuteReader
                    reader.Read()

                    If reader("Counter") = 0 Then
                        MaxID = 1

                    Else
                        MaxID = reader("MaxID") + 1

                    End If
                End Using

            End Using
        End Using



        Return MaxID
    End Function
End Class
