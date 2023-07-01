class Wall extends Solid {
    constructor({ x, y, width, height, index, color = {red: 0, green: 0, blue: 0}, dynamic = false }) {
        super({ x, y, width, height, index, color, dynamic });
        
        this.bufferIndex = 0;
    }
}