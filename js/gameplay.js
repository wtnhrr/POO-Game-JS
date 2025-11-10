/* js/gameLogic.js */

// --- Funções de Jogo ---

function verificarReceita() {
    if (feedbackVisual.alfa > 0) return; 

    const nomesNaMesa = caldeiraoObj.ingredientesNaMesa.map(ing => ing.nome);
    const nomesNaReceita = receitaAtual.ingredientesNecessarios;

    if (Utils.validarMistura(nomesNaMesa, nomesNaReceita)) {
        registrarSucesso();
    } else {
        registrarFalha();
    }
}

function registrarSucesso() {
    console.log("Receita CORRETA!");
    pontosSucesso++;
    sndSucesso.play(); 

    feedbackVisual.texto = "SUCESSO!";
    feedbackVisual.cor = [100, 255, 100]; 
    feedbackVisual.alfa = 255;
    feedbackVisual.x = caldeiraoObj.x + 25; 
    feedbackVisual.y = caldeiraoObj.y;      

    iniciarProximaReceita(true); 
}

function registrarFalha() {
    if (estadoDoJogo !== 'JOGANDO') return; 

    pontosFalha++;
    sndFalha.play(); 

    if (pontosFalha >= LIMITE_FALHAS) {
        estadoDoJogo = 'FADE_OUT'; 
        transicaoAlfa = 0;  

        sndMainMusic.fade(0.0, 2.0);

        if (isMusicUrgent) {
            sndMainMusic.rate(1.0);
            isMusicUrgent = false;
        }

    } else {
        feedbackVisual.texto = "FALHA!";
        feedbackVisual.cor = [255, 100, 100]; 
        feedbackVisual.alfa = 255;
        feedbackVisual.x = caldeiraoObj.x + 25;
        feedbackVisual.y = caldeiraoObj.y;

        iniciarProximaReceita(false); 
    }
}


function iniciarProximaReceita(foiSucesso) {

    caldeiraoObj.limparMesa();

    setupIngredientes();

    if (isMusicUrgent) {
        isMusicUrgent = false;
        sndMainMusic.rate(1.0);
    }

    luzesAcesas = true;
    velaObj.acender();
    agendarProximoApagao(pontosSucesso);

    tempoLimiteAtual = getTempoLimitePorNivel(pontosSucesso);

    receitaAtual = Receita.gerarReceitaAleatoria(imgReceita, imgReceitaSheet, todosIngredientes, pontosSucesso);

    if (receitaAtual.isCorrompida) {
        sndReceitaCorrupta.play();
    }

    frameInicioReceita = frameCount;
}


function reiniciarJogo() {
    pontosSucesso = 0;
    pontosFalha = 0;

    setupIngredientes(); 

    luzesAcesas = true;
    velaObj.acender();
    frameDoApagao = Infinity;

    sndMainMusic.stop();
    sndMainMusic.setVolume(0.01);
    if (isMusicUrgent) {
        isMusicUrgent = false;
        sndMainMusic.rate(1.0); 
    }

    tempoLimiteAtual = getTempoLimitePorNivel(pontosSucesso);
    receitaAtual = Receita.gerarReceitaAleatoria(imgReceita, imgReceitaSheet, todosIngredientes, pontosSucesso);

    if (receitaAtual.isCorrompida) {
        sndReceitaCorrupta.play();
    }

    frameInicioReceita = frameCount; 
    gameOverAlfa = 0; 

    estadoDoJogo = 'INICIO';
    telaInicio.style.display = 'flex'; 
    gameContainer.style.display = 'none'; 
}

function getTempoLimitePorNivel(pontos) {
    if (pontos < 5) {
        return 15;
    } else if (pontos < 10) {
        return 10;
    } else {
        return 8;
    }
}

function apagarLuzes() {
    luzesAcesas = false;
    velaObj.apagar();
    frameDoApagao = Infinity;
}

function agendarProximoApagao(pontos) {
    frameDoApagao = Infinity;

    let chanceApagao = 0;
    if (pontos >= 5 && pontos < 10) {
        chanceApagao = 0.30;
    } else if (pontos >= 10) {
        chanceApagao = 0.55;
    }

    if (random() < chanceApagao) {
        const tempoEmSegundos = random(4, 8); 
        frameDoApagao = frameCount + (tempoEmSegundos * 60);
        sndWind.play(); 
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}