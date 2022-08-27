const LINE_PX_CT = 40;
const TOTAL_PX_CT = LINE_PX_CT ** 2;

let sumFoodEat = 0;
let sumDistTrav = 0;

const gameContainer = document.getElementById('gameContainer');

function createGameBoardPx() {
    for (let i = 1; i <= TOTAL_PX_CT; i++) {
        gameContainer.innerHTML = `${gameContainer.innerHTML} <div class="gameBoardPixel" id="pixel${i}"</div>`
    }

}