export class Player {
    constructor(game) {
        this.game = game;
        this.width = 50;
        this.height = 50;
        this.x = 280;
        this.y = (this.game.height - this.height) * 0.5;
        this.fallSpeed = 0;
        this.gravity = 0.2; // Wartość grawitacji
        this.maxSpeed = 3; // Maksymalna prędkość opadania
        this.jumpSpeed = -3; // Prędkość skoku
        this.birdImages = [
            document.getElementById('player-up'),
            document.getElementById('player-mid'),
            document.getElementById('player-down')
        ]; // Tablica obrazów ptaka
        this.currentBirdImageIndex = 1; // Indeks obecnego obrazu ptaka
        this.spacePressed = false; // Zmienna śledząca stan spacji
        this.animationTimer = 0; // Timer do animacji
        this.animationInterval = 10; // Czas pomiędzy klatkami animacji
    }

    update(input) {
        if (!input.includes(' ') && this.fallSpeed < this.maxSpeed) {
            this.fallSpeed += this.gravity;
        }

        if (input.includes(' ') && !this.spacePressed && !this.animating) {
            this.fallSpeed = this.jumpSpeed;
            this.spacePressed = true;
            this.startAnimation();
        } else if (!input.includes(' ')) {
            this.spacePressed = false; // Zresetowanie stanu spacji, jeśli spacja nie jest wciśnięta
        }

        this.y += this.fallSpeed;

        if (this.y < 0) this.y = 0;
        if (this.y > this.game.height - this.height) this.y = this.game.height - this.height;

        this.updateAnimation();
    }

    startAnimation() {
        this.currentBirdImageIndex = 0; // Rozpocznij animację od pierwszego obrazka
        this.animationTimer = this.animationInterval;
        this.animating = true; // Ustaw animację jako w trakcie
    }

    updateAnimation() {
        if (this.animating) {
            if (this.animationTimer > 0) {
                this.animationTimer--;
                if (this.animationTimer === 0) {
                    this.currentBirdImageIndex++;
                    if (this.currentBirdImageIndex >= this.birdImages.length) {
                        this.currentBirdImageIndex = 1; // Ustaw obraz ptaka na mid po zakończeniu animacji
                        this.animating = false; // Zakończ animację
                    } else {
                        this.animationTimer = this.animationInterval;
                    }
                }
            }
        }
    }

    draw(context) {
        // Narysuj obraz ptaka na ekranie
        context.drawImage(this.birdImages[this.currentBirdImageIndex], this.x, this.y, this.width, this.height);
    }
}