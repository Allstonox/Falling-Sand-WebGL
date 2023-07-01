class Water extends Liquid {
    constructor({ x, y, width, height, index, color = {red: 32, green: 178, blue: 170}, producesGas = true }) {
        super({ x, y, width, height, index, color, producesGas });

        this.gasToProduce = 'Steam';
        this.vaporizeChance = 0.005;
        this.bufferIndex = 2;
    }

}