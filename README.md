# O Caldeirão do Gato Mago

Um jogo de alquimia em pixel art, construído com p5.js.

O objetivo é ler receitas mágicas e combinar os ingredientes corretos antes que o tempo acabe. O jogo apresenta uma dificuldade progressiva e eventos aleatórios para testar sua memória, percepção e agilidade.

---

## Principais Mecânicas

* **Progressão de Dificuldade:** O jogo se adapta à sua pontuação, introduzindo receitas de 2, 3 e 4 ingredientes e diminuindo o tempo limite.
* **Estante Aleatória:** Os ingredientes na estante são **completamente embaralhados** a cada nova receita, exigindo atenção constante e tornando cada rodada única.
* **Receitas Corrompidas:** Em níveis mais altos, há uma chance de a receita vir "corrompida" — o papel brilha em roxo, o título é "????" e os **ícones dos ingredientes estão errados**, forçando o jogador a ler o texto para acertar.
* **Evento "Apagão":** Há uma chance de um vento apagar a vela, mergulhando a prateleira na escuridão e forçando o jogador a usar a **memória de curto prazo** para encontrar os ingredientes.

---

## 🛠️ Tecnologias Utilizadas

* **JavaScript (ES6+)**
* **p5.js:** Para toda a lógica de desenho, interação (`setup`, `draw`, `mousePressed`) e animação.
* **p5.sound.js:** Para o carregamento e controle da música de fundo e efeitos sonoros.
* **HTML5 & CSS3:** Para a estrutura da página e as telas de UI (Início e Game Over).

---

## 🎓 Checklist de Requisitos Acadêmicos (OOP)

Este projeto foi desenvolvido para cumprir requisitos específicos de Programação Orientada a Objetos.

| Requisito | Status | Implementação no Projeto |
| :--- | :---: | :--- |
| **Tela de Abertura** | ✅ | `div#tela-inicio` controlada pelo `estadoDoJogo = 'INICIO'`. |
| **Herança** | ✅ | `IngredienteMineral`, `IngredienteVegetal` e `IngredienteAnimal` herdam de `Ingrediente`. |
| 3 Classes Filhas | ✅ | `...Mineral`, `...Vegetal`, `...Animal`. |
| Novo Atributo Filho | ✅ | `...raridade`, `...estacao`, `...tipo`. |
| **Estático** | ✅ | 3 métodos estáticos (`Utils.checarClique`, `Utils.validarMistura`, `Receita.gerarReceitaAleatoria`). |
| **Polimorfismo** | ✅ | O loop `for (let ing of todosIngredientes)` chama `ing.draw()`, tratando todos os tipos de ingrediente da mesma forma. |
| 3 Usos de `this()` | ✅ | Usado extensivamente em todos os construtores e classes (ex: `this.nome = nome`). |
| 3 Usos de `super()` | ✅ | Usado no construtor de todas as 3 classes filhas (`Ingrediente...`). |
| **Private** | ✅ | 3 atributos privados (`#nome` em `Ingrediente`, `#nomePocao` em `Receita`, `#ingredientesNaMesa` em `Caldeirao`). |
| 3 Pares de `get/set` | ✅ | Cada classe com atributo *private* possui seus métodos `get` e `set`. |
| Classes por Integrante | ✅ | O projeto possui **11 classes** (`Animador`, `Caldeirao`, `GatoMago`, `GatoBranco`, `Ingrediente`, `...Mineral`, `...Vegetal`, `...Animal`, `Receita`, `Utils`, `Vela`). |
| **Tela de Game Over** | ✅ | `estadoDoJogo = 'GAME_OVER'` que ativa uma cena com fade-out de música e fade-in de texto. |
