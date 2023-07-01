class Steam extends Gas {
    constructor({ x, y, width, height, index, color = { red: 150, green: 150, blue: 150 } }) {
        super({ x, y, width, height, index, color });

        this.lifeSpan = Math.random() * 500 + 1000;
        this.bufferIndex = 10;
    }

    specificUpdate() {
        if(this.lifeSpan > 0) {
            this.lifeSpan--;
        }
        else this.condense();
    }

    condense() {
        particles.push(new Water({
            x: grid[this.index.row][this.index.column].x,
            y: grid[this.index.row][this.index.column].y,
            width: grid[this.index.row][this.index.column].width,
            height: grid[this.index.row][this.index.column].height,
            index: {
                row: grid[this.index.row][this.index.column].y / (canvas.height / rows),
                column: grid[this.index.row][this.index.column].x / (canvas.width / columns),
            },
        }));
        particles.splice(particles.indexOf(grid[this.index.row][this.index.column].particle), 1);
        grid[this.index.row][this.index.column].particle = particles[particles.length - 1];
    }

}