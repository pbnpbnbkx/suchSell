function closeMessage() {
    $("#popDialog").dialog("close");
    $("#message").html("");
}
function showMessage(message,titleString) {
    $("#message").html(message);
    $("#popDialog").dialog({ width: 350, height: 200, resizable: true, draggable: false, modal: true, title: titleString })
    //執行視窗關閉 3秒後關閉視窗
    setTimeout("closeMessage()", 10000);
}
function t1(url, titleString) {
    $("#popDialog").load(url).dialog({ modal: true, title: titleString });
    setTimeout("closeMessage()", 10000);
}

