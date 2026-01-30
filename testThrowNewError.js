
function verificarAcesso(idade) {
  if (idade < 18) {
    throw new Error("Acesso negado: Você precisa ter pelo menos 18 anos.");
  }

  console.log("Acesso permitido! Bem-vindo.");
};

try {
  verificarAcesso(20);
} catch (erro) {
  console.error("Ops, algo deu errado: " + erro.message);
};

// ---outro exemplo---

function processarCadastro(usuario) {
  if (!usuario.nome) {
    throw new Error("O campo 'nome' é obrigatório para o cadastro.");
  };

  return `Usuário ${usuario.nome} cadastrado com sucesso!`;
};

const novoUsuario = { idade: 25, nome: "abc"};

try {
  const resultado = processarCadastro(novoUsuario);
  console.log(resultado);
} catch (e) {
  console.warn("Aviso do Sistema:", e.message);
};