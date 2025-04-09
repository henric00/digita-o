const inputJogador = document.getElementById("entradaJogador");
const painelPalavra = document.getElementById("painelPalavra");
const painelFeedback = document.getElementById("painelFeedback");
const painelPontos = document.getElementById("painelPontos");
const painelTempo = document.getElementById("painelTempo");

const palavras = ["matrix", "neon", "pixel", "programação", "funcional", "codigo", "bit", "nave", "bug", "byte", "terminal"];

let estado = {
  pontos: 0,
  tempo: 30,
  palavraAtual: "",
  palavrasRestantes: [...palavras]
};

const escolherPalavra = () => {
  const i = Math.floor(Math.random() * estado.palavrasRestantes.length);
  estado.palavraAtual = estado.palavrasRestantes[i];
  estado.palavrasRestantes.splice(i, 1);
};

const atualizarInterface = () => {
  painelPalavra.textContent = estado.palavraAtual;
  painelPontos.textContent = `Pontos: ${estado.pontos}`;
  painelTempo.textContent = `Tempo: ${estado.tempo}s`;
  painelFeedback.textContent = "";
};

const iniciarContagem = () => {
  const intervalo = setInterval(() => {
    estado.tempo -= 1;
    painelTempo.textContent = `Tempo: ${estado.tempo}s`;
    if (estado.tempo <= 0) {
      clearInterval(intervalo);
      inputJogador.disabled = true;
      painelFeedback.textContent = "Fim do tempo!";
      salvarPontuacao();
      setTimeout(() => window.location.href = "/ranking/ranking.html", 3000);
    }
  }, 1000);
};

const salvarPontuacao = () => {
  const nome = JSON.parse(localStorage.getItem("ranking")).slice(-1)[0].nome;
  const ranking = JSON.parse(localStorage.getItem("ranking"));
  const atualizado = ranking.map(jogador =>
    jogador.nome === nome ? { ...jogador, pontos: estado.pontos } : jogador
  );
  localStorage.setItem("ranking", JSON.stringify(atualizado));
};

const iniciarJogo = () => {
  escolherPalavra();
  atualizarInterface();
  inputJogador.focus();

  inputJogador.addEventListener("input", () => {
    if (inputJogador.value.trim() === estado.palavraAtual) {
      estado.pontos++;
      inputJogador.value = "";
      escolherPalavra();
      atualizarInterface();
    }
  });

  iniciarContagem();
};

iniciarJogo();
