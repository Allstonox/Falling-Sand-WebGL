class Lightning extends Particle {
    constructor({ x, y, width, height, index, color = { red: 0.8, green: 0.6, blue: 0 }, dynamic = false }) {
        super({ x, y, width, height, index, color, dynamic });

        this.lifeSpan = Math.random() * 100;
        this.branchRate = 1;

        if (Math.random() > 0.62) {
            this.canBranch = true;
        }
        else {
            this.canBranch = false;
        }
    }

    update() {
        this.lifeSpan--;
        if (grid[this.index.row + 1][this.index.column].particle === null) {
            this.strike();
        }
        if(this.lifeSpan <= 0) {
            this.despawn();
        }
    }

    strike() {
        if (this.canBranch && this.lifeSpan > 5) {
            for (let i = this.index.row + 1; i < this.index.row + 2; i++) {
                for (let j = this.index.column - 1; j < this.index.column + 2; j++) {
                    if (grid[i][j].particle === null) {
                        particles.push(new Lightning({
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