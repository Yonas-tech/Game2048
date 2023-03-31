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
        this.board = this.transpose(this.board);
        this.board = this.sweepColumnUp(this.board);
        this.board = this.transpose(this.board)
        this.plugInValForA0();
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
        gameBoard[plugIndex[0]][plugIndex[1]] = val;
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
        // plug in 2s at two random positions for starting;
        board2048 = this.plugInValForA0(board2048, 2);
        board2048 = this.plugInValForA0(board2048, 2)
        return board2048;
    }


}


// at starting
// ######################### Generate a 4X4 array with all zerros but 2s at two random positions
// function generateBoard() {
//     let board2048 = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
//     console.log(board2048)
//     // plug in 2 at two random positions
//     board2048 = plugInValForA0(board2048, 2);
//     board2048 = plugInValForA0(board2048, 2)


//     // function generateRandCell() {
//     // const rowLength = board2048[0].length;
//     // const colmLength = board2048.length;
//     //     let randRow = Math.floor(Math.random() * rowLength);
//     //     let randColm = Math.floor(Math.random() * colmLength);
//     //     return [randRow, randColm]
//     // }
//     // let [randRow1, randColm1] = generateRandCell();
//     // board2048[randRow1][randColm1] = 2;

//     // let [randRow2, randColm2] = generateRandCell();
//     //     board2048[randRow2][randColm2] = 2;

//     // // In case accidentaly have the same positions selected twice for the 2s
//     // if ([randRow2, randColm2] === [randRow2, randColm2]){
//     //     return generateBoard();
//     // }


//     return board2048;
// }

// #############################  Class: Game Director ###################

class GameDirector {
    constructor() {
        this.game = new Game2048();
        this.maxScore = 0;
        this.pastScores = [];
        this.status = 0;   // 0: continue playing;  1: player won;  -1: player lost;
    }
    // Reminder: wait for the user input [up, down, left, or right] and/or [w, s, a, d]

    // ##################### RUN this to process each user input
    move(moveDirectionInput) { //['w','s','a','d']
        // [w, s, a, d]
        if (moveDirectionInput == 'w' || moveDirectionInput == 'W') {      // up 
            this.game.moveUp()                     // process the move
            console.log("Move: up")                 // 
        }
        else if (moveDirectionInput == "a" || moveDirectionInput == "A") { // left
            this.game.moveLeft();
            console.log("Move: left")
        }
        else if (moveDirectionInput == 's' || moveDirectionInput == 'S') { // down
            this.game.moveDown();
            console.log("Move: down")
        }
        else if (moveDirectionInput == 'd' || moveDirectionInput == 'D') { // right
            this.game.moveRight();
            console.log("Move: right")
        }

        this.game.recordScore();        // record the current score for the current game
        this.setMaxScore()              // check/record the current max score for the current game
        this.checkGameStatus();         // after the move, check the game status againest the rules

        // return this.game;
    }

