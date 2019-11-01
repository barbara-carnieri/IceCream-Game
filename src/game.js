'use strict';

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