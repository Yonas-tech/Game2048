// Game: 2048


// #############################  Class: Game2048 ###################
class Game2048 {
    constructor() {
        this.board = this.generateBoard();
        this.score = 0;
        // this.mode = 'beginer'// "advance"
    }

    // #### The Move Methods
    // Move: Up 
    moveUp() {
        this.board = this.sweepColumnUp(this.board);
        this.plugInValForA0();
    }

    // Move: Left 
    moveLeft() {
        let oldBoard = this.board;
        this.board = this.transpose(this.board);
        this.board = this.sweepColumnUp(this.board);
        this.board = this.transpose(this.board)
        if (oldBoard != this.board) {                                        // ??????????????????? if old board is the same as translated board, it should not plug in a 2
            this.plugInValForA0();
        }
    }

    // Move: Down
    moveDown() {
        this.board = this.board.reverse();
        this.board = this.sweepColumnUp(this.board);
        this.board = this.board.reverse();    // ???? check if this works, otherwise will asign it to a variable first
        this.plugInValForA0();
    }

    // Move: Right
    moveRight() {
        this.board = this.transpose(this.board).reverse();
        this.board = this.sweepColumnUp(this.board)
        this.board = this.transpose(this.board.reverse())
        this.plugInValForA0();
    }

    recordScore() {
        let max = (a, b) => { return a < b ? b : a; }
        this.score = [this.board[0].reduce(max),
        this.board[1].reduce(max),
        this.board[2].reduce(max),
        this.board[3].reduce(max)].reduce(max);
    }

    getScore() {
        return this.score;
    }

    resetScore() {
        this.score = 0;
    }

    resetBoard() {
        this.board = this.generateBoard()
    }

    // ################ Toolbox Methods: ################ 

