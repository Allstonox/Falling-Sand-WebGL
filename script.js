let grid = [];
let chosenParticle = 'Sand';
let particles = [];
let particleCount = 0;

let canvas = document.querySelector('canvas');
canvas.width = 374
canvas.height = 400;
let gl = canvas.getContext('webgl');

const columns = 187;
const rows = 200;

let vertShader;
let vertShaderSrc;
let fragShader;
let fragShaderSrc;
let shaderProgram;

function defineShaders() {
    // Create a vertex shader object
    vertShader = gl.createShader(gl.VERTEX_SHADER);
    vertShaderSrc = 'attribute vec4 a_Position; attribute vec4 a_Color; varying vec4 v_Color; void main() { gl_Position = a_Position; v_Color = a_Color;}';
    gl.shaderSource(vertShader, vertShaderSrc);
    gl.compileShader(vertShader);

    // Create a fragment shader object
    fragShader = gl.createShader(gl.FRAGMENT_SHADER);
    fragShaderSrc = 'precision mediump float; varying vec4 v_Color; void main() { gl_FragColor = v_Color;}';
    gl.shaderSource(fragShader, fragShaderSrc);
    gl.compileShader(fragShader);

    // Create a shader program object
    shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertShader);
    gl.attachShader(shaderProgram, fragShader);
    gl.linkProgram(shaderProgram);
    gl.useProgram(shaderProgram);
}

function drawStuff(vertexData, colorData) {
    var vertices = new Float32Array(vertexData);
    var color = new Float32Array(colorData);
    // var vertices = new Float32Array([-0.8, -0.8, 0.8, -0.8, 0.0, 0.8]);
    // var color = new Float32Array([  1.0, 0.0, 1.0, 
    //                                 1.0, 0.0, 1.0,
    //                                 1.0, 0.0, 1.0
    //                             ]);

    var buffer_object = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer_object);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    var a_Position = gl.getAttribLocation(shaderProgram, 'a_Position');
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(a_Position);

    var color_object = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, color_object);
    gl.bufferData(gl.ARRAY_BUFFER, color, gl.STATIC_DRAW);
    var a_Color = gl.getAttribLocation(shaderProgram, 'a_Color');
    gl.vertexAttribPointer(a_Color, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(a_Color);

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
                        row: grid[i][j].y / (canvas.height / rows),
                        column: grid[i][j].x / (canvas.width / columns),
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
    if (lagSwitch.checked) lagSwitchOn = true;
    else lagSwitchOn = false;
});


//Main loop
let bufferIndices = 50;
function animate() {
    window.requestAnimationFrame(animate);
    // gl.viewport(0, 0, canvas.width, canvas.height);
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
        let convertedVertex = vertexConversion(particles[i].x, particles[i].y);
        let square = drawSquare(convertedVertex, particles[i]);
        for (let j = 0; j < square.length; j++) {
            buffer.push(square[j].x, square[j].y);
            colorBuffer.push(particles[i].color.red, particles[i].color.green, particles[i].color.blue);
        }
    }
    drawStuff(buffer, colorBuffer);
    if (particleCount != particles.length - 870) {
        particleCount = particles.length - 870;
        console.log(particleCount);
    }
    rect = canvas.getBoundingClientRect();
}
defineShaders();
createGrid();
draw();
animate();
