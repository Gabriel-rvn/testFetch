const tagName = document.getElementById("tagName");
const searchButton = document.getElementById("searchTagName");
const resultadoDeBusca = document.getElementById("resultadoDeBusca");
const API_KEY = "RGAPI-8fae4173-7386-4b68-aa67-1761a0237796"; 

async function getData() {
    const inputValue = tagName.value;
    
    resultadoDeBusca.innerHTML = "Carregando...";

    if (!inputValue.includes("#")) {
        console.error("Por favor, digite no formato Nome#TAG");
        resultadoDeBusca.innerHTML = "Formato inválido. Use Nome#TAG";
        return;
    };

    const [gameName, tagLine] = inputValue.split("#");

    const accountUrl = `https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${encodeURIComponent(gameName)}/${encodeURIComponent(tagLine)}?api_key=${API_KEY}`;
    
    try {
        const accountResponse = await fetch(accountUrl);
        if (!accountResponse.ok) throw new Error(`Erro na conta: ${accountResponse.status}`);
        
        const accountData = await accountResponse.json();
        const puuid = accountData.puuid;
        
        const matchesUrl = `https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=5&api_key=${API_KEY}`;
        
        const matchesResponse = await fetch(matchesUrl);
        if (!matchesResponse.ok) throw new Error(`Erro nas partidas: ${matchesResponse.status}`);

        const matchIds = await matchesResponse.json();
        
        // --- PASSO 3: Pegar Detalhes de CADA Partida (A parte nova) ---
        resultadoDeBusca.innerHTML = "Carregando detalhes das partidas...";

        // Criamos um array de promessas (requisições simultâneas)
        const matchPromises = matchIds.map(matchId => {
            const urlDetalhes = `https://americas.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=${API_KEY}`;
            return fetch(urlDetalhes).then(res => res.json());
        });

        // Esperamos todas as requisições terminarem
        const matchesData = await Promise.all(matchPromises);

        // --- PASSO 4: Montar o HTML ---
        let htmlContent = `<p><strong>Jogador:</strong> ${accountData.gameName}#${accountData.tagLine}</p><ul>`;

        matchesData.forEach(partida => {
            // 4.1 Encontrar o nosso jogador dentro da partida de 10 pessoas
            const meuDesempenho = partida.info.participants.find(jogador => jogador.puuid === puuid);
            
            // 4.2 Extrair os dados que queremos
            const resultado = meuDesempenho.win ? "Vitória" : "Derrota";
            const corResultado = meuDesempenho.win ? "green" : "red";
            const campeao = meuDesempenho.championName;
            const kills = meuDesempenho.kills;
            const deaths = meuDesempenho.deaths;
            const assists = meuDesempenho.assists;
            
            // Calculando tempo (vem em segundos)
            const minutos = Math.floor(partida.info.gameDuration / 60);
            const segundos = partida.info.gameDuration % 60;

            htmlContent += `
                <li style="margin-bottom: 15px; border: 1px solid #ccc; padding: 10px;">
                    <strong style="color: ${corResultado}">${resultado}</strong> - ${minutos}m ${segundos}s <br>
                    <strong>Campeão:</strong> ${campeao} <br>
                    <strong>K/D/A:</strong> ${kills}/${deaths}/${assists}
                </li>
            `;
        });

        htmlContent += "</ul>";
        resultadoDeBusca.innerHTML = htmlContent;
    
    } catch (error) {
        console.error("Erro:", error);
        resultadoDeBusca.innerHTML = `Erro: ${error.message}`;
    };
};

searchButton.addEventListener("click", getData);