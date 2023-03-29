// Game: 2048
// at starting
// generate a 4X4 array with all zerros 
let gameBoard = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];

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
gameBoard[randRow][randColm] = 2;

[randRow, randColm] = generateRandCell();
// console.log(randRow + ", "+ randColm)
gameBoard[randRow][randColm] = 2;


// show it to the user
function printGameBoard(){
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


// FOR TEST
gameBoard = [[8, 0, 0, 0], [2, 0, 0, 0], [0, 0, 0, 0], [4, 0, 0, 0]];
printGameBoard()


// THE FOLLOWING WORKS ONLY ON COLUMN 0 RIGHT NOW
// LATER ON, IT WILL GO THROUGHT A LOOP TO WORK FOR ALL THE COLUMNS 


// wait for the user input [up, down, left, or right] and/or [w, s, a, d]
let userInput = 'w'; // this will change

// if w => move the 2s up {
if (userInput == 'w') {
    if (gameBoard[0][0] == gameBoard[1][0] && gameBoard[0][0]!=0) {
        gameBoard[0][0] = gameBoard[0][0] + gameBoard[1][0];
        console.log('condition1')
        if (gameBoard[2][0] == gameBoard[3][0]) {
            gameBoard[1][0] = gameBoard[2][0] + gameBoard[3][0];
            gameBoard[2][0] = 0;
            gameBoard[3][0] = 0;
            console.log('condition1-2')
        }
        else {
            if(gameBoard[2][0]!= 0) { 
                gameBoard[1][0] = gameBoard[2][0];
                gameBoard[2][0] = gameBoard[3][0];
                console.log('condition1-3')
            } 
            else{
                gameBoard[1][0] = gameBoard[3][0];
                gameBoard[2][0] = 0;
                console.log('condition1-4')
            }
            gameBoard[3][0] = 0; 
        }
    }
    else if (gameBoard[1][0] == gameBoard[2][0] && gameBoard[1][0]!=0) {
        console.log('condition2')
        if (gameBoard[0][0] == 0) {
            gameBoard[0][0] = gameBoard[1][0] + gameBoard[2][0];
            gameBoard[1][0] = gameBoard[3][0];
            gameBoard[2][0] = 0;
            gameBoard[3][0] = 0;
            console.log('condition2-1')
        }
        else { // gameBoard[0][0] is already nonzero
            gameBoard[1][0] = gameBoard[1][0] + gameBoard[2][0];
            gameBoard[2][0] = gameBoard[3][0];
            gameBoard[3][0] = 0;
            console.log('condition2-2')
        }
    }

    else if (gameBoard[0][0] == gameBoard[2][0] && gameBoard[1][0] == 0 && gameBoard[0][0]!= 0) {
        gameBoard[0][0] = gameBoard[0][0] + gameBoard[2][0];
        gameBoard[1][0] = gameBoard[3][0];
        gameBoard[2][0] = 0;
        gameBoard[3][0] = 0;
        console.log('condition3')
    }
    else if (gameBoard[0][0] == gameBoard[3][0] && gameBoard[1][0] == 0 && gameBoard[2][0] == 0) {
        gameBoard[0][0] = gameBoard[0][0] + gameBoard[3][0];
        //gameBoard[1][0] = 0; // already 0
        //gameBoard[2][0] = 0; // already 0
        gameBoard[3][0] = 0;
        console.log('condition4')
    }

    else if (gameBoard[1][0] == gameBoard[3][0] && gameBoard[2][0] == 0) {
        console.log('condition5')
        if (gameBoard[0][0] == 0) {
            gameBoard[0][0] = gameBoard[1][0] + gameBoard[3][0];
            gameBoard[1][0] = 0;
            //gameBoard[2][0] = 0; // already 0 
            console.log('condition5-1')
        }
        else {
            gameBoard[1][0] = gameBoard[1][0] + gameBoard[3][0];
            // gameBoard[0][0] = stays non-zero 
            // gameBoard[2][0] = 0; // already 0 
            console.log('condition5-2')
        }
        gameBoard[3][0] = 0;
    }

    else if (gameBoard[2][0] == gameBoard[3][0] && gameBoard[2][0]!=0) {
        console.log('condition6')
        if (gameBoard[0][0] == 0 && gameBoard[1][0] == 0) {
            gameBoard[0][0] = gameBoard[2][0] + gameBoard[3][0];
            gameBoard[1][0] = 0;
            gameBoard[2][0] = 0;
            gameBoard[3][0] = 0;
            console.log('condition6-1')
        }
        else if (gameBoard[0][0] == 0 && gameBoard[1][0] != 0) { // ;
            gameBoard[0][0] = gameBoard[1][0];
            gameBoard[1][0] = gameBoard[2][0] + gameBoard[3][0];
            gameBoard[2][0] = 0;
            gameBoard[3][0] = 0;
            console.log('condition6-2')
        }
        else if (gameBoard[0][0] != 0 && gameBoard[1][0] == 0) { // ;
            // gameBoard[0][0] = gameBoard[0][0]; //the same
            gameBoard[1][0] = gameBoard[2][0] + gameBoard[3][0];
            gameBoard[2][0] = 0;
            gameBoard[3][0] = 0;
            console.log('condition6-3')
        }
        else if (gameBoard[0][0] != 0 && gameBoard[1][0] != 0) { // ;
            // gameBoard[0][0] = gameBoard[0][0]; //the same
            // gameBoard[1][0] = gameBoard[1][0]; //the same
            gameBoard[2][0] = gameBoard[2][0] + gameBoard[3][0];
            gameBoard[3][0] = 0;
            console.log('condition6-4')
        }
    }

    // if there is only 1 number at one of the cells along the column: while val(0,0) ==0 
    else if(gameBoard[0][0] == 0 && gameBoard[1][0] !=0 ){
        console.log('condition7')
        gameBoard[0][0] = gameBoard[1][0];
        if(gameBoard[2][0]!=0){
            gameBoard[1][0] = gameBoard[2][0]
            gameBoard[2][0] = gameBoard[3][0]
        }
        else{
            gameBoard[1][0] = gameBoard[3][0]
            gameBoard[2][0] = 0
        }
        gameBoard[3][0] = 0;
    }
    else if(gameBoard[0][0] == 0 && gameBoard[1][0] ==0 && gameBoard[2][0] !=0){
        console.log('condition8')
        gameBoard[0][0] = gameBoard[2][0];
        gameBoard[1][0] = gameBoard[3][0]
        gameBoard[2][0] = 0;
        gameBoard[3][0] = 0;
    }
    else if(gameBoard[0][0] == 0 && gameBoard[1][0] ==0 && gameBoard[2][0] ==0 && gameBoard[3][0] !=0){
        console.log('condition9')
        gameBoard[0][0] = gameBoard[3][0];
        gameBoard[1][0] = 0
        gameBoard[2][0] = 0
        gameBoard[3][0] = 0;
    }

    // if there is 1 number at one of the cells along the column: while val(0,0) !=0 && != THAT NUMBER
    else if(gameBoard[0][0] != 0 && gameBoard[1][0] ==0 && gameBoard[2][0] !=0){
        console.log('condition10')
        gameBoard[1][0] = gameBoard[2][0];
        gameBoard[2][0] = gameBoard[3][0]
        gameBoard[3][0] = 0;
    }
    else if(gameBoard[0][0] != 0 && gameBoard[1][0] ==0 && gameBoard[2][0] ==0 && gameBoard[3][0] !=0){
        console.log('condition11')
        gameBoard[1][0] = gameBoard[3][0];
        gameBoard[2][0] = 0
        gameBoard[3][0] = 0
    }

    else if(gameBoard[0][0] != 0 && gameBoard[1][0] !=0 && gameBoard[2][0] ==0 && gameBoard[3][0] !=0){
        console.log('condition11')
        gameBoard[2][0] = gameBoard[3][0];
        gameBoard[3][0] = 0
    }


}

printGameBoard()
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

