class Wall_Sink extends Wall {
    constructor({ x, y, width, height, index, color = {red: 0.7529411764705882, green: 0.7529411764705882, blue: 0.7529411764705882}, dynamic = false }) {
        super({ x, y, width, height, index, color, dynamic });

        this.bufferIndex = 8;
    }

    specificUpdate() {
        this.checkAbove();
    }

    checkAbove() {
                if (grid[this.index.row - 1][this.index.column].particle != null) {
                    if(!(grid[this.index.row - 1][this.index.column].particle instanceof Sink) && !(grid[this.index.row - 1][this.index.column].particle instanceof Wall)) {
                        particles.splice(particles.indexOf(grid[this.index.row - 1][this.index.column].particle), 1);
                        grid[this.index.row - 1][this.index.column].particle = null;
                        this.readyToDelete = false;
                    }
            }
    }
}