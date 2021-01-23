var data = [];
for (var i = 0; i < 20; i++) {
    if (i < 2) {
        data.push(1);
    } else {
        data.push(data[i - 1] + data[i - 2]);
    }
}
console.log(data);