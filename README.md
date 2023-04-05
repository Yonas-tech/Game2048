# GAME: 2048

The game is published and you can play it [here](https://yonas-tech.github.io/Game2048/). 

## Introduction

Back in 2014, the Washington Post published an article titled “Everything you ever wanted to know about 2048, the Internet’s latest impossible hit game.” It was created by Gabriele Cirulli. 

Since then I have been playing the game, the math is very simple, it is just adding the alike numbers to reach 2048, but winning the game is another story and very tricky which needs some strategies like other board games. Only few people reached to 2048. 

> “2048 is a popular single-player game for Web and mobile. It’s a type of “sliding block puzzle” — think Threes!, on which 2048 is based, or the old-timey game klotski — that’s played on an almost Sudoku-like grid. Like Sudoku, it also involves some math. The object of the game is to combine the numbers displayed on the tiles until you reach 2048.”
> [Read more](https://www.washingtonpost.com/news/arts-and-entertainment/wp/2014/04/23/everything-you-ever-wanted-to-know-about-2048-the-internets-latest-impossible-hit-game/ ).
>

I decided to code this interestingly annoying game myself from scratch and give it my own touch. 

## The Game: 
### Sudo Code
1. Generate a new Board(): 
2. Display the board to the player. 
    ![start](https://github.com/Yonas-tech/Game2048/blob/main/images/startPage.jpg)
3. Accept and Process Player Move: up, down, left, or right
    * If any two (2) numbers that are colliding are equal, they get added and merged into one cell. At each move, another tile with a 2 or a 4 will be inserted at randome position.
4. Check the board/game status
4.1. If {One of the cell has a value of 2048 => **WIN STATE** = }
4.2. Else if { The board is filled with numbers > 0 and no direct neighbors are equal => **LOOSE STATE** }
4.3. Else game continues { look at all the cells value and plug in a 2 or a 4 at a random cell with a 0 value}
5. Back to step 2. 

### **Game Controls/keys:**
	To move/slide the numbers, the player uses the onscreen four arrow buttons or the arrow keys or w, s, a, d keys on the keyboard to slide the numbers to up, down, left, or right directions. 


* **RE-START:** The game ends in either case of Win or Loose state. Game Over screen presents which state happened along with a restart button. This button restarts the game with a newly generated grid board.
![GameOver.YouWon](https://github.com/Yonas-tech/Game2048/blob/main/images/GO_uWon.jpg)   ![GameOver.YouLost](https://github.com/Yonas-tech/Game2048/blob/main/images/loose.jpg)


* **NEW GAME:** the player can restart/reset the game at any point of playing. It restarts the game with a newly generated grid board. 

![Score Board/New Game](https://github.com/Yonas-tech/Game2048/blob/main/images/score_newGame.jpg)

* **Score board:** at the top of the screen two scores will be shown: Score and Max Score
	- Score: is the maximum number on the current board.  At every generation of new board, The New Game button or the Restart button after Game Over. 
	- Max Score: is highest Score reached from consecutive plays. It does not reset with the click of the New Game button while on live game or the Restart button at Game Over. If the player wants to reset the Max Score, the window/tab has to be refreshed or open and on a new tab. 




## The Logic of the code in the background:
_______
1. I initially built a code that sweeps upward a single column. This code applys all the rules of the game to add and merge numbers, move them to the right cells, and other more logics. [Here](https://github.com/Yonas-tech/Game2048/blob/main/mergingLogic.md) is the sudo code for this part.  

2. Then, I used this code in a for loop to sweep upward through the next 3 columns. and this completes the up-move. This is the longest part of program covering if and else if conditions of the game logic. The code spans about 200 lines (see sweepColumnUp method in the class Game2048 inside script.js). 

3. For the other 3 direction moves, I used some math techniques for minimal codding:

    3.1. Left Move: the input array gets transposed first, then up-move method, and transposed back. 

    3.2. Down Move: reversed each the array using array.reverse() Javascript method, the up-move method, and reversed again. 

    3.3. Right Move: array gets transposed, followed by reverse, followed by up-move, then transpose and reverse back. 
 
## Code Organiztion:
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
This Javascript file instantiates the GameDirector class. Then, manipulates the game with the class methods and properties to integrate with the DOM variables using multiple functions. 
Functions used to integrate the DOM variables with the main javascript are:  
* `handleClick()` : Handles on-screen game buttons and a reset button
* `handleKeyboard()` : Handles keyboard control keys
* `checkGameStatus()` : check Game Status(win/loose/continue playing) after every player input through the game control keys and/or buttons. 
* `updateBoard()` : updates the visual board at the start of the game and for every move
* `gameOver()` : manages the game over visual effects, messages and the reset button. 


### Technology used: 
    * HTML, 
    * CSS: flex, grid, transition... etc 
    * Javascript: classes, functions, DOM variables... etc

### Future development:
    - different sizes and shapes of grid;
    - levels of difficulties
    - more animations 


## Rererence: 

Washington Post: https://www.washingtonpost.com/news/arts-and-entertainment/wp/2014/04/23/everything-you-ever-wanted-to-know-about-2048-the-internets-latest-impossible-hit-game/ 

Original 2048: https://github.com/gabrielecirulli/2048