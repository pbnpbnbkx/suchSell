function checkpass(getobj) {
    var getval = $(getobj).val();
    var pass = getpass();
    var mix = parseInt(pass) + 123456;
    var reBol = false;

    if (getval == mix) {
        reBol = true;
    }

    return reBol;
}

function getpass() {
    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth() + 1;
    var y = date.getFullYear() - 1911;

    var newStr = y + (m <= 9 ? '0' + m : m) + (d <= 9 ? '0' + d : d);

    return newStr;
}