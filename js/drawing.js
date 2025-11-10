// Função desenhar
function desenharCenaJogo(tempoRestante) {
    animadorBackground.draw(-10, 0); 
    image(imgEstanteEsq, -24, 8);
    velaObj.draw();
    caldeiraoObj.draw(); 

    if (receitaAtual) {
        receitaAtual.draw(114, 8, todosIngredientes);
    }

    fill(255); 
    textFont(pixelFont);
    textSize(4.5);
    textAlign(LEFT, TOP);
    text(`Tempo: ${floor(tempoRestante)}`, 127, 3); 

    image(imgMesaFrente, 47, 58);
    image(imgMesaFrente, 11, 58);
    image(imgMesaFrente, 85, 58);

    image(imgPotionRed, 95, 67);
    image(imgPotionBlack, 113, 67);

    fill(255);
    textSize(6);
    textAlign(CENTER, BOTTOM); 
    text(pontosSucesso, 95 + 8, 67); 
    text(pontosFalha, 113 + 8, 67);

    gatoMagoObj.draw();
    gatoMagobook.draw();

    for (let ing of todosIngredientes) {
        ing.draw(luzesAcesas, imgSombraIngrediente);
    }

    if (feedbackVisual.alfa > 0) {
        let c = feedbackVisual.cor; 
        fill(c[0], c[1], c[2], feedbackVisual.alfa); 
        textFont(pixelFont);
        textSize(5);
        textAlign(CENTER, CENTER);
        text(feedbackVisual.texto, feedbackVisual.x, feedbackVisual.y);
        feedbackVisual.y -= 0.3;  
        feedbackVisual.alfa -= 3; 
    }
}