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
    }

    // Move: Left 
    moveLeft() {
        this.board = this.transpose(this.board);
        this.board = this.sweepColumnUp(this.board);
        this.board = this.transpose(this.board)
    }

    // Move: Down
    moveDown() {
        this.board = this.board.reverse();
        this.board = this.sweepColumnUp(this.board);
        this.board = this.board.reverse();    // ???? check if this works, otherwise will asign it to a variable first
    }

    // Move: Right
    moveRight() {
        this.board = this.transpose(this.board).reverse();
        this.board = this.sweepColumnUp(this.board)
        this.board =  this.transpose(this.board.reverse())
    }

    recordScore(){
        this.score = Math.max([this.board[0], this.board[1], this.board[2], this.board[3]]);
    }

    getScore(){
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

    // to plug in value at any position with current value of 0
    plugInValForA0(gameBoard, val = 2) {
        let allZeroIndexes = this.getAllValIndexes(gameBoard, 0);
        let plugIndex = allZeroIndexes[Math.floor(Math.random() * allZeroIndexes.length)]
        gameBoard[plugIndex[0]][plugIndex[1]] = val;
        return gameBoard;
    }

    // Find all 0s locations on the array given;
    getAllValIndexes(array, val = 0) {
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
        // plug in 2 at two random positions
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
    constructor(){
        this.board = new Game2048();
        this.maxScore = 0;
        this.pastScores = [];
    }
    // Reminder: wait for the user input [up, down, left, or right] and/or [w, s, a, d]

    // ##################### RUN this to process each user input
    move(moveDirectionInput) { //['w','s','a','d']
        // [w, s, a, d]
        if (moveDirectionInput == 'w' || moveDirectionInput == 'W') { // up 
            this.board.moveUp()  // process the move
            console.log("Move: up")          // 
            this.checkGameStatus();               // after the move, check the game status againest the rules
            this.board.recordScore();        // record the current score for the current game
            return this.board;
        }
        else if (moveDirectionInput == "a" || moveDirectionInput == "A") { // left
            this.board.moveLeft();
            console.log("Move: right")
            this.checkGameStatus()
            this.board.recordScore();
            return this.board;
        }
        else if (moveDirectionInput == 's' || moveDirectionInput == 'S') { // down
            this.board.moveDown();
            console.log("Move: down")
            this.checkGameStatus()
            this.board.recordScore();
            return this.board;
        }
        else if (moveDirectionInput == 'd' || moveDirectionInput == 'D') { // right
            this.board.moveRight();
            console.log("Move: left")
            this.checkGameStatus()
            this.board.recordScore();
            return this.board;
        }
    }

    // ######################### Game Status:
    checkGameStatus() {
        // check if any of the cells value is == 2048
        for (let i = 0; i < this.board.length; i++) {
            for (let j = 0; j < this.board[0].length; j++) {
                if (this.board[i][j] == 2048) {
                    console.log("GAME OVER")
                    console.log("You Won!")
                    return 1;
                }
            }
        }
        // else { check if the grid is full of numbers and no adjusent numbers are equal
        // => "You Lost!" }

        let zeroIndexes = this.board.getAllValIndexes(this.board, 0);

        if (zeroIndexes != null) {
            console.log("continue playing")
            return 0;
        }
        if (zeroIndexes == null) {
            // if no adjucent 2 indxes values are equal;
            let i, j, k;

            for (i = 0; i < (this.board.length - 1); i++) {
                for (j = 0; j < (this.board[i].length - 1); j++) {
                    if (this.board[i][j] == this.board[i][j + 1]) {
                        console.log("continue playing");
                        return 0;
                    }
                }
                for (k = 0; k < (this.board[i].length); k++) {
                    if (this.board[i][k] == this.board[i + 1][k]) {
                        console.log("continue playing");
                        return 0;
                    }
                }
            }
        }
        console.log("GAME OVER")
        console.log("You Lost!")
        return -1; // 
    }

    // Restart the board, maxScore won't be reset
    restart() {
        this.board.recordScore();
        this.pastScores.push(this.board.getScore());
        this.board = new Game2048();
        console.log("GAME RESTARTED.")
    }

    // getter methods:
    getBoard(){
        return this.board;
    }
    getMaxScore(){
        return this.maxScore;
    }
    getPastScores(){
        return this.pastScores;
    }
    printGameBoard() { // print formated game board to the console. 
        console.log(
            `               ---------
                  | ${this.board[0]} |
                  | ${this.board[1]} |
                  | ${this.board[2]} |
                  | ${this.board[3]} | 
                   ---------`);
    }

    setMaxScore(){ // calculates and sets the max past score, maxScore
        this.maxScore = Math.max(this.pastScores);
    }
}







// ############### FOR TEST

// NOTE: THE Functions WORK ON ALL MOVEMENTS NOW

// let board2048 = [[2, 2, 2, 2], [8, 0, 8, 7], [0, 8, 0, 0], [2, 0, 2, 16]];
// printGameBoard(board2048)

// board2048 = move(board2048, 'd')
// printGameBoard(board2048)

// board2048 = plugInValForA0(board2048)
// printGameBoard(board2048);
// checkGameStatus(board2048)

// board2048 = move(board2048, 'd')
// printGameBoard(board2048);

// board2048 = plugInValForA0(board2048)
// printGameBoard(board2048);
// checkGameStatus(board2048)

let play2048 = new GameDirector();
console.log(play2048);
play2048.getBoard();
play2048.printGameBoard()

play2048.move("W")
play2048.getBoard();

play2048.move("W")
play2048.getBoard();

play2048.move("W")
play2048.getBoard();

play2048.move("W")
play2048.getBoard();

play2048.move("W")
play2048.getBoard();


play2048.printGameBoard()



