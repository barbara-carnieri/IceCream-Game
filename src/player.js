'use strict';

class Player {
  constructor(canvas, lives, score) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    this.lives = lives;
    this.score = score;
    //player canvas definitions:
    this.size = 140;
    this.y = canvas.height - this.size;
    this.x = canvas.width / 2 - this.size / 2;
    this.direction = 0;
    this.speed = 5;

    this.hasFirstIceCream = false;
    this.lastIceCream = null;

    this.image = new Image();
    this.image.src = "./images/penguincone.png";
    this.audioBonus = new Audio('./audio/bonus.wav');
  };

  //Create methods for the player:

  // setDirection()
  setDirection(direction) {
    // +1 right  -1 left
    if (direction === 'left') this.direction = -1;
    else if (direction === 'right') this.direction = 1;
  };


  didCollide(ball) {
    let playerLeft = this.x;
    let playerRight = this.x + this.size;
    let playerTop = this.y;
    let playerBottom = this.y + this.size;

    let ballLeft = ball.x;
    let ballRight = ball.x + ball.size;
    let ballTop = ball.y;
    let ballBottom = ball.y + ball.size;

    // Check if the ball intersects any of the player's sides
    let crossLeft = ballLeft <= playerRight && ballLeft >= playerLeft;

    let crossRight = ballRight >= playerLeft && ballRight <= playerRight;

    let crossBottom = ballBottom >= playerTop && ballBottom <= playerBottom;

    let crossTop = ballTop <= playerBottom && ballTop >= playerTop;

    if ((crossLeft || crossRight) && (crossTop || crossBottom)) {
      return true;
    }
    return false;
  };

  draw() {
    this.ctx.drawImage(
      this.image,
      this.x,
      this.y,
      this.size,
      this.size,
    );
  };

  updatePlayerPosition() {
    this.x = this.x + this.direction * this.speed;
  }

  handleScreenCollision() {
    this.updatePlayerPosition();
    let screenLeft = 0;
    let screenRight = this.canvas.width - this.size;

    if (this.x > screenRight) this.direction = -1;
    else if (this.x < screenLeft) this.direction = 1;
  };

  removeLife() {
    this.lives -= 1;
  };

  increaseScore() {
    this.score += 150;
  }

  getBonus() {
    this.score += 1000;
    this.lives += 1;
    this.audioBonus.play();
  };

};