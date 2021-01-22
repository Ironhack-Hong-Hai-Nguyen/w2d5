#### Add the draw function to the Game class. In main.js instantiate game and call it in the draw function - also add createCanvas to main.js
```js
function setup() {
	createCanvas(600, 600)
}
```
#### We wanna start with the background. In the class Background create a method draw and then add the background to the constructor of the game.
```js
class Background {
	draw() {
		console.log('this is the background');
	}
}
//
class Game {
	constructor() {
		this.background = new Background();
	}
	draw() {
		console.log('drawing');
		this.background.draw();
	}
}
```
#### Then let's preload the image file for the background in the Game class
```js
class Game {
	//
	preload() {
		this.backgroundImages = [
			{ src: loadImage('assets/background/plx-1.png') }
		]
	}
	draw() {
		console.log('drawing');
		this.background.draw();
	}
}
// in  the Background class we now use the image function to draw that image
class Background {
	draw() {
		console.log('this is the background');
		image(game.backgroundImages[0].src, 0, 0, width, height)
	}
}

// and in main.js we have to call that game.preload now in the preload function
// main.js
function preload() {
	game.preload();
}
```
#### Check if the image is showing - now we add the other images to the array
```js
	class Game {
    //  these images are loaded on top of each other - moving the first one to the end would not work 
		preload() {
			this.backgroundImages = [
				{ src: loadImage('assets/background/plx-1.png') },
				{ src: loadImage('assets/background/plx-2.png') },
				{ src: loadImage('assets/background/plx-3.png') },
				{ src: loadImage('assets/background/plx-4.png') },
				{ src: loadImage('assets/background/plx-5.png') }
			]
		}
	class Background {
		//
		draw() {
			console.log('this is the background');
			image(game.backgroundImages[0].src, 0, 0, width, height)
			image(game.backgroundImages[1].src, 0, 0, width, height)
			image(game.backgroundImages[2].src, 0, 0, width, height)
			image(game.backgroundImages[3].src, 0, 0, width, height)
			image(game.backgroundImages[4].src, 0, 0, width, height)
		}
	}
```
#### Then replace this with a loop
```js
class Background {
	draw() {
		game.backgroundImages.forEach(function (img) {
			image(img.src, 0, 0, width, height)
		})
		console.log('this is the background');
		// image(game.backgroundImages[0].src, 0, 0, width, height)
		// image(game.backgroundImages[1].src, 0, 0, width, height)
		// image(game.backgroundImages[2].src, 0, 0, width, height)
		// image(game.backgroundImages[3].src, 0, 0, width, height)
		// image(game.backgroundImages[4].src, 0, 0, width, height)
	}
}

```
#### Now let's move the images. All of them will get an x coordinate first
```js
class Game {
	//
	preload() {
		this.backgroundImages = [
			{ src: loadImage('assets/background/plx-1.png'), x: 0 },
			{ src: loadImage('assets/background/plx-2.png'), x: 0 },
			{ src: loadImage('assets/background/plx-3.png'), x: 0 },
			{ src: loadImage('assets/background/plx-4.png'), x: 0 },
			{ src: loadImage('assets/background/plx-5.png'), x: 0 }
		]
	}
```
#### In the Background we now use that x from the object instead of the x coordinate 0 - nothing changes
```js
class Background {
	draw() {
		game.backgroundImages.forEach(function (img) {
			image(img.src, img.x, 0, width, height)
		})

```
#### Now we wanna decrement x on every loop iteration - we also need to clear the canvas
```js
class Background {
	draw() {
		game.backgroundImages.forEach(function (img) {
			img.x -= 1;
			image(img.src, img.x, 0, width, height);
		})
		//
}

class Game {
	//
	draw() {
		console.log('drawing');
		clear();
		this.background.draw();
	}
}
```
#### To make the image move infinitely we first put two images after another
```js
class Background {
	draw() {
		game.backgroundImages.forEach(function (img) {
			img.x -= 1
			image(img.src, img.x, 0, width, height)
			// here we add the second image - we add the width to x
			image(img.src, img.x + width, 0, width, height)
		})

```
#### Then we need to replace the first one when it moves out of sight
```js
class Background {
	draw() {
		game.backgroundImages.forEach(function (img) {
			img.x -= 1
			image(img.src, img.x, 0, width, height)
			image(img.src, img.x + width, 0, width, height)
			// we add this condition
			if (img.x <= - width) img.x = 0;
		})

```
#### For the illusion of depth we wanna move the images we show first slower than the ones we show later - wo we add a speed property to the image objects
```js
class Game {
	preload() {
		this.backgroundImages = [
			{ src: loadImage('assets/background/plx-1.png'), x: 0, speed: 0 },
			{ src: loadImage('assets/background/plx-2.png'), x: 0, speed: 1 },
			{ src: loadImage('assets/background/plx-3.png'), x: 0, speed: 2 },
			{ src: loadImage('assets/background/plx-4.png'), x: 0, speed: 3 },
			{ src: loadImage('assets/background/plx-5.png'), x: 0, speed: 4 }
		]
	}
```
#### And then instead of 1 use that speed property for decrementing x
```js
class Background {
	draw() {
		game.backgroundImages.forEach(function (img) {
			img.x -= img.speed
			image(img.src, img.x, 0, width, height)
			image(img.src, img.x + width, 0, width, height)
			// we add this condition
			if (img.x <= - width) img.x = 0;
		})
```

