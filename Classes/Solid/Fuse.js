class Fuse extends Solid {
    constructor({ x, y, width, height, index, color = {red: 0.5450980392156862, green: 0.27058823529411763, blue: 0.07450980392156863}, dynamic = false, flammable = true }) {
        super({ x, y, width, height, index, color, dynamic, flammable });

        this.burnChance = 0.6;
        this.bufferIndex = 6;
    }

}