Imports Microsoft.VisualBasic

Public Class RuzhiDate
    Public Function GetNowDate() As String
        Dim NowDate As String = ""
        Dim NowYear, NowMonth, NowDay As String
        NowYear = My.Computer.Clock.LocalTime.Year
        NowMonth = My.Computer.Clock.LocalTime.Month
        NowDay = My.Computer.Clock.LocalTime.Day

        NowYear = NowYear - 1911

        Select Case (Len(NowMonth))
            Case 1
                NowMonth = "0" & CStr(NowMonth)
        End Select

        Select Case (Len(NowDay))
            Case 1
                NowDay = "0" & CStr(NowDay)
        End Select
        NowDate = NowYear & "/" & NowMonth & "/" & NowDay
        Return NowDate
    End Function

    Public Function CombineRuzhiDate(ByVal sYear As String, ByVal sMonth As String, ByVal sDay As String) As String

        Dim NowYear, NowMonth, NowDay As String
        NowYear = sYear
        NowMonth = sMonth
        NowDay = sDay

        Dim sDate As String = NowYear & "/" & NowMonth & "/" & NowDay

        If IsDate(sDate) = True Then

            Select Case (Len(sYear))
                Case 1
                    NowYear = "  " & CStr(sYear)
                Case 2
                    NowYear = " " & CStr(sYear)
            End Select

            Select Case (Len(sMonth))
                Case 1
                    NowMonth = "0" & CStr(sMonth)
            End Select

            Select Case (Len(sDay))
                Case 1
                    NowDay = "0" & CStr(sDay)
            End Select

            sDate = NowYear & "/" & NowMonth & "/" & NowDay

        Else
            sDate = ""
        End If

        Return sDate
    End Function


    '將Ruzhi的日期轉為制式 ex: 97/01/01->2008/01/01
    Public Function TransToStandard(ByVal GetDate As String) As Date
        Dim TmpDate() As String = Split(GetDate, "/")

        Dim sDate As Date = My.Computer.Clock.LocalTime.Date

        Dim NowYear, NowMonth, NowDay As String
        If TmpDate.Length = 3 Then
            NowYear = TmpDate(0)
            NowMonth = TmpDate(1)
            NowDay = TmpDate(2)

            NowYear = CInt(NowYear) + 1911

            sDate = NowYear & "/" & NowMonth & "/" & NowDay
        End If

        Return sDate
    End Function


    '將制式如2008/6/11 轉為Ruzhi的日期-> 97/06/11
    Public Function TransToRuzhiDate(ByVal GetDate As String) As String
        Dim TmpDate() As String = Split(GetDate, "/")

        Dim sDate As String = ""

        Dim NowYear, NowMonth, NowDay As String
        If TmpDate.Length = 3 And IsDate(GetDate) = True Then
            NowYear = TmpDate(0)
            NowMonth = TmpDate(1)
            NowDay = TmpDate(2)

            NowYear = NowYear - 1911

            Select Case (Len(NowYear))
                Case 1
                    NowYear = "  " & CStr(NowYear)
                Case 2
                    NowYear = " " & CStr(NowYear)
            End Select

            Select Case (Len(NowMonth))
                Case 1
                    NowMonth = "0" & CStr(NowMonth)
            End Select

            Select Case (Len(NowDay))
                Case 1
                    NowDay = "0" & CStr(NowDay)
            End Select

            sDate = NowYear & "/" & NowMonth & "/" & NowDay
        Else
            sDate = "None"
        End If

        Return sDate
    End Function

    Public Function RuzhiCheckDate(ByVal GetDate As String) As Boolean
        Dim sResult As Boolean = True
        Dim HasZero As Integer = 0

        If GetDate.Length = 0 Then
            sResult = False
        End If

        If sResult Then
            Dim sDate() As String = GetDate.Split("/")

            If sDate.Length = 3 Then
                '判斷內容物是否為數字
                For Counter As Integer = 0 To 2
                    If IsNumeric(sDate(Counter)) = False Then
                        sResult = False
                        Exit For
                    End If
                Next

                '判斷年份需要3個字元含空白,若空白字元為0亦不允許
                If sDate(0).Length = 3 Then
                    HasZero = sDate(0).IndexOf("0", 0, 1)

                    If HasZero >= 0 Then
                        sResult = False
                    End If
                Else
                    sResult = False
                End If

                If sDate(1).Length <> 2 Or sDate(2).Length <> 2 Then
                    sResult = False
                End If

                If sResult Then
                    '月份判斷
                    Dim Monthday As Integer = 0
                    Dim UserMonth As Integer = CInt(sDate(1))
                    Dim UserDay As Integer = CInt(sDate(2))
                    Dim UserYear As Integer = CInt(sDate(0)) + 1911
                    Dim UserDate As String = UserYear & "/" & UserMonth & "/" & UserDay

                    If IsDate(UserDate) = False Then sResult = False

                End If
            Else
                sResult = False
            End If
        End If

        Return sResult 'Totally correct is true
    End Function

    '彙總的日期檢查，若完全正確傳回ok 若不正確則傳回錯誤原因
    Public Function ProsumoutDateCheck(ByVal sDate As String, ByVal SysYear As String, ByVal SysMonth As String, ByVal IsAccountDate As Boolean) As String
        sDate = Trim(sDate)
        Dim CheckMsg As String = "OK"
        If sDate.Length <> 7 Then
            CheckMsg = "日期需符合七碼 "
        ElseIf IsNumeric(sDate) = False Then
            CheckMsg = "日期僅允許數值 "
        End If

        '年度不大於今年年度 月份不大於上傳月份 日期需符合月份日期
        If CheckMsg = "OK" Then
            Dim UserDate As String = ""
            Dim sYear, sMonth, sDay As String
            sYear = Left(sDate, 3)
            sMonth = Mid(sDate, 4, 2)
            sDay = Right(sDate, 2)

            '但購置日期並不一定是跟著帳務日期走，所以要確定是否為帳務日期 若為帳務日期則需檢查月份
            If CInt(sYear) > CInt(SysYear) Then
                CheckMsg = "年份不能比上傳年份大 "
            ElseIf IsAccountDate Then
                '若日期為帳務日期則需檢查月份,並與系統上傳日期相等
                If CInt(sMonth) <> CInt(SysMonth) Then
                    CheckMsg = "月份不等於上傳月份 "
                End If
            End If

            If CheckMsg = "OK" Then
                sYear = 1911 + CInt(sYear)
                UserDate = sYear & "/" & sMonth & "/" & sDay
                If IsDate(UserDate) = False Then
                    CheckMsg = "日期格式錯誤 "
                End If
            End If

        End If
        Return CheckMsg
    End Function

    '彙總上傳的日期 轉換成RuzhiDate的格式
    Public Function ProsumoutTransRuzhiDate(ByVal sDate As String) As String
        Dim ForeYear As String = ""

        Dim sYear, sMonth, sDay As String
        sYear = Left(sDate, 3)

        If sYear < "100" Then
            ForeYear = Left(sYear, 2)
            sYear = Right(sYear, 1)

            ForeYear = Replace(ForeYear, "0", " ")
            sYear = ForeYear & sYear
        End If

        sMonth = Mid(sDate, 4, 2)

        sDay = Right(sDate, 2)

        Return sYear & "/" & sMonth & "/" & sDay

    End Function

    'WP將制式如2008/6/11 轉為Ruzhi的日期-> 097年06月11日
    Public Function WPTransToRuzhiDateCn(ByVal GetDate As String) As String
        Dim TmpDate() As String = Split(GetDate, "/")

        Dim sDate As String = ""

        Dim NowYear, NowMonth, NowDay As String
        If TmpDate.Length = 3 And IsDate(GetDate) = True Then
            NowYear = TmpDate(0).ToString
            NowMonth = TmpDate(1).ToString
            NowDay = TmpDate(2).ToString

            NowYear = NowYear - 1911

            Select Case (Len(NowYear))
                Case 1
                    NowYear = "00" & CStr(NowYear)
                Case 2
                    NowYear = "0" & CStr(NowYear)
            End Select

            Select Case (Len(NowMonth))
                Case 1
                    NowMonth = "0" & CStr(NowMonth)
            End Select

            Select Case (Len(NowDay))
                Case 1
                    NowDay = "0" & CStr(NowDay)
            End Select

            sDate = NowYear & "年" & NowMonth & "月" & NowDay & "日"

        Else
            sDate = ""
        End If

        Return sDate

    End Function
End Class
