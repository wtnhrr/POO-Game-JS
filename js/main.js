// Carrega assets
function preload() {
    pixelFont = loadFont('assets/fonts/pixel-font.ttf');
    imgBackgroundSheet = loadImage('assets/img/background-dark.png');
    imgEstanteEsq = loadImage('assets/img/prateleira-lateral-64px.png');
    imgCaldeiraoSheet = loadImage('assets/img/calderao-sheet-32px.png'); 
    imgMesaFrente = loadImage('assets/img/mesa-frente-32px.png');

    imgReceita = loadImage('assets/img/paper-64px.png');
    imgReceitaSheet = loadImage('assets/img/paper-bright-sheet-64px.png'); 

    imgMineral1 = loadImage('assets/img/mineral-1.png');
    imgMineral2 = loadImage('assets/img/mineral-3.png');
    imgVegetal1 = loadImage('assets/img/vegetal-1.png');
    imgVegetal2 = loadImage('assets/img/vegetal-2.png');
    imgAnimal1 = loadImage('assets/img/animal-1.png');
    imgAnimal2 = loadImage('assets/img/animal-2.png');

    imgPotionRed = loadImage('assets/img/red-potion-16px.png');
    imgPotionBlack = loadImage('assets/img/black-potion-16px.png');

    imgGatoBlackSpriteSheet = loadImage('assets/img/blackCat-sheet.png');
    imgGatoWhiteSpriteSheet = loadImage('assets/img/whiteCat-sheet.png');

    imgGameOverSheet = loadImage('assets/img/game-over.png'); 

    imgVelaAcesaSheet = loadImage('assets/img/vela-iluminada-sheet.png');
    imgVelaApagadaSheet = loadImage('assets/img/vela-apagada-sheet.png');
    imgSombraIngrediente = loadImage('assets/img/ingrediente-escuro-16px.png');

    soundFormats('mp3', 'wav'); 
    let volumeSFX = 0.10;
    sndClickCaldeirao = loadSound('assets/song/clickCalderão.wav', () => sndClickCaldeirao.setVolume(volumeSFX));
    sndClickIngrediente = loadSound('assets/song/clickIngrediente.wav', () => sndClickIngrediente.setVolume(volumeSFX));
    sndSucesso = loadSound('assets/song/sucesso.wav', () => sndSucesso.setVolume(volumeSFX));
    sndFalha = loadSound('assets/song/falha.wav', () => sndFalha.setVolume(volumeSFX));
    sndReceitaCorrupta = loadSound('assets/song/receitaCorrupta.wav', () => sndReceitaCorrupta.setVolume(volumeSFX));
    sndWind = loadSound('assets/song/wind.mp3', () => sndWind.setVolume(volumeSFX));
    sndMainMusic = loadSound('assets/song/mainMusic.mp3');
}

