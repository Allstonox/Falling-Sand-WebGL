class Sand extends Solid {
    constructor({ x, y, width, height, index, color = {red: 184, green: 134, blue: 11} }) {
        super({ x, y, width, height, index, color });
        
        this.bufferIndex = 1;
    }
}