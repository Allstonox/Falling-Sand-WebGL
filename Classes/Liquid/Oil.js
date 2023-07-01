class Oil extends Liquid {
    constructor({ x, y, width, height, index, color = {red: 35, green: 0, blue: 0}, flammable = true }) {
        super({ x, y, width, height, index, color, flammable });

        this.burnChance = 0.5;
        this.bufferIndex = 4;
    }

}