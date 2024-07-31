let spaceship;
let bullets = [];
let invaders = [];
let invaderSpeed = 1;
let bulletSpeed = 5;
let invaderDropSpeed = 5;
let invaderSize = 30;
let spaceshipWidth = 60;
let spaceshipHeight = 20;
let score = 0;

function setup() {
  createCanvas(400, 400);
  spaceship = new Spaceship();
  for (let i = 0; i < 6; i++) {
    invaders.push(new Invader(i * 100 + 50, 50));
  }
}

function draw() {
  background(0);
  spaceship.display();
  spaceship.move();

  for (let bullet of bullets) {
    bullet.move();
    bullet.display();
  }

  for (let invader of invaders) {
    invader.move();
    invader.display();

    // Check for collision with bullets
    for (let bullet of bullets) {
      if (bullet.hits(invader)) {
        invader.destroy();
        bullet.destroy();
        score += 10;
      }
    }
  }

  bullets = bullets.filter(bullet => !bullet.toDelete);
  invaders = invaders.filter(invader => !invader.toDelete);

  // Check for game over
  for (let invader of invaders) {
    if (invader.y > height - invaderSize) {
      gameOver();
    }
  }

  displayScore();
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    spaceship.setDir(-1);
  } else if (keyCode === RIGHT_ARROW) {
    spaceship.setDir(1);
  } else if (key === ' ') {
    bullets.push(new Bullet(spaceship.x + spaceshipWidth / 2, spaceship.y));
  }
}

function keyReleased() {
  spaceship.setDir(0);
}

function gameOver() {
  noLoop();
  textAlign(CENTER);
  textSize(32);
  fill(255);
  text("Game Over! Score: " + score, width / 2, height / 2);
}

function displayScore() {
  textSize(24);
  fill(255);
  text("Score: " + score, 10, 25);
}

class Spaceship {
  constructor() {
    this.x = width / 2;
    this.y = height - 60;
    this.xdir = 0;
  }

  setDir(dir) {
    this.xdir = dir;
  }

  move() {
    this.x += this.xdir * 5;
    this.x = constrain(this.x, 0, width - spaceshipWidth);
  }

  display() {
    fill(255);
    rect(this.x, this.y, spaceshipWidth, spaceshipHeight);
  }
}

class Bullet {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.toDelete = false;
  }

  move() {
    this.y -= bulletSpeed;
  }

  display() {
    fill(50, 200, 50);
    ellipse(this.x, this.y, 8, 8);
  }

  destroy() {
    this.toDelete = true;
  }

  hits(invader) {
    let d = dist(this.x, this.y, invader.x, invader.y);
    return d < invaderSize;
  }
}

class Invader {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.toDelete = false;
  }

  move() {
    this.y += invaderSpeed;
    if (this.y > height - invaderSize) {
      this.toDelete = true;
    }
  }

  display() {
    fill(255, 0, 0);
    rect(this.x, this.y, invaderSize, invaderSize);
  }

  destroy() {
    this.toDelete = true;
  }
}
