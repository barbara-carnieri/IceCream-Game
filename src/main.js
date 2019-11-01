'use strict';

// Creates DOM elements from a string representation
function buildDom(htmlString) {
  var div = document.createElement('div');
  div.innerHTML = htmlString;
  return div.children[0];
};

// Runs on initial start and contains calls all other functions that manage the game
function main() {
  var game; 
  var splashScreen; 
  var gameOverScreen;

    
  // -- splash screen

  function createSplashScreen() {
    splashScreen = buildDom(`
    <main>
      <h1>ICE CREAMY GAME</h1>
      <button>Start</button>
    </main>
    `);

    document.body.appendChild(splashScreen);

    var startButton = splashScreen.querySelector('button');
    startButton.addEventListener('click', function(){
      console.log('start clicked!');
    });
  };

  function removeSplashScreen() {};

    
  // -- game screen

  function createGameScreen() {};

  function removeGameScreen() {};

    
  // -- game over screen

  function createGameOverScreen(score) {};

  function removeGameOverScreen() {};

    
  // -- Setting the game state 

  function startGame() {};

  function gameOver() {};

    
  // -- initialize Splash screen on initial start
  createSplashScreen();
}

// Runs the function `main` once all resources are loaded
window.addEventListener('load', main);