// Resolução
const NATIVE_WIDTH = 160;
const NATIVE_HEIGHT = 90;

const telaInicio = document.getElementById('tela-inicio');
const btnStart = document.getElementById('btn-start');
const gameContainer = document.getElementById('game-container');

// Variáveis estado
let estadoDoJogo = 'INICIO';
let scaleFactor, offsetX, offsetY;

// Variáveis imagens
let imgEstanteEsq, imgMesaFrente, imgReceita;
let imgCaldeiraoSheet; 
let imgMineral1, imgMineral2, imgVegetal1, imgVegetal2, imgAnimal1, imgAnimal2;
let pixelFont;
let imgGatoBlackSpriteSheet, imgGatoWhiteSpriteSheet;
let imgPotionRed, imgPotionBlack;
let imgGameOverSheet; 
let imgBackgroundSheet; 
let imgReceitaSheet;
let imgVelaAcesaSheet, imgVelaApagadaSheet, imgSombraIngrediente;

// Variáveis Som
let sndClickCaldeirao, sndClickIngrediente, sndSucesso, sndFalha;
let sndReceitaCorrupta, sndWind, sndMainMusic;

//  Dados de ingredientes
let TODOS_OS_TIPOS_DE_INGREDIENTES = [];

//  Variáveis objetos
let todosIngredientes = []; 
let caldeiraoObj;
let receitaAtual;
let gatoMagoObj, gatoMagobook;
let animadorBackground; 
let velaObj;

// Variáveis de gameplay
let tempoLimiteAtual = 15; 
const LIMITE_FALHAS = 5; 
let frameInicioReceita; 
let pontosSucesso = 0;
let pontosFalha = 0;

// Variáveis feedback
let feedbackVisual = { texto: "", cor: [0, 0, 0], alfa: 0, x: 0, y: 0 };
let transicaoAlfa = 0; 
let gameOverAlfa = 0; 
let luzesAcesas = true;
let frameDoApagao = Infinity;

// Variável música
let isMusicUrgent = false;