class Gunpowder extends Solid {
    constructor({ x, y, width, height, index, color = { red: 45, green: 40, blue: 40 }, flammable = true }) {
        super({ x, y, width, height, index, color, flammable });

        this.burnChance = 0.2;
        this.bufferIndex = 11;
    }

}