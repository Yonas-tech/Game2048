// Game: 2048
// at starting
// generate a 4X4 array with all zerros 
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



// show it to the user
function printGameBoard(gameBoard) {
    console.log(
        `               ---------
              | ${gameBoard[0]} |
              | ${gameBoard[1]} |
              | ${gameBoard[2]} |
              | ${gameBoard[3]} | 
               ---------`);
}


function checkGameStatus(gameBoard) {
    // check if any of the cells value is == 2048
    for (let i = 0; i <= rowLength; i++) {
        for (let j = 0; j <= rowLength; j++) {
            if (gameBoard[i][j] == 2048) {
                console.log("GAME OVER")
                console.log("You Won!")
            }
        }
    }
    // else { check if the grid is full of numbers and no adjusent numbers are equal
    // => "You Lost!" }


}


// wait for the user input [up, down, left, or right] and/or [w, s, a, d]




// if w => sweep up adding and moving the numbers {

function sweepColumnUp(gameBoard) {
    for (let i = 0; i < gameBoard[0].length; i++) {
        if (gameBoard[0][i] == gameBoard[1][i] && gameBoard[0][i] != 0) {
            gameBoard[0][i] = gameBoard[0][i] + gameBoard[1][i];
            console.log('condition1')
            if (gameBoard[2][i] == gameBoard[3][i]) {
                gameBoard[1][i] = gameBoard[2][i] + gameBoard[3][i];
                gameBoard[2][i] = 0;
                gameBoard[3][i] = 0;
                console.log('condition1-2')
            }
            else {
                if (gameBoard[2][i] != 0) {
                    gameBoard[1][i] = gameBoard[2][i];
                    gameBoard[2][i] = gameBoard[3][i];
                    console.log('condition1-3')
                }
                else {
                    gameBoard[1][i] = gameBoard[3][i];
                    gameBoard[2][i] = 0;
                    console.log('condition1-4')
                }
                gameBoard[3][i] = 0;
            }
        }
        else if (gameBoard[1][i] == gameBoard[2][i] && gameBoard[1][i] != 0) {
            console.log('condition2')
            if (gameBoard[0][i] == 0) {
                gameBoard[0][i] = gameBoard[1][i] + gameBoard[2][i];
                gameBoard[1][i] = gameBoard[3][i];
                gameBoard[2][i] = 0;
                gameBoard[3][i] = 0;
                console.log('condition2-1')
            }
            else { // gameBoard[0][i] is already nonzero
                gameBoard[1][i] = gameBoard[1][i] + gameBoard[2][i];
                gameBoard[2][i] = gameBoard[3][i];
                gameBoard[3][i] = 0;
                console.log('condition2-2')
            }
        }

        else if (gameBoard[0][i] == gameBoard[2][i] && gameBoard[1][i] == 0 && gameBoard[0][i] != 0) {
            gameBoard[0][i] = gameBoard[0][i] + gameBoard[2][i];
            gameBoard[1][i] = gameBoard[3][i];
            gameBoard[2][i] = 0;
            gameBoard[3][i] = 0;
            console.log('condition3')
        }
        else if (gameBoard[0][i] == gameBoard[3][i] && gameBoard[1][i] == 0 && gameBoard[2][i] == 0) {
            gameBoard[0][i] = gameBoard[0][i] + gameBoard[3][i];
            //gameBoard[1][i] = 0; // already 0
            //gameBoard[2][i] = 0; // already 0
            gameBoard[3][i] = 0;
            console.log('condition4')
        }

        else if (gameBoard[1][i] == gameBoard[3][i] && gameBoard[2][i] == 0) {
            console.log('condition5')
            if (gameBoard[0][i] == 0) {
                gameBoard[0][i] = gameBoard[1][i] + gameBoard[3][i];
                gameBoard[1][i] = 0;
                //gameBoard[2][i] = 0; // already 0 
                console.log('condition5-1')
            }
            else {
                gameBoard[1][i] = gameBoard[1][i] + gameBoard[3][i];
                // gameBoard[0][i] = stays non-zero 
                // gameBoard[2][i] = 0; // already 0 
                console.log('condition5-2')
            }
            gameBoard[3][i] = 0;
        }

        else if (gameBoard[2][i] == gameBoard[3][i] && gameBoard[2][i] != 0) {
            console.log('condition6')
            if (gameBoard[0][i] == 0 && gameBoard[1][i] == 0) {
                gameBoard[0][i] = gameBoard[2][i] + gameBoard[3][i];
                gameBoard[1][i] = 0;
                gameBoard[2][i] = 0;
                gameBoard[3][i] = 0;
                console.log('condition6-1')
            }
            else if (gameBoard[0][i] == 0 && gameBoard[1][i] != 0) { // ;
                gameBoard[0][i] = gameBoard[1][i];
                gameBoard[1][i] = gameBoard[2][i] + gameBoard[3][i];
                gameBoard[2][i] = 0;
                gameBoard[3][i] = 0;
                console.log('condition6-2')
            }
            else if (gameBoard[0][i] != 0 && gameBoard[1][i] == 0) { // ;
                // gameBoard[0][i] = gameBoard[0][i]; //the same
                gameBoard[1][i] = gameBoard[2][i] + gameBoard[3][i];
                gameBoard[2][i] = 0;
                gameBoard[3][i] = 0;
                console.log('condition6-3')
            }
            else if (gameBoard[0][i] != 0 && gameBoard[1][i] != 0) { // ;
                // gameBoard[0][i] = gameBoard[0][i]; //the same
                // gameBoard[1][i] = gameBoard[1][i]; //the same
                gameBoard[2][i] = gameBoard[2][i] + gameBoard[3][i];
                gameBoard[3][i] = 0;
                console.log('condition6-4')
            }
        }

        // if there is only 1 number at one of the cells along the column: while val(0,0) ==0 
        else if (gameBoard[0][i] == 0 && gameBoard[1][i] != 0) {
            console.log('condition7')
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
            console.log('condition8')
            gameBoard[0][i] = gameBoard[2][i];
            gameBoard[1][i] = gameBoard[3][i]
            gameBoard[2][i] = 0;
            gameBoard[3][i] = 0;
        }
        else if (gameBoard[0][i] == 0 && gameBoard[1][i] == 0 && gameBoard[2][i] == 0 && gameBoard[3][i] != 0) {
            console.log('condition9')
            gameBoard[0][i] = gameBoard[3][i];
            gameBoard[1][i] = 0
            gameBoard[2][i] = 0
            gameBoard[3][i] = 0;
        }

        // if there is 1 number at one of the cells along the column: while val(0,0) !=0 && != THAT NUMBER
        else if (gameBoard[0][i] != 0 && gameBoard[1][i] == 0 && gameBoard[2][i] != 0) {
            console.log('condition10')
            gameBoard[1][i] = gameBoard[2][i];
            gameBoard[2][i] = gameBoard[3][i]
            gameBoard[3][i] = 0;
        }
        else if (gameBoard[0][i] != 0 && gameBoard[1][i] == 0 && gameBoard[2][i] == 0 && gameBoard[3][i] != 0) {
            console.log('condition11')
            gameBoard[1][i] = gameBoard[3][i];
            gameBoard[2][i] = 0
            gameBoard[3][i] = 0
        }

        else if (gameBoard[0][i] != 0 && gameBoard[1][i] != 0 && gameBoard[2][i] == 0 && gameBoard[3][i] != 0) {
            console.log('condition11')
            gameBoard[2][i] = gameBoard[3][i];
            gameBoard[3][i] = 0
        }
    }
    return gameBoard;
}

