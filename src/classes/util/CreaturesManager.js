module.exports = class CreaturesManager {

    constructor() {
        this.grasses = [];
        this.grassEaters = [];
        this.predators = [];
        this.destroyers = [];
        this.grenades = [];
        this.fires = [];
    }

    start() {
        for (const i in this.grasses) this.grasses[i].mult();
        for (const i in this.grassEaters) this.grassEaters[i].start();
        for (const i in this.predators) this.predators[i].start();
        for (const i in this.destroyers) this.destroyers[i].start();
        for (const i in this.grenades) this.grenades[i].start();
        for (const i in this.fires) this.fires[i].start();
    }

    addGrass(grass) {
        this.grasses.push(grass);
    }

    addGrassEater(grassEater) {
        this.grassEaters.push(grassEater);
    }

    addPredator(predator) {
        this.predators.push(predator);
    }

    addDestroyer(destroyer) {
        this.destroyers.push(destroyer);
    }

    addGrenade(grenade) {
        this.grenades.push(grenade);
    }

    addFire(fire) {
        this.fires.push(fire);
    }

    getGrassesCount() {
        return this.grasses.length;
    }

    getGrassEatersCount() {
        return this.grassEaters.length;
    }

    getPredatorsCount() {
        return this.predators.length;
    }

    getDestroyersCount() {
        return this.destroyers.length;
    }

    getGrenadesCount() {
        return this.grenades.length;
    }

    getFiresCount() {
        return this.fires.length;
    }

    getChartForm() {
        return {
            grass: this.getGrassesCount(),
            grassEater: this.getGrassEatersCount(),
            predator: this.getPredatorsCount(),
            destroyer: this.getDestroyersCount(),
            grenade: this.getGrenadesCount(),
            fire: this.getFiresCount()
        };
    }

    resetData() {
        this.grasses = [];
        this.grassEaters = [];
        this.predators = [];
        this.destroyers = [];
        this.grenades = [];
        this.fires = [];
    }

}