class Receita {
    #nomePocao; 
    ingredientesNecessarios;
    img;
    isCorrompida;
    animadorCorrompido;
    cacheIconesErrados = [];

    constructor(nomePocao, ingredientesNomes, img) {
        this.#nomePocao = nomePocao;
        this.ingredientesNecessarios = ingredientesNomes;
        this.img = img;

        this.isCorrompida = false;
        this.animadorCorrompido = null;
    }

    get nomePocao() {
        return this.#nomePocao;
    }
    set nomePocao(novoNome) {
        this.#nomePocao = novoNome;
    }
    draw(x, y, allIngredients) {
        if (this.isCorrompida) {
            this.animadorCorrompido.draw(x, y); 
            fill(0); 
            noStroke();
            if (typeof pixelFont !== 'undefined') textFont(pixelFont); 
            textSize(2); 
            textAlign(LEFT, TOP);
            text("Receita ?????", x + 23, y + 7); 

        } else {
            image(this.img, x, y); 
            fill(0); 
            noStroke();
            if (typeof pixelFont !== 'undefined') textFont(pixelFont); 
            textSize(2); 
            textAlign(LEFT, TOP);
            text(this.#nomePocao, x + 23, y + 7); 
        }

        const velocidadeTrocaIcone = 15; 
        const deveTrocarIcone = (frameCount % velocidadeTrocaIcone === 0);

        for (let i = 0; i < this.ingredientesNecessarios.length; i++) {
            const nomeCorreto = this.ingredientesNecessarios[i];
            const posYItem = y + 15 + (i * 10); 

            let imgParaDesenhar;

            if (this.isCorrompida) {
                if (deveTrocarIcone || !this.cacheIconesErrados[i]) {
                    const imagensUnicas = [...new Set(allIngredients.map(ing => ing.img))];
                    const imgCorreta = allIngredients.find(ing => ing.nome === nomeCorreto).img;
                    const imagensErradas = imagensUnicas.filter(img => img !== imgCorreta);

                    if (imagensErradas.length > 0) {
                        this.cacheIconesErrados[i] = random(imagensErradas);
                    } else {
                        this.cacheIconesErrados[i] = imgCorreta;
                    }
                }
                imgParaDesenhar = this.cacheIconesErrados[i];

            } else {
                // pega a imagem correta
                const ingObj = allIngredients.find(ing => ing.nome === nomeCorreto);
                if (ingObj) {
                    imgParaDesenhar = ingObj.img;
                }
            }

            // ícone correto ou errado e o texto sempre correto
            if (imgParaDesenhar) {
                image(imgParaDesenhar, x + 14, posYItem, 8, 8); 
            }
            text(nomeCorreto, x + 23, posYItem + 3);
        }
    }

    static gerarReceitaAleatoria(imgReceita, imgSheetCorrompido, ingredientesNaPrateleira, pontosSucesso) {

        const nomesNaPrateleira = ingredientesNaPrateleira.map(ing => ing.nome);
        const nomesUnicos = [...new Set(nomesNaPrateleira)];

        if (nomesUnicos.length < 2) {
            return new Receita("Pocao Pura", [nomesUnicos[0], nomesUnicos[0]], imgReceita);
        }

        let tamanhoDesejado;
        if (pontosSucesso < 5) {
            tamanhoDesejado = 2;
        } else if (pontosSucesso < 10) {
            tamanhoDesejado = 3;
        } else {
            tamanhoDesejado = 4;
        }

        const tamanhoMaximoPossivel = min(4, nomesUnicos.length);
        const tamanhoReceita = min(tamanhoDesejado, tamanhoMaximoPossivel);

        const nomesEmbaralhados = nomesUnicos.sort(() => 0.5 - random());
        const ingredientesDaReceita = nomesEmbaralhados.slice(0, tamanhoReceita);

        const nomesPossiveis = [
            "Poção Mistica", "Elixir Veloz", "Tônic Forte", "Poção Sombria",
            "Poção de Luz", "Elixir Sábio", "Poção do Gato", "Filtro da Sorte"
        ];
        const nomeSorteado = random(nomesPossiveis);

        const novaReceita = new Receita(nomeSorteado, ingredientesDaReceita, imgReceita);

        let chanceCorromper = 0;
        if (pontosSucesso >= 5 && pontosSucesso < 10) {
            chanceCorromper = 0.15;
        } else if (pontosSucesso >= 10) {
            chanceCorromper = 0.30;
        }

        if (random() < chanceCorromper) {
            console.log("Receita Corrompida Gerada!");
            novaReceita.isCorrompida = true;

            // img, largura, altura, totalDeQuadros, velocidade
            novaReceita.animadorCorrompido = new Animador(imgSheetCorrompido, 64, 64, 4, 10);
        }

        return novaReceita;
    }
}