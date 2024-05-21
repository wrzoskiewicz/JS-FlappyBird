import { Pipe } from './pipe.js';

export class PipeManager {
    constructor(game) {
        this.game = game;
        this.pipes = [];
        this.pipeGap = 150; // Odstęp między rurami (od góry do dołu)
        this.pipeFrequency = 100; // Jak często tworzyć nowe rury (w klatkach)
        this.frame = 0;
    }

    update() {
        this.frame++;

        if (this.frame % this.pipeFrequency === 0) {
            const gapY = Math.floor(Math.random() * (this.game.height - this.pipeGap));
            const topPipe = new Pipe(this.game, 0, gapY, true);
            const bottomPipe = new Pipe(this.game, gapY + this.pipeGap, this.game.height - (gapY + this.pipeGap), false);
            this.pipes.push(topPipe);
            this.pipes.push(bottomPipe);
        }

        this.pipes.forEach(pipe => pipe.update());
        this.pipes = this.pipes.filter(pipe => !pipe.offScreen());
    }

    draw(context) {
        this.pipes.forEach(pipe => pipe.draw(context));
    }
}