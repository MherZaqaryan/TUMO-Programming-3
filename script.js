function setup() {

    var socket = io();
    var matrix = [];
    var side = 10;

    const grassCount = document.getElementById('grassCount');
    const grassEaterCount = document.getElementById('grassEaterCount');
    const predatorCount = document.getElementById('predatorCount');
    const destroyerCount = document.getElementById('destroyerCount');
    const grenadeCount = document.getElementById('grenadeCount');

    socket.on("data", drawCreatures);

    function drawCreatures(data) {

        matrix = data.matrix;
        createCanvas(matrix.length * side + 1, matrix.length * side + 1);

        grassCount.innerText = data.gameData.grassCount;
        grassEaterCount.innerText = data.gameData.grassEaterCount;
        predatorCount.innerText = data.gameData.predatorCount;
        destroyerCount.innerText = data.gameData.destroyerCount;
        grenadeCount.innerText = data.gameData.grenadeCount;

        background('#acacac');

        for (let y = 0; y < matrix.length; y++) {
            for (let x = 0; x < matrix.length; x++) {
                if (matrix[y][x] == 0) fill("#acacac");
                else if (matrix[y][x] == 1) fill("#0ac900");
                else if (matrix[y][x] == 2) fill("#e1ff00");
                else if (matrix[y][x] == 3) fill("#ff0066");
                else if (matrix[y][x] == 4) fill("#0341fc");
                else if (matrix[y][x] == 5) fill("#fc7703");
                rect(x * side, y * side, side, side);
            }
        }

    }

}