    // sweepColumnUp() is the algorithm to process the movements, and it is for the 'Up' move originally.
    // For all the other moves (down, left, right) the array gets transposed/reversed as necessary. Then,  
    // the sweepColumnUp() is used to sweep through the numbers. And finally, the returned array is 
    // transposed/reversed to arrive to the resulting final array. 
    sweepColumnUp(gameBoard) {
        for (let i = 0; i < gameBoard[0].length; i++) {
            if (gameBoard[0][i] == gameBoard[1][i] && gameBoard[0][i] != 0) {
                gameBoard[0][i] = gameBoard[0][i] + gameBoard[1][i];
                // console.log('condition1')
                if (gameBoard[2][i] == gameBoard[3][i]) {
                    gameBoard[1][i] = gameBoard[2][i] + gameBoard[3][i];
                    gameBoard[2][i] = 0;
                    gameBoard[3][i] = 0;
                    // console.log('condition1-2')
                }
                else {
                    if (gameBoard[2][i] != 0) {
                        gameBoard[1][i] = gameBoard[2][i];
                        gameBoard[2][i] = gameBoard[3][i];
                        // console.log('condition1-3')
                    }
                    else {
                        gameBoard[1][i] = gameBoard[3][i];
                        gameBoard[2][i] = 0;
                        // console.log('condition1-4')
                    }
                    gameBoard[3][i] = 0;
                }
            }
            else if (gameBoard[1][i] == gameBoard[2][i] && gameBoard[1][i] != 0) {
                // console.log('condition2')
                if (gameBoard[0][i] == 0) {
                    gameBoard[0][i] = gameBoard[1][i] + gameBoard[2][i];
                    gameBoard[1][i] = gameBoard[3][i];
                    gameBoard[2][i] = 0;
                    gameBoard[3][i] = 0;
                    // console.log('condition2-1')
                }
                else { // gameBoard[0][i] is already nonzero
                    gameBoard[1][i] = gameBoard[1][i] + gameBoard[2][i];
                    gameBoard[2][i] = gameBoard[3][i];
                    gameBoard[3][i] = 0;
                    // console.log('condition2-2')
                }
            }

            else if (gameBoard[0][i] == gameBoard[2][i] && gameBoard[1][i] == 0 && gameBoard[0][i] != 0) {
                gameBoard[0][i] = gameBoard[0][i] + gameBoard[2][i];
                gameBoard[1][i] = gameBoard[3][i];
                gameBoard[2][i] = 0;
                gameBoard[3][i] = 0;
                // console.log('condition3')
            }
            else if (gameBoard[0][i] == gameBoard[3][i] && gameBoard[1][i] == 0 && gameBoard[2][i] == 0) {
                gameBoard[0][i] = gameBoard[0][i] + gameBoard[3][i];
                //gameBoard[1][i] = 0; // already 0
                //gameBoard[2][i] = 0; // already 0
                gameBoard[3][i] = 0;
                // console.log('condition4')
            }

            else if (gameBoard[1][i] == gameBoard[3][i] && gameBoard[2][i] == 0) {
                // console.log('condition5')
                if (gameBoard[0][i] == 0) {
                    gameBoard[0][i] = gameBoard[1][i] + gameBoard[3][i];
                    gameBoard[1][i] = 0;
                    //gameBoard[2][i] = 0; // already 0 
                    // console.log('condition5-1')
                }
                else {
                    gameBoard[1][i] = gameBoard[1][i] + gameBoard[3][i];
                    // gameBoard[0][i] = stays non-zero 
                    // gameBoard[2][i] = 0; // already 0 
                    // console.log('condition5-2')
                }
                gameBoard[3][i] = 0;
            }

            else if (gameBoard[2][i] == gameBoard[3][i] && gameBoard[2][i] != 0) {
                // console.log('condition6')
                if (gameBoard[0][i] == 0 && gameBoard[1][i] == 0) {
                    gameBoard[0][i] = gameBoard[2][i] + gameBoard[3][i];
                    gameBoard[1][i] = 0;
                    gameBoard[2][i] = 0;
                    gameBoard[3][i] = 0;
                    // console.log('condition6-1')
                }
                else if (gameBoard[0][i] == 0 && gameBoard[1][i] != 0) { // ;
                    gameBoard[0][i] = gameBoard[1][i];
                    gameBoard[1][i] = gameBoard[2][i] + gameBoard[3][i];
                    gameBoard[2][i] = 0;
                    gameBoard[3][i] = 0;
                    // console.log('condition6-2')
                }
                else if (gameBoard[0][i] != 0 && gameBoard[1][i] == 0) { // ;
                    // gameBoard[0][i] = gameBoard[0][i]; //the same
                    gameBoard[1][i] = gameBoard[2][i] + gameBoard[3][i];
                    gameBoard[2][i] = 0;
                    gameBoard[3][i] = 0;
                    // console.log('condition6-3')
                }
                else if (gameBoard[0][i] != 0 && gameBoard[1][i] != 0) { // ;
                    // gameBoard[0][i] = gameBoard[0][i]; //the same
                    // gameBoard[1][i] = gameBoard[1][i]; //the same
                    gameBoard[2][i] = gameBoard[2][i] + gameBoard[3][i];
                    gameBoard[3][i] = 0;
                    // console.log('condition6-4')
                }
            }

            // if there is only 1 number at one of the cells along the column: while val(0,0) ==0 
            else if (gameBoard[0][i] == 0 && gameBoard[1][i] != 0) {
                // console.log('condition7')
                gameBoard[0][i] = gameBoard[1][i];
                if (gameBoard[2][i] != 0) {
                    gameBoard[1][i] = gameBoard[2][i]
                    gameBoard[2][i] = gameBoard[3][i]
                }
                else {
                    gameBoard[1][i] = gameBoard[3][i]
                    gameBoard[2][i] = 0
                }
                gameBoard[3][i] = 0;
            }
            else if (gameBoard[0][i] == 0 && gameBoard[1][i] == 0 && gameBoard[2][i] != 0) {
                // console.log('condition8')
                gameBoard[0][i] = gameBoard[2][i];
                gameBoard[1][i] = gameBoard[3][i]
                gameBoard[2][i] = 0;
                gameBoard[3][i] = 0;
            }
            else if (gameBoard[0][i] == 0 && gameBoard[1][i] == 0 && gameBoard[2][i] == 0 && gameBoard[3][i] != 0) {
                // console.log('condition9')
                gameBoard[0][i] = gameBoard[3][i];
                gameBoard[1][i] = 0
                gameBoard[2][i] = 0
                gameBoard[3][i] = 0;
            }

            // if there is 1 number at one of the cells along the column: while val(0,0) !=0 && != THAT NUMBER
            else if (gameBoard[0][i] != 0 && gameBoard[1][i] == 0 && gameBoard[2][i] != 0) {
                // console.log('condition10')
                gameBoard[1][i] = gameBoard[2][i];
                gameBoard[2][i] = gameBoard[3][i]
                gameBoard[3][i] = 0;
            }
            else if (gameBoard[0][i] != 0 && gameBoard[1][i] == 0 && gameBoard[2][i] == 0 && gameBoard[3][i] != 0) {
                // console.log('condition11')
                gameBoard[1][i] = gameBoard[3][i];
                gameBoard[2][i] = 0
                gameBoard[3][i] = 0
            }

            else if (gameBoard[0][i] != 0 && gameBoard[1][i] != 0 && gameBoard[2][i] == 0 && gameBoard[3][i] != 0) {
                // console.log('condition11')
                gameBoard[2][i] = gameBoard[3][i];
                gameBoard[3][i] = 0
            }
        }
        return gameBoard;
    }

