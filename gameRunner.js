// ############################################### Instanciate GameDirector

let play2048 = new GameDirector();


// ############################################### DOM Manipulations ###################################################################

// Game board elements
const boardEl = document.querySelector("#board");
const allCellEls = document.querySelectorAll(".board-cell");
//
const mainEl = document.querySelector("main");
const overlayEl = document.querySelector(".overlay");
// controlls
const controlsEl = document.querySelector(".controls");
const upBtn = document.querySelector(".up");
const downBtn = document.querySelector(".down");
const rightBtn = document.querySelector(".right");
const leftBtn = document.querySelector(".left");
// scores
const scoreEl = document.querySelector(".score");
const maxScoreEl = document.querySelector(".max-score");
// reset
const resetEl = document.querySelector(".new-game");
// Event Listeners:
mainEl.addEventListener('click', handleClick);
document.addEventListener('keydown', handleKeyboard);


const columns = play2048.getBoard()[0].length;
const rows = play2048.getBoard().length;

// Handling on-screen game buttons and a reset button: 
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

// Handling keyboard control keys: 
function handleKeyboard(event) {
    const moveKeys = ['ArrowLeft', 'KeyA', 'ArrowDown', 'KeyS', 'ArrowUp', 'KeyW', 'ArrowRight', 'KeyD'];
    if (play2048.status == 0) {
        const keyName = event.code;
        if (moveKeys.indexOf(keyName) != -1) {
            play2048.move(keyName);
            updateBoard();
            checkGameStatus();
            //on screen button effects
        }
    }
}

// check Game Status(win/loose/continue playing)
function checkGameStatus(){
    play2048.gameStatus();
    if (play2048.status == -1 || play2048.status == 1) {
        console.log("here 4");
        gameOver(play2048.status);
    }
}

// Update the board while playing
function updateBoard() {
    let cellColors = {0:'#DBD5B5', 2:'#83BAB4', 4:'#2B9EB3', 8:'#94A562', 16:'#FCAB10', 32:'#FB8D1B',
    64:'#FA6F26', 128:'#F8333C', 256:'#44AF69', 512:'#F5AA6D', 1024:'#F68E63', 2048:'#F9564F'}//, '#B33F62'}
    let cellVal;
    scoreEl.textContent = play2048.game.getScore();
    maxScoreEl.textContent = play2048.getMaxScore();
    let k = 0;
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            allCellEls[k].textContent = play2048.getBoard()[i][j];
            // update cell colors
            cellVal = allCellEls[k].textContent;
            allCellEls[k].style.backgroundColor = cellColors[Number(cellVal)];
            // hide the 0s
            if (allCellEls[k].textContent == 0) {
                allCellEls[k].textContent = "";
            }
            k++
        }
    }

}
updateBoard()

// Handling Game Over and Restart:
const gameOverMsg = document.createElement('p');
const gameOverMsgEl = document.querySelector(".game-over-msg");
const gameOverScreen = document.querySelector(".game-over-screen");
function gameOver(status) { // -1 or 1
    if (status == -1) {
        gameOverMsg.textContent = "You Lost.";
        gameOverMsgEl.appendChild(gameOverMsg);
        overlayEl.style.width = "100%";
        
    }
    else if (status == 1) {
        gameOverMsg.textContent = "You Won.";
        gameOverMsgEl.appendChild(gameOverMsg);
        overlayEl.style.width = "100%";//"580px";
        gameOverScreen.style.backgroundColor = "rgb(97,231,134,0.7)"
        resetEl.style.visibility= "hidden"
    }

    // Restart after the game is over:
    const restartDiv = document.querySelector(".restart-div")
    let winnerMsgEl = document.querySelector(".winnerMsg");
    const restartEl = document.querySelector(".restart");
    console.log(winnerMsgEl)
    resetEl.style.visibility= "hidden" // hide the "New Game" reset button
    //
    restartDiv.addEventListener("click",
    (e) => {
        if(e.target == restartEl){
            overlayEl.style.width = "0";
            play2048.restart();
            updateBoard();
            console.log("here 6");
            resetEl.style.visibility= "visible";
        }
    })
}


// $("#ArrowLeft").bind('change keypress', function(e){
//     // your code
//   });

