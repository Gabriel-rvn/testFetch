// const teste1 = "abacaxi"
// const teste2 = "jabuti"


// -- TUDO AQUI ABAIXO, NAO PRESTA OU NAO FUNCIONA

// let result = (`${"abacaxota", teste2}`);
//     console.log(result);
    
// let result = ${teste1.value, teste2.value};
//     console.log(result);

// let result = ${"acabaxi", "jabuti"}
//     console.log(result);

// let result = "abacaxota, ${teste1}"
//     console.log(result);

// let result = "abacaxota", ${teste1.value}
//     console.log(result);

// let result = teste1 `${"abcdef"}`
//     console.log(result)


// -- FUNCIONOU CARALHO
// let result = `abacaxota${teste1}`;
//     console.log(result);


const tagName = document.getElementById("tagName");
const searchButton = document.getElementById("searchTagName");
const resultadoDeBusca = document.getElementById("resultadoDeBusca");

async function getData() {
    const inputValue = tagName.value;
    const url = `https://jsonplaceholder.typicode.com/todos/${inputValue}`;
    
    try {
        const response = await fetch(url);
        if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
        };

        const result = await response.json();
        console.log(result);
        resultadoDeBusca.innerHTML = JSON.stringify(result.title);
    
    }catch (error) {
        console.error(error.message);
    };
};

searchButton.addEventListener("click", getData);