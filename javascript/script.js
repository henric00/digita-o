// validar o nome
const temTamanhoValido = nome => nome.length >= 3;
const naoTemEspaco = nome => !nome.includes(" ");
const naoRepetido = nomes => nome => !nomes.includes(nome.toLowerCase());

const validarNome = (nome, nomesExistentes) => 
  temTamanhoValido(nome) &&
  naoTemEspaco(nome) &&
  naoRepetido(nomesExistentes)(nome);

// proibe que algum texto seja colado na entrada
const impedirColar = (input) => {
  input.addEventListener("paste", (e) => {
    e.preventDefault();
  });
};

// função que vai iniciar o jogo
const iniciar = () => {
  const inputNome = document.getElementById("nomeJogador");
  const botao = document.getElementById("btJogar");
  const erro = document.getElementById("erroNome");

  impedirColar(inputNome);

  // função que será chamada ao clicar no botão
  function tentarComecarJogo() {
    const nome = inputNome.value.trim();
    const nomesSalvos = JSON.parse(localStorage.getItem("ranking") || "[]");

    if (!validarNome(nome, nomesSalvos.map(n => n.nome))) {
      erro.textContent = "Nome inválido ou já usado";
      return;
    }

    const novoRanking = [...nomesSalvos, { nome: nome.toLowerCase(), pontos: 0 }];
    localStorage.setItem("ranking", JSON.stringify(novoRanking));
    erro.textContent = "";

    window.location.href = "html/game.html";
  }

  // 🔥 Aqui é onde você ativa a função no clique
  botao.addEventListener("click", tentarComecarJogo);
};
iniciar();
