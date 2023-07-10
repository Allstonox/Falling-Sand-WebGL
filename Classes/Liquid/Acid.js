class Acid extends Liquid {
    constructor({ x, y, width, height, index, color = {red: 0, green: 0.6666666666666666, blue: 0}, producesGas = true }) {
        super({ x, y, width, height, index, color, producesGas });

        this.gasToProduce = 'Toxin';
        this.vaporizeChance = 0.1;
        this.bufferIndex = 9;
    }

    specificUpdate() {
        this.checkDissolvable();
    }

    checkDissolvable() {
        for (let i = this.index.row - 1; i < this.index.row + 2; i++) {
            for (let j = this.index.column - 1; j < this.index.column + 2; j++) {
                if (grid[i][j].particle != null) {
                    if (grid[i][j].particle.dissolvable) { 
                        if(Math.random() > grid[i][j].particle.dissolveRate) {
                            particles.push(new Toxin({
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
    }

}