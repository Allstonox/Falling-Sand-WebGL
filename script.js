let grid = [];
let chosenParticle = 'Sand';
let particles = [];
let particleCount = 0;

let canvas = document.querySelector('canvas');
canvas.width = Math.min(window.innerWidth, 750);
if (canvas.width % 2 > 0) {
    canvas.width += 1;
}
canvas.height = 600;
let gl = canvas.getContext('webgl');

const columns = canvas.width / 2;
const rows = canvas.height / 2;

let mode = 'Boxed';

let vertShader;
let vertShaderSrc;
let fragShader;
let fragShaderSrc;
let shaderProgram;

function defineShaders() {
    // Create a vertex shader object
    vertShader = gl.createShader(gl.VERTEX_SHADER);
    vertShaderSrc = 'attribute vec2 pos; attribute vec4 a_Color; varying vec4 v_Color; uniform vec2 u_resolution; void main() { vec2 zeroToOne = pos / u_resolution; vec2 zeroToTwo = zeroToOne * 2.0; vec2 clipSpace = (zeroToTwo - 1.0); gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1); gl_PointSize = 2.0; v_Color = a_Color;}';
    gl.shaderSource(vertShader, vertShaderSrc);
    gl.compileShader(vertShader);

    // Create a fragment shader object
    fragShader = gl.createShader(gl.FRAGMENT_SHADER);
    fragShaderSrc = 'precision lowp float; varying vec4 v_Color; void main() { gl_FragColor = v_Color; }';
    gl.shaderSource(fragShader, fragShaderSrc);
    gl.compileShader(fragShader);

    // Create a shader program object
    shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertShader);
    gl.attachShader(shaderProgram, fragShader);
    gl.linkProgram(shaderProgram);
    gl.useProgram(shaderProgram);
}

function drawStuff(vertices, colorData) {
    //Setting unvertex uniforms
    let resolutionUniformLocation = gl.getUniformLocation(shaderProgram, "u_resolution");

    //Setting color
    let colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colorData), gl.STATIC_DRAW);
    let a_Color = gl.getAttribLocation(shaderProgram, 'a_Color');
    gl.vertexAttribPointer(a_Color, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(a_Color);

    // Set uniforms; Define the geometry and store it in buffer objects
    let vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    // Get the attribute location
    let posAttrib = gl.getAttribLocation(shaderProgram, 'pos');

    // Point an attribute to the currently bound VBO
    gl.vertexAttribPointer(posAttrib, 2, gl.FLOAT, false, 0, 0);

    // Enable the attribute
    gl.enableVertexAttribArray(posAttrib);
    gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);

    // Draw the triangle
    gl.drawArrays(gl.POINTS, 0, vertices.length / 2);
}

