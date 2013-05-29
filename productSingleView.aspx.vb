Imports System.Data.SqlClient

Partial Class productSingleView
    Inherits System.Web.UI.Page
    Private antiXss As New RuzhiSecurity()
    Private p_SN As Integer = 0
    Protected Sub Page_Load(sender As Object, e As System.EventArgs) Handles Me.Load
        If Not IsPostBack Then
            p_SN = antiXss.AntiXSS(Request.QueryString("pID"))
            If (p_SN > 0) Then
                load_singleProduct()
            End If
        End If
    End Sub

    Protected Sub load_singleProduct()
        Using conn As New SqlConnection
            conn.ConnectionString = New RuzhiConnConnect().GetConnectString_Combine()
            conn.Open()

            Using cmd As New SqlCommand
                cmd.Connection = conn
                cmd.CommandText = " select data1.編號,data1.產品編號,data1.每台斤金額 as 金額" & _
                                                   ",data1.上架日期,data1.說明,data2.產品名稱,data2.主圖位置 as 圖片 " & _
                                                   " from product_exhibitInfo as data1" & _
                                                   " left join product_Info as data2 on " & _
                                                   " data1.產品編號=data2.產品編號 where 編號=@onTopSN"

                cmd.Parameters.Add("onTopSN", Data.SqlDbType.Int).Value = p_SN
                Using reader As SqlDataReader = cmd.ExecuteReader()
                    If reader.Read Then
                        main_Pic.ImageUrl = reader.Item("圖片")
                        Me.product_Name.InnerHtml = reader.Item("產品名稱")
                        Me.orderPrice.InnerText = reader.Item("金額")
                        Me.memoExplain.InnerText = reader.Item("說明")
                    End If
                End Using
            End Using
        End Using
    End Sub
End Class
