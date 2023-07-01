class Solid extends Particle {
    constructor({ x, y, width, height, index, color, dynamic, flammable }) {
        super({ x, y, width, height, index, color, dynamic, flammable });
    }

    update() {
        if (this.dynamic) {
            if (this.emptyBelow()) {
                this.fall();
            }
            else if (!this.emptyBelow()) {
                this.interact();
                this.sink();
            }
        }
        this.specificUpdate();
    }

    fall() {
        if (this.y + this.height < canvas.height) {
            this.y += this.height;
            this.index.row++;
            grid[this.index.row - 1][this.index.column].particle = null;
            grid[this.index.row][this.index.column].particle = this;
        }
    }

    emptyBelow() {
        if (this.index.row < rows - 1) {
            if (grid[this.index.row + 1][this.index.column].particle === null) {
                return true;
            }
            else return false;
        }
        else return false;
    }

    interact() {
        if (grid[this.index.row + 1][this.index.column].particle != null) {
            if (grid[this.index.row + 1][this.index.column + 1].particle === null && grid[this.index.row + 1][this.index.column - 1].particle != null) {
                this.index.row += 1;
                this.index.column += 1;
                this.x = grid[this.index.row][this.index.column].x;
                this.y = grid[this.index.row][this.index.column].y;
                grid[this.index.row][this.index.column].particle = this;
                grid[this.index.row - 1][this.index.column - 1].particle = null;
            }
            else if (grid[this.index.row + 1][this.index.column + 1].particle != null && grid[this.index.row + 1][this.index.column - 1].particle != null) {
                return;
            }
            else if (grid[this.index.row + 1][this.index.column + 1].particle != null && grid[this.index.row + 1][this.index.column - 1].particle === null) {
                this.index.row += 1;
                this.index.column -= 1;
                this.x = grid[this.index.row][this.index.column].x;
                this.y = grid[this.index.row][this.index.column].y;
                grid[this.index.row][this.index.column].particle = this;
                grid[this.index.row - 1][this.index.column + 1].particle = null;
            }
            else if (grid[this.index.row + 1][this.index.column + 1].particle === null && grid[this.index.row + 1][this.index.column - 1].particle === null) {
                this.pickRandomCorner();
            }
        }
    }

    sink() {
        if (grid[this.index.row + 1][this.index.column].particle != null) {
            if (grid[this.index.row + 1][this.index.column].particle instanceof Liquid) {
                let particleToSwap = particles[particles.indexOf(grid[this.index.row + 1][this.index.column].particle)];
                this.index.row += 1;
                this.y = grid[this.index.row][this.index.column].y;
                particleToSwap.index.row--;
                particleToSwap.y = grid[particleToSwap.index.row][particleToSwap.index.column].y;
                grid[particleToSwap.index.row][particleToSwap.index.column].particle = particleToSwap;
                grid[this.index.row][this.index.column].particle = this;
            }
        }
    }

    pickRandomCorner() {
        if (Math.random() > 0.5) {
            this.index.row += 1;
            this.index.column += 1;
            this.x = grid[this.index.row][this.index.column].x;
            this.y = grid[this.index.row][this.index.column].y;
            grid[this.index.row][this.index.column].particle = this;
            grid[this.index.row - 1][this.index.column - 1].particle = null;
        }
        else {
            this.index.row += 1;
            this.index.column -= 1;
            this.x = grid[this.index.row][this.index.column].x;
            this.y = grid[this.index.row][this.index.column].y;
            grid[this.index.row][this.index.column].particle = this;
            grid[this.index.row - 1][this.index.column + 1].particle = null;
        }
    }

    specificUpdate() {
        return;
    }
}