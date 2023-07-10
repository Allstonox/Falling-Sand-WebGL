class Water extends Liquid {
    constructor({ x, y, width, height, index, color = {red: 0.1, green: 0.6, blue: 0.6}, producesGas = true }) {
        super({ x, y, width, height, index, color, producesGas });

        this.gasToProduce = 'Steam';
        this.vaporizeChance = 0.005;
        this.bufferIndex = 2;
    }

}