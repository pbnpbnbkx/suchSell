Imports Microsoft.VisualBasic
Imports System.IO

Public Class RuzhiUserActivity
    Public Sub writeDetailError(ByVal ex As Exception)
        If (ex IsNot Nothing) Then
            Try
                'If Not File.Exists(System.Web.HttpContext.Current.Server.MapPath(path)) Then
                '    File.Create(System.Web.HttpContext.Current.Server.MapPath(path)).Close()
                'End If
                Dim lasterror As New StringBuilder()
                lasterror.AppendLine("網頁位置:")
                lasterror.AppendLine(HttpContext.Current.Request.Path)
                lasterror.AppendLine()
                If (ex.Message IsNot Nothing) Then
                    lasterror.AppendLine("Message:")
                    lasterror.AppendLine(ex.Message)
                    lasterror.AppendLine()
                End If
                If (ex.InnerException IsNot Nothing) Then
                    lasterror.AppendLine("InnerException:")
                    lasterror.AppendLine(ex.InnerException.ToString())
                    lasterror.AppendLine()
                End If
                If (ex.Source IsNot Nothing) Then
                    lasterror.AppendLine("Source:")
                    lasterror.AppendLine(ex.Source)
                    lasterror.AppendLine()
                End If
                If (ex.StackTrace IsNot Nothing) Then
                    lasterror.AppendLine("StackTrace:")
                    lasterror.AppendLine(ex.StackTrace)
                    lasterror.AppendLine()
                End If

                If lasterror.Length > 0 Then
                    Dim my_Dir As String = System.Web.HttpContext.Current.Server.MapPath("~/UserLog/Error/")
                    If Not Directory.Exists(my_Dir) Then
                        Directory.CreateDirectory(my_Dir)
                    End If
                    Dim path As String = my_Dir & DateTime.Today.ToString("yyyy-MM-dd") & ".txt"
                    Using w As New StreamWriter(path, True, System.Text.Encoding.Default())
                        'Using w As StreamWriter = File.AppendText(System.Web.HttpContext.Current.Server.MapPath(path), True, System.Text.Encoding.GetEncoding("default"))
                        w.WriteLine("{0}", DateTime.Now.ToString(System.Globalization.CultureInfo.InvariantCulture))
                        'Message = "發生錯誤的網頁:{0}錯誤訊息:{1}堆疊內容:{2}"
                        'Message = String.Format(Message, HttpContext.Current.Request.Path + Environment.NewLine, ex.GetBaseException().Message + Environment.NewLine, Environment.NewLine + ex.StackTrace)
                        'w.WriteLine(Message)
                        w.WriteLine(lasterror.ToString)
                        w.WriteLine("___")
                        w.Flush()
                        w.Close()
                        w.Dispose()
                    End Using
                End If
            Catch ex1 As Exception
                Throw New Exception("writing error txt with trouble")
            End Try
        End If
    End Sub

    Public Sub WriteError(ByVal ErrMsg As String)
        Dim my_Dir As String = System.Web.HttpContext.Current.Server.MapPath("~/UserLog/Error/")
        Try
            If Not Directory.Exists(my_Dir) Then
                Directory.CreateDirectory(my_Dir)
            End If
            Dim path As String = my_Dir & DateTime.Today.ToString("yyyy-MM-dd") & ".txt"
            Using w As New StreamWriter(path, True, System.Text.Encoding.Default())
                w.WriteLine(vbCr & vbLf & "Log Entry : ")
                w.WriteLine("{0}", DateTime.Now.ToString(System.Globalization.CultureInfo.InvariantCulture))
                w.WriteLine(ErrMsg)
                w.WriteLine("_____")
                w.Flush()
                w.Close()
                w.Dispose()
            End Using
        Catch ex As Exception
            Throw New Exception("Getting the problem with writing the error txt")
        End Try
    End Sub

    Public Sub WriteLog(ByVal my_LogMsg As String, ByVal UserAccount As String, ByVal UserIP As String)
        If UserIP = "" Then
            UserIP = HttpContext.Current.Request.ServerVariables("REMOTE_ADDR")
        End If
        Dim myLog_FileName As String = System.DateTime.Now.ToString("yyyyMMdd")
        Dim my_Dir As String = System.Web.HttpContext.Current.Server.MapPath("~/UserLog/")

        Try
            If Not Directory.Exists(my_Dir) Then
                Directory.CreateDirectory(my_Dir)  '如果這目錄不存在，就建立它。
            End If
            Dim strRecord As String = System.String.Format("[{0:yyyy/MM/dd hh:mm:ss}]Message : {1}", System.DateTime.Now, my_LogMsg.Trim() & "__" & UserAccount & "__" & UserIP)
            Dim LogFile As String = my_Dir & "\" & myLog_FileName & ".txt"   '--每一個紀錄檔的副檔名都是 .log
            Using sw As New StreamWriter(LogFile, True, System.Text.Encoding.Default())
                sw.WriteLine(strRecord)
                sw.Flush()
                sw.Close()
                sw.Dispose()
            End Using
        Catch ex As Exception
            'ex.Message.ToString()
        End Try

    End Sub
End Class
