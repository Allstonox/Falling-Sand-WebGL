class Grid {
    constructor({ x, y, width, height }) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = 'black';
        this.particle = null;
    }

    checkClicked(x, y) {
        if (!(this.particle instanceof Wall) && x >= this.x && x <= this.x + this.width && y >= this.y && y <= this.y + this.height) {
            if (brushSize === 'Small') {
                let rowChosen = Math.floor(this.y / (canvas.height / rows));
                let columnChosen = Math.floor(this.x / (canvas.width / columns));
                this.createParticles(rowChosen, columnChosen);
            }
            else if (brushSize === 'Medium') {
                let rowChosen = Math.floor(this.y / (canvas.height / rows));
                let columnChosen = Math.floor(this.x / (canvas.width / columns));
                for (let i = rowChosen - 1; i < rowChosen + 2; i++) {
                    for (let j = columnChosen - 1; j < columnChosen + 2; j++) {
                        this.createParticles(i, j);
                    }
                }
            }
            else if (brushSize === 'Large') {
                let rowChosen = Math.floor(this.y / (canvas.height / rows));
                let columnChosen = Math.floor(this.x / (canvas.width / columns));
                for (let i = rowChosen - 3; i < rowChosen + 4; i++) {
                    for (let j = columnChosen - 3; j < columnChosen + 4; j++) {
                        if(i < rows - 1 && i > -1 && j < columns - 1 && j > -1) {
                            this.createParticles(i, j);
                        }
                    }
                }
            }
        }

    }

    createParticles(theRow, theColumn) {
        if (!(grid[theRow][theColumn].particle instanceof Wall)) {
            switch (chosenParticle) {
                case 'Sand':
                    particles.push(new Sand({
                        x: grid[theRow][theColumn].x,
                        y: grid[theRow][theColumn].y,
                        width: grid[theRow][theColumn].width,
                        height: grid[theRow][theColumn].height,
                        index: {
                            row: theRow,
                            column: theColumn,
                        },
                    }));
                    break;
                case 'Water':
                    particles.push(new Water({
                        x: grid[theRow][theColumn].x,
                        y: grid[theRow][theColumn].y,
                        width: grid[theRow][theColumn].width,
                        height: grid[theRow][theColumn].height,
                        index: {
                            row: theRow,
                            column: theColumn,
                        },
                    }));
                    break;
                case 'Concrete':
                    particles.push(new Concrete({
                        x: grid[theRow][theColumn].x,
                        y: grid[theRow][theColumn].y,
                        width: grid[theRow][theColumn].width,
                        height: grid[theRow][theColumn].height,
                        index: {
                            row: theRow,
                            column: theColumn,
                        },
                    }));
                    break;
                case 'Oil':
                    particles.push(new Oil({
                        x: grid[theRow][theColumn].x,
                        y: grid[theRow][theColumn].y,
                        width: grid[theRow][theColumn].width,
                        height: grid[theRow][theColumn].height,
                        index: {
                            row: theRow,
                            column: theColumn,
                        },
                    }));
                    break;
                case 'Fire':
                    particles.push(new Fire({
                        x: grid[theRow][theColumn].x,
                        y: grid[theRow][theColumn].y,
                        width: grid[theRow][theColumn].width,
                        height: grid[theRow][theColumn].height,
                        index: {
                            row: theRow,
                            column: theColumn,
                        },
                    }));
                    break;
                case 'Fuse':
                    particles.push(new Fuse({
                        x: grid[theRow][theColumn].x,
                        y: grid[theRow][theColumn].y,
                        width: grid[theRow][theColumn].width,
                        height: grid[theRow][theColumn].height,
                        index: {
                            row: theRow,
                            column: theColumn,
                        },
                    }));
                    break;
                case 'Plant':
                    particles.push(new Plant({
                        x: grid[theRow][theColumn].x,
                        y: grid[theRow][theColumn].y,
                        width: grid[theRow][theColumn].width,
                        height: grid[theRow][theColumn].height,
                        index: {
                            row: theRow,
                            column: theColumn,
                        },
                    }));
                    break;
                case 'Sink':
                    particles.push(new Sink({
                        x: grid[theRow][theColumn].x,
                        y: grid[theRow][theColumn].y,
                        width: grid[theRow][theColumn].width,
                        height: grid[theRow][theColumn].height,
                        index: {
                            row: theRow,
                            column: theColumn,
                        },
                    }));
                    break;
                case 'Acid':
                    particles.push(new Acid({
                        x: grid[theRow][theColumn].x,
                        y: grid[theRow][theColumn].y,
                        width: grid[theRow][theColumn].width,
                        height: grid[theRow][theColumn].height,
                        index: {
                            row: theRow,
                            column: theColumn,
                        },
                    }));
                    break;
                case 'Steam':
                    particles.push(new Steam({
                        x: grid[theRow][theColumn].x,
                        y: grid[theRow][theColumn].y,
                        width: grid[theRow][theColumn].width,
                        height: grid[theRow][theColumn].height,
                        index: {
                            row: theRow,
                            column: theColumn,
                        },
                    }));
                    break;
                case 'Gunpowder':
                    particles.push(new Gunpowder({
                        x: grid[theRow][theColumn].x,
                        y: grid[theRow][theColumn].y,
                        width: grid[theRow][theColumn].width,
                        height: grid[theRow][theColumn].height,
                        index: {
                            row: theRow,
                            column: theColumn,
                        },
                    }));
                    break;
                case 'Spout':
                    particles.push(new Spout({
                        x: grid[theRow][theColumn].x,
                        y: grid[theRow][theColumn].y,
                        width: grid[theRow][theColumn].width,
                        height: grid[theRow][theColumn].height,
                        index: {
                            row: theRow,
                            column: theColumn,
                        },
                    }));
                    break;
                case 'Toxin':
                    particles.push(new Toxin({
                        x: grid[theRow][theColumn].x,
                        y: grid[theRow][theColumn].y,
                        width: grid[theRow][theColumn].width,
                        height: grid[theRow][theColumn].height,
                        index: {
                            row: theRow,
                            column: theColumn,
                        },
                    }));
                    break;
                case 'Torch':
                    particles.push(new Torch({
                        x: grid[theRow][theColumn].x,
                        y: grid[theRow][theColumn].y,
                        width: grid[theRow][theColumn].width,
                        height: grid[theRow][theColumn].height,
                        index: {
                            row: theRow,
                            column: theColumn,
                        },
                    }));
                    break;
                case 'Amethyst':
                    particles.push(new Amethyst({
                        x: grid[theRow][theColumn].x,
                        y: grid[theRow][theColumn].y,
                        width: grid[theRow][theColumn].width,
                        height: grid[theRow][theColumn].height,
                        index: {
                            row: theRow,
                            column: theColumn,
                        },
                    }));
                    break;
                case 'Lava':
                    particles.push(new Lava({
                        x: grid[theRow][theColumn].x,
                        y: grid[theRow][theColumn].y,
                        width: grid[theRow][theColumn].width,
                        height: grid[theRow][theColumn].height,
                        index: {
                            row: theRow,
                            column: theColumn,
                        },
                    }));
                    break;
            }
            if (!(grid[theRow][theColumn].particle instanceof Wall) && grid[theRow][theColumn].particle != null) {
                particles.splice(particles.indexOf(grid[theRow][theColumn].particle), 1);
                grid[theRow][theColumn].particle = particles[particles.length - 1];
            }
            else grid[theRow][theColumn].particle = particles[particles.length - 1];
        }
    }
}