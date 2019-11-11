'use strict';

function Game() {
  this.canvas = null;
  this.ctx = null;
  this.fireballs = [];
  this.balls = [];
  this.newBalls = [];
  this.player = null;
  this.gameIsOver = false;
  this.gameScreen = null;
  this.score = 0;

  this.audio = new Audio('./audio/musicgame.wav');
  this.audioScore = new Audio('./audio/score.wav');
  this.audioFireball = new Audio('./audio/fireball.wav');
  this.audioGameOver = new Audio('./audio/gameover.wav');
}

Game.prototype.start = function () {
  // Save reference to canvas and container. Create ctx
  this.canvasContainer = document.querySelector('.canvas-container');
  this.canvas = this.gameScreen.querySelector('canvas');
  this.ctx = this.canvas.getContext('2d');

  // Save reference to the score and lives elements
  this.livesElement = this.gameScreen.querySelector('.lives .value');
  this.scoreElement = this.gameScreen.querySelector('.score .value');

  // Set the canvas dimensions to match the parent
  this.containerWidth = this.canvasContainer.offsetWidth;
  this.containerHeight = this.canvasContainer.offsetHeight;
  this.canvas.setAttribute('width', this.containerWidth);
  this.canvas.setAttribute('height', this.containerHeight);

  // Create a new player for the current game
  // this.player = {};
  this.player = new Player(this.canvas, 3, 0, this.name); //	<-- UPDATE
  // this.player = new Player(this.canvas, 3, 0, this.playerName); 

  // Event listener callback function
  this.handleKeyRight = function (event) {
    if (event.key === 'ArrowLeft') {
      // console.log('LEFT');
      this.player.setDirection('left');
    } else if (event.key === 'ArrowRight') {
      // console.log('RIGHT');
      this.player.setDirection('right');
    }
  };

  // Add event listener for moving the player
  //   var gameReference = this;
  document.body.addEventListener(
    'keydown',
    this.handleKeyRight.bind(this)
  );
  //       // Any function provided to eventListener 
  //   // is always called by window (this === window)!
  //   // So, we have to bind `this` to the `game` object,
  //   // to prevent it from pointing to the `window` object

  //   // Start the canvas requestAnimationFrame loop
  this.startLoop();
};


Game.prototype.startLoop = function () {
  var loop = function () {
    // console.log('in loop');
    this.audio.play();
    // 1. UPDATE THE STATE OF PLAYER AND FIREBALLS / BALLS

    // 0. Our player was already created - via `game.start()`

    // 1. Create new fireballs randomly
    if (Math.random() > 0.986) {
      var randomX = this.canvas.width * Math.random();
      var newFireball = new Fireball(this.canvas, randomX, 5);
      this.fireballs.push(newFireball);
    }

    // 1. Create new balls randomly
    if (Math.random() > 0.90) {
      var randomX = this.canvas.width * Math.random();
      var newBall = new Ball(this.canvas, randomX, 5);
      this.balls.push(newBall);
    }

    // 2. Check if player had hit any fireball (check all fireballs)
    this.checkCollisions();

    // 3. Check if player is going off the screen
    this.player.handleScreenCollision();

    // 4. Move existing fireballs
    // 5. Check if any fireball is going of the screen
    this.fireballs = this.fireballs.filter(function (fireballObj) {
      fireballObj.updatePosition();
      return fireballObj.isInsideScreen();
    });

    // 5. Check if any ball is going of the screen
    this.balls = this.balls.filter(function (ballObj) {
      ballObj.updatePosition();
      return ballObj.isInsideScreen();
    });

    // 2. CLEAR THE CANVAS
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // 3. UPDATE THE CANVAS
    // Draw the player
    this.player.draw();

    // Draw the fireballs
    this.fireballs.forEach(function (fireballObj) {
      fireballObj.draw();
    });

    // Draw the balls
    this.balls.forEach(function (ballObj) {
      ballObj.draw();
    });

    // Draw the balls
    this.newBalls.forEach(function (newballObj) {
      newballObj.draw();
    });

    // // 4. TERMINATE LOOP IF GAME IS OVER
    if (!this.gameIsOver) {
      window.requestAnimationFrame(loop);
    }

    // //  5. Update Game data/stats
    this.updateGameStats();

  }.bind(this);
  //   // As loop function will be continuously invoked by
  //   // the `window` object- `window.requestAnimationFrame(loop)`
  //   // we have to bind the function so that value of `this` is
  //   // pointing to the `game` object, like this:
  //   // var loop = (function(){}).bind(this);
  window.requestAnimationFrame(loop);
};


Game.prototype.checkCollisions = function () {

  this.fireballs.forEach(function (fireball) {

    // We will implement didCollide() 
    if (this.player.didCollide(fireball)) {
      this.audioFireball.play();
      this.player.removeLife();
      // console.log('lives', this.player.lives);

      // Move the fireball off screen to the bottom
      fireball.y = this.canvas.height + fireball.size;

      if (this.player.lives === 0) {
        this.gameOver();

      }
    }
  }, this);


  this.balls.forEach(function (ball) {

    // don't check the collected balls
    if (ball.isCollected) { // just move the collected ball

      ball.x = this.player.x + (1.5 * ball.size);
      return;
    } else if (ball.isCollected === false) { // check ball that is not collected yet
      if (!this.player.hasFirstIceCream) { // we don't have first ice cream yet

        // We will implement didCollide() 
        if (this.player.didCollide(ball)) {

          this.audioScore.play();
          this.player.increaseScore();

          ball.x = this.player.x + (1.7 * ball.size);
          ball.y = this.canvas.height - this.player.size - ball.size;

          ball.isCollected = true;
          this.player.hasFirstIceCream = true;
          this.player.lastIceCream = {
            x: ball.x,
            y: ball.y
          }
          // console.log('last ice cream', this.player.lastIceCream);
        }
      } else if (this.player.hasFirstIceCream && this.player.lastIceCream) { // we already collected some ice cream

        if (ball.didCollect(this.player.lastIceCream)) {
          this.audioScore.play();
          this.player.increaseScore();

          ball.x = this.player.x + ( 1.7 * ball.size);
          ball.y = this.player.lastIceCream.y - ball.size;

          ball.isCollected = true;
          this.player.lastIceCream = {
            x: ball.x,
            y: ball.y
          }
          // console.log('last ice cream2', this.player.lastIceCream);
        } 
        else if (this.player.lastIceCream.y <= -5) {
          this.balls = [];
          this.player.lastIceCream.y = this.canvas.height - this.player.size;
          ball.isCollected === false;
          this.player.getBonus();
        }
      }
    }
  }, this);
};

Game.prototype.updateGameStats = function () {
  this.livesElement.innerHTML = this.player.lives;
  this.scoreElement.innerHTML = this.player.score;
};

Game.prototype.passGameOverCallback = function (callback) {
  this.passGameOverCallback = callback;
  //callback = gameOver
};

Game.prototype.gameOver = function () {
  // flag `gameIsOver = true` stops the loop
  this.score = this.player.score
  // this.name = this.player.name
  this.gameIsOver = true;
  this.audioGameOver.play();
  // console.log('GAME OVER');
  //  // Call the gameOver function from `main` to show the Game Over Screen
  this.passGameOverCallback();
};

Game.prototype.removeGameScreen = function () {
  this.gameScreen.remove(); // remove() is the DOM method which removes the DOM Node  
  this.audio.pause();
};