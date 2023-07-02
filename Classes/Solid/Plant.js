class Plant extends Solid {
    constructor({ x, y, width, height, index, color = {red: 0.00392156862745098, green: 0.3137254901960784, blue: 0.00392156862745098}, dynamic = false, flammable = 'true' }) {
        super({ x, y, width, height, index, color, dynamic, flammable });

        this.readyToGrow = false;
        this.burnChance = 0.5;
        this.bufferIndex = 7;
    }

    specificUpdate() {
        this.checkWater();
        this.germinate();
    }

    checkWater() {
        for (let i = this.index.row - 1; i < this.index.row + 2; i++) {
            for (let j = this.index.column - 1; j < this.index.column + 2; j++) {
                if (grid[i][j].particle != null) {
                    if (grid[i][j].particle instanceof Water && this.readyToGrow) {
                        particles.push(new Plant({
                            x: grid[i][j].x,
                            y: grid[i][j].y,
                            width: grid[i][j].width,
                            height: grid[i][j].height,
                            index: {
                                row: grid[i][j].y / (canvas.height / rows),
                                column: grid[i][j].x / (canvas.width / columns),
                            },
                        }));    
                        particles.splice(particles.indexOf(grid[i][j].particle), 1);   
                        grid[i][j].particle = particles[particles.length - 1];       
                    }
                }
            }
        }
    }

    germinate() {
        if(Math.random() > 0.9) {
            this.readyToGrow = true;
        }
    }
}