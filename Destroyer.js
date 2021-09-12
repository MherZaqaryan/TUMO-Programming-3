class Destroyer {

    constructor(y) {
        this.y = y;
        this.directions = [];
        for (let j = -2; j <= 2; j++) {
            let y = this.y + j;
            for (let x = 0; x < matrix[this.y].length; x++) {
                if (!(x >= 0 && y >= 0 && x < matrix.length && y < matrix.length)) continue;
                this.directions.push([x, y]);
            }
        }
        this.cooldown = 20;
        this.time = 5;
        destroyers.push(this);
    }

    start() {
        this.cooldown--;
        if (this.cooldown <= 0) {
            this.destroy();
        }
        if (this.time <= 0) {
            this.mult();
            this.remove();
        }
    }

    destroy() {
        for (const d in this.directions) {
            let x = this.directions[d][0];
            let y = this.directions[d][1];
            if (!(x >= 0 && y >= 0 && x < matrix.length && y < matrix.length)) continue;
            this.removeObject(x, y);
            matrix[y][x] = 4;
        }
        this.time--;
    }

    remove() {
        for (const d in this.directions) {
            matrix[this.directions[d][1]][this.directions[d][0]] = 0;
        }
        for (var i in destroyers) {
            if (!(this.x == destroyers[i].x && this.y == destroyers[i].y)) continue;
            destroyers.splice(i, 1);
            break;
        }
        this.time = 5;
    }

    mult() {
        new Destroyer(Math.round(Math.random() * (matrix.length - 1)));
        this.cooldown = 20;
    }

    removeObject(x, y) {
        for (const i in grasses) {
            if (!(grasses[i].x == x && grasses[i].y == y)) continue;
            grasses.splice(i, 1);
        }
        for (const i in grassEaters) {
            if (!(grassEaters[i].x == x && grassEaters[i].y == y)) continue;
            grassEaters.splice(i, 1);
        }
        for (const i in predators) {
            if (!(predators[i].x == x && predators[i].y == y)) continue;
            predators.splice(i, 1);
        }
    }

}