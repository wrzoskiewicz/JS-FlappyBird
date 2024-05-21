export class Player{
    constructor(game){
        this.game = game;
        this.width = 50;
        this.height = 50;
        this.x = 280;
        this.y = (this.game.height-this.height)*0.5;
        this.fallSpeed = 0;
        this.maxSpeed = 8; //maksymalna prędkość opadania
        this.image = document.getElementById('player');
        this.spacePressed = false; // Zmienna śledząca stan spacji
    }

    update(input){
        if (this.fallSpeed < this.maxSpeed) {
            this.fallSpeed += 1;
        }

        if (input.includes(' ') && !this.spacePressed){
            this.fallSpeed = -14;
            this.spacePressed = true;
        } else if (!input.includes(' ')) {
            this.spacePressed = false; // Zresetowanie stanu spacji, jeśli spacja nie jest wciśnięta
        }

        this.y += this.fallSpeed;
       
        if (this.y < 0) this.y = 0;
        if (this.y > this.game.height - this.height) this.y = this.game.height - this.height;
    }

    draw(context){
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}