Imports System.Data.SqlClient

Partial Class Product_ProductTableOVER
    Inherits System.Web.UI.Page
    Dim anti As New RuzhiTurnEncode

    Protected Overrides Function LoadPageStateFromPersistenceMedium() As Object
        Return Nothing
    End Function


    Protected Overrides Sub SavePageStateToPersistenceMedium(ByVal viewState As Object)
    End Sub

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load

        LoadProduct()

    End Sub

    Protected Sub LoadProduct()
        Dim sType As String = anti.CheckAnit(Request.QueryString("par1"))
        If sType.Length = 0 Then
            sType = "1"
        End If

        'Dim link As String = "http://" & Request.Url.Host & "/Product/"
        Dim link As String = "http://" & Request.Url.Host & Request.ApplicationPath & "/Product/"


        Using conn As New SqlConnection
            conn.ConnectionString = New RuzhiConnConnect().GetConnectString
            conn.Open()

            Dim MyString As New StringBuilder
            Dim SN As String = ""
            Dim PicUrl As String = ""
            Dim NowBid As String = ""
            Dim leftBid As String = ""
            Dim count As Integer = 0

            Dim HtmlStr As New LiteralControl()

            Using MyDs As New Data.DataSet
                Using reader As New SqlDataAdapter("select top 8 * from ( select data1.圖片,data1.商品編號,data1.商品狀態," & _
                                                   "data1.商品金額,data1.商品名稱,data1.上架日期,data1.滿足結標次數-isnull(" & _
                                                   "data1.目前投標次數,0) as leftBid,isnull(data3.暱稱,'無人投標') as nickName " & _
                                                   "from WSProductData as data1 left join WSrecordOfBidding as data2 on " & _
                                                   "data1.得標記錄編號=data2.編號 left join WSMemberData as data3 on " & _
                                                   "data2.會員編號=data3.會員編號 where data1.商品種類=@商品種類 and (data1.商品狀態 = 3)) as Data order by leftBid ", conn)
                    reader.SelectCommand.Parameters.Add("商品種類", Data.SqlDbType.Int).Value = Integer.Parse(sType)
                    reader.Fill(MyDs, "TmpTb")


                    For Each sRow In MyDs.Tables("TmpTb").Rows
                        If count = 0 Then
                            MyString.AppendLine("<ul id='1'>")
                        ElseIf count = 4 Then
                            MyString.AppendLine("<ul id='2'>")
                        End If

                        PicUrl = "~" & sRow("圖片").ToString
                        SN = count + 1

                        MyString.AppendLine("<li>")
                        MyString.AppendLine(" <div id='container_content_BOX" & SN & "' class='BOX'>")
                        MyString.AppendLine("  <div id='BOX" & SN & "-1' class='BOX-1'>")
                        MyString.AppendLine("   <a href='../bid/default.aspx?p_sn=" & sRow("商品編號").ToString & "'><img style='border:0px; width:120px; height:120px;' src='" & link & ResolveClientUrl(PicUrl) & "' /></a> ")
                        MyString.AppendLine("  </div>")
                        MyString.AppendLine("  <div id='BOX" & SN & "-2' class='BOX-2'>")
                        MyString.AppendLine("   <table class='P'>")

                        MyString.AppendLine("    <tr>")
                        MyString.AppendLine("     <td class='P2' >商品名稱:</td>")
                        MyString.AppendLine("     <td align='left'>" & sRow("商品名稱").ToString & "</td>")
                        MyString.AppendLine("    </tr>")

                        MyString.AppendLine("    <tr>")
                        MyString.AppendLine("     <td class='P4' >得 標 者 :</td>")
                        MyString.AppendLine("     <td align='left'>" & sRow("nickName").ToString & "</td>")
                        MyString.AppendLine("    </tr>")

                        MyString.AppendLine("    </table>")
                        MyString.AppendLine("   </div>")
                        MyString.AppendLine(" </div>")
                        MyString.AppendLine("</li>")

                        If count = 3 Then
                            MyString.AppendLine("</ul>")
                        End If

                        count += 1
                    Next

                    HtmlStr.Text = MyString.ToString
                    Me.container_content_Menu.Controls.Add(HtmlStr)

                End Using
            End Using
        End Using
    End Sub

    '-------------------------------------------------------------------------------------------------------
    'Protected Sub LoadProduct()
    '    Dim sType As String = anti.CheckAnit(Request.QueryString("par1"))
    '    If sType.Length = 0 Then
    '        sType = "1"
    '    End If

    '    Dim link As String = "http://" & Request.Url.Host & "/Product/"

    '    Using conn As New SqlConnection
    '        conn.ConnectionString = New RuzhiConnConnect().GetConnectString
    '        conn.Open()

    '        Dim startDate As DateTime = New Date(1970, 1, 1) 'javascript的getTime是從1970/01/01算起
    '        Dim nowDate As DateTime = Now
    '        Dim ts As Long = 0


    '        Dim MyString As New StringBuilder
    '        Dim SN As String = ""
    '        Dim PicUrl As String = ""
    '        Dim NowBid As String = ""
    '        Dim leftBid As String = ""
    '        Dim count As Integer = 0

    '        Dim HtmlStr As New LiteralControl()

    '        Using MyDs As New Data.DataSet
    '            Using reader As New SqlDataAdapter("select top 10 * from ( select data1.圖片,data1.商品編號,data1.商品狀態," & _
    '                                               "data1.商品金額,data1.商品名稱,data1.上架日期,data1.滿足結標次數-isnull(" & _
    '                                               "data1.目前投標次數,0) as leftBid,isnull(data3.暱稱,'無人投標') as nickName " & _
    '                                               "from WSProductData as data1 left join WSrecordOfBidding as data2 on " & _
    '                                               "data1.得標記錄編號=data2.編號 left join WSMemberData as data3 on " & _
    '                                               "data2.會員編號=data3.會員編號 where data1.商品種類=@商品種類 and (data1.商品狀態 = '3')) as Data order by leftBid ", conn)
    '                reader.SelectCommand.Parameters.Add("商品種類", Data.SqlDbType.Int).Value = Integer.Parse(sType)
    '                reader.Fill(MyDs, "TmpTb")

    '                MyString.AppendLine("<table>")
    '                For Each sRow In MyDs.Tables("TmpTb").Rows

    '                    If count Mod 5 = 0 Then
    '                        MyString.AppendLine("<tr>")
    '                    End If
    '                    MyString.AppendLine("<td>")

    '                    PicUrl = "~" & sRow("圖片").ToString
    '                    SN = sRow("商品編號").ToString
    '                    leftBid = sRow("leftBid")

    '                    'nowDate = sRow("上架日期") 
    '                    'nowDate = nowDate.AddDays(1)
    '                    'ts = Math.Round(nowDate.Subtract(startDate).TotalSeconds)

    '                    'Me.tableProduct.InnerText = ""
    '                    Me.item_list.InnerText = ""
    '                    MyString.AppendLine(" <div class='auction_item' id='auction_" & SN & "'> ")
    '                    MyString.AppendLine("    <div class='image'>  ")
    '                    MyString.AppendLine("     <a href='../bid/default.aspx?p_sn=" & SN & "'><img style='border:0px;' src='" & link & ResolveClientUrl(PicUrl) & "' /></a> ")
    '                    MyString.AppendLine("    </div>  ")
    '                    MyString.AppendLine("    <div id='flash_" & SN & "'> ")
    '                    MyString.AppendLine("    <div class='item_name'>" & sRow("商品名稱").ToString & "</div>  ")
    '                    MyString.AppendLine("     <div class='price'><span id='current_price_" & SN & "'>" & sRow("商品金額").ToString & "</span>元</div> ")
    '                    MyString.AppendLine("     <div class='bidder'>得標者：<span id='current_bidder_" & SN & "'> " & sRow("nickName") & "</span></div> ")
    '                    MyString.AppendLine("    </div> ")
    '                    MyString.AppendLine(" </div> ")

    '                    MyString.AppendLine("</td>")
    '                    count = count + 1
    '                    If count Mod 5 = 0 Then
    '                        MyString.AppendLine("</tr>")
    '                    End If
    '                Next
    '                MyString.AppendLine("</table>")

    '                HtmlStr.Text = MyString.ToString
    '                Me.item_list.Controls.Add(HtmlStr)

    '            End Using
    '        End Using
    '    End Using
    'End Sub
End Class
