import { Player } from './player.js'
import { InputHandler } from './input.js';
import { Background } from './background.js';
import { PipeManager } from './pipeManager.js';



window.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 800;
    canvas.height = 600;

    const soundtrack = document.getElementById('soundtrack');
    soundtrack.volume = 0.2;

    const pointSound = document.getElementById('pointSound');
    const hitSound = document.getElementById('hitSound');
    const resetSound = document.getElementById('resetSound');

    let game;
    let gameStarted = false;
    let input = new InputHandler();
    let gameOverScreen = document.getElementById('gameOver');
    let startScreen = document.getElementById('message');

    class Game {
        constructor(width, height) {
            this.width = width;
            this.height = height;
            this.background = new Background(this);
            this.player = new Player(this);
            this.pipeManager = new PipeManager(this);
            this.score = 0;
            this.pipeSpeed = 1;
            this.initializeHighScore(); // Wczytaj rekord gracza
        }

        resetHighScore() {
            localStorage.setItem('flappy_bird_high_score', 0);
            this.highScore = 0;
        }

        updateHighScoreDisplay() {
            if (this.score > this.highScore) {
                this.highScore = this.score;
                localStorage.setItem('flappy_bird_high_score', this.highScore);
            }
        }

        initializeHighScore() {
            this.highScore = parseInt(localStorage.getItem('flappy_bird_high_score')) || 0;
        }

        playPointSound() {
            pointSound.currentTime = 0;
            pointSound.play();
        }

        playHitSound() {
            hitSound.currentTime = 0;
            hitSound.play();
        }

        playResetSound() {
        resetSound.currentTime = 0;
        resetSound.play();
        }

        update() {
            this.player.update(input.keys);
            this.pipeManager.update(this);
            this.checkCollisions();
        }

        draw(context) {
            this.background.draw(context);
            this.pipeManager.draw(context);
            this.player.draw(context);
            context.fillStyle = 'black';
            context.font = '30px Arial';
            context.textAlign = 'center';
            context.fillText(`Score: ${this.score}`, this.width / 2, 50);
            context.fillText(`Best: ${this.highScore}`, this.width / 2, 100);
        }

        checkCollisions() {
            this.pipeManager.pipes.forEach(pipe => {
                if (this.player && pipe && !pipe.scored && this.player.x > pipe.x && !this.checkCollision(this.player, pipe)) {
                    this.score += 1 / 2;
                    this.playPointSound();
                    pipe.scored = true;
    
                    //Zwiększanie prędkości rur po zdobyciu punktu przez gracza
                    if (this.score % 2 === 0) {
                        this.increasePipeSpeed();
                    }
                } else if (this.player && pipe && this.checkCollision(this.player, pipe)) {
                    this.playHitSound();
                    this.gameOver();
                }
            });
        }

        checkCollision(player, pipe) {
            return (
                player.x < pipe.x + pipe.width &&
                player.x + player.width > pipe.x &&
                player.y < pipe.y + pipe.height &&
                player.y + player.height > pipe.y
            );
        }

        increasePipeSpeed() {
            // Zwiększamy prędkość rur
            this.pipeSpeed += 0.05; // Możesz dostosować wartość przyspieszenia
            console.log("Zwiększono prędkość rur:", this.pipeSpeed);
        }
    

        clear() {
            this.background = null;
            this.player = null;
            this.pipeManager = null;
        }

        pauseGame() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            this.draw(ctx);
        }

        startGame() {
            startScreen.style.display = 'block';
            if (!gameStarted) {
                console.log("gra sie zaczela");
                game = new Game(canvas.width, canvas.height);
                game.pauseGame();
            }
            window.addEventListener('keydown', this.handleKeyDown.bind(this));
        }


        handleKeyDown(event) {
            if (event.code === 'Space' && !gameStarted) {
                startScreen.style.display = 'none';
                gameOverScreen.style.display = 'none';
                gameStarted = true;
                animate();
            }
        }

        gameOver() {
            gameStarted = false;
            this.updateHighScoreDisplay();
            gameOverScreen.style.display = 'block';
            soundtrack.pause();
            this.pauseGame();
            this.clear();
        
            const handleKeyPress = (event) => {
                if (event.code === 'Space') {
                    document.removeEventListener('keydown', handleKeyPress);
                    this.startGame();
                }
            };
        
            document.addEventListener('keydown', handleKeyPress);
        
            
        }
    }

    function animate() {
        soundtrack.play();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.update();
        game.draw(ctx);
        requestAnimationFrame(animate);
    }

    // Preload images and start the game after all images are loaded
    const birdUp = document.getElementById('player-up');
    const birdMid = document.getElementById('player-mid');
    const birdDown = document.getElementById('player-down');
    let imagesLoaded = 0;

    function onImageLoad() {
        imagesLoaded += 1;
        if (imagesLoaded === 3) {
            game = new Game(canvas.width, canvas.height);
            game.startGame();
        }
    }

    birdUp.onload = onImageLoad;
    birdMid.onload = onImageLoad;
    birdDown.onload = onImageLoad;

    // Check if images are already cached
    if (birdUp.complete) onImageLoad();
    if (birdMid.complete) onImageLoad();
    if (birdDown.complete) onImageLoad();

    
    // Nasłuchiwacz zdarzeń dla przycisku resetowania
    document.getElementById('resetButton').addEventListener('click', () => {
        if (game) {
            game.resetHighScore();
            game.playResetSound();

            // Ustawienie krótkiego timeoutu, aby przycisk nie pozostawał "wciśnięty"
            setTimeout(() => {
                document.getElementById('resetButton').blur();
            }, 100);
        }
    });
});