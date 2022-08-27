// global variables to change game board size
const LINE_PX_CT = 40;
const TOTAL_PX_CT = LINE_PX_CT ** 2;

// scoreboard... scores, displays for player
let sumFoodEat = 0;
let sumDistTrav = 0;

// stores game board into variable
const gameContainer = document.getElementById('gameContainer');

// creates the game board
function createGameBoardPx() {
    for (let i = 1; i <= TOTAL_PX_CT; i++) {
        gameContainer.innerHTML = `${gameContainer.innerHTML} <div class="gameBoardPixel" id="pixel${i}"</div>`;
    }
}

// stores game pixels
const gameBoardPixel = document.getElementsByClassName('gameBoardPixel');

let currentFoodPos = 0;

// randomly generates food on board
function makeFood() {
    gameBoardPixel[currentFoodPos].classList.remove('food');
    currentFoodPos = Math.floor(Math.random() * TOTAL_PX_CT);
    gameBoardPixel[currentFoodPos].classList.add('food');
}

// setting snek behavior
const LEFT_DIR = 37;
const UP_DIR = 38;
const RIGHT_DIR = 39;
const DOWN_DIR = 40;

let snekCurDir = RIGHT_DIR;
