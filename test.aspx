<%@ Page Language="VB" AutoEventWireup="false" CodeFile="test.aspx.vb" Inherits="test" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <style type="text/css">
     #div1 div
     {
         float:left;
         background-color:Green;
         width:300px;
         margin:20px;
         padding:20px;
         border:1px solid black;
     }
     #div2 .give1
     {
        background-color:Red;
        float:left;
        position:relative;
     }
     
     #div3
     {
         display:inline-block;
         float:left;
         border:3px solid #000;
         width:200px;
     }
     .clear{clear:both;}
     .right{float:right;}
     .div_left{float:left; display:inline-table;}
     .test1{ color:White;}
    </style>
</head>
<body>
    <form id="form1" runat="server">
        <div id="div1">
            <div>這是個字也是個圖</div>
            <div>這是個字也是個圖</div>
            <div>這是個字也是個圖</div>
            <div>這是個字也是個圖</div>
            <div class="clear test1 right">這是個字也是個圖</div>
            <div>這是個字也是個圖</div>
            <div>這是個字也是個圖</div>
            <div>這是個字也是個圖</div>
        </div>
        <div class="clear"></div>
        <div id="div2" style="width:100%;">
            <div class="give1">這是個字也是個圖</div>
            <div class="give1">這是個字也是個圖</div><!-- 若此設float:left div3也設定float:left則會並排 -->

            <div id="div3">
                <div class="div_left">
                <h2>Hello</h2>
                </div>
                <div class="div_left">說明</div>
                <div class="clear">
                 <ul>
                 <li>項目1</li>
                 <li>項目2</li>
                 </ul>
                </div>
            </div>

            <div class="give1" >這是個字也是個圖</div>
            <div>這是個字也是個圖</div>
            <div class="clear test1 right">這是個字也是個圖</div>
            <div>這是個字也是個圖</div>
            <div>這是個字也是個圖</div>
            <div>這是個字也是個圖</div>
        </div>


    </form>
</body>
</html>
