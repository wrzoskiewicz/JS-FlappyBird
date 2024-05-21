export class Pipe {
    constructor(game, y, height, isTop) {
        this.game = game;
        this.width = 50;
        this.height = height;
        this.x = game.width;
        this.y = y;
        this.isTop = isTop;
    }

    update() {
        this.x -= 2; // Prędkość ruchu rury w lewo
    }

    draw(context) {
        context.fillStyle = 'green';
        context.fillRect(this.x, this.y, this.width, this.height);
    }

    offScreen() {
        return this.x + this.width < 0;
    }
}