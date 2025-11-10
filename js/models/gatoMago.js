class GatoMago {

    constructor(spriteSheet, x, y) {
        this.x = x;
        this.y = y;

        const frameWidth = 32;
        const frameHeight = 32;
        const frameCount = 4;
        const animationSpeed = 15;

        this.animador = new Animador(
            spriteSheet, 
            frameWidth, 
            frameHeight, 
            frameCount, 
            animationSpeed
        );
    }
    
    draw() {
        this.animador.draw(this.x, this.y);
    }
}