    // to plug in value at a random position with current value of 0
    plugInValForA0(gameBoard = this.board, val = 2) {
        let allZeroIndexes = this.getAllValIndexes(gameBoard, 0);
        let plugIndex = allZeroIndexes[Math.floor(Math.random() * allZeroIndexes.length)]
        if (allZeroIndexes.length > 0) {
            gameBoard[plugIndex[0]][plugIndex[1]] = val;
        }

        return gameBoard;
    }

    // Find all 0s locations on the array given;
    getAllValIndexes(array = this.board, val = 0) {
        let indexes = [], j, i, clmn;
        for (i = 0; i < array.length; i++) {
            clmn = array[i]
            for (j = 0; j < clmn.length; j++) {
                if (array[i][j] === val) {
                    indexes.push([i, j]);
                }
            }
        }
        return indexes;
    }

    // for transposing an array 
    transpose(array) {
        return array[0].map((_, colIndex) => array.map(row => row[colIndex]));
    }

    generateBoard() {
        let board2048 = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
        // FOR TEST:
        // board2048 = [[2, 4, 0, 16], [32, 256, 16, 0], [4, 0, 64, 16], [2, 4, 32, 0]];
        board2048 =
            [[1024, 32, 4, 2],
            [1024, 64, 2, 16],
            [2, 256, 32, 8],
            [2, 2, 2, 2]];

        // plug in 2s at two random positions for starting;
        board2048 = this.plugInValForA0(board2048, 2);
        board2048 = this.plugInValForA0(board2048, 2)
        return board2048;
    }
}


// #############################  Class: Game Director ###################

class GameDirector {
    constructor() {
        this.game = new Game2048();
        this.maxScore = 0;
        this.pastScores = [];
        this.status = 0;   // 0: continue playing;  1: player won;  -1: player lost;
    }

