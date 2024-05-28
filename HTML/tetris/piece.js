class Piece {
    constructor(ctx, typeId) {
        this.ctx = ctx;
        this.spawn(typeId);
    }
    spawn(typeId) {
        this.typeId = typeId;
        this.color = COLORS[this.typeId];
        this.shape = SHAPES[this.typeId];
        this.x = 0;
        this.y = 0;
        this.hardDropped = false;
    }
    draw() {
        this.shape.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value > 0) {
                    this.ctx.strokeStyle = this.color;
                    this.ctx.fillStyle = this.color;
                    this.ctx.lineWidth = 0.05;
                    this.ctx.fillRect((this.x + x) * 1.05, (this.y + y) * 1.05, 1, 1);
                }
            });
        });
    }
    move(p) {
        if (!this.hardDropped) {
            this.x = p.x;
            this.y = p.y;
        }
        this.shape = p.shape;
        this.color = p.color;
    }
    hardDrop() {
        this.hardDropped = true;
    }
    setStartingPosition() {
        this.x = this.typeId == 4 ? COLS / 2 - 1 : COLS / 2 - 2;
        this.y = this.typeId == 1 ? -1 : 0;
    }
}
