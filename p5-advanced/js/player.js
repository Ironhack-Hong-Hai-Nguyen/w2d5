class Player {
    constructor() {
        this.score = 0;
        this.gravity = 0.2;
        this.velocity = 0;
        this.width = 100;
        this.height = 140;
        this.x = 50;
        this.y = height - this.height;
    }
    jump() {
        console.log('jumping');
        // we set velocity temporarily to a negative (higher on the screen) value
        this.velocity = - 13;
    }
    draw() {
        // console.log('drawing player');
        // this gets higher with every loop
        this.velocity += this.gravity;
        // this pushes bb8 down => gravity
        this.y += this.velocity;
        // this makes sure that bb8 does not move out of the bottom of the screen
        if (this.y >= height - this.height) {
            // this is the starting y of bb8
            this.y = height - this.height;
        }
        image(game.playerImage, this.x, this.y, this.width, this.height);
    }
}