class Gunpowder extends Solid {
    constructor({ x, y, width, height, index, color = { red: 0.17647058823529413, green: 0.1568627450980392, blue: 0.1568627450980392 }, flammable = true }) {
        super({ x, y, width, height, index, color, flammable });

        this.burnChance = 0.2;
        this.bufferIndex = 11;
    }

}