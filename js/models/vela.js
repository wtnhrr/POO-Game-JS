class Vela {

    constructor(sheetAcesa, sheetApagada, x, y) {
        this.x = x;
        this.y = y;
        this.estaAcesa = true;

        this.animadorAcesa = new Animador(
            sheetAcesa,
            32,
            32,
            4,
            20 
        );

        this.animadorApagada = new Animador(
            sheetApagada,
            32,
            32,
            1,
            20 
        );
    }

    draw() {
        if (this.estaAcesa) {
            this.animadorAcesa.draw(this.x, this.y);
        } else {
            this.animadorApagada.draw(this.x, this.y);
        }
    }

    // controle
    apagar() {
        this.estaAcesa = false;
        this.animadorApagada.currentFrame = 0;
    }

    acender() {
        this.estaAcesa = true;
        this.animadorAcesa.currentFrame = 0;
    }
}