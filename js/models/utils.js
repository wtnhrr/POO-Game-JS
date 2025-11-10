class Utils {
    static checarClique(mx, my, objeto) {

        let w = 0, h = 0;

        if (objeto.img) {
            w = objeto.img.width;
            h = objeto.img.height;
        } else if (objeto.animador) {
            w = objeto.animador.frameWidth;
            h = objeto.animador.frameHeight;
        } else {
            return false;
        }

        return (mx >= objeto.x && 
                mx <= objeto.x + w &&
                my >= objeto.y && 
                my <= objeto.y + h);
    }

    static validarMistura(listaMesa, listaReceita) {
        if (listaMesa.length !== listaReceita.length) {
            return false;
        }

        const mesaOrdenada = [...listaMesa].sort();
        const receitaOrdenada = [...listaReceita].sort();

        return mesaOrdenada.every((item, index) => item === receitaOrdenada[index]);
    }
}