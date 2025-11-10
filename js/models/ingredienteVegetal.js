class IngredienteVegetal extends Ingrediente {

    constructor(nome, img, x, y, estacao) {
        super(nome, img, x, y);
        this.estacao = estacao;
    }
}