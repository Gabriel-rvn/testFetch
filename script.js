// --Versao de teste do proprio JSONPlaceHolder.
// fetch('https://jsonplaceholder.typicode.com/todos/1')
//     .then(response => response.json())
//     .then(json => console.log(json))

// --Versão que o Gemini ajudou a montar.
fetch('https://jsonplaceholder.typicode.com/users/2')
  .then(response => {
    return response.json();
  })
  .then(data => {
    console.log("Dados recebidos:", data);
    console.log("Nome do usuário:", data.name);
  })
  .catch(error => {
    console.error("Algo deu errado:", error);
  });
