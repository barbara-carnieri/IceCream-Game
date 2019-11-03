'use strict';

// Creates DOM elements from a string representation
function buildDom(htmlString) {
  var div = document.createElement('div');
  div.innerHTML = htmlString;
  return div.children[0];
};

// // Runs on initial start and contains calls all other functions that manage the game
function main() {
  var game;
  var splashScreen;
  var gameOverScreen;


  //   // -- splash screen

  function createSplashScreen() {
    splashScreen = buildDom(`
    <main class="start">
      <h1 class="title"><img src="./images/ICE Creamy.png" alt="logo"></h1>
      <button class="btn-start">PLAY</button>
    </main>
    `);

    document.body.appendChild(splashScreen);

    var startButton = splashScreen.querySelector('button');
    // startButton.addEventListener('click', function(){
    //   console.log('start clicked!');
    // });
    startButton.addEventListener('click', startGame);
  };

  function removeSplashScreen() {
    splashScreen.remove();
  };


  //   // -- game screen

  function createGameScreen() {
    var gameScreen = buildDom(`
    <main class="game container">
      <header>
        <div class="lives">
          <span class="label">LIVES:</span>
          <span class="value"></span>
        </div>
        <div class="score">
          <span class="label">SCORE:</span>
          <span class="value"></span>
        </div>
      </header>
      <div class="canvas-container">
        <canvas></canvas>
      </div>
    </main>
  `);

    document.body.appendChild(gameScreen);
    return gameScreen;
  };

  function removeGameScreen() {
    game.removeGameScreen();
  };


  //   // -- game over screen

  function createGameOverScreen(score) {
    gameOverScreen = buildDom(`
    <main class="gameover-container">
      <h1 class="gameover">GAME OVER</h1>
      <p class="gameoverscore">Your score: <span></span></p>
      <button class="btn-gameover">Restart</button>
  	</main>
  `);

    var button = gameOverScreen.querySelector('button');
    button.addEventListener('click', startGame);

    var span = gameOverScreen.querySelector('span');
    span.innerText = score;

    document.body.appendChild(gameOverScreen);
  };

  function removeGameOverScreen() {
    if (gameOverScreen !== undefined) {
      gameOverScreen.remove();
    }
  };


  //   // -- Setting the game state 

  function startGame() {
    removeSplashScreen();
    removeGameOverScreen();

    // var gameScreen = createGameScreen();
    game = new Game();
    game.gameScreen = createGameScreen();

    // //Start the game
    game.start();

    // //End the game
    game.passGameOverCallback(function () { // <-- UPDATE
      gameOver(game.score); // <-- UPDATE
    });
  };

  function gameOver(score) {

    removeGameScreen();
    createGameOverScreen(score);
  };


  //   // -- initialize Splash screen on initial start
  createSplashScreen();
}

// // Runs the function `main` once all resources are loaded
window.addEventListener('load', main);