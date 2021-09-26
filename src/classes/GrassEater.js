const random = require('./RandomUtil');
const LivingCreature = require('./LivingCreature');

module.exports = class GrassEater extends LivingCreature {

    constructor(x, y) {
        super(x, y);
        this.energy = 10;
        grassEaters.push(this);
        matrix[y][x] = 2;
        gameData.addGrassEater();
    }

    updateDirections() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    chooseCell(number) {
        this.updateDirections();
        return super.chooseCell(number);
    }

    start() {
        if (this.chooseCell(1).length > 0) {
            this.eat()
        }
        else if (this.chooseCell(0).length > 0) {
            this.move()
        }
        if (this.energy >= 10) {
            this.mult()
        }
        if (this.energy <= 0) {
            this.remove()
        }
    }

    mult() {
        if (this.energy < 30) return;
        var emptyCells = this.chooseCell(0);
        var randIndex = random(emptyCells.length - 1);
        let x = emptyCells[randIndex][0];
        let y = emptyCells[randIndex][1];
        matrix[this.y][this.x] = 2;
        new GrassEater(x, y);
        this.energy = 5;
    }

    eat() {
        let foods = this.chooseCell(1);
        let randIndex = random(foods.length - 1);
        let x = foods[randIndex][0];
        let y = foods[randIndex][1];
        for (const i in grasses) {
            if (!(grasses[i].x == x && grasses[i].y == y)) continue;
            grasses.splice(i, 1);
        }
        matrix[y][x] = 2;
        matrix[this.y][this.x] = 0;
        this.energy += 3;
        this.x = x;
        this.y = y;
    }

    move() {
        let emptyCells = this.chooseCell(0);
        let randIndex = random(emptyCells.length - 1);
        let x = emptyCells[randIndex][0];
        let y = emptyCells[randIndex][1];
        matrix[y][x] = 2;
        matrix[this.y][this.x] = 0;
        this.x = x;
        this.y = y;
        this.energy -= 2;
    }

    remove() {
        if (this.energy > 0) return;
        matrix[this.y][this.x] = 0;
        for (var i in grassEaters) {
            if (!(this.x == grassEaters[i].x && this.y == grassEaters[i].y)) continue;
            grassEaters.splice(i, 1);
            break;
        }
    }

}