#### Now we wanna add the player - the file is already listed in the script tags in index.html
```js
class Player {
    draw() {
        console.log('drawing player');
    }
}
```

#### And add it to the constructor in the Game class
#### Call the player draw in the draw function of the game class - you see the console.log
```js
class Game {
	constructor() {
		this.background = new Background();
		this.backgroundImages;
		this.player = new Player();
	}
	draw() {
		console.log('drawing');
		clear();
		this.background.draw();
		this.player.draw();
```
#### Now let's display the image
#### We preload it in the game

```js
	// class Game
	preload() {
		this.backgroundImages = [
			{ src: loadImage('assets/background/plx-1.png'), x: 0, speed: 0 },
			{ src: loadImage('assets/background/plx-2.png'), x: 0, speed: 1 },
			{ src: loadImage('assets/background/plx-3.png'), x: 0, speed: 2 },
			{ src: loadImage('assets/background/plx-4.png'), x: 0, speed: 3 },
			{ src: loadImage('assets/background/plx-5.png'), x: 0, speed: 4 }
		]
		this.playerImage = loadImage('assets/player/bb8.gif');
```
#### Then use the image function in the draw function of the player
```js
class Player {
    draw() {
        image(game.playerImage, 50, 50, 100, 140);
        console.log('drawing player');
    }

```
#### Now we add x, y, width and height to the player constructor
```js
class Player {
    constructor() {
        this.x = 50;
        this.y = 50;
        this.width = 100;
        this.height = 140;
    }
    draw() {
        image(game.playerImage, this.x, this.y, this.width, this.height);
        console.log('drawing player');
    }

```
#### Now we change the values so the player is in the correct position
```js
class Player {
    constructor() {
        this.width = 100;
        this.height = 140;
        this.x = 0;
        this.y = height - this.height;
    }
```

#### To be able to use the height of the canvas the setup function of p5 needs to be called so we create a setup function in the game class and call it in the main setup
```js
// the player and background are now removed from the constructor and placed in the setup
class Game {
	setup() {
		this.player = new Player();
		this.background = new Background();
	}

```

#### And then we call this setup in the main
```js
// main.js
function setup() {
	createCanvas(600, 400)
	game.setup()
}
```

#### Now we wanna make the player jump - we add keyPressed in main js and listen for space
```js
// main.js
// 
function keyPressed() {
	if (keyCode === 32) {
		game.player.jump();
	}
}
```

#### And add a jump function in the player class - this however just moves the player up 
```js
    jump() {
        this.y -= 10;
    }
```

#### The thing we need to implement is gravity - we add it in the constructor
```js
class Player {
    constructor() {
        this.gravity = 0.2;
        this.width = 100;
        this.height = 140;
        this.x = 0;

```

#### Now we use that gravity in the draw function to push him permanently down 
```js	
class Player {
	//
    draw() {
		// this pushes the player down
        this.y += this.gravity;
        image(game.playerImage, this.x, this.y, this.width, this.height);
```

#### Now let's add some logic so that the player cannot move lower than the floor
```js
class Player {
	//
    draw() {

        this.y += this.gravity;
		// if the y of the player moves further than where the top left corner of the
		// image should be
        if (this.y >= height - this.height) {
		 // just reset the image to it's default position (the one from /// the constructor)
			this.y = height - this.height;
		}
```