    // ##################### RUN this to process each user input: keyboard keys & onscreen buttons
    move(moveDirectionInput) { // ['ArrowLeft', 'KeyA', 'ArrowDown', 'KeyS', 'ArrowUp', 'KeyW', 'ArrowRight', 'KeyD']
        // [w, s, a, d]
        if (moveDirectionInput == 'w' || moveDirectionInput == 'KeyW' || moveDirectionInput == 'ArrowUp') {      // up 
            this.game.moveUp()                     // process the move
            console.log("Move: up")                 // 
        }
        else if (moveDirectionInput == "a" || moveDirectionInput == "KeyA" || moveDirectionInput == 'ArrowLeft') { // left
            this.game.moveLeft();
            console.log("Move: left")
        }
        else if (moveDirectionInput == 's' || moveDirectionInput == 'KeyS' || moveDirectionInput == 'ArrowDown') { // down
            this.game.moveDown();
            console.log("Move: down")
        }
        else if (moveDirectionInput == 'd' || moveDirectionInput == 'KeyD' || moveDirectionInput == 'ArrowRight') { // right
            this.game.moveRight();
            console.log("Move: right")
        }

        this.game.recordScore();        // record the current score for the current game
        this.setMaxScore()              // check/record the current max score for the current game

        // return this.game;
    }

    // ######################### Game Status:
    gameStatus() {
        let zeroIndexes = this.game.getAllValIndexes(this.game.board, 0);

        // check if any of the cells value is == 2048 
        // => "You Win!"
        for (let i = 0; i < this.game.board.length; i++) {
            for (let j = 0; j < this.game.board[0].length; j++) {
                if (this.game.board[i][j] == 2048) {
                    console.log("GAME OVER")
                    console.log("You Won!")
                    this.status = 1;
                    return;
                }
            }
        }

        // Check the continue game cases(=2) 
        // Case 1:
        if (zeroIndexes.length != 0) {
            console.log("here 1")
            console.log("continue playing")
            this.status = 0;
            console.log("here 1")
            return;
        }
        // Case 2: 
        if (zeroIndexes.length == 0) {
            // if no adjucent 2 indxes values are equal;
            let i, j, k;

            for (i = 0; i < (this.game.board.length); i++) { // horizontal check
                for (j = 0; j < (this.game.board[i].length - 1); j++) {
                    if (this.game.board[i][j] == this.game.board[i][j + 1]) {
                        console.log("continue playing");
                        this.status = 0;
                        console.log("here 2")
                        console.log(i + " " + j)
                        console.log((i) + " " + (j + 1))
                        return;
                    }
                }
                if (i + 1 < this.game.board.length) {
                    for (k = 0; k < (this.game.board[i].length); k++) { // vertical check
                        console.log(`(${i}, ${k}) vs (${i + 1}, ${k})`)
                        if (this.game.board[i][k] == this.game.board[i + 1][k]) {
                            console.log("continue playing");
                            this.status = 0;
                            console.log("here 3")
                            console.log(i + " " + k)
                            console.log((i + 1) + " " + k)
                            return;
                        }
                    }
                }
            }
        }

        // If it gets here: the grid is full of numbers and no adjusent numbers are equal
        // => "You Lost!" 
        console.log("GAME OVER")
        console.log("You Lost!")
        this.status = -1; // 

        if (this.status = -1 || this.status == 1) {  // ??????????????????????????
            // gameOver(this.status)
            // Do something here depending on win or lose
            // show a small window showing the result, and a restart button 
            this.pastScores.push(this.game.getScore());
            console.log("game over")

        }

    }

    // Restart the board, maxScore won't be reset
    restart() {
        this.game.recordScore();
        this.pastScores.push(this.game.getScore());
        // this.game.board = this.game.generateBoard();
        this.game.resetBoard();
        this.game.resetScore();
        this.status = 0;
        console.log("\n GAME RESTARTED.\n")
    }

    // getter methods:
    getBoard() {
        // console.log(this.game.board)
        return this.game.board;
    }
    getMaxScore() {
        return this.maxScore;
    }
    getPastScores() {
        return this.pastScores;
    }
    printGameBoard() { // print formated game board to the console. 
        let currentBoard = this.getBoard();
        console.log(
            `               ---------
                  | ${currentBoard[0]} |
                  | ${currentBoard[1]} |
                  | ${currentBoard[2]} |
                  | ${currentBoard[3]} | 
                   ---------`);
    }