    // ######################### Game Status:
    checkGameStatus() {
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
        if (zeroIndexes != null) {
            console.log("continue playing")
            this.status = 0;
            return;
        }
        // Case 2: 
        if (zeroIndexes == null) {
            // if no adjucent 2 indxes values are equal;
            let i, j, k;

            for (i = 0; i < (this.game.board.length - 1); i++) {
                for (j = 0; j < (this.game.board[i].length - 1); j++) {
                    if (this.game.board[i][j] == this.game.board[i][j + 1]) {
                        console.log("continue playing");
                        this.status = 0;
                        return;
                    }
                }
                for (k = 0; k < (this.game.board[i].length); k++) {
                    if (this.game.board[i][k] == this.game.board[i + 1][k]) {
                        console.log("continue playing");
                        this.status = 0;
                        return;
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

        }

    }

    // Restart the board, maxScore won't be reset
    restart() {
        this.game.recordScore();
        this.pastScores.push(this.game.getScore());
        this.game = new Game2048();
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
    setMaxScore() { // calculates and sets the max past score, maxScore
        if (this.pastScores != null) {
            let pastMax = Math.max(this.pastScores);
            this.maxScore = pastMax > this.game.getScore() ? pastMax : this.game.getScore()
            this.game.getScore
        }
        else {
            this.maxScore = this.maxScore > this.game.getScore() ? this.maxScore : this.game.getMaxScore()
        }
        // console.log(this.maxScore)
    }
}


let play2048 = new GameDirector();



// ############### FOR TEST

// NOTE: THE Functions WORK ON ALL MOVEMENTS NOW

// let board2048 = [[2, 2, 2, 2], [8, 0, 8, 7], [0, 8, 0, 0], [2, 0, 2, 16]];



// console.log(play2048);
// play2048.getBoard();
// play2048.printGameBoard()

// play2048.move("d")
// play2048.getBoard();

// play2048.move("d")
// play2048.getBoard();

// play2048.move("d")
// play2048.getBoard();

// play2048.move("d")
// play2048.getBoard();

// play2048.move("d")
// play2048.getBoard();

// play2048.move("d")
// play2048.getBoard();

// play2048.printGameBoard()
// // "Reset Game"
// play2048.restart()
// play2048.printGameBoard()


// play2048.move("d")
// play2048.getBoard();

// play2048.move("d")
// play2048.getBoard();

// play2048.printGameBoard()
// console.log(play2048.game.score)



function gameOver() {
    if (play2048.status = -1 || play2048.status == 1) {
        // gameOver(this.status)
        // Do something here depending on win or lose
    }

}



// ##################################################### DOM Manipulations ###################################################################

let boardEl = document.querySelector("#board");
let allCellEls = document.querySelectorAll(".board-cell");
// console.log(allCellEls)


// let cell00 = document.querySelector("#cl00");
// let cell01 = document.querySelector("#cl01");
// let cell02 = document.querySelector("#cl02");
// let cell03 = document.querySelector("#cl03");
// let cell10 = document.querySelector("#cl10");
// let cell11 = document.querySelector("#cl11");
// let cell12 = document.querySelector("#cl12");
// let cell13 = document.querySelector("#cl13");
// let cell20 = document.querySelector("#cl20");
// let cell21 = document.querySelector("#cl21");
// let cell22 = document.querySelector("#cl22");
// let cell23 = document.querySelector("#cl23");
// let cell30 = document.querySelector("#cl30");
// let cell31 = document.querySelector("#cl31");
// let cell32 = document.querySelector("#cl32");
// let cell33 = document.querySelector("#cl33");

let controlsEl = document.querySelector(".controls");
let mainEl = document.querySelector("main");

// controlls
let upBtn = document.querySelector(".up");
let downBtn = document.querySelector(".down");
let rightBtn = document.querySelector(".right");
let leftBtn = document.querySelector(".left");
let scoreEl = document.querySelector(".score");
let maxScoreEl = document.querySelector(".maxScore");
let resetEl = document.querySelector(".new-game");

mainEl.addEventListener('click', handleClick);

// mainEl.addEventListener('click', handleClick);
let columns = play2048.getBoard()[0].length;
let rows = play2048.getBoard().length;


function updateBoard() {
    scoreEl.textContent = play2048.game.getScore();
    maxScoreEl.textContent = play2048.getMaxScore();
    let k = 0;
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            allCellEls[k].textContent = play2048.getBoard()[i][j];
            if(allCellEls[k].textContent == 0){
                allCellEls[k].textContent = "";
            }
            k++
        }
    }
}
updateBoard()

function handleClick(event) {
    let element = event.target;

    if (element === upBtn) {
        play2048.move("w")
        updateBoard()

    }
    else if (element === downBtn) {
        play2048.move("s")
        updateBoard()
    }
    else if (element === rightBtn) {
        play2048.move("d")
        updateBoard()
    }
    else if (element === leftBtn) {
        play2048.move("a")
        updateBoard()
    }
    else if (element === resetEl){
        play2048.restart()
        updateBoard()
        console.log("here 1")
    }
}