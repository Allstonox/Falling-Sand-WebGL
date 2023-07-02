class Water extends Liquid {
    constructor({ x, y, width, height, index, color = {red: 0.12549019607843137, green: 0.6980392156862745, blue: 0.6666666666666666}, producesGas = true }) {
        super({ x, y, width, height, index, color, producesGas });

        this.gasToProduce = 'Steam';
        this.vaporizeChance = 0.005;
        this.bufferIndex = 2;
    }

}