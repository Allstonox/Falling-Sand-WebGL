class Steam extends Gas {
    constructor({ x, y, width, height, index, color = { red: 0.5882352941176471, green: 0.5882352941176471, blue: 0.5882352941176471 } }) {
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
                row: this.index.row,
                column: this.index.column,
            },
        }));
        particles.splice(particles.indexOf(grid[this.index.row][this.index.column].particle), 1);
        grid[this.index.row][this.index.column].particle = particles[particles.length - 1];
    }

}