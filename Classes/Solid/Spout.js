class Spout extends Solid {
    constructor({ x, y, width, height, index, color = {red: 173, green: 216, blue: 230}, dynamic = false }) {
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
                    row: grid[this.index.row + 1][this.index.column].y / (canvas.height / rows),
                    column: grid[this.index.row + 1][this.index.column].x / (canvas.width / columns),
                },
            }));
            grid[this.index.row + 1][this.index.column].particle = particles[particles.length - 1];
        }
    }
}