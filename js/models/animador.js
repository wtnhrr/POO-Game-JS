class Animador {

    constructor(spriteSheet, frameWidth, frameHeight, frameCount, animationSpeed) {
        this.spriteSheet = spriteSheet;
        this.frameWidth = frameWidth;
        this.frameHeight = frameHeight;
        this.frameCount = frameCount;
        this.animationSpeed = animationSpeed;

        this.currentFrame = 0;
        this.gameFrameCounter = 0;
    }

    // Avança animação
    update() {
        this.gameFrameCounter++;

        if (this.gameFrameCounter >= this.animationSpeed) {
            this.gameFrameCounter = 0;
            this.currentFrame++;

            if (this.currentFrame >= this.frameCount) {
                this.currentFrame = 0;
            }
        }
    }

    draw(x, y) {
        const sx = this.currentFrame * this.frameWidth;

        image(
            this.spriteSheet,
            x, y,
            this.frameWidth, this.frameHeight,
            sx, 0,
            this.frameWidth, this.frameHeight
        );

        this.update();
    }
}