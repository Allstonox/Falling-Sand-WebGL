let grid = [];
let chosenParticle = 'Sand';
let particles = [];
let particleCount = 0;

let canvas = document.querySelector('canvas');
canvas.width = 374
canvas.height = 500;
let gl = canvas.getContext('webgl');

const columns = 187;
const rows = 250;

let vertShader;
let vertShaderSrc;
let fragShader;
let fragShaderSrc;
let shaderProgram;

function defineShaders() {
    // Create a vertex shader object
    vertShader = gl.createShader(gl.VERTEX_SHADER);
    vertShaderSrc = 'attribute vec2 pos; void main() { gl_Position = vec4(pos, 0.0, 1.0); }';
    gl.shaderSource(vertShader, vertShaderSrc);
    gl.compileShader(vertShader);

    let red = Math.random();
    let green = Math.random();
    let blue = Math.random();
    // Create a fragment shader object
    fragShader = gl.createShader(gl.FRAGMENT_SHADER);
    fragShaderSrc = 'precision mediump float; uniform vec4 color; void main() { gl_FragColor = color; }';
    gl.shaderSource(fragShader, fragShaderSrc);
    gl.compileShader(fragShader);

    // Create a shader program object
    shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertShader);
    gl.attachShader(shaderProgram, fragShader);
    gl.linkProgram(shaderProgram);
    gl.useProgram(shaderProgram);
}

function drawStuff(vertices, colorIndex) {
    //Setting color
    shaderProgram.color = gl.getUniformLocation(shaderProgram, 'color');
    gl.uniform4fv(shaderProgram.color, [colorArray[colorIndex].red, colorArray[colorIndex].green, colorArray[colorIndex].blue, 1]);

    // Define the geometry and store it in buffer objects
    let vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    // Get the attribute location
    let posAttrib = gl.getAttribLocation(shaderProgram, 'pos');

    // Point an attribute to the currently bound VBO
    gl.vertexAttribPointer(posAttrib, 2, gl.FLOAT, false, 0, 0);

    // Enable the attribute
    gl.enableVertexAttribArray(posAttrib);

    // Clear the canvas
    // gl.clearColor(0.0, 0.0, 0.0, 1.0);
    // gl.clear(gl.COLOR_BUFFER_BIT);

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
    for (let i = 0; i < bufferIndices; i++) {
        buffer[i] = [];
    }
    let square;
    for (let i = 0; i < particles.length; i++) {
        let convertedVertex = vertexConversion(particles[i].x, particles[i].y);
        square = drawSquare(convertedVertex, particles[i]);
        for (let j = 0; j < square.length; j++) {
            buffer[particles[i].bufferIndex].push(square[j]);
        }
    }
    let drawCount = 0;
    for (let i = 0; i < bufferIndices; i++) {
        if(buffer[i][0] != null) {
            drawStuff(buffer[i], i);
        }
    }
    if (particleCount != particles.length - 870) {
        particleCount = particles.length - 870;
        console.log(particleCount);
    }
    rect = canvas.getBoundingClientRect();
}
defineShaders();
createGrid();
animate();
draw();