function createGrid() {
    grid = [];
    particles = [];
    if(mode === 'Boxed') {
        for (var i = 0; i < rows; i++) {
            grid[i] = [];
            for (var j = 0; j < columns; j++) {
                grid[i][j] = new Grid(
                    {
                        x: j * (canvas.width / columns),
                        y: i * (canvas.height / rows),
                        width: canvas.width / columns,
                        height: canvas.height / rows,
                    });
                if (i === 0 || j === 0 || i === rows - 1 || j === columns - 1) {
                    particles.push(new Wall({
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
    else if(mode === 'Fall-Through') {
        for (var i = 0; i < rows; i++) {
            grid[i] = [];
            for (var j = 0; j < columns; j++) {
                grid[i][j] = new Grid(
                    {
                        x: j * (canvas.width / columns),
                        y: i * (canvas.height / rows),
                        width: canvas.width / columns,
                        height: canvas.height / rows,
                    });
                if (i === 0 || j === 0 || j === columns - 1) {
                    particles.push(new Wall({
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
                if (i === rows - 1 && grid[i][j].particle === null) {
                    particles.push(new Wall_Sink({
                        x: grid[i][j].x,
                        y: grid[i][j].y,
                        width: grid[i][j].width,
                        height: grid[i][j].height,
                        index: {
                            row: i,
                            column: j,
                        },
                        color: {
                            red: -1,
                            green: -1,
                            blue: -1,
                        }
                    }));
                    grid[i][j].particle = particles[particles.length - 1];
                }
            }
        }
    }
}

//Detecting touch/mouse events

let rect = canvas.getBoundingClientRect();
let drawing = false;
let currentX;
let currentY;

canvas.addEventListener("mousedown", (e) => {
    currentX = e.x - rect.left;
    currentY = e.y - rect.top;
    drawing = true;
});
canvas.addEventListener("mousemove", (e) => {
    let newX = e.x - rect.left;
    let newY = e.y - rect.top;
    if (drawing) {
        if (newX != currentX || newY != currentY) {
            drawLine(currentX, currentY, newX, newY);
        }
    }
    currentX = newX;
    currentY = newY;
});
canvas.addEventListener('mouseup', () => {
    drawing = false;
});

canvas.addEventListener("touchstart", (e) => {
    currentX = e.touches[0].clientX - rect.left;
    currentY = e.touches[0].clientY - rect.top;
    drawing = true;
});
canvas.addEventListener("touchmove", (e) => {
    e.preventDefault();
    let newX = e.touches[0].clientX - rect.left;
    let newY = e.touches[0].clientY - rect.top;
    if (drawing) {
        if (newX != currentX || newY != currentY) {
            drawLine(currentX, currentY, newX, newY);
        }
    }
    currentX = newX;
    currentY = newY;
});
canvas.addEventListener('touchend', (e) => {
    drawing = false;
});

function draw() {
    window.requestAnimationFrame(draw);
    if (drawing) {
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < columns; j++) {
                grid[i][j].checkClicked(currentX, currentY);
            }
        }
    }
}

// Play & Pause Events
const playButton = document.querySelector('.play-button');
// const pauseButton = document.querySelector('.pause-button');
let playing = true;

playButton.addEventListener('click', (event) => {
    if(playing === false) {
        playing = true;
        playButton.innerHTML = '<ion-icon name="pause-outline"></ion-icon>'
    }
    else if(playing === true) {
        playing = false;
        playButton.innerHTML = '<ion-icon name="play-outline"></ion-icon>'
    }
});

// Item menu button events
const itemMenuIcon = document.querySelector('.item-menu-icon');
const itemMenu = document.querySelector('#item-menu');
const buttons = itemMenu.querySelectorAll('button');

itemMenuIcon.addEventListener('click', () => {
    itemMenu.classList.toggle('visible');
})

buttons.forEach(button => {
    button.addEventListener('click', (event) => {
        chosenParticle = button.innerHTML;
        buttons.forEach(button => {
            if (button.classList.contains('active')) button.classList.toggle('active');
        });
        event.target.classList.toggle('active');
        itemMenu.classList.toggle('visible');
    })
});

const brushMenuIcon = document.querySelector('.brush-menu-icon');
const brushMenu = document.querySelector('.brush-menu');
brushMenuIcon.addEventListener('click', () => {
    brushMenu.classList.toggle('visible');
});

let brushSize = 'Medium';
const smallBrush = document.querySelector('#Small');
const mediumBrush = document.querySelector('#Medium');
const largeBrush = document.querySelector('#Large');

smallBrush.addEventListener('click', (event) => {
    brushSize = 'Small';
    brushMenu.classList.toggle('visible');
});
mediumBrush.addEventListener('click', (event) => {
    brushSize = 'Medium';
    brushMenu.classList.toggle('visible');
});
largeBrush.addEventListener('click', (event) => {
    brushSize = 'Large';
    brushMenu.classList.toggle('visible');
});

//Settings Menu
const settingsMenuIcon = document.querySelector('.settings-menu-icon');
const settingsMenu = document.querySelector('#settings-menu');
const boxedCheckbox = document.querySelector('#Boxed');
const fallThroughCheckbox = document.querySelector('#Fall-Through');

settingsMenuIcon.addEventListener('click', (event) => {
    settingsMenu.classList.toggle('visible');
})

boxedCheckbox.addEventListener('click', (event) => {
    mode = "Boxed";
    createGrid();
    settingsMenu.classList.toggle('visible');
})
fallThroughCheckbox.addEventListener('click', (event) => {
    mode = "Fall-Through";
    createGrid();
    settingsMenu.classList.toggle('visible');
})


//Main loop
let bufferIndices = 50;
function animate() {
        // const t0 = performance.now();
        window.requestAnimationFrame(animate);
        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        for (let i = particles.length - 1; i > -1; i--) {
            if (particles[i] != null) {
                if (playing) {
                    particles[i].update();
                }
            }
        }
        let buffer = [];
        let colorBuffer = [];
        for (let i = 0; i < particles.length; i++) {
            buffer.push(particles[i].x, particles[i].y);
            colorBuffer.push(particles[i].color.red, particles[i].color.green, particles[i].color.blue);
        }
        drawStuff(buffer, colorBuffer);
        // if (particleCount != particles.length) {
        //     particleCount = particles.length;
        //     console.log(particleCount);
        // }
        // const t1 = performance.now();
        // console.log(` ${1000 / (t1 - t0)} FPS`);
        rect = canvas.getBoundingClientRect();
}
defineShaders();
createGrid();
animate();
draw();