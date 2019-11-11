//Create the fireball constructor

'use strict';

class Fireball {
  constructor(canvas, x, speed) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');

    this.size = 60;
    this.y = 0 - this.size;
    // this.y = 0;
    this.x = x;
    this.speed = speed;

    this.image = new Image();
    this.image.src = "./images/fireball.png"
  }

  draw() {
    this.ctx.drawImage(
      this.image,
      this.x,
      this.y,
      this.size,
      this.size,
    );
  };

  // // updatePosition()
  updatePosition() {
    this.y = this.y + this.speed;
    // console.log(this.y)
  };

  // // isInsideScreen()
  isInsideScreen() {
    // if y plus half of its size is smaller then canvas height return
    if (this.y > this.canvas.heigth) {
      return false;
    } else {
      return true;
    }
    //if false removes from the screen (position out of the screen)
  };

};