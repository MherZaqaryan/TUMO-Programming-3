const socket = io();
const side = 10;
var matrix = [];
var season;

function setup() {

    const grassCount = document.getElementById('grassCount');
    const grassEaterCount = document.getElementById('grassEaterCount');
    const predatorCount = document.getElementById('predatorCount');
    const destroyerCount = document.getElementById('destroyerCount');
    const grenadeCount = document.getElementById('grenadeCount');

    socket.on("data", drawCreatures);

    function drawCreatures(data) {

        matrix = data.matrix;
        season = data.seasonTheme;
        createCanvas(matrix.length * side + 1, matrix.length * side + 1);

        grassCount.innerText = data.gameData.grassCount;
        grassEaterCount.innerText = data.gameData.grassEaterCount;
        predatorCount.innerText = data.gameData.predatorCount;
        destroyerCount.innerText = data.gameData.destroyerCount;
        grenadeCount.innerText = data.gameData.grenadeCount;

        background('#8f8f8f');

        for (let y = 0; y < matrix.length; y++) {
            for (let x = 0; x < matrix.length; x++) {
                if (matrix[y][x] == 0) fill("#8f8f8f");
                else if (matrix[y][x] == 1) fill(season.grassColor);
                else if (matrix[y][x] == 2) fill(season.grassEaterColor);
                else if (matrix[y][x] == 3) fill(season.predatorColor);
                else if (matrix[y][x] == 4) fill(season.destroyerColor);
                else if (matrix[y][x] == 5) fill(season.grenadeColor);
                rect(x * side, y * side, side, side);
            }
        }

    }
    
}

function restart() {
    socket.emit("restart");
}