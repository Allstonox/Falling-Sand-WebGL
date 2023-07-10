class Particle {
    constructor({ x, y, width, height, index, color, dynamic = true, flammable = false, dissolvable = false, bufferIndex = 1 }) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.index = index;
        this.dynamic = dynamic;
        this.flammable = flammable;
        this.color = color;
        this.bufferIndex = bufferIndex;
        if (!(this instanceof Wall) && !(this instanceof Liquid)) {
            this.randomColor = Math.random() * 0.2;
            this.color.red = this.color.red + this.randomColor;
            this.color.green = this.color.green + this.randomColor;
            this.color.blue = this.color.blue + this.randomColor;
        }
        else if (this instanceof Liquid) {
            this.randomColor = Math.random() * 0.05;
            this.color.red = this.color.red - this.randomColor;
            this.color.green = this.color.green - this.randomColor;
            this.color.blue = this.color.blue - this.randomColor;
        }
    }
}