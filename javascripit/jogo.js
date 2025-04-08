const inputJogador = document.getElementById("entradaJogador");
const painelPalavra = document.getElementById("painelPalavra");
const painelFeedback = document.getElementById("painelFeedback");
const painelPontos = document.getElementById("painelPontos");
const painelTempo = document.getElementById("painelTempo");

//lista das palavras que vão aparecer no jogo
const palavras =["matrix", "neon", "pixel"," programação", "funcional", "codigo", "bit", "nave", "bug", "byte", "terminal"]

//como o jogo vai começar
const estadoInicial = {
    pontos: 0,
    tempo: 30, 
    palavraAtual: "",
    palavrasRestantes: [...palavras]
}

//pegando uma palavra aleatoria e diminuindo a lista(imprime uma copia sem o indice que foi escolhido)
const escolherPalavra = (estado) => {
    const index = Math.floor(Math.random() * estado.palavrasRestantes.length)
    const palavra = estado.palavrasRestantes[index]
    const novasPalavras = estado.palavrasRestantes.filter((_, i) => i !== index)

    return {
        ...estado, 
        palavraAtual: palavra.trim(),
        palavrasRestantes: novasPalavras
    };
    
};

const iniciarJogo = () => {
    let estado = escolherPalavra(estadoInicial);
    painelPalavra.textContent = estado.palavraAtual;
    painelPontos.textContent = `Pontos: ${estado.pontos}`;
    painelTempo.textContent = `Tempo: ${estado.tempo}s`;
};

