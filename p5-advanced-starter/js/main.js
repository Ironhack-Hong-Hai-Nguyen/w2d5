const game = new Game();

// here we preload assets - in that case the images
function preload() {
    game.preload();
}
function setup() {
    createCanvas(1000, 600)
    // here we have to setup some things so they are ready when p5 starts
    // e.g. the width variable in the player - that is the width of the canvas
    game.setup();
}
function draw() {
    game.draw();
}
function keyPressed() {
    // if the spacebar is pressed
    if (keyCode === 32) {
        game.player.jump();
    }
    console.log(keyCode);
}