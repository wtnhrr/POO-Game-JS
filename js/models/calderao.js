class Caldeirao {
    #ingredientesNaMesa; 

    constructor(spriteSheet, x, y) {
        this.x = x;
        this.y = y;
        this.#ingredientesNaMesa = [];

        const frameWidth = 48;
        const frameHeight = 48;
        const frameCount = 5;
        const animationSpeed = 15;

        this.animador = new Animador(
            spriteSheet, 
            frameWidth, 
            frameHeight, 
            frameCount, 
            animationSpeed
        );
    }

    get ingredientesNaMesa() {
        return this.#ingredientesNaMesa;
    }
    set ingredientesNaMesa(novaLista) {
        this.#ingredientesNaMesa = novaLista;
    }

    adicionarIngrediente(ingrediente, posMesaX, posMesaY) {
        if (this.#ingredientesNaMesa.length < 4) { 
            ingrediente.moverParaMesa(posMesaX, posMesaY);
            this.#ingredientesNaMesa.push(ingrediente);
        }
    }

    limparMesa() {
        this.#ingredientesNaMesa = [];
    }

    draw() {
        this.animador.draw(this.x, this.y);
    }
}