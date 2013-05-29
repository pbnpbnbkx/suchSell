document.onkeypress = onKeyPress_; // 設定整個網頁的按鍵輸入由 onKeyPress_ 函數控制判斷。 

function onKeyPress_(e) {
    // 這一行讓 ie 的判斷方式和 Firefox 一樣。 
    if (window.event) { e = event; e.which = e.keyCode; } else if (!e.which) e.which = e.keyCode;

    var code = e.which; // 輸入鍵的 ASCII 碼。 
    var char = String.fromCharCode(e.which); // 輸入鍵字元。 
    var isAlt = e.altKey; // 是否按下 Alt 鍵。 
    var isCtrl = e.ctrlKey; // 是否按下 Ctrl 鍵。 
    var isShift = e.shiftKey; // 是否按下 Shift 鍵。 
    // ... 

    if (code == 13) { // 判斷輸入鍵是否為 Enter 鍵。 
        //...
        alert("keypress:" + code);
    }

    if (48 <= code && code <= 57) { // 判斷輸入鍵是否為數字 0~9。 
        //... 
        alert("keypress:" + code);
    }

    if (65 <= code && code <= 90) { // 判斷輸入鍵是否為大寫字母 A~Z。 
        //... 
        alert("keypress:" + code);
    }

    if (97 <= code && code <= 122) { // 判斷輸入鍵是否為小寫字母 a~z。 
        //... 
        alert("keypress:" + code);
    }

    switch (code) {
        case 38: //up arrow   
        case 40: //down arrow 
        case 37: //left arrow 
        case 39: //right arrow 
        case 33: //page up   
        case 34: //page down   
        case 36: //home   
        case 35: //end                   
        case 13: //enter   
        case 9:  //tab   
        case 27: //esc   
        case 16: //shift   
        case 17: //ctrl   
        case 18: //alt   
        case 20: //caps lock 
        case 8:  //backspace   
        case 46: //delete 
    }

    return true;  // 按鍵合法，如果是 input 觸發的事件，字元會加入 input 的 value 中。 
    return false; // 按鍵不合法，如果是 input 觸發的事件，字元不會加入 input 的 value 中。 
} 