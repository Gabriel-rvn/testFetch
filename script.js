const tagName = document.getElementById("tagName");
const searchButton = document.getElementById("searchTagName");
const resultadoDeBusca = document.getElementById("resultadoDeBusca");

const API_KEY = "RGAPI-8fae4173-7386-4b68-aa67-1761a0237796";

const accountUrl = "https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id";

let puuid = "";
let partidasIds = [];

searchButton.addEventListener("click", buscarJogador);

function buscarJogador() {
  const nomeCompleto = tagName.value;
  const partes = nomeCompleto.split("#");

  const gameName = partes[0];
  const tagLine = partes[1];

  const url = `${accountUrl}/${gameName}/${tagLine}?api_key=${API_KEY}`;
  console.log("URL do fetch:", url);

  fetch(`${accountUrl}/${gameName}/${tagLine}?api_key=${API_KEY}`)
    .then(response => response.json())
    .then(data => {
      puuid = data.puuid;
      buscarHistorico();
    });
};

function buscarHistorico() {
  const matchUrl = `https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=5&api_key=${API_KEY}`;

  fetch(matchUrl)
    .then(response => response.json())
    .then(data => {
      partidasIds = data;
      buscarDetalhesDasPartidas();
      console.log(partidasIds);
    });
};

function buscarDetalhesDasPartidas() {
  resultadoDeBusca.innerHTML = "";

  for (let i = 0; i < partidasIds.length; i++) {
    const matchId = partidasIds[i];

    const matchDetailUrl = `https://americas.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=${API_KEY}`;

    fetch(matchDetailUrl)
      .then(response => response.json())
      .then(data => {
        verificarResultado(data);
      });
  };
};

function verificarResultado(dadosPartida) {
  const jogadores = dadosPartida.info.participants;
  console.log(jogadores);

  for (let i = 0; i < jogadores.length; i++) {
    if (jogadores[i].puuid === puuid) {

      const cartao = document.createElement("div");
      const campeao = jogadores[i].championName;

      if (jogadores[i].win === true) {
        cartao.textContent = "Vitória";
        cartao.classList.add("vitoria"); 
      } else {
        cartao.textContent = "Derrota";
        cartao.classList.add("derrota");
      };

      resultadoDeBusca.appendChild(cartao);
    };
  };
};

