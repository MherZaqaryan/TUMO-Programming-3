const LivingCreature = require('./LivingCreature');

module.exports = class Grass extends LivingCreature {

    constructor(x, y) {
        super(x, y);
        this.multiplay = 0;
        matrix[y][x] = 1;
        grasses.push(this);
    }

    mult() {
        this.multiplay++;
        if (this.multiplay < 2) return;
        let emptyCells = this.chooseCell(0);
        if (emptyCells.length > 0) {
            let randIndex = Math.round(Math.random() * (emptyCells.length - 1));
            let x = emptyCells[randIndex][0];
            let y = emptyCells[randIndex][1];
            matrix[y][x] = 1;
            new Grass(x, y);
        }
        this.multiplay = 0;
    }

}