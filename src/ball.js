function Ball(canvas, x, speed) {
  this.canvas = canvas;
  this.ctx = canvas.getContext('2d');

  this.size = 50;
  this.y = 0 - this.size;
  this.x = x;
  this.speed = speed;

  this.image = new Image();
  this.image.src = "./images/icecreams/flavour"+(Math.floor((Math.random()*13))+1)+".png";
};

Ball.prototype.draw = function () {
  // var ball1Img = new Image();
  // ball1Img.src = "../images/icecreams/strawberry.png"
 
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
  // console.log('hello')

  if(playerY === this.y){
    this.y = playerY
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

Ball.prototype.didCollide = function (newBall) {
  var ballLeft = this.x;
  var ballRight = this.x + this.size;
  var ballTop = this.y;
  var ballBottom = this.y + this.size;

  var newBallLeft = newBall.x;
  var newBallRight = newBall.x + newBall.size;
  var newBallTop = newBall.y;
  var newBallBottom = newBall.y + newBall.size;

  // Check if the fireball intersects any of the player's sides
  var crossLeft = newBallLeft <= ballRight && newBallLeft >= ballLeft;

  var crossRight = newBallRight >= ballLeft && newBallRight <= ballRight;

  var crossBottom = newBallBottom >= ballTop && newBallBottom <= ballBottom;

  var crossTop = newBallTop <= ballBottom && newBallTop >= ballTop;

  if ((crossLeft || crossRight) && (crossTop || crossBottom)) {
    return true;
  }
  return false;
};