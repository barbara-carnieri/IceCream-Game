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
  // var name;

  //   // -- splash screen

  function createSplashScreen() {
    removeGameOverScreen();

    splashScreen = buildDom(`
    <main class="start">
      <h1 class="title"><img src="./images/ICE Creamy.png" alt="logo"></h1>
      <input class="input-name" type="text" placeholder="Your Name">
      <button class="btn-start">PLAY</button>
    </main>
    `);


    document.body.appendChild(splashScreen);

    var startButton = splashScreen.querySelector('.btn-start');
    // startButton.addEventListener('click', function(){
    //   console.log('start clicked!');
    // });
    startButton.addEventListener('click', saveData);
  };

  function removeSplashScreen() {
    splashScreen.remove();
  };



  // -- save input name /score
  function saveData() {
    var name = splashScreen.querySelector('.input-name').value;

    const score = [
      { name: name, score: 0 }
    ];
    
    // Stringify the data before storing in localStorage
    const scoreStringified = JSON.stringify(score);
    
    // Save the data to the localStorage 
    localStorage.setItem('score', scoreStringified);
    
    // Retrieve the stored data from local storage
    const retrieved = localStorage.getItem('score');
    console.log('retrieved', retrieved);
    
    const scoreParsed = JSON.parse(retrieved);
    
    console.log(scoreParsed);
    
    scoreParsed.push({ name: name, score: 0 });
    
    // Parse the data back into an object/array
    const stringifiedAgain = JSON.stringify(scoreParsed);
    localStorage.setItem('score', stringifiedAgain);


   startGame();
  }
  //   // -- game screen

  function createGameScreen() {
    var gameScreen = buildDom(`
    <main class="game container">
      <header>
        <div class="lives">
          <span class="label"><img src="./images/pandacone.png" id="lives-logo" alt="lives-logo"></span>
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
      <p class="gameoverscore">YOUR SCORE: <span></span></p>
     

      <table class="playersscore">
        <tr>
          <th>Ranking:</th>
        </tr>
        <tr>
          <td id="name1" class="ranking-names"></td>
          <td id="score1" class="ranking-scores"></td>
        </tr>
        <tr>
          <td id="name2" class="ranking-names"></td>
          <td id="score2" class="ranking-scores"></td>
        </tr>
        <tr>
          <td id="name3" class="ranking-names"></td>
          <td id="score3" class="ranking-scores"></td>
        </tr>
      </table>

      <button class="btn-gameover">Restart</button>
  	</main>
  `);

    // var restartButton = gameOverScreen.querySelector('.btn-gameover');
    // restartButton.addEventListener('click', startGame);
    var restartButton = gameOverScreen.querySelector('.btn-gameover');
    restartButton.addEventListener('click', createSplashScreen);


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