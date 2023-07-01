class Toxin extends Gas {
    constructor({ x, y, width, height, index, color = {red: 50, green: 120, blue: 50}, flammable = true }) {
        super({ x, y, width, height, index, color, flammable });

        this.burnChance = 0.1;
        this.bufferIndex = 13;

    }

}