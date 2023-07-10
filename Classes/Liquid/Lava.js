class Lava extends Liquid {
    constructor({ x, y, width, height, index, color = {red: 0.6666666666666666, green: 0, blue: 0} }) {
        super({ x, y, width, height, index, color });
        this.bufferIndex = 16;
    }

    specificUpdate() {
        this.checkFlammable();
        this.checkGasProduction();
        this.checkWater();
    }

    checkWater() {
        for (let i = this.index.row - 1; i < this.index.row + 2; i++) {
            for (let j = this.index.column - 1; j < this.index.column + 2; j++) {
                if (grid[i][j].particle != null) {
                    if (grid[i][j].particle instanceof Water) {
                        particles.push(new Concrete({
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

    checkFlammable() {
        for (let i = this.index.row - 1; i < this.index.row + 2; i++) {
            for (let j = this.index.column - 1; j < this.index.column + 2; j++) {
                if (grid[i][j].particle != null) {
                    if (grid[i][j].particle.flammable && this.readyToBurn(grid[i][j].particle.burnChance)) {
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