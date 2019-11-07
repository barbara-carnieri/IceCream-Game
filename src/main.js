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
  var inputName;

  //   // -- splash screen

  function createSplashScreen() {
    removeGameOverScreen();

    splashScreen = buildDom(`
    <main class="start">
      <h1 class="title"><img src="./images/ICE Creamy.png" alt="logo"></h1>
      <div class="instru">
      <h2 class="instruNeg"><img src="./images/negative.png" alt="linstruNeg"></h2>
      
      <h2 class="instruPos"><img src="./images/positive.png" alt="linstruPos"></h2>
      </div>
      <input class="input-name" type="text" placeholder="Your Name Here!">
      <button class="btn-start">PLAY</button>
    </main>
    `);

    // <h2 class="instruPos"><img src="./images/positive.png" alt="linstruPos"></h2>
    // // <h2 class="instruNeg"><img src="./images/instruneg.png" alt="linstruNeg"></h2>

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
    inputName = splashScreen.querySelector('.input-name').value;
    startGame();
  }


  //   // -- game screen

  function createGameScreen() {
    var gameScreen = buildDom(`
    <main class="game container">
      <header>
        <div class="lives">
          <span class="label"><img src="./images/penguincone.png" id="lives-logo" alt="lives-logo"></span>
          <span class="value"></span>
        </div>
        <div class="controls">
        <span class="label">CONTROLS:</span>
        <span class="controls"><img src="./images/controls.png" id="controls" alt="controls"></span>
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

  function createGameOverScreen(score, inputName) {
    gameOverScreen = buildDom(`
    <main class="gameover-container">
      <h1 class="gameover">GAME OVER</h1>
        <p class="gameovername"> <span id="namefinal"></span></p>
        <p class="gameoverscore">YOUR SCORE: <span id="scorefinal"></span></p>
        <table class="playersscore">
          <tr>
            <td id="star1"><img src="./images/stars/1.png" alt="star1"></td>
            <td id="name1" class="ranking-names"></td>
            <td id="score1" class="ranking-scores"></td>
          </tr>
          <tr>
            <td id="star2"><img src="./images/stars/2.png" alt="star2"></td>
            <td id="name2" class="ranking-names"></td>
            <td id="score2" class="ranking-scores"></td>
          </tr>
          <tr>
            <td id="star3"><img src="./images/stars/3.png" alt="star3"></td>
            <td id="name3" class="ranking-names"></td>
            <td id="score3" class="ranking-scores"></td>
          </tr>
          <tr>
            <td id="star4"><img src="./images/stars/4.png" alt="star4"></td>
            <td id="name4" class="ranking-names"></td>
            <td id="score4" class="ranking-scores"></td>
          </tr>
          <tr>
            <td id="star5"><img src="./images/stars/5.png" alt="star5"></td>
            <td id="name5" class="ranking-names"></td>
            <td id="score5" class="ranking-scores"></td>
          </tr>
        </table>
      <button class="btn-gameover">Restart</button>
  	</main>
  `);

//          <td id="star1"><img src="./images/stars/1.png" alt="star1"></td>
    var restartButton = gameOverScreen.querySelector('.btn-gameover');
    restartButton.addEventListener('click', createSplashScreen);


    var spanScoreFinal = gameOverScreen.querySelector('#scorefinal');
    spanScoreFinal.innerText = score;
    var spanNameFinal = gameOverScreen.querySelector('#namefinal');
    spanNameFinal.innerText = inputName;


    var arrScores;

    if (localStorage.getItem('arrScores') === null) {
      arrScores = [];
    } else {
      arrScores = JSON.parse(localStorage.getItem('arrScores'));
    }

    var newPlayer = {
      name: inputName,
      score: score
    };
    arrScores.push(newPlayer);

    localStorage.setItem('arrScores', JSON.stringify(arrScores));
  // localStorage.clear();
    var ranking = JSON.parse(localStorage.getItem('arrScores'));

    ranking.sort(function (a, b) {
      return b.score - a.score
    });

    for (var i = 0; i < ranking.length; i++) {
      if (i < 5) {
        // console.log('#score' + (i + 1));
        var score1 = gameOverScreen.querySelector('#score' + (i + 1));
        score1.innerText = ranking[i].score;
        var name1 = gameOverScreen.querySelector('#name' + (i + 1));
        name1.innerText = ranking[i].name;
      }
    }
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
      gameOver(game.score, inputName); // <-- UPDATE
    });
  };

  function gameOver(score, inputName) {
    removeGameScreen();
    createGameOverScreen(score, inputName);
  };


  //   // -- initialize Splash screen on initial start
  createSplashScreen();
}

// // Runs the function `main` once all resources are loaded
window.addEventListener('load', main);