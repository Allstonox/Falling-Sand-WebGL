class Toxin extends Gas {
    constructor({ x, y, width, height, index, color = {red: 0.19607843137254902, green: 0.47058823529411764, blue: 0.19607843137254902}, flammable = true }) {
        super({ x, y, width, height, index, color, flammable });

        this.burnChance = 0.1;
        this.bufferIndex = 13;

    }

}