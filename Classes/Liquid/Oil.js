class Oil extends Liquid {
    constructor({ x, y, width, height, index, color = {red: 0.13725490196078433, green: 0, blue: 0}, flammable = true }) {
        super({ x, y, width, height, index, color, flammable });

        this.burnChance = 0.5;
        this.bufferIndex = 4;
    }

}