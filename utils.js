function drawLine(currentX, currentY, newX, newY) {
    let xChange = Math.abs(newX - currentX);
    let yChange = Math.abs(newY - currentY);
    let slope = 0;
    if(yChange === 0 & xChange != 0) {
        slope = 0;
    }
    else if(xChange === 0 & yChange != 0) {
        if (currentY >= newY) {
            for (let i = currentY; i >= newY; i--) {
                let calculatedX = currentX;
                let calculatedY = i;
                for (let q = 0; q < rows; q++) {
                    for (let j = 0; j < columns; j++) {
                        grid[q][j].checkClicked(calculatedX, calculatedY);
                    }
                }
            }
        }
        else if (currentY < newY) {
            for (let i = currentY; i < newY; i++) {
                let calculatedX = currentX;
                let calculatedY = i;
                for (let q = 0; q < rows; q++) {
                    for (let j = 0; j < columns; j++) {
                        grid[q][j].checkClicked(calculatedX, calculatedY);
                    }
                }
            }
        }
        return;
    }
    else slope = (newY - currentY) / (newX - currentX);

    let yInt = -((slope * currentX) - currentY);

    if (xChange >= yChange) {
        if (currentX >= newX) {
            for (let i = currentX; i >= newX; i--) {
                let calculatedX = i;
                let calculatedY = (slope * i + yInt);
                for (let q = 0; q < rows; q++) {
                    for (let j = 0; j < columns; j++) {
                        grid[q][j].checkClicked(calculatedX, calculatedY);
                    }
                }
            }
            return;
        }
        else if (currentX < newX) {
            for (let i = currentX; i < newX; i++) {
                let calculatedX = i;
                let calculatedY = (slope * i + yInt);
                for (let q = 0; q < rows; q++) {
                    for (let j = 0; j < columns; j++) {
                        grid[q][j].checkClicked(calculatedX, calculatedY);
                    }
                }
            }
            return;
        }
    }
    else if (yChange > xChange) {
        if (currentY >= newY) {
            for (let i = currentY; i >= newY; i--) {
                let calculatedX = (i - yInt) / slope;
                let calculatedY = i;
                for (let q = 0; q < rows; q++) {
                    for (let j = 0; j < columns; j++) {
                        grid[q][j].checkClicked(calculatedX, calculatedY);
                    }
                }
            }
            return;
        }
        else if (currentY < newY) {
            for (let i = currentY; i < newY; i++) {
                let calculatedX = (i - yInt) / slope;
                let calculatedY = i;
                for (let q = 0; q < rows; q++) {
                    for (let j = 0; j < columns; j++) {
                        grid[q][j].checkClicked(calculatedX, calculatedY);
                    }
                }
            }
            return;
        }
    }
    else if(xChange === 0 & yChange === 0) return;
}

function vertexConversion(x, y) {
    // let newX = x / canvas.width;
    // let newY = y / canvas.height; 
    let newX = x / (canvas.width / 2) - 1;
    let newY = -1 * (y / (canvas.height / 2) - 1);
    let result = {x: newX, y: newY}
    return result;
}

function drawSquare(convertedVertex, object) {
    let newHeight = object.height / canvas.height;
    let newWidth = object.width / canvas.width;
    let square = [  {x: convertedVertex.x, y: convertedVertex.y}, 
                    {x: convertedVertex.x + newWidth, y: convertedVertex.y},
                    {x: convertedVertex.x + newWidth, y: convertedVertex.y + newHeight},
                    {x: convertedVertex.x + newWidth, y: convertedVertex.y + newHeight},
                    {x: convertedVertex.x, y: convertedVertex.y + newHeight},
                    {x: convertedVertex.x, y: convertedVertex.y}];
    return square;
}

let colorArray = [
    {particle: Wall, red: 0, green: 0, blue: 0},
    {particle: Sand, red: 0.7215686274509804, green: 0.5254901960784314, blue: 0.043137254901960784},
    {particle: Water, red: 0.12549019607843137, green: 0.6980392156862745, blue: 0.6666666666666666},
    {particle: Concrete, red: 0.35294117647058826, green: 0.35294117647058826, blue: 0.35294117647058826},
    {particle: Oil, red: 0.13725490196078433, green: 0, blue: 0},
    {particle: Fire, red: 0.6666666666666666, green: 0.00392156862745098, blue: 0.00392156862745098},
    {particle: Fuse, red: 0.5450980392156862, green: 0.27058823529411763, blue: 0.07450980392156863},
    {particle: Plant, red: 0.00392156862745098, green: 0.3137254901960784, blue: 0.00392156862745098},
    {particle: Sink, red: 0.7529411764705882, green: 0.7529411764705882, blue: 0.7529411764705882},
    {particle: Acid, red: 0, green: 0.6666666666666666, blue: 0},
    {particle: Steam, red: 0.5882352941176471, green: 0.5882352941176471, blue: 0.5882352941176471},
    {particle: Gunpowder, red: 0.17647058823529413, green: 0.1568627450980392, blue: 0.1568627450980392},
    {particle: Spout, red: 0.6784313725490196, green: 0.8470588235294118, blue: 0.9019607843137255},
    {particle: Toxin, red: 0.19607843137254902, green: 0.47058823529411764, blue: 0.19607843137254902},
    {particle: Torch, red: 0.3137254901960784, green: 0.11764705882352941, blue: 0.11764705882352941},
    {particle: Amethyst, red: 0.39215686274509803, green: 0, blue: 0.39215686274509803},
    {particle: Lava, red: 0.6666666666666666, green: 0, blue: 0},
];