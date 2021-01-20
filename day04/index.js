var data = [
    [],
    [],
    [],
    [],
    []
];
//ata[0] = [1];
//data[1] = [1,1];
for (var i = 0; i < 5; i++) {
    for (var j = 0; j < 5 - i; j++) {
        // if(j == 0 || j == i){
        //     data[i][j] = 1;
        // } else {
        //     data[i][j] = data[i - 1][j - 1] + data[i - 1][j];
        // }
        //document.write('* ');
    }
    //document.write("<br>");
}
//console.log(data);

var a = 3705.00;
var b = 5676.00;
var c = 20899.00;
var d = (a * 100 + b * 100 ) / 100;
console.log(d.toFixed(2));