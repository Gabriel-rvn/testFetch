const tagName = document.getElementById("tagName");
const searchButton = document.getElementById("searchTagName");
const resultadoDeBusca = document.getElementById("resultadoDeBusca");
const API_KEY = "RGAPI-8fae4173-7386-4b68-aa67-1761a0237796"; 

async function getData() {
    const inputValue = tagName.value;
    
    if (!inputValue.includes("#")) {
        console.error("Por favor, digite no formato Nome#TAG");
        return;
    };

    const [gameName, tagLine] = inputValue.split("#");

    const accountUrl = `https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}?api_key=${API_KEY}`;
    
    try {
        const accountResponse = await fetch(accountUrl);
        if (!accountResponse.ok) throw new Error(`Erro na conta: ${accountResponse.status}`);
        
        const accountData = await accountResponse.json();
        const puuid = accountData.puuid;
        
        console.log("PUUID Encontrado:", puuid);

        const matchesUrl = `https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=5&api_key=${API_KEY}`;
        
        const matchesResponse = await fetch(matchesUrl);
        if (!matchesResponse.ok) throw new Error(`Erro nas partidas: ${matchesResponse.status}`);

        const matchIds = await matchesResponse.json();
        console.log("Partidas:", matchIds);

        resultadoDeBusca.innerHTML = `
            <p><strong>Jogador:</strong> ${accountData.gameName}#${accountData.tagLine}</p>
            <p><strong>Últimas 5 Partidas (IDs):</strong></p>
            <ul>${matchIds.map(id => `<li>${id}</li>`).join('')}</ul>`;
    
    } catch (error) {
        console.error("Erro:", error.message);
        resultadoDeBusca.innerHTML = "Erro ao buscar dados (Verifique o console e o CORS).";
    };
};

searchButton.addEventListener("click", getData);