    // setter Mothds:
    setMaxScore() { // calculates and sets the max score, maxScore
        this.maxScore = this.maxScore > this.game.getScore() ? this.maxScore : this.game.getScore();
    }

}





// ############################################### Instanciate GameDirector
let play2048 = new GameDirector();


// ##################################################### DOM Manipulations ###################################################################

const boardEl = document.querySelector("#board");
const allCellEls = document.querySelectorAll(".board-cell");
// console.log(allCellEls)

const controlsEl = document.querySelector(".controls");
const mainEl = document.querySelector("main");
const overlayEl = document.querySelector(".overlay");

// controlls
const upBtn = document.querySelector(".up");
const downBtn = document.querySelector(".down");
const rightBtn = document.querySelector(".right");
const leftBtn = document.querySelector(".left");
// scores
const scoreEl = document.querySelector(".score");
const maxScoreEl = document.querySelector(".max-score");

//reset
const resetEl = document.querySelector(".new-game");


// restartEl.addEventListener('click', handleClick)
mainEl.addEventListener('click', handleClick);
document.addEventListener('keydown', handleKeyboard);
const moveKeys = ['ArrowLeft', 'KeyA', 'ArrowDown', 'KeyS', 'ArrowUp', 'KeyW', 'ArrowRight', 'KeyD'];

const columns = play2048.getBoard()[0].length;
const rows = play2048.getBoard().length;


// check Game Status(win/loose/continue playing)
function checkGameStatus(){
    play2048.gameStatus();
    if (play2048.status == -1 || play2048.status == 1) {
        console.log("here 4");
        gameOver(play2048.status);
    }
}


// update the board whenever necessary
function updateBoard() {
    scoreEl.textContent = play2048.game.getScore();
    maxScoreEl.textContent = play2048.getMaxScore();
    let k = 0;
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            allCellEls[k].textContent = play2048.getBoard()[i][j];
            if (allCellEls[k].textContent == 0) {
                allCellEls[k].textContent = "";
            }
            k++
        }
    }
}
updateBoard()


// Game Over
let gameOverMsg = "";
const gameOverMsgEl = document.querySelector(".game-over-msg");
function gameOver(status) { // -1 or 1
    if (status == -1) {
        gameOverMsg = "<p class='winnerMsg'>You Lost.</p>";
        gameOverMsgEl.appendChild = gameOverMsg;
        overlayEl.style.width = "580px";//"100%";
    }
    else if (status == 1) {
        gameOverMsg = "<p class='winnerMsg'>You Won.</p>";
        gameOverMsgEl.appendChild = gameOverMsg;
        overlayEl.style.width = "580px";//"100%";
    }

    // Restart after the game is over:
    const restartEl = document.querySelector(".restart");
    const restartDiv = document.querySelector(".restart-div")
    let winnerMsgEl = document.querySelector(".winnerMsg");
    console.log(winnerMsgEl)

    restartDiv.addEventListener("click",
    (e) => {
        if(e.target == restartEl){
            overlayEl.style.width = "0";
            // gameOverMsgEl.removeChild(winnerMsgEl);
            play2048.restart();
            updateBoard();
            console.log("here 6")
        }
    })
}




function handleClick(event) {
    const el = event.target;
    // console.log(el)
    if (play2048.status == 0) {
        if (el === upBtn || el === downBtn || el === rightBtn || el === leftBtn) {
            console.log(el.id);
            const id = el.id;
            play2048.move(id);
            updateBoard();
            checkGameStatus();
        }
    }

    // handling if new-game button clicked before game over
    if (el == resetEl) {
        play2048.restart();
        updateBoard()
    }
}

function handleKeyboard(event) {
    if (play2048.status == 0) {
        const keyName = event.code;
        if (moveKeys.indexOf(keyName) != -1) {
            play2048.move(keyName);
            updateBoard();
            checkGameStatus();
        }
    }
}

