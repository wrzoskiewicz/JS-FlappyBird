import { Player } from './player.js'
import { InputHandler } from './input.js';
import { Background } from './background.js';
import { PipeManager } from './pipeManager.js';

window.addEventListener('DOMContentLoaded', function(){
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 800;
    canvas.height = 600;

    const soundtrack = document.getElementById('soundtrack'); //tabletki nasenne brałem mimo tego ciągle grałem, ja swój rekord pobić chce nienawidze FlappyBird
    soundtrack.volume = 0.2;  // Możesz dostosować głośność od 0 do 1

    let game; // Definicja zmiennej game dostępnej w zakresie globalnym
    let gameStarted = false; // Flaga informująca, czy gra już się rozpoczęła


    document.getElementById('startButton').addEventListener('click', startGame);

    function startGame() {
        if (!gameStarted) { // Sprawdź, czy gra nie została już uruchomiona
            gameStarted = true; // Ustaw flagę na true, aby oznaczyć rozpoczęcie gry
            game = new Game(canvas.width, canvas.height);
            console.log(game);
            animate();
        }
        soundtrack.play(); // Odtwórz ścieżkę dźwiękową po rozpoczęciu gry
    }

    class Game {
        constructor(width, height){
            this.width = width;
            this.height = height;
            this.background = new Background(this);
            this.player = new Player(this);
            this.input = new InputHandler();
        }
        update(){
            this.player.update(this.input.keys);
        }
        draw(context){
            this.background.draw(context);
            this.player.draw(context);
        }
    }

    function animate(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.update();
        game.draw(ctx);
        requestAnimationFrame(animate);
    }
});

