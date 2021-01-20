var data = [
    [], [], [], [], []
];
for (var i = 0; i < 5; i++) {
    for (var j = 0; j < i + 1; j++) {
        if(j == 0 || j == i){
            data[i][j] = 1;
        } else {
            data[i][j] = data[i - 1][j - 1] + data[i - 1][j];
        }
        //document.write('* ');
    }
    //document.write("<br>");
}
console.log(data);