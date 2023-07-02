class Sand extends Solid {
    constructor({ x, y, width, height, index, color = {red: 0.7215686274509804, green: 0.5254901960784314, blue: 0.043137254901960784} }) {
        super({ x, y, width, height, index, color });
        
        this.bufferIndex = 1;
    }
}