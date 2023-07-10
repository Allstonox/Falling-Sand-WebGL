let grid = [];
let chosenParticle = 'Sand';
let particles = [];
let particleCount = 0;

let canvas = document.querySelector('canvas');
canvas.width = Math.min(window.innerWidth, 750);
if(canvas.width % 2 > 0) {
    canvas.width += 1;
}
canvas.height = 600;
let gl = canvas.getContext('webgl');

const columns = canvas.width / 2;
const rows = canvas.height / 2;

let vertShader;
let vertShaderSrc;
let fragShader;
let fragShaderSrc;
let shaderProgram;

function defineShaders() {
    // Create a vertex shader object
    vertShader = gl.createShader(gl.VERTEX_SHADER);
    vertShaderSrc = 'attribute vec2 pos; attribute vec4 a_Color; varying vec4 v_Color; uniform vec2 u_resolution; void main() { vec2 zeroToOne = pos / u_resolution; vec2 zeroToTwo = zeroToOne * 2.0; vec2 clipSpace = (zeroToTwo - 1.0); gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1); v_Color = a_Color;}';
    gl.shaderSource(vertShader, vertShaderSrc);
    gl.compileShader(vertShader);

    let red = Math.random();
    let green = Math.random();
    let blue = Math.random();
    // Create a fragment shader object
    fragShader = gl.createShader(gl.FRAGMENT_SHADER);
    fragShaderSrc = 'precision mediump float; varying vec4 v_Color; void main() { gl_FragColor = v_Color; }';
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
    gl.drawArrays(gl.TRIANGLES, 0, vertices.length / 2);
}

function createGrid() {
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
    if(drawing) {
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
    if(drawing) {
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

//Play & Pause Events
const playButton = document.querySelector('.play-button');
const pauseButton = document.querySelector('.pause-button');
let playing = true; 

playButton.addEventListener('click', (event) => {
    playing = true;
    if (playButton.classList.contains('active')) playButton.classList.toggle('active');
    if (pauseButton.classList.contains('active')) pauseButton.classList.toggle('active');
    playButton.classList.toggle('active');
});
pauseButton.addEventListener('click', (event) => {
    playing = false;
    if (playButton.classList.contains('active')) playButton.classList.toggle('active');
    if (pauseButton.classList.contains('active')) pauseButton.classList.toggle('active');
    pauseButton.classList.toggle('active');
});

//Menu button events
const menu = document.querySelector('.menu');
const buttons = menu.querySelectorAll('button');

buttons.forEach(button => {
    button.addEventListener('click', (event) => {
        chosenParticle = button.innerHTML;
        buttons.forEach(button => {
            if (button.classList.contains('active')) button.classList.toggle('active');
        });
        event.target.classList.toggle('active');
    })
});

let brushSize = 'Medium';
const smallBrush = document.querySelector('#Small');
const mediumBrush = document.querySelector('#Medium');
const largeBrush = document.querySelector('#Large');

smallBrush.addEventListener('click', (event) => {
    brushSize = 'Small';
});
mediumBrush.addEventListener('click', (event) => {
    brushSize = 'Medium';
});
largeBrush.addEventListener('click', (event) => {
    brushSize = 'Large';
});

const lagSwitch = document.querySelector('#lag-switch');
let lagSwitchOn = false;
lagSwitch.addEventListener('click', (event) => {
    if(lagSwitch.checked) lagSwitchOn = true;
    else lagSwitchOn = false;
});


//Main loop
let bufferIndices = 50;
function animate() {
    const t0 = performance.now();
    window.requestAnimationFrame(animate);
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    for (let i = particles.length - 1; i > -1; i--) {
        if(particles[i] != null) {
            if(playing) {
                particles[i].update();
            }
        }
    }
    let buffer = [];
    let colorBuffer = [];
    let square;
    for (let i = 0; i < particles.length; i++) {
        let convertedVertex = vertexConversion(particles[i].x, particles[i].y);
        square = drawSquare(convertedVertex, particles[i]);
        for (let j = 0; j < square.length; j++) {
            buffer.push(square[j]);
            if(j % 2) {
                colorBuffer.push(particles[i].color.red, particles[i].color.green, particles[i].color.blue);
            }
        }
    }
    drawStuff(buffer, colorBuffer);
    // if (particleCount != particles.length - 870) {
    //     particleCount = particles.length - 870;
    //     console.log(particleCount);
    // }
    rect = canvas.getBoundingClientRect();
    const t1 = performance.now();
    // console.log(` ${1000 / (t1 - t0)} FPS`);
}
defineShaders();
createGrid();
animate();
draw();