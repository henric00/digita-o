const inputJogador = document.getElementById("entradaJogador");
const painelPalavra = document.getElementById("painelPalavra");
const painelFeedback = document.getElementById("painelFeedback");
const painelPontos = document.getElementById("painelPontos");
const painelTempo = document.getElementById("painelTempo");

//lista das palavras que vão aparecer no jogo
const palavras = ["matrix", "neon", "pixel", " programação", "funcional", "codigo", "bit", "nave", "bug", "byte", "terminal"]

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

// Função principal do jogo
const iniciarJogo = () => {
    //Escolhe uma palavra aleatória e atualiza o estado inicial
    let estado = escolherPalavra(estadoInicial);
    //Atualiza os elementos da interface com base no estado atual
    atualizarInterface(estado);
    //Coloca o foco no campo de digitação para o jogador começar
    inputJogador.focus();
    //Escuta a digitação do jogador em tempo real
    inputJogador.addEventListener("input", () => {
        const texto = inputJogador.value;
        //Verifica se a palavra digitada está correta e gera novo estado
        const novoEstado = verificarDigitacao(estado, texto);
        //Se o estado mudou (acerto), atualiza o jogo
        if (novoEstado !== estado) {
            estado = novoEstado;
            inputJogador.value = ""; // limpa o campo
            atualizarInterface(estado);
        }
    });
    //Inicia a contagem regressiva do tempo de jogo
    iniciarContagem(() => {
        //Quando o tempo acabar, desativa o input e exibe mensagem
        inputJogador.disabled = true;
        painelFeedback.textContent = "Fim do tempo!";
    });
};


const verificarDigitacao = (estado, texto) => {
    if (texto === estado.palavraAtual) {
        return escolherPalavra({
            ...estado,
            pontos: estado.pontos + 1
        });
    }

    return estado;
};

