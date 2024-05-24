export class Background {
    constructor(game) {
        this.game = game;
        this.images = [
            document.getElementById('background-day'),
            document.getElementById('background-night')
        ];
        this.image = this.images[Math.floor(Math.random() * this.images.length)];
        this.width = 800;
        this.height = 600;
        this.x = 0;
        this.y = 0;
    }

    draw(context) {
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}