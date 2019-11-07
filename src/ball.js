function Ball(canvas, x, speed) {
  this.canvas = canvas;
  this.ctx = canvas.getContext('2d');

  this.size = 50;
  this.y = 0 - this.size;
  this.x = x;
  this.speed = speed;
  this.isCollected = false;

  this.image = new Image();
  this.image.src = "./images/icecreams/flavour"+(Math.floor((Math.random()*13))+1)+".png";
};

Ball.prototype.draw = function () {
  this.ctx.drawImage(
    this.image,
    this.x,
    this.y,
    this.size,
    this.size,
  );
};

// // updatePosition()
Ball.prototype.updatePosition = function (playerY) {
  if(playerY === this.y){
    this.y = playerY
  }
  else if(this.isCollected) {
    return;
  }
  else{
    this.y = this.y + this.speed;
  }
};

// // isInsideScreen()
Ball.prototype.isInsideScreen = function () {
  // if y plus half of its size is smaller then canvas height return
  if (this.y > this.canvas.heigth) {
    return false;
  } else {
    return true;
  }
  //if false removes from the screen (position out of the screen)
};

Ball.prototype.didCollect = function (lastBall) {
  var ballLeft = this.x;
  var ballRight = this.x + this.size;
  var ballTop = this.y;
  var ballBottom = this.y + this.size;

  var lastBallLeft = lastBall.x;
  var lastBallRight = lastBall.x + lastBall.size;
  var lastBallTop = lastBall.y;
  var lastBallBottom = lastBall.y + lastBall.size;

  // Check if the fireball intersects any of the player's sides
  var crossLeft = lastBallLeft <= ballRight && lastBallLeft >= ballLeft;

  var crossRight = lastBallRight >= ballLeft && lastBallRight <= ballRight;

  var crossBottom = lastBallBottom >= ballTop && lastBallBottom <= ballBottom;

  var crossTop = lastBallTop <= ballBottom && lastBallTop >= ballTop;

  if ((crossLeft || crossRight) && (crossTop)) {
    return true;
  }
  return false;
};