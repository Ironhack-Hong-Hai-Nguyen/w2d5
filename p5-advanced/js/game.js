class Game {
    constructor() {
        this.backgroundImages;
        this.coinImage;
    }

    setup() {
        this.player = new Player();
        this.background = new Background();
        this.obstacles = [];
    }

    preload() {
        this.backgroundImages = [
            { src: loadImage('assets/background/plx-1.png'), x: 0, speed: 0 },
            { src: loadImage('assets/background/plx-2.png'), x: 0, speed: 1 },
            { src: loadImage('assets/background/plx-3.png'), x: 0, speed: 2 },
            { src: loadImage('assets/background/plx-4.png'), x: 0, speed: 3 },
            { src: loadImage('assets/background/plx-5.png'), x: 0, speed: 4 }
        ]
        this.playerImage = loadImage('assets/player/bb8.gif');
        this.coinImage = loadImage('assets/coins/tile000.png');
    }
    draw() {
        // console.log('drawing');
        clear();
        this.background.draw();
        this.player.draw();
        // this is the framecount provided by p5
        // console.log(frameCount);
        // every 180 frames we wanna add an obstacle in the array
        if (frameCount % 180 === 0) {
            this.obstacles.push(new Obstacle(this.coinImage));
            console.log(this.obstacles);
        }
        // we iterate over obstacles and draw then on the canvas 
        this.obstacles.forEach(function (obstacle) {
            obstacle.draw()
        })
        // removes the obstacles that had a collusion or left the screen from 
        // the obstacles array
        this.obstacles = this.obstacles.filter((obstacle) => {
            // we have to use an arrow function bc of the correct context of 'this'
            // obstacle.collision(this.player)
            if (obstacle.collision(this.player) || obstacle.x < 0) {
                return false
            } else {
                return true
            }

        })
    }
}
