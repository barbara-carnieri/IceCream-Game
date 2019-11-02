//Create the Player constructor

'use strict';

function Ball(canvas, x, speed) {
  this.canvas = canvas;
  this.ctx = canvas.getContext('2d');

  this.size = 20;
  this.y = 0 - this.size;
  // this.y = 0;
  this.x = x;
  this.speed = speed;
}

Ball.prototype.draw = function() {
  this.ctx.fillStyle = '#FF6F27';
  // fillRect(x, y, width, height)
  this.ctx.fillRect(
    this.x,
    this.y,
    this.size,
    this.size,
  );
};

// // updatePosition()
Ball.prototype.updatePosition = function() {
  console.log('hello')
  this.y = this.y + this.speed;
  console.log(this.y)
};

// // isInsideScreen()
Ball.prototype.isInsideScreen = function() {
  // if y plus half of its size is smaller then canvas height return
  if (this.y > this.canvas.heigth){
    return false;
  }
  else {
    return true;
  }
  //if false removes from the screen (position out of the screen)
};