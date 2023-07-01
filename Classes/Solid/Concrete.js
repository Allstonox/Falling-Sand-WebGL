class Concrete extends Solid {
    constructor({ x, y, width, height, index, color = {red: 90, green: 90, blue: 90}, dynamic = false }) {
        super({ x, y, width, height, index, color, dynamic });

        this.dissolvable = true;
        this.dissolveRate = 0.999;
        this.bufferIndex = 3;
    }


}