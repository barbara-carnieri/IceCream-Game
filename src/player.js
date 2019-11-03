'use strict';

function Player(canvas, lives, score) {
  this.canvas = canvas;
  this.ctx = this.canvas.getContext('2d');
  this.lives = lives;
  this.score = score;
  //player canvas definitions:
  this.size = 120,
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


Player.prototype.didCollide = function(fireball) {
  var playerLeft = this.x;
  var playerRight = this.x + this.size;
  var playerTop = this.y;
  var playerBottom = this.y + this.size;

  var fireballLeft = fireball.x;
  var fireballRight = fireball.x + fireball.size;
  var fireballTop = fireball.y;
  var fireballBottom = fireball.y + fireball.size;

// Check if the fireball intersects any of the player's sides
  var crossLeft = fireballLeft <= playerRight && fireballLeft >= playerLeft;
    
  var crossRight = fireballRight >= playerLeft && fireballRight <= playerRight;
  
  var crossBottom = fireballBottom >= playerTop && fireballBottom <= playerBottom;
  
  var crossTop = fireballTop <= playerBottom && fireballTop >= playerTop;

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

Player.prototype.increaseScore = function() {
this.score += 100;
}


Player.prototype.draw = function() {
  var playerImg = new Image();
  playerImg.src = "../images/pandacone.png"
  this.ctx.drawImage (
    playerImg,  
    this.x,
    this.y,
    this.size,
    this.size,
    );
    // this.ctx.fillStyle = '#66D3FA';
  // fillRect(x, y, width, height)
  // this.ctx.fillRect(
  //   this.x,
  //   this.y,
  //   this.size,
  //   this.size,
  // );
};