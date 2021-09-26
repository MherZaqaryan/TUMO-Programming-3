const LivingCreature = require('./LivingCreature');
const random = require('./RandomUtil');

module.exports = class Predator extends LivingCreature {

    constructor(x, y) {
        super(x, y);
        this.energy = 20;
        predators.push(this);
        matrix[y][x] = 3;
        gameData.addPredator();
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
        if (this.chooseCell(2).length > 0) {
            this.eat()
        }
        else if (this.chooseCell(0).length > 0) {
            this.move();
        }
        else {
            this.energy -= 0.2;
        }
        if (this.energy >= 20) {
            this.mult()
        }
        if (this.energy <= 0) {
            this.remove()
        }
    }

    move() {
        let emptyCells = this.chooseCell(0);
        let randIndex = random(emptyCells.length - 1);
        let x = emptyCells[randIndex][0];
        let y = emptyCells[randIndex][1];
        matrix[y][x] = 3;
        matrix[this.y][this.x] = 0;
        this.x = x;
        this.y = y;
        this.energy -= 1;
    }

    eat() {
        let foods = this.chooseCell(2);
        let randIndex = random(foods.length - 1);
        let x = foods[randIndex][0];
        let y = foods[randIndex][1];
        for (const i in grassEaters) {
            if (!(grassEaters[i].x == x && grassEaters[i].y == y)) continue;
            grassEaters.splice(i, 1);
        }
        matrix[y][x] = 3;
        matrix[this.y][this.x] = 0;
        this.energy += 2;
        this.x = x;
        this.y = y;
    }

    mult() {
        if (this.energy < 30) return;
        var emptyCells = this.chooseCell(0);
        var randIndex = random(emptyCells.length - 1);
        let x = emptyCells[randIndex][0];
        let y = emptyCells[randIndex][1];
        matrix[this.y][this.x] = 3;
        new Predator(x, y);
        this.energy -= 5;
    }

    remove() {
        if (this.energy > 0) return;
        matrix[this.y][this.x] = 0;
        for (var i in predators) {
            if (!(this.x == predators[i].x && this.y == predators[i].y)) continue;
            predators.splice(i, 1);
            break;
        }
    }

}