Imports System.Data.SqlClient

Partial Class Product_ViewProduct
    Inherits System.Web.UI.Page
    Dim anti As New RuzhiTurnEncode

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        If Not IsPostBack Then
            Dim sType As String = anti.CheckAnit(Request.QueryString("par1"))   'par1是商品類別
            Dim pStatus As String = anti.CheckAnit(Request.QueryString("par2")) '3是結標 2是上架

            If sType.Length = 0 Then
                sType = "1"
            End If '
            If pStatus.Length = 0 Then
                pStatus = "1"
            End If

            LoadProduct(1, 2)
            'LoadProduct(sType, pStatus)

            newPagerData(1, pStatus, sType)

            Me.Literal1.Text = "123" & Me.container_content_Menu.ClientID

            Me.Page.ClientScript.RegisterClientScriptBlock(GetType(String), "bodyLoad", "<script>$(""#pType"").attr('value'," & sType & ");$(""#pStatus"").attr('value'," & pStatus & ");</script>")
            'Me.Page.ClientScript.RegisterStartupScript(GetType(String), "bodyLoad1", "<script>load_exhibit();</script>")
        End If
    End Sub

    Protected Sub LoadProduct(ByVal sType As Integer, ByVal pStatus As Integer)
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

            Using MyDs As New Data.DataSet
                Using reader As New SqlDataAdapter("select top 10 * from ( select data1.圖片,data1.商品編號,data1.商品狀態,data1.入場金幣," & _
                                                   "data1.商品金額,data1.商品名稱,data1.上架日期,data1.滿足結標次數-isnull(" & _
                                                   "data1.目前投標次數,0) as leftBid,isnull(data3.暱稱,'無人投標') as nickName " & _
                                                   "from WSProductData as data1 left join WSrecordOfBidding as data2 on " & _
                                                   "data1.得標記錄編號=data2.編號 left join WSMemberData as data3 on " & _
                                                   "data2.會員編號=data3.會員編號 where data1.商品種類=@商品種類 and (data1.商品狀態 =@pStatus)) as Data order by 商品編號 ", conn)
                    reader.SelectCommand.Parameters.Add("商品種類", Data.SqlDbType.Int).Value = sType
                    reader.SelectCommand.Parameters.Add("pStatus", Data.SqlDbType.Int).Value = pStatus
                    reader.Fill(MyDs, "TmpTb")

                    MyString.AppendLine("<ul>")

                    For Each sRow In MyDs.Tables("TmpTb").Rows
                        PicUrl = "~" & sRow("圖片").ToString
                        SN = sRow("商品編號").ToString
                        leftBid = sRow("leftBid")

                        'nowDate = sRow("上架日期")
                        'nowDate = nowDate.AddDays(20)
                        'ts = Math.Round(nowDate.Subtract(startDate).TotalSeconds)

                        'BOX-1 放置圖片
                        MyString.AppendLine("<li class='auction_item' id='auction_" & SN & "'>")
                        MyString.AppendLine("<Div class='BOX'>")

                        MyString.AppendLine("  <div class='BOX-3'> ")
                        MyString.AppendLine("<table class='P'>")
                        MyString.AppendLine("<tr>")
                        MyString.AppendLine("<td width=""151"" class=""P2"">" & sRow("商品名稱") & "</td>")
                        MyString.AppendLine("</tr>")
                        MyString.AppendLine("</table>")
                        MyString.AppendLine("   </div>")

                        MyString.AppendLine("    <Div class=""BOX-1"">" & "<a href='#' onclick=""return loadbidpage(" & SN & ")""><img style='border:0px;' src='" & link & "/Product/" & ResolveClientUrl(PicUrl) & "' /></a> </Div>  ")
                        'MyString.AppendLine("    <Div class=""BOX-1"">" & "<a href='" & link & "/bid/default.aspx?p_sn=" & SN & "'><img style='border:0px;' src='" & link & "/Product/" & ResolveClientUrl(PicUrl) & "' /></a> </Div>  ")

                        MyString.AppendLine("<Div class=""BOX-2"">")
                        MyString.AppendLine("<table class=""P"">")
                        MyString.AppendLine("<tr>")
                        MyString.AppendLine("<td class=""P4"">得 標 者 :</td>")
                        MyString.AppendLine("  <td width=""85px""><div class='bidder'><span id='current_bidder_" & SN & "'> " & sRow("nickName") & "</span></div> </td></tr>")
                        MyString.AppendLine("<tr>")
                        MyString.AppendLine("  <td>入 場 費 :</td><td><div class='price'><span id='current_price_" & SN & "'>" & sRow("入場金幣").ToString & "</span></div></td></tr>")
                        MyString.AppendLine("<tr>")
                        MyString.AppendLine("  <td class=""P3"">剩餘標數:</td><td><div class='leftbid'><span id='current_leftbid_" & SN & "'> " & leftBid & "</span></div></td></tr>")
                        MyString.AppendLine("</table></Div>")

                        MyString.AppendLine("</Div>")
                        MyString.AppendLine("</li>")
                    Next

                    MyString.AppendLine("</ul>")

                    HtmlStr.Text = MyString.ToString
                    Me.container_content_Menu.Controls.Add(HtmlStr)

                End Using
            End Using
        End Using
    End Sub

    Protected Sub newPagerData(ByVal index As Integer, ByVal pStatus As Integer, ByVal pType As Integer)
        Dim HtmlStr As New StringBuilder
        Dim TotalItems As Integer = 0
        Dim TotalPage As Integer = 0
        Dim ForeIndex As Integer = 0
        Dim LastIndex As Integer = 0
        Dim OutputHtml As New Literal
        Dim eachPagerCounter As Integer = 10

        '由於進行與結標都呼叫相同的程式碼，id重覆會蓋掉之前的判斷值所以 以pstatus來判別，並給予不同的function名稱
        Dim getMoreFunctionName As String = ""
        If pStatus = 2 Then
            getMoreFunctionName = "getMoreData"
        Else
            getMoreFunctionName = "getMoreData_End"
        End If

        Using conn As New SqlConnection
            conn.ConnectionString = New RuzhiConnConnect().GetConnectString
            conn.Open()

            Using cmd As New SqlCommand
                cmd.CommandText = "select count(*) as counter from WSProductData where 商品狀態=@pStatus and 商品種類=@ProductType"
                cmd.Parameters.Add("productType", System.Data.SqlDbType.Int).Value = pType
                cmd.Parameters.Add("pStatus", System.Data.SqlDbType.Int).Value = pStatus
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

            'HtmlStr.AppendLine("<div class='showMore-summary'>共" & TotalItems & "項、每頁最多顯示" & eachPagerCounter & "項</div> ")
            HtmlStr.AppendLine("<div class='showMore-navi'>")

            ForeIndex = index
            LastIndex = index + 7
            If LastIndex > TotalPage Then
                LastIndex = TotalPage
            End If

            For icounter As Integer = ForeIndex To LastIndex
                If icounter = index Then
                    HtmlStr.AppendLine(" <a onclick='" & getMoreFunctionName & "(" & icounter & ",this)' style='color:red;'>" & icounter & "</a> ")
                Else
                    HtmlStr.AppendLine(" <a onclick='" & getMoreFunctionName & "(" & icounter & ",this)'>" & icounter & "</a> ")
                End If
            Next
            HtmlStr.AppendLine("</div>")

            Me.newpager.InnerHtml = HtmlStr.ToString

        End If


    End Sub

End Class
