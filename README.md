# GAME: 2048

Game published at: https://yonas-tech.github.io/Game2048/ 

## Introduction

Back in 2014, the Washington Post published an article titled “Everything you ever wanted to know about 2048, the Internet’s latest impossible hit game.” 

Since then I have been playing the game, the math is very simple, it is just adding the alike numbers to reach 2048, but winning the game is another story and very tricky which needs some strategies like other board games. Only few people reached to 2048. 

> “2048 is a popular single-player game for Web and mobile. It’s a type of “sliding block puzzle” — think Threes!, on which 2048 is based, or the old-timey game klotski — that’s played on an almost Sudoku-like grid. Like Sudoku, it also involves some math. The object of the game is to combine the numbers displayed on the tiles until you reach 2048.”
> Read more: here (https://www.washingtonpost.com/news/arts-and-entertainment/wp/2014/04/23/everything-you-ever-wanted-to-know-about-2048-the-internets-latest-impossible-hit-game/ )
>

I decided to code this lovely game myself from scratch and give it my own touch. 

## The Game: 

* **ON START:**
The game starts with a 4x4 grid with the number 2 or 4 inserted at two random cells of the grid. All other locations are empty. 

![start](https://github.com/Yonas-tech/Game2048/blob/main/images/startPage.jpg)


* **PLAYING:**
The player moves/slides the numbers to collide them each other. If any two (2) numbers that are colliding are equal, they get added and merged into one cell. At each move, another tile with a 2 or a 4 will be inserted at randome position. 

* **WIN STATE:**
	If the player manages to add/merge numbers to 2048 at any one cell in the grid, the player wins. 

* **LOOSE STATE:**
	The player looses if before reaching to 2048, all cells on the grid are filled and no adjacent numbers are equal to slide and merge/add them.

![GameOver.YouWon](https://github.com/Yonas-tech/Game2048/blob/main/images/GO_uWon.jpg)
![GameOver.YouLost](https://github.com/Yonas-tech/Game2048/blob/main/images/loose.jpg)


* **RE-START:** The game ends in either case of Win or Loose state. Game Over screen presents which state happened along with a restart button. This button restarts the game with a newly generated grid board. 

![Score Board/New Game](https://github.com/Yonas-tech/Game2048/blob/main/images/score_newGame.jpg)

* **NEW GAME:** the player can restart/reset the game at any point of playing. It restarts the game with a newly generated grid board. 

* **Score board:** at the top of the screen two scores will be shown: Score and Max Score
	- Score: is the maximum number on the current board.  At every generation of new board, The New Game button or the Restart button after Game Over. 
	- Max Score: is highest Score reached from consecutive plays. It does not reset with the click of the New Game button while on live game or the Restart button at Game Over. If the player wants to reset the Max Score, the window/tab has to be refreshed or open and on a new tab. 

* **RESTART:** only shows on the Game Over screen.

* **Game Controls/keys:**
	To move/slide the numbers, the player uses the onscreen four arrow buttons or the arrow keys or w, s, a, d keys on the keyboard to slide the numbers to up, down, left, or right directions. 
	- onscreen buttons
	- keyboard buttons
	- reset button 
	- restart button



## The Logic of the code:
_______
1. I initially built a code that sweeps upward a single column. This code applys all the rules of the game to add and merge numbers, move them up, and many more logics. 
2. Then, I used this code in a for loop to sweep upward through the next 3 columns. and this completes the up-move. This is the longest part of program covering if and else if conditions of the game logic. The code spans about 200 lines (see sweepColumnUp method in the class Game2048 inside script.js). 
3. For the other 3 direction moves, I used some math techniques for minimal codding:
     1. Left Move: the input array gets transposed first, then up-move method, and transposed back. 
    2. Down Move: reversed each the array using array.reverse() Javascript method, the up-move method, and reversed again. 
    3. Right Move: array gets transposed, followed by reverse, followed by up-move, then transpose and reverse back. 
 
## Parts of the code:
_______

### script.js: contains two classes 
* **Class Game2048:**
    * Properties: board, score
    * Methods: 
        * `moveUp(), moveLeft(), moveDown(), moveRight()`: these are the 4 methods that process the 4 possible moves the player can make. 
        * Other methods: `sweepColumnUp(), recordScore(), getScore(), resetScore(), resetBoard(), plugInValForA0(), getAllValIndexs(), transpose(array), generateBoard()`, 

* **Class GameDirector:**
Starts with instantiating the Game2048 class. 
    * Properties: game, maxScore, pastScores, status
    * Methods: move(moveDirectionInput), gameStatus(), restart(), getBoard(), getMaxScore(), getPastScores(), printGameBoard(), setMaxScore()

### gameRunner.js 
__________
This Javascript file instantiates the GameDirector class and manipulates the game along with DOM variables using multiple functions. 
Functions used to integrate the DOM variables with the main javascript are:  
* `handleClick()` : Handles on-screen game buttons and a reset button
* `handleKeyboard()` : Handles keyboard control keys
* `checkGameStatus()` : check Game Status(win/loose/continue playing) after every player input through the game control keys and/or buttons. 
* `updateBoard()` : updates the visual board at the start of the game and for every move
* `gameOver()` : manages the game over visual effects, messages and the reset button. 
