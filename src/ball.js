class Ball {
  constructor(canvas, x, speed) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');

    this.size = 50;
    this.y = 0 - this.size;
    this.x = x;
    this.speed = speed;
    this.isCollected = false;

    this.image = new Image();
    this.image.src = "./images/icecreams/flavour" + (Math.floor((Math.random() * 13)) + 1) + ".png";
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

  // // updatePosition()
  updatePosition(playerY) {
    if (playerY === this.y) {
      this.y = playerY
    } else if (this.isCollected) {
      return;
    } else {
      this.y = this.y + this.speed;
    }
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

  didCollect(lastBall) {
    let ballLeft = this.x;
    let ballRight = this.x + this.size;
    let ballTop = this.y;
    let ballBottom = this.y + this.size;

    let lastBallLeft = lastBall.x;
    let lastBallRight = lastBall.x + lastBall.size;
    let lastBallTop = lastBall.y;
    let lastBallBottom = lastBall.y + lastBall.size;

    // Check if the fireball intersects any of the player's sides
    let crossLeft = lastBallLeft <= ballRight && lastBallLeft >= ballLeft;

    let crossRight = lastBallRight >= ballLeft && lastBallRight <= ballRight;

    let crossBottom = lastBallBottom >= ballTop && lastBallBottom <= ballBottom;

    let crossTop = lastBallTop <= ballBottom && lastBallTop >= ballTop;

    if ((crossLeft || crossRight) && (crossTop || crossBottom)) {
      return true;
    }
    return false;
  };

};