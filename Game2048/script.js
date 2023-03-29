// Game: 2048

// at starting
// ######################### Generate a 4X4 array with all zerros but two 2s at random positions

let board2048 = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];

// put two 2s at random positions
const rowLength = 4;
const colmLength = 4;
function generateRandCell() {
    let randRow = Math.floor(Math.random() * rowLength);
    let randColm = Math.floor(Math.random() * colmLength);
    return [randRow, randColm]
}

let [randRow, randColm] = generateRandCell();
// console.log(randRow + ", "+ randColm)
board2048[randRow][randColm] = 2;

[randRow, randColm] = generateRandCell();
// console.log(randRow + ", "+ randColm)
board2048[randRow][randColm] = 2;


//  ######################### Board printing format 

function printGameBoard(gameBoard) {
    console.log(
        `               ---------
              | ${gameBoard[0]} |
              | ${gameBoard[1]} |
              | ${gameBoard[2]} |
              | ${gameBoard[3]} | 
               ---------`);
}


// ######################### Game Status:

function checkGameStatus(gameBoard) {
    // check if any of the cells value is == 2048
    for (let i = 0; i < rowLength; i++) {
        for (let j = 0; j < rowLength; j++) {
            if (gameBoard[i][j] == 2048) {
                console.log("GAME OVER")
                console.log("You Won!")
                return 1; 
            }
        }
    }
    // else { check if the grid is full of numbers and no adjusent numbers are equal
    // => "You Lost!" }
    
    let zeroIndexes = getAllValIndexes(gameBoard, val = 0);

    if (zeroIndexes != null){
        console.log("continue playing")
        return 0;
    }
    if (zeroIndexes == null) {   
        // if no adjucent 2 indxes values are equal;
        let i, j, k;
        
        for(i=0;i<(gameBoard.length-1); i++){
            for(j=0; j<(gameBoard[i].length-1); j++){
                if(gameBoard[i][j] == gameBoard[i][j+1]){
                    console.log("continue playing");
                    return 0;
                }
            }
            for(k=0; k<(gameBoard[i].length); k++){
                if(gameBoard[i][k] == gameBoard[i+1][k]){
                    console.log("continue playing");
                    return 0;
                }
            }
        }
    }
    return -1;
}


// wait for the user input [up, down, left, or right] and/or [w, s, a, d]




// sweepColumnUp() is the original algorithm, and it is for the 'Up' move.
// For all the other moves (down, left, right) the array gets transposed/reversed as necessary. Then,  
// the sweepColumnUp() is used to sweep through the numbers. And finally, the returned arra is 
// transposed/reversed to arrive to the resulting final array. 

// Move: Up 
function sweepColumnUp(gameBoard) {
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

// Move: Left 
function leftMove(gameBoard) {
    let transposedGameboard = transpose(gameBoard);
    sweepColumnUp(transposedGameboard);
    return transpose(transposedGameboard)
}
// Move: Down
function downMove(gameBoard) {
    let reversed = gameBoard.reverse();
    sweepColumnUp(reversed);
    return reversed.reverse();
}

// Move: Right
function rightMove(gameBoard) {
    let rotated = transpose(gameBoard).reverse();
    sweepColumnUp(rotated)
    return transpose(rotated.reverse())
}


// for transposing an array 
function transpose(array) {
    return array[0].map((_, colIndex) => array.map(row => row[colIndex]));
}


// ##################### RUN this to process each user input
function move(gameBoard, moveDerectionInput) { //['w','s','a','d']
    // [w, s, a, d]
    if (moveDerectionInput == 'w' || moveDerectionInput == 'W') { // up 
        gameBoard = sweepColumnUp(gameBoard)
        console.log("Move: up")
        return gameBoard;
    }
    else if (moveDerectionInput == "a" || moveDerectionInput == "A") { // left
        gameBoard = leftMove(gameBoard);
        console.log("Move: right")
        return gameBoard;
    }
    else if (moveDerectionInput == 's' || moveDerectionInput == 'S') {
        gameBoard = downMove(gameBoard);
        console.log("Move: down")
        return gameBoard;
    }
    else if (moveDerectionInput == 'd' || moveDerectionInput == 'D') {
        gameBoard = rightMove(gameBoard);
        console.log("Move: left")
        return gameBoard;
    }
}
// Find each 0 locations on the array after each move;
function getAllValIndexes(array, val = 0) {
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

function plugInValForA0(gameBoard, val=2){
    let allZeroIndexes = getAllValIndexes(board2048, 0);
    let plugIndex = allZeroIndexes[Math.floor(Math.random() * allZeroIndexes.length)]
    gameBoard[plugIndex[0]][plugIndex[1]] = val;
    return gameBoard;
}



// ############### FOR TEST

// NOTE: THE Functions WORK ON ALL MOVEMENTS NOW

board2048 = [[8, 0, 4, 4], [8, 0, 8, 7], [0, 8, 0, 0], [2, 0, 2, 16]];
printGameBoard(board2048)

board2048 = move(board2048, 'w')
printGameBoard(board2048)

board2048 = plugInValForA0(board2048)
printGameBoard(board2048);
checkGameStatus(board2048)

board2048 = move(board2048, 'd')
printGameBoard(board2048);

board2048 = plugInValForA0(board2048)
printGameBoard(board2048);
checkGameStatus(board2048)

