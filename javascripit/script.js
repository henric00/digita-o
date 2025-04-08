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
  // acessando os elementos do html
  const inputNome = document.getElementById("nomeJogador");
  const botao = document.getElementById("btJogar");
  const erro = document.getElementById("erroNome");

  // chamando a função que impede colar texto
  // no input name
  impedirColar(inputNome);

  // criando o evento para quando clicar em jogar conferir o nome da lenda
  botao.addEventListener("click", () => {
    // pega o que o usuário digitou e remove os espaços
    const nome = inputNome.value.trim();

    // coleta os nomes salvos no storage, se não tiver nada, deixa um array vazio
    // o parse transforma num array de objetos 
    const nomesSalvos = JSON.parse(localStorage.getItem("ranking") || "[]");

    // valida o nome e cria um novo array com o nome dos jogadores
    if (!validarNome(nome, nomesSalvos.map(n => n.nome))) {
      erro.textContent = "Nome inválido ou já usado";
      return;
    }

    // cria um novo array com o novo jogador 
    const novoRanking = [...nomesSalvos, { nome: nome.toLowerCase(), pontos: 0 }];

    // salva o ranking atualizado
    localStorage.setItem("ranking", JSON.stringify(novoRanking));

    erro.textContent = "";
    alert(`Bem-Vindo, ${nome}!`);
  });
};

iniciar();
