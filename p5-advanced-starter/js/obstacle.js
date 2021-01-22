class Obstacle {
    constructor(image) {
        this.image = image;
        this.x = width;
        // makes the coins appear at random y positions on the screen - not on the 
        // lower part of the screen
        this.y = (Math.random() * height) / 2.5;
        this.width = 50;
        this.height = 50;
    }
    collision(playerInfo) {
        console.log('collision', playerInfo);
        // get the middle of the coin
        let obstacleX = this.x + this.width / 2;
        let obstacleY = this.y + this.height / 2;
        // get the middle of the player
        let playerX = playerInfo.x + playerInfo.width / 2;
        let playerY = playerInfo.y + playerInfo.height / 2;
        // use p5 dist() function to measure distance between two objects
        if (dist(obstacleX, obstacleY, playerX, playerY) > 25) {
            return false
        } else {
            // collision was detected
            game.player.score += 10;
            return true
        }

    }
    draw() {
        this.x--;
        image(this.image, this.x, this.y, this.width, this.height);
        // console.log('obstacle drawing');
    }
}

