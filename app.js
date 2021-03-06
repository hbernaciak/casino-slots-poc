// init machine
var Machine = function () {
    this.run = false;
};

Machine.prototype.setRun = function (run) {
    this.run = run;
};

Machine.prototype.getRun = function () {
    return this.run;
};

var machine = new Machine();

var fruitsPerRoll = 4;
var fruitsPerRow = 4;

// create an new instance of a pixi stage
var stage = new PIXI.Stage(0xFFFFFF);

// create a renderer instance.
var renderer = PIXI.autoDetectRenderer(400, 300);
renderer.backgroundColor = 0XFFFFFF;

// add the renderer view element to the DOM
document.body.appendChild(renderer.view);


// create a texture from an image path
var texture = {};
texture[0] = PIXI.Texture.fromImage("img/banan.png");
texture[1] = PIXI.Texture.fromImage("img/banan1.png");
texture[2] = PIXI.Texture.fromImage("img/banan2.png");
texture[3] = PIXI.Texture.fromImage("img/banan3.png");

// create a new Sprite using the texture


//    bunny.on('touchstart', onDown);

var fruitCollection = [];
var row = 0;
var column = 0;
for (var i = 0; i < (fruitsPerRoll * fruitsPerRow); i++) {
    if (i % fruitsPerRow == 0 && i > 0) {
        row++;
        column = 0;
    }
    var fruit = new PIXI.Sprite(texture[row]);
    // center the sprites anchor point
    fruit.anchor.x = 0.5;
    fruit.anchor.y = 0.5;

    // move the sprite machine position
    fruit.position.x = 42 + column + (column * 102);

    fruit.position.y = 30 + (row * 90);

    stage.addChild(fruit);
    fruitCollection[i] = fruit;
    column++;
}

console.log(fruitCollection);
// create a texture from an image path
var machineBg = PIXI.Sprite.fromImage("img/machine_bg.png");
stage.addChild(machineBg);

// control button labels
var style = {
    font: 'bold italic 36px Arial',
    fill: '#FFFFFF',
    stroke: '#4a1850',
    strokeThickness: 5,
    dropShadow: true,
    dropShadowColor: '#000000',
    dropShadowAngle: Math.PI / 6,
    dropShadowDistance: 6,
    wordWrap: true,
    wordWrapWidth: 440
};

var startText = new PIXI.Text('START', style);
startText.x = 230;
startText.y = 225;

stage.addChild(startText);

var stopText = new PIXI.Text('STOP', style);
stopText.x = 45;
stopText.y = 225;

stage.addChild(stopText);

// add events
startText.interactive = true;
startText.on('mousedown', onDown);
startText.on('touch', onDown);
stopText.interactive = true;
stopText.on('mousedown', onDown);
stopText.on('touch', onDown);

// start animating
requestAnimationFrame(animate);

function onDown(eventData) {
    if (machine.getRun()) {
        stopMachine();
    } else {
        console.log('machine start = true');
        machine.setRun(true);
        startMachine();
    }
}

function animate() {

    requestAnimationFrame(animate);
    // render the stage
    renderer.render(stage);
}

function startMachine() {
    if (machine.getRun()) {
        requestAnimationFrame(startMachine);
        var column = 0;
        for (var i = 0; i < (fruitsPerRoll * fruitsPerRow); i++) {
            if (fruitCollection[i].position.y > 300) {
                fruitCollection[i].position.y = -50 - column;
            } else {
                if (i % fruitsPerRow == 0 && i > 0) {
                    column = 0;
                }
                fruitCollection[i].position.y += 5 + column;
                column++;
            }
        }
    }
}
function stopMachine() {
    console.log('machine start = false');
    machine.setRun(false);
}