'use strict';

function Player(canvas, lives) {
  this.canvas = canvas;
  this.ctx = this.canvas.getContext('2d');
  this.lives = lives;
  //player canvas definitions:
  this.size = 100;
  this.y  = canvas.height -  this.size;
  this.x = canvas.width/2;
  this.direction = 0;
  this.speed = 5;
}

//Create methods for the player:

// setDirection()
Player.prototype.setDirection = function(direction) {
// +1 right  -1 left
if (direction === 'left') this.direction = -1;
else if (direction === 'right') this.direction = 1;
};


Player.prototype.didCollide = function(ball) {
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

Player.prototype.handleScreenCollision = function() {
  this.x = this.x + this.direction * this.speed;
  var screenLeft = 0;
  var screenRight = this.canvas.width - this.size;

  if (this.x > screenRight) this.direction = -1;
  else if (this.x < screenLeft) this.direction = 1;
};

Player.prototype.removeLife = function() {
  this.lives -= 1;
};

Player.prototype.draw = function() {
  this.ctx.fillStyle = '#66D3FA';
  // fillRect(x, y, width, height)
  this.ctx.fillRect(
    this.x,
    this.y,
    this.size,
    this.size,
  );
};