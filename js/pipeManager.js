import { Pipe } from './pipe.js';

export class PipeManager {
    constructor(game) {
        this.game = game;
        this.pipes = [];
        this.pipeGap = 500; // Odstęp między rurami (od góry do dołu)
        this.pipeFrequency = 140; // Jak często tworzyć nowe rury (w klatkach)
        this.frame = 0;
        this.baseHeight = 80
    }

    update() {
        this.frame++;

        if (this.frame % this.pipeFrequency === 0) {
            const gapY = Math.floor((Math.random() * 3 - 3) * 100);
            const topPipe = new Pipe(this.game, this.game.width, gapY, true);
            const bottomPipe = new Pipe(this.game, this.game.width, gapY + this.pipeGap, false);
            this.pipes.push(topPipe);
            this.pipes.push(bottomPipe);
        }

        this.pipes.forEach(pipe => pipe.update());
        this.pipes = this.pipes.filter(pipe => !pipe.offScreen());
    }

    draw(context) {
        this.pipes.forEach(pipe => pipe.draw(context));
        const baseImage = document.getElementById('base');
        context.drawImage(baseImage, 0, this.game.height - this.baseHeight, this.game.width, this.baseHeight);
    }
}