// Left Move function
function leftMove(gameBoard){
    let transposedGameboard = transpose(gameBoard);
    sweepColumnUp(transposedGameboard);
    return transpose(transposedGameboard)
}
// down Move 
function downMove(gameBoard){
    let reversed = gameBoard.reverse();
    sweepColumnUp(reversed);
    return reversed.reverse();
}




function transpose(array){
    return array[0].map((_, colIndex) => array.map(row => row[colIndex]));
}




// FOR TEST

// THE Functions WORK ONLY ON UP MOVEMENT NOW
// LATER ON, IT WILL GO THROUGHT A LOOP TO WORK FOR ALL THE COLUMNS 



let userInput = 's'; // this will change

board2048 = [[8, 0, 4, 4], [8, 0, 8, 7], [0, 8, 0, 0], [2, 0, 2, 16]];
printGameBoard(board2048)

// [w, s, a, d]
if (userInput == 'w') { // up 
    board2048 = sweepColumnUp(board2048)
    printGameBoard(board2048);
}
else if(userInput == "a"){ // left
    board2048 = leftMove(board2048);
    printGameBoard(board2048);
}
else if(userInput == 's'){
    board2048 = downMove(board2048);
    printGameBoard(board2048);
}






// printGameBoard()

        // if there are adjusent tiles with same nonzero values(columsize) 
            // column 0

            // column 1

            // column 2

            // column 3

        // if nothing other than 0s are in between the two tiles
            // add the numbers (=4)
            // put it all the way to the top of the calumn
        // select a random cell with >0
        // change the value to 2
        // return the result
        // }



// else if s => { ...
    //
    // }
// else if a => { ...
    //
    // }
// else if d => { ...
    //
    // }
// else => { no response}

// wait for next valid key from user

