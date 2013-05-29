Imports System.Data.SqlClient

Partial Class Product_ViewProduct
    Inherits System.Web.UI.Page
    Dim anti As New RuzhiTurnEncode
    Dim eachPagerCounter As Integer = 5
    Dim pStatus As String = ""
    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Dim page As String = New RuzhiTurnEncode().CheckAnit(Request.QueryString("p"))
        Dim pType As String = anti.CheckAnit(Request.QueryString("par"))
        pStatus = anti.CheckAnit(Request.QueryString("par2"))

        If pType.Length = 0 Then
            pType = "1"
        End If

        If page.Length = 0 Then
            page = "1"
        End If

        If pStatus = "close" Then
            pStatus = "3"
        Else
            pStatus = "2"
        End If

        newPagerData(page, pType)
        LoadProduct(page, pType)
    End Sub

    Protected Sub newPagerData(ByVal index As Integer, ByVal pType As Integer)
        Dim HtmlStr As New StringBuilder
        Dim TotalItems As Integer = 0
        Dim TotalPage As Integer = 0
        Dim ForeIndex As Integer = 0
        Dim LastIndex As Integer = 0
        Dim OutputHtml As New Literal

        Using conn As New SqlConnection
            conn.ConnectionString = New RuzhiConnConnect().GetConnectString
            conn.Open()

            Using cmd As New SqlCommand
                cmd.CommandText = "select count(*) as counter from WSProductData where 商品狀態=@pStatus and 商品種類=@ProductType"
                cmd.Parameters.Add("productType", System.Data.SqlDbType.Int).Value = pType
                cmd.Parameters.Add("pStatus", System.Data.SqlDbType.Int).Value = Integer.Parse(pStatus)
                cmd.Connection = conn

                Using reader As SqlDataReader = cmd.ExecuteReader
                    If reader.Read Then
                        TotalItems = reader(0)
                    End If
                End Using
            End Using
        End Using

        If TotalItems <> 0 Then
            TotalPage = TotalItems \ eachPagerCounter
            If (TotalItems Mod eachPagerCounter > 0) Then
                TotalPage += 1
            End If

            HtmlStr.AppendLine("<div class='showMore-summary'>共" & TotalItems & "項、每頁最多顯示" & eachPagerCounter & "項</div> ")
            HtmlStr.AppendLine("<div class='showMore-navi'>")

            Select Case (index)
                Case 1
                    ForeIndex = index
                    LastIndex = index + 7
                    If LastIndex > TotalPage Then
                        LastIndex = TotalPage
                    End If

                    For icounter As Integer = ForeIndex To LastIndex
                        If icounter = index Then
                            HtmlStr.AppendLine(icounter)
                        Else
                            HtmlStr.AppendLine(" <a href='viewMoreProduct.aspx?par=1&p=" & icounter & "'>" & icounter & "</a> ")
                        End If
                    Next

                    HtmlStr.AppendLine(" <a href='viewMoreProduct.aspx?par=" & pType & "&p=" & index + 1 & "'>下一頁</a> ")
                    HtmlStr.AppendLine(" <a href='viewMoreProduct.aspx?par=" & pType & "&p=" & TotalPage & "'>最後一頁</a> ")

                Case TotalPage
                    ForeIndex = index - 7
                    LastIndex = index
                    If ForeIndex <= 0 Then
                        ForeIndex = 1
                    End If

                    HtmlStr.AppendLine(" <a href='viewMoreProduct.aspx?par=" & pType & "&p=1'>第一頁</a> ")
                    HtmlStr.AppendLine(" <a href='viewMoreProduct.aspx?par=" & pType & "&p=" & index - 1 & "'>上一頁</a> ")

                    For icounter As Integer = ForeIndex To LastIndex
                        If icounter = index Then
                            HtmlStr.AppendLine(icounter)
                        Else
                            HtmlStr.AppendLine(" <a href='viewMoreProduct.aspx?par=" & pType & "&p=" & icounter & "'>" & icounter & "</a> ")
                        End If
                    Next

                Case Else
                    '計算前後指標
                    ForeIndex = index - 3
                    LastIndex = index + 3
                    If ForeIndex <= 0 Then
                        ForeIndex = 1
                    End If
                    If LastIndex > TotalPage Then
                        LastIndex = TotalPage
                    End If


                    HtmlStr.AppendLine(" <a href='viewMoreProduct.aspx?par=" & pType & "&p=1'>第一頁</a> ")
                    HtmlStr.AppendLine(" <a href='viewMoreProduct.aspx?par=" & pType & "&p=" & index - 1 & "'>上一頁</a> ")

                    For icounter As Integer = ForeIndex To LastIndex
                        If icounter = index Then
                            HtmlStr.AppendLine(icounter)
                        Else
                            HtmlStr.AppendLine(" <a href='viewMoreProduct.aspx?par=1&p=" & icounter & "'>" & icounter & "</a> ")
                        End If
                    Next

                    HtmlStr.AppendLine(" <a href='viewMoreProduct.aspx?par=" & pType & "&p=" & index + 1 & "'>下一頁</a> ")
                    HtmlStr.AppendLine(" <a href='viewMoreProduct.aspx?par=" & pType & "&p=" & TotalPage & "'>最後一頁</a> ")
            End Select

            'OutputHtml.Text = HtmlStr.ToString

            Me.newpager.InnerHtml = HtmlStr.ToString

        End If



    End Sub
    Protected Sub LoadProduct(ByVal index As Integer, ByVal pType As Integer)
        Dim link As String = "http://" & Request.Url.Host & Request.ApplicationPath

        Using conn As New SqlConnection
            conn.ConnectionString = New RuzhiConnConnect().GetConnectString
            conn.Open()

            'Dim startDate As DateTime = New Date(1970, 1, 1) 'javascript的getTime是從1970/01/01算起
            'Dim nowDate As DateTime = Now
            'Dim ts As Long = 0

            Dim MyString As New StringBuilder
            Dim SN As String = ""
            Dim PicUrl As String = ""
            Dim NowBid As String = ""
            Dim leftBid As String = ""
            Dim count As Integer = 0

            Dim HtmlStr As New LiteralControl()

            Dim mainSql As String = "(select top " & eachPagerCounter & " * from WSProductData as Tb1 where Tb1.商品種類=@商品種類 and (Tb1.商品狀態 =@pStatus) and  Tb1.商品編號 not in (select Top " & (eachPagerCounter * (index - 1)) & " 商品編號 from WSProductData as Tb2 where Tb2.商品種類=@商品種類 and (Tb2.商品狀態 =2) order by Tb2.商品編號) order by Tb1.商品編號)"
            ' Response.Write(mainSql)


            Using MyDs As New Data.DataSet
                Using reader As New SqlDataAdapter("select * from ( select data.圖片,data.商品編號,data.商品狀態,data.入場金幣," & _
                                                   "data.商品金額,data.商品名稱,data.上架日期,data.滿足結標次數-isnull(" & _
                                                   "data.目前投標次數,0) as leftBid,isnull(data3.暱稱,'無人投標') as nickName " & _
                                                   "from " & mainSql & " as data left join WSrecordOfBidding as data2 on " & _
                                                   "data.得標記錄編號=data2.編號 left join WSMemberData as data3 on " & _
                                                   "data2.會員編號=data3.會員編號 ) as lastData", conn)
                    reader.SelectCommand.Parameters.Add("商品種類", Data.SqlDbType.Int).Value = pType
                    reader.SelectCommand.Parameters.Add("pStatus", System.Data.SqlDbType.Int).Value = Integer.Parse(pStatus)

                    reader.Fill(MyDs, "TmpTb")

                    MyString.AppendLine("<table><tr><td>")
                    MyString.AppendLine("<ul>")

                    For Each sRow In MyDs.Tables("TmpTb").Rows
                        PicUrl = "~" & sRow("圖片").ToString
                        SN = sRow("商品編號").ToString
                        leftBid = sRow("leftBid")

                        'BOX-1 放置圖片
                        MyString.AppendLine("<li>")
                        MyString.AppendLine("<div class='auction_item' id='auction_" & SN & "'> ")

                        MyString.AppendLine("  <div  class='BOX-1'>")
                        MyString.AppendLine("     <a href='" & link & "/bid/default.aspx?p_sn=" & SN & "'><img style='border:0px;' src='" & link & "/Product/" & ResolveClientUrl(PicUrl) & "' /></a> ")
                        MyString.AppendLine("  </div>")
                        MyString.AppendLine("  <div class='P2'>商品名稱：" & sRow("商品名稱") & "</div><br>")
                        '得標者
                        MyString.AppendLine("  <div class='bidder'>得標者：<span id='current_bidder_" & SN & "'> " & sRow("nickName") & "</span></div> ")
                        '入場費
                        MyString.AppendLine("  <div class='price'>入場費：<span id='current_price_" & SN & "'>" & sRow("入場金幣").ToString & "</span></div> ")
                        '剩餘標數
                        MyString.AppendLine("  <div class='leftbid'>剩餘標數：<span id='current_leftbid_" & SN & "'> " & leftBid & "</span></div> ")
                        MyString.AppendLine("</div> ")

                        MyString.AppendLine("</li>")
                    Next

                    MyString.AppendLine("</ul>")
                    MyString.AppendLine("</td></tr></table>")

                    HtmlStr.Text = MyString.ToString
                    Me.container_content_Menu.Controls.Add(HtmlStr)

                End Using
            End Using
        End Using
    End Sub


End Class
