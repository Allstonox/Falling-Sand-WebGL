class Fire extends Particle {
    constructor({ x, y, width, height, index, color = { red: 0.6666666666666666, green: 0.00392156862745098, blue: 0.00392156862745098 }, dynamic = false }) {
        super({ x, y, width, height, index, color, dynamic });

        this.lifeSpan = 10;
        this.bufferIndex = 5;
    }

    update() {
        this.lifeSpan--;
        if(this.lifeSpan > 0) {
            this.checkFlammable();
            this.rise();
            this.wander();
            this.checkGasProduction();
        }
        else {
            this.despawn();
        }
    }

    rise() {
        if (this.y + this.height > 1 && grid[this.index.row - 1][this.index.column].particle === null) {
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

    despawn() {
        particles.splice(particles.indexOf(grid[this.index.row][this.index.column].particle), 1);
        grid[this.index.row][this.index.column].particle = null;
    }

    checkFlammable() {
        for (let i = this.index.row - 1; i < this.index.row + 2; i++) {
            for (let j = this.index.column - 1; j < this.index.column + 2; j++) {
                if (grid[i][j].particle != null) {
                    if (grid[i][j].particle.flammable && this.readyToBurn(grid[i][j].particle.burnChance) && Math.random() > 0.5) {
                        particles.push(new Fire({
                            x: grid[i][j].x,
                            y: grid[i][j].y,
                            width: grid[i][j].width,
                            height: grid[i][j].height,
                            index: {
                                row: i,
                                column: j,
                            },
                        }));
                        particles.splice(particles.indexOf(grid[i][j].particle), 1);
                        grid[i][j].particle = particles[particles.length - 1];
                    }
                }
            }
        }
    }

    checkGasProduction() {
        for (let i = this.index.row - 1; i < this.index.row + 2; i++) {
            for (let j = this.index.column - 1; j < this.index.column + 2; j++) {
                if (grid[i][j].particle != null) {
                    if (grid[i][j].particle instanceof Liquid && grid[i][j].particle.producesGas && this.readyToBurn(grid[i][j].particle.vaporizeChance)) {
                        let newGas = eval(grid[i][j].particle.gasToProduce);
                        particles.push(new newGas({
                            x: grid[i][j].x,
                            y: grid[i][j].y,
                            width: grid[i][j].width,
                            height: grid[i][j].height,
                            index: {
                                row: i,
                                column: j,
                            },
                        }));
                        particles.splice(particles.indexOf(grid[i][j].particle), 1);
                        grid[i][j].particle = particles[particles.length - 1];
                    }
                }
            }
        }
    }

    readyToBurn(chance) {
        if (Math.random() < chance) {
            return true;
        }
        else return false;
    }
}
