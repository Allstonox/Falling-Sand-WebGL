class Sink extends Solid {
    constructor({ x, y, width, height, index, color = {red: 0.7529411764705882, green: 0.7529411764705882, blue: 0.7529411764705882}, dynamic = false }) {
        super({ x, y, width, height, index, color, dynamic });

        this.deleteCounter = 20;
        this.readyToDelete = false;
        this.bufferIndex = 8;
    }

    specificUpdate() {
        this.checkNeighbors();
        this.subtractCounter();
    }

    subtractCounter() {
        if(this.deleteCounter > 0) {
            this.deleteCounter--;
        }
        else if(this.deleteCounter <= 0) {
            this.readyToDelete = true;
        }
    }

    checkNeighbors() {
        for (let i = this.index.row - 1; i < this.index.row + 2; i++) {
            for (let j = this.index.column - 1; j < this.index.column + 2; j++) {
                if (grid[i][j].particle != null) {
                    if(this.readyToDelete && !(grid[i][j].particle instanceof Sink) && !(grid[i][j].particle instanceof Wall)) {
                        particles.splice(particles.indexOf(grid[i][j].particle), 1);
                        grid[i][j].particle = null;
                        this.readyToDelete = false;
                        this.deleteCounter = 20;
                    }
                    // else if(!this.readyToDelete && !(grid[i][j].particle instanceof Sink) && !(grid[i][j].particle instanceof Wall)) {
                    //     this.readyToDelete = true;
                    // }
                }
            }
        }
    }

}