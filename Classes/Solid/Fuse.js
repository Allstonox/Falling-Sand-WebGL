class Fuse extends Solid {
    constructor({ x, y, width, height, index, color = {red: 139, green: 69, blue: 19}, dynamic = false, flammable = true }) {
        super({ x, y, width, height, index, color, dynamic, flammable });

        this.burnChance = 0.6;
        this.bufferIndex = 6;
    }

}