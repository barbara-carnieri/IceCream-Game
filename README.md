# IceCream-Game

## Description
The IceCreamy Game, the player can move left and right and catch the icecreams scopes that are falling from the sky into his cone. Colorful balls increase the score.

## MVP (DOM - CANVAS)
CANVAS, In this game the player can move and catch objects falling.

## Backlog
<ul>
  <li>Data structure</li>
  <li>Classes and methods definition</li>
</ul>

## Data Structure
## main.js
```
buildDom()
CreateSplashScreen()
createGameScreen()
createGameOverScreen()
```
## game.js
```
this.player
this.balls
this.isGameOver
this.checkLines()
this.checkColisions()
this.update()
this.startGame()
```

## player.js
```
this.width/this.height
this.velocity
this.speed
this.color
this.lives
this.move()
this.draw()
this.checkBorder()
this.updateLives()
```
## balls.js
```
this.x/this.y
this.width/this.height
this.velocity
this.speed
this.color
this.points
this.move()
this.draw()
this.eliminateBalls()
```

## States y States Transitions
Definition of the different states and their transition (transition functions)
```
splashScreen
gameScreen
gameoverScreen / winScreen
```

## Task
Task definition in order of priority

## Links
Trello
<a href="https://trello.com/b/W7yrr1M3">Link url</a>

## Git
URls for the project repo and deploy <a href="#">Link Repo</a> <a href="#">Link Deploy</a>

## Slides
URls for the project presentation (slides) Link Slides.com
