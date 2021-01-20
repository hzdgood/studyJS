var n = 4;
//print('<div style=text-align:center;">');
//print("</div>");
for (var i = 0; i <= n; i++) {
    for (var j = 1; j < i + 2; j++) {
        //print(c(i, j));
        var val = c(i, j);
        console.log(val + " - " + i + " - " + j);
    }
}
function c(x, y) {
    if ((y == 1) || (y == x + 1)){
        return 1;
    }
    return c(x - 1, y - 1) + c(x - 1, y);
}
function print(v) {
    if (typeof v == "number") {
        var w = 30;
        if (n > 30) w = (n - 30) + 40;
        var s = '<span style="padding:4px 2px;display:inline-block;text-align:center;width:' + w + 'px;">' + v + '</span>';
        document.write(s);
    } else {
        document.write(v);
    }
}