// --Versao de teste do proprio JSONPlaceHolder.
// fetch('https://jsonplaceholder.typicode.com/todos/1')
//     .then(response => response.json())
//     .then(json => console.log(json))

// --Versão que o Gemini ajudou a montar.
// fetch('https://jsonplaceholder.typicode.com/users/2')
//   .then(response => {
//     return response.json();
//   })
//   .then(data => {
//     console.log("Dados recebidos:", data);
//     console.log("Nome do usuário:", data.name);
//   })
//   .catch(error => {
//     console.error("Algo deu errado:", error);
//   });


const tagName = document.getElementById("tagName");
const searchButton = document.getElementById("searchTagName");

async function getData() {
    const inputValue = tagName.value;
    const url = "https://jsonplaceholder.typicode.com/todos/";
    const urlTagName = url.concat(inputValue);
  
    try {
        const response = await fetch(urlTagName);
        if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.json();
        console.log(result);
    }catch (error) {
        console.error(error.message);
    };
};

searchButton.addEventListener("click", getData);


