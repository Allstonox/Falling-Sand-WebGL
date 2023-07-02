class Concrete extends Solid {
    constructor({ x, y, width, height, index, color = {red: 0.35294117647058826, green: 0.35294117647058826, blue: 0.35294117647058826}, dynamic = false }) {
        super({ x, y, width, height, index, color, dynamic });

        this.dissolvable = true;
        this.dissolveRate = 0.999;
        this.bufferIndex = 3;
    }


}