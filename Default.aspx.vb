Imports System.Data.SqlClient

Partial Class _Default
    Inherits System.Web.UI.Page
    Private prodcut_Class As Integer = 0
    Private antiXss As New RuzhiSecurity()
    Protected Sub Page_Load(sender As Object, e As System.EventArgs) Handles Me.Load
        If Not IsPostBack Then
            If (Request.QueryString("pClass") IsNot Nothing) Then
                prodcut_Class = antiXss.AntiXSS(Request.QueryString("pClass"))
            End If
            LoadProduct()
        End If
    End Sub

    Protected Sub LoadProduct()
        Dim link As String = "http://" & Request.Url.Host & Request.ApplicationPath

        Using conn As New SqlConnection
            conn.ConnectionString = New RuzhiConnConnect().GetConnectString_Combine
            conn.Open()

            Dim MyString As New StringBuilder
            Dim SN As String = ""
            Dim PicUrl As String = ""
            Dim NowBid As String = ""
            Dim leftBid As String = ""
            Dim count As Integer = 0
            Dim sql As String = ""
            If prodcut_Class = 0 Then
                sql = "select top 100 * from " & _
                                                   "( select data1.編號,data1.產品編號,data1.每台斤金額 as 金額" & _
                                                   ",data1.上架日期,data2.產品名稱,data2.主圖位置 as 圖片 " & _
                                                   " from product_exhibitInfo as data1" & _
                                                   " left join product_Info as data2 on " & _
                                                   " data1.產品編號=data2.產品編號 )" & _
                                                   " as Data order by 上架日期 desc "
            Else
                sql = "select  * from " & _
                                   "( select data1.編號,data1.產品編號,data1.每台斤金額 as 金額" & _
                                   ",data1.上架日期,data2.產品名稱,data2.主圖位置 as 圖片,data2.產品類別 " & _
                                   " from product_exhibitInfo as data1" & _
                                   " left join product_Info as data2 on " & _
                                   " data1.產品編號=data2.產品編號)" & _
                                   " as Data where 產品類別=@pClass order by 上架日期 desc "
            End If

            Dim HtmlStr As New LiteralControl()
            Using MyDs As New Data.DataSet
                Using reader As New SqlDataAdapter(sql, conn)
                    If prodcut_Class <> 0 Then
                        reader.SelectCommand.Parameters.Add("pClass", Data.SqlDbType.Int).Value = prodcut_Class
                    End If
                    reader.Fill(MyDs, "TmpTb")

                    MyString.AppendLine("<ul>")
                    If MyDs.Tables("TmpTb").Rows.Count > 0 Then
                        For Each sRow In MyDs.Tables("TmpTb").Rows
                            PicUrl = ResolveClientUrl(sRow("圖片").ToString)
                            SN = sRow("編號").ToString
                            'nowDate = sRow("上架日期")
                            'nowDate = nowDate.AddDays(20)
                            'ts = Math.Round(nowDate.Subtract(startDate).TotalSeconds)

                            'BOX-1 放置圖片
                            MyString.AppendLine("<li class='auction_item' id='auction_" & SN & "'>")
                            MyString.AppendLine("<Div class='BOX'>")

                            MyString.AppendLine("  <div class='BOX-3'> ")
                            MyString.AppendLine("<table class='P'>")
                            MyString.AppendLine("<tr>")
                            MyString.AppendLine("<td width=""151"" class=""P2"">" & sRow("產品名稱") & "</td>")
                            MyString.AppendLine("</tr>")
                            MyString.AppendLine("</table>")
                            MyString.AppendLine("   </div>")

                            MyString.AppendLine(" <Div class=""BOX-1"">" & "<a href='javascript:location.href=""productSingleView.aspx?pID=" & SN & """' ><img style='border:0px;' src='" & PicUrl & "' /></a> </Div>  ")

                            MyString.AppendLine("<Div class=""BOX-2"">")
                            MyString.AppendLine("<table class=""P"">")
                            MyString.AppendLine("<tr>")
                            MyString.AppendLine("<td colspan=""2"" class=""P4"">每台斤 :<span class=""showprice"">" & sRow("金額") & "</span>元</td>")
                            MyString.AppendLine("</tr>")
                            MyString.AppendLine("</table></Div>")

                            MyString.AppendLine("</Div>")
                            MyString.AppendLine("</li>")
                        Next
                    Else
                        MyString.AppendLine("<li style='width:100%;'>目前沒有商品存在!!</li>")
                    End If

                    MyString.AppendLine("</ul>")

                    HtmlStr.Text = MyString.ToString
                    Me.container_content_Menu.Controls.Add(HtmlStr)

                End Using
            End Using
        End Using
    End Sub

End Class