// Configuração inicial
function setup() {
    let canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('game-container');
    noSmooth(); 

    TODOS_OS_TIPOS_DE_INGREDIENTES = [
        { nome: "Presa de Morcego", img: imgAnimal1, tipo: "Animal", arg: "Dente" },
        { nome: "Asa de Borboleta", img: imgAnimal2, tipo: "Animal", arg: "Asa" },
        { nome: "Congumelo", img: imgVegetal1, tipo: "Vegetal", arg: "Outono" },
        { nome: "Raiz Brilhante", img: imgVegetal2, tipo: "Vegetal", arg: "Verao" },
        { nome: "Mineral", img: imgMineral1, tipo: "Mineral", arg: "Comum" },
        { nome: "Rubi", img: imgMineral2, tipo: "Mineral", arg: "Raro" }
    ];

    setupIngredientes(); 
    caldeiraoObj = new Caldeirao(imgCaldeiraoSheet, 55, 30);

    gatoMagoObj = new GatoMago(imgGatoBlackSpriteSheet, 62, 4);
    gatoMagobook = new GatoMago(imgGatoWhiteSpriteSheet, 62, 54);
    frameInicioReceita = frameCount; 

    animadorBackground = new Animador(imgBackgroundSheet, 180, 90, 4, 20);
    velaObj = new Vela(imgVelaAcesaSheet, imgVelaApagadaSheet, 25, 8);

    btnStart.addEventListener('click', () => {

        userStartAudio(); 

        if (!sndMainMusic.isPlaying()) {
            sndMainMusic.setVolume(0.01); 
            sndMainMusic.loop();
        }

        telaInicio.style.display = 'none';
        gameContainer.style.display = 'flex'; 
        estadoDoJogo = 'JOGANDO'; 

        if (pontosFalha >= LIMITE_FALHAS) {
            reiniciarJogo();
            estadoDoJogo = 'JOGANDO'; 
            telaInicio.style.display = 'none'; 
            gameContainer.style.display = 'flex'; 
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
    });
}

// Loop game
function draw() {

    scaleFactor = min(width / NATIVE_WIDTH, height / NATIVE_HEIGHT);
    offsetX = (width - (NATIVE_WIDTH * scaleFactor)) / 2;
    offsetY = (height - (NATIVE_HEIGHT * scaleFactor)) / 2;

    background(0); 

    switch (estadoDoJogo) {

        case 'INICIO':
            // (Comentários de tutorial/leadboard removidos por limpeza)
            break;

        case 'JOGANDO':
            let segundosPassados = (frameCount - frameInicioReceita) / 60;
            let tempoRestante = tempoLimiteAtual - segundosPassados;

            if (tempoRestante <= 5.0 && !isMusicUrgent) {
                isMusicUrgent = true;
                sndMainMusic.rate(1.25); 
                console.log("Música acelerada!");
            }

            if (tempoRestante < 0) { 
                tempoRestante = 0;
                registrarFalha(); 
            }

            if (luzesAcesas && frameCount > frameDoApagao) {
                apagarLuzes();
            }

            push(); 
            translate(offsetX, offsetY);
            scale(scaleFactor);
            noSmooth();
            desenharCenaJogo(tempoRestante); 
            pop(); 
            break;

        case 'FADE_OUT':
            push(); 
            translate(offsetX, offsetY);
            scale(scaleFactor);
            noSmooth();
            desenharCenaJogo(0); 
            fill(0, 0, 0, transicaoAlfa);
            rect(-10, 0, 180, NATIVE_HEIGHT);
            transicaoAlfa += 5; 

            if (transicaoAlfa >= 255) {
                estadoDoJogo = 'GAME_OVER';
                gameOverAlfa = 0; 
            }
            pop();
            break;

        case 'GAME_OVER':
            push();
            translate(offsetX, offsetY);
            scale(scaleFactor);
            noSmooth();

            image(imgGameOverSheet,-10,0); 

            if (gameOverAlfa < 255) {
                gameOverAlfa += 2; 
            }

            fill(255, 0, 0, gameOverAlfa); 
            textFont(pixelFont);
            textSize(16); 
            textAlign(CENTER, CENTER);
            text("GAME OVER", NATIVE_WIDTH / 2, NATIVE_HEIGHT / 2);

            pop(); 
            break;
    }
}

// Interação
function mousePressed() {
    if (getAudioContext().state !== 'running') {
        userStartAudio();
    }

    switch (estadoDoJogo) {

        case 'JOGANDO':
            const mx = (mouseX - offsetX) / scaleFactor;
            const my = (mouseY - offsetY) / scaleFactor;

            for (let ing of todosIngredientes) {
                if (!ing.naMesa && Utils.checarClique(mx, my, ing)) {
                    const posMesaX = 25 + (caldeiraoObj.ingredientesNaMesa.length * 10);
                    const posMesaY = 75; 

                    sndClickIngrediente.play(); 
                    caldeiraoObj.adicionarIngrediente(ing, posMesaX, posMesaY);
                    return; 
                }
            }

            if (Utils.checarClique(mx, my, caldeiraoObj)) {
                sndClickCaldeirao.play(); 
                verificarReceita();
            }
            break;

        case 'GAME_OVER':
            reiniciarJogo();
            break;
    }
}