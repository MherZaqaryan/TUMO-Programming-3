class Grenade {

    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.bursted = false;
        this.multiplayCooldown = 10;
        this.cooldown = 10;
        this.disappearCooldown = 5;
        matrix[y][x] = 5;
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1],
            [this.x - 2, this.y - 2],
            [this.x, this.y - 2],
            [this.x + 2, this.y - 2],
            [this.x - 2, this.y],
            [this.x + 2, this.y],
            [this.x - 2, this.y + 2],
            [this.x, this.y + 2],
            [this.x + 2, this.y + 2]
        ]
        grenades.push(this);
    }

    start() {
        this.cooldown--;
        this.multiplayCooldown--;
        if (this.bursted) this.disappearCooldown--;
        if (this.multiplayCooldown <= 0) {
            this.multiplayCooldown = 10;
            this.mult();
        }
        if (this.cooldown <= 0) {
            this.burst();
        }
        if (this.disappearCooldown <= 0) {
            this.remove();
        }
    }

    mult() {
        let x = Math.round(Math.random() * (matrix.length - 1));
        let y = Math.round(Math.random() * (matrix.length - 1));
        if (matrix[y][x] == 0) new Grenade(x, y);
        else this.mult();
    }

    remove() {
        for (const d in this.directions) {
            let x = this.directions[d][0];
            let y = this.directions[d][1];
            if (!(x >= 0 && y >= 0 && x < matrix.length && y < matrix.length)) continue;
            matrix[y][x] = 0;
        }
        matrix[this.y][this.x] = 0;
        for (var i in grenades) {
            if (!(this.x == grenades[i].x && this.y == grenades[i].y)) continue;
            grenades.splice(i, 1);
            break;
        }
    }

    burst() {
        matrix[this.y][this.x] = 5;
        for (const i in this.directions) {
            let x = this.directions[i][0];
            let y = this.directions[i][1];
            if (!(x >= 0 && y >= 0 && x < matrix.length && y < matrix.length)) continue;
            matrix[y][x] = 5;
            this.removeObject(x, y)
        }
        this.bursted = true;
    }

    removeObject(x, y) {
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