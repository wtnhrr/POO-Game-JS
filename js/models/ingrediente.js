class Ingrediente {

    #nome; 

    constructor(nome, img, x, y) {
        this.#nome = nome; 
        this.img = img;
        this.x = x;
        this.y = y;
        this.xOriginal = x; 
        this.yOriginal = y; 
        this.naMesa = false;
    }

    get nome() {
        return this.#nome;
    }
    set nome(novoNome) {
        this.#nome = novoNome;
    }

    draw(luzesAcesas, imgSombra) {
        if (this.img) {

            if (this.naMesa) {
                image(this.img, this.x, this.y, 10, 10);

            } else if (luzesAcesas) {
                image(this.img, this.x, this.y);

            } else {
                image(imgSombra, this.x, this.y);
            }
        }
    }

    moverParaMesa(x, y) {
        this.x = x;
        this.y = y;
        this.naMesa = true;
    }

    resetarPosicao() {
        this.x = this.xOriginal;
        this.y = this.yOriginal;
        this.naMesa = false;
    }
}