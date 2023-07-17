class Fairy_Dust extends Particle {
    constructor({ x, y, width, height, index, color = { red: Math.random() - 0.1, green: Math.random() - 0.1, blue: Math.random() - 0.1 }, dynamic = false }) {
        super({ x, y, width, height, index, color, dynamic });

        this.lifeSpan = Math.random() * 4.2;
        this.branchRate = 1;

        if (Math.random() > 0.5) {
            this.canBranch = true;
        }
        else {
            this.canBranch = false;
        }
    }

    update() {
        this.lifeSpan--;
        if (this.lifeSpan > 0) {
            this.checkNeighbors();
            this.strike();
        }
        else {
            this.despawn();
        }
    }

    checkNeighbors() {
        for (let i = this.index.row - 1; i < this.index.row + 2; i++) {
            for (let j = this.index.column - 1; j < this.index.column + 2; j++) {
                if (grid[i][j].particle != null) {
                    if(!(grid[i][j].particle instanceof Fairy_Dust) && !(grid[i][j].particle instanceof Wall)) {
                        particles.push(new Fairy_Dust({
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

    strike() {
        if (this.canBranch && Math.random() < this.branchRate) {
            for (let i = this.index.row + 1; i < this.index.row + 2; i++) {
                for (let j = this.index.column - 1; j < this.index.column + 2; j++) {
                    if (grid[i][j].particle === null) {
                        particles.push(new Fairy_Dust({
                            x: grid[i][j].x,
                            y: grid[i][j].y,
                            width: grid[i][j].width,
                            height: grid[i][j].height,
                            index: {
                                row: i,
                                column: j,
                            },
                        }));
                        grid[i][j].particle = particles[particles.length - 1];
                    }
                }
            }
        }
        else return;
    }

    despawn() {
        particles.splice(particles.indexOf(grid[this.index.row][this.index.column].particle), 1);
        grid[this.index.row][this.index.column].particle = null;
    }
}