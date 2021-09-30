const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const fs = require("fs");

const GameData = require("./classes/GameData");
const Grass = require('./classes/Grass');
const GrassEater = require('./classes/GrassEater');
const Predator = require('./classes/Predator');
const Destroyer = require('./classes/Destroyer');
const Grenade = require('./classes/Grenade');
const SeasonTheme = require('./classes/Season');
const GameManager = require('./classes/GameManager');
const random = require('./classes/RandomUtil');

gameData = new GameData();
matrix = [];
grasses = [];
grassEaters = [];
predators = [];
destroyers = [];
grenades = [];

seasonIndex = 0;

seasonThemes = [
    new SeasonTheme("#0ac900","#e1ff00","#ff0066","#0341fc","#fc7703"), // Spring
    new SeasonTheme("#00ff2a","#ffd000","#fc0303","#0341fc","#fc7703"), // Summer
    new SeasonTheme("#b3ee3a","#f4fc03","#fc0303","#0341fc","#fc7703"), // Autumn
    new SeasonTheme("#fff0f0","#f4fc03","#fc0303","#0341fc","#fc7703") // Winter
];

gameManagers = [
    new GameManager(2),
    new GameManager(3),
    new GameManager(1),
    new GameManager(0)
];

app.use(express.static("."));

app.get('/', function(req, res) {
    res.redirect('./index.html');
}); 

server.listen(3000, function() {
    console.log("Server has started.")
});

function createMatrix(size, grassesAmount, grassEatersAmount, predatorsAmount, destroyersAmount, grenadesAmount) {

    for (let i = 0; i < size; i++) {
        matrix[i] = [];
        for (let j = 0; j < size; j++) matrix[i].push(0);
    }

    for (let i = 0; i < grassesAmount; i++) {
        let x = random(size - 1);
        let y = random(size - 1);
        if (matrix[y][x] == 0) new Grass(x, y);
        else i--;
    }

    for (let i = 0; i < grassEatersAmount; i++) {
        let x = random(size - 1);
        let y = random(size - 1);
        if (matrix[y][x] == 0) new GrassEater(x, y);
        else i--;
    }

    for (let i = 0; i < predatorsAmount; i++) {
        let x = random(size - 1);
        let y = random(size - 1);
        if (matrix[y][x] == 0) new Predator(x, y);
        else i--;
    }

    for (let i = 0; i < destroyersAmount; i++) {
        let x = random(size - 1);
        let y = random(size - 1);
        if (matrix[y][x] == 0) new Destroyer(random(matrix.length - 1));
        else i--;
    }

    for (let i = 0; i < grenadesAmount; i++) {
        let x = random(size - 1);
        let y = random(size - 1);
        if (matrix[y][x] == 0) new Grenade(x, y);
        else i--;
    }

}

global.getSeasonTheme = function() {
    return seasonThemes[seasonIndex];
}

global.getGameManager = function() {
    return gameManagers[seasonIndex];
}

function game() {
    
    for (const i in grasses) grasses[i].mult();
    for (const i in grassEaters) grassEaters[i].start();
    for (const i in predators) predators[i].start();
    for (const i in destroyers) destroyers[i].start();
    for (const i in grenades) grenades[i].start();

    let data = {
        matrix: matrix,
        gameData: gameData,
        seasonTheme: global.getSeasonTheme()
    };

    io.sockets.emit("data", data);
    
}

io.on('connection', function (socket) {
    createMatrix(60, 100, 30, 20, 1, 5);
    socket.on("restart", restart);
});

function restart() {

    gameData = new GameData();
    matrix = [];
    grasses = [];
    grassEaters = [];
    predators = [];
    destroyers = [];
    grenades = [];
    createMatrix(60, 100, 30, 20, 1, 5);
    game();

    let data = {
        matrix: matrix,
        gameData: gameData,
        seasonTheme: global.getSeasonTheme()
    };

    io.sockets.emit("data", data);

    console.log("Game Restarted.");

}

function writeStatistics() {
    fs.writeFile("statistics.json", JSON.stringify(gameData), function() {
        console.log("Statistics Updated.");
    });
}

function changeSeason() {
    seasonIndex++
    if (seasonIndex >= seasonThemes.length) seasonIndex = 0;
    let seasonName = "Spring";
    if (seasonIndex == 1) seasonName = "Summer";
    if (seasonIndex == 2) seasonName = "Autumn";
    if (seasonIndex == 3) seasonName = "Winter";
    console.log("Season Changed To " + seasonName);
}

setInterval(game, 75);
setInterval(writeStatistics, 250*60);
setInterval(changeSeason, 5000);