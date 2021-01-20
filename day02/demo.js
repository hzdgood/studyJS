var canvas = document.getElementById("chessboard");
var btn = document.getElementById("start");
var context = canvas.getContext('2d');
var chessMapArr = [];
var chessColor = ["black", "white"];
var step = 0;
var flag = false;
var checkMode = [
    [1, 0], [0, 1], [1, 1], [1, -1]
];
btn.addEventListener("click", function () {
    startGame();
})
function startGame() {
    for (var i = 0; i < 14; i++) {
        chessMapArr[i] = [];
        for (var j = 0; j < 14; j++) {
            chessMapArr[i][j] = 0;
        }
    }
    cleanChessBoard();
    drawChessBoard();
    flag = false;
}
function drawChessBoard() {
    for (var i = 0; i < 14; i++) {
        context.beginPath();
        context.moveTo((i + 1) * 30, 30);
        context.lineTo((i + 1) * 30, canvas.height - 30,);
        context.stroke();
        context.beginPath();
        context.moveTo(30, 30 * (i + 1));
        context.lineTo(canvas.width - 30, (i + 1) * 30);
        context.stroke();
    }
}
function cleanChessBoard() {
    context.fillStyle = "#8f7466";
    context.fillRect(0, 0, canvas.width, canvas.height);
}
function drawChess(x, y, color) {
    context.beginPath();
    context.arc(x, y, 15, 0, Math.PI * 2, false);
    context.closePath();
    context.fillStyle = color;
    context.fill();
}
canvas.addEventListener('click', function (e) {
    var dx = Math.floor((e.offsetX + 15) / 30) * 30;
    var dy = Math.floor((e.offsetY + 15) / 30) * 30;
    if (chessMapArr[dx / 30 - 1][dy / 30 - 1] == 0) {
        drawChess(dx, dy, chessColor[step % 2]);
        chessMapArr[dx / 30 - 1][dy / 30 - 1] = chessColor[step % 2];
    }
    for (var i = 0; i < 4; i++) {
        checkWin(dx / 30 - 1, dy / 30 - 1, chessColor[step % 2], checkMode[i])
    }
    step++;
})

function checkWin(x, y, color, mode) {
    var count = 1;
    for (var i = 0; i < 5; i++) {
        if (chessMapArr[x + i * mode[0]]) {
            if (chessMapArr[x + i * mode[0]][y + i * mode[1]] == color) {
                count++;
            } else {
                break;
            }
        }
    }
    for (var j = 0; j < 5; j++) {
        if (chessMapArr[x - j * mode[0]]) {
            if (chessMapArr[x - j * mode[0]][y - j * mode[1]] == color) {
                count++;
            } else {
                break;
            }
        }
    }
    console.log(count);
}



