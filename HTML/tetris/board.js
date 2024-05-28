class Board {
    constructor(ctx, ctxHold, ctxNext) {
        this.ctx = ctx;
        this.ctxHold = ctxHold;
        this.ctxNext = ctxNext;
        this.typeIdArr = [];
        this.init();
    }
    init() {
        this.ctx.canvas.style.background = "hsl(0, 0%, 80%)";
        if (Mobile()) {
            this.ctx.canvas.width = COLS * (15 + 15 / 20) - 15 / 20;
            this.ctx.canvas.height = ROWS * (15 + 15 / 20) - 15 / 20 - 25;
            this.ctx.translate(0, -25);
            this.ctx.scale(15, 15);
        }
        else {
            this.ctx.canvas.width = COLS * (BLOCK_SIZE + BORDER_SIZE) - BORDER_SIZE;
            this.ctx.canvas.height = ROWS * (BLOCK_SIZE + BORDER_SIZE) - BORDER_SIZE - 25;
            this.ctx.translate(0, -25);
            this, ctx.scale(BLOCK_SIZE, BLOCK_SIZE);
        }
    }
    reset() {
        this.combo = 1;
        isHoldedThisTime = false;
        this.hold = null;
        this.grid = this.getEmptyBoard();
        this.piece = new Piece(ctx, this.randomizeTetrominoTypeId());
        this.piece.setStartingPosition();
        this.pieceList = Array(this.ctxNext.length).fill("").map((value, index) => new Piece(this.ctxNext[index], this.randomizeTetrominoTypeId()));
        console.log(this.pieceList);
        this.getNewPiece();
    }
    getNewPiece() {
        this.pieceList.forEach((piece) => {
            piece.ctx.clearRect(0, 0, piece.ctx.canvas.width, piece.ctx.canvas.height);
            piece.ctx.fillStyle = piece.color;
            piece.shape.forEach((row, y) => {
                row.forEach((value, x) => {
                    if (value > 0) {
                        piece.ctx.fillRect((piece.x + x) * 1.05, (piece.y + y) * 1.05, 1, 1);
                    }
                });
            });
        });
        this.next = this.pieceList.shift();
        this.pieceList.push(new Piece(this.ctx, this.randomizeTetrominoTypeId()));
        this.pieceList.forEach((value, index) => {
            value.ctx = this.ctxNext[index];
        });
    }
    getEmptyBoard() {
        this.ctxHold.clearRect(0, 0, 4 * 1.05, 4 * 1.05);
        return Array.from({ length: ROWS }, () => Array(COLS).fill(0));
    }
    draw() {
        this.drawBoard();
        this.piece.draw();
    }
    drop() {
        let p = moves[KEY.DOWN](this.piece);
        if (this.valid(p)) {
            this.piece.move(p);
        }
        else {
            this.freeze();
            this.clearLines();
            if (this.piece.y == 0)
                return false;
            isHoldedThisTime = false;
            this.piece = this.next;
            this.piece.ctx = this.ctx;
            this.piece.setStartingPosition();
            this.getNewPiece();
        }
        return true;
    }
    clearLines() {
        let lines = 0;
        this.grid.forEach((row, y) => {
            if (row.every((value) => value > 0)) {
                lines++;
                if (this.combo >= 5) {
                    this.combo = 5;
                }
                this.grid.splice(y, 1);
                this.grid.unshift(Array(COLS).fill(0));
            }
        });
        if (lines > 0) {
            account.score += this.getLinesClearedPoints(lines);
            account.lines += lines;
            if (account.lines >= LINE_PER_LEVELS) {
                account.level++;
                account.lines -= LINE_PER_LEVELS;
                time.level = LEVEL[account.level];
            }
        }
        else {
            this.combo = 1;
        }
    }
    valid(p) {
        return p.shape.every((row, dy) => {
            return row.every((value, dx) => {
                let x = p.x + dx;
                let y = p.y + dy;
                return (this.isEmpty(value) || (this.insideWalls(x, y)) && this.noOccupied(x, y));
            });
        });
    }
    freeze() {
        this.piece.shape.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value > 0)
                    this.grid[this.piece.y + y][this.piece.x + x] = value;
            });
        });
    }
    drawBoard() {
        this.grid.forEach((row, y) => {
            row.forEach((value, x) => {
                this.ctx.fillStyle = COLORS[value];
                this.ctx.fillRect(x * 1.05, y * 1.05, 1, 1);
            });
        });
    }
    isEmpty(value) {
        return value == 0;
    }
    insideWalls(x, y) {
        return x >= 0 && x < COLS && y <= ROWS;
    }
    noOccupied(x, y) {
        return this.grid[y] && this.grid[y][x] === 0;
    }
    holdPiece(p) {
        if (isHoldedThisTime)
            return;
        isHoldedThisTime = true;
        let clone = JSON.parse(JSON.stringify(p));
        if (!this.hold) {
            this.hold = clone;
            this.piece = this.next;
            this.piece.ctx = this.ctx;
            this.piece.setStartingPosition();
            this.getNewPiece();
            this.drawHoldPiece();
            return this.piece;
        }
        else {
            [this.hold, clone] = [clone, this.hold];
            this.drawHoldPiece();
            clone.y = 0;
            return clone;
        }
    }
    drawHoldPiece() {
        this.ctxHold.clearRect(0, 0, 4 * 1.05, 4 * 1.05);
        this.ctxHold.fillStyle = this.hold.color;
        this.hold.shape.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value > 0) {
                    this.ctxHold.fillRect((x) * 1.05, (y) * 1.05, 1, 1);
                }
            });
        });
    }
    rotate(p, rotation) {
        let clone = JSON.parse(JSON.stringify(p));
        if (!p.hardDropped) {
            for (let y = 0; y < clone.shape.length; y++) {
                for (let x = 0; x < y; x++) {
                    [clone.shape[x][y], clone.shape[y][x]] = [clone.shape[y][x], clone.shape[x][y]];
                }
            }
            if (rotation == ROTATION.LEFT)
                clone.shape.reverse();
            else
                clone.shape.forEach(row => row.reverse());
        }
        return clone;
    }
    randomizeTetrominoTypeId(noOfType = this.typeIdArr.length) {
        if (!noOfType) {
            this.typeIdArr = Array(COLORS.length - 1).fill("").map((v, i) => i + 1);
        }
        let typeId = Math.floor(Math.random() * this.typeIdArr.length);
        return this.typeIdArr.splice(typeId, 1)[0];
    }
    getLinesClearedPoints(lines) {
        const lineClearPoint = lines == 1 ? POINTS.SINGLE :
            lines == 2 ? POINTS.DOUBLE :
                lines == 3 ? POINTS.TRIPLE :
                    lines == 4 ? POINTS.TETRIS :
                        0;
        console.log(this.combo);
        return (account.level + 1) * lineClearPoint * this.combo++;
    }
}
