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

// validates user input direction and change snek direction
function altDir(newDir) {
    if (newDir == snekCurDir) {
        return;
    }
    if (newDir == LEFT_DIR && snekCurDir !== RIGHT_DIR) {
        snekCurDir = newDir;
    } else if (newDir == UP_DIR && snekCurDir !== DOWN_DIR) {
        snekCurDir = newDir;
    } else if (newDir === RIGHT_DIR && snekCurDir !== LEFT_DIR) {
        snekCurDir = newDir;
    } else if (newDir === DOWN_DIR && snekCurDir !== UP_DIR) {
        snekCurDir = newDir;
    }
}

// set start point for snek on load
let curHeadPos = TOTAL_PX_CT/2;

// set initial length
let snekLength = 200;

// starts moving snek, wraps around game board
function moveSnake() {
    switch(snekCurDir) {
        case LEFT_DIR:
            --curHeadPos;
            const headAtLeft = curHeadPos % LINE_PX_CT == LINE_PX_CT - 1 || curHeadPos < 0;
            if (headAtLeft) {
                curHeadPos += LINE_PX_CT;
            }
        break;
        case RIGHT_DIR:
            ++curHeadPos;
            const headAtRight = curHeadPos % LINE_PX_CT == 0;
            if (headAtRight) {
                curHeadPos -= LINE_PX_CT;
            }
        break;
        case UP_DIR:
            curHeadPos -= LINE_PX_CT;
            const headAtTop = curHeadPos < 0;
            if (headAtTop) {
                curHeadPos += TOTAL_PX_CT;
            }
        break;
        case DOWN_DIR:
            curHeadPos += LINE_PX_CT;
            const headAtBot = curHeadPos > TOTAL_PX_CT - 1;
            if (headAtBot) {
                curHeadPos -= TOTAL_PX_CT
            }
        break;
        default:
        break;
    }

    // find correct pixel within game board
    let nextSnekHeadPixel = gameBoardPixel[curHeadPos];

    // check if snek head will eat itself
    if (nextSnekHeadPixel.classList.contains('snakeBodyPixel')) {
        // clearInterval(moveSnekInterval);
        alert(`Game Over! Your snake has eaten ${sumFoodEat} food and traveled ${sumDistTrav} blocks.`);
        curHeadPos = TOTAL_PX_CT/2;
        sumFoodEat = 0;
        sumDistTrav = 0;
        snekLength = 200;
        snekCurDir = RIGHT_DIR;
    }

    // if next empty pixel, added snake body styling
    nextSnekHeadPixel.classList.add('snakeBodyPixel');

    // controls snek length
    setTimeout(() => {
        nextSnekHeadPixel.classList.remove('snakeBodyPixel')
    }, snekLength)

    // controls when snek eats food
    if (curHeadPos === currentFoodPos) {
        sumFoodEat++;
        document.getElementById("pointsEarned").innerText = sumFoodEat;
        snekLength = snekLength + 100;
        makeFood();
    }

    sumDistTrav++;
    document.getElementById('pointsTraveled').innerText = sumDistTrav;
}

//starts game
createGameBoardPx();

makeFood();

// set animation speed
let moveSnekInterval = setInterval(moveSnake, 100);

addEventListener("keydown", e => altDir(e.keyCode))

// add variables for on-screen button
const leftButton = document.getElementById('leftButton')
const upButton = document.getElementById('upButton')
const downButton = document.getElementById('downButton')
const rightButton = document.getElementById('rightButton')

// add listeners for on-screen buttons
leftButton.onclick = () => altDir(LEFT_DIR)
upButton.onclick = () => altDir(UP_DIR)
downButton.onclick = () => altDir(DOWN_DIR)
rightButton.onclick = () => altDir(RIGHT_DIR)