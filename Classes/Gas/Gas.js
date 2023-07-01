class Gas extends Particle {
    constructor({ x, y, width, height, index, color, flammable }) {
        super({ x, y, width, height, index, color, flammable });

        this.directionPicked = null;
        if(Math.random() > 0.5) this.directionPicked = 'right';
        else this.directionPicked = 'left';
    }

    update() {
        if (this.dynamic) {
            if (this.emptyAbove()) {
                this.rise();
                this.wander();
            }
            else if (!this.emptyAbove()) {
                this.interact();
            }
        }
        this.specificUpdate();
    }

    rise() {
        if (this.y + this.height > 1) {
            this.y -= this.height;
            this.index.row--;
            grid[this.index.row + 1][this.index.column].particle = null;
            grid[this.index.row][this.index.column].particle = this;
        }
    }

    wander() {
        if (Math.random() > 0.6) {
            if (grid[this.index.row][this.index.column + 1].particle === null) {
                this.index.column++;
                this.x = grid[this.index.row][this.index.column].x;
                grid[this.index.row][this.index.column - 1].particle = null;
                grid[this.index.row][this.index.column].particle = this;
            }
        }
        else if (Math.random() < 0.6) {
            if (grid[this.index.row][this.index.column - 1].particle === null) {
                this.index.column--;
                this.x = grid[this.index.row][this.index.column].x;
                grid[this.index.row][this.index.column + 1].particle = null;
                grid[this.index.row][this.index.column].particle = this;
            }
        }
    }

    emptyAbove() {
        if (this.index.row > 1) {
            if (grid[this.index.row - 1][this.index.column].particle === null) {
                return true;
            }
            else if (grid[this.index.row - 1][this.index.column].particle instanceof Solid) {
                return false;
            }
            else if (grid[this.index.row - 1][this.index.column].particle instanceof Liquid) {
                this.float()
            }
        }
    }

    float() {
        let particleToSwap = particles[particles.indexOf(grid[this.index.row - 1][this.index.column].particle)];
        this.index.row -= 1;
        this.y = grid[this.index.row][this.index.column].y;
        particleToSwap.index.row++;
        particleToSwap.y = grid[particleToSwap.index.row][particleToSwap.index.column].y;
        grid[particleToSwap.index.row][particleToSwap.index.column].particle = particleToSwap;
        grid[this.index.row][this.index.column].particle = this;
    }

    interact() {
        if (grid[this.index.row - 1][this.index.column].particle != null) {
            if (grid[this.index.row - 1][this.index.column + 1].particle === null && grid[this.index.row - 1][this.index.column - 1].particle != null) {
                this.index.row -= 1;
                this.index.column += 1;
                this.x = grid[this.index.row][this.index.column].x;
                this.y = grid[this.index.row][this.index.column].y;
                grid[this.index.row][this.index.column].particle = this;
                grid[this.index.row + 1][this.index.column - 1].particle = null;
            }
            else if (grid[this.index.row - 1][this.index.column + 1].particle != null && grid[this.index.row - 1][this.index.column - 1].particle === null) {
                this.index.row -= 1;
                this.index.column -= 1;
                this.x = grid[this.index.row][this.index.column].x;
                this.y = grid[this.index.row][this.index.column].y;
                grid[this.index.row][this.index.column].particle = this;
                grid[this.index.row + 1][this.index.column + 1].particle = null;
            }
            else if (grid[this.index.row - 1][this.index.column + 1].particle === null && grid[this.index.row - 1][this.index.column - 1].particle === null) {
                if (Math.random() > 0.5) {
                    this.index.row -= 1;
                    this.index.column += 1;
                    this.x = grid[this.index.row][this.index.column].x;
                    this.y = grid[this.index.row][this.index.column].y;
                    grid[this.index.row][this.index.column].particle = this;
                    grid[this.index.row + 1][this.index.column - 1].particle = null;
                }
                else {
                    this.index.row -= 1;
                    this.index.column -= 1;
                    this.x = grid[this.index.row][this.index.column].x;
                    this.y = grid[this.index.row][this.index.column].y;
                    grid[this.index.row][this.index.column].particle = this;
                    grid[this.index.row + 1][this.index.column + 1].particle = null;
                }
            }
            else if (grid[this.index.row - 1][this.index.column + 1].particle != null && grid[this.index.row - 1][this.index.column - 1].particle != null) {
                if (this.directionPicked === 'right') {
                    if (grid[this.index.row][this.index.column + 1].particle === null) {
                        this.index.column += 1;
                        this.x = grid[this.index.row][this.index.column].x;
                        grid[this.index.row][this.index.column].particle = this;
                        grid[this.index.row][this.index.column - 1].particle = null;
                    }
                    else if (grid[this.index.row][this.index.column + 1].particle != null && grid[this.index.row][this.index.column - 1].particle === null) {
                        this.directionPicked = 'left';
                    }
                }
                else if (this.directionPicked === 'left') {
                    if (grid[this.index.row][this.index.column - 1].particle === null) {
                        this.index.column -= 1;
                        this.x = grid[this.index.row][this.index.column].x;
                        grid[this.index.row][this.index.column].particle = this;
                        grid[this.index.row][this.index.column + 1].particle = null;
                    }
                    else if (grid[this.index.row][this.index.column - 1].particle != null && grid[this.index.row][this.index.column + 1].particle === null) {
                        this.directionPicked = 'right';
                    }
                }
            }
        }
    }

    specificUpdate() {
        return;
    }
}