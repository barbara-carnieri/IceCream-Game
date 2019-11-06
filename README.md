# IceCreamy Game

## Description
The IceCreamy Game, the player can move left and right and catch the icecreams scopes that are falling from the sky into his cone. Colorful balls increase the score and fire ball decreases it. The player has 3 lives, the fire ball removes 1 life each time touched by the player.

## MVP (DOM - CANVAS)
CANVAS, In this game the player can move and catch objects falling.

## Backlog
<ul>
  <li>Fill up the scone until the top of the page to win</li>
  <li>Each ball  catches is added to the top of the last one</li>
  <li>Bad Ice cream ball deduct ball from the pile</li>
</ul>

## Data Structure
## main.js
```
buildDom() {
}
main() {
  createSplashScreen() {};
  removeSplashScreen() {};
  
  createGameScreen() {};
  removeGameScreen() {};

  createGameOverScreen(score) {};
  removeGameOverScreen() {};

  startGame() {};
  gameOver() {};
  }
```
## game.js
```

Game() {
  this.canvas
  this.ctx
  this.balls
  this.player
  this.gameIsOver
  this.gameScreen
  this.score
}
Game.prototype.start = function() {};
Game.prototype.startLoop = function() {};
Game.prototype.checkCollisions = function() {};
Game.prototype.updateGameStats = function() {};
Game.prototype.passGameOverCallback = function(callback) {};
Game.prototype.gameOver = function() {};
Game.prototype.removeGameScreen = function() {};
```

## player.js
```
Player() {
  this.canvas
  this.ctx
  this.lives
  this.size
  this.x 
  this.direction
  this.speed
}
Player.prototype.setDirection = function() {};
Player.prototype.didCollide = function() {};
Player.prototype.handleScreenCollision = function() {};
Player.prototype.removeLife = function() {};
Player.prototype.draw = function() {};
```
## balls.js
```
Balls() {
  this.canvas;
  this.ctx;
  this.size;
  this.x;
  this.y;
  this.speed;
  }
Balls.prototype.draw = function() {};
Balls.prototype.updatePosition = function() {};
Balls.prototype.isInsideScreen = function() {};
```
## fireBall.js
```
FireBall() {
  this.canvas;
  this.ctx;
  this.size;
  this.x;
  this.y;
  this.speed;
  }
FireBall.prototype.draw = function() {};
FireBall.prototype.updatePosition = function() {};
FireBall.prototype.isInsideScreen = function() {};
```

## States y States Transitions
Definition of the different states and their transition (transition functions)
```
splashScreen
gameScreen
gameoverScreen / winScreen
```

## Task
* HTML - CreateHTML 
* CSS - CreateCSSstyle
* Main - buildDom
* Main - buildSplashScreen
* Main - buildGameScreen
* Main - buildGameOverScreen
* Main - settingGameState 
* Game - buildCanvas
* Game - clearCanvas
* Game - updateCanvas
* Game - drawCanvas
* Game - buildGame
* Game - startGame
* Game - collision
* Game - setGameOver
* Player - buildPlayer
* Player - setDirection 
* Player - didCollide 
* Player -handleScreenCollision 
* Player - removeLife 
* Player - drawCanvas
* Balls - buildBalls
* Balls - drawCanvas
* Balls - updatePosition
* Balls - checkIsInsideScreen
* Balls - increaseScore
* FireBall - buildBalls
* FireBall - drawCanvas
* FireBall - updatePosition
* FireBall - checkIsInsideScreen
* FireBall - removesLife
* FireBall - decreaseScore

## Links
<a href="https://trello.com/b/W7yrr1M3">Trello Link url</a>

## Git
URls for the project repo and deploy <a href="https://github.com/barbara-carnieri/IceCream-Game">Link Repo</a> <a href="https://barbara-carnieri.github.io/IceCream-Game/">Link Deploy</a>

## Slides
<a href="https://docs.google.com/presentation/d/1x4XGkQkhz4wiEgKMI9L-tXDhDRoqIFdW2wjCJhGgHCE/edit?usp=sharing">Slides Link url</a>
