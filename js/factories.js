// Função prateleira
function setupIngredientes() {
    todosIngredientes = []; 

    const posicoes = [
        { x: -8, y: 15 }, { x: 7, y: 15 },
        { x: -8, y: 30 }, { x: 7, y: 30 },
        { x: -8, y: 45 }, { x: 7, y: 45 },
        { x: 26, y: 55 }, { x: 0, y: 0 },
        { x: -6, y: 70 }
    ];

    for (let pos of posicoes) {
        todosIngredientes.push(gerarIngredienteAleatorio(pos.x, pos.y));
    }
}

// Função geração ingredientes
function gerarIngredienteAleatorio(x, y) {
    const dados = random(TODOS_OS_TIPOS_DE_INGREDIENTES);

    switch (dados.tipo) {
        case "Animal":
            return new IngredienteAnimal(dados.nome, dados.img, x, y, dados.arg);
        case "Vegetal":
            return new IngredienteVegetal(dados.nome, dados.img, x, y, dados.arg);
        case "Mineral":
            return new IngredienteMineral(dados.nome, dados.img, x, y, dados.arg);
    }
}