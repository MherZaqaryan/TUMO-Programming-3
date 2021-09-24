const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const GameData = require("./classes/GameData");
var Grass = require('./classes/Grass');
var GrassEater = require('./classes/GrassEater');
var Predator = require('./classes/Predator');
var Destroyer = require('./classes/Destroyer');
var Grenade = require('./classes/Grenade');

gameData = new GameData();
matrix = [];
grasses = [];
grassEaters = [];
predators = [];
destroyers = [];
grenades = [];

app.use(express.static("."));

app.get('/', function(req, res) {
    res.redirect('index.html');
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
        let x = Math.round(Math.random() * (size - 1));
        let y = Math.round(Math.random() * (size - 1));
        if (matrix[y][x] == 0) new Grass(x, y);
        else i--;
    }

    for (let i = 0; i < grassEatersAmount; i++) {
        let x = Math.round(Math.random() * (size - 1));
        let y = Math.round(Math.random() * (size - 1));
        if (matrix[y][x] == 0) new GrassEater(x, y);
        else i--;
    }

    for (let i = 0; i < predatorsAmount; i++) {
        let x = Math.round(Math.random() * (size - 1));
        let y = Math.round(Math.random() * (size - 1));
        if (matrix[y][x] == 0) new Predator(x, y);
        else i--;
    }

    for (let i = 0; i < destroyersAmount; i++) {
        let x = Math.round(Math.random() * (size - 1));
        let y = Math.round(Math.random() * (size - 1));
        if (matrix[y][x] == 0) new Destroyer(Math.round(Math.random() * (matrix.length - 1)));
        else i--;
    }

    for (let i = 0; i < grenadesAmount; i++) {
        let x = Math.round(Math.random() * (size - 1));
        let y = Math.round(Math.random() * (size - 1));
        if (matrix[y][x] == 0) new Grenade(x, y);
        else i--;
    }

}

createMatrix(60, 100, 30, 20, 1, 5);

function game() {
    
    for (const i in grasses) grasses[i].mult();
    for (const i in grassEaters) grassEaters[i].start();
    for (const i in predators) predators[i].start();
    for (const i in destroyers) destroyers[i].start();
    for (const i in grenades) grenades[i].start();

    let data = {
        matrix: matrix,
        gameData: gameData
    }

    io.sockets.emit("data", data);

}

setInterval(game, 250)