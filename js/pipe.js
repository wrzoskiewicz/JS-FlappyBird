// export class Pipe {
//     constructor(game, y, height, isTop) {
//         this.game = game;
//         this.width = 50;
//         this.height = height;
//         this.x = game.width;
//         this.y = y;
//         this.isTop = isTop;
//     }

//     update() {
//         this.x -= 4; // Prędkość ruchu rury w lewo
//     }

//     draw(context) {
//         context.fillStyle = 'green';
//         context.fillRect(this.x, this.y, this.width, this.height);
//     }

//     offScreen() {
//         return this.x + this.width < 0;
//     }
// }

export class Pipe {
    constructor(game, x, y, top) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.width = 52;  // Szerokość rury, dostosuj do rzeczywistej szerokości obrazka
        this.height = 320;  // Wysokość rury, dostosuj do rzeczywistej wysokości obrazka
        this.top = top;
        this.image = document.getElementById('pipe-green');
    }

    update() {
        this.x -= 2; // Przesuwaj rurę w lewo (dostosuj prędkość do potrzeb)
    }

    draw(context) {
        if (this.top) {
            // Rysowanie rury od góry (odwróć obrazek)
            context.save();
            context.translate(this.x + this.width / 2, this.y + this.height / 2);
            context.rotate(Math.PI);
            context.drawImage(this.image, -this.width / 2, -this.height / 2, this.width, this.height);
            context.restore();
        } else {
            // Rysowanie rury od dołu (normalnie)
            context.drawImage(this.image, this.x, this.y, this.width, this.height);
        }
    }

    offScreen() {
        return this.x + this.width < 0;
    }
}