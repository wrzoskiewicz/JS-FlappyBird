import { Pipe } from './pipe.js';

export class PipeManager {
    constructor(game) {
        this.game = game;
        this.pipes = [];
        this.pipeGap = 500; // Odstęp między rurami (od góry do dołu)
        this.frame = 0;
        this.baseHeight = 80;
        this.baseX = 0; // Pozycja X bazy
    }

    update(game) {
        this.baseX -= game.pipeSpeed;
        if (this.baseX <= -this.game.width) {
            this.baseX = 0; // Resetowanie pozycji bazy, jeśli przesunęła się całkowicie w lewo
        }
    
        // Obliczenie minimalnej odległości między kolejnymi rurami
        const minPipeDistance = 300; // Możesz dostosować tę wartość do preferencji
    
        // Sprawdzenie, czy odległość między ostatnią rurą a koncem ekranu jest większa niż minimalna odległość
        const lastPipe = this.pipes[this.pipes.length - 1];
        if (!lastPipe || this.game.width - lastPipe.x >= minPipeDistance) {
            // Jeśli odległość między rurami jest wystarczająco duża, tworzymy nowe rury
            const gapY = Math.floor((Math.random() * 3 - 3) * 100);
            const topPipe = new Pipe(this.game, this.game.width, gapY, true);
            const bottomPipe = new Pipe(this.game, this.game.width, gapY + this.pipeGap, false);
            this.pipes.push(topPipe);
            this.pipes.push(bottomPipe);
        }
    
        // Aktualizacja i filtrowanie rur
        this.pipes.forEach(pipe => pipe.update());
        this.pipes = this.pipes.filter(pipe => !pipe.offScreen());
    }

    draw(context) {
        this.pipes.forEach(pipe => pipe.draw(context));
        
        // Rysowanie bazy
        const baseImage = document.getElementById('base');
        context.drawImage(baseImage, this.baseX, this.game.height - this.baseHeight, this.game.width, this.baseHeight);
        context.drawImage(baseImage, this.baseX + this.game.width, this.game.height - this.baseHeight, this.game.width, this.baseHeight);
    }

    clearPipes() {
        this.pipes = []; // Czyścimy tablicę rur
    }
}