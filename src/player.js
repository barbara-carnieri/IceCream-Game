'use strict';

function Player(canvas, lives, score) {
  this.canvas = canvas;
  this.ctx = this.canvas.getContext('2d');
  this.lives = lives;
  this.score = score;
  // this.name = name;
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
  this.audioBonus = new Audio('../audio/bonus.wav');
};

//Create methods for the player:

// setDirection()
Player.prototype.setDirection = function (direction) {
  // +1 right  -1 left
  if (direction === 'left') this.direction = -1;
  else if (direction === 'right') this.direction = 1;
};


Player.prototype.didCollide = function (ball) {
  var playerLeft = this.x;
  var playerRight = this.x + this.size;
  var playerTop = this.y;
  var playerBottom = this.y + this.size;

  var ballLeft = ball.x;
  var ballRight = ball.x + ball.size;
  var ballTop = ball.y;
  var ballBottom = ball.y + ball.size;

  // Check if the ball intersects any of the player's sides
  var crossLeft = ballLeft <= playerRight && ballLeft >= playerLeft;

  var crossRight = ballRight >= playerLeft && ballRight <= playerRight;

  var crossBottom = ballBottom >= playerTop && ballBottom <= playerBottom;

  var crossTop = ballTop <= playerBottom && ballTop >= playerTop;

  if ((crossLeft || crossRight) && (crossTop || crossBottom)) {
    return true;
  }
  return false;
};

Player.prototype.draw = function () {
  this.ctx.drawImage(
    this.image,
    this.x,
    this.y,
    this.size,
    this.size,
  );
};

Player.prototype.updatePlayerPosition = function () {
  this.x = this.x + this.direction * this.speed;
}

Player.prototype.handleScreenCollision = function () {
  this.updatePlayerPosition();
  var screenLeft = 0;
  var screenRight = this.canvas.width - this.size;

  if (this.x > screenRight) this.direction = -1;
  else if (this.x < screenLeft) this.direction = 1;
};

Player.prototype.removeLife = function () {
  this.lives -= 1;
};

Player.prototype.increaseScore = function () {
  this.score += 150;
}

Player.prototype.getBonus = function () {
  this.score += 1000;
  this.audioBonus.play();
}