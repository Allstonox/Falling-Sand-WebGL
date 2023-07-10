class Spout extends Solid {
    constructor({ x, y, width, height, index, color = {red: 0.6784313725490196, green: 0.8470588235294118, blue: 0.9019607843137255}, dynamic = false }) {
        super({ x, y, width, height, index, color, dynamic });
        this.bufferIndex = 12;
    }

    specificUpdate() {
        this.drip();
    }

    drip() {
        if (grid[this.index.row + 1][this.index.column].particle === null) {
            particles.push(new Water({
                x: grid[this.index.row + 1][this.index.column].x,
                y: grid[this.index.row + 1][this.index.column].y,
                width: this.width,
                height: grid[this.index.row + 1][this.index.column].height,
                index: {
                    row: this.index.row + 1,
                    column: this.index.column,
                },
            }));
            grid[this.index.row + 1][this.index.column].particle = particles[particles.length - 1];
        }
    }
}