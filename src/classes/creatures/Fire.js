const Random = require("../util/Random");
const LivingCreature = require("./LivingCreature");

module.exports = class Fire extends LivingCreature { 

    constructor(x, y) {
        super(x, y);
        for (let i = x - 5; i <= x + 5; i++) {
            for (let j = y - 5; j <= y + 5; j++) {
                this.directions.push([i, j]);
            }
        }
        this.ququedCells = [...this.directions];
        creatures.addFire(this);
        gameData.addFire();
    }

    start() {
        this.burn();
    }

    burn() {
        if (this.ququedCells.length <= 0) {
            this.remove();
            return;
        }
        let randIndex = Random(this.ququedCells.length - 1);
        let x = this.ququedCells[randIndex][0];
        let y = this.ququedCells[randIndex][1];
        if (!(x >= 0 && y >= 0 && x < matrix.length && y < matrix.length)) return;
        if ([0,1,2,3].includes(matrix[y][x])) {
            this.ququedCells.splice(randIndex, 1);
            this.removeObject(x, y);
            matrix[y][x] = 6;
        }
    }

    remove() {
        if (this.ququedCells.length > 20) return;
        
    }

    mult() {

    }

    removeObject(x, y) {
        for (const i in creatures.grasses) {
            if (!(creatures.grasses[i].x == x && creatures.grasses[i].y == y)) continue;
            creatures.grasses.splice(i, 1);
        }
        for (const i in creatures.grassEaters) {
            if (!(creatures.grassEaters[i].x == x && creatures.grassEaters[i].y == y)) continue;
            creatures.grassEaters.splice(i, 1);
        }
        for (const i in creatures.predators) {
            if (!(creatures.predators[i].x == x && creatures.predators[i].y == y)) continue;
            creatures.predators.splice(i, 1);
        }
    }

}