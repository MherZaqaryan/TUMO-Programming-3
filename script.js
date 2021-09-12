matrix = [];
grasses = [];
grassEaters = [];
predators = [];
destroyers = [];
grenades = [];

var side = 10;

function matrixGenerator(size, grassesAmount, grassEatersAmount, predatorsAmount, destroyersAmount, grenadesAmount) {
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

matrixGenerator(60, 100, 30, 20, 1, 5);

function setup() {
    createCanvas(matrix.length * side + 1, matrix.length * side + 1);
    background("#acacac");
}

function draw() {
    fill("#acacac");
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
    for (const i in grasses) grasses[i].mult();
    for (const i in grassEaters) grassEaters[i].start();
    for (const i in predators) predators[i].start();
    for (const i in destroyers) destroyers[i].start();
    for (const i in grenades) grenades[i].start();
}