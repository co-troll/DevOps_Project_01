const canvas = document.querySelector("#board");
const ctx = canvas.getContext("2d");
const canvasHold = document.querySelector("#hold");
const ctxHold = canvasHold.getContext("2d");
const canvasNext = Array.from(document.querySelectorAll(".next"));
const ctxNext = canvasNext.map((value) => value.getContext("2d"));
const inputLevel = document.querySelector("#levelInput");
const playBtn = document.querySelector(".play-button");
let board = new Board(ctx, ctxHold, ctxNext);
let requestId = null;
let time = null;
let isHoldedThisTime = false;
let paused = null;
let accountValues = {
    score: 0,
    lines: 0,
    level: 0,
};
function Mobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}
const updateAccount = (key, value) => {
    let element = document.getElementById(key);
    if (element) {
        element.innerText = String(value);
    }
};
let account = new Proxy(accountValues, {
    set: (target, key, value) => {
        target[key] = value;
        updateAccount(key, value);
        return true;
    }
});
const moves = {
    [KEY.LSHIFT]: (p) => board.holdPiece(p),
    [KEY.LCTRL]: (p) => board.rotate(p, ROTATION.LEFT),
    [KEY.LALT]: (p) => board.rotate(p, ROTATION.RIGHT),
    [KEY.SPACE]: (p) => (Object.assign(Object.assign({}, p), { y: p.y + 1 })),
    [KEY.LEFT]: (p) => (Object.assign(Object.assign({}, p), { x: p.x - 1 })),
    [KEY.RIGHT]: (p) => (Object.assign(Object.assign({}, p), { x: p.x + 1 })),
    [KEY.DOWN]: (p) => (Object.assign(Object.assign({}, p), { y: p.y + 1 })),
};
const handleKeyPress = (event) => {
    if (event.keyCode == KEY.P) {
        if (playBtn.disabled)
            pause();
    }
    if (event.keyCode == KEY.ESC) {
        gameOver();
    }
    else if (moves[event.keyCode]) {
        event.preventDefault();
        if (paused) {
            return;
        }
        let p = moves[event.keyCode](board.piece);
        if (event.keyCode == KEY.SPACE) {
            if (!paused)
                harddropSound.play();
            else
                return;
            while (board.valid(p)) {
                account.score += POINTS.HARD_DROP;
                board.piece.move(p);
                p = moves[KEY.DOWN](board.piece);
            }
            board.piece.hardDrop();
        }
        else if (board.valid(p)) {
            if (paused)
                return;
            else {
                switch (event.keyCode) {
                    case KEY.LCTRL:
                    case KEY.LALT:
                        rotateSound.play();
                        break;
                    case KEY.DOWN:
                        softdropSound.play();
                        break;
                    case KEY.LEFT:
                    case KEY.RIGHT:
                        moveSound.play();
                        break;
                }
            }
            board.piece.move(p);
            if (event.keyCode == KEY.DOWN && !paused)
                account.score += POINTS.SOFT_DROP;
        }
    }
};
const handleBtnPress = (event) => {
    if (event == KEY.P) {
        if (playBtn.disabled)
            pause();
    }
    if (event == KEY.ESC) {
        gameOver();
    }
    else if (moves[event]) {
        event.preventDefault();
        if (paused) {
            return;
        }
        let p = moves[event.keyCode](board.piece);
        if (event.keyCode == KEY.SPACE) {
            if (!paused)
                harddropSound.play();
            else
                return;
            while (board.valid(p)) {
                account.score += POINTS.HARD_DROP;
                board.piece.move(p);
                p = moves[KEY.DOWN](board.piece);
            }
            board.piece.hardDrop();
        }
        else if (board.valid(p)) {
            if (paused)
                return;
            else {
                switch (event.keyCode) {
                    case KEY.LCTRL:
                    case KEY.LALT:
                        rotateSound.play();
                        break;
                    case KEY.DOWN:
                        softdropSound.play();
                        break;
                    case KEY.LEFT:
                    case KEY.RIGHT:
                        moveSound.play();
                        break;
                }
            }
            board.piece.move(p);
            if (event.keyCode == KEY.DOWN && !paused)
                account.score += POINTS.SOFT_DROP;
        }
    }
};
const initCanvas = () => {
    if (Mobile()) {
        ctxHold.canvas.width = 4 * (15 + 15 / 20) - 15 / 20;
        ctxHold.canvas.height = 4 * (15 + 15 / 20) - 15 / 20;
        ctxHold.scale(15, 15);
    }
    else {
        ctxHold.canvas.width = 4 * (BLOCK_SIZE + BORDER_SIZE) - BORDER_SIZE;
        ctxHold.canvas.height = 4 * (BLOCK_SIZE + BORDER_SIZE) - BORDER_SIZE;
        ctxHold.scale(BLOCK_SIZE, BLOCK_SIZE);
    }
    ctxNext.forEach((value) => {
        if (Mobile()) {
            value.canvas.width = 4 * (15 + 15 / 20) - 15 / 20;
            value.canvas.height = 4 * (15 + 15 / 20) - 15 / 20;
            value.scale(15, 15);
        }
        else {
            value.canvas.width = 4 * (BLOCK_SIZE + BORDER_SIZE) - BORDER_SIZE;
            value.canvas.height = 4 * (BLOCK_SIZE + BORDER_SIZE) - BORDER_SIZE;
            value.scale(BLOCK_SIZE, BLOCK_SIZE);
        }
    });
};
initCanvas();
const resetGame = () => {
    account.score = 0;
    account.lines = 0;
    if (!inputLevel.value)
        account.level = 0;
    else {
        console.log(inputLevel.value);
        account.level = Number(inputLevel.value);
    }
    console.clear();
    board.reset();
    time = { start: 0, elapsed: 0, level: LEVEL[account.level] };
    console.table(board.grid);
};
const play = () => {
    document.onkeydown = handleKeyPress;
    resetGame();
    if (requestId) {
        cancelAnimationFrame(requestId);
    }
    animate();
    playBtn.disabled = true;
    paused = false;
    backgroundSound.play();
};
const animate = (now = 0) => {
    time.elapsed = now - time.start;
    if (time.elapsed > time.level) {
        time.start = now;
        if (!board.drop()) {
            gameOver();
            return;
        }
    }
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    board.draw();
    requestId = requestAnimationFrame(animate);
};
const gameOver = () => {
    cancelAnimationFrame(requestId);
    ctx.fillStyle = 'black';
    ctx.fillRect(1, 3, 8 * 1.05 + 0.05, 1.2);
    ctx.font = '1px Arial';
    ctx.fillStyle = 'red';
    ctx.fillText('GAME OVER', 2 * 1.05, 4);
    playBtn.disabled = false;
    paused = true;
    sound.pause();
    gameoverSound.play();
    checkHighScore(account.score);
};
const pause = () => {
    if (!requestId) {
        paused = false;
        animate();
        if (account.level > 9) {
            sound.pause();
            backgroundfastSound.play();
        }
        else {
            backgroundSound.play();
        }
        return;
    }
    paused = true;
    cancelAnimationFrame(requestId);
    requestId = null;
    ctx.fillStyle = 'black';
    ctx.fillRect(1, 3, 8 * 1.05 + 0.05, 1.2);
    ctx.font = '1px Arial';
    ctx.fillStyle = 'yellow';
    ctx.fillText('PAUSED', 3 * 1.05, 4);
    sound.pause();
};
const showHighScores = () => {
    const highScores = JSON.parse(localStorage.getItem("HighScores")) || [];
    const highScoreList = document.getElementById("highScores");
    highScoreList.innerHTML = highScores.map((score) => `<li>${score}`).join("");
};
showHighScores();
const checkHighScore = (score) => {
    var _a;
    const highScores = JSON.parse(localStorage.getItem("HighScores")) || [];
    const lowestScore = (_a = highScores[NO_OF_HIGH_SCORES - 1]) !== null && _a !== void 0 ? _a : 0;
    if (score > lowestScore) {
        saveHighScore(score, highScores);
        showHighScores();
    }
};
const saveHighScore = (score, highScores) => {
    highScores.push(score);
    highScores.sort((a, b) => b - a);
    highScores.splice(NO_OF_HIGH_SCORES);
    localStorage.setItem("HighScores", JSON.stringify(highScores));
};