#### Now we add another variable and that is velocity - first add it to the constructor and then add add the first two lines in draw
#### Now gravity gets stronger the longer you fall and vice versa
```js
class Player {
    constructor() {
		//
        this.velocity = 0;
    }
    draw() {
		// then add these two lines
        this.velocity += this.gravity;
        this.y += this.velocity;
        if (this.y >= height - this.height) {
            this.y = height - this.height;
        }
```

#### And in the jump function we temporarily set the velocity to - 20
```js
class Player {
	// 
    jump() {
        this.velocity = - 10;
    }
```

## Adding obstacles
#### The obstacles will be in an array in the game class - we add an empty array to the setup function
```js
class Game {
	// 
	setup() {
		this.player = new Player();
		this.background = new Background();
		this.obstacles = [];
	}

```

#### Now we add the image to the preload in the Game class and to the constructor
```js
class Game {
	constructor() {
		//
		this.coinImage;
	}
	preload() {
		// 
		this.playerImage = loadImage('assets/player/bb8.gif');
		this.coinImage = loadImage('assets/coins/tile000.png');
	}
```

#### In the draw function of the game class we push coins into the array in a certain interval
```js
class Game {
	//
	draw() {
		clear();
		this.background.draw();
		this.player.draw();
		// this is added
		if (frameCount % 180 === 0) {
			console.log('this is the push event');
			// here we now need to create a new class - first you can just push a 1 to demonstrate 
			this.obstacles.push(new Obstacle(this.coinImage));
			console.log(this.obstacles);
		}
	}

```

#### Then let's add the Obstacle class 
```js
class Obstacle {
    constructor(image) {
        this.image = image;
        // the coins should appear on the right side of the canvas
        this.x = width;
        // this.y = (Math.random() * height) / 2.5;
        this.y = 100;
        this.width = 50;
        this.height = 50;
    }
}
```

#### The obstacle class also gets a draw function 
```js	
class Obstacle {
	//
    draw() {
        this.x--;
        image(this.image, this.x, this.y, this.width, this.height);
    }
```

#### Then in the draw function of the game we iterate over the obstacles array and call the draw function of the obstacle 
```js
class Game {
	//
	draw() {
		// console.log('drawing');
		// at the bottom
		this.obstacles.forEach(function (obstacle) {
			obstacle.drawObstacle();
		});
```

#### The coins should appear at random positions so we adjust y
```js
class Obstacle {
    constructor(image) {
		// this would use the whole height so coins would also appear on the bottom
		this.y = (Math.random() * height);
		// by adding / 2.5 the coins don't appear in the lower quarter
        this.y = (Math.random() * height) / 2.5;
```

## Collision

### Now we want to check for collisions - the idea is that the obstacles (coins) can detect the collision with coordinates of the player. Based on that boolean we then remove the obstacles from the array 

#### We define the collision function in the obstacle
```js
class Obstacle {
	//
    collision(playerInfo) {
        console.log('collision', playerInfo);
    }
    draw() {
        this.x--;
        image(this.image, this.x, this.y, this.width, this.height);
    }
}

```

#### Then we use it in the Game class
```js
class Game {
	//
	draw() {
		//
		// here we need the arrow function otherwise this is undefined - you can check
		// by logging collision
		this.obstacles = this.obstacles.filter((obstacle) => {
			obstacle.collision(this.player)
		})
```

#### Let's complete the logic of the collision function
```js
class Obstacle {
	// 
    collision(playerInfo) {
        console.log('collision', playerInfo);
        // get the middle of the obstacle 
        let obstacleX = this.x + this.width / 2;
        let obstacleY = this.y + this.height / 2;
        // get the middle of the player
        let playerX = playerInfo.x + playerInfo.width / 2;
        let playerY = playerInfo.y + playerInfo.height / 2;

        // https://p5js.org/reference/#/p5/dist

        // then use the p5 distance function to check the collision
        if (dist(obstacleX, obstacleY, playerX, playerY) > 25) {
            return false;
        } else {
            game.player.score += 10;
            console.log(game.player.score);
            return true;
        }
    }
}
```

#### Lastly finish the filter function in the game draw
```js
class Game {
		//
		this.obstacles = this.obstacles.filter((obstacle) => {
			// if we have a collision or the coin moves off the screen on the left
			if (obstacle.collision(this.player) || obstacle.x < 0) {
				return false;
			} else {
				return true;
			}
		});
```