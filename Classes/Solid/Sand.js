class Sand extends Solid {
    constructor({ x, y, width, height, index, color = {red: 0.7, green: 0.5, blue: 0} }) {
        super({ x, y, width, height, index, color });
        
        this.bufferIndex = 1;
    }
}