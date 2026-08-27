const form = document.querySelector('#form-livro');
const listaEl = document.querySelector('#lista-livros');
const mensagemErro = document.querySelector('#mensagem-erro');

async function carregarLivros() {
  try {
    const response = await fetch("/livros");

    if (!response.ok) {
      mostrarErro('Erro ao buscar livros');
      return;
    }

    const livros = await response.json();

    renderizarLivros(livros);
    return;
  } catch (error) {
    mostrarErro(error.message);
  }
}

function mostrarErro(msg) {
  mensagemErro.textContent = msg;
  mensagemErro.classList.remove('oculto');
}

// ----- TAREFA 1: renderizar os livros na tela -----
async function renderizarLivros(livros) {
  let Cardlivros = document.createElement("div")
    for(let i = 0;i< livros.length;i++){
      const card = document.createElement("div")
      const id = livros[i].id
      card.id=`card-${id}`
      card.innerHTML=`
      <h3 id="id-tarefa">ID:${id}</h3>
      <h3 id="titulo-meu">${livros[i].titulo}</h3>
      <p id="desc">${livros[i].autor}</p>
      <p id="empres">${livros[i].disponivel}</p>
      <button id="emprestar" onclick="alternarStatus(${id})"> Emprestar</button>
      <button onclick="removerLivro(${id})">Excluir</button>
      `   
    console.log("status",livros[i].disponivel)
    Cardlivros.appendChild(card)
}
  listaEl.innerHTML= ``
  listaEl.appendChild(Cardlivros)
  console.log(listaEl)
};

// ----- TAREFA 2: cadastrar um novo livro (POST) -----
form.addEventListener('submit', async (event) => {

});

// ----- TAREFA 3: remover um livro (DELETE) -----
async function removerLivro(id) {
  try {
    const res = await fetch(`livros/${id}`, {
      method: 'DELETE',
    });

    if (!res.ok) {
      mostrarErro('Erro ao remover livro.');
      return;
    }

    await carregarLivros();
  } catch (error) {
    mostrarErro(error.message);
  }
}

// ----- TAREFA 4: emprestar / devolver um livro (PUT) -----
async function alternarStatus(livro) {
  // TAREFA: descobrir o novo valor de "disponivel" (inverter o atual: 1 vira 0, 0 vira 1)
  // TAREFA: fazer fetch PUT para a rota PUT enviando
  //       { disponivel: novoValor } no body, com headers corretos
  //       OBS: A rota PUT precisa ser criada no back-end
  // TAREFA: tratar erro com a função mostrarErro
  // TAREFA: se der certo, chamar carregarLivros() para atualizar a lista
}

carregarLivros();
